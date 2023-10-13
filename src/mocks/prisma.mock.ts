import Prisma from "@prisma/client";
import { mockDeep, mockReset } from "jest-mock-extended";


import prismaClient from "../db/clientPrisma";

jest.mock("../db/clientPrisma", () => ({
    __esModule: true, default: mockDeep<Prisma.PrismaClient>()
}));

beforeEach(() => {
    mockReset(prismaMock);
});

export const prismaMock = prismaClient;