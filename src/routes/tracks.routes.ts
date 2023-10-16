import { Router } from 'express'
import { addTrackToPlaylist, createTrack, createTrackByAdmin, deleteTrack, getAllTracks, getTrackById, updateTrack } from '../controllers/tracks.controllers';
import { checkJwtMiddleware } from '../middlewares/checkjwt.middleware';

const tracksRouter: Router = Router();

tracksRouter
    .post("/:userId", checkJwtMiddleware, createTrack)
    .post("/", checkJwtMiddleware, createTrackByAdmin)
    .get("/", checkJwtMiddleware, getAllTracks)
    .get("/:trackId", checkJwtMiddleware, getTrackById)
    .patch("/:trackId", checkJwtMiddleware, updateTrack)
    .patch("/update/:trackId", checkJwtMiddleware, addTrackToPlaylist)
    .delete("/:trackId", checkJwtMiddleware, deleteTrack)

export default tracksRouter