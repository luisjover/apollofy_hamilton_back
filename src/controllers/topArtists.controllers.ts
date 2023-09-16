import { Request, Response } from "express";
import prismaClient from "../db/clientPrisma";


export const getTopArtists = async (req: Request, res: Response) => {
    try {
        const topArtists = await prismaClient.topArtists.findMany();
        res.status(200).send(topArtists);
    } catch (error) {
        res.status(500).send(error)
    }
}