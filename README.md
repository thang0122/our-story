# OUR STORY – Boardgame prototype

Website prototype giới thiệu ý tưởng boardgame OUR STORY, gồm thư viện thẻ, bàn cờ, luật chơi, ý nghĩa từng chặng và chế độ mô phỏng một lượt chơi.

## Chạy thử trên máy

Không cần cài thư viện hoặc chạy backend.

1. Tải hoặc giải nén thư mục dự án.
2. Mở `index.html` bằng Chrome, Edge, Firefox hoặc Safari.
3. Chọn mục **Chơi thử** để mô phỏng một lượt.

Có thể dùng VS Code + extension Live Server để tự động tải lại trang khi sửa code, nhưng không bắt buộc.

## Đưa lên GitHub Pages

1. Tạo một repository GitHub mới.
2. Upload `index.html`, `styles.css`, `app.js` và `README.md` lên thư mục gốc của repository.
3. Mở **Settings → Pages**.
4. Ở phần **Build and deployment**, chọn **Deploy from a branch**.
5. Chọn branch `main`, folder `/ (root)`, sau đó bấm **Save**.
6. Đợi GitHub Pages triển khai và mở URL được hiển thị trong phần Pages.

Nếu repository dùng branch khác `main`, chọn đúng branch đang chứa các file website.

## Cấu trúc file

- `index.html`: cấu trúc các trang và nội dung tĩnh.
- `styles.css`: giao diện responsive cho máy tính và điện thoại.
- `app.js`: dữ liệu 44 lá thẻ, 20 ô bàn cờ, điều hướng, lọc thẻ và logic mô phỏng trò chơi.

## Chỉnh sửa nhanh

- Sửa nội dung thẻ: tìm mảng `CARDS` trong `app.js`.
- Sửa 20 ô bàn cờ: tìm mảng `BOARD` trong `app.js`.
- Sửa mô tả từng chặng, luật chơi hoặc phần giới thiệu: chỉnh trực tiếp trong `index.html`.
- Sửa màu sắc và bố cục: chỉnh các biến CSS ở đầu `styles.css`.

## Lưu ý về dữ liệu và mục đích

- Đây là prototype front-end, không có máy chủ và không gửi dữ liệu ra ngoài.
- Các lựa chọn trong chế độ chơi thử chỉ tồn tại trong bộ nhớ của tab trình duyệt; tải lại trang sẽ xóa lượt chơi.
- Nội dung mô tả các cơ hội hỗ trợ giao tiếp và tương tác, không tuyên bố hiệu quả điều trị. OUR STORY không phải công cụ chẩn đoán hoặc thay thế hỗ trợ chuyên môn.
- Bộ thẻ và luật chơi là bản đề xuất cần tiếp tục tham vấn, thử nghiệm và điều chỉnh với phụ huynh, người tự kỷ và chuyên gia phù hợp.
