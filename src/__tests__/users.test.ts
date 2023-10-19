
import { Request, Response } from "express";
import { prismaMock } from "../mocks/prisma.mock";
import { createUser } from "../controllers/users.controllers";


//Given, when, (and), then
//Arrange, act, assert

describe("Given a createUser function", () => {
    describe("when createUser is called with a valid data", () => {

        test("then should resolve with status 201 if created successfully", async () => {

            // Arrange
            const user = {
                id: "23",
                userName: "hamilton",
                email: "aithamiltonteam@gmail.com",
                imageUrl: "hg123.png",
                createdAt: new Date(Date.now()),
                updatedAt: new Date(Date.now()),
                trackList: [""],
                favourites: [""],
                usersId: "",
                playlists: [""],
                albums: [""],
                listType: "",
                followers: [""],
                followersIds: [""],
                following: [""],
                followingIds: [""]
            }

            const res: Partial<Response> = {
                status: jest.fn().mockReturnThis(),
                send: jest.fn(),
                json: jest.fn()
            }
            const req: Request = {
                body: {
                    userName: 'Jorge',
                    email: 'jorget@test.com',
                    imageUrl: "hola.png"
                }
            } as unknown as Request

            expect(user).toBeDefined();
            prismaMock.users.create.mockResolvedValue(user)

            await createUser(req, res as any)
            expect(res.status).toHaveBeenCalledWith(201);
            expect(res.send).toHaveBeenCalled();
        });
    });
});