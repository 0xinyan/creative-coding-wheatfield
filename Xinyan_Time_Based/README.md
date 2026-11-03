# Wheatfield with a Reaper — Xinyan's Time-based Mechanic

## Project
An individual time-based mechanic using the original composition and real painted brushstrokes of Vincent van Gogh's *Wheatfield with a Reaper* (1889). This project has **no team-mate's code**, no user-input mechanic and no Perlin noise mechanic.

## What happens
- 0–10 seconds (approximately at 60 fps): the sun moves across the sky, a warm colour overlays the sky, and the field gradually darkens.
- The original composition and oil-painted texture remain visible.
- Reload the page to replay.

## How to run
Run `index.html` with VS Code's p5.js project preview or a local web server. The HTML loads p5.js from the internet, so a connection is needed. If your class template provides a local `libraries/p5.min.js`, you can instead point the p5.js script to that file.

## Code organisation
- `sketch.js` — loads the image assets and draws the painting and transparent colour overlays.
- `time-mechanic.js` — uses `frameCount`, `map()` and `if` to change sun position, sky and field colours.
- `style.css` — simple page layout.
- `assets/original_vangogh.jpg` — source artwork for reference.
- `assets/wheatfield_background.jpg` — source painting with the original sun location repaired for animation.
- `assets/original_sun.png` — sun cropped from the source painting, with a soft transparent edge.

## Techniques and scope
The JavaScript uses course-covered beginner topics: `preload()`, `loadImage()`, `setup()`, `draw()`, `createCanvas()`, `image()`, `frameCount`, `map()`, `if`, `fill()`, `noStroke()`, and `rect()`. The visual assets were prepared outside p5.js so the final running code does not require advanced pixel processing. `frameCount / 60` estimates elapsed seconds assuming 60 fps; it is not a precise timer.

## AI acknowledgement
ChatGPT assisted with code drafting, structuring and explanatory comments, and in preparing the background and transparent-sun image assets. Relevant JavaScript files also include AI acknowledgement comments. Review and adapt the code before submission.

## Reference
Vincent van Gogh, *Wheatfield with a Reaper* (1889). Original image was provided in the group's shared project files as a visual reference; this prototype does not reuse any teammate's JavaScript. Lecture/tutorial materials: Weeks 6, 7, 8 and 11.
