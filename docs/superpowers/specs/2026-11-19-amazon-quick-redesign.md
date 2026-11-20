# Spec — Làm lại phần Amazon Quick trong cẩm nang nội bộ NAB

- Ngày: 19/11/2026 · Trạng thái: **chờ duyệt** · Phạm vi: giai đoạn 2 (viết lại nội dung, sửa build/checker, dựng ảnh rồi video)
- Website: `html_docs/` (sinh bởi `html_docs/tools/build-site.js` từ `html_docs/tools/content-*.js`, mở qua `file://`)
- Tài liệu nền: `analysis/gap-report.md`, `analysis/current-quick-content.md`, `analysis/survey/README.md`, `analysis/de-cuong-phuong-an-b.md`, `docs/superpowers/specs/drafts/2026-11-19-amazon-quick-redesign/` (brief, 2 bản thiết kế, synthesis, video-plan)

---

## 1. Mục đích và lý do

Phần Amazon Quick hiện tại (chương 11–15) là khung chung, tên file lệch nội dung, nhãn giao diện bị dịch sai, 9/19 ảnh lệch chú thích và ảnh lộ thông tin môi trường POC. Người dùng NAB dùng Quick chủ yếu để **tra cứu**, nên cần hướng dẫn theo việc, có **ảnh từng bước khoanh nút cần bấm** và (sau đó) **video ngắn**, tập trung vào **chat, chat agent, Space và cách chia sẻ an toàn**.

## 2. Goals / Non-goals / Anti-goals

**Goals**
1. Phần Quick tổ chức theo việc: 5 trang nhóm (11–15) + 24 trang việc (11.1…15.4), mỗi trang việc có các bước kèm ảnh khoanh đỏ.
2. Chương đăng nhập đủ 2 cách và xử lý triệt để lỗi "nhập username/email vào ô Account name" (§7).
3. Giữ (viết lại/di chuyển) mọi nội dung đặc thù NAB (§8).
4. Ảnh/video sinh bằng pipeline tự động trong `capture/`, chạy lại được khi giao diện đổi.
5. Checker cập nhật cho cấu trúc mới và chặn lộ POC/admin.
6. Video gắn sau, từng trang một, không làm hỏng trang đã phát hành.

**Non-goals**
- Phần quản trị (Manage account, users, subscriptions, SPICE capacity, permissions, security).
- Connectors.
- Extensions (Quick trong Word/Outlook/Excel/PowerPoint): chỉ 1 dòng trỏ tới hướng dẫn Office (viết sau).
- Thay đổi nội dung chương 01–10 và 16–23.

**Anti-goals** (thành công về kỹ thuật nhưng vẫn là thất bại)
- Bất kỳ chuỗi `nab-quick-poc`, URL/host POC, directory ID, AWS account ID, màn hình admin xuất hiện trong `html_docs/` (chữ, ảnh hoặc video).
- Đổi số/tên file các chương khác (làm hỏng link/bookmark trên shared folder).
- Trang Quick mất một quy định/kiểm soát NAB có trong bản cũ.
- Nhãn giao diện trong tài liệu khác chữ trên màn hình Quick (người dùng không tìm thấy nút).
- Trang phụ thuộc video mới dùng được.

## 3. Ràng buộc

- Chạy qua `file://` trên Chrome/Edge: không `fetch`/XHR/service worker/`type="module"`/đường dẫn tuyệt đối/tài nguyên ngoài; mọi luật `file://` hiện có của checker giữ nguyên.
- Luật ảnh `html_docs/assets/images/screenshots/README.md`: dữ liệu giả/công khai, không lộ email/tài khoản/URL nội bộ/ID/token, cắt đúng vùng, có `alt`, ghi ngày chụp + mốc giao diện vào `qa/source-register.md`.
- Tài liệu viết cho LIVE: account name **`opba-ai`**; link LIVE (§7). Ảnh/video chụp trên POC (`nab-quick-poc`) qua bộ che `capture/lib/env-mask.ts`.
- Không đọc/in `.env`, `auth.json` (đã chặn trong `.claude/settings.json`); Python chạy qua `uv`.
- Tài khoản test POC là **admin** → không chụp màn hình admin; ẩn dòng "Manage account" khi chụp.
- Đăng nhập POC cho tự động hoá: `npx tsx capture/login.ts direct --entry=generic` (trang Quick chung + account name; MFA đã tắt cho tài khoản test). Không tự thử lại khi đăng nhập lỗi.
- Chia sẻ demo gửi tới user **`toannk2_reader`** (được phép hiện tên này). Script đăng nhập user này bằng `QUICK_READER_USERNAME` / `QUICK_READER_PASSWORD` trong `.env` (user đã điền; **không có MFA**), cùng đường `--entry=generic`.
- **Gói phát hành** (chép lên shared folder) chỉ gồm `html_docs/index.html`, `html_docs/chapters/`, `html_docs/assets/`, `html_docs/logo/`. Checker và quét rò rỉ áp lên gói này (anti-goal "không lộ POC trong `html_docs/`" hiểu là trong gói phát hành). Ảnh cũ `html_docs/quick-docs/Images/` **xoá** sau khi trang mới thay xong (đợt 1); file khác ngoài gói (`ai-for-bank.rar`, `tmp.html`, `promt.md`, `git_history.txt`, `docs/`, `src/`, `quick-docs/*.docx`…) giữ nguyên chỗ, không chép lên shared folder.
- Dữ liệu demo:
  - **Tài liệu (Space, agent, chat, research, flow):** văn bản luật công khai `demo_docs/tài chính ngân hàng/` — upload nguyên file `.doc`; chỉ chuyển định dạng nếu Quick không nhận `.doc` (không chuyển nếu không bắt buộc). File giả `capture/samples/` dùng bổ sung khi cần.
  - **Dữ liệu (dataset, analysis, dashboard, Scenarios, Stories, hỏi đáp dữ liệu — 13.x):** `demo_docs/aws-quick-demo-data.csv` (synthetic, UTF-8 có BOM, 22.887 dòng, 01/11/2025–19/11/2026; cột: Ngày, Chi nhánh (12), Vùng (3), Sản phẩm (6), Kênh (5), Phân khúc khách hàng (4), Số giao dịch, Tổng giá trị (VND), Khách hàng mới, Hồ sơ vay, Tỷ lệ duyệt (%), Điểm hài lòng (NPS)). Dataset/dashboard demo đặt tên rõ "giả lập", vd "Hiệu quả kinh doanh chi nhánh (dữ liệu giả lập)".

## 4. Các phương án đã cân nhắc

| Phương án | Mô tả | Kết quả |
|---|---|---|
| A | Giữ 5 chương, mỗi chương gom nhiều việc | Loại — trang quá dài (30–45 ảnh + nhiều video), Ctrl+K chỉ ra 5 mục |
| **B** | **5 chương nhóm + trang con theo việc (11.1…)** | **Chọn** — một trang một việc, Ctrl+K tìm từng việc, chương khác không đổi |
| C | Theo vai trò (dùng / tạo / kiểm soát) | Loại — một tính năng tách hai nơi; phân quyền NAB đủ đơn giản để ghi trong từng trang |
| Tăng số chương | Quick thành chương 11–19, đẩy 16–23 | Loại — đổi tên file chương khác, hỏng link/bookmark |

Nguồn gốc các quyết định chi tiết: §15.

## 5. Phân quyền người dùng tại NAB (do user cung cấp)

| Nhóm | Tính năng | Cách thể hiện |
|---|---|---|
| Mọi user | Space, Research, Chat agent, Flow (dùng **và** tạo); chat chung | Trang bình thường |
| User Reader | Dashboard, Data: **chỉ xem** | Dòng "User Reader: chỉ xem" ở 13, 13.1, 13.2 |
| Một số user | Analyses/tạo dashboard, dataset, Scenarios, Stories, Apps, Automations | Vẫn hướng dẫn chi tiết; dấu `*` ở sidebar/tiêu đề/thẻ trang chủ + dòng nhỏ dưới h1: "\* Tính năng này giới hạn user — chỉ một số user được cấp quyền; liên hệ CNTT nếu cần." |

## 6. Danh sách trang (29 trang Quick; `chapters/` có 47 file)

| ID | File (`html_docs/chapters/`) | Tên trang | Giới hạn | Video (đợt 2) |
|---|---|---|---|---|
| 11 | `chapter-11-amazon-quick-bat-dau.html` | Bắt đầu với Amazon Quick | | — |
| 11.1 | `chapter-11-1-dang-nhap-qua-portal.html` | Đăng nhập qua AWS access portal | | có |
| 11.2 | `chapter-11-2-dang-nhap-bang-link-quick.html` | Đăng nhập bằng link Quick / account name | | có |
| 11.3 | `chapter-11-3-lam-quen-giao-dien.html` | Làm quen giao diện | | không |
| 11.4 | `chapter-11-4-chat-voi-quick.html` | Chat với Amazon Quick | | có |
| 11.5 | `chapter-11-5-tao-tai-lieu-slide-hinh.html` | Tạo tài liệu, slide và hình từ chat | | có |
| 12 | `chapter-12-amazon-quick-spaces-chat-agents.html` | Spaces, Chat agents và chia sẻ | | — |
| 12.1 | `chapter-12-1-hoi-dap-tai-lieu-trong-space.html` | Hỏi đáp tài liệu trong Space | | có |
| 12.2 | `chapter-12-2-tao-space-tai-tai-lieu.html` | Tạo Space và tải tài liệu lên | | có |
| 12.3 | `chapter-12-3-chia-se-space.html` | Chia sẻ Space | | có |
| 12.4 | `chapter-12-4-dung-chat-agent.html` | Dùng chat agent | | có |
| 12.5 | `chapter-12-5-tao-chat-agent.html` | Tạo chat agent | | có |
| 12.6 | `chapter-12-6-chia-se-chat-agent.html` | Chia sẻ chat agent | | có |
| 12.7 | `chapter-12-7-luu-y-khi-chia-se.html` | Lưu ý khi chia sẻ (Space, agent, flow, research, hội thoại) | | không |
| 13 | `chapter-13-amazon-quick-du-lieu-dashboard.html` | Dashboard và dữ liệu | | — |
| 13.1 | `chapter-13-1-xem-hoi-dashboard.html` | Xem và hỏi dữ liệu trên dashboard | | có |
| 13.2 | `chapter-13-2-hoi-dap-du-lieu.html` | Hỏi đáp với dữ liệu | | có |
| 13.3 | `chapter-13-3-scenarios.html` | Phân tích với Scenarios | \* | có |
| 13.4 | `chapter-13-4-stories.html` | Kể chuyện dữ liệu với Stories | \* | có |
| 13.5 | `chapter-13-5-tao-dataset.html` | Tạo dataset từ file | \* | có |
| 13.6 | `chapter-13-6-tao-analysis-dashboard.html` | Tạo analysis và xuất bản dashboard | \* | có |
| 14 | `chapter-14-amazon-quick-research.html` | Nghiên cứu với Quick Research | | — |
| 14.1 | `chapter-14-1-tao-research.html` | Tạo một nghiên cứu | | có |
| 14.2 | `chapter-14-2-kiem-chung-chia-se-research.html` | Kiểm chứng và chia sẻ báo cáo | | có |
| 15 | `chapter-15-amazon-quick-flows-tu-dong-hoa.html` | Flows và tự động hoá | | — |
| 15.1 | `chapter-15-1-chay-flow-co-san.html` | Chạy flow có sẵn | | có |
| 15.2 | `chapter-15-2-tao-chia-se-flow.html` | Tạo và chia sẻ flow | | có |
| 15.3 | `chapter-15-3-tao-app.html` | Tạo app | \* | có |
| 15.4 | `chapter-15-4-automations.html` | Automations | \* | có |

Nội dung từng trang: `analysis/de-cuong-phuong-an-b.md` (đề cương đã duyệt) + điều chỉnh: 12.6, 12.7 mới; 15.2 gồm chia sẻ flow; trang `*` giữ chi tiết; chương 13 và 15 đổi tiêu đề như bảng. Video từng trang: `drafts/…/video-plan.md`.

5 file Quick cũ (`chapter-11-amazon-quick-tong-quan.html`, `chapter-12-amazon-quick-sight.html`, `chapter-13-amazon-quick-research-index.html`, `chapter-14-amazon-quick-flows-automate.html`, `chapter-15-amazon-quick-apps.html`) **bị xoá** khi build (build hiện đã tự xoá file `chapter-NN-*.html` không còn trong danh sách — cần mở rộng cho slug trang con).

### Trọng tâm nội dung (theo nhu cầu tra cứu)
- 11.4, 12.1–12.7 viết kỹ nhất. 12.7 là trang quy tắc tổng hợp: ai thấy gì khi được chia sẻ, chia sẻ agent có kéo theo tài liệu/Space gắn kèm không, không chia sẻ ra ngoài NAB, quyền tối thiểu, thu hồi quyền khi chuyển việc, rà soát định kỳ; có khối Sai/Đúng "chia sẻ đúng vs chia sẻ sai". Nội dung "người nhận thấy gì" **kiểm chứng bằng tài khoản `toannk2_reader`** khi chụp, không suy đoán.
- Mọi giới hạn/con số (số file, dung lượng, vai trò chia sẻ, thời gian Research) chỉ ghi khi thấy trên UI lúc chụp; nếu không thấy → bỏ hoặc ghi "theo thông báo trên màn hình".

## 7. Chương đăng nhập — yêu cầu bắt buộc

- Trang 11 và 11.2: khối `status-notice danger` nổi bật "**Account name tại NAB là `opba-ai`**".
- **11.1 (portal)**: link chính `https://nab-opba-ai.awsapps.com/start` trình bày trước; link dự phòng (dualstack, hỗ trợ IPv6) `https://ssoins-7223f5880341d54d.portal.us-east-1.app.aws` cho trường hợp không mở được link chính. Cả hai dạng bấm được và dạng chữ để copy. Bước: mở link → Username → mật khẩu → MFA → tab Applications → ô **opba-ai** (biểu tượng Quick) → trang chủ. Ảnh bước MFA chụp qua đường `/sn/account/…` của POC (thư mục Identity Center còn bật MFA), dừng ở màn hình MFA, **không gửi mã**. Lưu ý/FAQ "nếu được hỏi đăng nhập lại khi chuyển từ portal sang Quick".
- **11.2 (link Quick)**:
  - (a) Khuyến nghị lưu bookmark `https://us-east-1.quicksight.aws.amazon.com/sn/account/opba-ai/start` — link đã chứa account name nên đi thẳng tới trang đăng nhập (khảo sát POC 19/11/2026).
  - (b) Trang đăng nhập Quick chung → phải nhập account name: cảnh báo **đặt trước ảnh** "Ô này nhập `opba-ai` — KHÔNG nhập username hay email của bạn. Username chỉ nhập ở bước sau, trên trang đăng nhập."; ảnh khoanh ô Account name + chú thích lớn trên ảnh; khối **Sai/Đúng** (email ✗ / `opba-ai` ✓); ảnh lỗi "**Invalid account name**" + "Nếu thấy màn hình này → bạn đã nhập sai account name, quay lại nhập `opba-ai`".
  - Màn hình "Choose your account" → chọn dòng `opba-ai`.
  - Bảng **Account name** (tên tài khoản Quick của ngân hàng, mọi người nhập giống nhau: `opba-ai`) vs **Username** (tài khoản cá nhân, nhập ở trang đăng nhập) + ảnh menu tài khoản hiện cả hai.
  - **FAQ đầu tiên**: "Tôi nhập tên đăng nhập vào ô Account name và bị báo lỗi?".
  - Video (đợt 2) dừng 2–3 giây ở bước account name với phụ đề nhắc.
- FAQ khác trên 11.1/11.2: "Không mở được link portal?", quên/mất thiết bị MFA (link "Troubleshoot MFA" + kênh CNTT), vào nhầm ứng dụng trên portal.
- Không xuất hiện URL portal/Quick của POC.

## 8. Nội dung đặc thù NAB — phân bổ

Nguồn: `analysis/current-quick-content.md` §4 (trích nguyên văn, có đường dẫn trường). Phân bổ (chi tiết: bảng §3.3 trong `drafts/…/design-agy.md`):

| Nhóm nội dung cũ | Trang đích |
|---|---|
| §4.0 trạng thái "Đang sử dụng tại NAB", "Nguyên tắc dừng", "Mã nguồn kiểm soát:" | Mọi trang Quick |
| §4.1 quyền, truy cập, đúng tài khoản, ticket khi thiếu menu | 11, 11.1, 11.2, 11.3 |
| §4.1 + §4.3 chia sẻ, quyền tối thiểu, rà soát, không chia sẻ ngoài NAB, RLS/CLS | 12, 12.3, 12.6, **12.7** |
| §4.2 dữ liệu được phép, Private mode không thay chính sách NAB, lưu giữ | 11, 11.4, 12, 12.2, 12.5 |
| §4.2/4.3/4.5 KPI, RLS/CLS, export là bản sao dữ liệu mới, không email cá nhân | 13, 13.1, 13.2, 13.3–13.6, 12.7 |
| §4.5 kiểm chứng trích dẫn, ≥2 nguồn độc lập, không dùng nguyên văn | 14, 14.1, 14.2 (và 11.4, 12.1) |
| §4.4 đọc/ghi tách biệt, xác nhận của con người, Pending approval, test dữ liệu giả, rollback, Apps là prototype | 15, 15.1–15.4 |

Quy tắc: không câu nào trong §4 bị bỏ trừ khi là khẳng định vendor generic chưa xác minh (Pro/Enterprise, staging/production, SPICE >80%, "QuickSight settings", vai trò Viewer/Contributor/Owner nếu UI không có) — những câu này đổi thành theo UI thật hoặc loại, liệt kê trong release note để SME xem. Câu lỗi nghĩa "Không tách thông tin xác thực kiểm thử/prod chung" sửa thành "Không dùng chung thông tin xác thực giữa môi trường kiểm thử và môi trường chính thức".

## 9. Mẫu trang

**Trang nhóm**: breadcrumb → h1 → `status-notice` → giới thiệu ngắn → (11: cảnh báo account name) → danh sách việc (thẻ link tới trang con, `*` cho trang giới hạn) → kiểm soát NAB của nhóm (callout "Nguyên tắc dừng" + danh sách) → (13/15: đoạn tính năng giới hạn user) → FAQ (3–8) → Nguồn.

**Trang việc**: breadcrumb (Trang chủ / Amazon Quick / NN. Nhóm / NN.x Trang) → h1 (`*` nếu giới hạn) → dòng giới hạn user (nếu có) → `status-notice` → Mục tiêu → Điều kiện/quyền tại NAB → (khối riêng: link box, Sai/Đúng, bảng) → **Các bước có ảnh** (cảnh báo trước ảnh nếu có) → `verify-box` → **Video** (chỉ khi có) → Lỗi thường gặp (bảng Thấy gì → Vì sao → Làm gì) → FAQ (2–6) → Kiểm soát NAB (callout "Nguyên tắc dừng" + danh sách) → Nguồn (Mã nguồn kiểm soát).

Nội dung viết tiếng Việt chuẩn; tên nút/nhãn giao diện giữ **nguyên tiếng Anh như trên màn hình**, in đậm (vd **Upload files**, **All data**, **Share**).

## 10. Thay đổi kỹ thuật

### 10.1 `tools/content-quick.js`
Viết lại thành 29 đối tượng trang. Mở rộng schema cũ (tương thích renderer hiện có) với các trường:
- `id` (số cho trang nhóm, chuỗi `"11.1"` cho trang việc), `parentId`, `order` (thứ tự đọc), `pageType: "group" | "task"`, `limitedUser`, `readerViewOnly`, `skipNormalize: true`, `searchKeywords`.
- `walkthroughs[].steps[]` nhận chuỗi (như cũ) **hoặc** object `{ text, preWarning?, compare?, figure?: { src, alt, caption } }`.
- `topCallout`, `linkBoxes`, `tables`, `troubleshooting: [{ symptom, cause, action, figure? }]`.
- `video?: { src, poster, caption, durationText }` — **tuỳ chọn**.
- `capture: { flow, capturedAt }` để truy vết ảnh.
Các trường cũ (`objectives`, `prerequisites`, `controls`, `faqs`, `sources`, `statusLabel`…) giữ nghĩa cũ.

### 10.2 `tools/build-site.js`
- Bỏ áp `normalizeChapterCopy` cho trang có `skipNormalize` (toàn bộ trang Quick).
- Danh sách trang = 23 chương top-level + 24 trang việc, sắp theo `order`; `assertContent` kiểm tra: 23 chương top-level id 1–23 đủ, mỗi trang việc có `parentId` hợp lệ, slug không trùng, ảnh/video khai báo tồn tại.
- `chapterNo`: số → 2 chữ số; chuỗi giữ nguyên ("11.1").
- Sidebar: nhóm "Amazon Quick" render trang nhóm + danh sách con thụt (`ol.subchapter-nav`); dấu `*` cho trang giới hạn; `data-search` gồm số, tên, nhóm, `searchKeywords`.
- Pager theo thứ tự đọc: … 10 → 11 → 11.1 … 15.4 → 16 …
- Breadcrumb 4 cấp cho trang việc (cấp nhóm có link).
- Renderer mới: bước có ảnh (`ol.steps.steps-figured`), cảnh báo trước ảnh, Sai/Đúng (`.compare-grid`), link box (link bấm được + chữ để copy), bảng lỗi, khối video (`figure.video-figure` > `video[controls][preload=metadata][playsinline][poster][src]` + link tải; **không `<track>`**), dòng giới hạn user.
- Trang chủ: khối Amazon Quick có nút "Hướng dẫn đăng nhập (`opba-ai`)" → 11.2; danh mục Quick hiển thị 5 thẻ nhóm, mỗi thẻ liệt kê link trang con (có `*`).
- Dọn file cũ: xoá mọi `chapter-*.html` không còn trong danh sách (kể cả mẫu `chapter-NN-N-*`).
- Chương khác render y như cũ ngoài sidebar/pager.

### 10.3 `assets/css/style.css`, `assets/js/site.js`
- CSS mới: `.subchapter-nav`, `.limited-star`, `.limited-user-notice`, `.steps-figured`, `.step-pre-warning`, `.compare-grid/.compare-wrong/.compare-right`, `.link-box`, `.video-figure`; in ấn ẩn video. Không đổi style cũ; không thêm lại `.nav-badge/.tag-live/.tag-reference` (checker cấm).
- `site.js` `filterNavigation()`: khi trang con khớp, giữ hiện trang nhóm cha và nhánh con; khi trang nhóm khớp, hiện cả nhánh con. Không dùng API cấm của `file://`.

### 10.4 Checker `qa/check-release.py`
Giữ toàn bộ luật hiện hành cho chương khác và mọi luật `file://`. Thay đổi:
- `EXPECTED_SLUGS`: 23 slug top-level (5 slug Quick mới) + 24 slug trang việc; bỏ luật "đúng 23 file" → "đúng 47 file, khớp danh sách".
- Bỏ khoá hash `content-quick.js` (và hash cũ trong `qa/release-checklist.md`); **thêm** khoá hash cho `content-general.js`, `content-ms365.js`, `content-reference.js`, `content-glossary.js`.
- Luật ch4–15 "2–3 walkthrough, 5–8 FAQ" chỉ áp cho ch4–10; Quick có luật riêng:
  - Trang nhóm: "Đang sử dụng tại NAB", "Nguyên tắc dừng", "Mã nguồn kiểm soát:", Source ID đã khai, link tới mọi trang con của nhóm, 3–8 FAQ.
  - Trang việc: như trên + ≥2 `figure.doc-figure` (đủ `img[alt]` + `figcaption`), ≥1 `verify-box`, 2–6 FAQ. **Video không bắt buộc**; nếu có `<video>` thì `src` (.mp4) và `poster` phải tồn tại, mỗi file ≤ 8 MB, tổng `assets/videos/quick/` ≤ 150 MB.
  - Trang giới hạn user (13.3–13.6, 15.3, 15.4): `*` trong h1 và mục sidebar + chuỗi "Tính năng này giới hạn user".
  - 11.1: có 2 link portal; 11.2: link Quick `…/sn/account/opba-ai/start`, khối Sai/Đúng, "Invalid account name", "Choose your account", bảng Account name/Username, FAQ đầu đúng câu; 11 và 11.2: `opba-ai` trong `status-notice`.
- Luật cấm toàn `html_docs/` (file văn bản): `nab-quick-poc`; `\bd-[0-9a-f]{10}\b`; host `*.awsapps.com` khác `nab-opba-ai.awsapps.com`; `ssoins-…` khác `ssoins-7223f5880341d54d`; URL `quicksight.aws.amazon.com/sn/account/<x>/` với x ≠ `opba-ai`; trong trang Quick: "Manage account", `/admin`. Không đọc `.env`.
- Thêm `video` (`src`) và `poster` vào kiểm tra tài nguyên cục bộ.
- Test: pytest (chạy `uv run`) với fixture HTML cho mỗi luật mới (pass/fail).

### 10.5 Pipeline ảnh/video (`capture/`)
- Bộ che: thêm ẩn phần tử admin ("Manage account"…) trước khi chụp; luật username khớp theo **ranh giới từ** (không che/không báo lộ `toannk2_reader`); giữ che `nab-quick-poc`, URL/host POC, directory ID, account ID, tên hiển thị.
- 1 flow / trang việc (`capture/flows/<page>.ts`), dữ liệu demo §3. Đối tượng tạo ra (Space, agent, dataset, dashboard, flow, app, research) ghi `capture/out/created.json`; script dọn chỉ xoá đúng các đối tượng đó.
- Chia sẻ thật tới `toannk2_reader`; flow kiểm tra phía người nhận đăng nhập bằng `QUICK_READER_USERNAME`/`QUICK_READER_PASSWORD` (không MFA) để chụp "người nhận thấy gì", sau đó thu hồi quyền nếu là đối tượng demo. `config.ts` thêm 2 biến này (tuỳ chọn; chỉ bắt buộc với flow phía người nhận).
- `capture/publish.ts` (mới): chọn ảnh theo `steps.json`, cắt vùng, nén, copy vào `html_docs/assets/images/screenshots/amazon-quick/<page-id>/step-XX.png`, ghi `capture/out/manifest.json` (trang, flow, ngày chụp, sha256, dung lượng). Đợt 2: dựng video bằng ffmpeg (cắt, tua ×4–×8 đoạn `waits`, phụ đề burn-in từ `caption`, H.264, `-an`, `+faststart`) → `html_docs/assets/videos/quick/<page-id>.mp4` + `.jpg`.
- Duyệt ảnh: leak check tự động trước mỗi ảnh (có sẵn) + checklist duyệt bằng mắt (OCR nếu có công cụ).
- `qa/source-register.md`: thêm `NAB-AQ-003` "Ảnh & video Amazon Quick — chụp trên POC, hiển thị như LIVE (`opba-ai`), ngày chụp …"; cập nhật ma trận tính năng theo §5.

## 11. Đợt triển khai

| Đợt | Nội dung | Kết quả phát hành |
|---|---|---|
| **1** | Build/CSS/JS/checker mới; bộ che bổ sung; flow + ảnh cho 24 trang việc; viết 29 trang; source register; dọn file cũ | Phần Quick mới đầy đủ ảnh, chưa có video; checker PASS |
| **2** | Dựng video theo `video-plan.md`, gắn dần từng trang (chỉ điền `video`, build lại) | Mỗi video thêm vào không ảnh hưởng trang khác |

Thứ tự trong đợt 1: hạ tầng build/checker → 11.x → 12.x → 13.1–13.2, 14.x, 15.1–15.2 → các trang `*`. Thứ tự chụp theo phụ thuộc dữ liệu: 12.2 → 12.1 → 12.5 → 12.4 → 12.3/12.6/12.7 → 13.5 → 13.6 → 13.1–13.4 → 14.1 → 14.2 → 15.x; 11.x bất kỳ lúc nào.

Chụp lại cả ảnh khi làm video nếu giao diện Quick đã đổi (ảnh và video phải khớp).

## 12. Kiểm thử và tiêu chí hoàn thành

- `uv run --no-project python html_docs/qa/check-release.py` PASS; pytest cho checker PASS.
- Build chạy 2 lần cho kết quả giống nhau; diff phần `<main>` của chương 01–10, 16–23 trước/sau = rỗng.
- Mở `file://` trên Chrome và Edge (Playwright + kiểm tra tay): 0 lỗi console, 0 request ra ngoài, lightbox chạy, Ctrl+K tìm được "đăng nhập", "opba-ai", "Space", "chia sẻ", "agent", "flow" ra đúng trang con; video (khi có) phát được; responsive 375/768/1440 px.
- `capture/check_env_leaks.py` PASS; duyệt mắt toàn bộ ảnh mới; không ảnh nào từ thư mục ảnh cũ `quick-docs/Images` còn được dùng.
- Mọi mục §4 của `current-quick-content.md` truy vết được tới trang mới (bảng truy vết đính kèm khi xong đợt 1).

## 13. Rủi ro và giả định chưa kiểm chứng

- POC ≠ LIVE: POC có 2 thư mục Identity Center và tài khoản test là admin; hành vi link `/sn/account/opba-ai/start`, tên ô ứng dụng portal, có phải đăng nhập lại sau portal, giao diện của user thường — **chưa kiểm chứng trên LIVE** (hỏi SME §14).
- Giao diện của user không admin (trừ menu Manage account) giả định giống admin; kiểm tra khi chụp phía `toannk2_reader`.
- Câu trả lời AI khác nhau mỗi lần → tài liệu mô tả dạng kết quả, không trích nguyên văn làm chuẩn.
- Quick có thể không nhận file `.doc` → chuyển đổi trước khi upload.
- Clipboard trên `file://` chưa kiểm chứng → nút "Sao chép" chỉ là tiện ích, luôn có chữ để chọn.
- Dung lượng shared folder: ngân sách video 150 MB là giả định.

## 14. Câu hỏi còn mở cho SME/ATTT (không chặn đợt 1)

1. LIVE: link `…/sn/account/opba-ai/start` có đi thẳng tới trang Username? Tên ô ứng dụng Quick trên portal LIVE? Có phải đăng nhập lại sau portal?
2. Loại MFA và quy trình khi mất thiết bị; kênh CNTT hỗ trợ.
3. Research có được bật tìm kiếm web và kết hợp với tài liệu nội bộ không (video/ảnh 14.1 tạm chỉ dùng file tải lên).
4. Private mode: câu trả lời chính thức của NAB về lịch sử/lưu giữ.
5. Ảnh/video POC (đã che) có được dùng minh hoạ cho LIVE, ghi "giao diện minh hoạ" + ngày chụp.
6. Ai xác nhận walkthrough (NAB-AQ-002) và cập nhật ma trận trong `source-register.md`.

## 15. Nguồn gốc quyết định

Bảng tổng hợp hai bản thiết kế (Claude + agy/Gemini Argon high), các điểm đã kiểm chứng trong code và quyết định của user: `docs/superpowers/specs/drafts/2026-11-19-amazon-quick-redesign/synthesis.md`. Quyết định user ngày 19/11/2026: chọn B; bỏ admin và Connectors; Extensions để phần Office; phân quyền §5 và đánh dấu `*`; trọng tâm chat/agent/Space/chia sẻ; ảnh trước, video gắn sau; chia sẻ tới `toannk2_reader`; dữ liệu demo `demo_docs/`.

## 16. Quyết định bổ sung sau builder check (do Claude chốt — user xem lại)

- **Đăng nhập cho ảnh 11.1**: tài khoản test đi portal (thư mục Identity Center của portal, MFA đã tắt) đăng nhập được không cần MFA. Ảnh màn hình MFA chụp qua `/sn/account/<account>/start` (thư mục còn bật MFA): nhập đúng username + mật khẩu tới màn hình MFA rồi **dừng, không gửi mã**. Không tự thử lại khi có lỗi.
- **So sánh chương khác**: diff `<main>` của chương 01–10, 16–23 **loại trừ `nav.pager`** (pager chương 10 và 16 buộc phải đổi). Mốc "trước" = build bản hiện tại vào thư mục tạm; không cần commit.
- **File luật `.doc`**: upload nguyên file (quyết định user). Chỉ khi Quick từ chối `.doc` mới chuyển (LibreOffice) sang `.docx` vào `capture/samples/legal/`; bản gốc giữ nguyên.
- **Dashboard demo (13.x)**: dựng từ `demo_docs/aws-quick-demo-data.csv` theo chuỗi 13.5 (dataset) → 13.6 (analysis + publish) → 13.1/13.2/13.3/13.4 dùng lại. Ví dụ câu hỏi: "Chi nhánh nào có tổng giá trị giao dịch cao nhất quý 3/2026?", "So sánh tỷ lệ duyệt hồ sơ vay giữa các vùng", "NPS theo kênh thay đổi thế nào 6 tháng gần đây?". Kiểm tra Quick đọc đúng tiếng Việt có dấu và BOM ở tên cột khi tạo dataset.
- **Trình duyệt**: kiểm thử tự động trên Chromium/Chrome; Edge kiểm tay (máy chụp không có Edge).
- **Đối tượng demo trên POC**: tạo khi cần (Space, agent, dataset, dashboard, flow, app, research, project Automations — không triển khai/chạy thật Automations); **giữ tới hết đợt 2** để quay video; dọn cuối cùng bằng `created.json`.
- **Phát hành từng phần**: đợt 1 phát hành khi đủ 5 trang nhóm + 18 trang việc không `*`. Trang `*` nào chưa chụp được thì **chưa đưa vào `content-quick.js`** (checker lấy danh sách trang việc Quick từ một hằng số cập nhật cùng lúc), thêm sau.

## 17. Để lại cho người thực hiện

- Tên class CSS cụ thể, cách chia nhỏ hàm render, cấu trúc file flow.
- Độ phân giải video xuất (1080p hay 720p) — thử trên 11.2, giữ 720p nếu chữ đọc rõ.
- Công cụ nén ảnh và cách cắt vùng ảnh từng bước.
- Cách tổ chức pytest fixture cho checker.
