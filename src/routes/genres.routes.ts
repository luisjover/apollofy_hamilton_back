import { Router } from 'express'

const genresRouter: Router = Router();

genresRouter
    .post("/", createGenre)
    .get("/", getAllGenres)
    .get("/:genreId", getGenre)
    .put("/:genreId", updateGenre)
    .delete("/:genreId", deleteGenre)

export default genresRouter