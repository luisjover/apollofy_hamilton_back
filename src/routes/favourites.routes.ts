import { Router } from "express";
import { createFavourites, deleteFavourites } from "../controllers/favourites.controllers";



const favouritesRouter: Router = Router();

favouritesRouter.post("/:userId", createFavourites)
    .delete("/:favouriteId", deleteFavourites)