import { Request, Response } from "express";
import prismaClient from "../db/clientPrisma";


export const createArtist = async (req: Request, res: Response) => { }
export const getAllArtists = async (req: Request, res: Response) => { }
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