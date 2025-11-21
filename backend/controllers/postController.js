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
    const { status, category, search } = req.query;
    let query = `
      SELECT p.*, u.username as author_name 
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

    if (search) {
      query += " AND (p.title LIKE ? OR p.content LIKE ?)";
      params.push(`%${search}%`, `%${search}%`);
    }

    query += " ORDER BY p.created_at DESC";

    const [posts] = await pool.query(query, params);
    // Parse videos JSON
    const postsWithVideos = posts.map((post) => ({
      ...post,
      videos: parseVideos(post.videos),
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

    const [result] = await pool.query(
      `INSERT INTO posts (title, slug, excerpt, content, category, status, featured_image, videos, author_id, published_at)
       VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?)`,
      [
        title,
        finalSlug,
        excerpt,
        content,
        category,
        status || "draft",
        featured_image,
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

    await pool.query(
      `UPDATE posts 
       SET title = ?, slug = ?, excerpt = ?, content = ?, category = ?, status = ?, 
           featured_image = ?, videos = ?, published_at = ?
       WHERE id = ?`,
      [
        title,
        slug,
        excerpt,
        content,
        category,
        status,
        featured_image,
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
