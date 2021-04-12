import express from "express";
import { getSongs, postSong } from "../Controllers/songs.js";
import auth from "../Middleware/auth.js";

const router = express.Router();

router.get("/", getSongs);
router.post("/", auth, postSong);

export default router;
