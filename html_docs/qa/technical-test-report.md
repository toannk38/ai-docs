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
| Amazon Quick (chương 11–15) | PASS | Làm lại theo spec 2026-11-19: 5 trang nhóm + 23 trang việc, 152 ảnh chụp trên POC ngày 19/11/2026 (28 MB, giữ chất lượng gốc). Chi tiết ở mục 4. |
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
- Mapped drive và UNC path thực tế của NAB (đường dẫn có dấu/khoảng trắng đã kiểm trên Chromium headless — mục 4).
- Keyboard-only, Narrator, zoom 200%, contrast audit chuyên dụng và print preview toàn bộ 23 chương.
- Walkthrough Microsoft 365 và Amazon Quick trên tenant/account NAB.
- License, role, Region, connector, retention, DLP, RLS/CLS, approval và schedule thực tế.
- Pilot người dùng và xác nhận của ATTT, Tuân thủ/Pháp chế, Brand/Truyền thông cùng người phê duyệt phát hành.

Các hạng mục này vẫn là release gate trong `qa/release-checklist.md` và không được suy diễn là đã đạt.

## 4. Kiểm tra phần Amazon Quick (19/11/2026)

| Hạng mục | Kết quả | Bằng chứng |
|---|---|---|
| Sinh website | PASS | `node html_docs/tools/build-site.js` → "Generated index.html and 46 chapter pages." |
| Checker phát hành | PASS | `uv run --no-project python html_docs/qa/check-release.py` → "PASS: static release checks completed" (ảnh mọi `figure` tồn tại, trang `*` có dòng "Tính năng này giới hạn user"). |
| 18 chương ngoài Quick không đổi | PASS | `npx tsx capture/compare-baseline.ts` → "OK: 18 chương không đổi". |
| Rò rỉ môi trường POC | PASS | `uv run --no-project python capture/check_env_leaks.py html_docs` quét gói phát hành: không có `nab-quick-poc`, Directory ID, host portal POC. Ảnh duyệt bằng mắt theo bảng "Duyệt ảnh" trong `analysis/release-notes-quick.md`. |
| Smoke test gói phát hành | PASS | `capture/tests/release-smoke.test.ts` (Playwright 1.64.1, Chromium headless): copy `index.html`, `chapters/`, `assets/`, `logo/` vào thư mục `Cẩm nang AI test/`; mở trang chủ, 11.2, 12.3, 13.5* qua `file://` ở 375/768/1440 px — 0 lỗi console, 0 request ngoài `file:`, mọi ảnh tải được, không tràn ngang; Ctrl+K "đăng nhập", "opba-ai", "chia sẻ", "agent", "flow" hiện đúng trang con. |
| Unit test | PASS | pytest 38/38 (`uv run --no-project --with pytest python -m pytest html_docs/qa/tests capture/tests/test_check_env_leaks.py -q`); node 17/17 (`node --test html_docs/tools/tests/*.test.js`); capture 28/28 (`npx tsx --test capture/tests/*.test.ts`). |
| Ảnh cũ POC | Đã gỡ | `html_docs/quick-docs/Images/` đã xoá (không còn tham chiếu; bản gốc vẫn có trong lịch sử git tại `quick-docs/Images/`). |

Chưa xác minh: Edge/Chrome do NAB quản lý trên Windows (cần kiểm tay), video hướng dẫn (đợt 2), trang Stories (POC chưa mở được), chia sẻ flow cho `toannk2_reader` ("No options").
