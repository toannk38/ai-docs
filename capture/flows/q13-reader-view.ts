/** Kiểm chứng Reader (toannk2_reader): Data chỉ xem, không có Create dataset; thanh điều hướng không có Analyses. */
import fs from "node:fs";
import path from "node:path";
import { OUT_DIR } from "../lib/config";
import type { Flow } from "../lib/flow";

const flow: Flow = {
  name: "q13-reader-view",
  title: "Reader với Data và Dashboard",
  auth: "reader-session",
  start: (ctx) => `https://${ctx.config.region}.quicksight.aws.amazon.com/sn/account/${ctx.config.accountName}/start/data?tab=dataset`,
  steps: [
    { id: "data", caption: "User Reader mở Data: chỉ thấy dataset được chia sẻ, không có nút Create dataset; thanh điều hướng không có mục Analyses.", action: "shot", noAnnotate: true, holdMs: 5000 },
    {
      id: "findings",
      caption: "Ghi kết quả.",
      action: "custom",
      shot: false,
      run: async (ctx) => {
        const create = await ctx.page.getByRole("button", { name: /create dataset/i }).first().isVisible().catch(() => false);
        const analyses = await ctx.page.getByText(/^\s*Analyses\s*$/).first().isVisible().catch(() => false);
        fs.writeFileSync(
          path.join(OUT_DIR, "q13-reader-view", "findings.md"),
          [`# Reader — Data/Dashboard (${new Date().toISOString()})`, `- Nút Create dataset: ${create ? "CÓ" : "KHÔNG"}`, `- Mục Analyses trên thanh điều hướng: ${analyses ? "CÓ" : "KHÔNG"}`, "- Dashboard được chia sẻ quyền Viewer: xem, hỏi đáp, Export to CSV, Generate PDF, Print (xem q13-1-xem-dashboard)."].join("\n") + "\n",
        );
      },
    },
  ],
};

export default flow;
