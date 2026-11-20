/** 13.5 — chụp lại riêng trang Share dashboard sau khi danh sách quyền tải xong (không đổi quyền). */
import type { Flow } from "../lib/flow";
import base from "./q13-6-chia-se-dashboard";

const pick = (id: string) => base.steps.find((s) => s.id === id)!;

const flow: Flow = {
  ...base,
  name: "q13-5-share-page",
  steps: [
    pick("wait"),
    pick("share"),
    { ...pick("share-menu"), shot: false },
    {
      id: "loaded",
      caption: "Chờ Manage permissions tải xong.",
      action: "waitFor",
      shot: false,
      waitAfter: {
        label: "Tải danh sách quyền",
        until: async (ctx) =>
          !(await ctx.page.getByText(/'dashboardName'/).first().isVisible().catch(() => false)) &&
          (await ctx.page.getByText(/Not available for readers/).first().isVisible().catch(() => false)),
        timeoutMs: 90_000,
      },
      holdMs: 1500,
    },
    { ...pick("share-page"), waitAfter: undefined },
  ],
};

export default flow;
