import { Router } from 'express'
import { createPlayList, createPlayListsByAdmin, deletePlayListById, getAllPlayLists, getPlayList, getTopPlaylists, getUserPlaylistsById, updatePlayList } from '../controllers/playlists.controllers';
import { checkJwtMiddleware } from '../middlewares/checkjwt.middleware';

const playListsRouter: Router = Router();


// El id del admin debería de ser una variable en el archivo .env
playListsRouter
    .post("/:userId", checkJwtMiddleware, createPlayList)
    .post("/", checkJwtMiddleware, createPlayListsByAdmin)
    .get("/", checkJwtMiddleware, getAllPlayLists)
    .get("/top", getTopPlaylists)
    .get("/:playListId", checkJwtMiddleware, getPlayList)
    .get("/:userId", checkJwtMiddleware, getUserPlaylistsById)
    .put("/:playListId", checkJwtMiddleware, updatePlayList)
    .delete("/:playListId", checkJwtMiddleware, deletePlayListById)

export default playListsRouter