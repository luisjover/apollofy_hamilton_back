import { Router } from "express";
import { createFavourites, deleteFavourites, getAllFavourites, getFavouriteById } from "../controllers/favourites.controllers";
import { checkJwtMiddleware } from "../middlewares/checkjwt.middleware";



export const favouritesRouter: Router = Router();

favouritesRouter
    .post("/:userId", checkJwtMiddleware, createFavourites)
    .delete("/:favouriteId/:userId", checkJwtMiddleware, deleteFavourites)
    .get("/", checkJwtMiddleware, getAllFavourites)
    .get("/:favouriteId", checkJwtMiddleware, getFavouriteById)