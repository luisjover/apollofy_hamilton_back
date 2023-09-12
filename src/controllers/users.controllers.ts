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
export const getAllUsers = async (req: Request, res: Response) => { }
export const getUser = async (req: Request, res: Response) => {
    const { userId } = req.params;

    try {
        const user = await prismaClient.users.findFirst({
            where: {
                id: userId
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
export const deleteUser = async (req: Request, res: Response) => { }