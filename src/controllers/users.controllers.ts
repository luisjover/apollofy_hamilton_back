import { Request, Response } from "express";
import prismaClient from "../db/clientPrisma";

export const createUser = async (req: Request, res: Response) => {
    const { userName, email, imageUrl } = req.body;

    try {
        if (!userName || !email || !imageUrl) {
            res.status(400).send({ error: "Missing one or more required fields" })
            return
        }


        const newUser = await prismaClient.users.create({
            data: {
                userName: userName,
                email: email,
                imageUrl: imageUrl,
                listType: "user"
            }
        });
        const user = await prismaClient.users.findFirst({
            where: {
                id: newUser.id
            },
            include: {
                trackList: true,
                followers: true,
                following: true,
                playlists: {
                    include: {
                        tracks: true
                    }
                },
                albums: {
                    include: {
                        tracks: true
                    }
                },
                favourites: true
            }
        })

        res.status(200).send(user)

    } catch (error) {
        res.status(500).send(error)
    }
}
//----------------------------------------------------------------------------

export const getAllUsers = async (req: Request, res: Response) => {

    try {
        const users = await prismaClient.users.findMany({
            include: {
                playlists: {
                    include: {
                        tracks: true
                    }
                },
                followers: true,
                following: true,
                albums: {
                    include: {
                        tracks: true
                    }
                },
                trackList: true,
                favourites: {
                    include: {
                        album: true,
                        artist: true,
                        playlist: true,
                        track: true
                    }
                }
            }
        });

        res.status(200).send(users)
    } catch (error) {
        res.status(500).send(error);
    }
}
//----------------------------------------------------------------------------
export const getUserById = async (req: Request, res: Response) => {
    const { userId } = req.params;

    try {
        const user = await prismaClient.users.findFirst({
            where: {
                id: userId
            },
            include: {
                followers: true,
                following: true,
                playlists: {
                    include: {
                        tracks: true
                    }
                },
                albums: {
                    include: {
                        tracks: true
                    }
                },
                favourites: {
                    include: {
                        album: true,
                        artist: true,
                        playlist: true,
                        track: true
                    }
                },
                trackList: {
                    include: {
                        playlists: true,
                        artists: true
                    }
                }
            }
        });

        if (!user) {
            res.status(404).send({ error: "User not found" })
            return
        }
        res.status(200).send(user)

    } catch (error) {
        res.status(500).send(error)
    }
}
//----------------------------------------------------------------------------
export const getUserByEmail = async (req: Request, res: Response) => {
    const { userEmail } = req.params;

    try {
        const user = await prismaClient.users.findFirst({
            where: {
                email: userEmail
            },
            include: {
                trackList: {
                    include: {
                        album: true,
                        artists: true,
                        playlists: true
                    }
                },
                playlists: {
                    include: {
                        tracks: true
                    }
                },
                followers: true,
                following: true,
                albums: {
                    include: {
                        tracks: true
                    }
                },
                favourites: {
                    include: {
                        album: true,
                        artist: true,
                        playlist: true,
                        track: true
                    }
                }
            }
        });

        if (!user) {
            res.status(404).send({ error: "User not found" })
            return
        }
        res.status(200).send(user)

    } catch (error) {
        res.status(500).send(error)
    }
}
//----------------------------------------------------------------------------
export const updateUserFollowingById = async (req: Request, res: Response) => {
    const { userId } = req.params
    const { followingId, action } = req.body
    //action must be follow or unfollow
    try {

        const followingUser = await prismaClient.users.findFirst({
            where: {
                id: followingId
            }
        })

        if (!followingUser) {
            res.status(404).send("User not found.")
        }

        if (action === "follow" && followingUser) {

            const user = await prismaClient.users.update({
                where: {
                    id: userId
                },
                data: {
                    following: {
                        connect: {
                            id: followingId
                        }
                    }
                }
            })
            res.status(201).send(user)
        } else if (action === "unfollow" && followingUser) {
            const user = await prismaClient.users.update({
                where: {
                    id: userId
                },
                data: {
                    following: {
                        disconnect: {
                            id: followingId
                        }
                    }
                }
            })
            res.status(201).send(user)
        }

    } catch (error) {

        res.status(500).send(error)
    }
}
//----------------------------------------------------------------------------

//----------------------------------------------------------------------------
export const deleteUser = async (req: Request, res: Response) => {
    try {
        const { userId } = req.params;

        const targetUser = await prismaClient.users.delete({
            where: {
                id: userId
            }
        })
        if (!targetUser) {
            res.status(404).send('User not found')
        }

        res.status(200).send('User deleted successfully')
    } catch (error) {
        res.status(500).send(error)
    }
}
