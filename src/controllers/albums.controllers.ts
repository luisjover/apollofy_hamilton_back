import { Request, Response } from "express";
import prismaClient from "../db/clientPrisma";
import { uploadCover } from "../utils/cloudinary";
import fs from 'fs-extra'

export const createAlbumByAdmin = async (req: Request, res: Response) => {
    let { name, genres, popularity, artistsNames, isTopTrend } = req.body;
    try {
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
            const imageId = uploadedCover.public_id;
            let topTrend: boolean;
            isTopTrend === "true" ? topTrend = true : topTrend = false;
            const newAlbum = await prismaClient.albums.create({
                data: {
                    name,
                    genres: {
                        connect: genresIdArr.map(genreId => ({ id: genreId }))
                    },
                    popularity,
                    artists: {
                        connect: artistsIdsArr.map(artistId => ({ id: artistId }))
                    },
                    listType: "album",
                    isTopTrend: topTrend,
                    imageUrl,
                    imageId
                }
            })
            res.status(201).send(newAlbum);
        }
    } catch (error) {
        res.status(500).send(error)
    }
}

export const getTopAlbums = async (req: Request, res: Response) => {
    try {
        const topAlbums = await prismaClient.albums.findMany({
            where: {
                isTopTrend: true
            }
        })
        res.status(200).send(topAlbums)
    } catch (error) {
        res.status(500).send(error)
    }
}

export const getAllAlbums = async (req: Request, res: Response) => {
    try {
        const albums = await prismaClient.albums.findMany();

        res.status(200).send(albums)
    } catch (error) {
        res.status(500).send(error);
    }
}


export const getAlbum = async (req: Request, res: Response) => {
    const { albumId } = req.params;

    try {
        const album = await prismaClient.albums.findFirst({
            where: {
                id: albumId
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
export const updateAlbum = async (req: Request, res: Response) => { }
export const deleteAlbum = async (req: Request, res: Response) => { }
