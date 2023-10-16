import { Router } from 'express'
import { createArtistByAdmin, deleteArtist, getAllArtists, getArtist, getTopArtists, updateArtist } from '../controllers/artists.controllers';
import { checkJwtMiddleware } from '../middlewares/checkjwt.middleware';

const artistsRouter: Router = Router();

artistsRouter
    .post("/", checkJwtMiddleware, createArtistByAdmin)
    .get("/", getAllArtists)
    .get("/top", getTopArtists)
    .get("/:artistId", getArtist)
    .put("/:artistId", checkJwtMiddleware, updateArtist)
    .delete("/:artistId", checkJwtMiddleware, deleteArtist)

export default artistsRouter