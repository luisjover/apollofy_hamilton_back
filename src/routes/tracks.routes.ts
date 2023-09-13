import { Router } from 'express'
import { createTrack, deleteTrack, getAllTracks, getTrack, updateTrack } from '../controllers/tracks.controllers';

const tracksRouter: Router = Router();

tracksRouter
    .post("/:userId", createTrack)
    .get("/", getAllTracks)
    .get("/:trackId", getTrack)
    .put("/:trackId", updateTrack)
    .delete("/:trackId", deleteTrack)

export default tracksRouter