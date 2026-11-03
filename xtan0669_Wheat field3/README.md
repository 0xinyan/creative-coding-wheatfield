# Wheatfield — Independent Noise Study 02

## Project

This intermediate study develops the Perlin noise and randomness mechanic for
our reinterpretation of Van Gogh's *Wheatfield with a Reaper*.

It preserves the painting's colours and brushwork while using gentle texture
displacement to suggest natural wind. The original pilot drew individual wheat
stalks; this iteration explores movement within the original image instead.

## Mechanic ownership

Tang Xinyue: Perlin noise and randomness.

The mechanic is implemented independently in `noise-mechanic.js`. The visual
presentation references the input teammate's painting-based approach. This study
does not load their `Wheat.js` or implement their mouse interaction.

## Running the project

1. Keep all project files together.
2. Double-click `preview.html` for an offline preview, or open `index.html`
   using VS Code Live Server.
3. Wait approximately two seconds for the wind to fade in, then observe the field.

No mouse or keyboard interaction is required. The p5.js library is included locally.
Both entry points use the same JavaScript files. `preview.html` embeds a copy of
the painting to support local-file preview; replacing `assets/vangogh.jpg` does
not automatically update that embedded copy.

## Implementation

- Canvas dimensions follow the supplied painting, 800 x 632 pixels.
- The full painting is drawn as a static background each frame.
- The wheatfield is divided into 32 x 16 pixel patches, with smaller edge patches.
- `random()` sets each patch's response and noise offset once during setup.
- `noise()` smoothly changes the horizontal source position sampled for each patch.
- Nearby patches use similar noise inputs to create related movement.
- A slower noise sample changes the overall wind strength.
- Foreground patches receive greater displacement, while a gradual entrance
  prevents an abrupt movement at startup.

The destination rectangles stay fixed. Movement comes from shifting the source
regions in the painting, rather than rotating individual stalks.

## Code structure

- `sketch.js`: loads the painting and runs the main `setup()` and `draw()` functions.
- `noise-mechanic.js`: defines the `NoiseField` class and manages patch data,
  wind updates and drawing.
- `assets/vangogh.jpg`: shared reference painting.
- `libraries/p5.min.js`: local p5.js library.
- `index.html`: development entry point for Live Server.
- `preview.html`: offline preview entry point.

## Adjustable parameters

In `noise-mechanic.js`:

| Parameter | Current value | Purpose |
| --- | --- | --- |
| `strength` | 5 | Horizontal displacement strength |
| `speed` | 0.006 | Noise sampling progress per frame |
| `patchWidth` | 32 | Width of each image patch |
| `patchHeight` | 16 | Height of each image patch |
| `response` | random value from 0.8 to 1.2 | Permanent variation between patches |

## Techniques and references

The project uses classes, objects, arrays, loops, functions, `random()` and
animated `noise()` sampling, drawing on the IDEA9103 Week 7 and Week 8 material.

It also uses the source-region form of `image()`:
`image(img, dx, dy, dw, dh, sx, sy, sw, sh)`. The first rectangle specifies the
destination; the second specifies the source area. Whether this particular
parameter form was taught in class has not been confirmed.

The painting file was supplied in the teammate's project as a shared artwork
reference. The group's original image-source link still needs to be recorded
before submission. The p5.js library is retained from the original pilot.

## Limitations and planned development

This is an intermediate study, not the final group submission. The wheatfield
boundary is approximate, and the figure area is conservatively kept still.
Small seams may appear between displaced patches.

Next steps include improving continuity, refining wind settings, integrating the
other mechanics through a shared drawing process, and implementing and testing
canvas resizing beyond the current CSS scaling.

This iteration has a static sky and gentle wind. It does not include the stronger
wind or animated mosaic sky developed in later versions.

## AI acknowledgement

ChatGPT/Codex assisted with the independent noise-displacement approach, code
and comments, preview preparation, documentation and validation. The code must
be reviewed, understood and adapted by the student before assessment use.

## Validation record

The earlier development checks included JavaScript syntax checking and 300
updates in a logic harness using substitute noise and random functions. These
checked stable patch properties, finite drawing coordinates and the protected
figure region. The real p5.js preview was also opened in Chrome. These checks do
not establish performance or compatibility with the other group mechanics.
