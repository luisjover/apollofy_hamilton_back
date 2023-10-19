
import { Request, Response } from "express";
import { prismaMock } from "../mocks/prisma.mock";
import { createTrack, deleteTrack } from "../controllers/tracks.controllers";


//Given, when, (and), then
//Arrange, act, assert

describe("Given a createTrack function", () => {
    describe("when createTrack is called with a valid data", () => {
        // Arrange
        const user = {
            id: "3674537864gew6",
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
        const album = {
            id: "12343kjhb76r439",
            name: "new album",
            genres: [""],
            owner: user,
            imageUrl: "1i23yurg678.png",
            imageId: "325314",
            popularity: 123,
            privacity: false,
            verified: false,
            artistId: [""],
            artists: [""],
            tracks: [""],
            listType: "album",
            isTopTrend: false,
            usersId: "kjh23r",
            favourites: {},
            favouritesId: "fu4iu"
        }
        const track = {
            id: "652da0f28b2e7d3586c8ef64",
            name: "hamilton",
            imageUrl: "https://example.com/mock-image-url.jpg",
            artists: [""],
            artistsIds: [""],
            likes: 2143,
            genresId: [""],
            genres: ["pop"],
            audioUrl: "https://res.cloudinary.com/dmeh7kzjm/video/upload/v1697495893/tracks/iwkqbmtwlhhvedmorbzq.mp3",
            verified: false,
            privacity: false,
            duration: 123,
            imageId: "1234",
            audioId: "123443",
            album: {},
            albumsId: "2443",
            user: user,
            userId: "1234e",
            playlists: [""],
            playlistIds: [""],
            listType: "",
            favourites: {},
            favouritesId: "124"
        }
        const favourites = {
            id: "234123",
            artist: null,
            album: {},
            playlist: null,
            track: null,
            user: {},
            userId: "23451r",
            listType: "album"
        }
        const res: Partial<Response> = {
            status: jest.fn().mockReturnThis(),
            send: jest.fn(),
            json: jest.fn()
        }


        test("it should give a 404 status when missing audio or image", async () => {
            const req: Request = {
                params: { userId: "3674537864gew6" },
                body: {
                    name: "hamilton",
                    genres: "pop",
                    privacityString: "false",
                    playlists: "",
                    albumName: ""
                }
            } as unknown as Request


            expect(track).toBeDefined();
            prismaMock.tracks.create.mockResolvedValue(track)
            await createTrack(req, res as any);
            expect(res.status).toHaveBeenCalledWith(404)
        })

        test("then should resolve with 201 if created successfully", async () => {
            const req: Request = {
                params: { userId: "3674537864gew6" },
                body: {
                    name: "hamilton",
                    genres: "pop",
                    privacityString: "false",
                    playlists: "",
                    albumName: "",
                    audio: "https://res.cloudinary.com/dmeh7kzjm/video/upload/v1697495893/tracks/iwkqbmtwlhhvedmorbzq.mp3",
                    image: "https://example.com/mock-image-url.jpg"
                }
            } as unknown as Request

            expect(track).toBeDefined();

            prismaMock.tracks.create.mockResolvedValue(track)
            prismaMock.users.findUnique.mockResolvedValue(user)
            prismaMock.albums.create.mockResolvedValue(album)
            prismaMock.albums.findFirst.mockResolvedValue(album)

            await createTrack(req, res as any);
            expect(res.status).toHaveBeenCalledWith(201)
            expect(res.send).toHaveBeenCalled();

        });

        test("then should resolve with status 204 after deleting track", async () => {
            const req: Request = {
                params: { userId: "3674537864gew6" }
            } as unknown as Request

            expect(track).toBeDefined();

            prismaMock.favourites.delete.mockResolvedValue(favourites)
            prismaMock.favourites.findMany.mockResolvedValue([favourites])
            prismaMock.tracks.delete.mockResolvedValue(track)

            await deleteTrack(req, res as any);

            expect(res.status).toHaveBeenCalledWith(204)
            expect(res.send).toHaveBeenCalledWith("Track deleted successfully");
        })
    });
});