# Amazon Quick — Đợt 1 (nội dung + ảnh + build/checker) Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Thay phần Amazon Quick (chương 11–15) của `html_docs/` bằng 5 trang nhóm + 24 trang việc có ảnh từng bước, build/checker mới, sẵn sàng gắn video ở Đợt 2.

**Architecture:** Nội dung vẫn sinh từ `html_docs/tools/content-quick.js` qua `html_docs/tools/build-site.js` (mở rộng cho trang con, renderer mới, video tuỳ chọn). Ảnh chụp bằng flow Playwright trong `capture/` (đã có bộ che POC→LIVE), publish vào `html_docs/assets/images/screenshots/amazon-quick/`. Checker `html_docs/qa/check-release.py` thêm luật trang Quick, chống lộ POC/admin, kiểm video.

**Tech Stack:** Node 22 (CommonJS, `node:test`), Playwright 1.64.1 + TypeScript qua `tsx`, Python 3 qua `uv` + pytest, HTML/CSS/JS thuần chạy `file://`.

**Spec:** `docs/superpowers/specs/2026-11-19-amazon-quick-redesign.md` (đọc kèm `analysis/de-cuong-phuong-an-b.md`, `analysis/current-quick-content.md` §4, `analysis/survey/README.md`, `docs/superpowers/specs/drafts/2026-11-19-amazon-quick-redesign/video-plan.md`).

## Global Constraints

- Không sửa nội dung `html_docs/tools/content-general.js`, `content-ms365.js`, `content-reference.js`, `content-glossary.js` (khoá SHA-256: `e70f046e829fd80d17d182e2ddb03bf7a4a87ff19644d6acb9af95525c1d3d8e`, `89c0da32a5f0947e0a0d8d830c01ae418ec35600fb2a1776f5dcb044d147df06`, `64a506b77bb6fa8c63c4e68df1c42821afe2efe2bb8b3b7204b6756e08907d31`, `9d1ca03cc6682417396baf0ab43662aad948b0f54d64cb6c4817fb3f37bdaa13`).
- `file://`: không `fetch`/`XMLHttpRequest`/`navigator.serviceWorker`/`type="module"`/đường dẫn tuyệt đối/tài nguyên ngoài tự tải; mọi `src`/`href` tương đối.
- Gói phát hành = `html_docs/index.html`, `html_docs/chapters/`, `html_docs/assets/`, `html_docs/logo/`.
- Cấm trong gói phát hành: `nab-quick-poc`; `\bd-[0-9a-f]{10}\b`; host `*.awsapps.com` khác `nab-opba-ai.awsapps.com`; `ssoins-[0-9a-f]{16}` khác `ssoins-7223f5880341d54d`; `quicksight.aws.amazon.com/sn/account/<x>/` với x ≠ `opba-ai`; trong trang Quick: `Manage account`, `/admin`.
- Account name trong tài liệu: `opba-ai`. Link LIVE: `https://nab-opba-ai.awsapps.com/start`, dự phòng `https://ssoins-7223f5880341d54d.portal.us-east-1.app.aws`, link Quick `https://us-east-1.quicksight.aws.amazon.com/sn/account/opba-ai/start`.
- Chuỗi cố định: `Account name tại NAB là opba-ai` (trong `status-notice danger`); `Tính năng này giới hạn user` (dòng giới hạn: "\* Tính năng này giới hạn user — chỉ một số user được cấp quyền; liên hệ CNTT nếu cần."); FAQ đầu trang 11.2: `Tôi nhập tên đăng nhập vào ô Account name và bị báo lỗi?`; `User Reader: chỉ xem` (trang 13, 13.1, 13.2); `Đang sử dụng tại NAB`; `Nguyên tắc dừng`; `Mã nguồn kiểm soát:`.
- Tên nút/nhãn giao diện giữ nguyên tiếng Anh như màn hình, in đậm (`**Upload files**`). Văn bản còn lại tiếng Việt có dấu chuẩn. Không dùng các cụm bị checker cấm (danh sách `malformed_localization_fragments`, `tenant_confirmation_patterns` như "SME xác nhận", "Walkthrough ", "Mở tất cả FAQ", "Đọc Chương 02" thiếu tên chương) — chạy checker để phát hiện; nếu nhãn UI trùng một cụm cấm thì diễn đạt lại.
- Không chụp/đưa màn hình admin; không Connectors; Extensions chỉ 1 dòng trỏ phần Office.
- Không đọc/in `.env`, `.env.*`, `auth.json`, `auth-reader.json`. Python chạy qua `uv`. Đăng nhập lỗi → dừng, không tự thử lại.
- Dữ liệu demo: văn bản luật `demo_docs/tài chính ngân hàng/*.doc` (upload nguyên `.doc`, chỉ chuyển nếu Quick từ chối); dữ liệu bảng `demo_docs/aws-quick-demo-data.csv`. Chia sẻ tới `toannk2_reader`.
- Ảnh publish: `html_docs/assets/images/screenshots/amazon-quick/<page-id>/step-XX.png`, `page-id` dạng `11-2` (chỉ ASCII). Video (Đợt 2): `html_docs/assets/videos/quick/<page-id>.mp4` + `.jpg`; ≤ 8 MB/file, tổng ≤ 150 MB.
- **Commit:** chỉ thực hiện các bước "Commit" khi user đã cho phép commit trong phiên; nếu chưa → bỏ qua bước đó (repo hiện có thay đổi chưa commit: toàn bộ site đã chuyển vào `html_docs/`).

## Review Focus

1. Gõ Ctrl+K một từ chỉ khớp trang con (vd "chia sẻ") → trang con hiện **cùng** trang nhóm cha; gõ tên trang nhóm → hiện cả nhánh con. → test ở Task 5.
2. Trang việc chưa có video → không có khối video, không link tải chết, checker PASS; trang có `video` trỏ file thiếu → checker FAIL. → test ở Task 2 và Task 4.
3. Mở site từ thư mục có dấu cách và chữ có dấu (vd shared folder `Cẩm nang AI/`) qua `file://` → ảnh, CSS, JS, lightbox chạy, 0 lỗi console. → test ở Task 12.
4. Bộ che: username test bị che cả khi liền dấu câu (`toannk2,` `toannk2@…`), nhưng `toannk2_reader` hiện nguyên và không bị báo lộ. → test ở Task 6.
5. Trang giới hạn user: dấu `*` có ở sidebar, h1, thẻ trang chủ và trong kết quả Ctrl+K; trang không giới hạn không có `*`. → test ở Task 3 và Task 2.

---

## File Structure

| File | Trách nhiệm |
|---|---|
| `html_docs/qa/check-release.py` (sửa) | Luật phát hành; tách hàm luật mới để test |
| `html_docs/qa/quick_rules.py` (mới) | Hằng số + hàm luật riêng phần Quick (trang nhóm/việc/giới hạn/đăng nhập, cấm POC/admin, video) |
| `html_docs/qa/tests/test_quick_rules.py` (mới) | pytest cho `quick_rules.py` |
| `html_docs/tools/build-site.js` (sửa) | Danh sách trang 2 cấp, nav lồng, pager, breadcrumb, trang chủ, `skipNormalize`; export hàm cho test |
| `html_docs/tools/render-quick.js` (mới) | Renderer trang nhóm/trang việc Quick và component mới |
| `html_docs/tools/tests/*.test.js` (mới) | `node:test` cho build/render |
| `html_docs/tools/content-quick.js` (viết lại) | 29 trang Quick |
| `html_docs/assets/css/style.css`, `html_docs/assets/js/site.js` (sửa) | Style component mới; Ctrl+K giữ cây cha-con |
| `capture/lib/env-mask.ts`, `capture/lib/browser/mask.js` (sửa) | Che username theo ranh giới từ; ẩn mục admin |
| `capture/lib/config.ts`, `capture/login.ts`, `capture/lib/browser.ts`, `capture/lib/flow.ts`, `capture/lib/runner.ts` (sửa) | Phiên user reader; `auth: "reader-session"`; ghi đối tượng tạo ra |
| `capture/publish.ts` (mới) | Chọn/copy ảnh vào `html_docs/assets/...`, ghi manifest |
| `capture/flows/q*.ts` (mới) | 1 flow / trang việc |
| `capture/tests/*.test.ts` (mới) | `node:test` cho mask/publish |
| `html_docs/qa/source-register.md`, `release-checklist.md`, `technical-test-report.md` (sửa) | `NAB-AQ-003`, bỏ hash cũ, ma trận tính năng |

Lệnh test chuẩn:
- Python: `uv run --no-project --with pytest python -m pytest html_docs/qa/tests -q`
- Node build: `node --test html_docs/tools/tests/`
- Capture: `npx tsx --test capture/tests/*.test.ts`
- Toàn site: `node html_docs/tools/build-site.js && uv run --no-project python html_docs/qa/check-release.py`

---

### Task 1: Mốc "trước" và hạ tầng test

**Files:**
- Create: `html_docs/qa/tests/conftest.py` (thêm `html_docs/qa` vào `sys.path`; fixture `check_release` nạp `check-release.py` bằng `importlib.util.spec_from_file_location` vì tên file có dấu gạch ngang), `html_docs/tools/tests/.gitkeep`, `capture/tests/.gitkeep`
- Create: `capture/raw/baseline/` (bản build hiện tại; `capture/raw/` đã bị gitignore)
- Create: `capture/compare-baseline.ts`

**Interfaces:**
- Produces: `npx tsx capture/compare-baseline.ts` — in danh sách chương 01–10, 16–23 có `<main>` (bỏ `nav.pager`) khác bản baseline; exit 1 nếu có khác biệt.

- [ ] **Step 1:** Copy `html_docs/` sang thư mục tạm, chạy `node tools/build-site.js` trong bản copy, copy `index.html` + `chapters/` của bản copy vào `capture/raw/baseline/`. Kiểm: `ls capture/raw/baseline/chapters | wc -l` → `23`.
- [ ] **Step 2:** Viết `capture/compare-baseline.ts`: với mỗi slug chương 01–10, 16–23, trích nội dung `<main …>…</main>` của baseline và của `html_docs/chapters/`, xoá khối `<nav class="pager"…</nav>`, so sánh chuỗi.
- [ ] **Step 3:** Chạy `npx tsx capture/compare-baseline.ts` trên site hiện tại → `OK: 18 chương không đổi`, exit 0.
- [ ] **Step 4:** Chạy `uv run --no-project --with pytest python -m pytest html_docs/qa/tests -q` → "no tests ran" (exit 5 chấp nhận) và `node --test html_docs/tools/tests/` → 0 test.
- [ ] **Step 5: Commit** — `chore: add baseline comparison and test scaffolding`

### Task 2: Luật Quick trong checker (`quick_rules.py`)

**Files:**
- Create: `html_docs/qa/quick_rules.py`
- Test: `html_docs/qa/tests/test_quick_rules.py`

**Interfaces:**
- Produces (Python):
  - `QUICK_GROUP_SLUGS: dict[str, str]` — `{"11": "chapter-11-amazon-quick-bat-dau.html", "12": "chapter-12-amazon-quick-spaces-chat-agents.html", "13": "chapter-13-amazon-quick-du-lieu-dashboard.html", "14": "chapter-14-amazon-quick-research.html", "15": "chapter-15-amazon-quick-flows-tu-dong-hoa.html"}`
  - `QUICK_TASK_PAGES: dict[str, dict]` — slug → `{"id": "12.3", "group": "12", "limited": bool}`; chứa các trang việc **đã phát hành** (Task 9–11 thêm dần; giá trị cuối = 24 trang theo bảng §6 spec, `limited=True` cho 13.3, 13.4, 13.5, 13.6, 15.3, 15.4).
  - `LOCKED_CONTENT_SHA256: dict[str, str]` — 4 file content khác (giá trị ở Global Constraints).
  - `VIDEO_MAX_BYTES = 8 * 1024 * 1024`, `VIDEO_TOTAL_MAX_BYTES = 150 * 1024 * 1024`.
  - `check_banned_patterns(files: list[Path], root: Path) -> list[str]`
  - `check_quick_group_page(slug: str, html: str, doc) -> list[str]`
  - `check_quick_task_page(slug: str, html: str, doc) -> list[str]`
  - `check_login_pages(pages: dict[str, str]) -> list[str]` (slug → html)
  - `check_videos(root: Path, videos: list[tuple[Path, str, str]]) -> list[str]` (trang, src, poster)
  - `check_locked_content(tools_dir: Path) -> list[str]`
  - `doc` là `DocumentParser` của checker (Task 3 thêm `video_count`, `figure_count`, `verify_box_count`, `limited_star_in_h1`).

- [ ] **Step 1: Viết test thất bại** — `test_quick_rules.py`, dùng HTML chuỗi nhỏ và `tmp_path`:
  - `test_banned_poc_account`: file chứa `nab-quick-poc` → 1 lỗi chứa `nab-quick-poc`.
  - `test_banned_directory_id`: `d-906671560e` → lỗi; `d-xxxxxxxxxx` → không lỗi.
  - `test_banned_portal_host`: `https://d-9066713766.awsapps.com/start` → lỗi; `https://nab-opba-ai.awsapps.com/start` → không.
  - `test_banned_quick_account_url`: `…/sn/account/nab-quick-poc/start` → lỗi; `…/sn/account/opba-ai/start` → không.
  - `test_admin_terms_only_in_quick_pages`: `Manage account` trong slug Quick → lỗi; trong `chapter-05-…` → không.
  - `test_task_page_requires_two_figures_verify_and_faq`: thiếu figure thứ 2 → lỗi "figure"; 1 FAQ → lỗi "FAQ"; 7 FAQ → lỗi.
  - `test_task_page_video_optional`: không `<video>` → không lỗi.
  - `test_video_missing_file`: `src="../assets/videos/quick/12-3.mp4"` không tồn tại → lỗi; poster thiếu → lỗi; file 9 MB → lỗi; tổng > 150 MB → lỗi.
  - `test_limited_page_marks`: slug giới hạn thiếu `*` trong h1 hoặc thiếu "Tính năng này giới hạn user" → lỗi; trang không giới hạn có `limited-star` → lỗi.
  - `test_group_page_links_all_children`: trang nhóm 12 thiếu link `chapter-12-3-chia-se-space.html` → lỗi.
  - `test_login_pages`: 11.1 thiếu link dự phòng → lỗi; 11.2 FAQ đầu khác chuỗi cố định → lỗi; thiếu `compare-wrong` → lỗi; 11 và 11.2 thiếu `opba-ai` trong `status-notice` → lỗi.
  - `test_locked_content_hash_mismatch`: file khác hash → lỗi nêu tên file.
- [ ] **Step 2:** Chạy pytest → FAIL (`ModuleNotFoundError: quick_rules`).
- [ ] **Step 3:** Viết `quick_rules.py` (thuần stdlib; regex cấm như Global Constraints; với trang việc: ≥2 `figure.doc-figure`, ≥1 `verify-box`, 2–6 `faq-item`, "Đang sử dụng tại NAB", "Nguyên tắc dừng", "Mã nguồn kiểm soát:"; trang nhóm: 3–8 FAQ + link tới mọi con trong `QUICK_TASK_PAGES` cùng `group`).
- [ ] **Step 4:** Chạy pytest → PASS.
- [ ] **Step 5: Commit** — `test(qa): add Amazon Quick release rules`

### Task 3: Nối luật vào `check-release.py`

**Files:**
- Modify: `html_docs/qa/check-release.py` (EXPECTED_SLUGS dòng 17–41, `QUICK_CONTENT_SHA256` dòng 45, `RESOURCE_TAG_ATTRS`, `DocumentParser`, luật số chương dòng 162–167, luật `4 <= number <= 15` dòng ~252, khoá hash dòng ~337, "Đang sử dụng tại NAB" dòng ~341)
- Test: `html_docs/qa/tests/test_check_release.py`

**Interfaces:**
- Consumes: Task 2.
- Produces: `run(root: Path = ROOT) -> list[str]`; `EXPECTED_SLUGS` = 23 slug top-level (5 slug Quick từ `QUICK_GROUP_SLUGS`, vị trí 11–15) ; `EXPECTED_HTML` = index + 23 + `QUICK_TASK_PAGES`; `DocumentParser` thêm `video_count: int`, `videos: list[tuple[str,str]]`, `figure_count: int`, `verify_box_count: int`, `h1_text: str`.

- [ ] **Step 1: Test thất bại** — `test_check_release.py`: `test_parser_collects_video_and_poster` (HTML có `<video src="a.mp4" poster="a.jpg">` → `doc.videos == [("a.mp4","a.jpg")]`, cả hai vào `resources`); `test_live_tool_walkthrough_rule_only_ms365` (rule 2–3 walkthrough áp cho số 4–10, không áp cho slug Quick).
- [ ] **Step 2:** pytest → FAIL.
- [ ] **Step 3:** Sửa checker: `run(root)` tham số hoá; số file `chapters/` = `23 + len(QUICK_TASK_PAGES)`; bỏ `QUICK_CONTENT_SHA256` + đoạn kiểm hash, thay bằng `check_locked_content`; luật walkthrough/FAQ cũ chỉ cho 4–10; "Đang sử dụng tại NAB" cho 4–10 + mọi slug Quick; gọi các hàm Task 2; `check_banned_patterns` quét file văn bản trong gói phát hành; thêm `video`/`poster` vào kiểm tài nguyên cục bộ; `.codex/plan.md` vẫn là required file.
- [ ] **Step 4:** pytest → PASS. Chạy checker trên site hiện tại → FAIL chỉ vì 5 slug Quick mới chưa tồn tại (mong đợi; Task 8 tạo).
- [ ] **Step 5: Commit** — `feat(qa): enforce Quick page structure, POC and video rules`

### Task 4: Build 2 cấp + renderer Quick

**Files:**
- Modify: `html_docs/tools/build-site.js` (chapters/normalize dòng 408–410, `assertContent` 438–461, `chapterNo` 476, `groupChapters`/`displayGroup` 480–495, `renderNav` 497, `renderPager` 705, `renderChapter` 714, `renderHome` 836, khối ghi file 955–966)
- Create: `html_docs/tools/render-quick.js`
- Test: `html_docs/tools/tests/build.test.js`, `html_docs/tools/tests/render-quick.test.js`

**Interfaces:**
- Produces (CommonJS):
  - `build-site.js`: `module.exports = { loadPages, chapterNo, renderNav, renderPager, renderChapter, renderHome, main }`; chỉ ghi file khi `require.main === module`.
  - `loadPages(raw: Page[]) -> Page[]`: áp `normalizeChapterCopy` trừ `id === 23` hoặc `skipNormalize`; sắp theo `order ?? Number(id)`.
  - `chapterNo(id: number|string) -> string` (`11`→`"11"`, `"11.1"`→`"11.1"`, `4`→`"04"`).
  - `render-quick.js`: `renderQuickGroup(page, ctx) -> string`, `renderQuickTask(page, ctx) -> string`, `renderFiguredSteps(steps, rootPrefix)`, `renderCompare(compare, rootPrefix)`, `renderLinkBoxes(boxes)`, `renderTroubleshooting(rows, rootPrefix)`, `renderVideo(video?, rootPrefix) -> string` (`""` nếu không có), `renderLimitedNotice(page) -> string`. `ctx = { pages, index, rootPrefix: "../", sourceIds }`.
  - Schema trang Quick (trường dùng ở Task 8–11): `id`, `parentId`, `order`, `pageType: "group"|"task"`, `limitedUser`, `readerViewOnly`, `skipNormalize: true`, `searchKeywords: string[]`, `slug`, `navTitle`, `title`, `eyebrow`, `statusLabel`, `statusText`, `summary`, `audience`, `owner`, `kind: "live"`, `objectives`, `prerequisites`, `topCallout?: {tone,title,text,items?}`, `linkBoxes?: [{label,url,note?}]`, `tables?: [{caption,headers,rows}]`, `walkthroughs: [{title,intro,steps: (string|{text,preWarning?,compare?,figure?:{src,alt,caption}})[], verify}]`, `troubleshooting?: [{symptom,cause,action,figure?}]`, `video?: {src,poster,caption,durationText}`, `faqs`, `controls`, `sources`, `sourceDate`, `sourceIds`, `capture?: {flow,capturedAt}`.

- [ ] **Step 1: Test thất bại** (`node:test`, dữ liệu trang giả trong test):
  - `chapterNo` 3 trường hợp trên.
  - `loadPages` giữ nguyên chuỗi "All data" khi `skipNormalize`, vẫn đổi chuỗi theo `copyReplacements` khi không có cờ.
  - Thứ tự: `[10, 11, "11.1", "11.2", 12, "12.1", 16]` → pager trang `"11.2"` có prev `11.1`, next `12`; trang 10 next `11`; trang 16 prev `"12.1"`.
  - `renderNav`: nhóm Amazon Quick có `ol.subchapter-nav` chứa trang con; trang `limitedUser` có `<span class="limited-star"`; `data-search` chứa `searchKeywords`.
  - `renderQuickTask` không có `video` → không chứa `<video` và không chứa `download`; có `video` → chứa `preload="metadata"`, `poster=`, không chứa `<track`.
  - `renderQuickTask` trang `limitedUser` → h1 kết thúc `*`, chứa `Tính năng này giới hạn user`.
  - `renderFiguredSteps` với `preWarning` → khối cảnh báo đứng **trước** `<figure`.
  - Breadcrumb trang con: `Trang chủ / Amazon Quick / <a …>12. …</a> / 12.3. …`.
  - `renderHome`: thẻ nhóm Quick liệt kê link trang con, trang giới hạn có `*`; có nút tới `chapter-11-2-dang-nhap-bang-link-quick.html`.
- [ ] **Step 2:** `node --test html_docs/tools/tests/` → FAIL.
- [ ] **Step 3:** Cài đặt. `assertContent`: 23 trang top-level id 1–23 đủ; trang việc có `parentId` ∈ 11–15, slug khớp `^chapter-1[1-5]-\d-[a-z0-9-]+\.html$`; mọi `figure.src`/`video.src`/`video.poster` tồn tại. Source ID Quick: `["NAB-AQ-001","NAB-AQ-002","NAB-AQ-003","VEN-AQ-001"]`. Chương khác render y như cũ (trừ nav/pager).
- [ ] **Step 4:** `node --test html_docs/tools/tests/` → PASS.
- [ ] **Step 5: Commit** — `feat(build): two-level Quick pages and new components`

### Task 5: CSS + Ctrl+K giữ cây cha-con

**Files:**
- Modify: `html_docs/assets/css/style.css`, `html_docs/assets/js/site.js` (`filterNavigation`, dòng 90–108)
- Test: `capture/tests/site-nav.test.ts` (Playwright, mở fixture HTML qua `file://`)

**Interfaces:**
- Consumes: markup nav Task 4 (`li > a[data-nav-link]` + `ol.subchapter-nav > li > a[data-nav-link]`).

- [ ] **Step 1: Test thất bại** — fixture `capture/tests/fixtures/nav.html` (nav 2 cấp tối thiểu + `site.js` thật): gõ "chia sẻ" → `li` của 12.3 và nhóm 12 đều `hidden === false`, `li` của 11.1 `hidden === true`; gõ "Spaces" (tên nhóm 12) → mọi con của 12 hiện; xoá ô → tất cả hiện; trang có `.limited-star` vẫn hiện khi khớp.
- [ ] **Step 2:** `npx tsx --test capture/tests/site-nav.test.ts` → FAIL.
- [ ] **Step 3:** Sửa `filterNavigation`: con khớp → bỏ `hidden` ở `li` cha; cha khớp → hiện tất cả con. CSS: `.subchapter-nav`, `.limited-star`, `.limited-user-notice`, `.steps-figured`, `.step-pre-warning`, `.compare-grid/.compare-wrong/.compare-right`, `.link-box`, `.video-figure`, `@media print { .video-figure { display:none } }`; responsive ≤ 900px. Không thêm `.nav-badge/.tag-live/.tag-reference`.
- [ ] **Step 4:** Test → PASS.
- [ ] **Step 5: Commit** — `feat(site): keep parent visible when sub-page matches search`

### Task 6: Capture — che username theo ranh giới từ, ẩn admin, phiên reader

**Files:**
- Modify: `capture/lib/env-mask.ts` (`buildMaskRules`), `capture/lib/browser/mask.js` (`findLeaks`, thêm ẩn admin), `capture/lib/config.ts`, `capture/login.ts`, `capture/lib/browser.ts`, `capture/lib/flow.ts`, `capture/lib/runner.ts`, `.gitignore`, `.claude/settings.json`
- Test: `capture/tests/env-mask.test.ts`

**Interfaces:**
- Produces:
  - `loadConfig(needCredentials?: boolean, as?: "main"|"reader") -> CaptureConfig`; `as="reader"` đọc `QUICK_READER_USERNAME`/`QUICK_READER_PASSWORD`, `mfaMode` không dùng.
  - `READER_AUTH_FILE = <root>/auth-reader.json`; `npx tsx capture/login.ts direct --entry=generic --as=reader`.
  - `Flow.auth: "session" | "reader-session" | "none"`.
  - `FlowContext.recordCreated(kind: string, name: string, url: string): void` → ghi thêm vào `capture/out/created.json` (`[{kind,name,url,flow,createdAt}]`).
- [ ] **Step 1: Test thất bại** — `env-mask.test.ts` (Playwright `page.setContent` + init script thật):
  - Text `"Owner: toannk2, toannk2@example.com"` (username giả `toannk2` truyền qua config test) → hiển thị `nhanvien.demo` ở cả hai chỗ.
  - Text `"Shared with toannk2_reader"` → giữ nguyên; `findLeaks` không báo.
  - Menu có mục `Manage account` → phần tử không hiển thị (`isVisible() === false`); mục `Sign out` vẫn hiện.
  - `nab-quick-poc` → `opba-ai` (hồi quy).
- [ ] **Step 2:** `npx tsx --test capture/tests/env-mask.test.ts` → FAIL.
- [ ] **Step 3:** Cài đặt: luật username = regex `(?<![\w.-])<username>(?![\w-])` (không ăn vào `_reader`); `findLeaks` dùng cùng ranh giới; ẩn phần tử có text đúng `/^\s*Manage account\s*$/i` (và `li`/`menuitem` chứa nó). `.gitignore` thêm `auth-reader.json`; `.claude/settings.json` deny thêm `Read(./auth-reader.json)`.
- [ ] **Step 4:** Test → PASS. Chạy `npx tsx capture/login.ts direct --entry=generic --as=reader` **một lần** → `OK … auth-reader.json`; lỗi → dừng, báo user.
- [ ] **Step 5: Commit** — `feat(capture): boundary-safe username mask, admin hiding, reader session`

### Task 7: `capture/publish.ts` (ảnh)

**Files:**
- Create: `capture/publish.ts`
- Test: `capture/tests/publish.test.ts`

**Interfaces:**
- Produces: `npx tsx capture/publish.ts <flow> --page <page-id> [--steps 1,2,4]` → copy `capture/out/<flow>/step-XX.png` đã chọn (đánh số lại liên tục `step-01…`) vào `html_docs/assets/images/screenshots/amazon-quick/<page-id>/`; ghi/ghép `capture/out/manifest.json`: `[{pageId, flow, capturedAt, files:[{path, sha256, bytes}]}]`. Hàm export `publishImages(opts: {flow, pageId, steps?: number[], outRoot, siteRoot}) -> ManifestEntry`.
- [ ] **Step 1: Test thất bại** — fixture `capture/tests/fixtures/out/demo/{step-01.png,step-02.png,step-03.png,steps.json}` (`status: "ok"`): chọn `--steps 1,3` → đích có `step-01.png`, `step-02.png` (bản của step-03); `pageId "12 3"` hoặc có dấu → lỗi "page-id phải là ASCII dạng 12-3"; `steps.json` `status: "failed"` → lỗi, không copy.
- [ ] **Step 2:** Test → FAIL.
- [ ] **Step 3:** Cài đặt (copy byte; nếu có `oxipng`/`pngquant` trong PATH thì nén, không có thì copy nguyên).
- [ ] **Step 4:** Test → PASS.
- [ ] **Step 5: Commit** — `feat(capture): publish selected screenshots with manifest`

### Task 8: Khung 5 trang nhóm Quick + source register

**Files:**
- Modify: `html_docs/tools/content-quick.js` (viết lại: 5 trang nhóm, chưa có trang việc), `html_docs/qa/source-register.md`, `html_docs/qa/release-checklist.md` (dòng 19), `html_docs/qa/technical-test-report.md` (dòng 15)
- Test: checker + `capture/compare-baseline.ts`

**Interfaces:**
- Consumes: schema Task 4, `QUICK_GROUP_SLUGS` Task 2.

- [ ] **Step 1:** Thêm dòng `NAB-AQ-003` vào bảng `source-register.md` sau `NAB-AQ-002`: `| NAB-AQ-003 | Bằng chứng ảnh/video | Ảnh và video Amazon Quick chụp trên POC, hiển thị như LIVE (account name opba-ai); ngày chụp ghi trong capture/out/manifest.json | Chương 11–15 | \`[SME Amazon Quick]\` | 19/11/2026 | \`[dd/mm/yyyy]\` | \`[Link kho nội bộ]\` | Cần bổ sung |`; cập nhật ma trận tính năng ch11–15 theo §5 spec (mọi user / Reader chỉ xem / giới hạn). Bỏ dòng hash cũ ở `release-checklist.md:19`, thay bằng "khoá hash 4 file content khác (xem `qa/quick_rules.py`)"; cập nhật `technical-test-report.md:15` tương tự.
- [ ] **Step 2:** Viết 5 trang nhóm theo mẫu §9 spec: 11 (giới thiệu, `status-notice danger` "Account name tại NAB là opba-ai", nguyên tắc chung NAB §4.0–4.2, nguyên tắc dừng), 12 (Space/agent, kiểm soát tài liệu + chia sẻ §4.1/4.3), 13 ("User Reader: chỉ xem", RLS/CLS/KPI/export §4.2/4.3/4.5, đoạn tính năng giới hạn user), 14 (kiểm chứng trích dẫn §4.5), 15 (đọc/ghi, phê duyệt, Apps là prototype §4.4, đoạn giới hạn user). Mỗi câu §4 của `analysis/current-quick-content.md` được đặt ở trang theo bảng §8 spec; câu vendor generic chưa xác minh loại bỏ và liệt kê trong `analysis/release-notes-quick.md` (tạo mới). Câu "Không tách thông tin xác thực kiểm thử/prod chung" → "Không dùng chung thông tin xác thực giữa môi trường kiểm thử và môi trường chính thức".
- [ ] **Step 3:** `node html_docs/tools/build-site.js` → tạo 5 file mới, xoá 5 file Quick cũ. `uv run --no-project python html_docs/qa/check-release.py` → PASS (`QUICK_TASK_PAGES` đang rỗng). `npx tsx capture/compare-baseline.ts` → OK.
- [ ] **Step 4:** Tạo `analysis/nab-content-trace.md`: bảng mỗi trích dẫn §4 → trang mới (hoặc "loại — vendor generic").
- [ ] **Step 5: Commit** — `feat(quick): group pages for chapters 11-15 with NAB controls`

### Task 9: Chương 11 — đăng nhập, giao diện, chat (11.1–11.5)

**Files:**
- Create: `capture/flows/q11-1-portal.ts`, `q11-1-mfa-screen.ts`, `q11-2-link-quick.ts` (gộp `login-account-name`, `login-account-name-wrong`, bookmark link, Choose your account), `q11-3-giao-dien.ts`, `q11-4-chat.ts`, `q11-5-tao-tai-lieu.ts`
- Modify: `html_docs/tools/content-quick.js`, `html_docs/qa/quick_rules.py` (`QUICK_TASK_PAGES` thêm 11.1–11.5)

**Interfaces:**
- Consumes: Task 4 schema, Task 6 (`auth`, mask), Task 7 (`publish.ts`).

- [ ] **Step 1:** Viết + chạy flow (mỗi flow chạy độc lập `npx tsx capture/run.ts <flow> --no-video`), yêu cầu `steps.json.status === "ok"`:
  - `q11-1-portal`: portal → Username → mật khẩu → Applications → ô `opba-ai` → trang chủ (các bước reauth `when: usernameVisible`).
  - `q11-1-mfa-screen` (`auth: "none"`, start = `QUICK_APP_URL`): Username → mật khẩu → chụp màn hình MFA (khoanh ô **MFA code**, link **Troubleshoot MFA**) → **dừng, không gửi mã**.
  - `q11-2-link-quick`: link bookmark → trang Username; trang chung → nhập email giả → "Invalid account name"; nhập `opba-ai` (`maskAs: "account"`, banner cảnh báo); trang "Choose your account" (mở lại trang chung khi đã có phiên) khoanh dòng `opba-ai`; menu tài khoản (Account name + Username).
  - `q11-3-giao-dien`: trang chủ, sidebar, My stuff, menu More (không Connectors), menu tài khoản (không Manage account).
  - `q11-4-chat`: phạm vi dữ liệu (3 lựa chọn), chế độ (3 lựa chọn), đính kèm `demo_docs/tài chính ngân hàng/100728_l47qh_LUẬT CÁC TỔ CHỨC TÍN DỤNG.doc`, hỏi "Theo Luật Các tổ chức tín dụng, những hành vi nào bị cấm?", trích dẫn, Private mode.
  - `q11-5-tao-tai-lieu`: Document từ chat (tóm tắt Pháp lệnh ngoại hối), xem, tải về; Presentation/Visual 1 ảnh mỗi loại.
- [ ] **Step 2:** Duyệt mắt từng ảnh (không POC, không admin, khung đỏ đúng nút); `publish.ts` cho trang 11-1 … 11-5.
- [ ] **Step 3:** Viết 5 trang việc theo đề cương + §7 spec (11.1: 2 link box; 11.2: cảnh báo trước ảnh, Sai/Đúng, ảnh lỗi, Choose your account, bảng Account name vs Username, FAQ đầu cố định; 11.3 có đúng 1 dòng "Dùng Quick ngay trong Word/Outlook/Excel/PowerPoint — xem hướng dẫn phần Office (sẽ bổ sung)", không nhắc Connectors; giới hạn/con số chỉ khi thấy trên UI). Thêm 5 slug vào `QUICK_TASK_PAGES`.
- [ ] **Step 4:** Build + checker → PASS; `compare-baseline` → OK; mở 11.2 trên Chrome `file://` xem ảnh + lightbox.
- [ ] **Step 5: Commit** — `feat(quick): chapter 11 task pages with screenshots`

### Task 10: Chương 12 — Space, agent, chia sẻ (12.1–12.7)

**Files:**
- Create: `capture/flows/q12-2-tao-space.ts`, `q12-1-hoi-dap-space.ts`, `q12-5-tao-agent.ts`, `q12-4-dung-agent.ts`, `q12-3-chia-se-space.ts`, `q12-6-chia-se-agent.ts`, `q12-reader-view.ts` (`auth: "reader-session"`)
- Modify: `html_docs/tools/content-quick.js`, `html_docs/qa/quick_rules.py`

- [ ] **Step 1:** Chạy theo thứ tự: `q12-2` (Space "Văn bản pháp luật ngân hàng (demo)", upload 4 luật `.doc`; nếu Quick từ chối `.doc` → chuyển `.docx` bằng LibreOffice vào `capture/samples/legal/` rồi chạy lại; chờ trạng thái **Ready**; `recordCreated("space", …)`) → `q12-1` → `q12-5` (agent "Trợ lý tra cứu quy định ngân hàng (demo)", gắn Space; `recordCreated`) → `q12-4` → `q12-3` (Share Space tới `toannk2_reader`, chọn quyền tối thiểu) → `q12-6` (Share agent tới `toannk2_reader`) → `q12-reader-view` (đăng nhập reader: thấy Space/agent được chia sẻ chưa? mở được tài liệu trong Space gắn agent không? ghi kết quả thật vào `capture/out/q12-reader-view/findings.md`).
- [ ] **Step 2:** Duyệt mắt; publish 12-1 … 12-6, và ảnh cho 12-7 (ảnh phía người nhận từ `q12-reader-view`).
- [ ] **Step 3:** Viết 12.1–12.7; 12.7 dựa trên `findings.md` (không suy đoán), có khối Sai/Đúng "chia sẻ đúng vs sai", quy tắc §4.1/4.3. Thêm 7 slug vào `QUICK_TASK_PAGES`.
- [ ] **Step 4:** Build + checker → PASS; `compare-baseline` → OK.
- [ ] **Step 5: Commit** — `feat(quick): chapter 12 Space, agent and sharing pages`

### Task 11: Chương 13–15 (13.1–13.6, 14.1–14.2, 15.1–15.4)

**Files:**
- Create: `capture/flows/q13-5-tao-dataset.ts`, `q13-6-analysis-dashboard.ts`, `q13-1-xem-dashboard.ts`, `q13-2-hoi-dap-du-lieu.ts`, `q13-3-scenarios.ts`, `q13-4-stories.ts`, `q14-1-tao-research.ts`, `q14-2-kiem-chung-research.ts`, `q15-1-chay-flow.ts`, `q15-2-tao-flow.ts`, `q15-3-tao-app.ts`, `q15-4-automations.ts`, `q13-reader-view.ts`
- Modify: `html_docs/tools/content-quick.js`, `html_docs/qa/quick_rules.py`

- [ ] **Step 1:** Chạy theo thứ tự: `q13-5` (Create dataset từ `demo_docs/aws-quick-demo-data.csv`; kiểm tên cột có dấu hiển thị đúng; tên dataset "Hiệu quả kinh doanh chi nhánh (dữ liệu giả lập)") → `q13-6` (Generate analysis, publish dashboard cùng tên, share tới `toannk2_reader` quyền xem) → `q13-1` (lọc Vùng/Sản phẩm, Ask a question "Chi nhánh nào có tổng giá trị giao dịch cao nhất quý 3/2026?") → `q13-2` → `q13-3` → `q13-4` → `q13-reader-view` (xác nhận Reader chỉ xem) → `q14-1` (nguồn: 2 file luật, không web; dừng khi đang chạy) → chờ Research xong → `q14-2` (trích dẫn, Download PDF/Word, Add to space) → `q15-1` (flow pre-built "5-Why Root Cause Analysis") → `q15-2` (tạo flow "Tóm tắt văn bản luật và liệt kê điểm cần lưu ý", share tới `toannk2_reader`) → `q15-3` → `q15-4` (chỉ xem tổng quan/sample, không deploy). Mọi đối tượng tạo ra → `recordCreated`.
- [ ] **Step 2:** Duyệt mắt; publish từng trang. Trang `*` không chụp được → để lại, ghi lý do vào `analysis/release-notes-quick.md`, **không** thêm vào `QUICK_TASK_PAGES`.
- [ ] **Step 3:** Viết các trang (13, 13.1, 13.2 có "User Reader: chỉ xem"; trang `*` có `limitedUser: true`). Thêm slug đã viết vào `QUICK_TASK_PAGES`.
- [ ] **Step 4:** Build + checker → PASS; `compare-baseline` → OK.
- [ ] **Step 5: Commit** — `feat(quick): chapters 13-15 task pages`

### Task 12: Dọn ảnh cũ, kiểm tra phát hành

**Files:**
- Delete: `html_docs/quick-docs/Images/` (sau khi `grep -r "quick-docs/Images" html_docs/tools html_docs/chapters html_docs/index.html` rỗng)
- Create: `capture/tests/release-smoke.test.ts`
- Modify: `html_docs/qa/technical-test-report.md` (kết quả chạy), `analysis/release-notes-quick.md`

- [ ] **Step 1: Test** — `release-smoke.test.ts` (Playwright): copy gói phát hành vào thư mục tạm tên `Cẩm nang AI test/`; mở `index.html`, `chapters/chapter-11-2-dang-nhap-bang-link-quick.html`, 1 trang 12.x, 1 trang `*` qua `file://`: 0 lỗi console, 0 request không phải `file:`, mọi `img` có `naturalWidth > 0`, Ctrl+K "đăng nhập" / "opba-ai" / "chia sẻ" / "agent" / "flow" hiện đúng trang con; viewport 375/768/1440 không tràn ngang.
- [ ] **Step 2:** Chạy → PASS (sửa nếu FAIL).
- [ ] **Step 3:** Xoá `html_docs/quick-docs/Images/`; chạy `uv run --no-project python capture/check_env_leaks.py html_docs` → PASS; build + checker → PASS; `compare-baseline` → OK; pytest + node tests + capture tests → PASS.
- [ ] **Step 4:** Ghi kết quả vào `technical-test-report.md`; checklist duyệt ảnh trong `release-notes-quick.md` (mỗi trang: ngày chụp, flow, người duyệt). Báo user kiểm tay trên Edge.
- [ ] **Step 5: Commit** — `chore(quick): remove legacy POC screenshots, release verification`

---

## Đợt 2 (video) — phác thảo, lập kế hoạch chi tiết sau Đợt 1

- **V1 — `publish.ts --video`:** ffmpeg từ `raw.webm` + `steps.json`: cắt đầu/cuối, tua ×4–×8 các đoạn `waits`, nhãn "⏩ Tua nhanh", phụ đề burn-in từ `caption` (font TTF có dấu tiếng Việt), H.264 `yuv420p`, `-an`, `-movflags +faststart`, poster `.jpg`; thử 11.2 ở 1280×720 và 1920×1080, chọn theo độ đọc rõ; giới hạn 8 MB/file.
- **V2 — gắn video:** theo `video-plan.md`, chạy lại flow (có video) nếu UI đổi so với ảnh; điền `video` từng trang; checker kiểm file/dung lượng/tổng 150 MB.
- **V3 — dọn dữ liệu demo:** script đọc `capture/out/created.json`, xoá đúng các đối tượng đó trên POC (Space, agent, dataset, dashboard, flow, app, research), thu hồi chia sẻ với `toannk2_reader`.
