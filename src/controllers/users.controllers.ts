import { Request, Response } from "express";
import { prismaClient } from "../db/clientPrisma";



//---------------- CREATE USER ----------------
export const createUser = async (req: Request, res: Response) => {
    const { id, name, email, imageUrl, createdAt, updatedAt } = req.body;
    console.log(name, email);
    try {
        // Make sure all required fields are available
        if (!name || !email) {
            res.status(400).send({ error: "Missing required fields." });
            return
        }

        // Create new user
        const newUser = await prismaClient.users.create({
            data: {
                id,
                userName: name,
                email: email
            }
        })

        res.status(201).send(newUser);

    } catch (error) {
        res.status(500).send(error);
    }
}