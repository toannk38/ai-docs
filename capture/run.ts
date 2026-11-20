/**
 * Chạy một flow độc lập:
 *   npx tsx capture/run.ts <flow>            # chụp ảnh + quay video
 *   npx tsx capture/run.ts <flow> --no-video
 *   npx tsx capture/run.ts --list
 */
import fs from "node:fs";
import path from "node:path";
import { loadConfig } from "./lib/config";
import { runFlow } from "./lib/runner";
import type { Flow } from "./lib/flow";

const FLOWS_DIR = path.join(__dirname, "flows");

function listFlows(): string[] {
  return fs
    .readdirSync(FLOWS_DIR)
    .filter((f) => f.endsWith(".ts") && !f.startsWith("_"))
    .map((f) => f.replace(/\.ts$/, ""))
    .sort();
}

async function main() {
  const args = process.argv.slice(2);
  if (!args.length || args.includes("--list")) {
    console.log("Các flow:\n" + listFlows().map((f) => `  - ${f}`).join("\n"));
    return;
  }
  const name = args[0];
  if (!listFlows().includes(name)) throw new Error(`Không có flow "${name}". Dùng --list để xem danh sách.`);
  // eslint-disable-next-line @typescript-eslint/no-require-imports
  const flow: Flow = require(path.join(FLOWS_DIR, name)).default;
  // Flow dùng phiên đã lưu không cần mật khẩu; chỉ flow tự đăng nhập (bước secret) mới cần.
  const needsCredentials = flow.steps.some((s) => s.secret);
  const config = loadConfig(needsCredentials);
  const out = await runFlow(flow, config, { video: !args.includes("--no-video") });
  console.log(`OK: ${flow.name} -> ${path.relative(process.cwd(), out)}`);
}

main().catch((error) => {
  console.error(`LỖI: ${String(error?.message || error)}`);
  process.exit(2);
});
