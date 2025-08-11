Game Dashboard — Call of Duty style (React, Vite)
====================================================

What's included:
- Minimal Vite + React scaffold (package.json, src/)
- A Call-of-Duty inspired dashboard UI with 3D card effects and HUD chrome.
- Uses Tailwind via CDN (no Tailwind build step required for preview).
- Game cards use Unsplash images dynamically via `https://source.unsplash.com` queries.
- Overlay iframe launches games from `/games/<id>/index.html` (so drop your game folders into `public/games/` when running dev).

How to run (locally):
1. Install dependencies: `npm install` (requires Node 16+)
2. Start dev server: `npm run dev`
3. Copy your game builds into `public/games/` (for example: `public/games/snake/index.html` etc.)
   - or run a simple static server with the `public` folder served at root.
4. Open the app (Vite will show the dev URL, typically http://localhost:5173).

Notes on images & licensing:
- The app sources images from Unsplash (`source.unsplash.com`) for hero thumbnails. Unsplash images are free to use under the Unsplash License for commercial/personal projects with some restrictions. See Unsplash for details. (images will be randomly selected each load)
- If you want guaranteed specific artwork, replace image URLs in `src/components/GameDashboard.jsx` with direct assets placed under `public/assets/`.

PostMessage integration:
- The dashboard sends `postMessage({cmd:'new-game'})` and `postMessage({cmd:'toggle-sound'})` to the iframe; games can listen for these messages and act accordingly.

Want me to:
- Bundle the three game builds into `public/games/` in this project and produce a ZIP for download?
- Replace Unsplash queries with a curated set of images (I can fetch and embed image assets)?

