# Amazon Quick HTML Documentation Refresh Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Reorganize chapters 11–15 around the two updated Amazon Quick DOCX guides, renumber their detailed sections and figures consistently, embed the supplied screenshots, and regenerate all affected HTML without using `quick-docs/Images/Homepage/homepage.html`.

**Architecture:** The site is generated from data in `tools/content-quick.js` by `tools/build-site.js`; generated HTML must not be edited as the source of truth. Extend the generator only enough to support semantic section headings and screenshot figures, replace the five Amazon Quick chapter definitions, then run the generator so `index.html` and all 23 chapter pages receive coherent navigation, breadcrumbs, page content, and pager links.

**Tech Stack:** Node.js CommonJS static-site generator, semantic HTML5, shared CSS, vanilla JavaScript, Python release checker.

**Spec:** Approved in-chat design from 2026-09-14: keep chapters 11–15; regroup as Overview/UI, Spaces/Chat Agents, Data/Analyses/Dashboards, Scenarios/Research, Flows/Automations; keep original image filenames; do not read or use `quick-docs/Images/Homepage/homepage.html`.

## Global Constraints

- Treat `quick-docs/huong_dan_giaodien_amazon_quick.docx` and `quick-docs/huong_dan_amazon_quick.docx` as the content sources.
- Do not inspect, modify, or derive markup from `quick-docs/Images/Homepage/homepage.html`.
- Preserve all existing user changes, including the modified Homepage HTML file.
- Keep the overall site at 23 chapters and the Amazon Quick range at chapters 11–15.
- Renumber detailed source sections continuously: 1 Giới thiệu; 2 Spaces; 3 Datasets; 4 Analyses; 5 Dashboards; 6 Scenarios; 7 Chat Agents; 8 Quick Research; 9 Flows; 10 Automations; 11 SPICE Engine; 12 Tổng kết.
- In HTML, use chapter-based numbering for feature sections and figures (for example, `12.1` and `Hình 12.1`) while preserving screenshot filenames such as `2-1.png` and `8-1.png`.
- Apps may appear only in the chapter 11 interface/navigation map because the revised detailed guide contains no Apps procedure.
- Preserve the current NAB safety/control language unless the updated guides explicitly replace it.
- Present version- or tenant-dependent limits as values from the supplied guide that require validation on the NAB tenant.
- Every image must use a relative local URL, descriptive `alt`, visible caption, and responsive presentation.

---

### Task 1: Add semantic section and figure support to the generator

**Files:**
- Modify: `tools/build-site.js:132-159,186-290`
- Modify: `assets/css/style.css:228-286,324-370`
- Test: `qa/check-release.py:30-95,117-265`

**Interfaces:**
- Consumes: existing chapter objects from `tools/content-*.js`.
- Produces: optional `chapter.guideSections`, where each item is `{ number, id, title, intro?, subsections?, figures? }`; each figure is `{ src, alt, caption }`; HTML classes `.guide-section`, `.guide-subsection`, `.doc-figure`, and `.doc-figure-grid`.

- [ ] **Step 1: Extend release parsing assertions for documentation images**

Add parser state sufficient to assert that every `.doc-figure` has one `<img>` and one `<figcaption>`, while retaining the existing global missing-`alt` and broken-resource checks. Add a release error when a documentation figure lacks either element.

- [ ] **Step 2: Run the release checker and record the baseline**

Run: `python3 qa/check-release.py`

Expected: current site passes before generator changes.

- [ ] **Step 3: Implement reusable renderers**

In `tools/build-site.js`, add escaped renderers equivalent to:

```js
function renderFigure(figure) {
  return `<figure class="doc-figure">
    <img src="${esc(figure.src)}" alt="${esc(figure.alt)}" loading="lazy" decoding="async">
    <figcaption>${esc(figure.caption)}</figcaption>
  </figure>`;
}

function renderGuideSections(items) {
  return items.map((section) => `<section class="guide-section" id="${esc(section.id)}">
    <h2>${esc(section.number)}. ${esc(section.title)}</h2>
    ${section.intro ? `<p>${esc(section.intro)}</p>` : ""}
    ${(section.subsections || []).map((item) => `<section class="guide-subsection" id="${esc(item.id)}">
      <h3>${esc(item.number)}. ${esc(item.title)}</h3>
      ${item.body ? `<p>${esc(item.body)}</p>` : ""}
      ${item.steps ? `<ol class="steps">${item.steps.map((step) => `<li>${esc(step)}</li>`).join("")}</ol>` : ""}
      ${item.figures ? `<div class="doc-figure-grid">${item.figures.map(renderFigure).join("")}</div>` : ""}
    </section>`).join("")}
  </section>`).join("");
}
```

Render `guideSections` between use cases and controls for chapters that provide it. Generate the page TOC dynamically from `chapter.toc` when supplied; otherwise retain the existing default TOC.

- [ ] **Step 4: Add accessible responsive screenshot styles**

Add CSS that gives figures a white bordered card, constrains screenshots to full available width, preserves aspect ratio, makes captions readable, uses one column by default and two columns only where space allows, and avoids splitting a figure during print. Do not add JavaScript or lightbox dependencies.

- [ ] **Step 5: Rebuild and run checks**

Run:

```bash
node tools/build-site.js
python3 qa/check-release.py
```

Expected: 23 chapters generated; all release checks pass; no chapter content has changed except formatting generated from unchanged inputs.

---

### Task 2: Rewrite chapter 11 as the Amazon Quick orientation and interface guide

**Files:**
- Modify: `tools/content-quick.js:20-106`
- Generated: `chapters/chapter-11-amazon-quick-tong-quan.html`
- Generated: `index.html`

**Interfaces:**
- Consumes: `quickChapter(config)`, `guideSections`, and source content from `quick-docs/huong_dan_giaodien_amazon_quick.docx`.
- Produces: chapter 11 with navigation map, Private Mode, chat controls, attachment/output guidance, and More menu overview.

- [ ] **Step 1: Replace chapter identity and overview copy**

Set:

```js
navTitle: "Tổng quan và giao diện Amazon Quick"
title: "Amazon Quick: tổng quan, giao diện và truy cập an toàn"
```

Update summary, objectives, prerequisites, use-case cards, controls, FAQs, and source list so the chapter orients users instead of duplicating feature walkthroughs from later chapters.

- [ ] **Step 2: Add numbered guide sections**

Create chapter-based sections covering:

- `11.1` Đăng nhập và xác nhận đúng ngữ cảnh.
- `11.2` Bố cục trang Home: header, sidebar, main chat.
- `11.3` Private Mode and the source guide’s no-memory-read/no-memory-write behavior, explicitly marked for tenant/version validation.
- `11.4` Sidebar map: New chat, Search, My stuff, Spaces, Research, Chat agents, Apps, Flows, Analyses, Dashboards, Data, folders, More, Recents.
- `11.5` Chat controls: agent selector, prompt input, All data scope, attachment, Smart mode.
- `11.6` Outputs: Research, Document, Presentation, Visual.
- `11.7` More menu: Automations, Connectors, Knowledge, Extensions, Scenarios, Stories, Customize navigation.

Include a callout/table for guide-stated limits: 20 files per conversation, 50 MB per file, 100 files per Space, and 30-day Recents; label all as needing confirmation in the NAB tenant.

- [ ] **Step 3: Add the two interface-guide screenshots**

Extract or copy only the two embedded DOCX images into stable descriptive files under `quick-docs/Images/HDSD/` if the existing HDSD set does not contain equivalent screenshots. Reference them from chapter 11 as `Hình 11.1` (Home interface) and `Hình 11.2` (More menu), with descriptive alt text and captions based on the DOCX captions.

- [ ] **Step 4: Update home-page Amazon Quick summary via generator data**

Change the hardcoded Amazon Quick priority-card summary in `renderHome()` to match the revised guide: interface, Spaces, custom agents, data/BI, Scenarios, Research, Flows, and Automations. Do not mention Apps as a detailed walkthrough.

- [ ] **Step 5: Rebuild and verify chapter 11**

Run:

```bash
node tools/build-site.js
python3 qa/check-release.py
```

Expected: chapter 11 is current in the sidebar, its page TOC resolves, both local images load, and the home-page card points to it.

---

### Task 3: Rewrite chapter 12 for Spaces and Chat Agents

**Files:**
- Modify: `tools/content-quick.js:107-187`
- Generated/Rename target: `chapters/chapter-12-amazon-quick-spaces-chat-agents.html`
- Remove generated obsolete target after successful build: `chapters/chapter-12-amazon-quick-sight.html`
- Images: `quick-docs/Images/HDSD/2-1.png` through `2-4.png`; `8-1.png`, `8-2.png`

**Interfaces:**
- Consumes: canonical source sections 2 and 7 (renumbered from source section 8).
- Produces: `id: 12`, new slug, `navTitle: "Spaces và Chat Agents"`, and figures numbered `Hình 12.1` onward.

- [ ] **Step 1: Replace chapter data and slug**

Set the new identity and rewrite objectives/prerequisites/use cases around collaboration spaces, file/member access, custom-agent persona/reference sources/actions, and sharing controls.

- [ ] **Step 2: Add detailed numbered sections**

Use these chapter numbers:

- `12.1` Spaces — giới thiệu.
- `12.2` Tạo Space.
- `12.3` Quản lý file, dataset, dashboard, topic and members.
- `12.4` Chat Agents — giới thiệu.
- `12.5` Tạo Custom Agent: persona, reference documents, Spaces, action connectors, permissions.
- `12.6` Best practices and least-privilege sharing.

Preserve source-stated limits as guide snapshots: up to 100 files per Space; custom-agent references up to 10 files and 50 MB per file. Clearly require tenant confirmation.

- [ ] **Step 3: Map and caption screenshots**

Insert all images in the `2-*` and `8-*` groups in procedural order. Caption sequentially as `Hình 12.1`–`Hình 12.6`; do not rename the source files. Use alt text that describes the visible Amazon Quick screen and the user action, not the filename.

- [ ] **Step 4: Rebuild and remove stale generated filename safely**

Run the generator, verify the new chapter exists and navigation points to it, then remove only the obsolete generated `chapter-12-amazon-quick-sight.html`. Never remove any file under `quick-docs/Images/Homepage/`.

- [ ] **Step 5: Run release checks**

Run: `python3 qa/check-release.py`

Expected: exactly one chapter 12 file; all 23 chapter sidebars point to the new slug; chapter 11/13 pager links use the new title and path.

---

### Task 4: Rewrite chapter 13 for datasets, analyses, dashboards, and SPICE

**Files:**
- Modify: `tools/content-quick.js:188-267`
- Generated/Rename target: `chapters/chapter-13-amazon-quick-data-bi.html`
- Remove generated obsolete target: `chapters/chapter-13-amazon-quick-research-index.html`
- Images: `quick-docs/Images/HDSD/3-1.png`, `3-2.png`, `4-1.png` through `4-3.png`, `5-1.png`, `5-2.png`

**Interfaces:**
- Consumes: canonical source sections 3, 4, 5, and 11.
- Produces: `id: 13`, `navTitle: "Dữ liệu, Analyses và Dashboards"`, figures numbered `Hình 13.1` onward.

- [ ] **Step 1: Replace chapter identity and chapter-level guidance**

Rewrite data around Data Sources/Datasets, preparation/calculated fields, SPICE versus Direct Query, Analyses/visuals/filters/sheets, Dashboard publication, sharing, refresh, and capacity.

- [ ] **Step 2: Add detailed numbered sections**

Use:

- `13.1` Datasets và Data Sources.
- `13.2` Tạo và chuẩn bị Dataset.
- `13.3` SPICE versus Direct Query.
- `13.4` Tạo Analysis and AutoGraph/visuals/filters/sheets.
- `13.5` Chia sẻ Analysis.
- `13.6` Xuất bản và chia sẻ Dashboard.
- `13.7` Quản lý SPICE capacity and refresh.

Retain the existing safety material about KPI definitions, RLS/CLS, export controls, freshness, and workpaper evidence.

- [ ] **Step 3: Map and caption screenshots**

Place `3-*` with Dataset creation, `4-*` with Analysis creation/sharing, and `5-*` with Dashboard publication. Number captions `Hình 13.1`–`Hình 13.7` and use descriptive alt text.

- [ ] **Step 4: Rebuild, remove obsolete generated file, and verify**

Run generator, verify the new file and all links, remove the old chapter-13 file, then run `python3 qa/check-release.py`.

Expected: exactly one chapter 13 file and no broken image/link/fragment checks.

---

### Task 5: Rewrite chapter 14 for Scenarios and Quick Research

**Files:**
- Modify: `tools/content-quick.js:268-349`
- Generated/Rename target: `chapters/chapter-14-amazon-quick-scenarios-research.html`
- Remove generated obsolete target: `chapters/chapter-14-amazon-quick-flows-automate.html`
- Images: `quick-docs/Images/HDSD/6-1.png`; `9-1.png` through `9-3.png`

**Interfaces:**
- Consumes: canonical source sections 6 and 8 (renumbered from source 9), plus existing chapter 13 Research/Index safeguards.
- Produces: `id: 14`, `navTitle: "Scenarios và Quick Research"`, four numbered figures.

- [ ] **Step 1: Replace chapter data**

Cover Scenarios as an AI-assisted analysis canvas and Quick Research as planned, source-grounded report generation. Keep citations, authoritative-source selection, web/internal source boundaries, prompt injection, ACL, export classification, and reviewer controls.

- [ ] **Step 2: Add detailed numbered sections**

Use:

- `14.1` Scenarios — mục đích and access from More/My stuff.
- `14.2` Create a Scenario, add data/canvas, inspect AI suggestions and insights.
- `14.3` Quick Research — access methods and use cases.
- `14.4` Choose Web/Spaces/uploads/dashboards and define goal/context.
- `14.5` Review/approve the AI plan, wait for processing, inspect citations, edit/export.
- `14.6` Verification and safe sharing.

State the guide’s 7–10 minute duration as an indicative source value that can vary.

- [ ] **Step 3: Map and caption screenshots**

Use `6-1.png` for Scenarios and `9-1.png`–`9-3.png` for the Research workflow. Caption as `Hình 14.1`–`Hình 14.4`.

- [ ] **Step 4: Rebuild, remove obsolete generated file, and verify**

Run generator, remove only the stale chapter-14 generated file after new output is proven, and run the release checker.

Expected: exactly one chapter 14 file; chapter 13/15 pagers and all sidebars resolve.

---

### Task 6: Rewrite chapter 15 for Flows and Automations

**Files:**
- Modify: `tools/content-quick.js:350-433`
- Generated/Rename target: `chapters/chapter-15-amazon-quick-flows-automations.html`
- Remove generated obsolete target: `chapters/chapter-15-amazon-quick-apps.html`
- Images: `quick-docs/Images/HDSD/10-1.png`, `10-2.png`

**Interfaces:**
- Consumes: canonical source sections 9 and 10 (renumbered from source 10 and 11), plus existing flow/automation operational safeguards.
- Produces: `id: 15`, `navTitle: "Flows và Automations"`, two numbered figures, and the chapter boundary pager to chapter 16.

- [ ] **Step 1: Replace chapter data**

Cover Flow steps (AI responses, logic, data insights, actions, user input), Guided/Conversational modes, chat launch, Automation triggers/actions/AI/notifications/testing, and operational controls.

- [ ] **Step 2: Add detailed numbered sections**

Use:

- `15.1` Flows — purpose and access.
- `15.2` Create and configure a Flow.
- `15.3` Guided versus Conversational execution and run from chat.
- `15.4` Automations — purpose and access.
- `15.5` Configure schedule/event trigger, actions, AI, notifications.
- `15.6` Test, approve, monitor, stop, and rollback.

Keep least privilege, no embedded secrets, idempotency/deduplication, human approval before writes, UAT, monitoring, and rollback.

- [ ] **Step 3: Map and caption screenshots**

Use `10-1.png` and `10-2.png` with Flows as `Hình 15.1` and `Hình 15.2`. State that no dedicated Automation screenshots were supplied rather than reusing unrelated imagery.

- [ ] **Step 4: Rebuild, remove obsolete generated file, and verify**

Run generator; verify chapter 15 links backward to chapter 14 and forward to chapter 16; remove only the stale Apps chapter; run `python3 qa/check-release.py`.

Expected: exactly one chapter 15 file; chapter 16 links back to the renamed chapter 15.

---

### Task 7: Verify the complete generated package and protect excluded files

**Files:**
- Verify: `index.html`
- Verify: `chapters/*.html`
- Verify: `assets/css/style.css`
- Verify unchanged: `quick-docs/Images/Homepage/homepage.html`
- Verify images: `quick-docs/Images/HDSD/*.png`

**Interfaces:**
- Consumes: all previous generated output.
- Produces: a release-ready static documentation package with 23 chapters and five reorganized Amazon Quick chapters.

- [ ] **Step 1: Check working-tree scope**

Run: `git status --short`

Expected: changes are limited to the generator/content/CSS/checker, generated `index.html` and chapter HTML, and at most two extracted interface screenshots. The pre-existing modification to `quick-docs/Images/Homepage/homepage.html` remains untouched.

- [ ] **Step 2: Run generator idempotence check**

Run:

```bash
node tools/build-site.js
git diff --exit-code -- tools/build-site.js tools/content-quick.js assets/css/style.css qa/check-release.py index.html chapters
```

Interpretation: the first command should not introduce a second, unexpected diff beyond the intended uncommitted implementation; compare `git diff` before and after or hash generated files to prove idempotence rather than expecting a clean repository.

- [ ] **Step 3: Run automated release validation**

Run: `python3 qa/check-release.py`

Expected:

```text
PASS: static release checks completed
- index.html and 23 files in chapters/ present
- internal links, fragments and local resources resolved
- required metadata, navigation and disclaimers present
- no external auto-loaded resources or forbidden file:// runtime APIs
```

- [ ] **Step 4: Perform targeted content checks**

Search generated HTML to confirm:

- No Amazon chapter title or home-page card still advertises the obsolete Apps-only chapter.
- No `href` points to the four obsolete Amazon slugs.
- Exactly one `aria-current="page"` appears in each chapter sidebar.
- Figures run continuously within chapters 11–15.
- Source filenames remain unchanged in URLs.
- No generated file references `Images/Homepage/homepage.html`.

- [ ] **Step 5: Launch the static site and inspect responsive rendering**

Use the project run workflow or a local static HTTP server. Inspect `index.html` and chapters 11–15 at desktop and mobile widths. Verify sidebar navigation, page TOCs, figures/captions, long screenshots, FAQ controls, pager links, image scaling, and print preview.

- [ ] **Step 6: Review final diff without committing**

Run:

```bash
git diff --stat
git diff --check
git status --short
```

Expected: no whitespace errors, no accidental changes to excluded Homepage markup, and no unrequested commit. Report any guide claims marked for SME/tenant validation.
