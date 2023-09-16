import { Request, Response } from "express";
import prismaClient from "../db/clientPrisma";
import { uploadCover } from "../utils/cloudinary";
import fs from 'fs-extra'

export const createPlayListsByAdmin = async (req: Request, res: Response) => {
    try {
        const { name, description, privacity, listType, isTopTrend } = req.body;


        if (!name || !description || !privacity || !listType) {
            res.status(404).send('Missing required data');
        }

        if ((req.files as any)?.image) {

            const uploadedCover = await uploadCover((req.files as any).image.tempFilePath);
            await fs.unlink((req.files as any).image.tempFilePath)
            const imageUrl = uploadedCover.secure_url;
            const imageId = uploadedCover.public_id;

            let topTrend: boolean;
            isTopTrend === "true" ? topTrend = true : topTrend = false;

            const newPlaylist = await prismaClient.playLists.create({
                data: {
                    name: name,
                    imageUrl,
                    imageId,
                    description: description,
                    listType: listType,
                    privacity: privacity,
                    usersId: "completar con el id del admin",
                    isTopTrend: topTrend
                }
            })
            res.status(200).send(newPlaylist)
        }
    } catch (error) {
        res.status(500).send(error);
    }
}

export const createPlayList = async (req: Request, res: Response) => {
    try {
        const { userId } = req.params;
        const { name, description, privacity, listType } = req.body;

        if (!userId) {
            res.status(404).send('User not found');
        }

        if (!name || !description || !privacity || !listType) {
            res.status(404).send('Missing required data');
        }

        if ((req.files as any)?.image) {
            const uploadedCover = await uploadCover((req.files as any).image.tempFilePath);
            await fs.unlink((req.files as any).image.tempFilePath)
            const imageUrl = uploadedCover.secure_url;
            const imageId = uploadedCover.public_id;
            const newPlaylist = await prismaClient.playLists.create({
                data: {
                    name: name,
                    imageUrl,
                    imageId,
                    description: description,
                    listType: listType,
                    privacity: privacity,
                    usersId: userId,
                    isTopTrend: false
                }
            })
            res.status(200).send(newPlaylist)
        }
    } catch (error) {
        res.status(500).send(error);
    }
}

export const getTopPlaylists = async (req: Request, res: Response) => {
    try {
        const topPlaylists = await prismaClient.playLists.findFirst({
            where: {
                isTopTrend: true
            }
        })
        res.status(200).send(topPlaylists);
    } catch (error) {
        res.status(500).send(error)
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
