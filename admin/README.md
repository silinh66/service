# 🎨 ZOOZOO CMS Admin

CMS Admin hiện đại cho trang ZOOZOO được xây dựng bằng **React**, **Material-UI** và **Vite**.

## ✨ Tính năng

### 📊 Dashboard

- Thống kê tổng quan (bài viết, đơn hàng, tin nhắn, lượt truy cập)
- Biểu đồ trực quan về đơn hàng và doanh thu
- Danh sách đơn hàng gần đây
- Giao diện đẹp mắt với gradient cards

### 📝 Quản lý bài viết

- **Tạo bài viết mới** với Rich Text Editor (React Quill)
- **Chỉnh sửa bài viết** có sẵn
- Upload ảnh đại diện
- Phân loại theo danh mục (Photo Editing, Video Editing, Virtual Staging, etc.)
- Lưu nháp hoặc xuất bản ngay
- Tìm kiếm và lọc bài viết
- Formatting đa dạng: bold, italic, lists, colors, alignment, images, videos, etc.

### 📦 Quản lý đơn hàng

- Xem danh sách đơn hàng với nhiều trạng thái
- Filter theo trạng thái (Chờ xử lý, Đang xử lý, Hoàn thành, Đã hủy)
- Chi tiết đơn hàng đầy đủ
- Cập nhật trạng thái đơn hàng
- Xem thông tin khách hàng
- Quản lý file đính kèm
- Timeline theo dõi lịch sử thay đổi
- Tabs để filter nhanh

### 💬 Hệ thống tin nhắn

- Chat real-time với khách hàng
- Hiển thị trạng thái online/offline
- Badge thông báo tin nhắn chưa đọc
- Tìm kiếm cuộc hội thoại
- Gửi file đính kèm
- Giao diện chat hiện đại

## 🚀 Cài đặt

```bash
# Di chuyển vào thư mục admin
cd admin

# Cài đặt dependencies
npm install --legacy-peer-deps

# Chạy development server
npm run dev
```

Server sẽ chạy tại: **http://localhost:5173/**

## 🔐 Đăng nhập

Thông tin đăng nhập demo:

- **Username:** `admin`
- **Password:** `admin123`

## 📦 Dependencies

- **React 19.2.0** - UI Framework
- **React Router DOM** - Routing
- **Material-UI (MUI)** - Component Library
- **React Quill** - Rich Text Editor
- **Recharts** - Biểu đồ
- **Axios** - HTTP Client
- **Emotion** - Styled Components
- **Date-fns** - Date utilities

## 🏗️ Cấu trúc thư mục

```
admin/
├── src/
│   ├── components/         # Reusable components
│   ├── layouts/           # Layout components
│   │   └── AdminLayout.jsx
│   ├── pages/             # Page components
│   │   ├── Dashboard.jsx
│   │   ├── Login.jsx
│   │   ├── Posts.jsx
│   │   ├── CreatePost.jsx
│   │   ├── EditPost.jsx
│   │   ├── Orders.jsx
│   │   ├── OrderDetail.jsx
│   │   └── Messages.jsx
│   ├── services/          # API services
│   ├── utils/            # Utility functions
│   ├── App.jsx           # Main App component
│   └── main.jsx          # Entry point
├── public/               # Static assets
├── package.json
└── vite.config.js
```

## 🎨 Giao diện

### Màu sắc chủ đạo

- **Primary:** #1976d2 (Blue)
- **Secondary:** #9c27b0 (Purple)
- **Success:** #2e7d32 (Green)
- **Warning:** #ed6c02 (Orange)
- **Error:** #d32f2f (Red)

### Đặc điểm

- Responsive design (mobile, tablet, desktop)
- Dark/Light mode ready
- Gradient effects
- Smooth transitions
- Modern card design với border radius và shadows

## 📱 Responsive

Giao diện tự động điều chỉnh cho:

- 📱 Mobile (< 600px)
- 📱 Tablet (600px - 960px)
- 💻 Desktop (> 960px)

## 🔧 Build cho production

```bash
npm run build
```

Build output sẽ nằm trong thư mục `dist/`

## 🔄 Tích hợp API

Hiện tại CMS sử dụng mock data. Để tích hợp API thực:

1. Tạo service trong `src/services/`
2. Sử dụng Axios để call API
3. Cập nhật các components để fetch data từ API

Ví dụ:

```javascript
// src/services/postService.js
import axios from "axios";

const API_URL = "https://api.ZOOZOO.com";

export const getPosts = async () => {
  const response = await axios.get(`${API_URL}/posts`);
  return response.data;
};

export const createPost = async (postData) => {
  const response = await axios.post(`${API_URL}/posts`, postData);
  return response.data;
};
```

## 🎯 Roadmap

- [ ] Tích hợp API backend
- [ ] Upload ảnh lên cloud storage
- [ ] Notification system
- [ ] User management
- [ ] Analytics chi tiết hơn
- [ ] Export reports
- [ ] Multi-language support
- [ ] Dark mode toggle

## 📝 Notes

- React Quill có thể có warning với React 19, nhưng vẫn hoạt động tốt
- Sử dụng `--legacy-peer-deps` khi install để tránh conflict
- Authentication hiện tại dùng localStorage (nên thay bằng JWT trong production)

---

**Made with ❤️ for ZOOZOO**

## React Compiler

The React Compiler is not enabled on this template because of its impact on dev & build performances. To add it, see [this documentation](https://react.dev/learn/react-compiler/installation).

## Expanding the ESLint configuration

If you are developing a production application, we recommend using TypeScript with type-aware lint rules enabled. Check out the [TS template](https://github.com/vitejs/vite/tree/main/packages/create-vite/template-react-ts) for information on how to integrate TypeScript and [`typescript-eslint`](https://typescript-eslint.io) in your project.
