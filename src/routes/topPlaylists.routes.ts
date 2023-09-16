import { Router } from 'express'
import { getTopAPlaylists } from '../controllers/topPlaylists.controllers';

const topPlaylistsRouter: Router = Router();

topPlaylistsRouter.get("/", getTopAPlaylists)


export default topPlaylistsRouter