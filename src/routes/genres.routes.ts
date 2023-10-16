import { Router } from 'express'
import { createGenre, deleteGenre, getGenres } from '../controllers/genres.controllers';
import { checkJwtMiddleware } from '../middlewares/checkjwt.middleware';

const genresRouter: Router = Router();

genresRouter
    .post("/", checkJwtMiddleware, createGenre)
    .get("/", getGenres)
    .delete("/:genreName", checkJwtMiddleware, deleteGenre)


export default genresRouter