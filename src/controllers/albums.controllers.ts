import { Request, Response } from "express";
import prismaClient from "../db/clientPrisma";

// export const createAlbumByAdmin = async (req: Request, res: Response) => { 
//     const {name, genres, popularity, artists, isTopTrends} = req.body;
//     try{
//         const newAlbum = await prismaClient.albums.create({
//             data: {

//             }
//         })

//     } catch(error) {
//         res.status(500).send(error)
//     }
// }


export const getAllAlbums = async (req: Request, res: Response) => {
    try {
        const albums = await prismaClient.albums.findMany();

        res.status(200).send(albums)
    } catch (error) {
        res.status(500).send(error);
    }
}


export const getAlbum = async (req: Request, res: Response) => {
    const { albumId } = req.params;

    try {
        const album = await prismaClient.albums.findFirst({
            where: {
                id: albumId
            }
        });

        if (!album) {
            res.status(404).send({ error: "Album not found" })
            return
        }
        res.status(200).send(album)

    } catch (error) {
        res.status(500).send(error)
    }
}
export const updateAlbum = async (req: Request, res: Response) => { }
export const deleteAlbum = async (req: Request, res: Response) => { }
