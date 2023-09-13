import { Router } from 'express'
import { createPlayList, deletePlayList, getAllPlayLists, getPlayList, updatePlayList } from '../controllers/playlists.controllers';

const playListsRouter: Router = Router();

playListsRouter
    .post("/userId", createPlayList)
    .get("/", getAllPlayLists)
    .get("/:playListId", getPlayList)
    .put("/:playListId", updatePlayList)
    .delete("/:playListId", deletePlayList)

export default playListsRouter