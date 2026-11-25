# Wild Atta

Website for Wild Atta, a cottage bakery in Gilroy, California. One page, no cart, built with
[Eleventy](https://www.11ty.dev/) and deployed to GitHub Pages.

## Preview locally

You need [Node.js](https://nodejs.org/) 20 or newer.

```sh
npm install     # once
npm start       # dev server at http://localhost:8080, reloads when you save
npm run build   # writes the finished site to _site/
```

`npm start` rebuilds and refreshes the browser whenever you change a file in `src/`.

## Where things are

| Path | What it is |
|---|---|
| `src/_data/thisWeek.yml` | The weekly update: this week's bakes, a note, pickup, and an optional market. Edit this each week. |
| `src/_data/site.js` | All the copy: bakes, process steps, pickup and delivery, footer. Edit text here. |
| `src/index.njk` | The page markup. |
| `src/_includes/` | The base layout and the placeholder macros. |
| `src/assets/css/site.css` | The one stylesheet. Design tokens first, then the site styles. |
| `src/assets/fonts/` | Self-hosted fonts, with their licences. |
| `src/assets/img/` | Logo and favicon. Put real photos here. |

## Weekly updates

Everything that changes week to week lives in `src/_data/thisWeek.yml`, with comments
explaining each field. You can edit it from a phone, no code needed:

1. In the GitHub app or github.com, open the repository, then `src/_data/thisWeek.yml`, and tap
   the pencil (Edit).
2. Change the words between the quote marks. Set `soldOut: true` on a bake that is gone, fill in
   `announcement` or `pickup` for one-off news, or set `market.show` to `true` and fill in the
   market details to show a Market card in "Where to find me".
3. Choose **Commit changes**, pick **Create a new branch** and then **Propose changes**, and open
   the pull request. `main` is protected, so changes arrive by pull request.
4. Wait for the checks to go green, then merge. The site updates within a minute or two.

Empty fields and sections that are switched off do not appear on the page. Keep the quote
marks and the indentation as they are; if a check fails after an edit, a quote mark or
indent is the usual cause.

## Placeholders

The page still has invented copy and no photography. While `showPlaceholders` is `true` in
`src/_data/site.js`, placeholder text gets a dotted underline, photo slots are hatched boxes, and
a draft note shows at the top. Replace the content, then set `showPlaceholders` to `false`.
Things to confirm before launch: the Cottage Food permit number and the county's required
wording, pickup days and hours, delivery radius and fee, contact address, and
the weekly bake list.

## Deploying

Pushing to `main` runs `.github/workflows/pages.yml`, which builds the site and publishes it.
In the repository settings, set Pages to use **GitHub Actions** as its source.

Links and asset paths are relative, so the site works at `https://<user>.github.io/wildatta/`
without extra configuration.

## Design

Colours, type and spacing come from the Wild Atta Design System tokens. The logo roundel has
known defects (a doubled A in the curved tagline), so it is used large in the hero and small in
the header and footer only until a clean vector exists.

## Checks and analytics

- `npm run check` builds the site, then runs `scripts/check-site.mjs`: axe-core accessibility checks (WCAG 2.2 AA) at phone and desktop widths, a no-sideways-scroll check, a no-unexpected-third-party check, and file-size budgets. It runs on every pull request and before every deploy. Locally, install a browser once with `npx playwright install chromium`.
- Visitor stats use Cloudflare Web Analytics (cookieless, no consent banner). Set `analytics.cloudflareToken` in `src/_data/site.js`; while it is empty, no analytics script is added.
