import express from "express";
import { 
  registerUser, 
  loginUser, 
  getUserProfile, 
  updateUserProfile, 
  deleteUser 
} from "../controllers/userController.js";
import { protect } from "../middleware/auth.js"; // Correct middleware

const router = express.Router();

// Public routes
router.post("/register", registerUser);
router.post("/login", loginUser);

// Protected routes (CRUD)
router.get("/profile", protect, getUserProfile);       // Read
router.put("/profile", protect, updateUserProfile);    // Update
router.delete("/profile", protect, deleteUser);        // Delete

export default router;
