import express from "express";
import cors from "cors";
import dotenv from "dotenv";
import path from "path";
import { fileURLToPath } from "url";
import { testConnection } from "./config/database.js";

// Import routes
import authRoutes from "./routes/authRoutes.js";
import postRoutes from "./routes/postRoutes.js";
import orderRoutes from "./routes/orderRoutes.js";
import messageRoutes from "./routes/messageRoutes.js";
import uploadRoutes from "./routes/uploadRoutes.js";

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

dotenv.config();

import { Server } from "socket.io";
import { createServer } from "http";

const app = express();
const httpServer = createServer(app);
const io = new Server(httpServer, {
  cors: {
    origin: [
      "http://localhost:5173",
      "http://localhost:3000",
      "http://localhost:5174",
    ],
    credentials: true,
  },
});

const PORT = process.env.PORT || 5000;

// Middleware
app.use(
  cors({
    origin: [
      "http://localhost:5173",
      "http://localhost:3000",
      "http://localhost:5174",
      "https://service.zoozoostudio.com",
      "https://admin.zoozoostudio.com"
    ],
    credentials: true,
  })
);
app.use(express.json({ limit: "3072mb" }));
app.use(express.urlencoded({ extended: true, limit: "3072mb" }));

// Serve static files (uploaded videos and images)
app.use("/uploads", express.static(path.join(__dirname, "uploads")));

// Request logging
app.use((req, res, next) => {
  console.log(`${new Date().toISOString()} - ${req.method} ${req.path}`);
  next();
});

// Socket.io connection handling
io.on("connection", (socket) => {
  console.log("User connected:", socket.id);

  socket.on("join_conversation", (conversationId) => {
    socket.join(conversationId);
    console.log(`User ${socket.id} joined conversation: ${conversationId}`);
  });

  socket.on("send_message", (data) => {
    // data: { conversationId, message, sender, ... }
    // Broadcast to everyone in the room except sender (or including sender if needed for confirmation)
    // Usually we emit to the room so the other person receives it.
    // The sender usually updates their UI optimistically or via API response.
    // But for simplicity in real-time sync, we can broadcast to the room.
    socket.to(data.conversationId).emit("receive_message", data);
  });

  socket.on("disconnect", () => {
    console.log("User disconnected:", socket.id);
  });
});

// Make io accessible in routes
app.set("io", io);

// Health check
app.get("/health", (req, res) => {
  res.json({ status: "OK", message: "Server is running" });
});

// API Routes
app.use("/api/auth", authRoutes);
app.use("/api/posts", postRoutes);
app.use("/api/orders", orderRoutes);
app.use("/api/messages", messageRoutes);
app.use("/api/upload", uploadRoutes);

// 404 handler
app.use((req, res) => {
  res.status(404).json({ message: "Route not found" });
});

// Error handler
app.use((error, req, res, next) => {
  console.error("Error:", error);
  res.status(error.status || 500).json({
    message: error.message || "Internal server error",
  });
});

// Start server
const startServer = async () => {
  try {
    // Test database connection
    const dbConnected = await testConnection();

    if (!dbConnected) {
      console.error(
        "❌ Failed to connect to database. Please check your configuration."
      );
      process.exit(1);
    }

    const server = httpServer.listen(PORT, () => {
      console.log("\n🚀 ================================");
      console.log(`   Server is running on port ${PORT}`);
      console.log(`   http://localhost:${PORT}`);
      console.log("   ================================\n");
      console.log("📋 Available endpoints:");
      console.log("   GET  /health");
      console.log("   POST /api/auth/login");
      console.log("   POST /api/auth/register");
      console.log("   GET  /api/auth/profile");
      console.log("   GET  /api/posts");
      console.log("   POST /api/posts");
      console.log("   GET  /api/orders");
      console.log("   POST /api/orders");
      console.log("   GET  /api/messages/conversations");
      console.log("   ================================\n");
    });

    // Increase timeout to 1 hour for large file uploads
    server.timeout = 60 * 60 * 1000;
  } catch (error) {
    console.error("Failed to start server:", error);
    process.exit(1);
  }
};

startServer();

export default app;
