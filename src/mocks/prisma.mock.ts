import Prisma, { PrismaClient } from "@prisma/client";
import { mockReset } from "jest-mock-extended";
import prismaClient from "../db/clientPrisma";


// Crea un cliente de Prisma mockeado
const prismaMock = new PrismaClient();

// Mockea el método "create" del modelo "User" en el cliente de Prisma mockeado
prismaMock.users.create = jest.fn();


// jest.mock("../db/clientPrisma.ts", () => ({
//     __esModule: true, default: mockDeep<Prisma.PrismaClient>()
// }));
jest.mock("../db/clientPrisma.ts", () => ({
    prisma: prismaMock
}));


// beforeEach(() => {
//     mockReset(prismaMock);
// });
export default prismaMock;
// export const prismaMock = Prisma as unknown as DeepMockProxy<PrismaClient>