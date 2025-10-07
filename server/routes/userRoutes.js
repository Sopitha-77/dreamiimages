import express from "express";
import { registerUser, loginUser, userCredits } from "../controllers/userControllers.js";
import userAuth from "../middlewares/auth.js"; // ✅ Change this too

const userRouter = express.Router();

userRouter.post("/register", registerUser);
userRouter.post("/login", loginUser);
userRouter.get("/credits", userAuth, userCredits);


export default userRouter;
