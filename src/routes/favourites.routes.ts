import { Router } from "express";
import { createFavourites, deleteFavourites, getAllFavourites } from "../controllers/favourites.controllers";



export const favouritesRouter: Router = Router();

favouritesRouter.post("/:userId", createFavourites)
    .delete("/:favouriteId", deleteFavourites)
    .get("/", getAllFavourites)