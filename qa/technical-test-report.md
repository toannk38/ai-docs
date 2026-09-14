# Báo cáo kiểm thử kỹ thuật sơ bộ

> Ngày kiểm tra: 19/08/2026  
> Phạm vi: bản dự thảo 0.9 trong workspace  
> Báo cáo này không thay thế UAT tenant NAB, review ATTT/Tuân thủ/Brand hoặc quyết định GO/NO-GO.

## 1. Kết quả đã xác minh

| Hạng mục | Kết quả | Bằng chứng |
|---|---|---|
| Cấu trúc website | PASS | Có `index.html` ở thư mục gốc và 23 file chương trong `chapters/`, tổng 24 HTML. |
| Liên kết nội bộ và fragment | PASS | `python3 qa/check-release.py`; 0 broken internal link, missing asset hoặc missing fragment. |
| Ràng buộc `file://` | PASS tĩnh | Không có CDN, tài nguyên tự tải từ Internet, `fetch`, XHR, ES module hoặc service worker. |
| JavaScript không bắt buộc | PASS tĩnh | Nội dung, sidebar và link chương được render sẵn trong HTML; JavaScript chỉ progressive enhancement. |
| Trạng thái công cụ | PASS | Chương 04–15 có “Đang sử dụng tại NAB”; chương 16–21 có disclaimer bắt buộc. |
| Metadata/accessibility cấu trúc | PASS | 24/24 trang có `lang="vi"`, title, một H1, main landmark, skip link và alt cho ảnh. |
| Heading outline | PASS tĩnh | Heading đầu tiên là H1, không nhảy cấp; nhãn nhóm trong sidebar dùng phần tử văn bản thay vì tạo H2 đứng trước H1. |
| Định mức nội dung | PASS tĩnh | Chương 04–15 có 2–3 walkthrough và 5–8 FAQ; chương 16–21 có 1 walkthrough và 3–5 FAQ. |
| Source ID theo chương | PASS tĩnh | 23/23 chương hiển thị Source ID kiểm soát và mọi ID đều tồn tại trong `source-register.md`. |
| Mở trực tiếp trên Firefox | PASS | Screenshot headless tại 1366×768 và 1920×1080 cho index; 1366×768 cho Excel và Quick Sight. |
| Đường dẫn có khoảng trắng | PASS | Sao chép package sang thư mục `NAB QA.*`, chạy lại checker và mở `index.html` bằng `file://`. |
| Sinh lại website | PASS | Chạy `node tools/build-site.js` không làm đổi tổng hợp SHA-256 của 24 HTML: `05a74f8e5defe25c3a35fb6ca3cc5e0c9c7f31e71bd6562358709e749fbd4fac`. |
| Nguồn web | PASS có ngoại lệ truy cập tự động | 70 URL được rà; 67 trả 2xx, 3 URL Canva/Perplexity trả 403 cho client tự động; không còn URL trả 404. |
| Thông báo PDF | PASS kỹ thuật | PDF 5 trang A4; tiếng Việt và bố cục trang đầu/trang cuối đã được kiểm tra bằng ảnh render. |
| Thông báo DOCX | PASS kỹ thuật | DOCX mở lại để tạo PDF; logo được nhúng trong `word/media`, không còn quan hệ `file:///` hoặc `TargetMode="External"`. |

## 2. Lệnh kiểm tra chính

```bash
node tools/build-site.js
python3 qa/check-release.py
bash -n tools/build-notice.sh
node --check assets/js/site.js
node --check tools/build-site.js
bash tools/build-notice.sh
pdfinfo documents/thong-bao-noi-bo.pdf
```

Kết quả cuối của checker:

```text
PASS: static release checks completed
- index.html and 23 files in chapters/ present
- internal links, fragments and local resources resolved
- required metadata, navigation and disclaimers present
- no external auto-loaded resources or forbidden file:// runtime APIs
```

Regression sau khi đồng bộ Source ID và heading outline tiếp tục trả `PASS`. Việc chạy lại browser đích vẫn thuộc gate thủ công; kết quả static không thay thế Edge/Chrome trên Windows, zoom, keyboard-only hoặc UNC.

## 3. Chưa được xác minh trong môi trường hiện tại

- Edge và Chrome do NAB quản lý trên Windows 10/11.
- Mapped drive và UNC path thực tế của NAB.
- Keyboard-only, Narrator, zoom 200% và contrast audit bằng công cụ accessibility chuyên dụng.
- Print preview của toàn bộ 23 chương trên browser đích.
- Walkthrough Microsoft 365 và Amazon Quick trên tenant/account NAB.
- License, role, Region, connector, retention, DLP, RLS/CLS, approval, schedule và Apps thực tế.
- Pilot 5–8 người thuộc tối thiểu hai nhóm ĐVKD.
- Xác nhận của ATTT, Tuân thủ/Pháp chế, Brand/Truyền thông và người phê duyệt phát hành.

Các hạng mục này vẫn là release gate trong `qa/release-checklist.md` và không được suy diễn là đã đạt.
