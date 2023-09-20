import { Request, Response } from "express";
import prismaClient from "../db/clientPrisma";
import { deleteImageMedia, uploadCover } from "../utils/cloudinary";
import fs from 'fs-extra'
import { adminIdentifier } from "../config/config";

export const createAlbumByAdmin = async (req: Request, res: Response) => {
    let imageId: string | null = null;
    let { name, genres, popularity, artistsNames, isTopTrend } = req.body;

    try {
        if (!name || !genres || !popularity || !artistsNames || !isTopTrend) {
            res.status(400).send({ error: "Missing one or more required fields" })
            return
        }

        if (!Array.isArray(artistsNames)) {
            artistsNames = artistsNames.split(',').map((artistId: string) => artistId.trim());
        }

        const artistsIdsArr = [];
        for (const artistName of artistsNames) {
            const artist = await prismaClient.artists.findFirst({
                where: {
                    name: artistName
                }
            })
            if (artistName && artist) {
                artistsIdsArr.push(artist.id);
            }
        }
        if (!Array.isArray(genres)) {
            genres = genres.split(',').map((genre: string) => genre.trim());
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
        if ((req.files as any)?.image) {

            const uploadedCover = await uploadCover((req.files as any).image.tempFilePath);
            await fs.unlink((req.files as any).image.tempFilePath)
            const imageUrl = uploadedCover.secure_url;
            imageId = uploadedCover.public_id;
            let topTrend: boolean;
            isTopTrend === "true" ? topTrend = true : topTrend = false;
            const newAlbum = await prismaClient.albums.create({
                data: {
                    name,
                    genres: {
                        connect: genresIdArr.map(genreId => ({ id: genreId }))
                    },
                    popularity: parseInt(popularity),
                    artists: {
                        connect: artistsIdsArr.map(artistId => ({ id: artistId }))
                    },
                    listType: "album",
                    isTopTrend: topTrend,
                    imageUrl,
                    imageId,
                    privacity: false,
                    verified: true,
                    owner: {
                        connect: {
                            id: adminIdentifier
                        }
                    }
                }
            })
            res.status(201).send(newAlbum);
        }
    } catch (error) {
        if (imageId) deleteImageMedia(imageId);
        res.status(500).send(error)
    }
}

export const createAlbum = async (req: Request, res: Response) => {
    let imageId: string | null = null;
    const { userId } = req.params
    let { name, genres, privacityString } = req.body;
    try {
        if (!name || !genres || !privacityString) {
            res.status(400).send({ error: "Missing one or more required fields" })
            return
        }

        if (!Array.isArray(genres)) {
            genres = genres.split(',').map((genre: string) => genre.trim());
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

        if ((req.files as any)?.image) {

            const uploadedCover = await uploadCover((req.files as any).image.tempFilePath);
            await fs.unlink((req.files as any).image.tempFilePath)
            const imageUrl = uploadedCover.secure_url;
            imageId = uploadedCover.public_id;

            let privacity: boolean;
            if (privacityString === "true") privacity = true
            else privacity = false

            const newAlbum = await prismaClient.albums.create({
                data: {
                    name,
                    genres: {
                        connect: genresIdArr.map(genreId => ({ id: genreId }))
                    },
                    popularity: 0,
                    listType: "album",
                    isTopTrend: false,
                    imageUrl,
                    imageId,
                    verified: false,
                    privacity: privacity,
                    owner: {
                        connect: {
                            id: userId
                        }
                    }
                }
            })
            res.status(201).send(newAlbum);
        }

    } catch (error) {
        if (imageId) deleteImageMedia(imageId)
        res.status(500).send(error)
    }
}
//----------------------------------------------------------------------

export const getTopAlbums = async (req: Request, res: Response) => {
    try {
        const topAlbums = await prismaClient.albums.findMany({
            where: {
                isTopTrend: true
            },
            include: {
                artists: true,
                tracks: {
                    include: {
                        artists: true,
                        album: true
                    }
                }
            }
        })
        res.status(200).send(topAlbums)
    } catch (error) {
        res.status(500).send(error)
    }
}
//----------------------------------------------------------------------
export const getAllAlbums = async (req: Request, res: Response) => {
    try {
        const albums = await prismaClient.albums.findMany({
            include: {
                artists: true,
                tracks: {
                    include: {
                        playlists: true,
                        artists: true
                    }
                },
                genres: true
            }
        });

        res.status(200).send(albums)
    } catch (error) {
        res.status(500).send(error);
    }
}

//----------------------------------------------------------------------
export const getAlbum = async (req: Request, res: Response) => {
    const { albumId } = req.params;

    try {
        const album = await prismaClient.albums.findFirst({
            where: {
                id: albumId
            },
            include: {
                artists: true,
                tracks: {
                    include: {
                        playlists: true,
                        artists: true
                    }
                },
                genres: true
            }
        });

        if (!album) {
            res.status(404).send({ error: "Album not found" })
            return
        }
        res.status(200).send(album)

    } catch (error) {
        res.status(500).send(error)
    }
}

//----------------------------------------------------------------------
export const updateAlbum = async (req: Request, res: Response) => { }

//----------------------------------------------------------------------
export const deleteAlbum = async (req: Request, res: Response) => {
    const { albumId } = req.params
    try {
        const albumToDelete = await prismaClient.albums.delete({
            where: {
                id: albumId
            }
        })
        res.status(204).send("Album deleted successfully.")
    } catch (error) {
        res.status(500).send(error)
    }
}
