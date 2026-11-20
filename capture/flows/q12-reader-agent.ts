/**
 * 12.7 Kiểm chứng phía người nhận (toannk2_reader) khi CHỈ chia sẻ agent (chưa chia sẻ Space).
 * Chụp: danh sách agent, câu trả lời của agent, danh sách Space. Ghi nhận xét vào findings.md.
 */
import fs from "node:fs";
import path from "node:path";
import { OUT_DIR } from "../lib/config";
import type { Flow } from "../lib/flow";

const AGENT = /Trợ lý Quy định Ngân hàng/i;
const base = (region: string, acct: string) => `https://${region}.quicksight.aws.amazon.com/sn/account/${acct}/start`;

const flow: Flow = {
  name: "q12-reader-agent",
  title: "Người nhận chỉ được chia sẻ agent",
  auth: "reader-session",
  start: (ctx) => `${base(ctx.config.region, ctx.config.accountName)}/agents`,
  steps: [
    { id: "filter", caption: "Người nhận mở Chat agents, bấm bộ lọc Show.", action: "click", target: { text: /^\s*Show:/ }, label: "Bộ lọc", shot: false },
    { id: "shared-filter", caption: "Chọn Shared with me để xem agent được chia sẻ.", action: "click", target: { text: /^\s*Shared with me\s*$/ }, label: "Shared with me", shotWhen: "before" },
    { id: "agents", caption: "Người nhận thấy agent được chia sẻ (cột Owner permission: No — chỉ được dùng, không sửa).", action: "shot", target: { role: "row", name: AGENT }, label: "Agent được chia sẻ", holdMs: 1200 },
    { id: "chat", caption: "Người nhận bấm Chat ở dòng agent.", action: "click", target: 'tr:has-text("Trợ lý Quy định Ngân hàng") >> text=Chat', label: "Chat", shot: false },
    { id: "ask", caption: "Người nhận hỏi agent một câu về nội dung tài liệu trong Space.", action: "type", target: { placeholder: /ask a question/i }, value: "Theo Luật Các tổ chức tín dụng, tổ chức tín dụng gồm những loại hình nào?", label: "Câu hỏi" },
    {
      id: "send",
      caption: "Gửi câu hỏi.",
      action: "click",
      target: { role: "button", name: /^send$/i },
      shot: false,
      waitAfter: { label: "Agent đang trả lời", until: async (ctx) => !(await ctx.page.getByRole("button", { name: /stop/i }).first().isVisible().catch(() => false)) && (await ctx.page.getByRole("button", { name: /copy/i }).first().isVisible().catch(() => false)), timeoutMs: 300_000 },
    },
    { id: "answer", caption: "Câu trả lời của agent khi người nhận chưa có quyền trên Space.", action: "shot", noAnnotate: true, holdMs: 1500 },
    {
      id: "note-answer",
      caption: "Ghi nhận xét.",
      action: "custom",
      shot: false,
      run: async (ctx) => {
        const text = (await ctx.page.locator("body").innerText()).replace(/\s+/g, " ");
        const cites = /\.doc|LUẬT CÁC TỔ CHỨC TÍN DỤNG|100728/i.test(text);
        const sources = await ctx.page.getByRole("button", { name: /^sources$/i }).first().isVisible().catch(() => false);
        ctx.vars.agentAnswer = `Trả lời có trích dẫn tệp trong Space: ${cites ? "CÓ" : "KHÔNG"}; nút Sources: ${sources ? "có" : "không"}.`;
      },
    },
    { id: "spaces", caption: "Trang Spaces của người nhận.", action: "goto", value: (ctx) => `${base(ctx.config.region, ctx.config.accountName)}/spaces`, shot: false },
    { id: "spaces-list", caption: "Người nhận chưa được chia sẻ Space: danh sách Space của họ.", action: "shot", noAnnotate: true, holdMs: 1200 },
    {
      id: "findings",
      caption: "Ghi kết quả kiểm chứng.",
      action: "custom",
      shot: false,
      run: async (ctx) => {
        const seesSpace = await ctx.page.getByText("Văn bản pháp luật ngân hàng (demo)").first().isVisible().catch(() => false);
        const lines = [
          `# Kiểm chứng phía người nhận — chỉ chia sẻ agent (${new Date().toISOString()})`,
          `- ${ctx.vars.agentAnswer}`,
          `- Người nhận thấy Space trong danh sách Spaces: ${seesSpace ? "CÓ" : "KHÔNG"}`,
        ];
        fs.writeFileSync(path.join(OUT_DIR, "q12-reader-agent", "findings.md"), lines.join("\n") + "\n");
      },
    },
  ],
};

export default flow;
