import pool from "../config/database.js";
import { sendOrderCreatedEmails } from "../services/emailService.js";

export const getAllOrders = async (req, res) => {
  try {
    const { status, search } = req.query;
    let query = "SELECT * FROM orders WHERE 1=1";
    const params = [];

    if (status && status !== "all") {
      query += " AND status = ?";
      params.push(status);
    }

    if (search) {
      query +=
        " AND (order_number LIKE ? OR customer_name LIKE ? OR customer_email LIKE ?)";
      params.push(`%${search}%`, `%${search}%`, `%${search}%`);
    }

    query += " ORDER BY created_at DESC";

    const [orders] = await pool.query(query, params);
    res.json(orders);
  } catch (error) {
    console.error("Get orders error:", error);
    res.status(500).json({ message: "Server error" });
  }
};

export const getOrderById = async (req, res) => {
  try {
    const [orders] = await pool.query("SELECT * FROM orders WHERE id = ?", [
      req.params.id,
    ]);

    if (orders.length === 0) {
      return res.status(404).json({ message: "Order not found" });
    }

    // Get order files
    const [files] = await pool.query(
      "SELECT * FROM order_files WHERE order_id = ?",
      [req.params.id]
    );

    // Get order timeline
    const [timeline] = await pool.query(
      "SELECT * FROM order_timeline WHERE order_id = ? ORDER BY created_at ASC",
      [req.params.id]
    );

    res.json({
      ...orders[0],
      files,
      timeline,
    });
  } catch (error) {
    console.error("Get order error:", error);
    res.status(500).json({ message: "Server error" });
  }
};

export const createOrder = async (req, res) => {
  const connection = await pool.getConnection();

  try {
    await connection.beginTransaction();

    const {
      customer_name,
      customer_email,
      name: order_name,
      categoryId: category,
      mainService: main_service,
      serviceDetails: service_details,
      url: product_url,
      sample,
      instructions,
      amount,
    } = req.body;

    // Generate order number
    const orderNumber = `ORD-${new Date().getFullYear()}-${String(
      Date.now()
    ).slice(-6)}`;

    const [result] = await connection.query(
      `INSERT INTO orders (order_number, customer_name, customer_email, order_name, 
                           category, main_service, service_details, product_url, sample, instructions, amount)
       VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)`,
      [
        orderNumber,
        customer_name,
        customer_email,
        order_name,
        category,
        main_service,
        service_details,
        product_url,
        sample,
        instructions,
        amount || 0,
      ]
    );

    const orderId = result.insertId;

    // Add to timeline
    await connection.query(
      "INSERT INTO order_timeline (order_id, event, user_name) VALUES (?, ?, ?)",
      [orderId, "Đơn hàng được tạo", customer_name]
    );

    await connection.commit();

    // Send emails asynchronously
    // We don't await this to ensure the response is fast, or we can await if we want to ensure emails are sent before responding.
    // Given the requirement is "Khi người dùng Create Order thành công thì gửi...", it's better to do it after commit.
    // Construct order object for email
    const orderForEmail = {
      id: orderId,
      customer_name,
      customer_email,
      order_number: orderNumber,
      order_name,
      category,
      instructions,
      amount
    };

    // Call email service (fire and forget or await depending on preference, here fire and forget to not block UI)
    sendOrderCreatedEmails(orderForEmail).catch(err => console.error("Email sending failed in background:", err));

    // Emit socket event for real-time admin notification
    const io = req.app.get("io");
    if (io) {
      io.emit("new_order", {
        id: orderId,
        order_number: orderNumber,
        customer_name,
        customer_email,
        order_name,
        category,
        main_service,
        service_details,
        product_url,
        sample,
        instructions,
        amount,
        status: 'pending',
        created_at: new Date()
      });
    }

    res.status(201).json({
      message: "Order created successfully",
      orderId,
      orderNumber,
    });
  } catch (error) {
    await connection.rollback();
    console.error("Create order error:", error);
    res.status(500).json({ message: "Server error" });
  } finally {
    connection.release();
  }
};

export const updateOrderStatus = async (req, res) => {
  const connection = await pool.getConnection();

  try {
    await connection.beginTransaction();

    const { status, note } = req.body;
    const orderId = req.params.id;

    await connection.query("UPDATE orders SET status = ? WHERE id = ?", [
      status,
      orderId,
    ]);

    // Add to timeline
    const statusText = {
      pending: "Chờ xử lý",
      processing: "Đang xử lý",
      completed: "Hoàn thành",
      cancelled: "Đã hủy",
    };

    await connection.query(
      "INSERT INTO order_timeline (order_id, event, description, user_name) VALUES (?, ?, ?, ?)",
      [
        orderId,
        `Cập nhật trạng thái: ${statusText[status]}`,
        note,
        req.user.username,
      ]
    );

    await connection.commit();

    res.json({ message: "Order status updated successfully" });
  } catch (error) {
    await connection.rollback();
    console.error("Update order status error:", error);
    res.status(500).json({ message: "Server error" });
  } finally {
    connection.release();
  }
};

export const deleteOrder = async (req, res) => {
  try {
    const [result] = await pool.query("DELETE FROM orders WHERE id = ?", [
      req.params.id,
    ]);

    if (result.affectedRows === 0) {
      return res.status(404).json({ message: "Order not found" });
    }

    res.json({ message: "Order deleted successfully" });
  } catch (error) {
    console.error("Delete order error:", error);
    res.status(500).json({ message: "Server error" });
  }
};

export const getOrderStats = async (req, res) => {
  try {
    const [stats] = await pool.query(`
      SELECT 
        COUNT(*) as total,
        SUM(CASE WHEN status = 'pending' THEN 1 ELSE 0 END) as pending,
        SUM(CASE WHEN status = 'processing' THEN 1 ELSE 0 END) as processing,
        SUM(CASE WHEN status = 'completed' THEN 1 ELSE 0 END) as completed,
        SUM(CASE WHEN status = 'cancelled' THEN 1 ELSE 0 END) as cancelled,
        SUM(amount) as total_revenue
      FROM orders
    `);

    res.json(stats[0]);
  } catch (error) {
    console.error("Get order stats error:", error);
    res.status(500).json({ message: "Server error" });
  }
};

export const updateOrderPayment = async (req, res) => {
  const connection = await pool.getConnection();

  try {
    await connection.beginTransaction();

    const { paymentId, payerId, status, amount } = req.body;
    const orderId = req.params.id;

    // Update order status to 'processing' after successful payment
    await connection.query("UPDATE orders SET status = ? WHERE id = ?", [
      "processing",
      orderId,
    ]);

    // Add to timeline
    await connection.query(
      "INSERT INTO order_timeline (order_id, event, description, user_name) VALUES (?, ?, ?, ?)",
      [
        orderId,
        "Thanh toán thành công",
        `PayPal Payment ID: ${paymentId}, Amount: ${amount}, Status: ${status}`,
        req.user ? req.user.username : "System",
      ]
    );

    await connection.commit();

    // Fetch order details for email
    const [orders] = await pool.query("SELECT * FROM orders WHERE id = ?", [orderId]);
    if (orders.length > 0) {
      const order = orders[0];
      const { sendPaymentSuccessEmail, sendPaymentNotificationToAdmin } = await import("../services/emailService.js");

      // Send emails
      Promise.all([
        sendPaymentSuccessEmail(order).catch(err => console.error("Failed to send payment success email:", err)),
        sendPaymentNotificationToAdmin(order).catch(err => console.error("Failed to send admin notification:", err))
      ]);

      // Emit socket event for real-time admin update
      const io = req.app.get("io");
      if (io) {
        io.emit("order_payment_success", {
          id: order.id,
          status: "processing",
          amount: order.amount,
          paymentId,
          updated_at: new Date()
        });
      }
    }

    res.json({ message: "Payment recorded and order updated successfully" });
  } catch (error) {
    await connection.rollback();
    console.error("Update payment error:", error);
    res.status(500).json({ message: "Server error" });
  } finally {
    connection.release();
  }
};
