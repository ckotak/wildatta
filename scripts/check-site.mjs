// Checks the built site (_site/) for accessibility and speed problems.
// Run `npm run build` first, or just `npm run check` which does both.
// Accessibility: axe-core (WCAG 2.x A/AA + best practices) in headless Chromium,
// at phone and desktop widths. Speed: simple size budgets on the built files.
import http from "node:http";
import { readFileSync, readdirSync, statSync, existsSync } from "node:fs";
import { join, extname, resolve } from "node:path";
import { chromium } from "playwright";

const root = resolve("_site");
if (!existsSync(root)) {
  console.error("No _site/ folder. Run `npm run build` first.");
  process.exit(1);
}

const types = { ".html": "text/html", ".css": "text/css", ".js": "text/javascript", ".webp": "image/webp", ".jpg": "image/jpeg", ".png": "image/png", ".svg": "image/svg+xml", ".woff2": "font/woff2", ".webmanifest": "application/manifest+json", ".ico": "image/x-icon" };
const server = http.createServer((req, res) => {
  let path = decodeURIComponent(new URL(req.url, "http://x").pathname);
  if (path.endsWith("/")) path += "index.html";
  const file = join(root, path);
  if (!file.startsWith(root) || !existsSync(file) || !statSync(file).isFile()) {
    res.writeHead(404).end();
    return;
  }
  res.writeHead(200, { "content-type": types[extname(file)] || "application/octet-stream" });
  res.end(readFileSync(file));
});
await new Promise((r) => server.listen(0, "127.0.0.1", r));
const base = `http://127.0.0.1:${server.address().port}`;

let failures = 0;
const fail = (msg) => { failures++; console.error(`FAIL  ${msg}`); };

// ---- Speed budgets (bytes, uncompressed) ----
const KB = 1024;
const budgets = { ".html": 80 * KB, ".css": 60 * KB, ".js": 30 * KB, ".webp": 150 * KB, ".jpg": 200 * KB, ".png": 120 * KB, ".woff2": 90 * KB };
(function walk(dir) {
  for (const name of readdirSync(dir)) {
    const p = join(dir, name);
    if (statSync(p).isDirectory()) { walk(p); continue; }
    const limit = budgets[extname(p)];
    const size = statSync(p).size;
    if (limit && size > limit) fail(`${p.slice(root.length + 1)} is ${(size / KB).toFixed(0)} KB, over its ${limit / KB} KB budget`);
  }
})(root);

// ---- Accessibility + runtime checks ----
const axeSource = readFileSync(resolve("node_modules/axe-core/axe.min.js"), "utf8");
const browser = await chromium.launch({ executablePath: process.env.CHROMIUM_PATH || undefined });
const sizes = [{ name: "phone", width: 375, height: 800 }, { name: "desktop", width: 1280, height: 900 }];
for (const size of sizes) {
  const page = await browser.newPage({ viewport: size });
  const external = new Set();
  page.on("request", (r) => { const u = new URL(r.url()); if (u.origin !== base) external.add(u.origin); });
  await page.goto(`${base}/`, { waitUntil: "networkidle" });
  await page.addScriptTag({ content: axeSource });
  const { violations } = await page.evaluate(() =>
    axe.run(document, { runOnly: { type: "tag", values: ["wcag2a", "wcag2aa", "wcag21a", "wcag21aa", "wcag22aa", "best-practice"] } }));
  for (const v of violations) {
    fail(`[${size.name}] ${v.id} (${v.impact}): ${v.help}\n      ${v.nodes.slice(0, 3).map((n) => n.target.join(" ")).join("\n      ")}`);
  }
  // No horizontal scrolling on phones.
  const overflow = await page.evaluate(() => document.documentElement.scrollWidth - window.innerWidth);
  if (overflow > 0) fail(`[${size.name}] page scrolls sideways by ${overflow}px`);
  // The only third-party host allowed is Cloudflare's analytics beacon.
  for (const origin of external) if (origin !== "https://static.cloudflareinsights.com") fail(`[${size.name}] unexpected third-party request to ${origin}`);
  await page.close();
}
await browser.close();
server.close();

if (failures) { console.error(`\n${failures} problem(s) found.`); process.exit(1); }
console.log("Accessibility and speed checks passed.");
