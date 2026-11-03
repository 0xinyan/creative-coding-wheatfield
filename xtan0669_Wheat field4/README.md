# Wheatfield — Noise Study 04: Stronger Wind

## Project

This standalone study develops the Perlin noise and randomness mechanic for
our reinterpretation of Van Gogh's *Wheatfield with a Reaper*. It retains the
painting's texture while adding natural wind across the wheatfield and
smoothly changing light across a mosaic sky.

## Mechanic ownership

Tang Xinyue: Perlin noise and randomness.

`noise-mechanic.js` controls the wheatfield's wind effect. `sky-background.js`
adds noise-driven brightness changes to the sky. This version does not include
mouse interaction, harvesting actions or a day-to-night cycle, and has not yet
been integrated with the other group mechanics.

## Running the project

1. Keep all project files together.
2. Double-click `preview.html` for an offline preview, or open `index.html`
   with VS Code Live Server during development.
3. Wait approximately two seconds for the effects to fade in.
4. Observe the wheatfield movement and the changing light in the sky.

No mouse or keyboard interaction is required. The p5.js library is included
locally. Both entry points use the same JavaScript files. `preview.html` embeds
a copy of the painting for local-file preview; changing `assets/vangogh.jpg`
does not automatically update this embedded copy.

## Wheatfield wind

The field is divided into image patches. `random()` assigns each patch a fixed
response and sampling offset during setup. These values are not regenerated
in the animation loop.

`noise()` smoothly changes the horizontal source position sampled for each
patch. Neighbouring patches use similar noise inputs, creating related
movement. A slower noise sample varies the overall wind strength, and
foreground patches receive greater displacement.

The wind strength is 22 and the sampling speed is 0.009. Displacement is limited
to 18 source-image pixels in either direction to reduce excessive distortion.
This is texture displacement within the painting, rather than a simulation of
individual stalks rotating around fixed roots.

## Mosaic sky

The sky retains a 6-pixel mosaic appearance. Pre-sampled colours and rectangle
coordinates are stored in `sky-colours.js`. `sky-background.js` uses `noise()`
to vary the local brightness smoothly, producing a drifting pattern of light.

The rectangles stay in place, preserving the mountain and tree boundaries.
The sun and its immediate surroundings retain their base colours. This effect
changes colour and brightness; it does not move cloud shapes or the sun.

Compared with the earlier gentle-wind study, wheatfield strength increases
from 5 to 22 and wind speed from 0.006 to 0.009. Patch responses use a narrower
random range of 0.95 to 1.05. The mosaic sky now has noise-driven brightness
variation, with sky strength 46 and sky speed 0.004.

## Code structure

- `sketch.js`: loads the painting and runs the shared `setup()` and `draw()`.
- `noise-mechanic.js`: defines `NoiseField`, stores patch properties and
  calculates and draws the wind effect.
- `sky-background.js`: draws the animated mosaic sky.
- `sky-colours.js`: stores static sky colour and rectangle data.
- `assets/vangogh.jpg`: shared reference painting.
- `libraries/p5.min.js`: local p5.js library.
- `index.html`: Live Server entry point.
- `preview.html`: offline preview entry point.

## Adjustable parameters

| File | Parameter | Current value | Purpose |
| --- | --- | --- | --- |
| `noise-mechanic.js` | `strength` | 22 | Wheatfield displacement strength |
| `noise-mechanic.js` | `speed` | 0.009 | Wind sampling progress per frame |
| `sky-background.js` | `skyStrength` | 46 | Sky brightness variation |
| `sky-background.js` | `skySpeed` | 0.004 | Sky sampling progress per frame |

Change one parameter at a time. If patch seams become too noticeable, reduce
wheatfield strength before increasing other settings.

## Techniques and references

The animation uses classes, arrays, loops, variables, arithmetic, `random()`
and `noise()`, building on the IDEA9103 Week 7 and Week 8 material. The sky is
drawn with `fill()`, `rect()` and `push()`/`pop()`.

The wheatfield uses the source-region form of `image()`:
`image(img, dx, dy, dw, dh, sx, sy, sw, sh)`. It draws a selected source region
into a destination rectangle. Whether this particular parameter form was
covered in class has not been confirmed.

The painting was supplied as a shared project asset. The group's original
image-source link still needs to be added before submission. The mosaic
background layout references the input teammate's static sky, while its
colour data was prepared offline with AI assistance. The static background
data is separate from the noise animation contribution. This version does
not use the teammate's `Wheat.js`, mouse logic or pixel-mask renderer.

## Integration and limitations

The wheatfield boundary is approximate, and small seams may remain between
patches. The canvas uses the painting's 800 x 632 dimensions with CSS scaling;
full canvas-resize handling remains unfinished.

The group version should combine wind and mouse displacement within one
wheatfield rendering process. For sky integration, the time-based mechanic
should provide the base time-of-day colours, with this noise effect adding
local brightness variation to those colours.

## AI acknowledgement

ChatGPT/Codex assisted with wind adjustments, the independent sky-noise effect,
background colour-data preparation, code comments, documentation and checks.
The student must review and understand the implementation and retain the AI
acknowledgement and artwork references in assessment materials.

## Validation record

Earlier development checks covered JavaScript syntax, displacement and
source-image bounds, stable random properties, and sky colour limits and
fixed drawing geometry, using substitute noise/random functions. A real
p5.js preview was also opened in Chrome. Integration with the other group mechanics has not been tested. This README
was checked against the supplied field4 scripts; the documentation update
does not change the animation code.
