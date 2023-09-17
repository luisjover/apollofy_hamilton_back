import { Router } from 'express'
import { createPlayList, createPlayListsByAdmin, deletePlayList, getAllPlayLists, getPlayList, getTopPlaylists, updatePlayList } from '../controllers/playlists.controllers';

const playListsRouter: Router = Router();


// El id del admin debería de ser una variable en el archivo .env
playListsRouter
    .post("/:userId", createPlayList)
    .post("/", createPlayListsByAdmin)
    .get("/", getAllPlayLists)
    .get("/top", getTopPlaylists)
    .get("/:playListId", getPlayList)
    .put("/:playListId", updatePlayList)
    .delete("/:playListId", deletePlayList)

export default playListsRouter