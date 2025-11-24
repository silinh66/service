import express from "express";
import {
  getAllPosts,
  getPostById,
  getPostBySlug,
  createPost,
  updatePost,
  deletePost,
  incrementViews,
  updatePostOrder,
} from "../controllers/postController.js";
import { authenticate } from "../middleware/auth.js";

const router = express.Router();

// Public routes
router.get("/", getAllPosts);
router.get("/slug/:slug", getPostBySlug);
router.get("/:id", getPostById);
router.post("/:id/views", incrementViews);

// Protected routes
router.put("/reorder", authenticate, updatePostOrder);
router.post("/", authenticate, createPost);
router.put("/:id", authenticate, updatePost);
router.delete("/:id", authenticate, deletePost);

export default router;
