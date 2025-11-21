import express from "express";
import { videoUpload } from "../middleware/videoUpload.js";
import { authenticate } from "../middleware/auth.js";
import path from "path";
import fs from "fs";
import { fileURLToPath } from "url";

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const router = express.Router();

// Upload video endpoint
router.post(
  "/videos",
  authenticate,
  videoUpload.single("video"),
  (req, res) => {
    console.log("Upload route hit. File:", req.file ? req.file.filename : "No file");
    try {
      if (!req.file) {
        return res.status(400).json({ message: "No video file uploaded" });
      }

      const videoUrl = `/uploads/videos/${req.file.filename}`;

      res.status(200).json({
        message: "Video uploaded successfully",
        filename: req.file.filename,
        url: videoUrl,
        size: req.file.size,
        mimetype: req.file.mimetype,
      });
    } catch (error) {
      console.error("Upload video error:", error);
      res.status(500).json({ message: "Error uploading video" });
    }
  }
);

// Delete video endpoint
router.delete("/videos/:filename", authenticate, (req, res) => {
  try {
    const { filename } = req.params;
    const videoPath = path.join(__dirname, "../uploads/videos", filename);

    if (fs.existsSync(videoPath)) {
      fs.unlinkSync(videoPath);
      res.json({ message: "Video deleted successfully" });
    } else {
      res.status(404).json({ message: "Video not found" });
    }
  } catch (error) {
    console.error("Delete video error:", error);
    res.status(500).json({ message: "Error deleting video" });
  }
});

export default router;
