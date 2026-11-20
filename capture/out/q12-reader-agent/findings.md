# Kiểm chứng phía người nhận — CHỈ chia sẻ agent (19/11/2026, POC)
- Người nhận thấy agent ở Chat agents khi chọn bộ lọc **Show: Shared with me** (mặc định "Recently used" chưa hiện). Cột Owner permission: **No**.
- Hỏi agent về nội dung luật trong Space: agent trả lời **không tìm thấy thông tin trong các văn bản được cung cấp** (ảnh step-04) → agent chỉ đọc được tài liệu mà chính người nhận có quyền.
- Người nhận **không thấy** Space "Văn bản pháp luật ngân hàng (demo)" trong Spaces.
- Kết luận: chia sẻ agent KHÔNG chia sẻ tài liệu trong Space gắn với agent; phải chia sẻ Space (hoặc người nhận đã có quyền Space) thì agent mới trả lời từ tài liệu đó.

# Sau khi chia sẻ thêm Space (Can view) cho người nhận
- Người nhận thấy Space trong Spaces → **Shared with me**, mở được, xem danh sách tài liệu (không có quyền thêm/xoá, chia sẻ tiếp).
- Hỏi lại agent cùng câu hỏi: agent trả lời **từ tài liệu trong Space**, có bảng trích Điều 6 và nút **Sources** (capture/out/q12-reader-space/step-05.png).
- Khi bấm Share, Quick báo "Access granted. 1 user(s) can now Can view this asset"; người nhận được thêm ngay vào danh sách Shared with.
