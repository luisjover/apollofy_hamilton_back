import { Router } from 'express'

const followersRouter: Router = Router();

followersRouter
    .post("/", createFollower)
    .get("/", getAllFollowers)
    .get("/:followerId", getfollower)
    .put("/:followerId", updateFollower)
    .delete("/:followerd", deleteFollower)

export default followersRouter