import mysql from "mysql2/promise";
import dotenv from "dotenv";
import bcrypt from "bcryptjs";

dotenv.config();

const initDatabase = async () => {
  let connection;

  try {
    // Connect without database first
    connection = await mysql.createConnection({
      host: process.env.DB_HOST,
      port: process.env.DB_PORT,
      user: process.env.DB_USER,
      password: process.env.DB_PASSWORD,
    });

    console.log("🔗 Connected to MySQL server");

    // Create database if not exists
    await connection.query(
      `CREATE DATABASE IF NOT EXISTS ${process.env.DB_NAME}`
    );
    console.log(
      `✅ Database '${process.env.DB_NAME}' created or already exists`
    );

    // Use the database
    await connection.query(`USE ${process.env.DB_NAME}`);

    // Create users table
    await connection.query(`
      CREATE TABLE IF NOT EXISTS users (
        id INT AUTO_INCREMENT PRIMARY KEY,
        username VARCHAR(50) UNIQUE NOT NULL,
        email VARCHAR(100) UNIQUE NOT NULL,
        password VARCHAR(255) NOT NULL,
        full_name VARCHAR(100),
        role ENUM('admin', 'editor', 'viewer') DEFAULT 'editor',
        avatar VARCHAR(255),
        created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
        updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
        INDEX idx_username (username),
        INDEX idx_email (email)
      ) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci
    `);
    console.log('✅ Table "users" created');

    // Create posts table
    await connection.query(`
      CREATE TABLE IF NOT EXISTS posts (
        id INT AUTO_INCREMENT PRIMARY KEY,
        title VARCHAR(255) NOT NULL,
        slug VARCHAR(255) UNIQUE NOT NULL,
        excerpt TEXT,
        content LONGTEXT NOT NULL,
        featured_image LONGTEXT,
        category VARCHAR(50) NOT NULL,
        status ENUM('draft', 'published') DEFAULT 'draft',
        views INT DEFAULT 0,
        author_id INT NOT NULL,
        created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
        updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
        published_at TIMESTAMP NULL,
        FOREIGN KEY (author_id) REFERENCES users(id) ON DELETE CASCADE,
        INDEX idx_slug (slug),
        INDEX idx_category (category),
        INDEX idx_status (status),
        INDEX idx_author (author_id)
      ) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci
    `);
    console.log('✅ Table "posts" created');

    // Create orders table
    await connection.query(`
      CREATE TABLE IF NOT EXISTS orders (
        id INT AUTO_INCREMENT PRIMARY KEY,
        order_number VARCHAR(50) UNIQUE NOT NULL,
        customer_name VARCHAR(100) NOT NULL,
        customer_email VARCHAR(100) NOT NULL,
        customer_phone VARCHAR(20),
        customer_address TEXT,
        service VARCHAR(100) NOT NULL,
        package VARCHAR(50) NOT NULL,
        description TEXT,
        amount DECIMAL(10, 2) NOT NULL,
        status ENUM('pending', 'processing', 'completed', 'cancelled') DEFAULT 'pending',
        priority ENUM('low', 'normal', 'high') DEFAULT 'normal',
        deadline DATE,
        notes TEXT,
        created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
        updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
        INDEX idx_order_number (order_number),
        INDEX idx_status (status),
        INDEX idx_customer_email (customer_email)
      ) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci
    `);
    console.log('✅ Table "orders" created');

    // Create order_files table
    await connection.query(`
      CREATE TABLE IF NOT EXISTS order_files (
        id INT AUTO_INCREMENT PRIMARY KEY,
        order_id INT NOT NULL,
        file_name VARCHAR(255) NOT NULL,
        file_path VARCHAR(255) NOT NULL,
        file_size VARCHAR(20),
        file_type VARCHAR(50),
        uploaded_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
        FOREIGN KEY (order_id) REFERENCES orders(id) ON DELETE CASCADE,
        INDEX idx_order_id (order_id)
      ) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci
    `);
    console.log('✅ Table "order_files" created');

    // Create order_timeline table
    await connection.query(`
      CREATE TABLE IF NOT EXISTS order_timeline (
        id INT AUTO_INCREMENT PRIMARY KEY,
        order_id INT NOT NULL,
        event VARCHAR(255) NOT NULL,
        description TEXT,
        user_name VARCHAR(100),
        created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
        FOREIGN KEY (order_id) REFERENCES orders(id) ON DELETE CASCADE,
        INDEX idx_order_id (order_id)
      ) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci
    `);
    console.log('✅ Table "order_timeline" created');

    // Create messages table
    await connection.query(`
      CREATE TABLE IF NOT EXISTS messages (
        id INT AUTO_INCREMENT PRIMARY KEY,
        conversation_id VARCHAR(100) NOT NULL,
        sender_type ENUM('customer', 'admin') NOT NULL,
        sender_name VARCHAR(100) NOT NULL,
        message TEXT NOT NULL,
        is_read BOOLEAN DEFAULT FALSE,
        created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
        INDEX idx_conversation (conversation_id),
        INDEX idx_sender_type (sender_type),
        INDEX idx_created_at (created_at)
      ) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci
    `);
    console.log('✅ Table "messages" created');

    // Create conversations table
    await connection.query(`
      CREATE TABLE IF NOT EXISTS conversations (
        id INT AUTO_INCREMENT PRIMARY KEY,
        conversation_id VARCHAR(100) UNIQUE NOT NULL,
        customer_name VARCHAR(100) NOT NULL,
        customer_email VARCHAR(100),
        last_message TEXT,
        unread_count INT DEFAULT 0,
        is_online BOOLEAN DEFAULT FALSE,
        updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
        created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
        INDEX idx_conversation_id (conversation_id),
        INDEX idx_updated_at (updated_at)
      ) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci
    `);
    console.log('✅ Table "conversations" created');

    // Insert default admin user
    const hashedPassword = await bcrypt.hash("admin123", 10);
    await connection.query(
      `
      INSERT IGNORE INTO users (username, email, password, full_name, role)
      VALUES ('admin', 'admin@ZOOZOO.com', ?, 'Administrator', 'admin')
    `,
      [hashedPassword]
    );
    console.log(
      "✅ Default admin user created (username: admin, password: admin123)"
    );

    // Insert sample posts
    const [adminUser] = await connection.query(
      'SELECT id FROM users WHERE username = "admin"'
    );
    const adminId = adminUser[0].id;

    await connection.query(
      `
      INSERT IGNORE INTO posts (id, title, slug, excerpt, content, category, status, author_id, views, published_at)
      VALUES 
        (1, ?, ?, ?, ?, ?, ?, ?, ?, NOW()),
        (2, ?, ?, ?, ?, ?, ?, ?, ?, NOW()),
        (3, ?, ?, ?, ?, ?, ?, ?, ?, NULL)
    `,
      [
        "Hướng dẫn chỉnh sửa ảnh chuyên nghiệp",
        "huong-dan-chinh-sua-anh-chuyen-nghiep",
        "Khám phá những kỹ thuật và bí quyết để chỉnh sửa ảnh như một chuyên gia.",
        "<h2>Giới thiệu</h2><p>Chỉnh sửa ảnh là một kỹ năng quan trọng trong ngành nhiếp ảnh hiện đại...</p>",
        "Photo Editing",
        "published",
        adminId,
        1234,
        "Xu hướng Virtual Staging 2025",
        "xu-huong-virtual-staging-2025",
        "Tìm hiểu về những xu hướng mới nhất trong lĩnh vực Virtual Staging.",
        "<h2>Virtual Staging là gì?</h2><p>Virtual Staging là quá trình sử dụng công nghệ để...</p>",
        "Virtual Staging",
        "published",
        adminId,
        892,
        "Tips tăng chất lượng video marketing",
        "tips-tang-chat-luong-video-marketing",
        "Những mẹo đơn giản giúp video marketing của bạn trở nên chuyên nghiệp hơn.",
        "<h2>Tầm quan trọng của video marketing</h2><p>Video marketing đang trở thành...</p>",
        "Video Editing",
        "draft",
        adminId,
        567,
      ]
    );
    console.log("✅ Sample posts inserted");

    // Insert sample orders
    await connection.query(`
      INSERT IGNORE INTO orders (id, order_number, customer_name, customer_email, customer_phone, customer_address,
                                  service, package, description, amount, status, priority, deadline)
      VALUES 
        (1, 'ORD-2025-001', 'Nguyễn Văn A', 'nguyenvana@email.com', '+84 123 456 789', 
         '123 Nguyễn Huệ, Quận 1, TP.HCM', 'Photo Editing', 'Premium',
         'Cần chỉnh sửa 50 ảnh bất động sản, yêu cầu chất lượng cao', 500000, 'processing', 'high', '2025-11-15'),
        (2, 'ORD-2025-002', 'Trần Thị B', 'tranthib@email.com', '+84 987 654 321',
         '456 Lê Lợi, Quận 3, TP.HCM', 'Video Editing', 'Professional',
         'Chỉnh sửa video marketing cho sản phẩm mới', 1200000, 'completed', 'normal', '2025-11-10'),
        (3, 'ORD-2025-003', 'Lê Văn C', 'levanc@email.com', '+84 555 666 777',
         '789 Hai Bà Trưng, Quận 1, TP.HCM', 'Virtual Staging', 'Basic',
         'Virtual staging cho 5 phòng', 800000, 'pending', 'normal', '2025-11-20')
    `);
    console.log("✅ Sample orders inserted");

    // Insert order timeline
    await connection.query(`
      INSERT IGNORE INTO order_timeline (id, order_id, event, user_name)
      VALUES 
        (1, 1, 'Đơn hàng được tạo', 'Khách hàng'),
        (2, 1, 'Đơn hàng được xác nhận', 'Admin'),
        (3, 1, 'Bắt đầu xử lý', 'Editor Team'),
        (4, 2, 'Đơn hàng được tạo', 'Khách hàng'),
        (5, 2, 'Đơn hàng hoàn thành', 'Admin')
    `);
    console.log("✅ Sample order timeline inserted");

    // Insert sample conversations
    await connection.query(`
      INSERT IGNORE INTO conversations (id, conversation_id, customer_name, customer_email, last_message, unread_count, is_online)
      VALUES 
        (1, 'conv-001', 'Nguyễn Văn A', 'nguyenvana@email.com', 'Cho mình hỏi về gói dịch vụ Premium...', 2, TRUE),
        (2, 'conv-002', 'Trần Thị B', 'tranthib@email.com', 'Cảm ơn anh/chị đã hỗ trợ!', 0, FALSE),
        (3, 'conv-003', 'Lê Văn C', 'levanc@email.com', 'Khi nào có kết quả ạ?', 1, TRUE)
    `);
    console.log("✅ Sample conversations inserted");

    // Insert sample messages
    await connection.query(`
      INSERT IGNORE INTO messages (id, conversation_id, sender_type, sender_name, message, is_read)
      VALUES 
        (1, 'conv-001', 'customer', 'Nguyễn Văn A', 'Xin chào, mình muốn hỏi về dịch vụ Photo Editing của bên bạn', TRUE),
        (2, 'conv-001', 'admin', 'Admin', 'Chào bạn! Cảm ơn bạn đã quan tâm đến dịch vụ của chúng mình.', TRUE),
        (3, 'conv-001', 'customer', 'Nguyễn Văn A', 'Mình có khoảng 50 ảnh bất động sản cần chỉnh sửa.', TRUE),
        (4, 'conv-001', 'admin', 'Admin', 'Với 50 ảnh, mình recommend gói Premium cho bạn.', TRUE),
        (5, 'conv-001', 'customer', 'Nguyễn Văn A', 'Cho mình hỏi về gói dịch vụ Premium thêm được không?', FALSE)
    `);
    console.log("✅ Sample messages inserted");

    console.log("\n🎉 Database initialization completed successfully!\n");
    console.log("📋 Summary:");
    console.log("   - Database: ZOOZOO_cms");
    console.log(
      "   - Tables: users, posts, orders, order_files, order_timeline, messages, conversations"
    );
    console.log("   - Admin user: admin / admin123");
    console.log("   - Sample data inserted\n");
  } catch (error) {
    console.error("❌ Error initializing database:", error);
    throw error;
  } finally {
    if (connection) {
      await connection.end();
    }
  }
};

// Run initialization
initDatabase()
  .then(() => process.exit(0))
  .catch((error) => {
    console.error(error);
    process.exit(1);
  });
