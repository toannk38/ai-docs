/** 11.2 bước 1 — chụp lại riêng ảnh "mở link" (banner URL), không đăng nhập. */
import type { Flow } from "../lib/flow";
import base from "./q11-2-link-quick";

const flow: Flow = {
  ...base,
  name: "q11-2-link-banner",
  steps: base.steps.filter((s) => s.id === "bookmark-link"),
};

export default flow;
