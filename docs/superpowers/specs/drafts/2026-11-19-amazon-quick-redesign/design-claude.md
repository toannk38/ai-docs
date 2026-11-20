# Bản A (Claude) — Thiết kế giai đoạn 2: làm lại phần Amazon Quick

## 1. Tóm tắt hướng tiếp cận

Giữ 5 chương nhóm 11–15, thêm **trang con theo việc** (23 trang), viết lại toàn bộ `content-quick.js` theo một **schema trang việc** mới; mở rộng `build-site.js` để sinh trang con, nav lồng, component ảnh-bước/video/Sai-Đúng; dựng ảnh/video bằng pipeline có sẵn trong `capture/` (mỗi trang việc = 1 flow) + bước **publish** (cắt, nén, tua đoạn chờ, burn phụ đề, copy vào `html_docs/assets/`); cập nhật checker với luật cho cấu trúc mới và luật chống lộ POC/admin. Thứ tự làm: đăng nhập (11.x) → chat/Space/agent/chia sẻ (11.4, 12.x — trọng tâm tra cứu) → dashboard/research/flow.

Danh sách trang (28 = 5 nhóm + 23 việc; `*` = tính năng giới hạn user):

| Nhóm | Trang việc |
|---|---|
| 11 Bắt đầu với Amazon Quick | 11.1 Đăng nhập qua AWS access portal · 11.2 Đăng nhập bằng link Quick / account name · 11.3 Làm quen giao diện · 11.4 Chat với Quick · 11.5 Tạo tài liệu, slide, hình từ chat |
| 12 Spaces và Chat agents | 12.1 Hỏi đáp tài liệu trong Space · 12.2 Tạo Space và tải tài liệu · 12.3 Chia sẻ Space · 12.4 Dùng chat agent · 12.5 Tạo chat agent · 12.6 Chia sẻ chat agent · 12.7 Lưu ý khi chia sẻ (Space, agent, flow, research, hội thoại) |
| 13 Dashboard và dữ liệu | 13.1 Xem và hỏi dữ liệu trên dashboard · 13.2 Hỏi đáp với dữ liệu · 13.3 Scenarios* · 13.4 Stories* · 13.5 Tạo dataset từ file* · 13.6 Tạo analysis và xuất bản dashboard* |
| 14 Quick Research | 14.1 Tạo một nghiên cứu · 14.2 Kiểm chứng và chia sẻ báo cáo |
| 15 Flows và tự động hoá | 15.1 Chạy flow có sẵn · 15.2 Tạo và chia sẻ flow · 15.3 Tạo app* · 15.4 Automations* |

**Đánh dấu giới hạn user:** trường `restricted: true` → build thêm `*` sau tên trang ở sidebar/tiêu đề/thẻ trang chủ, một dòng nhỏ dưới h1 "\* Tính năng này giới hạn user — chỉ một số user được cấp quyền; liên hệ CNTT nếu cần", và chú thích `*` ở cuối sidebar nhóm. Trang 13.1/13.2 ghi "User Reader: chỉ xem". Ưu tiên làm: 11.x, 12.x (trọng tâm tra cứu) → 13.1–13.2, 14.x, 15.1–15.2 → các trang `*`. Trang 11.3 có 1 dòng trỏ tới hướng dẫn Extensions trong phần Office (sau).

## 2. Kiến trúc & thành phần

```
capture/flows/<page>.ts ──run.ts──▶ capture/out/<flow>/{step-XX.png, raw.webm, steps.json}
                                        │
                         capture/publish.ts (mới)
                                        ▼
html_docs/assets/images/quick/<page>/step-XX.png   (cắt vùng, nén)
html_docs/assets/videos/quick/<page>.mp4 + .jpg     (ffmpeg: tua đoạn chờ, phụ đề burn-in, H.264)
capture/out/manifest.json                            (ngày chụp, flow, hash, Source ID)
                                        │
html_docs/tools/content-quick.js (viết lại, schema mới) ──build-site.js (mở rộng)──▶ chapters/*.html, index.html
                                        │
html_docs/qa/check-release.py (luật mới) + capture/check_env_leaks.py (gộp vào checker)
```

Thành phần:
- **content-quick.js**: 5 chương nhóm + 23 trang việc (schema §3). Nội dung đặc thù NAB từ `analysis/current-quick-content.md` §4 được phân bổ: kiểm soát chung → trang nhóm 11; quyền/chia sẻ → 12 (đặc biệt 12.7); RLS/CLS/export → 13; kiểm chứng trích dẫn → 14; đọc/ghi/phê duyệt → 15. Bảng phân bổ đi kèm trong spec (truy vết từng mục §4 → trang mới).
- **build-site.js**: `chapters` thành danh sách *trang* (top-level + con). Thêm: `id` dạng chuỗi ("11", "11.1"), `parent`, `kind: "group" | "task"`; `renderNav` lồng (trang con thụt dưới chương nhóm, nhóm Quick mở sẵn khi đang ở trang Quick); pager theo thứ tự đọc (… 11 → 11.1 → … → 15.2 → 16); breadcrumb 3 cấp; `data-search` thêm `keywords`. Renderer mới: `renderFiguredSteps`, `renderVideo`, `renderCompare`, `renderErrors`, `renderLinkBox` (link bấm được + ô chữ copy). Trang nhóm dùng template ngắn; trang việc dùng template việc. Các chương khác render như cũ.
- **style.css**: thêm `.steps-figured`, `.video-figure`, `.compare-wrong-right`, `.link-box`, `.nav-sub` (thụt), không đổi style cũ.
- **site.js**: không đổi logic (Ctrl+K lọc `data-search` đã đủ); có thể thêm nút "Sao chép" cho `.link-box` (clipboard API chạy được trên `file://` khi người dùng bấm `[chưa kiểm chứng]`; fallback chọn chữ).
- **capture/flows**: 1 flow / trang việc (đăng nhập đã có 2). Flow tạo dữ liệu demo đặt tên tự nhiên tiếng Việt ("Quy định công tác phí (giả lập)") và ghi ID vào `capture/out/created.json`; flow dọn dẹp chỉ xoá đúng các ID đó.
- **capture/publish.ts** (mới): đọc `steps.json`, chọn ảnh cần dùng, cắt theo `clip`, tối ưu PNG (oxipng/pngquant nếu có `[chưa kiểm chứng]`, hoặc sharp), dựng video bằng ffmpeg: cắt đầu/cuối, tua ×6 các đoạn `waits`, chèn phụ đề từ `caption` (ASS burn-in, font DejaVu Sans/Inter có dấu tiếng Việt `[chưa kiểm chứng]` Inter trong repo là woff2 → cần TTF), mã hoá H.264 CRF 28 `-movflags +faststart`, xuất poster; ghi manifest.
- **Checker**: mục §6.

## 3. Dữ liệu / schema

`content-quick.js` (mỗi phần tử):

```js
{
  id: "12.3", parent: "12", kind: "task",            // group: kind "group", parent null
  restricted: false,                                 // true -> dấu * + dòng "Tính năng này giới hạn user"
  slug: "chapter-12-3-chia-se-space.html",
  navTitle: "Chia sẻ Space", title: "Chia sẻ Space an toàn",
  keywords: ["share", "chia sẻ", "space", "quyền"],
  status: { label: "Đang sử dụng tại NAB", text: "…" },
  audience: "Mọi user Amazon Quick tại NAB",          // hoặc "User Reader: chỉ xem"
  objective: "…",
  conditions: ["…"],                                  // điều kiện/quyền tại NAB
  notices: [{ tone: "danger", title: "…", text: "…", before: "step-2" }],
  steps: [{ id: "step-1", text: "…", image: "assets/images/quick/12-3/step-01.png",
            alt: "…", caption: "…" }],
  compare: { wrong: { image, label }, right: { image, label } },   // tuỳ chọn (11.2)
  tables: [{ caption, headers, rows }],               // vd Account name vs Username
  linkBoxes: [{ label, url, note }],                  // link portal/Quick
  verify: "…",
  video: { src: "assets/videos/quick/12-3.mp4", poster: "…jpg", duration: "1:05", caption: "…" },
  errors: [{ see: "…", why: "…", fix: "…", image: "…" }],
  faqs: [["…", "…"]],
  controls: ["…"],                                    // kiểm soát NAB (từ nội dung cũ)
  sourceIds: ["NAB-AQ-001", "NAB-AQ-003", "VEN-AQ-001"],
  sources: [["…", "https://docs.aws.amazon.com/quick/…"]],
  sourceDate: "dd/mm/yyyy",
  capture: { flow: "space-share", capturedAt: "2026-…", ui: "POC hiển thị như LIVE" }
}
```

`capture/out/manifest.json`: `{ page, flow, capturedAt, files: [{path, sha256, bytes}], video: {path, durationSec, bytes}, leakCheck: "pass" }` → nguồn để cập nhật `qa/source-register.md` (thêm `NAB-AQ-003` "Ảnh & video Amazon Quick — POC hiển thị như LIVE").

## 4. API / giao diện

- Lệnh: `npx tsx capture/run.ts <flow>` (có sẵn) · `npx tsx capture/publish.ts <flow|--all>` (mới) · `node html_docs/tools/build-site.js` · `uv run --no-project python html_docs/qa/check-release.py`.
- HTML trang việc (thứ tự): breadcrumb → h1 → `status-notice` → Mục tiêu → Điều kiện/quyền tại NAB → (notices/linkBox/compare/table) → Các bước có ảnh → `verify-box` → Video → Lỗi thường gặp → FAQ → Kiểm soát NAB → Nguồn.
- Video: `<figure class="video-figure"><video controls preload="metadata" playsinline poster="../assets/videos/quick/12-3.jpg" src="../assets/videos/quick/12-3.mp4"></video><figcaption>…</figcaption></figure>` — không `<track>`.
- Trang chủ: thẻ Amazon Quick trỏ ch11 + thẻ nổi bật "Đăng nhập Amazon Quick (account name `opba-ai`)" → 11.2.

## 5. Xử lý lỗi & edge case

- Phiên hết hạn / đăng nhập lỗi → flow dừng, không chụp/quay tiếp (đã có). Đăng nhập POC dùng `--entry=generic` (link `/sn/account/…` đi thư mục Identity Center khác).
- Lộ thông tin (POC, username, tên) → dừng flow (đã có); thêm bước quét cuối trên ảnh đã publish bằng OCR nếu có tesseract `[chưa kiểm chứng]`, nếu không thì checklist duyệt bằng mắt bắt buộc.
- Giao diện đổi → selector không thấy → flow fail kèm ảnh chẩn đoán; selector ưu tiên role/label hiển thị.
- Câu trả lời AI khác nhau mỗi lần → ảnh/video chụp lần đạt yêu cầu; nội dung tài liệu không trích nguyên câu trả lời AI làm "kết quả đúng" mà mô tả dạng kết quả.
- Chia sẻ (12.3, 12.6, 15.2) cần một người nhận có thật trong thư mục → nếu chưa có user test thứ hai: chụp tới bước điền người nhận rồi **Huỷ**, không gửi.
- Đối tượng do flow tạo (Space, agent, flow) → ghi `created.json`, dọn dẹp chỉ xoá đúng ID đó; không đụng đối tượng có sẵn.
- Hộp thoại chọn file của hệ điều hành không hiện trong headless → ảnh/bước ghi "chọn file từ máy", dùng ảnh minh hoạ chung nếu cần.
- Trang con trùng số/slug, ảnh/video thiếu → build `assertContent` và checker báo lỗi.
- `file://`: video codec H.264 + AAC (hoặc không tiếng) để Chrome/Edge phát được; không autoplay.

## 6. Test

- **Checker (`check-release.py`)**:
  - Danh sách trang mong đợi = 23 slug top-level (5 slug Quick mới) + 23 slug trang con; số file `chapters/` = 46.
  - Trang `restricted`: có `*` trong h1 và nav + dòng "Tính năng này giới hạn user".
  - Trang nhóm Quick: "Đang sử dụng tại NAB", "Mã nguồn kiểm soát:", Source ID đã khai, ≥1 liên kết tới mỗi trang con.
  - Trang việc Quick: ≥1 `figure.doc-figure` trong `.steps-figured`, đúng 1 `video` (có `poster`, file tồn tại, ≤ 8 MB, `.mp4`), có `verify-box`, 2–6 FAQ.
  - Trang 11.1/11.2: có `opba-ai` trong `status-notice`; 11.2 có khối Sai/Đúng, FAQ đầu đúng câu "Tôi nhập tên đăng nhập vào ô Account name và bị báo lỗi?"; 11.1 có cả hai link portal.
  - Cấm toàn `html_docs/`: `nab-quick-poc`, `d-[0-9a-f]{10}`, host `*.awsapps.com` khác `nab-opba-ai.awsapps.com`, URL Quick `/sn/account/<x>/` với x ≠ `opba-ai`, "Manage account"/`/admin/`, từ "Connector" trong trang Quick (tuỳ chọn).
  - Thêm `video`/`poster` vào kiểm tra tài nguyên cục bộ; giữ mọi luật `file://`.
  - Gỡ khoá hash `content-quick.js`; **thêm** khoá hash cho `content-general.js`, `content-ms365.js`, `content-reference.js`, `content-glossary.js` để bảo đảm chương khác không đổi nội dung.
- **Test cho checker**: pytest (qua `uv run`) với fixture HTML nhỏ cho từng luật mới (đúng → pass, sai → báo lỗi).
- **Build**: chạy build 2 lần cho ra kết quả giống nhau; so diff chương 01–10, 16–23 chỉ khác phần nav/pager.
- **Thủ công**: mở `file://` trên Chrome và Edge: video phát, lightbox, Ctrl+K tìm "đăng nhập"/"Space"/"chia sẻ", responsive 375/768/1440 px; duyệt từng ảnh/video theo checklist luật ảnh.
- **Capture**: mỗi flow chạy được độc lập; `steps.json` có mốc thời gian; leak check pass.

## 7. Rủi ro & giả định chưa kiểm chứng

- POC ≠ LIVE: POC có 2 thư mục Identity Center, tài khoản test là admin → giao diện user thường (Reader) có thể khác; cần tài khoản test không phải admin hoặc kiểm tra lại với SME. `[chưa kiểm chứng]` hành vi link `/sn/account/opba-ai/start` trên LIVE.
- Dùng ảnh POC (đã che) minh hoạ LIVE cần SME/ATTT chấp thuận.
- Chia sẻ cần user thứ hai → nếu không có, ảnh chia sẻ dừng trước bước gửi.
- Giao diện Quick thay đổi nhanh → cần lịch chụp lại; manifest ghi ngày.
- Font tiếng Việt cho phụ đề burn-in và công cụ nén ảnh trên máy chụp `[chưa kiểm chứng]`.
- Clipboard API trên `file://` `[chưa kiểm chứng]`.
- Dung lượng: ~23 video × 2–6 MB ≈ 50–140 MB — giả định shared folder chấp nhận.
- Giới hạn tính năng (file/Space, reference docs, thời gian Research) lấy theo UI POC, có thể khác LIVE.

## 8. Phương án thay thế đã cân nhắc

- **A: 5 chương dài** — loại: trang quá dài, ảnh/video dồn một trang, Ctrl+K kém.
- **C: theo vai trò** — loại: tách một tính năng ra hai nơi; user đã cung cấp mô hình quyền đủ đơn giản để ghi trong từng trang.
- **Tăng số chương (đổi số 16–23)** — loại: đổi tên file chương khác, hỏng link/bookmark.
- **Chụp tay (Snagit…)** — loại: không lặp lại được khi UI đổi, khó che POC nhất quán.
- **GIF thay video** — loại: dung lượng lớn, không tua/dừng.
- **Host video ngoài (Stream/YouTube)** — loại: không chạy offline `file://`, ngoài kiểm soát dữ liệu.
- **Phụ đề WebVTT `<track>`** — loại: không tải qua `file://` trên Chromium.
- **Sinh HTML tay cho trang Quick ngoài build** — loại: lệch nav/style với 24 trang còn lại.
