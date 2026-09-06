# VICE FORGE

GTA VI–inspired cover identity studio for the [Unlayer Build with React Image Editor Challenge](https://x.com/unlayer/status/2095499044072149504).

Forge a Vice Coast cover with [`@unlayer/react-image-editor`](https://github.com/unlayer/react-image-editor), then watch it hit a phone lock screen, highway billboard, and wanted poster.

**Live:** [https://unlayer-five.vercel.app](https://unlayer-five.vercel.app)  
**Repo:** [https://github.com/panditdhamdhere/Vice-Forge](https://github.com/panditdhamdhere/Vice-Forge)

## Try it (30 seconds)

1. Open the live app (or run locally below)
2. Click **Forge your cover**
3. Pick a base (or upload a face) and set an alias
4. Edit with React Image Editor — filter, text, stickers, frame, draw
5. Hit **Save** → watch the city drop → share with `#BuiltWithImageEditor`

## Stack

- Next.js 16 (App Router)
- TypeScript
- Tailwind CSS 4
- Framer Motion
- `@unlayer/react-image-editor`

## Routes

| Route | Purpose |
|-------|---------|
| `/` | Landing |
| `/forge` | Pick base / upload |
| `/forge/edit` | React Image Editor forge |
| `/reveal` | Phone → billboard → wanted montage + share |

## Develop

```bash
npm install
npm run dev
```

Open [http://localhost:3000](http://localhost:3000).

## Deploy

```bash
npx vercel --prod
```

Or import this repo in the Vercel dashboard.

## Challenge checklist

- [x] GTA VI–inspired experience
- [x] React Image Editor as a core loop
- [x] Users edit / customize a visual
- [x] Public GitHub repo
- [x] Live deploy URL — https://unlayer-five.vercel.app
- [ ] Submit form + share `#BuiltWithImageEditor`
