import { Router } from 'express'
import { addTrackToPlaylist, createTrack, deleteTrack, getAllTracks, getTrackById, updateTrack } from '../controllers/tracks.controllers';

const tracksRouter: Router = Router();

tracksRouter
    .post("/:userId", createTrack)
    .get("/", getAllTracks)
    .get("/:trackId", getTrackById)
    .patch("/:trackId", updateTrack)
    .patch("/update/:trackId", addTrackToPlaylist)
    .delete("/:trackId", deleteTrack)

export default tracksRouter