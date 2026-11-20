/** 15.2 — chụp lại riêng ô tìm người nhận trong hộp thoại Share của flow (không chia sẻ). */
import type { Flow } from "../lib/flow";
import base from "./q15-2-chay-thu-chia-se";

const pick = (id: string) => base.steps.find((s) => s.id === id)!;

const flow: Flow = {
  ...base,
  name: "q15-2-share-search",
  steps: [pick("wait"), pick("coach"), { ...pick("share"), shot: false }, { ...pick("search"), shot: false, label: undefined },
    {
      id: "settled",
      caption: "Chờ gợi ý tải xong.",
      action: "waitFor",
      shot: false,
      waitAfter: { label: "Gợi ý người nhận", until: async (ctx) => !(await ctx.page.getByText(/^\s*Loading\.*\s*$/).first().isVisible().catch(() => false)), timeoutMs: 60_000 },
      holdMs: 1500,
    },
    { id: "result", caption: pick("search").caption, action: "shot", target: '[role="dialog"] input >> nth=0', label: "Người nhận", noMask: true },
    { id: "close", caption: "Đóng, không chia sẻ.", action: "press", value: "Escape", shot: false }],
};

export default flow;
