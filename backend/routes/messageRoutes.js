import express from "express";
import {
  getAllConversations,
  getConversationMessages,
  sendMessage,
  createConversation,
  getUnreadCount,
} from "../controllers/messageController.js";
import { authenticate } from "../middleware/auth.js";

const router = express.Router();

// Protected routes
router.get("/conversations", authenticate, getAllConversations);
router.get(
  "/conversations/:conversationId",
  authenticate,
  getConversationMessages
);
router.post("/conversations/:conversationId", authenticate, sendMessage);
router.get("/unread-count", authenticate, getUnreadCount);

// Public route for customers to create conversation
router.post("/conversations", createConversation);

export default router;
