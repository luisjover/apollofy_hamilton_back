import { Request, Response } from "express";
import prismaClient from "../db/clientPrisma";
import { uploadCover, uploadTrack, deleteMedia } from "../utils/cloudinary";
import fs from 'fs-extra'


export const createTrack = async (req: Request, res: Response) => {
    try {
        const { userId } = req.params;
        const { name, genres } = req.body;

        if (!userId) {
            res.status(404).send('User not found');
        }

        if (!name || !genres) {
            res.status(404).send('Missing required data');
        }
        const genresIdArr = [];
        for (const genreName of genres) {
            const genreId = await prismaClient.genres.findFirst({
                where: {
                    name: genreName
                }
            })
            if (genreId) {
                genresIdArr.push(genreId);
            }
        }

        if ((req.files as any)?.image && (req.files as any)?.audio) {
            const uploadedCover = await uploadCover((req.files as any).image.tempFilePath);
            const uploadedAudio = await uploadTrack((req.files as any).audio.tempFilePath);

            await fs.unlink((req.files as any).image.tempFilePath)
            await fs.unlink((req.files as any).audio.tempFilePath)

            const newTrack = await prismaClient.tracks.create({
                data: {
                    name: name,
                    genres: {
                        connect: genresIdArr.map(genresId => ({ id: genresId.id })),
                    },
                    imageUrl: uploadedCover.secure_url,
                    imageId: uploadedCover.public_id,
                    audioUrl: uploadedAudio.secure_url,
                    audioId: uploadedAudio.public_id,
                    likes: 0,
                    verified: false,
                }
            })
            res.status(200).send(newTrack)
        }
        res.status(404).send('Missing files')
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
        }

        await deleteMedia(targetTrack.audioId);
        await deleteMedia(targetTrack.imageId);
        res.status(200).send('Track deleted successfully')
    } catch (error) {
        res.status(500).send(error)
    }
}
