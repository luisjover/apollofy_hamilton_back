import { Router } from 'express'
import { createPlayList, createPlayListsByAdmin, deletePlayListById, getAllPlayLists, getPlayList, getTopPlaylists, getUserPlaylistsById, updatePlayList } from '../controllers/playlists.controllers';

const playListsRouter: Router = Router();


// El id del admin debería de ser una variable en el archivo .env
playListsRouter
    .post("/:userId", createPlayList)
    .post("/", createPlayListsByAdmin)
    .get("/", getAllPlayLists)
    .get("/top", getTopPlaylists)
    .get("/:playListId", getPlayList)
    .get("/:userId", getUserPlaylistsById)
    .put("/:playListId", updatePlayList)
    .delete("/:playListId", deletePlayListById)

export default playListsRouter