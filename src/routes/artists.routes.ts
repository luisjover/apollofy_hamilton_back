import { Router } from 'express'
import { createArtistByAdmin, deleteArtist, getAllArtists, getArtist, getTopArtists, updateArtist } from '../controllers/artists.controllers';

const artistsRouter: Router = Router();

artistsRouter
    .post("/", createArtistByAdmin)
    .get("/", getAllArtists)
    .get("/top", getTopArtists)
    .get("/:artistId", getArtist)
    .put("/:artistId", updateArtist)
    .delete("/:artistId", deleteArtist)

export default artistsRouter