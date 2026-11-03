# Wheatfield — Field 5: Clearer Sky Drift

This folder is an individual development iteration of the group's wheatfield
project. It demonstrates Tang Xinyue's Perlin noise and randomness contribution,
not the completed integration of all group mechanics.

## Inspiration

Our project reinterprets Vincent van Gogh's *Wheatfield with a Reaper*.
The painting's golden colours and repeated, directional brushstrokes inspired
the idea of a field responding to natural wind. This iteration preserves the
original image texture and moves small sampled regions instead of rebuilding
every stalk, keeping the animation close to the painting's visual character.

The artwork is documented by the [Van Gogh Museum](https://www.vangoghmuseum.nl/en/collection/s0049V1962).
The image used here is the group's supplied `assets/vangogh.jpg`.
The museum link identifies the artwork; the exact download source of this
particular resized file has not been verified.

The mosaic sky follows the shared visual direction established in the input teammate's prototype. It provides a consistent background for the group, while this
iteration adds noise-driven variation to its light.

## Techniques

- **Fixed random variation:** `random()` sets each patch's response and noise
  offset once during setup. Keeping these values avoids frame-to-frame flicker.
- **Smooth natural movement:** `noise()` changes the horizontal source position
  of each image patch. Nearby patches sample nearby noise positions, so their
  motion is related. A slower sample varies the overall wind strength.
- **Image-region drawing:** `image(img, dx, dy, dw, dh, sx, sy, sw, sh)` draws a
  selected part of the painting into a fixed rectangle. Moving the source
  window creates texture displacement. It does not rotate individual stalks.
- **Depth and entrance:** foreground patches receive more displacement, and
  the effect fades in gradually after startup.
- **Structure:** the `NoiseField` class stores patches in an array. Loops update
  and draw them; `sketch.js` coordinates `preload()`, `setup()` and `draw()`.

The sky uses a 6-pixel mosaic layout. Stored RGB values and rectangle coordinates
are drawn with `fill()` and `rect()`. A slowly advancing noise sample changes
local brightness while the rectangle positions stay fixed. The mountain and
tree outlines remain visible, and the sun area keeps its base colours.
Sky strength is 60; sky speed is 0.004. This is a brightness pattern,
not moving cloud geometry or a time-of-day cycle.

Compared with field4, sky strength rises from 46 to 60. Wind settings and sky
sampling speed remain unchanged.

### Current parameters

| Parameter | Value | Purpose |
| --- | --- | --- |
| Wind strength | 22 | Horizontal source displacement scale |
| Wind speed | 0.009 | Wind noise sampling progress per frame |
| Patch dimensions | 32 x 16 | Source-image patch size; edge patches may be smaller |
| Sky strength | 60 | Local brightness variation |
| Sky speed | 0.004 | Sky noise sampling progress per frame |

Wind displacement is constrained to +/-18 source-image pixels. Random patch
responses range from 0.95 to 1.05 to keep stronger movement coordinated.

The class/array/noise approach draws on IDEA9103 Week 7 and Week 8 material.
The specific source-region form of `image()` has not been confirmed as covered
in class, so its operation is explained here and referenced below.

## Mechanic ownership

The group roles follow the concept proposal. The implementation status below
refers specifically to this folder.

| Team member | Mechanic | Responsibility and status |
| --- | --- | --- |
| Tang Xinyue | Perlin noise and randomness | Natural wind with fixed random patch differences, plus noise-driven sky light; implemented here. |
| Zhexin Li | User input | Mouse-driven local wheat disturbance and clicking the reaper to trigger an action in the teammate's separate prototype; not loaded here. |
| Xinyan Lin | Time-based | Planned daylight/afternoon/sunset changes to light, sun position and scene colours; not included or verified in this folder. |

The painting and background style are shared references. The input teammate's
mouse logic, `Wheat.js` and pixel renderer are not included in this iteration.
The static sky colour data is a background asset, while the noise brightness
calculation is part of Tang's mechanic.

## AI acknowledgement

ChatGPT/Codex assisted with the independent patch-displacement approach,
noise formulas, code generation, comments, preview preparation, documentation
and earlier development checks. It also helped prepare the static sky colour
data offline and implement noise-driven sky brightness. These were substantial
code-generation contributions, not only spelling or grammar assistance.

In the generated wind code, random attributes remain fixed while a gradually
advancing noise input controls each patch's source offset. In the generated sky
code, stored RGB colours receive a small, spatially related noise adjustment;
rectangles retain their positions. This explains how the AI-assisted animation works.
The student must review, understand and make their own development decisions
before using this material for assessment. Corresponding AI and source comments
are included at the top of the relevant scripts in this reviewed copy.

## External references

- [Van Gogh Museum — *Wheatfield with a Reaper*](https://www.vangoghmuseum.nl/en/collection/s0049V1962):
  artwork identification and visual inspiration. The local JPG came from the
  supplied group project; this is not a claim about its exact download URL.
- [p5.js `image()` reference](https://p5js.org/reference/p5/image/): explains the
  source/destination rectangles used for patch drawing. This is documentation
  for the API, not a borrowed implementation of the wind algorithm.
- [p5.js `noise()` reference](https://p5js.org/reference/p5/noise/): explains the
  smooth noise values used to drive the animation.
- [p5.js `random()` reference](https://p5js.org/reference/p5/random/): explains
  the initial random values retained by the patches.
- [Group input branch](https://github.com/0xinyan/creative-coding-wheatfield/tree/Input): shared visual reference.
  The reviewed local teammate files were supplied separately; sky/tree outline
  coordinates follow that background layout. Its mouse and pixel-rendering code
  was not copied into this noise demonstration.
- [IDEA9103 Week 7 Lecture](https://canvas.sydney.edu.au/courses/74653/pages/week-7-lecture?module_item_id=3241890)
  and [Week 8 Lecture](https://canvas.sydney.edu.au/courses/74653/pages/week-8-lecture?module_item_id=3241907):
  course grounding for classes, arrays, random values and noise animation.

The local `libraries/p5.min.js` is the p5.js library retained from the initial
pilot. The reference links were checked while documenting this iteration;
adding these links does not claim they were consulted during the original coding.

## Interaction instructions

1. Keep all files in the folder together.
2. Double-click `preview.html` to run offline, or open `index.html` with VS Code
   Live Server during development.
3. Wait approximately two seconds for the effect to build up.
4. Watch the wheatfield texture shift smoothly, and observe the mosaic sky
   brightness change slowly.

No mouse movement, clicking, keyboard action or audio is required in this folder.
The offline preview embeds a copy of the image. Replacing `assets/vangogh.jpg`
does not automatically replace the embedded copy in `preview.html`.

## File structure

- `sketch.js`: image loading and the main animation loop.
- `noise-mechanic.js`: patch properties and wind animation.
- `sky-background.js`: mosaic drawing and noise-driven brightness.
- `sky-colours.js`: pre-sampled static sky colours and rectangle coordinates.
- `assets/vangogh.jpg`: the supplied shared artwork image.
- `libraries/p5.min.js`: local p5.js library.
- `index.html`: Live Server entry point.
- `preview.html`: offline entry point using the same animation scripts.

## Limitations and integration

The wheat boundary is approximate and the figure area is conservatively kept
still. Patch seams can appear during displacement. The 800 x 632 canvas uses
CSS scaling; full resize handling remains unfinished.

Wind and mouse displacement should ultimately be combined within one wheat
rendering process. For sky integration, the time-based mechanic should provide
base time-of-day colours, and this noise effect should add local brightness
variation rather than overwrite those colours. This folder has not been tested
with the other group mechanics and should not be presented as the completed
team submission.
