# Personal profile (single page)

Static profile site for **Sebastien Alessandro Arokeum** — open `index.html` in a browser or deploy the folder to any static host.

## Local preview

```bash
open index.html
# or
python3 -m http.server 8080
# then visit http://localhost:8080
```

## Deploy

- **Netlify / Vercel**: drag and drop this folder, or connect a Git repo pointing at the repository root.
- **GitHub Pages**: enable Pages for the branch that contains `index.html` at repo root, or use the `docs/` folder with `index.html` inside it.

No build step is required.

## Contents

- `index.html` — profile (main page)
- `gallery.html` — full photo gallery
- `styles.css` — layout, themes, and gallery grid
- `assets/` — certificate thumbnails; `assets/photos/` — profile and lifestyle images
