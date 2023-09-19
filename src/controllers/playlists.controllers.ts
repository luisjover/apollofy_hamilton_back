import { Request, Response } from "express";
import prismaClient from "../db/clientPrisma";
import { deleteImageMedia, uploadCover } from "../utils/cloudinary";
import fs from 'fs-extra'
import { adminIdentifier } from "../config/config";

export const createPlayListsByAdmin = async (req: Request, res: Response) => {
    let imageId: string | null = null;
    try {
        const { name, description, isTopTrend } = req.body;


        if (!name || !description) {
            res.status(404).send('Missing required data');
            return;
        }

        if ((req.files as any)?.image) {

            const uploadedCover = await uploadCover((req.files as any).image.tempFilePath);
            await fs.unlink((req.files as any).image.tempFilePath)
            const imageUrl = uploadedCover.secure_url;
            imageId = uploadedCover.public_id;

            let topTrend: boolean;
            isTopTrend === "true" ? topTrend = true : topTrend = false;

            const adminId = adminIdentifier as string;

            const newPlaylist = await prismaClient.playlists.create({
                data: {
                    name,
                    imageUrl,
                    imageId,
                    description: description,
                    listType: "playlist",
                    privacity: false,
                    verified: true,
                    owner: {
                        connect: {
                            id: adminId
                        }
                    },
                    isTopTrend: topTrend
                }
            })
            res.status(200).send(newPlaylist)
        }
    } catch (error) {
        if (imageId) deleteImageMedia(imageId);
        console.log(error);
        res.status(500).send(error);
    }
}
//-----------------------------------------------------------------
export const createPlayList = async (req: Request, res: Response) => {
    let imageId: string | null = null;
    try {
        const { userId } = req.params;
        const { name, description, privacityString } = req.body;

        if (!userId) {
            res.status(404).send('User not found');
        }

        if (!name || !description || !privacityString) {
            res.status(404).send('Missing required data');
        }

        let privacity: boolean;
        if (privacityString === "true") privacity = true;
        else privacity = false;

        if ((req.files as any)?.image) {
            const uploadedCover = await uploadCover((req.files as any).image.tempFilePath);
            await fs.unlink((req.files as any).image.tempFilePath)
            const imageUrl = uploadedCover.secure_url;
            imageId = uploadedCover.public_id;
            const newPlaylist = await prismaClient.playlists.create({
                data: {
                    name,
                    imageUrl,
                    imageId,
                    description: description,
                    listType: "playlist",
                    privacity: privacity,
                    verified: false,
                    owner: {
                        connect: {
                            id: userId
                        }
                    },
                    isTopTrend: false
                }
            })
            res.status(200).send(newPlaylist)
        }
    } catch (error) {
        if (imageId) deleteImageMedia(imageId);
        res.status(500).send(error);
    }
}
//---------------------------------------------------------------------------
export const getTopPlaylists = async (req: Request, res: Response) => {
    try {
        const topPlaylists = await prismaClient.playlists.findMany({
            where: {
                isTopTrend: true
            },
            include: {
                tracks: true
            }
        })
        res.status(200).send(topPlaylists);
    } catch (error) {
        res.status(500).send(error)
    }
}
//---------------------------------------------------------------------------
export const getAllPlayLists = async (req: Request, res: Response) => {
    try {
        const playLists = await prismaClient.playlists.findMany({
            include: {
                tracks: true
            }
        });

        res.status(200).send(playLists)
    } catch (error) {
        res.status(500).send(error);
    }
}
//---------------------------------------------------------------------------
export const getPlayList = async (req: Request, res: Response) => {
    const { playListId } = req.params;

    try {
        const playList = await prismaClient.playlists.findFirst({
            where: {
                id: playListId
            },
            include: {
                tracks: true
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
//---------------------------------------------------------------------------
export const getUserPlaylistsById = async (req: Request, res: Response) => {
    const { userId } = req.params
    try {
        const user = await prismaClient.users.findFirst({
            where: {
                id: userId
            },
            include: {
                playlists: true
            }
        })
        const userPlaylists = user?.playlists
        res.status(200).send(userPlaylists);
    } catch (error) {
        res.status(500)
    }
}
//---------------------------------------------------------------------------
export const updatePlayList = async (req: Request, res: Response) => { }
//---------------------------------------------------------------------------
export const deletePlayListById = async (req: Request, res: Response) => {
    const { playlistId } = req.params;
    try {
        await prismaClient.playlists.delete({
            where: {
                id: playlistId
            }
        })
        res.status(204).send("Playlist deleted successfully");
    } catch (error) {
        res.status(500).send(error);
    }
}
