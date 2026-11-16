# 🎁 Mở Hòm Nhân Phẩm 20/11 - Săn Thẻ Bài Mentor SSR (CodeGym Special Edition)

Dự án Web mini-game tương tác chủ đề **Ngày Nhà Giáo Việt Nam 20/11** thiết kế dành riêng cho học viên và cộng đồng coder CodeGym.

---

## 🌟 Điểm nổi bật & Tính năng hoàn thiện 100%

1. **Kho Thư Viện Hình Ảnh Thẻ Bài Đầy Đủ (`/images/`)**:
   - 📂 `images/cards/`: Chứa **19 file thẻ bài đồ họa SVG** độ nét cao với khung viền Cyberpunk, hiệu ứng phát sáng, chỉ số và danh hiệu riêng biệt.
   - 📂 `images/avatars/`: Chứa **19 file chân dung vector SVG** sắc nét cho từng Giảng viên, Vật phẩm và Bug.
   - 📦 `images/crate.svg`: Hòm báu công nghệ CodeGym Case #2011.
   - 🛡️ `images/logo.svg`: Huy hiệu biểu trưng CodeGym 20/11.

2. **Cơ chế Mở Hòm Roulette FPS (Chuẩn phong cách CS:GO / Case Opening)**:
   - Dải thẻ bài cuộn ngang 75 thẻ mượt mà với gia tốc thực tế (`cubic-bezier(0.12, 0.8, 0.15, 1)`).
   - Kim hồng tâm chỉ chính xác vào thẻ trúng thưởng.
   - **Âm thanh cơ khí sống động**: Tích hợp Web Audio API độc lập, phát tiếng kim "tách... tách... tách" chuẩn từng thẻ lướt qua kim mà không phụ thuộc file âm thanh ngoài.

3. **Hệ thống Phẩm Cấp & Vật Phẩm Đậm Chất Lập Trình**:
   - 🌟 **SSR (Huyền Thoại - Vàng Hoàng Kim)**: Dàn Giảng viên & Mentor trứ danh (Thầy Ba *Chúa Tể Thuật Toán*, Cô Thảo *Nữ Thần Refactor*, Thầy Tuấn *Debug Vô Song*, Thầy Nam *Hộ Pháp DevOps*, Cô Mai *Pixel Perfect*, Thầy Hoàng *Pháp Sư Backend*...).
   - 🔮 **SR (Thần Thánh - Tím)**: Kim bài miễn phạt nộp trễ, Trợ giảng thức 3h sáng fix bug, Cà phê xuyên màn đêm...
   - 📘 **R (Hiếm - Lam)**: Thần đèn Stack Overflow, Câu thần chú `console.log("DM SAO K CHAY")`, AI chém gió...
   - 🔴 **Ác Mộng (Cursed - Đỏ Lòm)**: Bug đỏ hoe 1000 dòng, Merge Conflict 500 files, Thiếu dấu chấm phẩy `;`, NullPointerException, Code chết đúng lúc demo...

4. **Chỉ số Hài Hước & Lời Chúc 20/11**:
   - Mỗi thẻ Mentor có các chỉ số cực hài: *Sát thương Review Code: 9999+*, *Tốc độ bắt lỗi: Vô cực*, *Aura né deadline: Bậc thầy*...
   - Lời chúc 20/11 ý nghĩa và tình cảm, gửi trọn lòng tri ân của học trò tới Thầy Cô.

5. **🖼️ Kho Thư Viện Thẻ (Gallery View)**:
   - Nút **"Kho Thư Viện Thẻ"** trên thanh điều hướng cho phép học viên duyệt toàn bộ 19 thẻ bài, lọc theo phẩm cấp (SSR, SR, R, Common) và tải trực tiếp file SVG gốc về máy.

6. **📸 1-Click "Chụp Khoe Ngay" (Xuất file ảnh PNG chất lượng cao)**:
   - Tự động xuất ảnh thẻ bài kèm Watermark sự kiện và tên học viên để thả ngay vào phần bình luận Facebook/Zalo/Discord.
   - Hỗ trợ cả `html2canvas` và bộ dựng Canvas 2D Native (hoạt động 100% offline).

7. **🛡️ Cơ Chế Bảo Hiểm Nhân Phẩm (Pity System)**:
   - Tích lũy điểm xui: Mở 15 lần không ra thẻ vàng sẽ kích hoạt bảo hiểm 100% ra Mentor SSR!
   - Nút bật nhanh *"Chế độ Thầy Cô Độ"* (Hack Luck 100% SSR) để trải nghiệm liền tay.

8. **➕ Tùy Biến Thêm Mentor Lớp Mình (Hỗ Trợ Tải Ảnh Thật Lên)**:
   - Học viên có thể tải trực tiếp ảnh chân dung của Thầy/Cô lớp mình từ máy tính lên (lưu qua Base64 Data URL vào `localStorage`).

---

## 🚀 Hướng dẫn khởi chạy

Chỉ cần mở trực tiếp file `index.html` bằng bất kỳ trình duyệt nào:
- **Cách 1**: Nhấp đúp chuột vào file `index.html` trong thư mục `codegym11` để mở bằng Chrome / Edge / Firefox.
- **Cách 2**: Dùng extension **Live Server** trong VS Code (Chuột phải vào `index.html` chọn *Open with Live Server*).

---

## 📁 Cấu trúc thư mục hoàn thiện

```
codegym11/
├── images/
│   ├── cards/             # 19 file ảnh thẻ bài hoàn chỉnh (SVG vector)
│   ├── avatars/           # 19 file ảnh chân dung/icon (SVG vector)
│   ├── crate.svg          # Ảnh hòm báu công nghệ CodeGym 20/11
│   └── logo.svg           # Logo huy hiệu CodeGym 20/11
├── index.html             # Giao diện chính, bàn xoay roulette, khung thẻ bài, các modal
├── style.css              # Hiệu ứng Cyberpunk, kim hồng tâm, 3D hologram tilt, viền vàng SSR
├── data.js                # Dữ liệu thẻ bài, chỉ số, lời chúc 20/11 & repository localStorage
├── audio.js               # Bộ tổng hợp âm thanh Web Audio API (không sợ chết link mp3)
├── app.js                 # Logic quay số, tính toán offset, tick âm thanh, xuất ảnh canvas, gallery
├── generate_assets.py     # Script Python sinh tự động 100% asset hình ảnh đồ họa
└── README.md              # Tài liệu hướng dẫn
```
