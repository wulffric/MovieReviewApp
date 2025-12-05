import express from "express";
import {
  createMovie,
  getMovies,
  getMovieById,
  updateMovie,
  deleteMovie
} from "../controllers/movieController.js";
import { protect } from "../middleware/auth.js";

const router = express.Router();

router.route("/").get(getMovies).post(protect, createMovie);
router
  .route("/:id")
  .get(getMovieById)
  .put(protect, updateMovie)  // ✅ Add this
  .delete(protect, deleteMovie);

export default router;
