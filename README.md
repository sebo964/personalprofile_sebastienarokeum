# Personal profile (single page)

Static profile site for **Sebastien Alessandro Arokeum** — open `index.html` in a browser or deploy the folder to any static host.

**Repository:** [github.com/sebo964/personalprofile_sebastienarokeum](https://github.com/sebo964/personalprofile_sebastienarokeum)

## Local preview

```bash
open index.html
# or
python3 -m http.server 8080
# then visit http://localhost:8080
```

## GitHub Pages (recommended for this repo)

**Live URL (after setup):** [https://sebo964.github.io/personalprofile_sebastienarokeum/](https://sebo964.github.io/personalprofile_sebastienarokeum/)

1. In the repo on GitHub, open **Settings → Pages**.
2. Under **Build and deployment**, set **Source** to **GitHub Actions** (not “Deploy from a branch”).
3. Push to `main` (or run the workflow manually under **Actions**). The workflow [`.github/workflows/deploy-pages.yml`](.github/workflows/deploy-pages.yml) publishes `index.html`, `gallery.html`, CSS/JS (`theme-init.js`, `version.js`), and `assets/` only.
4. The first run may ask you to **approve** the `github-pages` environment (Settings → Environments → github-pages).

No build toolchain is required—only a small “assemble” step in the workflow.

## Other hosts

- **Netlify / Vercel**: drag and drop this folder, or connect the Git repo; use repository root as the publish directory.

## Versioning

- **Source of truth:** [`version.js`](version.js) — set `window.__SITE_VERSION__` to a [semver](https://semver.org/) string (e.g. `1.0.0`, `1.1.0`).
- The **sidebar** (bottom of the menu rail) shows a subtle **`v1.0.0`**-style label on both pages (via `theme-init.js`).
- Optional: create matching **git tags** after releases, e.g. `git tag v1.0.0 && git push origin v1.0.0`.

## Contents

- `index.html` — profile (main page)
- `gallery.html` — full photo gallery
- `styles.css` — layout, themes, and gallery grid
- `theme-init.js` — themes, drawer, section label
- `version.js` — public semver (footer + `data-site-version` on `<html>`)
- `assets/` — certificate thumbnails; `assets/photos/` — profile and lifestyle images
