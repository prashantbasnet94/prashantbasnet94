# Install

1. Copy everything in this folder into your `prashantbasnet94/prashantbasnet94` repo.
2. The files in `assets/` are static fallbacks. Overwrite them with the ANIMATED masters before pushing:

```bash
for f in assets-src/*.svg.txt; do cp "$f" "assets/$(basename "${f%.txt}")"; done
```

3. Commit + push. GitHub renders the CSS animations natively (give camo cache a few minutes).
