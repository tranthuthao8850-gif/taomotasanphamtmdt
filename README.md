# E-commerce Product Description Generator

Ứng dụng giúp người bán hàng online tự động tạo mô tả sản phẩm hấp dẫn, đầy đủ và chuẩn SEO sử dụng AI (Google Gemini).

## Tính năng
- Nhập thông tin sản phẩm (Tên, Tính năng, Lợi ích, Từ khóa SEO).
- Tự động tạo mô tả sản phẩm bằng AI.
- Hiển thị kết quả trực quan, hỗ trợ sao chép nhanh.
- Xem dưới dạng văn bản (Markdown) hoặc mã HTML.
- Giao diện đẹp mắt, responsive, thân thiện với người dùng.

## Yêu cầu hệ thống
- Node.js (phiên bản 18 trở lên)
- npm hoặc yarn

## Cài đặt và Chạy cục bộ (Local)

1. Clone repository:
   ```bash
   git clone <your-repo-url>
   cd <your-repo-folder>
   ```

2. Cài đặt dependencies:
   ```bash
   npm install
   ```

3. Cấu hình biến môi trường:
   Tạo file `.env` ở thư mục gốc và thêm API Key của Google Gemini:
   ```env
   VITE_GEMINI_API_KEY=your_api_key_here
   ```
   *(Lưu ý: Trong môi trường AI Studio, biến `GEMINI_API_KEY` đã được tự động cấu hình)*

4. Chạy ứng dụng:
   ```bash
   npm run dev
   ```
   Truy cập `http://localhost:3000` trên trình duyệt.

## Triển khai trên Vercel
1. Đẩy mã nguồn lên GitHub.
2. Đăng nhập vào [Vercel](https://vercel.com/).
3. Chọn "Add New..." -> "Project".
4. Import repository từ GitHub.
5. Trong phần "Environment Variables", thêm biến `VITE_GEMINI_API_KEY` với giá trị là API Key của bạn.
6. Nhấn "Deploy".

## Đóng gói và chạy với Docker

Dự án đã bao gồm sẵn `Dockerfile` để đóng gói ứng dụng bằng Nginx.

1. Build Docker Image:
   ```bash
   docker build -t ecommerce-desc-generator .
   ```

2. Chạy Docker Container:
   ```bash
   docker run -d -p 8080:80 ecommerce-desc-generator
   ```

3. Truy cập ứng dụng tại: `http://localhost:8080`
