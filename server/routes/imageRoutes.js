import express from "express";
import { generateImage } from "../controllers/imageController.js";
import userAuth from "../middlewares/auth.js"; // ✅ Change to match your file

const imageRouter = express.Router();

imageRouter.post('/generate-image', userAuth, generateImage);

export default imageRouter;