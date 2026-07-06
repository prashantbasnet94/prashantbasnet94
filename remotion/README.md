# Remotion motion assets

Renders video/GIF versions of the profile hero and metrics panels — for the README, LinkedIn, or a pinned repo.

## Setup

```bash
cd remotion
npm i
npx remotion studio          # live-edit the compositions
```

## Render

```bash
# animated GIF hero for the README (swap into ../assets/hero.gif)
npx remotion render Hero ../assets/hero.gif --codec=gif --every-nth-frame=2

# mp4 versions (LinkedIn / socials)
npx remotion render Hero out/hero.mp4
npx remotion render Metrics out/metrics.mp4
```

Then in `README.md` change `assets/hero.svg` → `assets/hero.gif`.

Note: the SVG versions in `../assets/` animate natively on GitHub with zero build step — the GIF is optional (SVG is sharper and lighter; GIF loops with the count-up easings baked in).
