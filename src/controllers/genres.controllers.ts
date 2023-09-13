import { Request, Response } from "express";
import prismaClient from "../db/clientPrisma";


export const createGenre = async (req: Request, res: Response) => {

    const { name } = req.body;

    try {
        if (!name) {
            res.status(400).send({ error: "Missing one or more required fields" })
            return
        }


        const newGenre = await prismaClient.genres.create({
            data: { name }
        });


        res.status(200).send(newGenre)

    } catch (error) {
        res.status(500).send(error)
    }
}