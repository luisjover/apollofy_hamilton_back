import { createTrack, updateTrack, deleteTrack, getAllTracks, getTrackById } from "../controllers/tracks.controllers";
import { prismaMock } from "../mocks/prisma.mock";


//Given, when, (and), then
//Arrange, act, assert

describe("Given a createTrack function", () => {
    describe("when createTrack is called with a valid data", () => {
        test("then should resolve with the given object", async () => { // Added 'async' keyword to use await
            // Arrange
            const user = {
                id: 1,
                name: "Jose Luis",
                email: "joseluis@getMaxListeners.com"
            };
            prismaMock.tracks.create.mockResolvedValue(user);
        });
    });
});