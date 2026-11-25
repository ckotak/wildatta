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
| `src/_data/site.js` | All the copy: bakes, process steps, pickup and delivery, footer. Edit text here. |
| `src/index.njk` | The page markup. |
| `src/_includes/` | The base layout and the placeholder macros. |
| `src/assets/css/site.css` | The one stylesheet. Design tokens first, then the site styles. |
| `src/assets/fonts/` | Self-hosted fonts, with their licences. |
| `src/assets/img/` | Logo and favicon. Put real photos here. |

## Placeholders

The page still has invented copy and no photography. While `showPlaceholders` is `true` in
`src/_data/site.js`, placeholder text gets a dotted underline, photo slots are hatched boxes, and
a draft note shows at the top. Replace the content, then set `showPlaceholders` to `false`.
Things to confirm before launch: the Cottage Food permit number and the county's required
wording, pickup days and hours, delivery radius and fee, market schedule, contact address, and
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
