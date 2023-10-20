import { PrismaClient } from "@prisma/client";
import { DeepMockProxy, mockDeep, mockReset } from "jest-mock-extended";
import prismaClient from "../db/clientPrisma";


jest.mock("../db/clientPrisma.ts", () => ({
    __esModule: true, default: mockDeep<PrismaClient>()
}));

jest.mock('../utils/cloudinary.ts', () => ({
    uploadImageBase64: jest.fn(() => {
        return ({
            secure_url: 'https://example.com/mock-image-url.jpg',
            public_id: "1234"
        })
    }),
    uploadAudioBase64: jest.fn(() => {
        return ({
            secure_url: 'https://res.cloudinary.com/dmeh7kzjm/video/upload/v1697495893/tracks/iwkqbmtwlhhvedmorbzq.mp3',
            public_id: "1234567"
        })
    }),
    deleteAudioMedia: jest.fn(() => {
        return ({
            public_id: "12343465"
        })
    }),
    deleteImageMedia: jest.fn(() => {
        return ({
            public_id: "1234567"
        })
    })
}))


beforeEach(() => {
    mockReset(prismaMock);
});

export const prismaMock = prismaClient as unknown as DeepMockProxy<PrismaClient>