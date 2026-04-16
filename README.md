# TypeScript Bangla Handbook

Bangla TypeScript handbook: docs + printable notes with real-world examples.

## Overview

This repository contains a chapter-wise TypeScript handbook written in Bangla, built with **VitePress**.

## Chapters

- **Introduction**: `chapter-1.md`
- **Operators**: `chapter-2.md`
- **Types**: `chapter-3.md`
- **Functions**: `chapter-4.md`

## Tech Stack

- VitePress (docs site)
- Markdown (content)

## Local Development

### Requirements

- Node.js (LTS recommended)
- npm

### Install

```bash
npm install
```

### Run dev server

```bash
npm run docs:dev
```

### Build

```bash
npm run docs:build
```

### Preview build

```bash
npm run docs:preview
```

## Project Structure

```text
.
├─ .vitepress/
│  ├─ config.mts
│  └─ theme/
│     ├─ index.ts
│     └─ custom.css
├─ chapter-1.md
├─ chapter-2.md
├─ chapter-3.md
├─ chapter-4.md
├─ index.md
├─ package.json
└─ README.md
```

## Notes

- `roadmap.md` is intentionally ignored in git (see `.gitignore`).
- The site navigation is driven by `.vitepress/config.mts`.

## Deploy (GitHub Pages)

Auto deploy is supported via GitHub Actions workflow:

- `.github/workflows/deploy.yml`

### Steps in GitHub

1. Repository → **Settings** → **Pages**
2. **Build and deployment** → Source: **GitHub Actions**
3. Push to `main` branch

After the workflow completes, the site will be available on GitHub Pages.

## License

Choose a license and update this section (MIT is commonly used for docs).

