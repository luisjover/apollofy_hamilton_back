import { Request, Response } from "express";
import prismaClient from "../db/clientPrisma";
import { uploadCover, uploadTrack, deleteImageMedia, deleteAudioMedia, uploadImageBase64, uploadAudioBase64 } from "../utils/cloudinary";
import fs from 'fs-extra'
import { adminIdentifier } from "../config/config";
import { Albums, Tracks } from "@prisma/client";


export const createTrack = async (req: Request, res: Response) => {
    let imageId: string | null = null;
    let audioId: string | null = null;

    try {

        const { userId } = req.params;
        let { name, genres, privacityString, playlists, albumName, audio, image } = req.body;

        if (!name || !genres || !privacityString) {
            res.status(400).send({ error: "Missing one or more required fields" })
            return;
        }

        if (!userId) {
            res.status(404).send('User not found');
            return;
        }

        if (!Array.isArray(genres)) {
            genres = genres.split(',').map((genre: string) => genre.trim());
        }

        let playlistsIdArr = [];
        if (playlists && !Array.isArray(playlists)) {
            playlists = playlists.split(',').map((playlist: string) => playlist.trim());
            playlistsIdArr = [];
            for (const playlistId of playlists) {
                const playlist = await prismaClient.playlists.findUnique({
                    where: {
                        id: playlistId
                    }
                })
                if (playlist) {
                    playlistsIdArr.push(playlist.id);
                }
            }
        }

        const genresIdArr = [];
        for (const genreName of genres) {
            const genre = await prismaClient.genres.findFirst({
                where: {
                    name: genreName
                }
            })
            if (genre) {
                genresIdArr.push(genre.id);
            }
        }




        if (image && audio) {

            const uploadedCover = await uploadImageBase64(image);
            const uploadedAudio = await uploadAudioBase64(audio);

            if (uploadedCover && uploadedAudio) {

                const imageUrl = uploadedCover.secure_url;
                imageId = uploadedCover.public_id;
                const audioUrl = uploadedAudio.secure_url;
                audioId = uploadedAudio.public_id;
                let privacity: boolean;
                if (privacityString === "true") privacity = true
                else privacity = false
                if (albumName) {
                    let newAlbum = null;
                    newAlbum = await prismaClient.albums.findFirst({
                        where: {
                            name: albumName
                        }
                    })
                    if (!newAlbum) {
                        newAlbum = await prismaClient.albums.create({
                            data: {
                                name: albumName,
                                genres: {
                                    connect: genresIdArr.map(genresId => ({ id: genresId })),
                                },
                                imageUrl,
                                imageId,
                                popularity: 0,
                                listType: "album",
                                isTopTrend: false,
                                privacity: privacity,
                                verified: false,
                                owner: {
                                    connect: {
                                        id: userId
                                    }
                                }

                            }
                        })
                    }
                    const newTrack = await prismaClient.tracks.create({
                        data: {
                            name: name,
                            genres: {
                                connect: genresIdArr.map(genresId => ({ id: genresId })),
                            },
                            user: {
                                connect: {
                                    id: userId
                                }
                            },
                            album: {
                                connect: {
                                    id: newAlbum.id
                                }
                            },
                            imageUrl,
                            imageId,
                            audioUrl,
                            audioId,
                            likes: 0,
                            verified: false,
                            privacity: privacity,
                            playlists: {
                                connect: playlistsIdArr.map(playlistId => ({ id: playlistId }))
                            },
                            listType: "track"
                        }
                    })
                } else {
                    const newAlbum = await prismaClient.albums.create({
                        data: {
                            name,
                            genres: {
                                connect: genresIdArr.map(genresId => ({ id: genresId })),
                            },
                            imageUrl,
                            imageId,
                            popularity: 0,
                            listType: "album",
                            isTopTrend: false,
                            privacity: privacity,
                            verified: false,
                            owner: {
                                connect: {
                                    id: userId
                                }
                            }
                        }
                    })
                    const newTrack = await prismaClient.tracks.create({
                        data: {
                            name: name,
                            genres: {
                                connect: genresIdArr.map(genresId => ({ id: genresId })),
                            },
                            user: {
                                connect: {
                                    id: userId
                                }
                            },
                            album: {
                                connect: {
                                    id: newAlbum.id
                                }
                            },
                            imageUrl,
                            imageId,
                            audioUrl,
                            audioId,
                            likes: 0,
                            verified: false,
                            privacity: privacity,
                            playlists: {
                                connect: playlistsIdArr.map(playlistId => ({ id: playlistId }))
                            },
                            listType: "track"
                        }
                    })

                }
                const user = await prismaClient.users.findUnique({
                    where: {
                        id: userId
                    },
                    include: {
                        playlists: {
                            include: {
                                tracks: true
                            }
                        },
                        followers: true,
                        following: true,
                        albums: {
                            include: {
                                tracks: true
                            }
                        },
                        trackList: true,
                        favourites: {
                            include: {
                                album: true,
                                artist: true,
                                playlist: true,
                                track: true
                            }
                        }
                    }
                })
                res.status(200).send(user)
            } else {
                res.status(404).send("error uploading audio or image");
            }
        } else {
            res.status(404).send('Missing files');
        }
    } catch (error) {
        if (imageId) deleteImageMedia(imageId);
        if (audioId) deleteAudioMedia(audioId);

        console.log(error)
        res.status(500).send(error);
    }
}
//----------------------------------------------------------------------------

export const createTrackByAdmin = async (req: Request, res: Response) => {

    let imageId: string | null = null;
    let audioId: string | null = null;

    try {
        let { name, genres, albumName, playlists, artistsNames } = req.body;

        if (!name || !genres || !albumName || !artistsNames) {

            res.status(404).send('Missing required data');
            return;
        }
        if (!Array.isArray(genres)) {
            genres = genres.split(',').map((genre: string) => genre.trim());
        }
        if (!Array.isArray(artistsNames)) {
            artistsNames = artistsNames.split(',').map((artistName: string) => artistName.trim());
        }

        let playlistsIdArr = [];
        if (playlists && !Array.isArray(playlists)) {
            playlists = playlists.split(',').map((playList: string) => playList.trim());

            playlistsIdArr = [];
            for (const playlistId of playlists) {
                const playlist = await prismaClient.playlists.findFirst({
                    where: {
                        id: playlistId
                    }
                })
                if (playlist) {
                    playlistsIdArr.push(playlist.id);
                }
            }
        }


        const genresIdArr = [];
        for (const genreName of genres) {
            const genre = await prismaClient.genres.findFirst({
                where: {
                    name: genreName
                }
            })
            if (genre) {
                genresIdArr.push(genre.id);
            }
        }

        const artistsIdsArr = [];
        for (const artistName of artistsNames) {
            const artist = await prismaClient.artists.findUnique({
                where: {
                    name: artistName
                }
            })
            if (artist) {
                artistsIdsArr.push(artist.id)
            }
        }


        const album = await prismaClient.albums.findFirst({
            where: {
                name: albumName
            }
        })

        if ((req.files as any)?.image && (req.files as any)?.audio && album) {

            const uploadedCover = await uploadCover((req.files as any).image.tempFilePath);
            const uploadedAudio = await uploadTrack((req.files as any).audio.tempFilePath);

            await fs.unlink((req.files as any).image.tempFilePath)
            await fs.unlink((req.files as any).audio.tempFilePath)

            const imageUrl = uploadedCover.secure_url;
            imageId = uploadedCover.public_id;

            const audioUrl = uploadedAudio.secure_url;
            audioId = uploadedAudio.public_id;
            const adminId = adminIdentifier;
            const newTrack = await prismaClient.tracks.create({
                data: {
                    name: name,
                    genres: {
                        connect: genresIdArr.map(genresId => ({ id: genresId })),
                    },
                    user: {
                        connect: {
                            id: adminId
                        }
                    },
                    album: {
                        connect: {
                            id: album.id
                        }
                    },
                    imageUrl,
                    imageId,
                    audioUrl,
                    audioId,
                    likes: 0,
                    verified: true,
                    privacity: false,
                    playlists: {
                        connect: playlistsIdArr.map(playlistId => ({ id: playlistId }))
                    },
                    listType: "track",
                    artists: {
                        connect: artistsIdsArr.map(artistId => ({ id: artistId }))
                    }
                }
            })
            return res.status(200).send(newTrack)
        }
        else res.status(404).send('Missing files')
    } catch (error) {

        if (imageId) deleteImageMedia(imageId);
        if (audioId) deleteAudioMedia(audioId);

        res.status(500).send(error);
    }
}

//----------------------------------------------------------------------------
export const getAllTracks = async (req: Request, res: Response) => {
    try {
        const tracks = await prismaClient.tracks.findMany({
            include: {
                playlists: true,
                artists: true
            }
        });

        res.status(200).send(tracks)
    } catch (error) {
        res.status(500).send(error);
    }
}

//----------------------------------------------------------------------------
export const getTrackById = async (req: Request, res: Response) => {
    const { trackId } = req.params;

    try {
        const track = await prismaClient.tracks.findFirst({
            where: {
                id: trackId
            },
            include: {
                playlists: true,
                artists: true
            }
        });

        if (!track) {
            res.status(404).send({ error: "Track not found" })
            return
        }
        res.status(200).send(track)

    } catch (error) {
        res.status(500).send(error)
    }
}
//----------------------------------------------------------------------------
export const addTrackToPlaylist = async (req: Request, res: Response) => {
    const { trackId } = req.params
    const { playlistId } = req.body
    try {
        const trackToPlaylist = await prismaClient.tracks.update({
            where: {
                id: trackId
            },
            data: {
                playlists: {
                    connect: {
                        id: playlistId
                    }
                }
            }
        })
        res.status(201).send(trackToPlaylist)
    } catch (error) {
        res.status(500).send(error)
    }
}
//----------------------------------------------------------------------------
export const updateTrack = async (req: Request, res: Response) => { }
//----------------------------------------------------------------------------
export const deleteTrack = async (req: Request, res: Response) => {
    try {
        const { trackId } = req.params;

        const tracksSearched = await prismaClient.favourites.findMany({
            where: {
                track: {
                    id: trackId
                }
            }
        })
        tracksSearched.forEach(async (track) => {
            await prismaClient.favourites.delete({
                where: {
                    id: track.id
                }
            })
        })

        const targetTrack = await prismaClient.tracks.delete({
            where: {
                id: trackId
            }
        })


        if (!targetTrack) {
            res.status(404).send('Track not found')
            return;
        }

        await deleteAudioMedia(targetTrack.audioId);
        await deleteImageMedia(targetTrack.imageId);
        res.status(200).send('Track deleted successfully')
    } catch (error) {
        res.status(500).send(error)
    }
}
