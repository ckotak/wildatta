# AGENTS.md

Guidance for AI coding agents working in this repository.

## Project

Wild Atta is the website for a cottage bakery. It is a static site:

- Plain HTML and CSS, with minimal client-side JavaScript only where it is truly needed.
- No framework, bundler or build step. Files are served as they are in the repo.
- Hosted on GitHub Pages.

## Working on the site

- Keep it simple and dependency-free. Prefer native HTML and CSS features over libraries.
- Use relative links and asset paths so the site works on GitHub Pages.
- Make pages responsive and mobile-first; many customers will browse on a phone.
- Treat accessibility and performance as requirements: semantic HTML, alt text on every
  image, good color contrast, and optimized images.

## Modern web guidance skill

This repo includes Google Chrome's **Modern Web Guidance** skill at
`.claude/skills/modern-web-guidance/` (see `SOURCE.md` there for origin and license).

Before writing or changing any HTML, CSS or client-side JavaScript, follow that skill's
`SKILL.md`: search for the relevant guide, retrieve it, and apply it. It runs through
`npx -y modern-web-guidance@latest …` and needs network access. The full guide library is
also available offline in `.claude/skills/modern-web-guidance/guides/`.

Agents that don't load skills automatically should read
`.claude/skills/modern-web-guidance/SKILL.md` directly.

## Never commit (this repo is public)

Everything committed here, including history and every branch and PR, is world-readable and
effectively permanent. Do not add any of the following, even temporarily:

- **Secrets:** API keys, tokens, passwords, `.env` files, private keys or certificates.
- **Personal data:** the owner's personal phone number, home address, personal email, or
  anyone's customer details (orders, names, messages). Pickup addresses are shared privately
  with customers, never in the repo. Only use contact details Chetan has explicitly said to
  publish, and prefer a dedicated bakery email address.
- **Unlicensed assets:** fonts, photos, icons or text without a license that allows
  publishing. Every font/image must have a known source and license (keep the license file
  beside it). Do not use stock photos unless the license is recorded.
- **Design system source:** the `Wild Atta Design System.zip` and other project files are
  reference only. Copy only the specific tokens and optimized assets the site needs; never
  commit the zip, source files (PSD, Figma, AI) or unoptimized originals.
- **Photo metadata:** strip EXIF (especially GPS location) from every photo before adding it.
- **Real permit numbers and legal details** unless Chetan has confirmed they are public.

If you notice something sensitive already committed, stop and tell Chetan. Do not rewrite
history or force-push on your own, and note that deleting it in a new commit does not remove it.

Run `sh scripts/setup-hooks.sh` in a fresh clone. The hooks and the CI *Security checks*
workflow enforce part of this, but they can't catch personal data or license problems, so
review your own diff before committing.
