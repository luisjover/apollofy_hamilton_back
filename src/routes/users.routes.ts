import { Router } from 'express';
import { createUser, deleteUser, getAllUsers, updateUser } from '../controllers/users.controllers';


const UsersRouter: Router = Router();

UsersRouter
    .post("/", createUser)
    .get("/", getAllUsers)
    .get("/:userEmail", getAllUsers)
    .put("/:userEmail", updateUser)
    .delete("/:userEmail", deleteUser)

export default UsersRouter;