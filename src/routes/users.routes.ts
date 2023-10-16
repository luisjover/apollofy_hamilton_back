import { Router } from 'express';
import { createUser, deleteUser, getAllUsers, getUserByEmail, getUserById, updateUserFollowingById } from '../controllers/users.controllers';
import { checkJwtMiddleware } from '../middlewares/checkjwt.middleware';


const usersRouter: Router = Router();

usersRouter
    .post("/", checkJwtMiddleware, createUser)
    .get("/", checkJwtMiddleware, getAllUsers)
    .get("/:userId", checkJwtMiddleware, getUserById)
    .get("/:userEmail", checkJwtMiddleware, getUserByEmail)
    .patch("/following/:userId", checkJwtMiddleware, updateUserFollowingById)
    .delete("/:userId", checkJwtMiddleware, deleteUser)

export default usersRouter;