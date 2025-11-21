import pool from "../config/database.js";

export const getAllConversations = async (req, res) => {
  try {
    const [conversations] = await pool.query(
      "SELECT * FROM conversations ORDER BY updated_at DESC"
    );
    res.json(conversations);
  } catch (error) {
    console.error("Get conversations error:", error);
    res.status(500).json({ message: "Server error" });
  }
};

export const getConversationMessages = async (req, res) => {
  try {
    const { conversationId } = req.params;

    const [messages] = await pool.query(
      "SELECT * FROM messages WHERE conversation_id = ? ORDER BY created_at ASC",
      [conversationId]
    );

    // Mark messages as read
    await pool.query(
      'UPDATE messages SET is_read = TRUE WHERE conversation_id = ? AND sender_type = "customer"',
      [conversationId]
    );

    // Update unread count
    await pool.query(
      "UPDATE conversations SET unread_count = 0 WHERE conversation_id = ?",
      [conversationId]
    );

    res.json(messages);
  } catch (error) {
    console.error("Get messages error:", error);
    res.status(500).json({ message: "Server error" });
  }
};

export const sendMessage = async (req, res) => {
  const connection = await pool.getConnection();

  try {
    await connection.beginTransaction();

    const { conversationId } = req.params;
    const { message } = req.body;

    if (!message) {
      return res.status(400).json({ message: "Message is required" });
    }

    // Insert message
    const [result] = await connection.query(
      "INSERT INTO messages (conversation_id, sender_type, sender_name, message) VALUES (?, ?, ?, ?)",
      [conversationId, "admin", req.user.username, message]
    );

    // Update conversation
    await connection.query(
      "UPDATE conversations SET last_message = ?, updated_at = NOW() WHERE conversation_id = ?",
      [message, conversationId]
    );

    await connection.commit();

    res.status(201).json({
      message: "Message sent successfully",
      messageId: result.insertId,
    });
  } catch (error) {
    await connection.rollback();
    console.error("Send message error:", error);
    res.status(500).json({ message: "Server error" });
  } finally {
    connection.release();
  }
};

export const createConversation = async (req, res) => {
  try {
    const { customer_name, customer_email, message } = req.body;

    if (!customer_name || !message) {
      return res
        .status(400)
        .json({ message: "Customer name and message are required" });
    }

    const conversationId = `conv-${Date.now()}`;

    // Create conversation
    await pool.query(
      "INSERT INTO conversations (conversation_id, customer_name, customer_email, last_message) VALUES (?, ?, ?, ?)",
      [conversationId, customer_name, customer_email, message]
    );

    // Insert first message
    await pool.query(
      "INSERT INTO messages (conversation_id, sender_type, sender_name, message) VALUES (?, ?, ?, ?)",
      [conversationId, "customer", customer_name, message]
    );

    res.status(201).json({
      message: "Conversation created successfully",
      conversationId,
    });
  } catch (error) {
    console.error("Create conversation error:", error);
    res.status(500).json({ message: "Server error" });
  }
};

export const getUnreadCount = async (req, res) => {
  try {
    const [result] = await pool.query(
      "SELECT SUM(unread_count) as total_unread FROM conversations"
    );
    res.json({ unreadCount: result[0].total_unread || 0 });
  } catch (error) {
    console.error("Get unread count error:", error);
    res.status(500).json({ message: "Server error" });
  }
};
