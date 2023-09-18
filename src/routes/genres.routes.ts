import { Router } from 'express'
import { createGenre, deleteGenre, getGenres } from '../controllers/genres.controllers';

const genresRouter: Router = Router();

genresRouter
    .post("/", createGenre)
    .get("/", getGenres)
    .delete("/:genreName", deleteGenre)


export default genresRouter