"use strict";

/** Trang giả tối thiểu cho test build/render. */
function page(overrides) {
  return {
    title: "Tiêu đề",
    navTitle: "Tên",
    summary: "Tóm tắt",
    eyebrow: "Amazon Quick",
    statusLabel: "Đang sử dụng tại NAB",
    statusText: "Trạng thái",
    audience: "Mọi user",
    owner: "Chủ biên",
    kind: "live",
    group: "Amazon Quick",
    objectives: ["Mục tiêu"],
    prerequisites: ["Điều kiện"],
    useCases: [],
    walkthroughs: [{ title: "Làm", intro: "Giới thiệu", steps: ["Bước 1"], verify: "Kiểm chứng" }],
    controls: ["Kiểm soát"],
    faqs: [["Hỏi 1?", "Đáp 1."], ["Hỏi 2?", "Đáp 2."], ["Hỏi 3?", "Đáp 3."]],
    sources: [["AWS", "https://docs.aws.amazon.com/quick/latest/userguide/"]],
    sourceDate: "19/11/2026",
    ...overrides,
  };
}

function quickSet() {
  return [
    page({ id: 10, slug: "chapter-10-ms365-powerpoint.html", navTitle: "PowerPoint", group: "Microsoft 365" }),
    page({ id: 11, slug: "chapter-11-amazon-quick-bat-dau.html", navTitle: "Bắt đầu", pageType: "group", skipNormalize: true }),
    page({ id: "11.1", parentId: 11, slug: "chapter-11-1-dang-nhap-qua-portal.html", navTitle: "Đăng nhập qua portal", pageType: "task", skipNormalize: true, searchKeywords: ["portal", "applications"] }),
    page({ id: "11.2", parentId: 11, slug: "chapter-11-2-dang-nhap-bang-link-quick.html", navTitle: "Đăng nhập bằng link", pageType: "task", skipNormalize: true }),
    page({ id: 12, slug: "chapter-12-amazon-quick-spaces-chat-agents.html", navTitle: "Spaces và Chat agents", pageType: "group", skipNormalize: true }),
    page({ id: "12.1", parentId: 12, slug: "chapter-12-1-hoi-dap-tai-lieu-trong-space.html", navTitle: "Hỏi đáp trong Space", pageType: "task", skipNormalize: true }),
    page({ id: "12.2", parentId: 12, slug: "chapter-12-2-tao-space-tai-tai-lieu.html", navTitle: "Tạo Space", pageType: "task", skipNormalize: true, limitedUser: true }),
    page({ id: 16, slug: "chapter-16-chon-ai-theo-nhu-cau.html", navTitle: "Chọn AI", group: "AI phổ biến" }),
  ];
}

module.exports = { page, quickSet };
