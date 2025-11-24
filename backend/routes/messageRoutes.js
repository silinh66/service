import express from "express";
import {
  getAllConversations,
  getConversationMessages,
  sendMessage,
  createConversation,
  getUnreadCount,
  sendCustomerMessage,
  getConversationsByEmail,
  getPublicConversationMessages,
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
router.post("/conversations/:conversationId/customer", sendCustomerMessage);
router.get("/customer/:email", getConversationsByEmail);
router.get("/public/:conversationId", getPublicConversationMessages);

export default router;
