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
            data: { userName, email, imageUrl }
        });


        res.status(200).send(newUser)

    } catch (error) {
        res.status(500).send(error)
    }
}
export const getAllUsers = async (req: Request, res: Response) => {
    try {
        const users = await prismaClient.users.findMany();

        res.status(200).send(users)
    } catch (error) {
        res.status(500).send(error);
    }
}
export const getUser = async (req: Request, res: Response) => {
    const { userId } = req.params;

    try {
        const user = await prismaClient.users.findFirst({
            where: {
                id: userId
            },
            include: {
                trackList: true
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
export const updateUser = async (req: Request, res: Response) => { }
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
