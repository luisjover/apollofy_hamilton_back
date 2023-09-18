import { Request, Response } from "express";
import prismaClient from "../db/clientPrisma";
import { deleteImageMedia, uploadCover } from "../utils/cloudinary";
import fs from 'fs-extra'

export const createGenre = async (req: Request, res: Response) => {
    let imageId: string | null = null;
    const { name, color } = req.body;

    try {
        if (!name || !color) {
            res.status(400).send({ error: "Missing one or more required fields" })
            return
        }

        if ((req.files as any)?.image) {
            const uploadedCover = await uploadCover((req.files as any).image.tempFilePath);
            await fs.unlink((req.files as any).image.tempFilePath)
            const imageUrl = uploadedCover.secure_url;
            imageId = uploadedCover.public_id;
            const newGenre = await prismaClient.genres.create({
                data: {
                    name,
                    color,
                    imageUrl,
                    imageId,
                    listType: "genre"
                }
            });
            res.status(200).send(newGenre)
        }

    } catch (error) {
        if (imageId) deleteImageMedia(imageId);
        res.status(500).send(error)
    }
}

export const getGenres = async (req: Request, res: Response) => {
    try {
        const genres = await prismaClient.genres.findMany();
        res.status(200).send(genres);
    } catch (error) {
        res.status(500).send(error)
    }
}

export const deleteGenre = async (req: Request, res: Response) => {
    const { genreName } = req.params
    try {
        const genre = await prismaClient.genres.delete({
            where: {
                name: genreName
            }
        })
        res.status(204).send("Genre deleted successfully.")
    } catch (error) {
        res.status(500).send(error)
    }
}