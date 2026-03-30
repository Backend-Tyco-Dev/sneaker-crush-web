# AdSense re-review and Search Console validation

Do this **after** deploying a build that includes content and technical changes, and **after** the live site has had time to stabilize (often weeks).

## Before requesting review in AdSense

1. Deploy `dist/site/` to production (same host as `https://thesneakercrush.com`).
2. Confirm **prerendered routes** resolve: open these paths and ensure the server returns the matching `index.html` (not always the homepage):
   - `/`, `/news`, `/releases`, `/catalog`, `/about`, `/contact`, `/privacy`, `/terms`
3. See [STATIC_HOSTING.md](./STATIC_HOSTING.md) if `/news` or other paths 404 on the server.

## Google Search Console

1. Add/verify the property if needed.
2. Use **URL Inspection** on:
   - Homepage
   - One news article URL
   - One release URL
3. Confirm **Rendered HTML** shows meaningful text (not only an empty `#app` shell for those URLs after JS).

## AdSense

1. In AdSense, confirm site ownership remains verified.
2. When editorial and technical work are reflected on the **live** site, use **Request review** and confirm you have addressed policy feedback.

## Optional

- Temporarily reduce non-essential third-party scripts during review (business decision).
- Re-run URL Inspection after major template or content changes.
