import { Request, Response } from "express";
import prismaClient from "../db/clientPrisma";


export const createTrack = async (req: Request, res: Response) => { }
export const getAllTracks = async (req: Request, res: Response) => { }
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
export const deleteTrack = async (req: Request, res: Response) => { }