/**
 * Cấu hình phiên reader (toannk2_reader).
 *   npx tsx --test capture/tests/config.test.ts
 * Biến môi trường đặt trước khi nạp config: dotenv không ghi đè biến đã có, nên test không dùng giá trị thật trong .env.
 */
import test from "node:test";
import assert from "node:assert/strict";

process.env.QUICK_START_URL = "https://d-0000000000.awsapps.com/start";
process.env.QUICK_APP_URL = "https://us-east-1.quicksight.aws.amazon.com/sn/account/nab-quick-poc/start";
process.env.QUICK_ACCOUNT_NAME = "nab-quick-poc";
process.env.AWS_REGION = "us-east-1";
process.env.QUICK_USERNAME = "main-user";
process.env.QUICK_READER_USERNAME = "reader-user";
process.env.QUICK_READER_PASSWORD = "reader-pass";

// eslint-disable-next-line @typescript-eslint/no-require-imports
const { loadConfig, READER_AUTH_FILE, AUTH_FILE } = require("../lib/config");

test("reader config exposes reader credentials and keeps main username for masking", () => {
  const config = loadConfig(false, "reader");
  assert.equal(config.readerUsername, "reader-user");
  assert.equal(config.readerPassword, "reader-pass");
  assert.equal(config.username, "main-user");
});

test("reader session uses its own auth file", () => {
  assert.notEqual(READER_AUTH_FILE, AUTH_FILE);
  assert.match(READER_AUTH_FILE, /auth-reader\.json$/);
});

test("reader config requires reader credentials", () => {
  const saved = process.env.QUICK_READER_PASSWORD;
  process.env.QUICK_READER_PASSWORD = "";
  try {
    assert.throws(() => loadConfig(false, "reader"), /QUICK_READER_PASSWORD/);
  } finally {
    process.env.QUICK_READER_PASSWORD = saved;
  }
});
