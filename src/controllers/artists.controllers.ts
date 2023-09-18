import { Request, Response } from "express";
import prismaClient from "../db/clientPrisma";
import { uploadCover } from "../utils/cloudinary";
import fs from 'fs-extra'


export const createArtistByAdmin = async (req: Request, res: Response) => {
    let { name, genres, popularity, isTopTrend } = req.body;
    try {
        if ((req.files as any)?.image && (req.files as any)?.audio) {

            const uploadedCover = await uploadCover((req.files as any).image.tempFilePath);
            await fs.unlink((req.files as any).image.tempFilePath)
            const imageUrl = uploadedCover.secure_url;
            const imageId = uploadedCover.public_id;

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

            let topTrend: boolean;
            isTopTrend === "true" ? topTrend = true : topTrend = false;

            const newArtist = await prismaClient.artists.create({
                data: {
                    name,
                    genres: {
                        connect: genresIdArr.map(genreId => ({ id: genreId }))
                    },
                    popularity,
                    isTopTrend: topTrend,
                    imageUrl,
                    imageId,
                    listType: "artist"
                }
            })

            res.status(201).send(newArtist);
        }

    } catch (error) {
        res.status(500).send(error)
    }
}

export const getTopArtists = async (req: Request, res: Response) => {
    try {
        const topArtists = await prismaClient.artists.findMany({
            where: {
                isTopTrend: true
            }
        })
        res.status(200).send(topArtists);
    } catch (error) {
        res.status(500).send(error);
    }
}

export const getAllArtists = async (req: Request, res: Response) => {
    try {
        const artists = await prismaClient.artists.findMany();

        res.status(200).send(artists)
    } catch (error) {
        res.status(500).send(error);
    }
}
export const getArtist = async (req: Request, res: Response) => {
    const { artistId } = req.params;

    try {
        const artist = await prismaClient.artists.findFirst({
            where: {
                id: artistId
            }
        });

        if (!artist) {
            res.status(404).send({ error: "Artist not found" })
            return
        }
        res.status(200).send(artist)

    } catch (error) {
        res.status(500).send(error)
    }
}
export const updateArtist = async (req: Request, res: Response) => { }
export const deleteArtist = async (req: Request, res: Response) => { }
