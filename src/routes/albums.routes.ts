import { Router } from 'express'
import { createAlbum, createAlbumByAdmin, deleteAlbum, getAlbum, getAllAlbums, getTopAlbums, updateAlbum } from '../controllers/albums.controllers';
import { checkJwtMiddleware } from '../middlewares/checkjwt.middleware';

const albumsRouter: Router = Router();

albumsRouter
    .post("/", checkJwtMiddleware, createAlbumByAdmin)
    .post("/:userId", checkJwtMiddleware, createAlbum)
    .get("/", checkJwtMiddleware, getAllAlbums)
    .get("/top", getTopAlbums)
    .get("/:albumId", checkJwtMiddleware, getAlbum)
    .put("/:albumId", checkJwtMiddleware, updateAlbum)
    .delete("/:albumId", checkJwtMiddleware, deleteAlbum)

export default albumsRouter