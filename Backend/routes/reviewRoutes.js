import express from "express";
import { createReview, getMovieReviews } from "../controllers/reviewController.js";
const router = express.Router();

router.post("/", createReview);
router.get("/:movieId", getMovieReviews);

export default router;
