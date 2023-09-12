import { Router } from 'express'
import { createArtist, deleteArtist, getAllArtists, getArtist, updateArtist } from '../controllers/artists.controllers';

const artistsRouter: Router = Router();

artistsRouter
    .post("/", createArtist)
    .get("/", getAllArtists)
    .get("/:artistId", getArtist)
    .put("/:artistId", updateArtist)
    .delete("/:artistId", deleteArtist)

export default artistsRouter