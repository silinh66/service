import express from "express";
import { login, register, getProfile, forgotPassword, resetPassword, changePassword } from "../controllers/authController.js";
import { authenticate } from "../middleware/auth.js";

const router = express.Router();

router.post("/login", login);
router.post("/register", register);
router.post("/forgot-password", forgotPassword);
router.post("/reset-password", resetPassword);
router.post("/change-password", authenticate, changePassword);
router.get("/profile", authenticate, getProfile);

export default router;
