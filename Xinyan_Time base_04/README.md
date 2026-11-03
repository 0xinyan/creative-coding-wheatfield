# Flowing Wheatfield — Xinyan LIN's Time-based Mechanic

## Inspiration
This module reinterprets Vincent van Gogh's *Wheatfield with a Reaper* by moving its painted sun and transforming its light from daytime to sunset while preserving its painted texture.

## Techniques
- `frameCount` and `%` drive a repeating 14-second timeline: ten seconds of sunset, two seconds held at sunset and two seconds returning to daylight.
- `map()` computes sun movement and sky colours using the elapsed portion of that timeline.
- `if/else` controls the animation stages and protects the original tree colour.
- **Pixel recolouring:** `createImage()`, `loadPixels()`, `.pixels[]`, and `updatePixels()` read each original painted pixel and calculate a new RGB colour every four animation frames. The original local colour variations are retained to preserve a painterly look. **These are more advanced p5.js functions and have not been confirmed as covered in the supplied course slides.** They are documented in the source code and below.
- One static sun cut-out moves behind a mountain-shaped occlusion mask; no prepared sunset sequences or pre-coloured frames are used. All sunset colour changes are calculated with p5.js.

## Mechanic ownership
**Xinyan LIN — Time-based:** the independent `Time.js` module controls sun movement, automatic timing, sunset colours and looping. Other team members' User Input and Perlin Noise / Randomness modules are not included in this personal demo. The complete group README should identify and describe those members and their mechanics.

## AI acknowledgement
ChatGPT (OpenAI) assisted with code drafting, debugging, the sunset recolouring logic, code comments and explanations. ChatGPT also assisted in preparing the static painting/sun/mountain cut-outs. In `Time.js`, `updatePaintingColours(progress)` changes RGB values based on time and reuses exactly those same colours beneath the mountain occlusion mask to avoid seams; `drawTimeEffect()` controls the timeline, draws the moving sun and places the mountain cut-out in front of it. AI help is disclosed in the code comments as well.

## External references
- Original artwork: Vincent van Gogh, *Wheatfield with a Reaper* (1889). Artwork image included for this course prototype.
- p5.js reference for pixel manipulation: https://p5js.org/reference/p5.Image/loadPixels/
- p5.js reference for applying pixel changes: https://p5js.org/reference/p5.Image/updatePixels/
- p5.js reference for creating a new image: https://p5js.org/reference/p5/createImage/

The above links document the pixel technique beyond the student's confirmed lecture coverage. No other external code was intentionally copied.

## Interaction instructions
Open `index.html` using a local development server such as VS Code Live Server. The scene automatically goes from daylight to sunset, the sun descends behind the mountains, the final sunset is held briefly, then the image returns to daylight. No clicking is required for this mechanic. The other team members' mechanics are not included in this stand-alone preview.

## Files
- `Time.js`: Xinyan's independent time-based mechanic
- `sketch.js`: stand-alone test sketch for this mechanic
- `index.html`: p5.js page
- `assets/base-painting.png`: stationary source painting with the original sun removed
- `assets/painted-sun.png`: sun cut-out
- `assets/mountain-foreground.png`: mountain and foreground alpha mask for natural sun occlusion (its RGB colours are not used)

## Before final submission
Combine this module with the group's `sketch.js`, test the final interaction and add all group members and any additional external references to the shared project README. Ensure GitHub commits reflect actual development changes.


## Left-side colour seam correction

Removed a rectangular `treeProtection` condition from `Time.js` that applied a different colour intensity to only the upper-left portion of the mountains. The land now uses a single continuous colour formula, with no hard vertical or horizontal boundary. The original green tree remains visible because the warm colour shift is gentle. The mountain foreground is used only for sun occlusion and shares the background's recoloured RGB values.
