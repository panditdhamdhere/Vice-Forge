# VICE FORGE

A small GTA VI–inspired web app where you forge a cover identity, edit it in [Unlayer’s React Image Editor](https://github.com/unlayer/react-image-editor), and see it show up on a phone lock screen, billboard, and wanted poster.

Built for Unlayer’s [Build with React Image Editor](https://x.com/unlayer/status/2095499044072149504) challenge.

**Demo:** https://unlayer-five.vercel.app

## Run locally

```bash
npm install
npm run dev
```

Then open http://localhost:3000

## How it works

1. Pick a base portrait or upload your own
2. Customize it in the image editor (filters, text, stickers, frames, draw)
3. Save — your cover drops into the city reveal
4. Download or share it

## Stack

- Next.js 16
- TypeScript
- Tailwind CSS
- Framer Motion
- `@unlayer/react-image-editor`

## Pages

- `/` — landing
- `/forge` — choose a face
- `/forge/edit` — editor
- `/reveal` — city drop + share
