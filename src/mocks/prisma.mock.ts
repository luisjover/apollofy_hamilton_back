import Prisma, { PrismaClient } from "@prisma/client";
import { DeepMockProxy, mockDeep, mockReset } from "jest-mock-extended";


import prismaClient from "../db/clientPrisma";

jest.mock("../db/clientPrisma.ts", () => ({
    __esModule: true, default: mockDeep<Prisma.PrismaClient>()
}));

beforeEach(() => {
    mockReset(prismaMock);
});
export const prismaMock = Prisma as unknown as DeepMockProxy<PrismaClient>
// export const prismaMock = prismaClient;