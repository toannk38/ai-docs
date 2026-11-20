"use strict";

/** Hằng số và hàm dùng chung cho nội dung Amazon Quick. */

const SOURCE_DATE = "19/11/2026";
const AUDIENCE = "Người dùng NAB đã được cấp quyền Amazon Quick";
const OWNER = "Chủ biên / SME Amazon Quick";
const STATUS = "Đang sử dụng tại NAB";

const DOCS = {
  whatIs: ["AWS — What is Amazon Quick?", "https://docs.aws.amazon.com/quick/latest/userguide/what-is.html"],
  howWorks: ["AWS — How Amazon Quick works", "https://docs.aws.amazon.com/quick/latest/userguide/how-quicksuite-works.html"],
  signIn: ["AWS — Signing in to Amazon Quick", "https://docs.aws.amazon.com/quick/latest/userguide/signing-in.html"],
  security: ["AWS — Agentic security in Amazon Quick", "https://docs.aws.amazon.com/quick/latest/userguide/sec-agentic-security.html"],
  spaces: ["AWS — Working with Spaces", "https://docs.aws.amazon.com/quick/latest/userguide/spaces-overview.html"],
  spacesSharing: ["AWS — Managing Space members and permissions", "https://docs.aws.amazon.com/quick/latest/userguide/spaces-sharing.html"],
  agents: ["AWS — Creating custom Chat Agents", "https://docs.aws.amazon.com/quick/latest/userguide/chat-agents-create.html"],
  dataSources: ["AWS — Datasets and data sources", "https://docs.aws.amazon.com/quicksight/latest/user/working-with-data-sources.html"],
  analyses: ["AWS — Creating analyses and visuals", "https://docs.aws.amazon.com/quicksight/latest/user/creating-an-analysis.html"],
  dashboards: ["AWS — Publishing and sharing dashboards", "https://docs.aws.amazon.com/quicksight/latest/user/sharing-a-dashboard.html"],
  rls: ["AWS — Row-level security (RLS)", "https://docs.aws.amazon.com/quicksight/latest/user/restrict-access-to-a-data-set-using-row-level-security.html"],
  scenarios: ["AWS — Scenarios", "https://docs.aws.amazon.com/quicksight/latest/user/scenarios.html"],
  research: ["AWS — Quick Research", "https://docs.aws.amazon.com/quicksight/latest/user/quicksight-research.html"],
  flows: ["AWS — Using Amazon Quick Flows", "https://docs.aws.amazon.com/quick/latest/userguide/using-amazon-quick-flows.html"],
  schedules: ["AWS — Schedules in Quick Flows", "https://docs.aws.amazon.com/quick/latest/userguide/schedules-in-quick-flows.html"],
  automate: ["AWS — Using Amazon Quick Automate", "https://docs.aws.amazon.com/quick/latest/userguide/using-amazon-quick-automate.html"],
  spice: ["AWS — SPICE", "https://docs.aws.amazon.com/quick/latest/userguide/spice.html"],
  prepareData: ["AWS — Preparing data (dataset)", "https://docs.aws.amazon.com/quick/latest/userguide/preparing-data.html"],
  refresh: ["AWS — Refreshing SPICE data", "https://docs.aws.amazon.com/quick/latest/userguide/refreshing-imported-data.html"],
  datasetSharing: ["AWS — Sharing datasets", "https://docs.aws.amazon.com/quick/latest/userguide/sharing-data-sets.html"],
  analysisWork: ["AWS — Working with an analysis", "https://docs.aws.amazon.com/quick/latest/userguide/working-with-an-analysis.html"],
  dashboardWork: ["AWS — Working with dashboards", "https://docs.aws.amazon.com/quick/latest/userguide/working-with-dashboards.html"],
  dashboardQa: ["AWS — Dashboard data Q&A", "https://docs.aws.amazon.com/quick/latest/userguide/dashboard-qa.html"],
  dashboardAccess: ["AWS — Granting access to a dashboard", "https://docs.aws.amazon.com/quick/latest/userguide/share-a-dashboard-grant-access-users.html"],
  exportDashboard: ["AWS — Exporting and printing dashboards", "https://docs.aws.amazon.com/quick/latest/userguide/export-or-print-dashboard.html"],
  topics: ["AWS — Topics", "https://docs.aws.amazon.com/quick/latest/userguide/topics.html"],
  scenariosData: ["AWS — Adding data to a scenario", "https://docs.aws.amazon.com/quick/latest/userguide/scenarios-data.html"],
  flowTerms: ["AWS — Quick Flows terminology and key concepts", "https://docs.aws.amazon.com/quick/latest/userguide/terminology-and-key-concepts.html"],
  flowVersions: ["AWS — Flow versioning", "https://docs.aws.amazon.com/quick/latest/userguide/versioning.html"],
  flowSharing: ["AWS — Sharing flows", "https://docs.aws.amazon.com/quick/latest/userguide/sharing-flows.html"],
  apps: ["AWS — Apps in Quick", "https://docs.aws.amazon.com/quick/latest/userguide/using-amazon-quick-apps.html"],
  appsData: ["AWS — Connecting datasets to apps", "https://docs.aws.amazon.com/quick/latest/userguide/connecting-datasets-apps.html"],
  automateVsFlows: ["AWS — Choosing Quick Flows or Quick Automate", "https://docs.aws.amazon.com/quick/latest/userguide/using-amazon-quick-automations.html"],
  automateHitl: ["AWS — Human-in-the-loop Task Center", "https://docs.aws.amazon.com/quick/latest/userguide/hitl-task-center.html"],
};

/** Thuộc tính chung của mọi trang Quick. */
function base(fields) {
  return {
    group: "Amazon Quick",
    eyebrow: `Amazon Quick · ${STATUS}`,
    kind: "live",
    statusLabel: STATUS,
    audience: AUDIENCE,
    owner: OWNER,
    sourceDate: SOURCE_DATE,
    skipNormalize: true,
    walkthroughs: [],
    ...fields,
  };
}

const group = (fields) => base({ pageType: "group", ...fields });

const task = (fields) => base({ pageType: "task", ...fields });

/** Ảnh đã publish: assets/images/screenshots/amazon-quick/<page>/step-NN.png */
function fig(page, n, alt, caption) {
  return { src: `assets/images/screenshots/amazon-quick/${page}/step-${String(n).padStart(2, "0")}.png`, alt, caption };
}

module.exports = { SOURCE_DATE, AUDIENCE, OWNER, STATUS, DOCS, base, group, task, fig };
