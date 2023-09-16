import { Router } from 'express'
import { getTopArtists } from '../controllers/topArtists.controllers';

const topArtistsRouter: Router = Router();

topArtistsRouter.get("/", getTopArtists)


export default topArtistsRouter