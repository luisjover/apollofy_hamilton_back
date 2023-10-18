module.exports = {
    preset: 'ts-jest',
    testEnvironment: 'node',
    transform: {
        '^.+\.ts?$': 'ts-jest',
    },
    transformIgnorePatterns: ['<rootDir>/node_modules/'],
    setupFilesAfterEnv: ["<rootDir>/src/mocks/prisma.mock.ts"],
};


// module.exports = {
//     clearMocks: true,
//     preset: "ts-jest",
//     testEnvironment: "node",
//     setupFilesAfterEnv: ["<rootDir>/src/mocks/prisma.mock.ts"],
// };
