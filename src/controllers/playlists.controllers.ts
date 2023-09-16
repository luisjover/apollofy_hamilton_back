import { Request, Response } from "express";
import prismaClient from "../db/clientPrisma";


export const createPlayList = async (req: Request, res: Response) => {
    try {
        const { userId } = req.params;
        const { name, imageUrl, description, privacity, listType } = req.body;

        if (!userId) {
            res.status(404).send('User not found');
        }

        if (!name || !imageUrl || !description || !privacity || !listType) {
            res.status(404).send('Missing required data');
        }



        const newPlaylist = await prismaClient.playLists.create({
            data: {
                name: name,
                imageUrl: imageUrl,
                description: description,
                listType: listType,
                privacity: privacity,
                usersId: userId,
                isTopTrend: false
            }
        })
        res.status(200).send(newPlaylist)
    } catch (error) {
        res.status(500).send(error);
    }
}
export const getAllPlayLists = async (req: Request, res: Response) => {
    try {
        const playLists = await prismaClient.playLists.findMany();

        res.status(200).send(playLists)
    } catch (error) {
        res.status(500).send(error);
    }
}
export const getPlayList = async (req: Request, res: Response) => {
    const { playListId } = req.params;

    try {
        const playList = await prismaClient.playLists.findFirst({
            where: {
                id: playListId
            }
        });

        if (!playList) {
            res.status(404).send({ error: "PlayList not found" })
            return
        }
        res.status(200).send(playList)

    } catch (error) {
        res.status(500).send(error)
    }
}
export const updatePlayList = async (req: Request, res: Response) => { }
export const deletePlayList = async (req: Request, res: Response) => { }
