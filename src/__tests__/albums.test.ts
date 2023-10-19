
import { Request, Response } from "express";
import { prismaMock } from "../mocks/prisma.mock";
import { deleteAlbum } from "../controllers/albums.controllers";


//Given, when, (and), then
//Arrange, act, assert

describe("Given a createAlbum function", () => {
    describe("when createAlbum is deleted", () => {
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
        test("then should resolve with status 204", async () => {

            const res: Partial<Response> = {
                status: jest.fn().mockReturnThis(),
                send: jest.fn(),
                json: jest.fn()
            }
            const req: Request = {
                params: { albumId: "234i7tv43" }
            } as unknown as Request

            prismaMock.albums.findFirst.mockResolvedValue(album)
            prismaMock.albums.delete.mockResolvedValue(album)
            prismaMock.favourites.findMany.mockResolvedValue([favourites])
            prismaMock.favourites.delete.mockResolvedValue(favourites)
            prismaMock.tracks.delete.mockResolvedValue(track)

            await deleteAlbum(req, res as any)
            expect(res.status).toHaveBeenCalledWith(204);
            expect(res.send).toHaveBeenCalled();
        });
    });
});