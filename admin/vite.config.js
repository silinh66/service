import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// https://vite.dev/config/
export default defineConfig({
  plugins: [react()],
  server: {
    // Cho phép truy cập từ các domain này
    allowedHosts: [
      'admin.zoozoostudio.com',
      'service.zoozoostudio.com', // Thêm luôn cho nhánh frontend kia để đỡ lỗi sau này
      'zoozoostudio.com'
    ],

    // (Tùy chọn) Nếu vẫn lỗi, hãy thêm dòng này để lắng nghe mọi IP
    host: true,
    port: 5174, // Đảm bảo đúng port của project
  },
})
