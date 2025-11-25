/*
 Navicat Premium Dump SQL

 Source Server         : dtbv
 Source Server Type    : MySQL
 Source Server Version : 80043 (8.0.43)
 Source Host           : localhost:3306
 Source Schema         : rotider_cms

 Target Server Type    : MySQL
 Target Server Version : 80043 (8.0.43)
 File Encoding         : 65001

 Date: 25/11/2025 11:38:08
*/

SET NAMES utf8mb4;
SET FOREIGN_KEY_CHECKS = 0;

-- ----------------------------
-- Table structure for blog_posts
-- ----------------------------
DROP TABLE IF EXISTS `blog_posts`;
CREATE TABLE `blog_posts` (
  `id` int NOT NULL AUTO_INCREMENT,
  `title` varchar(255) NOT NULL,
  `slug` varchar(255) NOT NULL,
  `content` longtext,
  `excerpt` text,
  `featured_image` varchar(500) DEFAULT NULL,
  `author_id` int DEFAULT NULL,
  `status` enum('published','draft') DEFAULT 'draft',
  `published_at` datetime DEFAULT NULL,
  `meta_title` varchar(255) DEFAULT NULL,
  `meta_description` text,
  `created_at` datetime NOT NULL,
  `updated_at` datetime NOT NULL,
  PRIMARY KEY (`id`),
  UNIQUE KEY `slug` (`slug`),
  KEY `author_id` (`author_id`),
  CONSTRAINT `blog_posts_ibfk_1` FOREIGN KEY (`author_id`) REFERENCES `users` (`id`) ON DELETE SET NULL ON UPDATE CASCADE
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;

-- ----------------------------
-- Records of blog_posts
-- ----------------------------
BEGIN;
COMMIT;

-- ----------------------------
-- Table structure for conversations
-- ----------------------------
DROP TABLE IF EXISTS `conversations`;
CREATE TABLE `conversations` (
  `id` int NOT NULL AUTO_INCREMENT,
  `conversation_id` varchar(100) COLLATE utf8mb4_unicode_ci NOT NULL,
  `customer_name` varchar(100) COLLATE utf8mb4_unicode_ci NOT NULL,
  `customer_email` varchar(100) COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `last_message` text COLLATE utf8mb4_unicode_ci,
  `unread_count` int DEFAULT '0',
  `is_online` tinyint(1) DEFAULT '0',
  `updated_at` timestamp NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
  `created_at` timestamp NULL DEFAULT CURRENT_TIMESTAMP,
  PRIMARY KEY (`id`),
  UNIQUE KEY `conversation_id` (`conversation_id`),
  KEY `idx_conversation_id` (`conversation_id`),
  KEY `idx_updated_at` (`updated_at`)
) ENGINE=InnoDB AUTO_INCREMENT=8 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

-- ----------------------------
-- Records of conversations
-- ----------------------------
BEGIN;
INSERT INTO `conversations` (`id`, `conversation_id`, `customer_name`, `customer_email`, `last_message`, `unread_count`, `is_online`, `updated_at`, `created_at`) VALUES (1, 'conv-001', 'Nguyễn Văn A', 'nguyenvana@email.com', 'Cho mình hỏi về gói dịch vụ Premium...', 2, 1, '2025-11-12 03:36:26', '2025-11-12 03:36:26');
INSERT INTO `conversations` (`id`, `conversation_id`, `customer_name`, `customer_email`, `last_message`, `unread_count`, `is_online`, `updated_at`, `created_at`) VALUES (2, 'conv-002', 'Trần Thị B', 'tranthib@email.com', 'Cảm ơn anh/chị đã hỗ trợ!', 0, 0, '2025-11-12 03:36:26', '2025-11-12 03:36:26');
INSERT INTO `conversations` (`id`, `conversation_id`, `customer_name`, `customer_email`, `last_message`, `unread_count`, `is_online`, `updated_at`, `created_at`) VALUES (3, 'conv-003', 'Lê Văn C', 'levanc@email.com', 'Khi nào có kết quả ạ?', 1, 1, '2025-11-12 03:36:26', '2025-11-12 03:36:26');
INSERT INTO `conversations` (`id`, `conversation_id`, `customer_name`, `customer_email`, `last_message`, `unread_count`, `is_online`, `updated_at`, `created_at`) VALUES (4, 'conv-1763970825348', 'silinh66@gmail.com', 'silinh66@gmail.com', 'Xin chào', 0, 0, '2025-11-24 14:53:45', '2025-11-24 14:53:45');
INSERT INTO `conversations` (`id`, `conversation_id`, `customer_name`, `customer_email`, `last_message`, `unread_count`, `is_online`, `updated_at`, `created_at`) VALUES (5, 'conv-1763970847613', 'silinh66@gmail.com', 'silinh66@gmail.com', 'Xin chào', 0, 0, '2025-11-24 14:54:07', '2025-11-24 14:54:07');
INSERT INTO `conversations` (`id`, `conversation_id`, `customer_name`, `customer_email`, `last_message`, `unread_count`, `is_online`, `updated_at`, `created_at`) VALUES (6, 'conv-1763971143485', 'silinh66@gmail.com', 'silinh66@gmail.com', 'vâng tôi cần hỗ trợ về hiệu ứng video ', 0, 0, '2025-11-24 15:00:39', '2025-11-24 14:59:03');
INSERT INTO `conversations` (`id`, `conversation_id`, `customer_name`, `customer_email`, `last_message`, `unread_count`, `is_online`, `updated_at`, `created_at`) VALUES (7, 'conv-1763971330892', 'silinh66@gmail.com', 'silinh66@gmail.com', 'chào bạn', 0, 0, '2025-11-24 16:08:13', '2025-11-24 15:02:10');
COMMIT;

-- ----------------------------
-- Table structure for message_threads
-- ----------------------------
DROP TABLE IF EXISTS `message_threads`;
CREATE TABLE `message_threads` (
  `id` int NOT NULL AUTO_INCREMENT,
  `user_id` int DEFAULT NULL,
  `subject` varchar(255) NOT NULL,
  `status` enum('open','closed') DEFAULT 'open',
  `last_message_at` datetime DEFAULT NULL,
  `created_at` datetime NOT NULL,
  `updated_at` datetime NOT NULL,
  PRIMARY KEY (`id`),
  KEY `user_id` (`user_id`),
  CONSTRAINT `message_threads_ibfk_1` FOREIGN KEY (`user_id`) REFERENCES `users` (`id`) ON DELETE SET NULL ON UPDATE CASCADE
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;

-- ----------------------------
-- Records of message_threads
-- ----------------------------
BEGIN;
COMMIT;

-- ----------------------------
-- Table structure for messages
-- ----------------------------
DROP TABLE IF EXISTS `messages`;
CREATE TABLE `messages` (
  `id` int NOT NULL AUTO_INCREMENT,
  `conversation_id` varchar(100) COLLATE utf8mb4_unicode_ci NOT NULL,
  `sender_type` enum('customer','admin') COLLATE utf8mb4_unicode_ci NOT NULL,
  `sender_name` varchar(100) COLLATE utf8mb4_unicode_ci NOT NULL,
  `message` text COLLATE utf8mb4_unicode_ci NOT NULL,
  `is_read` tinyint(1) DEFAULT '0',
  `created_at` timestamp NULL DEFAULT CURRENT_TIMESTAMP,
  PRIMARY KEY (`id`),
  KEY `idx_conversation` (`conversation_id`),
  KEY `idx_sender_type` (`sender_type`),
  KEY `idx_created_at` (`created_at`)
) ENGINE=InnoDB AUTO_INCREMENT=30 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

-- ----------------------------
-- Records of messages
-- ----------------------------
BEGIN;
INSERT INTO `messages` (`id`, `conversation_id`, `sender_type`, `sender_name`, `message`, `is_read`, `created_at`) VALUES (1, 'conv-001', 'customer', 'Nguyễn Văn A', 'Xin chào, mình muốn hỏi về dịch vụ Photo Editing của bên bạn', 1, '2025-11-12 03:36:26');
INSERT INTO `messages` (`id`, `conversation_id`, `sender_type`, `sender_name`, `message`, `is_read`, `created_at`) VALUES (2, 'conv-001', 'admin', 'Admin', 'Chào bạn! Cảm ơn bạn đã quan tâm đến dịch vụ của chúng mình.', 1, '2025-11-12 03:36:26');
INSERT INTO `messages` (`id`, `conversation_id`, `sender_type`, `sender_name`, `message`, `is_read`, `created_at`) VALUES (3, 'conv-001', 'customer', 'Nguyễn Văn A', 'Mình có khoảng 50 ảnh bất động sản cần chỉnh sửa.', 1, '2025-11-12 03:36:26');
INSERT INTO `messages` (`id`, `conversation_id`, `sender_type`, `sender_name`, `message`, `is_read`, `created_at`) VALUES (4, 'conv-001', 'admin', 'Admin', 'Với 50 ảnh, mình recommend gói Premium cho bạn.', 1, '2025-11-12 03:36:26');
INSERT INTO `messages` (`id`, `conversation_id`, `sender_type`, `sender_name`, `message`, `is_read`, `created_at`) VALUES (5, 'conv-001', 'customer', 'Nguyễn Văn A', 'Cho mình hỏi về gói dịch vụ Premium thêm được không?', 0, '2025-11-12 03:36:26');
INSERT INTO `messages` (`id`, `conversation_id`, `sender_type`, `sender_name`, `message`, `is_read`, `created_at`) VALUES (6, 'conv-1763970825348', 'customer', 'silinh66@gmail.com', 'Xin chào', 0, '2025-11-24 14:53:45');
INSERT INTO `messages` (`id`, `conversation_id`, `sender_type`, `sender_name`, `message`, `is_read`, `created_at`) VALUES (7, 'conv-1763970847613', 'customer', 'silinh66@gmail.com', 'Xin chào', 1, '2025-11-24 14:54:07');
INSERT INTO `messages` (`id`, `conversation_id`, `sender_type`, `sender_name`, `message`, `is_read`, `created_at`) VALUES (8, 'conv-1763971143485', 'customer', 'silinh66@gmail.com', 'Xin chào, hỗ trợ tôi với', 1, '2025-11-24 14:59:03');
INSERT INTO `messages` (`id`, `conversation_id`, `sender_type`, `sender_name`, `message`, `is_read`, `created_at`) VALUES (9, 'conv-1763971143485', 'admin', 'admin', 'Chào bạn, bạn cần hỗ  trợ gì ạ', 0, '2025-11-24 14:59:18');
INSERT INTO `messages` (`id`, `conversation_id`, `sender_type`, `sender_name`, `message`, `is_read`, `created_at`) VALUES (10, 'conv-1763971143485', 'customer', 'silinh66@gmail.com', 'vâng tôi cần hỗ trợ về hiệu ứng video ', 1, '2025-11-24 15:00:39');
INSERT INTO `messages` (`id`, `conversation_id`, `sender_type`, `sender_name`, `message`, `is_read`, `created_at`) VALUES (11, 'conv-1763971330892', 'customer', 'silinh66@gmail.com', 'Xin chào\n', 1, '2025-11-24 15:02:10');
INSERT INTO `messages` (`id`, `conversation_id`, `sender_type`, `sender_name`, `message`, `is_read`, `created_at`) VALUES (12, 'conv-1763971330892', 'admin', 'admin', 'Chào bạn', 0, '2025-11-24 15:02:16');
INSERT INTO `messages` (`id`, `conversation_id`, `sender_type`, `sender_name`, `message`, `is_read`, `created_at`) VALUES (13, 'conv-1763971330892', 'admin', 'admin', 'Bạn cần hỗ trợ gì ạ', 0, '2025-11-24 15:02:20');
INSERT INTO `messages` (`id`, `conversation_id`, `sender_type`, `sender_name`, `message`, `is_read`, `created_at`) VALUES (14, 'conv-1763971330892', 'customer', 'silinh66@gmail.com', 'Tôi cần hỗ trợ về video', 1, '2025-11-24 15:02:26');
INSERT INTO `messages` (`id`, `conversation_id`, `sender_type`, `sender_name`, `message`, `is_read`, `created_at`) VALUES (15, 'conv-1763971330892', 'admin', 'admin', 'ok bạn', 0, '2025-11-24 15:02:32');
INSERT INTO `messages` (`id`, `conversation_id`, `sender_type`, `sender_name`, `message`, `is_read`, `created_at`) VALUES (16, 'conv-1763971330892', 'customer', 'silinh66@gmail.com', 'cảm ơn bạn', 1, '2025-11-24 15:02:37');
INSERT INTO `messages` (`id`, `conversation_id`, `sender_type`, `sender_name`, `message`, `is_read`, `created_at`) VALUES (17, 'conv-1763971330892', 'admin', 'admin', 'không có gì ạ', 0, '2025-11-24 15:05:20');
INSERT INTO `messages` (`id`, `conversation_id`, `sender_type`, `sender_name`, `message`, `is_read`, `created_at`) VALUES (18, 'conv-1763971330892', 'customer', 'silinh66@gmail.com', 'ok bạn', 1, '2025-11-24 15:05:24');
INSERT INTO `messages` (`id`, `conversation_id`, `sender_type`, `sender_name`, `message`, `is_read`, `created_at`) VALUES (19, 'conv-1763971330892', 'admin', 'admin', 'chào bạn nhé, cần giúp gì cứ nhắn cho tôi', 0, '2025-11-24 15:05:43');
INSERT INTO `messages` (`id`, `conversation_id`, `sender_type`, `sender_name`, `message`, `is_read`, `created_at`) VALUES (20, 'conv-1763971330892', 'customer', 'silinh66@gmail.com', 'ok bạn nhé', 1, '2025-11-24 15:05:48');
INSERT INTO `messages` (`id`, `conversation_id`, `sender_type`, `sender_name`, `message`, `is_read`, `created_at`) VALUES (21, 'conv-1763971330892', 'admin', 'admin', 'à bạn ơi', 0, '2025-11-24 15:11:05');
INSERT INTO `messages` (`id`, `conversation_id`, `sender_type`, `sender_name`, `message`, `is_read`, `created_at`) VALUES (22, 'conv-1763971330892', 'customer', 'silinh66@gmail.com', 'ơi bạn', 1, '2025-11-24 15:11:11');
INSERT INTO `messages` (`id`, `conversation_id`, `sender_type`, `sender_name`, `message`, `is_read`, `created_at`) VALUES (23, 'conv-1763971330892', 'admin', 'admin', 'tôi đang check chức năng scroll xuống tin nhắn mới nhất', 0, '2025-11-24 15:11:21');
INSERT INTO `messages` (`id`, `conversation_id`, `sender_type`, `sender_name`, `message`, `is_read`, `created_at`) VALUES (24, 'conv-1763971330892', 'customer', 'silinh66@gmail.com', 'ok tôi nhắn cho bạn test nè', 1, '2025-11-24 15:11:29');
INSERT INTO `messages` (`id`, `conversation_id`, `sender_type`, `sender_name`, `message`, `is_read`, `created_at`) VALUES (25, 'conv-1763971330892', 'admin', 'admin', 'ok chức năng ok rồi nhé ', 0, '2025-11-24 15:11:37');
INSERT INTO `messages` (`id`, `conversation_id`, `sender_type`, `sender_name`, `message`, `is_read`, `created_at`) VALUES (26, 'conv-1763971330892', 'admin', 'admin', 'cảm ơn bạn', 0, '2025-11-24 15:11:39');
INSERT INTO `messages` (`id`, `conversation_id`, `sender_type`, `sender_name`, `message`, `is_read`, `created_at`) VALUES (27, 'conv-1763971330892', 'customer', 'silinh66@gmail.com', 'ok bạn', 1, '2025-11-24 15:11:42');
INSERT INTO `messages` (`id`, `conversation_id`, `sender_type`, `sender_name`, `message`, `is_read`, `created_at`) VALUES (28, 'conv-1763971330892', 'customer', 'silinh66@gmail.com', 'alo', 1, '2025-11-24 16:08:06');
INSERT INTO `messages` (`id`, `conversation_id`, `sender_type`, `sender_name`, `message`, `is_read`, `created_at`) VALUES (29, 'conv-1763971330892', 'admin', 'admin', 'chào bạn', 0, '2025-11-24 16:08:13');
COMMIT;

-- ----------------------------
-- Table structure for order_files
-- ----------------------------
DROP TABLE IF EXISTS `order_files`;
CREATE TABLE `order_files` (
  `id` int NOT NULL AUTO_INCREMENT,
  `order_id` int NOT NULL,
  `file_name` varchar(255) COLLATE utf8mb4_unicode_ci NOT NULL,
  `file_path` varchar(255) COLLATE utf8mb4_unicode_ci NOT NULL,
  `file_size` varchar(20) COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `file_type` varchar(50) COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `uploaded_at` timestamp NULL DEFAULT CURRENT_TIMESTAMP,
  PRIMARY KEY (`id`),
  KEY `idx_order_id` (`order_id`),
  CONSTRAINT `order_files_ibfk_1` FOREIGN KEY (`order_id`) REFERENCES `orders` (`id`) ON DELETE CASCADE
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

-- ----------------------------
-- Records of order_files
-- ----------------------------
BEGIN;
COMMIT;

-- ----------------------------
-- Table structure for order_timeline
-- ----------------------------
DROP TABLE IF EXISTS `order_timeline`;
CREATE TABLE `order_timeline` (
  `id` int NOT NULL AUTO_INCREMENT,
  `order_id` int NOT NULL,
  `event` varchar(255) COLLATE utf8mb4_unicode_ci NOT NULL,
  `description` text COLLATE utf8mb4_unicode_ci,
  `user_name` varchar(100) COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `created_at` timestamp NULL DEFAULT CURRENT_TIMESTAMP,
  PRIMARY KEY (`id`),
  KEY `idx_order_id` (`order_id`),
  CONSTRAINT `order_timeline_ibfk_1` FOREIGN KEY (`order_id`) REFERENCES `orders` (`id`) ON DELETE CASCADE
) ENGINE=InnoDB AUTO_INCREMENT=6 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

-- ----------------------------
-- Records of order_timeline
-- ----------------------------
BEGIN;
INSERT INTO `order_timeline` (`id`, `order_id`, `event`, `description`, `user_name`, `created_at`) VALUES (1, 1, 'Đơn hàng được tạo', NULL, 'Khách hàng', '2025-11-12 03:36:26');
INSERT INTO `order_timeline` (`id`, `order_id`, `event`, `description`, `user_name`, `created_at`) VALUES (2, 1, 'Đơn hàng được xác nhận', NULL, 'Admin', '2025-11-12 03:36:26');
INSERT INTO `order_timeline` (`id`, `order_id`, `event`, `description`, `user_name`, `created_at`) VALUES (3, 1, 'Bắt đầu xử lý', NULL, 'Editor Team', '2025-11-12 03:36:26');
INSERT INTO `order_timeline` (`id`, `order_id`, `event`, `description`, `user_name`, `created_at`) VALUES (4, 2, 'Đơn hàng được tạo', NULL, 'Khách hàng', '2025-11-12 03:36:26');
INSERT INTO `order_timeline` (`id`, `order_id`, `event`, `description`, `user_name`, `created_at`) VALUES (5, 2, 'Đơn hàng hoàn thành', NULL, 'Admin', '2025-11-12 03:36:26');
COMMIT;

-- ----------------------------
-- Table structure for orders
-- ----------------------------
DROP TABLE IF EXISTS `orders`;
CREATE TABLE `orders` (
  `id` int NOT NULL AUTO_INCREMENT,
  `order_number` varchar(50) COLLATE utf8mb4_unicode_ci NOT NULL,
  `customer_name` varchar(100) COLLATE utf8mb4_unicode_ci NOT NULL,
  `customer_email` varchar(100) COLLATE utf8mb4_unicode_ci NOT NULL,
  `customer_phone` varchar(20) COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `customer_address` text COLLATE utf8mb4_unicode_ci,
  `service` varchar(100) COLLATE utf8mb4_unicode_ci NOT NULL,
  `package` varchar(50) COLLATE utf8mb4_unicode_ci NOT NULL,
  `description` text COLLATE utf8mb4_unicode_ci,
  `amount` decimal(10,2) NOT NULL,
  `status` enum('pending','processing','completed','cancelled') COLLATE utf8mb4_unicode_ci DEFAULT 'pending',
  `priority` enum('low','normal','high') COLLATE utf8mb4_unicode_ci DEFAULT 'normal',
  `deadline` date DEFAULT NULL,
  `notes` text COLLATE utf8mb4_unicode_ci,
  `created_at` timestamp NULL DEFAULT CURRENT_TIMESTAMP,
  `updated_at` timestamp NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
  PRIMARY KEY (`id`),
  UNIQUE KEY `order_number` (`order_number`),
  KEY `idx_order_number` (`order_number`),
  KEY `idx_status` (`status`),
  KEY `idx_customer_email` (`customer_email`)
) ENGINE=InnoDB AUTO_INCREMENT=4 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

-- ----------------------------
-- Records of orders
-- ----------------------------
BEGIN;
INSERT INTO `orders` (`id`, `order_number`, `customer_name`, `customer_email`, `customer_phone`, `customer_address`, `service`, `package`, `description`, `amount`, `status`, `priority`, `deadline`, `notes`, `created_at`, `updated_at`) VALUES (1, 'ORD-2025-001', 'Nguyễn Văn A', 'nguyenvana@email.com', '+84 123 456 789', '123 Nguyễn Huệ, Quận 1, TP.HCM', 'Photo Editing', 'Premium', 'Cần chỉnh sửa 50 ảnh bất động sản, yêu cầu chất lượng cao', 500000.00, 'processing', 'high', '2025-11-15', NULL, '2025-11-12 03:36:26', '2025-11-12 03:36:26');
INSERT INTO `orders` (`id`, `order_number`, `customer_name`, `customer_email`, `customer_phone`, `customer_address`, `service`, `package`, `description`, `amount`, `status`, `priority`, `deadline`, `notes`, `created_at`, `updated_at`) VALUES (2, 'ORD-2025-002', 'Trần Thị B', 'tranthib@email.com', '+84 987 654 321', '456 Lê Lợi, Quận 3, TP.HCM', 'Video Editing', 'Professional', 'Chỉnh sửa video marketing cho sản phẩm mới', 1200000.00, 'completed', 'normal', '2025-11-10', NULL, '2025-11-12 03:36:26', '2025-11-12 03:36:26');
INSERT INTO `orders` (`id`, `order_number`, `customer_name`, `customer_email`, `customer_phone`, `customer_address`, `service`, `package`, `description`, `amount`, `status`, `priority`, `deadline`, `notes`, `created_at`, `updated_at`) VALUES (3, 'ORD-2025-003', 'Lê Văn C', 'levanc@email.com', '+84 555 666 777', '789 Hai Bà Trưng, Quận 1, TP.HCM', 'Virtual Staging', 'Basic', 'Virtual staging cho 5 phòng', 800000.00, 'pending', 'normal', '2025-11-20', NULL, '2025-11-12 03:36:26', '2025-11-12 03:36:26');
COMMIT;

-- ----------------------------
-- Table structure for pages
-- ----------------------------
DROP TABLE IF EXISTS `pages`;
CREATE TABLE `pages` (
  `id` int NOT NULL AUTO_INCREMENT,
  `slug` varchar(100) NOT NULL,
  `title` varchar(255) NOT NULL,
  `content` longtext,
  `meta_title` varchar(255) DEFAULT NULL,
  `meta_description` text,
  `status` enum('published','draft') DEFAULT 'published',
  `created_at` datetime NOT NULL,
  `updated_at` datetime NOT NULL,
  PRIMARY KEY (`id`),
  UNIQUE KEY `slug` (`slug`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;

-- ----------------------------
-- Records of pages
-- ----------------------------
BEGIN;
COMMIT;

-- ----------------------------
-- Table structure for password_resets
-- ----------------------------
DROP TABLE IF EXISTS `password_resets`;
CREATE TABLE `password_resets` (
  `email` varchar(255) NOT NULL,
  `token` varchar(255) NOT NULL,
  `created_at` timestamp NULL DEFAULT CURRENT_TIMESTAMP,
  PRIMARY KEY (`token`),
  KEY `email` (`email`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;

-- ----------------------------
-- Records of password_resets
-- ----------------------------
BEGIN;
COMMIT;

-- ----------------------------
-- Table structure for payments
-- ----------------------------
DROP TABLE IF EXISTS `payments`;
CREATE TABLE `payments` (
  `id` int NOT NULL AUTO_INCREMENT,
  `order_id` int NOT NULL,
  `amount` decimal(10,2) NOT NULL,
  `payment_method` varchar(50) DEFAULT NULL,
  `transaction_id` varchar(255) DEFAULT NULL,
  `status` enum('pending','completed','failed','refunded') DEFAULT 'pending',
  `payment_date` datetime DEFAULT NULL,
  `created_at` datetime NOT NULL,
  `updated_at` datetime NOT NULL,
  PRIMARY KEY (`id`),
  KEY `order_id` (`order_id`),
  CONSTRAINT `payments_ibfk_1` FOREIGN KEY (`order_id`) REFERENCES `orders` (`id`) ON UPDATE CASCADE
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;

-- ----------------------------
-- Records of payments
-- ----------------------------
BEGIN;
COMMIT;

-- ----------------------------
-- Table structure for posts
-- ----------------------------
DROP TABLE IF EXISTS `posts`;
CREATE TABLE `posts` (
  `id` int NOT NULL AUTO_INCREMENT,
  `title` varchar(255) COLLATE utf8mb4_unicode_ci NOT NULL,
  `slug` varchar(255) COLLATE utf8mb4_unicode_ci NOT NULL,
  `excerpt` text COLLATE utf8mb4_unicode_ci,
  `content` longtext COLLATE utf8mb4_unicode_ci NOT NULL,
  `featured_image` longtext COLLATE utf8mb4_unicode_ci,
  `videos` json DEFAULT NULL COMMENT 'Array of videos with url, title, type (youtube/vimeo/upload), filename',
  `category` varchar(50) COLLATE utf8mb4_unicode_ci NOT NULL,
  `video_format` enum('horizontal','vertical') COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `status` enum('draft','published') COLLATE utf8mb4_unicode_ci DEFAULT 'draft',
  `views` int DEFAULT '0',
  `author_id` int NOT NULL,
  `created_at` timestamp NULL DEFAULT CURRENT_TIMESTAMP,
  `updated_at` timestamp NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
  `published_at` timestamp NULL DEFAULT NULL,
  `display_order` int DEFAULT '0',
  PRIMARY KEY (`id`),
  UNIQUE KEY `slug` (`slug`),
  KEY `idx_slug` (`slug`),
  KEY `idx_category` (`category`),
  KEY `idx_status` (`status`),
  KEY `idx_author` (`author_id`),
  KEY `idx_video_format` (`video_format`),
  CONSTRAINT `posts_ibfk_1` FOREIGN KEY (`author_id`) REFERENCES `users` (`id`) ON DELETE CASCADE
) ENGINE=InnoDB AUTO_INCREMENT=36 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

-- ----------------------------
-- Records of posts
-- ----------------------------
BEGIN;
INSERT INTO `posts` (`id`, `title`, `slug`, `excerpt`, `content`, `featured_image`, `videos`, `category`, `video_format`, `status`, `views`, `author_id`, `created_at`, `updated_at`, `published_at`, `display_order`) VALUES (16, 'Mindfulness', 'test-video-doc-3', 'Test video dọc', '<p>Test video dọc</p>', '/uploads/images/post-16-1763977358869.jpg', '[{\"url\": \"/uploads/videos/video-1763802231600-310105118.mp4\", \"type\": \"upload\", \"title\": \"7279193-uhd_2160_4096_24fps.mp4\", \"filename\": \"video-1763802231600-310105118.mp4\"}]', 'Video Editing', 'vertical', 'published', 0, 1, '2025-11-22 16:03:54', '2025-11-24 17:50:33', '2025-11-22 16:03:54', 15);
INSERT INTO `posts` (`id`, `title`, `slug`, `excerpt`, `content`, `featured_image`, `videos`, `category`, `video_format`, `status`, `views`, `author_id`, `created_at`, `updated_at`, `published_at`, `display_order`) VALUES (17, 'Soft Skills', 'test-video-doc-4', 'Test video dọc', '<p>Test video dọc</p>', '/uploads/images/post-17-1763977358926.jpg', '[{\"url\": \"/uploads/videos/video-1763802260585-476745919.mp4\", \"type\": \"upload\", \"title\": \"7600542-hd_1080_1920_30fps.mp4\", \"filename\": \"video-1763802260585-476745919.mp4\"}]', 'Video Editing', 'vertical', 'published', 0, 1, '2025-11-22 16:04:23', '2025-11-24 17:50:33', '2025-11-22 16:04:23', 14);
INSERT INTO `posts` (`id`, `title`, `slug`, `excerpt`, `content`, `featured_image`, `videos`, `category`, `video_format`, `status`, `views`, `author_id`, `created_at`, `updated_at`, `published_at`, `display_order`) VALUES (18, 'Time Management', 'test-video-doc-5', 'Test video dọc', '<p>Test video dọc</p>', '/uploads/images/post-18-1763977358951.jpg', '[{\"url\": \"/uploads/videos/video-1763802301497-32633247.mp4\", \"type\": \"upload\", \"title\": \"7600545-hd_1080_1920_30fps.mp4\", \"filename\": \"video-1763802301497-32633247.mp4\"}]', 'Video Editing', 'vertical', 'published', 0, 1, '2025-11-22 16:05:03', '2025-11-24 17:50:33', '2025-11-22 16:05:04', 13);
INSERT INTO `posts` (`id`, `title`, `slug`, `excerpt`, `content`, `featured_image`, `videos`, `category`, `video_format`, `status`, `views`, `author_id`, `created_at`, `updated_at`, `published_at`, `display_order`) VALUES (19, 'Deep Work', 'test-video-doc-6', 'Test video dọc', '<p>Test video dọc</p>', '/uploads/images/post-19-1763977358973.jpg', '[{\"url\": \"/uploads/videos/video-1763802338133-566229313.mp4\", \"type\": \"upload\", \"title\": \"8100337-uhd_4096_2160_25fps.mp4\", \"filename\": \"video-1763802338133-566229313.mp4\"}]', 'Video Editing', 'vertical', 'published', 0, 1, '2025-11-22 16:05:41', '2025-11-24 17:50:33', '2025-11-22 16:05:41', 12);
INSERT INTO `posts` (`id`, `title`, `slug`, `excerpt`, `content`, `featured_image`, `videos`, `category`, `video_format`, `status`, `views`, `author_id`, `created_at`, `updated_at`, `published_at`, `display_order`) VALUES (20, 'Procrastination', 'test-video-doc-7', 'Test video dọc', '<p>Test video dọc</p>', '/uploads/images/post-20-1763977358990.jpg', '[{\"url\": \"/uploads/videos/video-1763802371536-811625674.mp4\", \"type\": \"upload\", \"title\": \"8100345-uhd_2160_4096_25fps.mp4\", \"filename\": \"video-1763802371536-811625674.mp4\"}]', 'Video Editing', 'vertical', 'published', 0, 1, '2025-11-22 16:06:13', '2025-11-24 17:50:33', '2025-11-22 16:06:14', 11);
INSERT INTO `posts` (`id`, `title`, `slug`, `excerpt`, `content`, `featured_image`, `videos`, `category`, `video_format`, `status`, `views`, `author_id`, `created_at`, `updated_at`, `published_at`, `display_order`) VALUES (21, 'Growth Mindset', 'test-video-doc-8', 'Test video dọc', '<p>Test video dọc</p>', '/uploads/images/post-21-1763977359015.jpg', '[{\"url\": \"/uploads/videos/video-1763802403207-837107601.mp4\", \"type\": \"upload\", \"title\": \"15162384-hd_1080_1920_30fps.mp4\", \"filename\": \"video-1763802403207-837107601.mp4\"}]', 'Video Editing', 'vertical', 'published', 0, 1, '2025-11-22 16:06:45', '2025-11-24 17:50:33', '2025-11-22 16:06:45', 10);
INSERT INTO `posts` (`id`, `title`, `slug`, `excerpt`, `content`, `featured_image`, `videos`, `category`, `video_format`, `status`, `views`, `author_id`, `created_at`, `updated_at`, `published_at`, `display_order`) VALUES (22, 'Stop Wasting Your Time', 'stop-wasting-your-time', 'Stop Wasting Your Time', '<p><span style=\"color: rgb(0, 0, 0);\">Stop Wasting Your Time</span></p>', '/uploads/images/post-22-1763977359042.png', '[{\"url\": \"/uploads/videos/video-1763868032128-493761783.mp4\", \"type\": \"upload\", \"title\": \"Stop Wasting Your Time-Edit.mp4\", \"filename\": \"video-1763868032128-493761783.mp4\"}]', 'Video Editing', 'horizontal', 'published', 0, 1, '2025-11-23 10:25:27', '2025-11-24 17:50:33', '2025-11-23 10:25:28', 4);
INSERT INTO `posts` (`id`, `title`, `slug`, `excerpt`, `content`, `featured_image`, `videos`, `category`, `video_format`, `status`, `views`, `author_id`, `created_at`, `updated_at`, `published_at`, `display_order`) VALUES (23, 'AI As A Life Coach', 'ai-as-a-life-coach', 'AI As A Life Coach', '<p><span style=\"color: rgb(0, 0, 0);\">AI As A Life Coach</span></p>', '/uploads/images/post-23-1763977359058.png', '[{\"url\": \"/uploads/videos/video-1763870030003-399022889.mp4\", \"type\": \"upload\", \"title\": \"AI as a life coach( Edit).mp4\", \"filename\": \"video-1763870030003-399022889.mp4\"}]', 'Video Editing', 'horizontal', 'published', 0, 1, '2025-11-23 10:25:58', '2025-11-24 17:50:33', '2025-11-23 10:25:59', 3);
INSERT INTO `posts` (`id`, `title`, `slug`, `excerpt`, `content`, `featured_image`, `videos`, `category`, `video_format`, `status`, `views`, `author_id`, `created_at`, `updated_at`, `published_at`, `display_order`) VALUES (24, 'Truth', 'truth', 'Truth', '<p><span style=\"color: rgb(0, 0, 0);\">Truth</span></p>', '/uploads/images/post-24-1763977359079.png', '[{\"url\": \"/uploads/videos/video-1763868404587-338667591.mp4\", \"type\": \"upload\", \"title\": \"Truth.mp4\", \"filename\": \"video-1763868404587-338667591.mp4\"}]', 'Video Editing', 'horizontal', 'published', 0, 1, '2025-11-23 10:26:48', '2025-11-24 17:50:33', '2025-11-23 10:26:49', 2);
INSERT INTO `posts` (`id`, `title`, `slug`, `excerpt`, `content`, `featured_image`, `videos`, `category`, `video_format`, `status`, `views`, `author_id`, `created_at`, `updated_at`, `published_at`, `display_order`) VALUES (25, 'Matrix', 'matrix', 'Matrix', '<p><span style=\"color: rgb(0, 0, 0);\">Matrix</span></p>', '/uploads/images/post-25-1763977359105.png', '[{\"url\": \"/uploads/videos/video-1763868436392-18008413.mp4\", \"type\": \"upload\", \"title\": \"Matrix(Edit).mp4\", \"filename\": \"video-1763868436392-18008413.mp4\"}]', 'Video Editing', 'horizontal', 'published', 0, 1, '2025-11-23 10:27:18', '2025-11-24 17:50:33', '2025-11-23 10:27:19', 1);
INSERT INTO `posts` (`id`, `title`, `slug`, `excerpt`, `content`, `featured_image`, `videos`, `category`, `video_format`, `status`, `views`, `author_id`, `created_at`, `updated_at`, `published_at`, `display_order`) VALUES (26, 'Investor', 'test-1', 'Investing isn\'t just about charts and tickers; it is the art of buying back your freedom. Discover the fundamental shift in mindset that separates a \"saver\" from a true \"investor\" and learn how to make your money work harder than you do.', '<p><strong>Title: Don\'t Just Work for Money—Make Money Work for You</strong></p><p>Many people mistakenly believe that the title of \"Investor\" is reserved for Wall Street elites or those with millions in the bank. In reality, investing is not a status; it is a <strong>mindset</strong>.</p><p>The biggest difference lies in how we view risk and time:</p><p><br></p><ul><li><strong>The Employee:</strong> Trades time for money and avoids risk to protect security.</li><li><strong>The Investor:</strong> Trades calculated risk for returns and uses money to buy back time.</li></ul><p>To succeed as an investor, you don\'t need a massive starting capital, but you do need <strong>iron discipline</strong>. It is about harnessing the power of compound interest and mastering the art of patience. The market will fluctuate, but a long-term perspective acts as your compass through the noise.</p><p>Stop waiting for the \"perfect moment.\" The best time to plant a tree was 20 years ago. The second-best time is now. Are you ready to make the shift?</p>', '/uploads/images/post-26-1763977359136.png', '[{\"url\": \"/uploads/videos/video-1763868735004-534332586.mp4\", \"type\": \"upload\", \"title\": \"Test1.mp4\", \"filename\": \"video-1763868735004-534332586.mp4\"}]', 'Video Editing', 'horizontal', 'published', 0, 1, '2025-11-23 10:32:17', '2025-11-24 17:50:33', '2025-11-23 10:32:18', 0);
INSERT INTO `posts` (`id`, `title`, `slug`, `excerpt`, `content`, `featured_image`, `videos`, `category`, `video_format`, `status`, `views`, `author_id`, `created_at`, `updated_at`, `published_at`, `display_order`) VALUES (27, 'Personal Growth', 'test-2', 'Test 2', '<p>Test 2</p>', '/uploads/images/post-27-1763977359209.png', '[{\"url\": \"/uploads/videos/video-1763870096908-352257695.mp4\", \"type\": \"upload\", \"title\": \"Test2.mp4\", \"filename\": \"video-1763870096908-352257695.mp4\"}]', 'Video Editing', 'horizontal', 'published', 0, 1, '2025-11-23 10:32:46', '2025-11-24 17:50:33', '2025-11-23 10:32:47', 5);
INSERT INTO `posts` (`id`, `title`, `slug`, `excerpt`, `content`, `featured_image`, `videos`, `category`, `video_format`, `status`, `views`, `author_id`, `created_at`, `updated_at`, `published_at`, `display_order`) VALUES (28, 'Self Improvement', 'test-3', 'Test 3', '<p>Test 3</p>', '/uploads/images/post-28-1763977359310.png', '[{\"url\": \"/uploads/videos/video-1763870055705-655992504.mp4\", \"type\": \"upload\", \"title\": \"Test3.mp4\", \"filename\": \"video-1763870055705-655992504.mp4\"}]', 'Video Editing', 'horizontal', 'published', 0, 1, '2025-11-23 10:33:19', '2025-11-24 17:50:33', '2025-11-23 10:33:19', 6);
INSERT INTO `posts` (`id`, `title`, `slug`, `excerpt`, `content`, `featured_image`, `videos`, `category`, `video_format`, `status`, `views`, `author_id`, `created_at`, `updated_at`, `published_at`, `display_order`) VALUES (29, 'Develop Yourself', 'test-4', 'Test 4', '<p>Test 4</p>', '/uploads/images/post-29-1763977359347.png', '[{\"url\": \"/uploads/videos/video-1763868825078-475526815.mp4\", \"type\": \"upload\", \"title\": \"Test4.mp4\", \"filename\": \"video-1763868825078-475526815.mp4\"}]', 'Video Editing', 'horizontal', 'published', 0, 1, '2025-11-23 10:33:47', '2025-11-24 17:50:33', '2025-11-23 10:33:48', 7);
INSERT INTO `posts` (`id`, `title`, `slug`, `excerpt`, `content`, `featured_image`, `videos`, `category`, `video_format`, `status`, `views`, `author_id`, `created_at`, `updated_at`, `published_at`, `display_order`) VALUES (30, 'Develope Yourself', 'test-5', 'Test 5', '<p>Test 5</p>', '/uploads/images/post-30-1763977359391.png', '[{\"url\": \"/uploads/videos/video-1763868855928-187081342.mp4\", \"type\": \"upload\", \"title\": \"Test5.mp4\", \"filename\": \"video-1763868855928-187081342.mp4\"}]', 'Video Editing', 'horizontal', 'published', 0, 1, '2025-11-23 10:34:18', '2025-11-24 17:50:33', '2025-11-23 10:34:18', 8);
INSERT INTO `posts` (`id`, `title`, `slug`, `excerpt`, `content`, `featured_image`, `videos`, `category`, `video_format`, `status`, `views`, `author_id`, `created_at`, `updated_at`, `published_at`, `display_order`) VALUES (31, 'Focus', 'test-6', 'Test 6', '<p>Test 6</p>', '/uploads/images/post-31-1763977359431.png', '[{\"url\": \"/uploads/videos/video-1763868890780-943208383.mp4\", \"type\": \"upload\", \"title\": \"Test6.mp4\", \"filename\": \"video-1763868890780-943208383.mp4\"}]', 'Video Editing', 'horizontal', 'published', 0, 1, '2025-11-23 10:34:53', '2025-11-24 17:50:33', '2025-11-23 10:34:54', 9);
INSERT INTO `posts` (`id`, `title`, `slug`, `excerpt`, `content`, `featured_image`, `videos`, `category`, `video_format`, `status`, `views`, `author_id`, `created_at`, `updated_at`, `published_at`, `display_order`) VALUES (32, 'Map Editing', 'map-editing', 'Map Editing', '<p>Map Editing</p>', '/uploads/images/post-img-1763978624673-187576397.png', '[{\"url\": \"/uploads/videos/video-1763978530059-777335596.mp4\", \"type\": \"upload\", \"title\": \"camranh.mp4\", \"filename\": \"video-1763978530059-777335596.mp4\"}]', 'Video Editing', 'vertical', 'published', 0, 1, '2025-11-24 17:03:44', '2025-11-24 17:50:33', '2025-11-24 17:03:45', 0);
INSERT INTO `posts` (`id`, `title`, `slug`, `excerpt`, `content`, `featured_image`, `videos`, `category`, `video_format`, `status`, `views`, `author_id`, `created_at`, `updated_at`, `published_at`, `display_order`) VALUES (34, 'Kra Canal', 'kra-canal', 'Kra Canal ', '<p>Kra Canal</p>', '/uploads/images/post-img-1763978747615-545103875.png', '[{\"url\": \"/uploads/videos/video-1763978683497-919038114.mp4\", \"type\": \"upload\", \"title\": \"kra.mp4\", \"filename\": \"video-1763978683497-919038114.mp4\"}]', 'Video Editing', 'vertical', 'published', 0, 1, '2025-11-24 17:05:47', '2025-11-24 17:50:33', '2025-11-24 17:05:48', 0);
INSERT INTO `posts` (`id`, `title`, `slug`, `excerpt`, `content`, `featured_image`, `videos`, `category`, `video_format`, `status`, `views`, `author_id`, `created_at`, `updated_at`, `published_at`, `display_order`) VALUES (35, 'FPT Headquarters', 'fpt-headquarters', 'FPT Headquarters', '<p>FPT Headquarters</p>', '/uploads/images/post-img-1763978868558-767398437.png', '[{\"url\": \"/uploads/videos/video-1763978866632-589066969.mp4\", \"type\": \"upload\", \"title\": \"fpt.mp4\", \"filename\": \"video-1763978866632-589066969.mp4\"}]', 'Video Editing', 'vertical', 'published', 0, 1, '2025-11-24 17:07:48', '2025-11-24 17:50:33', '2025-11-24 17:07:49', 0);
COMMIT;

-- ----------------------------
-- Table structure for services
-- ----------------------------
DROP TABLE IF EXISTS `services`;
CREATE TABLE `services` (
  `id` int NOT NULL AUTO_INCREMENT,
  `name` varchar(255) NOT NULL,
  `slug` varchar(255) NOT NULL,
  `category` enum('photo-editing','video-editing','virtual-service') NOT NULL,
  `description` text,
  `features` longtext,
  `price` decimal(10,2) DEFAULT NULL,
  `turnaround_time` varchar(100) DEFAULT NULL,
  `image_url` varchar(500) DEFAULT NULL,
  `sample_before` varchar(500) DEFAULT NULL,
  `sample_after` varchar(500) DEFAULT NULL,
  `status` enum('active','inactive') DEFAULT 'active',
  `display_order` int DEFAULT '0',
  `created_at` datetime NOT NULL,
  `updated_at` datetime NOT NULL,
  PRIMARY KEY (`id`),
  UNIQUE KEY `slug` (`slug`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;

-- ----------------------------
-- Records of services
-- ----------------------------
BEGIN;
COMMIT;

-- ----------------------------
-- Table structure for settings
-- ----------------------------
DROP TABLE IF EXISTS `settings`;
CREATE TABLE `settings` (
  `id` int NOT NULL AUTO_INCREMENT,
  `key` varchar(100) NOT NULL,
  `value` text,
  `type` varchar(50) DEFAULT 'text',
  `created_at` datetime NOT NULL,
  `updated_at` datetime NOT NULL,
  PRIMARY KEY (`id`),
  UNIQUE KEY `key` (`key`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;

-- ----------------------------
-- Records of settings
-- ----------------------------
BEGIN;
COMMIT;

-- ----------------------------
-- Table structure for users
-- ----------------------------
DROP TABLE IF EXISTS `users`;
CREATE TABLE `users` (
  `id` int NOT NULL AUTO_INCREMENT,
  `username` varchar(50) COLLATE utf8mb4_unicode_ci NOT NULL,
  `email` varchar(100) COLLATE utf8mb4_unicode_ci NOT NULL,
  `password` varchar(255) COLLATE utf8mb4_unicode_ci NOT NULL,
  `full_name` varchar(100) COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `role` enum('admin','editor','viewer') COLLATE utf8mb4_unicode_ci DEFAULT 'editor',
  `avatar` varchar(255) COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `created_at` timestamp NULL DEFAULT CURRENT_TIMESTAMP,
  `updated_at` timestamp NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
  `reset_token` varchar(255) COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `reset_token_expiry` datetime DEFAULT NULL,
  PRIMARY KEY (`id`),
  UNIQUE KEY `username` (`username`),
  UNIQUE KEY `email` (`email`),
  KEY `idx_username` (`username`),
  KEY `idx_email` (`email`)
) ENGINE=InnoDB AUTO_INCREMENT=4 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

-- ----------------------------
-- Records of users
-- ----------------------------
BEGIN;
INSERT INTO `users` (`id`, `username`, `email`, `password`, `full_name`, `role`, `avatar`, `created_at`, `updated_at`, `reset_token`, `reset_token_expiry`) VALUES (1, 'admin', 'admin@rotider.com', '$2a$10$m7Blj10BTFx1031IPB3ux.Q6qcJ9fjhP4OJ9oA4zFEwN3eyumTVRy', 'Administrator', 'admin', NULL, '2025-11-12 03:35:03', '2025-11-12 03:35:03', NULL, NULL);
INSERT INTO `users` (`id`, `username`, `email`, `password`, `full_name`, `role`, `avatar`, `created_at`, `updated_at`, `reset_token`, `reset_token_expiry`) VALUES (3, 'silinh66@gmail.com', 'silinh66@gmail.com', '$2a$10$TFU6SOVwi4Nqx5sqyMFm2OsPufVVty.5grSf4Q9Hs0qsnf.do4kCy', 'silinh66@gmail.com', 'editor', NULL, '2025-11-24 14:36:51', '2025-11-24 19:47:04', NULL, NULL);
COMMIT;

SET FOREIGN_KEY_CHECKS = 1;
