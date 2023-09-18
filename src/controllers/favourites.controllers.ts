import { Request, Response } from "express"
import prismaClient from "../db/clientPrisma"

export const createFavourites = async (req: Request, res: Response) => {
    const { userId } = req.params
    const { listType, listTypeId } = req.body
    try {
        let favourite;
        if (listType === "artist") {
            const artistToAdd = await prismaClient.artists.findUnique({
                where: {
                    id: listTypeId
                }
            })
            favourite = await prismaClient.favourites.create({
                data: {
                    user: {
                        connect: {
                            id: userId
                        }
                    },
                    artist: {
                        connect: {
                            id: artistToAdd?.id
                        }
                    },
                    listType
                }
            })
        } else if (listType === "album") {
            const albumToAdd = await prismaClient.albums.findUnique({
                where: {
                    id: listTypeId
                }
            })
            favourite = await prismaClient.favourites.create({
                data: {
                    user: {
                        connect: {
                            id: userId
                        }
                    },
                    album: {
                        connect: {
                            id: albumToAdd?.id
                        }
                    },
                    listType
                }
            })
        } else if (listType === "playlist") {
            const playlistToAdd = await prismaClient.playLists.findUnique({
                where: {
                    id: listTypeId
                }
            })
            favourite = await prismaClient.favourites.create({
                data: {
                    user: {
                        connect: {
                            id: userId
                        }
                    },
                    playlist: {
                        connect: {
                            id: playlistToAdd?.id
                        }
                    },
                    listType
                }
            })
        }
        res.status(201).send(favourite)
    } catch (error) {
        res.status(500).send(error)
    }
}
//----------------------------------------------------------------------------
export const deleteFavourites = async (req: Request, res: Response) => {
    const { favouriteId } = req.params
    try {
        const favourite = await prismaClient.favourites.delete({
            where: {
                id: favouriteId
            }
        })
    } catch (error) {
        res.status(500).send(error)
    }
}