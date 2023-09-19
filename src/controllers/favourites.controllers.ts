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
            res.status(201).send(favourite)
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
            res.status(201).send(favourite)
        } else if (listType === "playlist") {
            const playlistToAdd = await prismaClient.playlists.findUnique({
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
            res.status(201).send(favourite)
        } else if (listType === "track") {
            const trackToAdd = await prismaClient.tracks.findUnique({
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
                    track: {
                        connect: {
                            id: trackToAdd?.id
                        }
                    },
                    listType
                }
            })
            res.status(201).send(favourite)
        } else {
            res.status(404).send("Favourite not added.")
        }

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
        res.status(204).send("Favourite item deleted successfully!")
    } catch (error) {
        res.status(500).send(error)
    }
}

export const getAllFavourites = async (req: Request, res: Response) => {
    try {
        const favourites = await prismaClient.favourites.findMany();
        res.status(200).send(favourites)
    } catch (error) {
        res.status(500).send(error)
    }
}