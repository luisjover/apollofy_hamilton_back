import { Router } from 'express';
import { createUser, deleteUser, getAllUsers, getUser, updateUser } from '../controllers/users.controllers';


const usersRouter: Router = Router();

usersRouter
    .post("/", createUser)
    .get("/", getAllUsers)
    .get("/:userId", getUser)
    .put("/:userId", updateUser)
    .delete("/:userId", deleteUser)

export default usersRouter;