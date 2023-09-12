import { Router } from 'express'
import { createAlbum, deleteAlbum, getAlbum, getAllAlbums, updateAlbum } from '../controllers/albums.controllers';

const albumsRouter: Router = Router();

albumsRouter
    .post("/", createAlbum)
    .get("/", getAllAlbums)
    .get("/:albumId", getAlbum)
    .put("/:albumId", updateAlbum)
    .delete("/:albumId", deleteAlbum)

export default albumsRouter