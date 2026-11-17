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

## Ads

The game has two rewarded-ad offers built in. They stay hidden until an ad network is connected.

- **Continue:** after a crash on the star chart (not the daily orbit), the player can watch an ad to keep going with a shield. This is offered once per run, and only after the first 5 seconds.
- **Double motes:** on the game-over screen, the player can watch an ad to bank the run's motes twice.

To try both offers with a fake 3-second ad, open the game with `?ads=test` at the end of the address.

To connect a real network, load its SDK and define this before the game's main script in `index.html`:

```html
<script>
  window.PerihelionAds = {
    // Optional. Return false while no ad is loaded, and the offers stay hidden.
    isRewardedReady() { return true; },
    // Show a rewarded ad. Resolve true only if the player finished it and earned the reward.
    showRewarded(placement) { /* 'revive' or 'double-motes' */ return Promise.resolve(false); },
  };
</script>
```

Game sound pauses while an ad plays.

## Try it locally

```bash
python3 -m http.server 8000
```

Then open http://localhost:8000.
