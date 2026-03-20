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
3. Push to `main` (or run the workflow manually under **Actions**). The workflow [`.github/workflows/deploy-pages.yml`](.github/workflows/deploy-pages.yml) publishes `index.html`, `gallery.html`, CSS/JS, and `assets/` only.
4. The first run may ask you to **approve** the `github-pages` environment (Settings → Environments → github-pages).

No build toolchain is required—only a small “assemble” step in the workflow.

## Other hosts

- **Netlify / Vercel**: drag and drop this folder, or connect the Git repo; use repository root as the publish directory.

## Contents

- `index.html` — profile (main page)
- `gallery.html` — full photo gallery
- `styles.css` — layout, themes, and gallery grid
- `assets/` — certificate thumbnails; `assets/photos/` — profile and lifestyle images
