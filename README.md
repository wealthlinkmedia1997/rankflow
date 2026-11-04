# RankFlow – landing site

Static 2-page site for RankFlow, the all-in-one SEO platform for agencies. No build step.

| File | Purpose |
|---|---|
| `index.html` | Opt-in page. **Get Instant Access** opens a name + email form, POSTs to `LEAD_WEBHOOK_URL`, then redirects to `main.html` |
| `main.html` | RankFlow page. **Get RankFlow Access** uses `RANKFLOW_URL`. **Book a RankFlow Demo** uses `DEMO_URL` |
| `privacy.html`, `terms.html` | Legal pages (linked in every footer) |
| `support.html` | RankFlow help and demo requests (linked in every header and footer; default `DEMO_URL`) |
| `js/config.js` | **All settings**: `LEAD_WEBHOOK_URL`, `RANKFLOW_URL`, `DEMO_URL`, `SUPPORT_URL`, pixel IDs, contact email, video reviews |

`RANKFLOW_URL` is `#` until the signup link is ready. `LEAD_WEBHOOK_URL` is blank until the webhook is pasted in. An empty webhook skips the POST and still redirects to `main.html`.

## Swapping assets
- Client result screenshots: `assets/results/{melissa,bilal,kaden,adelina}.jpg` plus `.webp` (about 900px wide, native aspect ratios, shown uncropped, click to zoom). Order on the page: Melissa, Kaden, Bilal, Adelina. Desktop columns: left Melissa then Bilal, right Kaden then Adelina.
- Video review: `assets/videos/review-1.mp4` + `review-1.jpg`. Second review: add `review-2.mp4/.jpg` and edit the 2nd entry of `REVIEW_VIDEOS` in `js/config.js`.
- Founder photo: `assets/andre.jpg` (about section on `main.html`).
- Logo: `assets/logo.webp` with `assets/logo.png` fallback. Favicon: `assets/favicon.png`.
