import { Router } from 'express'
import { createPlayList, deletePlayList, getAllPlayLists, getPlayList, getTopPlaylists, updatePlayList } from '../controllers/playlists.controllers';

const playListsRouter: Router = Router();

playListsRouter
    .post("/:userId", createPlayList)
    .get("/", getAllPlayLists)
    .get("/topPLaylists", getTopPlaylists)
    .get("/:playListId", getPlayList)
    .put("/:playListId", updatePlayList)
    .delete("/:playListId", deletePlayList)

export default playListsRouter