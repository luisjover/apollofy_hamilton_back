import { Request, Response } from "express";
import prismaClient from "../db/clientPrisma";


export const getTopAPlaylists = async (req: Request, res: Response) => {
    try {
        const topPlaylists = await prismaClient.topPlaylists.findMany();
        res.status(200).send(topPlaylists);
    } catch (error) {
        res.status(500).send(error)
    }
}