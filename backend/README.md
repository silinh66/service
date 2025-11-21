# 🚀 ZOOZOO Backend API

Backend API cho ZOOZOO CMS được xây dựng bằng Node.js, Express và MySQL.

## 📋 Yêu cầu

- Node.js >= 16.x
- MySQL >= 5.7
- npm hoặc yarn

## 🔧 Cài đặt

```bash
# Di chuyển vào thư mục backend
cd backend

# Cài đặt dependencies
npm install

# Khởi tạo database và dữ liệu mẫu
npm run init-db

# Chạy server
npm run dev
```

Server sẽ chạy tại: **http://localhost:5000**

## 🗄️ Cấu hình Database

File `.env` đã được cấu hình với thông tin MySQL của bạn:

```env
DB_HOST=localhost
DB_PORT=3306
DB_USER=root
DB_PASSWORD=tmkITC98
DB_NAME=ZOOZOO_cms
```

## 📊 Database Schema

### Tables

1. **users** - Quản lý người dùng

   - id, username, email, password, full_name, role, avatar, created_at, updated_at

2. **posts** - Quản lý bài viết

   - id, title, slug, excerpt, content, featured_image, category, status, views, author_id, created_at, updated_at, published_at

3. **orders** - Quản lý đơn hàng

   - id, order_number, customer_name, customer_email, customer_phone, customer_address, service, package, description, amount, status, priority, deadline, notes, created_at, updated_at

4. **order_files** - File đính kèm đơn hàng

   - id, order_id, file_name, file_path, file_size, file_type, uploaded_at

5. **order_timeline** - Lịch sử đơn hàng

   - id, order_id, event, description, user_name, created_at

6. **messages** - Tin nhắn

   - id, conversation_id, sender_type, sender_name, message, is_read, created_at

7. **conversations** - Cuộc hội thoại
   - id, conversation_id, customer_name, customer_email, last_message, unread_count, is_online, updated_at, created_at

## 🔐 Authentication

API sử dụng JWT (JSON Web Token) để xác thực.

### Default Admin Account

- **Username:** admin
- **Password:** admin123

### Login Flow

1. POST `/api/auth/login` với username và password
2. Nhận JWT token trong response
3. Gửi token trong header: `Authorization: Bearer <token>`

## 📡 API Endpoints

### Authentication

```
POST   /api/auth/login          - Đăng nhập
POST   /api/auth/register       - Đăng ký user mới
GET    /api/auth/profile        - Lấy thông tin profile (requires auth)
```

### Posts

```
GET    /api/posts               - Lấy danh sách bài viết
GET    /api/posts/:id           - Lấy chi tiết bài viết
POST   /api/posts               - Tạo bài viết mới (requires auth)
PUT    /api/posts/:id           - Cập nhật bài viết (requires auth)
DELETE /api/posts/:id           - Xóa bài viết (requires auth)
POST   /api/posts/:id/views     - Tăng lượt xem
```

#### Query Parameters cho GET /api/posts

- `status` - Filter theo trạng thái (draft, published)
- `category` - Filter theo danh mục
- `search` - Tìm kiếm theo title hoặc content

### Orders

```
GET    /api/orders              - Lấy danh sách đơn hàng (requires auth)
GET    /api/orders/stats        - Thống kê đơn hàng (requires auth)
GET    /api/orders/:id          - Chi tiết đơn hàng (requires auth)
POST   /api/orders              - Tạo đơn hàng mới (requires auth)
PATCH  /api/orders/:id/status   - Cập nhật trạng thái (requires auth)
DELETE /api/orders/:id          - Xóa đơn hàng (requires auth)
```

#### Query Parameters cho GET /api/orders

- `status` - Filter theo trạng thái (pending, processing, completed, cancelled, all)
- `search` - Tìm kiếm theo order_number, customer_name, customer_email

### Messages

```
GET    /api/messages/conversations                    - Lấy danh sách hội thoại (requires auth)
GET    /api/messages/conversations/:conversationId    - Lấy tin nhắn của hội thoại (requires auth)
POST   /api/messages/conversations/:conversationId    - Gửi tin nhắn (requires auth)
POST   /api/messages/conversations                    - Tạo hội thoại mới (public)
GET    /api/messages/unread-count                     - Số tin nhắn chưa đọc (requires auth)
```

## 📝 Request Examples

### Login

```bash
curl -X POST http://localhost:5000/api/auth/login \
  -H "Content-Type: application/json" \
  -d '{"username":"admin","password":"admin123"}'
```

### Create Post

```bash
curl -X POST http://localhost:5000/api/posts \
  -H "Content-Type: application/json" \
  -H "Authorization: Bearer YOUR_TOKEN" \
  -d '{
    "title": "My New Post",
    "content": "<p>Post content here</p>",
    "category": "Photo Editing",
    "status": "published"
  }'
```

### Get Orders

```bash
curl -X GET "http://localhost:5000/api/orders?status=processing" \
  -H "Authorization: Bearer YOUR_TOKEN"
```

## 🔄 Response Format

### Success Response

```json
{
  "message": "Success message",
  "data": { ... }
}
```

### Error Response

```json
{
  "message": "Error message"
}
```

## 🏗️ Project Structure

```
backend/
├── config/
│   └── database.js          # Database configuration
├── controllers/
│   ├── authController.js    # Authentication logic
│   ├── postController.js    # Posts logic
│   ├── orderController.js   # Orders logic
│   └── messageController.js # Messages logic
├── middleware/
│   └── auth.js             # JWT authentication
├── routes/
│   ├── authRoutes.js       # Auth routes
│   ├── postRoutes.js       # Post routes
│   ├── orderRoutes.js      # Order routes
│   └── messageRoutes.js    # Message routes
├── scripts/
│   └── initDatabase.js     # Database initialization
├── uploads/                # File uploads directory
├── .env                    # Environment variables
├── .gitignore
├── package.json
├── README.md
└── server.js               # Main server file
```

## 🧪 Testing API

Bạn có thể test API bằng:

- **Postman** - Import các endpoints vào Postman
- **cURL** - Dùng command line
- **Thunder Client** (VS Code Extension) - Test trực tiếp trong VS Code

## 🔒 Security Notes

⚠️ **IMPORTANT:** Trước khi deploy production:

1. Thay đổi `JWT_SECRET` trong file `.env`
2. Sử dụng HTTPS
3. Thêm rate limiting
4. Validate và sanitize tất cả input
5. Không commit file `.env` vào git

## 🐛 Troubleshooting

### Database Connection Error

- Kiểm tra MySQL service đang chạy
- Xác nhận username/password trong `.env`
- Đảm bảo database được tạo bằng `npm run init-db`

### Port Already in Use

- Đổi PORT trong `.env`
- Hoặc kill process đang dùng port 5000: `lsof -ti:5000 | xargs kill`

## 📚 Dependencies

- **express** - Web framework
- **mysql2** - MySQL client
- **cors** - CORS middleware
- **dotenv** - Environment variables
- **bcryptjs** - Password hashing
- **jsonwebtoken** - JWT authentication
- **multer** - File upload
- **express-validator** - Input validation

---

**Made with ❤️ for ZOOZOO**
