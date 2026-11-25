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
