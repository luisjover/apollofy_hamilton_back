import { Request, Response } from "express";
import prismaClient from "../db/clientPrisma";


export const getTopAlbums = async (req: Request, res: Response) => {
    try {
        const topAlbums = await prismaClient.topAlbums.findMany();
        res.status(200).send(topAlbums);
    } catch (error) {
        res.status(500).send(error)
    }
}