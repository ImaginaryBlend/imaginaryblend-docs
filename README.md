# Fluid Flux Documentation

Source of the documentation for [Fluid Flux](https://www.fab.com/listings/196c70cd-1283-4249-bf6b-c3019d1cbe11), a real-time water system for Unreal Engine by Imaginary Blend.

**Website:** https://imaginaryblend.github.io/imaginaryblend-docs/

The site is built with [VitePress](https://vitepress.dev) and published to GitHub Pages automatically on every push to `main`.

## Running locally

Requires [Node.js](https://nodejs.org) 20 or newer.

```bash
npm install
npm run docs:dev
```

Open http://localhost:5173/imaginaryblend-docs/. On Windows you can also double-click `start-docs.bat`.

| Command | Description |
| --- | --- |
| `npm run docs:dev` | Live preview |
| `npm run docs:build` | Production build (a missing image stops the build) |
| `npm run check` | Lists images and videos that are linked but missing |
| `npm run assets` | Downloads media still linked from the old imaginaryblend.com site |

## Structure

| Path | Content |
| --- | --- |
| `docs/index.md`, `docs/product/`, `docs/purchase/`, `docs/updates/` | Product pages, license and release notes |
| `docs/getting-started/`, `docs/core-systems/`, `docs/compatibility/`, `docs/help/` | Documentation |
| `docs/public/images/` | Images and videos |
| `docs/.vitepress/config.mjs` | Menu, navigation and site settings |
| `docs/.vitepress/theme/` | Theme styles, components and scripts |
| `scripts/` | Helper scripts |

## Editing

- Pages are Markdown files in `docs/`. A new page also needs an entry in the sidebar in `docs/.vitepress/config.mjs`.
- Images: put the file in `docs/public/images/` and use `![description](/images/name.png)`.
- Videos: `<YouTube id="VIDEO_ID" />` or `<MediaVideo src="/images/name.mp4" />`.
- Glossary: add a table row to `docs/help/glossary.md`; class names in the text show the description on hover.
- When a page is moved or renamed, add the old address to `docs/.vitepress/theme/redirects.mjs`.

Found a mistake? Use **Suggest a change** at the bottom of any page.
