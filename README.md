NHÓM 5 CUTE NHẤT QUẢ ĐẤT
# 🚀 E-com DescGen AI - Trợ lý AI Viết Mô Tả Sản Phẩm Chuẩn SEO

![React](https://img.shields.io/badge/react-%2320232a.svg?style=for-the-badge&logo=react&logoColor=%2361DAFB)
![Vite](https://img.shields.io/badge/vite-%23646CFF.svg?style=for-the-badge&logo=vite&logoColor=white)
![TailwindCSS](https://img.shields.io/badge/tailwindcss-%2338B2AC.svg?style=for-the-badge&logo=tailwind-css&logoColor=white)
![Docker](https://img.shields.io/badge/docker-%230db7ed.svg?style=for-the-badge&logo=docker&logoColor=white)

Ứng dụng web thông minh giúp các nhà bán hàng tự động tạo bài viết mô tả sản phẩm thương mại điện tử chuẩn SEO, hấp dẫn và chuyên nghiệp chỉ trong vài giây nhờ sức mạnh của **Google Gemini AI**.

> **Lưu ý dành cho Giảng viên / Người chấm điểm:** 
> Đây là đồ án môn học [CÔNG NGHỆ WEB. 
> Nhóm sinh viên thực hiện: [NHÓM 5] 

---

## ✨ Chức năng chính
- 📝 **Tự động tạo nội dung:** Nhập tên sản phẩm, tính năng và từ khóa, AI sẽ tự động viết bài mô tả hoàn chỉnh.
- 🔍 **Tối ưu SEO:** Nội dung được thiết kế thân thiện với công cụ tìm kiếm, giúp tăng tỷ lệ chuyển đổi.
- 🎨 **Giao diện hiện đại:** Thiết kế tối giản, dễ sử dụng với Tailwind CSS.
---

## 🛠 Công nghệ sử dụng
- **Frontend:** React.js, Vite, Tailwind CSS, Lucide React.
- **AI Integration:** Google Gemini API (`@google/genai`).
- **Deployment & DevOps:** Docker, Vercel.

---

## ⚙️ Yêu cầu hệ thống (Prerequisites)
Trước khi cài đặt, hãy đảm bảo máy tính của bạn đã có:
1. [Node.js](https://nodejs.org/) (Phiên bản 18 trở lên).
2. [Docker Desktop](https://www.docker.com/products/docker-desktop/) (Nếu bạn muốn chạy bằng Docker).
3. **Gemini API Key:** Lấy miễn phí tại [Google AI Studio](https://aistudio.google.com/app/apikey).

---
- LINK VERCEL ỨNG DỤNG THAM KHẢO CỦA THÀNH VIÊN NHÓM:
- TRẦN THU THẢO: https://taomotasanphamtmdt.vercel.app/
- ĐOÀN THỊ NGỌC ANH: https://e-com-describer.vercel.app/
- TRẦN THANH HUYỀN: https://mo-ta-san-pham-ai.vercel.app/
- HOÀNG ĐỨC TUỆ: https://taomotasp.vercel.app/
- PHAN HỮU AN: https://ecommerce-description-an.vercel.app/
- NGUYỄN THANH HUYỀN: https://ai-product-description-generator-bb.vercel.app/
## 🚀 Hướng dẫn cài đặt và chạy trên máy cá nhân (Local Machine)

Bất kỳ ai tải mã nguồn này về đều có thể chạy ứng dụng theo 1 trong 2 cách dưới đây:

### Cách 1: Chạy bằng Node.js (Khuyên dùng cho Developer)
Đây là cách nhanh nhất để chạy và chỉnh sửa code.

**Bước 1:** Clone repository về máy:
```bash
git clone https://github.com/TEN_GITHUB_CUA_BAN/TEN_REPO_CUA_BAN.git
cd TEN_REPO_CUA_BAN
```

**Bước 2:** Cài đặt các thư viện cần thiết:
```bash
npm install
```

**Bước 3:** Cấu hình API Key:
- Tạo một file có tên là `.env` ở thư mục gốc của dự án.
- Mở file `.env` và thêm dòng sau (thay thế bằng Key thật của bạn):
```env
VITE_GEMINI_API_KEY=AIzaSyB_Day_La_Key_Cua_Ban
```

**Bước 4:** Khởi động ứng dụng:
```bash
npm run dev
```
👉 Mở trình duyệt và truy cập: `http://localhost:3000` (hoặc cổng được hiển thị trên Terminal).

---

### Cách 2: Chạy bằng Docker (Dành cho triển khai nhanh)
Nếu máy bạn đã cài Docker, bạn có thể chạy ứng dụng mà không cần cài đặt Node.js.

**Bước 1:** Đảm bảo bạn đã tạo file `.env` chứa `VITE_GEMINI_API_KEY` như hướng dẫn ở trên.

**Bước 2:** Build Docker Image:
```bash
docker build -t ecommerce-desc-generator .
```

**Bước 3:** Chạy Docker Container:
```bash
docker run -d -p 8080:80 ecommerce-desc-generator
```
👉 Mở trình duyệt và truy cập: `http://localhost:8080`

---

## ☁️ Hướng dẫn triển khai lên Vercel (Deploy to Vercel)

Bạn có thể đưa trang web này lên mạng internet miễn phí thông qua Vercel để gửi link cho thầy cô và bạn bè xem.

1. Đăng nhập vào [Vercel](https://vercel.com/) bằng tài khoản GitHub của bạn.
2. Bấm vào **Add New...** -> **Project**.
3. Chọn Repository chứa mã nguồn này từ GitHub của bạn và bấm **Import**.
4. Trong phần **Configure Project**:
   - **Framework Preset:** Vercel sẽ tự động nhận diện là `Vite`.
   - Mở rộng phần **Environment Variables**, thêm biến môi trường sau:
     - Name: `VITE_GEMINI_API_KEY`
     - Value: `[Dán API Key của bạn vào đây]`
     - Bấm **Add**.
5. Bấm **Deploy** và đợi khoảng 1-2 phút.
6. 🎉 Hoàn tất! Vercel sẽ cấp cho bạn một đường link public để truy cập trang web từ bất kỳ đâu.

---

## 🤝 Đóng góp (Contributing)
Nếu bạn thấy dự án này hữu ích, hãy cho mình xin 1 ⭐️ trên GitHub nhé! Mọi đóng góp (Pull Request) để cải thiện dự án đều được chào đón.

## 📄 Giấy phép (License)
Dự án này được phân phối dưới giấy phép MIT. Xem file `LICENSE` để biết thêm chi tiết.
