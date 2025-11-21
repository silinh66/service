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
// Chunked upload endpoint
router.post("/videos/chunk", authenticate, videoUpload.single("chunk"), async (req, res) => {
  try {
    if (!req.file) {
      return res.status(400).json({ message: "No chunk uploaded" });
    }

    const { chunkIndex, totalChunks, fileName, uploadId } = req.body;
    const currentChunk = parseInt(chunkIndex);
    const total = parseInt(totalChunks);

    // Create temp directory for this upload
    const tempDir = path.join(__dirname, "../uploads/temp", uploadId);
    if (!fs.existsSync(tempDir)) {
      fs.mkdirSync(tempDir, { recursive: true });
    }

    // Move chunk to temp dir
    const chunkPath = path.join(tempDir, `chunk-${currentChunk}`);
    fs.renameSync(req.file.path, chunkPath);

    // If this is the last chunk, merge them
    if (currentChunk === total - 1) {
      const videoDir = path.join(__dirname, "../uploads/videos");
      if (!fs.existsSync(videoDir)) {
        fs.mkdirSync(videoDir, { recursive: true });
      }

      const uniqueSuffix = Date.now() + "-" + Math.round(Math.random() * 1e9);
      const ext = path.extname(fileName);
      const finalFileName = `video-${uniqueSuffix}${ext}`;
      const finalPath = path.join(videoDir, finalFileName);

      // Create empty file
      fs.writeFileSync(finalPath, '');

      // Merge chunks
      for (let i = 0; i < total; i++) {
        const chunkPath = path.join(tempDir, `chunk-${i}`);
        if (!fs.existsSync(chunkPath)) {
          throw new Error(`Missing chunk ${i}`);
        }
        const data = fs.readFileSync(chunkPath);
        fs.appendFileSync(finalPath, data);
        fs.unlinkSync(chunkPath); // Delete chunk after merging
      }

      // Delete temp dir
      fs.rmdirSync(tempDir);

      const videoUrl = `/uploads/videos/${finalFileName}`;

      return res.status(200).json({
        message: "Upload complete",
        completed: true,
        filename: finalFileName,
        url: videoUrl,
        type: "upload"
      });
    }

    res.status(200).json({
      message: "Chunk uploaded",
      completed: false,
      chunkIndex: currentChunk
    });

  } catch (error) {
    console.error("Chunk upload error:", error);
    // Cleanup temp dir on error
    if (req.body.uploadId) {
      const tempDir = path.join(__dirname, "../uploads/temp", req.body.uploadId);
      if (fs.existsSync(tempDir)) {
        fs.rmSync(tempDir, { recursive: true, force: true });
      }
    }
    res.status(500).json({ message: "Error uploading chunk" });
  }
});

// Legacy single file upload (kept for backward compatibility or small files)
router.post(
  "/videos",
  authenticate,
  videoUpload.single("video"),
  (req, res) => {
    // ... existing logic ...
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
