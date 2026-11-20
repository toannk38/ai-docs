Chế độ: Claude + agy · model agy: gemini-4-argon-high (Argon high, không phải dùng Hydrogen) · 345 giây

# Tổng hợp bản A (Claude) và bản B (agy)

| Mục | Claude (A) | agy (B) | Chốt | Lý do / bằng chứng |
|---|---|---|---|---|
| Cấu trúc trang | 5 nhóm + trang con; ghi "23 trang con" | 5 nhóm + **24** trang con, 47 file `chapters/` | **24 trang con, 29 trang Quick, 47 file** | Đếm lại: 11.x=5, 12.x=7, 13.x=6, 14.x=2, 15.x=4 → 24. Bản A đếm sai |
| Schema nội dung | Schema trang việc mới (`steps`, `video`, `errors`, `compare`…) | Mở rộng schema cũ, tương thích `renderChapter()` (walkthrough `steps` nhận object có ảnh, `troubleshooting`, `topCallout`) | **B — mở rộng schema cũ** | Ít đụng build hơn; chương khác dùng nguyên renderer cũ |
| Trường đánh dấu | `restricted` | `limitedUser` + `limitedUserNote` | B (tên rõ hơn), dòng chữ cố định "\* Tính năng này giới hạn user — …" | — |
| `normalizeCopy` | Không đề cập | **Tắt cho trang Quick (`skipNormalize`)** | **Nhận từ B** | `build-site.js`: `chapter.id === 23 ? chapter : normalizeChapterCopy(chapter)` → áp cho Quick; kiểm kê cũ ghi lỗi "All dữ liệu", "New phân tích"… |
| Ctrl+K với trang con | "site.js không đổi" | Sửa `filterNavigation()` để giữ hiện cha khi con khớp | **Nhận từ B** | `site.js`: `link.closest("li").hidden = !matches` — `li` cha bị ẩn sẽ ẩn luôn `ol` con. Bản A sai |
| Ẩn mục admin khi chụp | Chỉ "không vào trang admin" | `mask.js` ẩn phần tử "Manage account"… trước khi chụp | **Nhận từ B** | Ảnh `account-menu.png` có dòng Manage account; người dùng thường không thấy |
| Trang không video | Mọi trang việc 1 video | 11.3 và 12.7 miễn video (khai báo tường minh trong checker) | **Nhận từ B** | 11.3 là bản đồ giao diện, 12.7 là trang quy tắc |
| Video | 1080p CRF 28, phụ đề burn-in, ≤ 8 MB/file | 720p (hoặc 1080p) CRF 28–30, `-an`, ≤ 8 MB/file, ngân sách ≤ 120 MB tổng | **Cần user quyết** (độ nét vs dung lượng) | Đề xuất: quay 1080p, xuất 1280×720 nếu chữ còn đọc rõ (thử ở trang 11.2 rồi chốt) |
| Phụ đề | Burn-in, không `<track>` | Burn-in, không `<track>` | Trùng | Ràng buộc `file://` |
| Chống lộ POC trong checker | Mẫu tĩnh (`nab-quick-poc`, `d-…`, host awsapps ≠ LIVE, `/sn/account/<x≠opba-ai>/`, "Manage account") | Gộp `check_env_leaks.py`, đọc host POC từ `.env` | **A — mẫu tĩnh** | Checker phát hành không có/không được đọc `.env` |
| Bảo đảm chương khác không đổi | Khoá hash `content-general/ms365/reference/glossary.js` + diff | Diff `<main>` 18 chương trước/sau | **Cả hai** | Hash chặn sửa nhầm nguồn; diff chặn sửa nhầm renderer |
| Bảng phân bổ nội dung NAB | Hứa có trong spec | Có bảng chi tiết §3.3 | **Dùng bảng B**, bỏ các con số giới hạn chưa kiểm chứng | B ghi "20 files/chat, 50 MB/file, Viewer/Contributor/Owner, Recents 30 ngày" lấy từ nội dung cũ — chưa thấy trên UI → để `[kiểm chứng trên UI khi chụp]` |
| Chia sẻ (12.3, 12.6, 15.2) | Cần người nhận thật; nếu chưa có user test thứ 2 → chụp tới bước điền rồi Huỷ | Không xử lý | **A**, **cần user quyết** có cấp user/nhóm test thứ 2 | Chia sẻ thật cần người nhận có trong thư mục |
| Dữ liệu demo tạo ra | `created.json` + dọn đúng ID | Không đề cập | **A** | Ràng buộc "không xoá/sửa gì ngoài thứ script tạo" |
| Research | Quay tới lúc chạy, tua nhanh | 14.1 quay tới lúc bắt đầu chạy; 14.2 dùng báo cáo đã hoàn tất sẵn có | **B** | Tránh quay 5–10 phút; chỉ đọc báo cáo có sẵn |
| Ảnh MFA | Không đề cập | Dùng ảnh khảo sát cũ | **Sửa:** chụp bằng đường `/sn/account/…` (thư mục Identity Center vẫn bật MFA), dừng ở màn hình MFA, không gửi mã | Ảnh chẩn đoán cũ đã xoá theo yêu cầu dọn dữ liệu |
| Đăng nhập lại khi qua portal | Hỏi SME | Video chỉ hiện 1 lần đăng nhập + FAQ "nếu bị hỏi lại" | **B**, kèm câu hỏi SME | Không ảnh hưởng cấu trúc |
| Trang chủ | Thẻ Quick + thẻ "Đăng nhập (opba-ai)" | 5 thẻ nhóm, mỗi thẻ liệt kê link trang con + nút đăng nhập | **B** | Tìm được qua bộ lọc trang chủ |
| Tests | Checker + pytest fixture + build lặp + thủ công | Checker + Playwright mở `file://` (0 lỗi console, video `readyState ≥ 1`) | **Cả hai** | Bổ sung nhau |
| Phương án loại | A, C, tăng số chương, chụp tay, GIF, host ngoài, VTT, HTML tay | A, C, VTT, WebM thô | Trùng ý | — |

## Ý tưởng mới đáng giá từ agy
- Tắt `normalizeCopy` cho trang Quick và viết tiếng Việt chuẩn ngay từ nguồn.
- Sửa Ctrl+K để không ẩn mất trang con.
- Tự ẩn dòng "Manage account" trước khi chụp.
- Trang miễn video khai báo tường minh; ngân sách tổng dung lượng video trong checker.
- 14.2 dùng báo cáo Research đã hoàn tất.

## Giả định sai đã bắt được
- Bản A: đếm 23 trang con (đúng là 24); "site.js không cần đổi" (sai — bộ lọc ẩn cả cây con).
- Bản B: checker đọc `.env` (không dùng được khi phát hành); dùng ảnh MFA từ khảo sát (ảnh đó không còn); giới hạn file/vai trò chia sẻ lấy từ nội dung cũ chưa kiểm chứng.

## Quyết định của user (19/11/2026)
- **Làm tài liệu ảnh trước, gắn video sau.** Video là trường tuỳ chọn của trang việc: không có video → không render khối video; checker không bắt buộc video, nhưng nếu khai báo thì file `.mp4` + poster phải tồn tại và trong giới hạn dung lượng. Đợt 1: nội dung + ảnh + build/checker (phát hành được). Đợt 2: dựng và gắn video dần từng trang (chạy lại flow nếu UI đã đổi để ảnh/video khớp nhau). Thay thế luật "trang việc phải có đúng 1 video" ở bảng trên.
- Tài liệu mẫu upload: văn bản luật công khai trong `demo_docs/tài chính ngân hàng/` + file giả `capture/samples/`.

- **Chia sẻ (12.3, 12.6, 15.2…) gửi tới user `toannk2_reader`**; hiển thị tên user này trên ảnh/video được phép. Bộ che phải khớp username theo ranh giới từ để không che nhầm `toannk2_reader`.

## Cần user quyết (đã trả lời hết)
1. Chia sẻ Space/agent/flow: có cấp **một user hoặc nhóm test thứ hai** trên POC để quay trọn bước chia sẻ không? (nếu không: quay tới bước chọn người nhận rồi Huỷ)
2. Video: ưu tiên **độ nét (1080p, ~3–6 MB/video)** hay **dung lượng nhỏ (720p, ~1.5–3.5 MB/video)**?
3. Thư mục `demo_docs/tài chính ngân hàng/`: dùng làm tài liệu mẫu upload thay/bổ sung cho `capture/samples/`?
