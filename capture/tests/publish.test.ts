/**
 * Publish ảnh từ capture/out/<flow>/ vào html_docs/assets/images/screenshots/amazon-quick/<page-id>/.
 *   npx tsx --test capture/tests/publish.test.ts
 */
import test from "node:test";
import assert from "node:assert/strict";
import crypto from "node:crypto";
import fs from "node:fs";
import os from "node:os";
import path from "node:path";
import { publishImages } from "../publish";

function setup(status: "ok" | "failed" = "ok") {
  const base = fs.mkdtempSync(path.join(os.tmpdir(), "pub-"));
  const outRoot = path.join(base, "out");
  const siteRoot = path.join(base, "site");
  const flowDir = path.join(outRoot, "demo");
  fs.mkdirSync(flowDir, { recursive: true });
  for (const n of [1, 2, 3]) fs.writeFileSync(path.join(flowDir, `step-0${n}.png`), `png-${n}`);
  fs.writeFileSync(path.join(flowDir, "steps.json"), JSON.stringify({ flow: "demo", status, capturedAt: "2026-11-20T01:00:00.000Z" }));
  return { outRoot, siteRoot };
}

const dest = (siteRoot: string, pageId: string) => path.join(siteRoot, "assets/images/screenshots/amazon-quick", pageId);

test("selected steps are renumbered consecutively", () => {
  const { outRoot, siteRoot } = setup();
  publishImages({ flow: "demo", pageId: "12-3", steps: [1, 3], outRoot, siteRoot });
  assert.deepEqual(fs.readdirSync(dest(siteRoot, "12-3")).sort(), ["step-01.png", "step-02.png"]);
  assert.equal(fs.readFileSync(path.join(dest(siteRoot, "12-3"), "step-02.png"), "utf8"), "png-3");
});

test("without steps every screenshot is published in order", () => {
  const { outRoot, siteRoot } = setup();
  publishImages({ flow: "demo", pageId: "11-2", outRoot, siteRoot });
  assert.deepEqual(fs.readdirSync(dest(siteRoot, "11-2")).sort(), ["step-01.png", "step-02.png", "step-03.png"]);
});

test("republishing removes stale step files", () => {
  const { outRoot, siteRoot } = setup();
  publishImages({ flow: "demo", pageId: "12-3", outRoot, siteRoot });
  publishImages({ flow: "demo", pageId: "12-3", steps: [2], outRoot, siteRoot });
  assert.deepEqual(fs.readdirSync(dest(siteRoot, "12-3")), ["step-01.png"]);
});

test("page id must be ASCII like 12-3", () => {
  const { outRoot, siteRoot } = setup();
  for (const bad of ["12 3", "chương-12", "12.3", "9-1"]) {
    assert.throws(() => publishImages({ flow: "demo", pageId: bad, outRoot, siteRoot }), /page-id/);
  }
});

test("failed capture is not published", () => {
  const { outRoot, siteRoot } = setup("failed");
  assert.throws(() => publishImages({ flow: "demo", pageId: "12-3", outRoot, siteRoot }), /status/);
  assert.equal(fs.existsSync(dest(siteRoot, "12-3")), false);
});

test("missing step number is rejected", () => {
  const { outRoot, siteRoot } = setup();
  assert.throws(() => publishImages({ flow: "demo", pageId: "12-3", steps: [4], outRoot, siteRoot }), /step-04/);
});

test("manifest records sha256 and replaces the entry of the same page", () => {
  const { outRoot, siteRoot } = setup();
  publishImages({ flow: "demo", pageId: "12-3", outRoot, siteRoot });
  const entry = publishImages({ flow: "demo", pageId: "12-3", steps: [1], outRoot, siteRoot });
  const manifest = JSON.parse(fs.readFileSync(path.join(outRoot, "manifest.json"), "utf8"));
  assert.equal(manifest.length, 1);
  assert.equal(entry.capturedAt, "2026-11-20T01:00:00.000Z");
  assert.equal(entry.files[0].path, "assets/images/screenshots/amazon-quick/12-3/step-01.png");
  assert.equal(entry.files[0].sha256, crypto.createHash("sha256").update("png-1").digest("hex"));
  assert.equal(entry.files[0].bytes, 5);
});

test("append mode keeps existing images and continues numbering", () => {
  const { outRoot, siteRoot } = setup();
  publishImages({ flow: "demo", pageId: "11-1", steps: [1, 2], outRoot, siteRoot });
  const entry = publishImages({ flow: "demo", pageId: "11-1", steps: [3], outRoot, siteRoot, append: true });
  assert.deepEqual(fs.readdirSync(dest(siteRoot, "11-1")).sort(), ["step-01.png", "step-02.png", "step-03.png"]);
  assert.equal(fs.readFileSync(path.join(dest(siteRoot, "11-1"), "step-03.png"), "utf8"), "png-3");
  const manifest = JSON.parse(fs.readFileSync(path.join(outRoot, "manifest.json"), "utf8"));
  assert.equal(manifest.find((m: { pageId: string }) => m.pageId === "11-1").files.length, 3);
  assert.equal(entry.files.length, 3);
});
