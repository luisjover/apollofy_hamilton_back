import { Router } from 'express'
import { createAlbumByAdmin, deleteAlbum, getAlbum, getAllAlbums, getTopAlbums, updateAlbum } from '../controllers/albums.controllers';

const albumsRouter: Router = Router();

albumsRouter
    .post("/", createAlbumByAdmin)
    .get("/", getAllAlbums)
    .get("/top", getTopAlbums)
    .get("/:albumId", getAlbum)
    .put("/:albumId", updateAlbum)
    .delete("/:albumId", deleteAlbum)

export default albumsRouter