
import { Request, Response } from "express";
import { prismaMock } from "../mocks/prisma.mock";


//Given, when, (and), then
//Arrange, act, assert

describe("Given a createTrack function", () => {
    describe("when createTrack is called with a valid data", () => {
        test("then should resolve with the given object", async () => { // Added 'async' keyword to use await
            // Arrange
            const user = {
                name: "",
                email: "",
                imageUrl: ""
            }
            const res: Partial<Response> = {
                status: jest.fn().mockReturnThis(),
                send: jest.fn()
            }
            const req: Request = {
                params: { userId: '1' },
                body: {
                    userName: 'Jorge',
                    userEmail: 'jorget@test.com'
                },
                files: {
                    userImage: {
                        tempFilePath: '/path/to/temp/image.png',
                        name: 'image.png',
                        mv: (destination: string, callback: (err?: Error) => void) => {
                            // Implement the mv function as needed
                        },
                        encoding: 'utf-8',
                        mimetype: 'image/png',
                    }
                }
            } as unknown as Request
            // await createUser(req, res)

            // expect(prismaClientMock.users.create).toHaveBeenCalled();
        });
    });
});