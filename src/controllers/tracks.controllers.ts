import { Request, Response } from "express";
import prismaClient from "../db/clientPrisma";
import { uploadCover, uploadTrack, deleteImageMedia, deleteAudioMedia } from "../utils/cloudinary";
import fs from 'fs-extra'


export const createTrack = async (req: Request, res: Response) => {
    let imageId: string | null = null;
    let audioId: string | null = null;
    try {

        const { userId } = req.params;
        let { name, genres, privacityString } = req.body;


        if (!userId) {
            res.status(404).send('User not found');
        }

        if (!Array.isArray(genres)) {
            genres = genres.split(',').map((genre: string) => genre.trim());
        }

        if (!name || !genres) {

            res.status(404).send('Missing required data');
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

        if ((req.files as any)?.image && (req.files as any)?.audio) {

            const uploadedCover = await uploadCover((req.files as any).image.tempFilePath);
            const uploadedAudio = await uploadTrack((req.files as any).audio.tempFilePath);

            await fs.unlink((req.files as any).image.tempFilePath)
            await fs.unlink((req.files as any).audio.tempFilePath)
            const imageUrl = uploadedCover.secure_url;
            imageId = uploadedCover.public_id;

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
                    isTopTrend: false
                }
            })
            const audioUrl = uploadedAudio.secure_url;
            audioId = uploadedAudio.public_id;
            let privacity: boolean;
            if (privacityString === "true") privacity = true
            else privacity = false
            const newTrack = await prismaClient.tracks.create({
                data: {
                    name: name,
                    genres: {
                        connect: genresIdArr.map(genresId => ({ id: genresId })),
                    },
                    Users: {
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
                    privacity: privacity
                }
            })
            return res.status(200).send(newTrack)
        }
        else {
            if (imageId) deleteImageMedia(imageId);
            if (audioId) deleteAudioMedia(audioId);
            res.status(404).send('Missing files');
        }
    } catch (error) {
        if (imageId) deleteImageMedia(imageId);
        if (audioId) deleteAudioMedia(audioId);

        res.status(500).send(error);
    }
}


export const createTrackByAdmin = async (req: Request, res: Response) => {
    try {
        let { name, genres, albumName, playLists } = req.body;


        if (!Array.isArray(genres)) {
            genres = genres.split(',').map((genre: string) => genre.trim());
        }

        if (!Array.isArray(playLists)) {
            playLists = playLists.split(',').map((playList: string) => playList.trim());
        }

        if (!name || !genres) {

            res.status(404).send('Missing required data');
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

        const playListsIdArr = [];
        for (const playListId of playLists) {
            const playList = await prismaClient.playLists.findFirst({
                where: {
                    id: playListId
                }
            })
            if (playList) {
                playListsIdArr.push(playList.id);
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
            const imageId = uploadedCover.public_id;

            const audioUrl = uploadedAudio.secure_url;
            const audioId = uploadedAudio.public_id;
            const newTrack = await prismaClient.tracks.create({
                data: {
                    name: name,
                    genres: {
                        connect: genresIdArr.map(genresId => ({ id: genresId })),
                    },
                    Users: {
                        connect: {
                            id: "completar con el id del admin"
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
                    playLists: {
                        connect: playListsIdArr.map(playListId => ({ id: playListId }))
                    }
                }
            })
            return res.status(200).send(newTrack)
        }
        else res.status(404).send('Missing files')
    } catch (error) {
        res.status(500).send(error);
    }
}


export const getAllTracks = async (req: Request, res: Response) => {
    try {
        const tracks = await prismaClient.tracks.findMany();

        res.status(200).send(tracks)
    } catch (error) {
        res.status(500).send(error);
    }
}
export const getTrack = async (req: Request, res: Response) => {
    const { trackId } = req.params;

    try {
        const track = await prismaClient.tracks.findFirst({
            where: {
                id: trackId
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
export const updateTrack = async (req: Request, res: Response) => { }
export const deleteTrack = async (req: Request, res: Response) => {
    try {
        const { trackId } = req.params;

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
