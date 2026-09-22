# Báo cáo kiểm thử kỹ thuật sơ bộ

> Ngày kiểm tra: 17/09/2026  
> Phạm vi: bản dự thảo 0.9 trong workspace  
> Báo cáo này không thay thế UAT tenant NAB, review ATTT/Tuân thủ/Brand hoặc quyết định GO/NO-GO.

## 1. Kết quả đã xác minh

| Hạng mục | Kết quả | Bằng chứng |
|---|---|---|
| Sinh website | PASS | `node tools/build-site.js` tạo `index.html` và 23 trang chương. |
| Cấu trúc và liên kết | PASS | `python3 qa/check-release.py`; đủ 23 slug chính xác, không có trang thừa, link/fragment/tài nguyên cục bộ hợp lệ. |
| Cấu trúc nội dung | PASS | Checker xác nhận metadata, một mục menu hiện tại, định mức walkthrough/FAQ, bảng và cảnh báo bắt buộc. |
| Ranh giới AI tham khảo | PASS | 6/6 chương 16–21 có nguyên văn cảnh báo chỉ dùng dữ liệu công khai; quét không còn cách diễn đạt làm yếu ranh giới này. |
| Amazon Quick | PASS | SHA-256 `tools/content-quick.js` là `47cc881119f368c49d7d54cfe5e237ac308e31a127898013a8aa4c4fe3633278`; không có diff so với commit khóa `7b9d54a`. |
| JavaScript | PASS | `node --check` đạt cho build script, toàn bộ module nội dung và `assets/js/site.js`. |
| Ràng buộc `file://` | PASS tĩnh | Không có CDN, tài nguyên tự tải từ Internet, `fetch`, XHR, ES module hoặc service worker. |
| Giao diện Firefox desktop | PASS trực quan | Ảnh chụp headless 1366×768 cho trang chủ và Chương 17; bố cục ba cột, nhóm menu hiện tại, nhãn và cảnh báo hiển thị rõ, không thấy tràn ngang. |
| Giao diện Firefox mobile | PASS trực quan có giới hạn | Ảnh chụp headless 390×844 cho Chương 20; header, nội dung, metadata và cảnh báo không chồng lấp hoặc tràn ngang. Bảng có wrapper cuộn ngang theo kiểm tra HTML/CSS tĩnh. |
| Sinh lại ổn định | PASS | SHA-256 tổng hợp 24 HTML trước/sau rebuild đều là `c456dd4d576aa2cb299bee90aafb222344fd19a8f30c1acba155df3645666cfe`. |
| Chính tả và tên cũ | PASS theo mẫu quét | Không còn slug cũ; không thấy `cihnsh`, `chính sác`, `Nam A bank`, `Chat GPT` hoặc `NoteBookLM`. |

## 2. Lệnh kiểm tra chính

```bash
node tools/build-site.js
node --check tools/build-site.js
node --check tools/content-general.js
node --check tools/content-ms365.js
node --check tools/content-quick.js
node --check tools/content-reference.js
node --check tools/content-glossary.js
node --check assets/js/site.js
python3 qa/check-release.py
```

Firefox 155.0.1 được chạy headless với các viewport:

- `1366×768`: `index.html`.
- `1366×768`: `chapter-17-ai-hoi-thoai-tro-ly-da-nang.html`.
- `390×844`: `chapter-20-ai-tao-hinh-anh-video.html`.

Firefox được cài qua Snap nên thư mục ảnh/profile tạm phải đặt trong workspace thay vì `/tmp`; đây là giới hạn môi trường kiểm thử, không phải thay đổi của website.

Kết quả cuối của checker:

```text
PASS: static release checks completed
- index.html and 23 files in chapters/ present
- internal links, fragments and local resources resolved
- required metadata, navigation, tables and data warnings present
- no external auto-loaded resources or forbidden file:// runtime APIs
```

## 3. Chưa được xác minh trong môi trường hiện tại

- Edge và Chrome do NAB quản lý trên Windows 10/11.
- Mapped drive, đường dẫn có dấu/khoảng trắng và UNC path thực tế của NAB.
- Keyboard-only, Narrator, zoom 200%, contrast audit chuyên dụng và print preview toàn bộ 23 chương.
- Walkthrough Microsoft 365 và Amazon Quick trên tenant/account NAB.
- License, role, Region, connector, retention, DLP, RLS/CLS, approval và schedule thực tế.
- Pilot người dùng và xác nhận của ATTT, Tuân thủ/Pháp chế, Brand/Truyền thông cùng người phê duyệt phát hành.

Các hạng mục này vẫn là release gate trong `qa/release-checklist.md` và không được suy diễn là đã đạt.
