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

- Edit content in [index.html](index.html) sections: Home, About, Projects, Mini Projects, Contact.
- Tweak styles in [src/styles.css](src/styles.css).
- TypeScript interactions live in [src/main.ts](src/main.ts).

## Deploy (GitHub Pages)

Pushing to `main` runs [.github/workflows/deploy.yml](.github/workflows/deploy.yml), which builds the site and publishes `dist/` to GitHub Pages.

One-time setup: in the repo's **Settings → Pages**, set **Source** to **GitHub Actions**.
