# Xinyan LIN — Time-based mechanic, pixel-sky-compatible

This project contains **only Xinyan's time module** and a standalone preview. It does not contain the other students' `Sky.js`, `Wheat.js` or `Reaper.js`.

## Look / behaviour
- Daylight (0–4 seconds): bright, gently greenish sky changing into golden afternoon.
- Sunset (4–10 seconds): sky becomes red-orange high above and golden near the ridge; colours of the landscape also warm up, with the original brushstrokes still visible.
- The original painted sun moves down behind the existing mountains and disappears.
- The scene holds and returns to daylight in a 14-second cycle.
- Sky gradient is **calculated in real time** in `timeSkyColor()`, based on each original 6px pixel block. This is NOT a solid-colour sky and not a set of 31 pre-coloured pictures.

## Files
- `Time.js` — time tracking, colour gradients, moving sun, whole painting light and preview sky
- `sketch.js` and `index.html` — standalone test only
- `assets/` — three fixed, uncoloured reference art layers: sun-free original, painted sun cutout, mountain foreground mask. No precomputed sunset colours.

## Integration into the GROUP repository
1. Keep each teammate's original mechanic file. Add only `Time.js` and the three assets from here.
2. In the GROUP `index.html`, include `<script src="Time.js"></script>` before `sketch.js`.
3. In GROUP `preload()`, call `loadTimeImages()`. Use the sun-free painting as the base image so the source sun isn't duplicated (e.g. set `painting = timePainting` *after* preload has completed in setup, and ensure all members agree on the source image change).
4. In `Sky.js`'s `display()` loop, **replace only** `fill(block.colour);` with:
   `let c = timeSkyColor(block.colour, block.x, block.y, this.skyBottom(block.x)); fill(c[0], c[1], c[2]);`
   This is a minimal integration hook: the pixelization, block positions, mountain boundary and the ownership of `Sky.js` remain unchanged.
5. In GROUP `draw()`, use this order as a starting point: `updateTime(); image(painting,...); sky.display(); drawTimeSun(); drawTimeMountains(); wheat.updateMouse(); wheat.display(); reaper.display(); drawTimeLight();`
6. Do not call the preview-only `drawTimePreview()` or `drawTimeSkyPreview()` from the group's `sketch.js`. Those exist only so this individual ZIP runs without the teammates' files.
7. Coordinate the background image change with the rest of the group; the `Wheat` / `Reaper` layers use image-derived masks and may need testing with the changed reference.

## Course techniques
`frameCount`, `map()`, `if/else`, array indexing, `for` loops, `image()`, `loadImage()`, `get()`, `fill()`, `rect()`, `push()/pop()`. No `millis()`, `constrain()`, `tint()`, `noTint()`, or `lerpColor()` in the personal code.

## AI acknowledgement and source attribution
ChatGPT was used to plan, code, explain and revise `Time.js`, prepare the three static source-image layers and write this README. The original image is Vincent van Gogh's *Wheatfield with a Reaper* (1889), taken from the group's provided reference. Provide a verified image URL in the final group README.

## GitHub
The team must integrate and test all modules, write the final README and ensure at least three meaningful GitHub commits per person.

## Tree colour preservation
`assets/original-green-tree.png` is an unchanged-colour transparent crop from the original painting, not a sunset frame. `drawOriginalTree()` draws it last so the left-side green tree remains its original colour even after the sunset lighting overlay. In the final team integration, call `drawOriginalTree()` after the pixel sky and evening light.
