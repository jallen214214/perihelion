# Perihelion

A one-button orbit game that installs like an app. It runs full screen, works offline, and saves progress on the device.

## Files

- `index.html` is the whole game.
- `manifest.webmanifest` gives the app its name, icon and full-screen mode.
- `sw.js` caches the game so it works offline.
- `icons/` holds the home-screen icons.

## Install on a phone

- **iPhone:** open the site in Safari, tap **Share**, then **Add to Home Screen**.
- **Android:** open the site in Chrome and tap **Install app** on the menu screen, or use the browser menu.

## Updating the game

1. Edit `index.html`.
2. In `sw.js`, change `VERSION` (for example `perihelion-v1` to `perihelion-v2`). Installed copies then pick up the new version the next time they open online.
3. Commit and push. GitHub Pages republishes within a minute or two.

## Try it locally

```bash
python3 -m http.server 8000
```

Then open http://localhost:8000.
