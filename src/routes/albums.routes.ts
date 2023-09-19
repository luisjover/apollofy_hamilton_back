import { Router } from 'express'
import { createAlbum, createAlbumByAdmin, deleteAlbum, getAlbum, getAllAlbums, getTopAlbums, updateAlbum } from '../controllers/albums.controllers';

const albumsRouter: Router = Router();

albumsRouter
    .post("/", createAlbumByAdmin)
    .post("/:userId", createAlbum)
    .get("/", getAllAlbums)
    .get("/top", getTopAlbums)
    .get("/:albumId", getAlbum)
    .put("/:albumId", updateAlbum)
    .delete("/:albumId", deleteAlbum)

export default albumsRouter