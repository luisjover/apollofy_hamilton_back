import { Router } from 'express'
import { createGenre } from '../controllers/genres.controllers';

const genresRouter: Router = Router();

genresRouter
    .post("/", createGenre)


export default genresRouter