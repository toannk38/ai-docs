/** 12.7 — chụp lại riêng danh sách agent được chia sẻ của người nhận (Reader), không chat. */
import type { Flow } from "../lib/flow";
import base from "./q12-reader-agent";

const pick = (id: string) => base.steps.find((s) => s.id === id)!;

const flow: Flow = {
  ...base,
  name: "q12-7-agents-list",
  steps: [pick("filter"), { ...pick("shared-filter"), shotWhen: undefined, shot: false }, pick("agents")],
};

export default flow;
