# lfiysoudui.github.io

A minimal personal website scaffold using Vite and TypeScript.

## Scripts

- **Dev:** Start local server

```bash
npm run dev
```

- **Build:** Generate static assets in `dist`

```bash
npm run build
```

- **Preview:** Serve the production build locally

```bash
npm run preview
```

## Customize

- Edit content in [index.html](index.html) sections: Home, About, Research, Mini Projects, Experience, Skills, Contact.
- Tweak styles in [src/styles.css](src/styles.css).
- TypeScript interactions live in [src/main.ts](src/main.ts).

## Research links

Each research card in [index.html](index.html) has **Full paper**, **PDF** and **Video** buttons. Fill in a button's `href` to show it; buttons with an empty `href` are hidden.

- External links (DOI, ACM DL, YouTube, …): paste the URL.
- Your own files: put them in `public/research/` and link them as `research/<file>`, e.g. `href="research/elderplay.pdf"`.

## Deploy (GitHub Pages)

Pushing to `main` runs [.github/workflows/deploy.yml](.github/workflows/deploy.yml), which builds the site and publishes `dist/` to GitHub Pages.

One-time setup: in the repo's **Settings → Pages**, set **Source** to **GitHub Actions**.
