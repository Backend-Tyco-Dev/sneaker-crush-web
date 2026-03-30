# Static hosting and prerendered routes

Production builds output static files under `dist/site/`. The webpack step **prerenders** key routes unless `SKIP_PRERENDER=1` is set (see `npm run build:no-prerender`).

Prerender creates **per-route** HTML, for example:

- `dist/site/index.html` → `/`
- `dist/site/news/index.html` → `/news`
- `dist/site/releases/index.html` → `/releases`
- (same pattern for `/catalog`, `/about`, `/contact`, `/privacy`, `/terms`)

## Web server

Configure the server so each path serves the correct file. For **nginx**, a common pattern is:

```nginx
location / {
  try_files $uri $uri/ /index.html;
}
```

With `try_files`, a request to `/news` should resolve to `/news/index.html` when that file exists.

If you only serve `index.html` at the document root, deep links like `/news` may incorrectly return the homepage HTML—fix server config before relying on prerender for SEO.

## CI without Chrome / Puppeteer

If `npm run build` fails during prerender (e.g. no Chromium in the environment), use:

```bash
npm run build:no-prerender
```

You lose per-route prerendered HTML in that artifact; prefer full `npm run build` on a machine that can run Puppeteer for production releases.
