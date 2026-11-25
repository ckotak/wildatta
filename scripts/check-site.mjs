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
    // Like GitHub Pages: unknown addresses get 404.html with a 404 status.
    const page404 = join(root, "404.html");
    if (existsSync(page404)) res.writeHead(404, { "content-type": "text/html" }).end(readFileSync(page404));
    else res.writeHead(404).end();
    return;
  }
  res.writeHead(200, { "content-type": types[extname(file)] || "application/octet-stream" });
  res.end(readFileSync(file));
});
await new Promise((r) => server.listen(0, "127.0.0.1", r));
const base = `http://127.0.0.1:${server.address().port}`;

const analyticsOrigins = new Set(["https://static.cloudflareinsights.com", "https://cloudflareinsights.com"]);
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
// The 404 page is served at whatever address is missing, so it is checked at a deep path too.
const pages = [{ label: "home", path: "/" }, { label: "404", path: "/no/such/loaf/" }];
for (const pg of pages) for (const size of sizes) {
  const page = await browser.newPage({ viewport: size });
  const external = new Set();
  page.on("request", (r) => { const u = new URL(r.url()); if (u.origin !== base) external.add(u.origin); });
  const response = await page.goto(`${base}${pg.path}`, { waitUntil: "networkidle" });
  if (response.status() !== (pg.label === "404" ? 404 : 200)) fail(`[${pg.label} ${size.name}] unexpected status ${response.status()}`);
  await page.addScriptTag({ content: axeSource });
  const { violations } = await page.evaluate(() =>
    axe.run(document, { runOnly: { type: "tag", values: ["wcag2a", "wcag2aa", "wcag21a", "wcag21aa", "wcag22aa", "best-practice"] } }));
  for (const v of violations) {
    fail(`[${pg.label} ${size.name}] ${v.id} (${v.impact}): ${v.help}\n      ${v.nodes.slice(0, 3).map((n) => n.target.join(" ")).join("\n      ")}`);
  }
  // No horizontal scrolling on phones.
  const overflow = await page.evaluate(() => document.documentElement.scrollWidth - window.innerWidth);
  if (overflow > 0) fail(`[${pg.label} ${size.name}] page scrolls sideways by ${overflow}px`);
  // The only third-party hosts allowed are Cloudflare's analytics beacon and its report endpoint.
  for (const origin of external) if (!analyticsOrigins.has(origin)) fail(`[${pg.label} ${size.name}] unexpected third-party request to ${origin}`);
  // Keyboard: every link must show a focus ring and must not hide under the sticky header.
  const stops = await page.evaluate(async () => {
    const out = [];
    const header = document.querySelector(".site-header");
    for (const el of document.querySelectorAll("a[href], button, input, select, textarea, summary, [tabindex]")) {
      el.focus({ preventScroll: false });
      await new Promise((r) => requestAnimationFrame(() => r()));
      const cs = getComputedStyle(el);
      const ring = (cs.outlineStyle !== "none" && parseFloat(cs.outlineWidth) > 0) || cs.boxShadow !== "none";
      const top = el.getBoundingClientRect().top;
      const hidden = !el.classList.contains("skip-link") && header && !header.contains(el) && top < header.getBoundingClientRect().bottom;
      out.push({ name: (el.textContent || el.tagName).trim().slice(0, 40), ring, hidden });
    }
    return out;
  });
  for (const stop of stops) {
    if (!stop.ring) fail(`[${pg.label} ${size.name}] "${stop.name}" shows no focus indicator`);
    if (stop.hidden) fail(`[${pg.label} ${size.name}] "${stop.name}" is hidden under the sticky header when focused`);
  }
  await page.close();
}
// Reflow at 320px wide (WCAG 1.4.10): no sideways scrolling.
{
  const page = await browser.newPage({ viewport: { width: 320, height: 640 } });
  for (const path of ["/", "/no/such/loaf/"]) {
  await page.goto(`${base}${path}`, { waitUntil: "networkidle" });
  const overflow = await page.evaluate(() => document.documentElement.scrollWidth - window.innerWidth);
  if (overflow > 0) fail(`[320px ${path}] page scrolls sideways by ${overflow}px`);
  }
  await page.close();
}
await browser.close();
server.close();

if (failures) { console.error(`\n${failures} problem(s) found.`); process.exit(1); }
console.log("Accessibility and speed checks passed.");
