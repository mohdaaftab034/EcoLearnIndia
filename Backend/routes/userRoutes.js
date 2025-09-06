import express from "express";
import { loginUser, logOut, registerUser } from "../controller/userController.js";

const userRouter = express.Router();

userRouter.post('/register', registerUser);
userRouter.post('/login', loginUser);
userRouter.get('/logout', logOut);

export default userRouter;