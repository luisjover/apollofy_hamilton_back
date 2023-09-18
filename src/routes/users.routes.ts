import { Router } from 'express';
import { createUser, deleteUser, getAllUsers, getUserByEmail, getUserById, updateUserFollowingById } from '../controllers/users.controllers';


const usersRouter: Router = Router();

usersRouter
    .post("/", createUser)
    .get("/", getAllUsers)
    .get("/:userId", getUserById)
    .get("/:userEmail", getUserByEmail)
    .patch("/following/:userId", updateUserFollowingById)
    .delete("/:userId", deleteUser)

export default usersRouter;