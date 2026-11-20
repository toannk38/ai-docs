/**
 * Publish ảnh đã chụp vào website:
 *   npx tsx capture/publish.ts <flow> --page <page-id> [--steps 1,2,4] [--append]
 * capture/out/<flow>/step-XX.png (đã chọn, đánh số lại liên tục)
 *   -> html_docs/assets/images/screenshots/amazon-quick/<page-id>/step-XX.png
 * Ghi/thay mục của trang trong capture/out/manifest.json (ngày chụp, sha256, dung lượng).
 */
import crypto from "node:crypto";
import { execFileSync } from "node:child_process";
import fs from "node:fs";
import path from "node:path";

const ROOT = path.resolve(__dirname, "..");
const IMAGE_SUBDIR = "assets/images/screenshots/amazon-quick";
const PAGE_ID_RE = /^1[1-5](-\d+)?$/;

export interface ManifestFile {
  path: string;
  sha256: string;
  bytes: number;
}

export interface ManifestEntry {
  pageId: string;
  flow: string;
  capturedAt: string;
  files: ManifestFile[];
}

export interface PublishOptions {
  flow: string;
  pageId: string;
  steps?: number[];
  outRoot?: string;
  siteRoot?: string;
  /** Giữ ảnh đã publish của trang và đánh số tiếp (ghép ảnh từ nhiều flow vào một trang). */
  append?: boolean;
}

const pad = (n: number) => String(n).padStart(2, "0");

function optimizePng(file: string): void {
  // Nén không mất dữ liệu nếu máy có oxipng; không có thì giữ nguyên.
  try {
    execFileSync("oxipng", ["-q", "-o", "3", "--strip", "safe", file], { stdio: "ignore" });
  } catch {
    /* không có oxipng */
  }
}

export function publishImages(opts: PublishOptions): ManifestEntry {
  const outRoot = opts.outRoot ?? path.join(ROOT, "capture", "out");
  const siteRoot = opts.siteRoot ?? path.join(ROOT, "html_docs");
  if (!PAGE_ID_RE.test(opts.pageId)) throw new Error(`page-id phải là ASCII dạng 12-3 (nhận: "${opts.pageId}")`);
  const flowDir = path.join(outRoot, opts.flow);
  const meta = JSON.parse(fs.readFileSync(path.join(flowDir, "steps.json"), "utf8"));
  if (meta.status !== "ok") throw new Error(`Flow "${opts.flow}" có status "${meta.status}" — không publish.`);

  const available = fs.readdirSync(flowDir).filter((f) => /^step-\d+\.png$/.test(f)).sort();
  const chosen = opts.steps?.length ? opts.steps.map((n) => `step-${pad(n)}.png`) : available;
  for (const name of chosen) {
    if (!available.includes(name)) throw new Error(`Không có ${name} trong capture/out/${opts.flow}`);
  }

  const destDir = path.join(siteRoot, IMAGE_SUBDIR, opts.pageId);
  fs.mkdirSync(destDir, { recursive: true });
  const existing = fs.readdirSync(destDir).filter((f) => /^step-\d+\.png$/.test(f));
  if (!opts.append) for (const old of existing) fs.unlinkSync(path.join(destDir, old));
  const offset = opts.append ? existing.length : 0;

  const manifestPath = path.join(outRoot, "manifest.json");
  const manifest: ManifestEntry[] = fs.existsSync(manifestPath) ? JSON.parse(fs.readFileSync(manifestPath, "utf8")) : [];
  const previous = opts.append ? manifest.find((m) => m.pageId === opts.pageId)?.files ?? [] : [];

  const files: ManifestFile[] = chosen.map((name, i) => {
    const target = path.join(destDir, `step-${pad(offset + i + 1)}.png`);
    fs.copyFileSync(path.join(flowDir, name), target);
    optimizePng(target);
    const data = fs.readFileSync(target);
    return {
      path: `${IMAGE_SUBDIR}/${opts.pageId}/step-${pad(offset + i + 1)}.png`,
      sha256: crypto.createHash("sha256").update(data).digest("hex"),
      bytes: data.length,
    };
  });

  const entry: ManifestEntry = {
    pageId: opts.pageId,
    flow: opts.append && previous.length ? `${manifest.find((m) => m.pageId === opts.pageId)?.flow}+${opts.flow}` : opts.flow,
    capturedAt: meta.capturedAt,
    files: [...previous, ...files],
  };
  const next = [...manifest.filter((m) => m.pageId !== opts.pageId), entry].sort((a, b) => a.pageId.localeCompare(b.pageId));
  fs.writeFileSync(manifestPath, JSON.stringify(next, null, 2));
  return entry;
}

if (require.main === module) {
  const args = process.argv.slice(2);
  const flow = args[0];
  const pageId = args[args.indexOf("--page") + 1];
  const stepsArg = args.includes("--steps") ? args[args.indexOf("--steps") + 1] : "";
  if (!flow || !args.includes("--page")) {
    console.error("Cách dùng: npx tsx capture/publish.ts <flow> --page <page-id> [--steps 1,2,4]");
    process.exit(1);
  }
  try {
    const entry = publishImages({ flow, pageId, steps: stepsArg ? stepsArg.split(",").map(Number) : undefined, append: args.includes("--append") });
    console.log(`OK: ${entry.files.length} ảnh -> html_docs/${IMAGE_SUBDIR}/${pageId}/`);
  } catch (error) {
    console.error(`LỖI: ${(error as Error).message}`);
    process.exit(2);
  }
}
