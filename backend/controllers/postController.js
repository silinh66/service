import pool from "../config/database.js";

// Helper function to safely parse videos JSON
const parseVideos = (videos) => {
  if (!videos) return [];
  if (typeof videos === "object" && !Array.isArray(videos)) return [];
  if (typeof videos === "string") {
    try {
      return JSON.parse(videos);
    } catch (e) {
      console.error("Failed to parse videos JSON:", e);
      return [];
    }
  }
  return Array.isArray(videos) ? videos : [];
};

export const getAllPosts = async (req, res) => {
  try {
    const { status, category, search, video_format, limit, fields } = req.query;

    // Default fields if not specified (to avoid breaking existing calls)
    // But for optimization, we want to be able to select specific fields.
    // If fields is provided, we parse it.
    let selectFields = "p.*, u.username as author_name";
    if (fields) {
      const allowedFields = [
        "id",
        "title",
        "slug",
        "excerpt",
        "content",
        "category",
        "status",
        "featured_image",
        "videos",
        "video_format",
        "created_at",
        "updated_at",
        "published_at",
        "views",
        "display_order",
        "author_id",
      ];
      const requestedFields = fields.split(",").map((f) => f.trim());
      const validFields = requestedFields.filter((f) =>
        allowedFields.includes(f)
      );
      if (validFields.length > 0) {
        selectFields = validFields.map((f) => `p.${f}`).join(", ");
        // Always include author_name if we are joining users, or maybe just ignore it if not requested?
        // The original query always joined users. Let's keep it simple and just select from p.
        // If author_name is needed, it should be handled, but for now the sliders don't need it.
      }
    }

    let query = `
      SELECT ${selectFields}
      FROM posts p
      LEFT JOIN users u ON p.author_id = u.id
      WHERE 1=1
    `;
    const params = [];

    if (status) {
      query += " AND p.status = ?";
      params.push(status);
    }

    if (category) {
      query += " AND p.category = ?";
      params.push(category);
    }

    if (video_format) {
      query += " AND p.video_format = ?";
      params.push(video_format);
    }

    if (search) {
      query += " AND (p.title LIKE ? OR p.content LIKE ?)";
      params.push(`%${search}%`, `%${search}%`);
    }

    query += " ORDER BY p.display_order ASC, p.created_at DESC";

    if (limit) {
      const limitValue = parseInt(limit, 10);
      if (!isNaN(limitValue) && limitValue > 0) {
        query += " LIMIT ?";
        params.push(limitValue);
      }
    }

    console.time("DB_QUERY");
    const [posts] = await pool.query(query, params);
    console.timeEnd("DB_QUERY");

    if (posts.length > 0) {
      const firstPost = posts[0];
      if (firstPost.featured_image) {
        console.log(`[DEBUG] First post featured_image length: ${firstPost.featured_image.length}`);
        if (firstPost.featured_image.startsWith('data:image')) {
          console.warn('[WARN] featured_image is a Base64 string! This will slow down the API.');
        }
      }
    }

    // Parse videos JSON
    const postsWithVideos = posts.map((post) => ({
      ...post,
      videos: post.videos ? parseVideos(post.videos) : [],
    }));
    res.json(postsWithVideos);
  } catch (error) {
    console.error("Get posts error:", error);
    res.status(500).json({ message: "Server error" });
  }
};

export const getPostById = async (req, res) => {
  try {
    const [posts] = await pool.query(
      `SELECT p.*, u.username as author_name 
       FROM posts p
       LEFT JOIN users u ON p.author_id = u.id
       WHERE p.id = ?`,
      [req.params.id]
    );

    if (posts.length === 0) {
      return res.status(404).json({ message: "Post not found" });
    }

    const post = {
      ...posts[0],
      videos: parseVideos(posts[0].videos),
    };
    res.json(post);
  } catch (error) {
    console.error("Get post error:", error);
    res.status(500).json({ message: "Server error" });
  }
};

export const getPostBySlug = async (req, res) => {
  try {
    const [posts] = await pool.query(
      `SELECT p.*, u.username as author_name 
       FROM posts p
       LEFT JOIN users u ON p.author_id = u.id
       WHERE p.slug = ?`,
      [req.params.slug]
    );

    if (posts.length === 0) {
      return res.status(404).json({ message: "Post not found" });
    }

    const post = {
      ...posts[0],
      videos: parseVideos(posts[0].videos),
    };
    res.json(post);
  } catch (error) {
    console.error("Get post by slug error:", error);
    res.status(500).json({ message: "Server error" });
  }
};


import fs from "fs";
import path from "path";
import { fileURLToPath } from "url";

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// Helper to save Base64 image to file
const saveBase64Image = (base64String) => {
  if (!base64String || !base64String.startsWith("data:image")) {
    return base64String; // Return as is if not base64
  }

  try {
    const matches = base64String.match(/^data:image\/([a-zA-Z0-9]+);base64,(.+)$/);
    if (!matches || matches.length !== 3) {
      return base64String;
    }

    const ext = matches[1] === "jpeg" ? "jpg" : matches[1];
    const data = matches[2];
    const buffer = Buffer.from(data, "base64");

    const imagesDir = path.join(__dirname, "../uploads/images");
    if (!fs.existsSync(imagesDir)) {
      fs.mkdirSync(imagesDir, { recursive: true });
    }

    const fileName = `post-img-${Date.now()}-${Math.round(Math.random() * 1e9)}.${ext}`;
    const filePath = path.join(imagesDir, fileName);

    fs.writeFileSync(filePath, buffer);

    return `/uploads/images/${fileName}`;
  } catch (error) {
    console.error("Error saving Base64 image:", error);
    return base64String; // Fallback to original string on error
  }
};

export const createPost = async (req, res) => {
  try {
    const {
      title,
      slug,
      excerpt,
      content,
      category,
      status,
      featured_image,
      videos,
      video_format,
    } = req.body;

    if (!title || !content || !category) {
      return res
        .status(400)
        .json({ message: "Title, content, and category are required" });
    }

    const finalSlug =
      slug ||
      title
        .toLowerCase()
        .replace(/[^\w\s-]/g, "")
        .replace(/\s+/g, "-");

    const published_at = status === "published" ? new Date() : null;
    const videosJson = videos ? JSON.stringify(videos) : null;

    // Handle Base64 image
    const imageUrl = saveBase64Image(featured_image);

    const [result] = await pool.query(
      `INSERT INTO posts (title, slug, excerpt, content, category, video_format, status, featured_image, videos, author_id, published_at)
       VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)`,
      [
        title,
        finalSlug,
        excerpt,
        content,
        category,
        video_format || null,
        status || "draft",
        imageUrl,
        videosJson,
        req.user.id,
        published_at,
      ]
    );

    res.status(201).json({
      message: "Post created successfully",
      postId: result.insertId,
    });
  } catch (error) {
    if (error.code === "ER_DUP_ENTRY") {
      return res.status(400).json({ message: "Slug already exists" });
    }
    console.error("Create post error:", error);
    res.status(500).json({ message: "Server error" });
  }
};

export const updatePost = async (req, res) => {
  try {
    const {
      title,
      slug,
      excerpt,
      content,
      category,
      status,
      featured_image,
      videos,
      video_format,
    } = req.body;
    const postId = req.params.id;

    const [existingPosts] = await pool.query(
      "SELECT * FROM posts WHERE id = ?",
      [postId]
    );

    if (existingPosts.length === 0) {
      return res.status(404).json({ message: "Post not found" });
    }

    const published_at =
      status === "published" && existingPosts[0].status !== "published"
        ? new Date()
        : existingPosts[0].published_at;

    const videosJson = videos ? JSON.stringify(videos) : null;

    // Handle Base64 image
    const imageUrl = saveBase64Image(featured_image);

    await pool.query(
      `UPDATE posts 
       SET title = ?, slug = ?, excerpt = ?, content = ?, category = ?, video_format = ?, status = ?, 
           featured_image = ?, videos = ?, published_at = ?
       WHERE id = ?`,
      [
        title,
        slug,
        excerpt,
        content,
        category,
        video_format || null,
        status,
        imageUrl,
        videosJson,
        published_at,
        postId,
      ]
    );

    res.json({ message: "Post updated successfully" });
  } catch (error) {
    console.error("Update post error:", error);
    res.status(500).json({ message: "Server error" });
  }
};

export const deletePost = async (req, res) => {
  try {
    const [result] = await pool.query("DELETE FROM posts WHERE id = ?", [
      req.params.id,
    ]);

    if (result.affectedRows === 0) {
      return res.status(404).json({ message: "Post not found" });
    }

    res.json({ message: "Post deleted successfully" });
  } catch (error) {
    console.error("Delete post error:", error);
    res.status(500).json({ message: "Server error" });
  }
};

export const incrementViews = async (req, res) => {
  try {
    await pool.query("UPDATE posts SET views = views + 1 WHERE id = ?", [
      req.params.id,
    ]);
    res.json({ message: "Views incremented" });
  } catch (error) {
    console.error("Increment views error:", error);
    res.status(500).json({ message: "Server error" });
  }
};
export const updatePostOrder = async (req, res) => {
  try {
    const { posts } = req.body;

    if (!Array.isArray(posts)) {
      return res.status(400).json({ message: "Invalid data format" });
    }

    console.log(`Received reorder request for ${posts.length} posts`);

    // Update display_order for each post
    const queries = posts.map((post, index) => {
      // console.log(`Updating post ${post.id} to order ${index}`);
      return pool.query("UPDATE posts SET display_order = ? WHERE id = ?", [
        index,
        post.id,
      ]);
    });

    await Promise.all(queries);
    console.log("Reorder completed successfully");

    res.json({ message: "Post order updated successfully" });
  } catch (error) {
    console.error("Update post order error:", error);
    res.status(500).json({ message: "Server error" });
  }
};
