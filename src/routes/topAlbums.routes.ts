import { Router } from 'express'
import { getTopAlbums } from '../controllers/topAlbums.controllers';

const topAlbumsRouter: Router = Router();

topAlbumsRouter.get("/", getTopAlbums)


export default topAlbumsRouter