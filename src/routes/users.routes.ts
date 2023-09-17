import { Router } from 'express';
import { createUser, deleteUser, getAllUsers, getUserByEmail, getUserById, updateUser } from '../controllers/users.controllers';


const usersRouter: Router = Router();

usersRouter
    .post("/", createUser)
    .get("/", getAllUsers)
    .get("/:userId", getUserById)
    .get("/:userEmail", getUserByEmail)
    .put("/:userId", updateUser)
    .delete("/:userId", deleteUser)

export default usersRouter;