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

- Edit content in [index.html](index.html) sections: Home, About, Projects, Contact.
- Tweak styles in [src/styles.css](src/styles.css).
- TypeScript interactions live in [src/main.ts](src/main.ts).

## Deploy (GitHub Pages)

For a user site repo like `username.github.io`, you can build and push the `dist` folder to the `main` branch:

```bash
npm run build
```

Commit and push the contents of the repository. GitHub Pages will serve from the root of `main`.

If you prefer a `gh-pages` branch, you can publish `dist` there. Many workflows exist; feel free to ask and we'll set up an action.