# Brief — Làm lại phần Amazon Quick trong cẩm nang nội bộ NAB

## Mục đích
Nam A Bank (NAB) có website tĩnh "Cẩm nang nội bộ — Ứng dụng công nghệ và AI" (thư mục `html_docs/`), mở bằng `file://` từ shared folder nội bộ. Cần làm lại **phần Amazon Quick (chương 11–15)** thành hướng dẫn sử dụng từng tính năng, có **ảnh step-by-step (khoanh nút cần bấm)** và **video ngắn** cho mỗi thao tác chính. Người dùng NAB chủ yếu dùng Quick để **tra cứu**: trọng tâm là **chat, chat agent, Space, và cách chia sẻ (lưu ý khi chia sẻ agent, Space…)**.

## Người dùng
- Nhân viên đơn vị kinh doanh NAB, không chuyên kỹ thuật, đọc tiếng Việt.
- Hai loại user Quick tại NAB:
  - Mọi user: Space, Research, Chat agent, Flow (dùng và tạo).
  - Dashboard, Data: user Reader chỉ xem.
  - Các tính năng còn lại (Analyses/tạo dashboard, dataset, Scenarios, Stories, Apps, Automations…) chỉ một số user được cấp. **Vẫn có hướng dẫn chi tiết**, nhưng phải đánh dấu rõ (ví dụ dấu `*` ở tên trang/mục và một dòng nhỏ "Tính năng này giới hạn user").

## Goals
1. Bố cục phần Quick theo việc người dùng cần làm, mỗi thao tác chính có ảnh từng bước + video ngắn.
2. Chương đăng nhập trình bày 2 cách (AWS access portal; link Quick trực tiếp / nhập account name) với đầy đủ cảnh báo lỗi "nhập username vào ô Account name".
3. Giữ (viết lại/di chuyển, không làm mất) mọi nội dung đặc thù NAB hiện có: chính sách, quyền, điều kiện ATTT/Data Owner, trạng thái "Đang sử dụng tại NAB", quy tắc chia sẻ/export, nguyên tắc dừng.
4. Quy trình chụp/quay tự động lặp lại được khi giao diện Quick thay đổi.
5. Checker phát hành (`html_docs/qa/check-release.py`) được cập nhật cho cấu trúc mới và bảo vệ các ràng buộc dưới đây.

## Non-goals
- Không hướng dẫn phần quản trị Quick (Manage account, users, subscriptions, SPICE capacity, permissions…).
- Không hướng dẫn Connectors.
- Extensions (Quick trong Word/Outlook/Excel/PowerPoint) sẽ có hướng dẫn riêng trong phần Office sau — chỉ trỏ 1 dòng.
- Không sửa nội dung chương 01–10 và 16–23.

## Quyết định user đã chốt (là ràng buộc)
- Cấu trúc: **giữ 5 chương nhóm số 11–15 + trang con theo việc** (đánh số kiểu 11.1, 11.2…), không đổi số/tên file các chương khác. Đề cương đã duyệt: `analysis/de-cuong-phuong-an-b.md` (cần áp các điều chỉnh ở mục "Người dùng" + "Non-goals" phía trên: trang tính năng giới hạn giữ nhưng đánh dấu giới hạn user, thêm trang chia sẻ chat agent và trang lưu ý chia sẻ chung; Space/Agent/Flow/Research không còn là "cần SME" vì mọi user đều dùng được).
- Account name tài liệu (LIVE) là `opba-ai`; ảnh/video chụp trên môi trường POC (`nab-quick-poc`) phải được che/thay để chỉ hiện `opba-ai`; chuỗi `nab-quick-poc` và URL POC không được xuất hiện trong `html_docs/`.
- Link LIVE: portal `https://nab-opba-ai.awsapps.com/start`, dự phòng `https://ssoins-7223f5880341d54d.portal.us-east-1.app.aws`, link Quick `https://us-east-1.quicksight.aws.amazon.com/sn/account/opba-ai/start`.
- Yêu cầu chi tiết chương đăng nhập: xem `analysis/gap-report.md` §6.

## Trạng thái hiện tại (đọc trong repo)
- `html_docs/` = website. HTML **được sinh** bởi `html_docs/tools/build-site.js` từ `html_docs/tools/content-*.js` (Quick: `content-quick.js`). Build hiện tạo đúng 23 chương id 1–23, nhóm sidebar theo khoảng id, nav/TOC/pager/trang chủ sinh tĩnh vào từng trang.
- `html_docs/assets/js/site.js`: sidebar, Ctrl+K (chỉ lọc mục sidebar theo `data-search`), lightbox ảnh, FAQ.
- `html_docs/assets/css/style.css`: component `walkthrough`, `steps`, `verify-box`, `doc-figure`, `faq-item`, `callout`, `status-notice`, `page-toc`, `content-table`…
- `html_docs/qa/check-release.py`: luật hiện hành (23 file, `EXPECTED_SLUGS`, 2–3 walkthrough + 5–8 FAQ cho ch4–15, "Đang sử dụng tại NAB", "Mã nguồn kiểm soát:", Source ID khai trong `qa/source-register.md`, khoá hash `content-quick.js`, cấm `fetch`/XHR/service worker/`type="module"`/đường dẫn tuyệt đối…). Chạy hiện tại: PASS.
- `html_docs/assets/images/screenshots/README.md`: luật ảnh (dữ liệu giả, không lộ email/tài khoản/URL nội bộ/ID/token, cắt đúng vùng, có alt, ghi ngày chụp + phiên bản giao diện vào `qa/source-register.md`).
- Phân tích đã có: `analysis/current-quick-content.md` (kiểm kê nội dung cũ + nội dung đặc thù NAB §4), `analysis/gap-report.md`, `analysis/survey/` (40 ảnh giao diện POC + README), `analysis/de-cuong-phuong-an-b.md`.
- Hạ tầng chụp đã có (Playwright + TypeScript, thư mục `capture/`): che POC→LIVE (`capture/lib/env-mask.ts`), khung đỏ + số bước (`annotate.ts`), con trỏ giả (`cursor.ts`), flow khai báo dạng dữ liệu (`flow.ts`, `runner.ts`, `run.ts` → `capture/out/<flow>/step-XX.png`, `raw.webm`, `steps.json` có mốc thời gian), đăng nhập (`login.ts`), khảo sát (`survey.ts`), file mẫu giả (`capture/samples/`). Hai flow đăng nhập đã có ảnh + video.

## Ràng buộc
- Website chạy qua `file://` trên Chrome/Edge: không fetch/XHR/module/service worker/đường dẫn tuyệt đối; mọi tài nguyên cục bộ, tương đối.
- Mọi ảnh/video chỉ dữ liệu giả, không lộ thông tin nhận dạng; Python chạy qua `uv`; Docker dev không COPY mã nguồn (nếu dùng).
- Không đọc/in `.env`, `auth.json`.
- Tài khoản test POC là admin (thấy nhiều hơn user thường) — ảnh không được dùng màn hình admin.
- Dung lượng shared folder có giới hạn (video phải nhỏ).

## Yêu cầu bản thiết kế
Thiết kế cách thực hiện giai đoạn 2 (viết lại nội dung, sửa build/checker, dựng ảnh/video) theo đúng khung mục:
1. Tóm tắt hướng tiếp cận
2. Kiến trúc & thành phần
3. Dữ liệu/schema
4. API/giao diện
5. Xử lý lỗi & edge case
6. Test
7. Rủi ro & giả định chưa kiểm chứng
8. Phương án thay thế đã cân nhắc và vì sao loại


---
Hãy tự thiết kế giải pháp theo đúng khung mục trên. Chỉ đọc file trong repo, không tạo/sửa file nào. Không đọc .env, .env.*, auth.json. Đánh dấu [phỏng đoán] với điều bạn không chắc. Trả về toàn bộ bản thiết kế dạng markdown.
