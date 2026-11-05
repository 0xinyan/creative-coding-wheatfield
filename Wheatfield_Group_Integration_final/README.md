# Flowing Wheatfield

**IDEA9103 Creative Coding - Final Group Project**  
**Final Group Submission**

## Project and inspiration

Our project reinterprets Vincent van Gogh's *Wheatfield with a Reaper* as an interactive p5.js artwork. The original wheatfield brushstrokes contrast with a 6-pixel sky, following tutor feedback.

Mouse input, natural wind and changing daylight bring different parts of the painting to life. This final version combines the group's User Input, Perlin Noise and Randomness, and Time-based mechanics.

## How to run

1. Open this folder in Visual Studio Code.
2. Run `index.html` using Live Server or another local web server.
3. Keep an internet connection available: the page loads p5.js 1.9.4 from a CDN.

No build step or package installation is required for the artwork itself.

## Interaction instructions

| Action | Result |
| --- | --- |
| Move the mouse across the wheatfield | Nearby wheat flows and responds to the direction of movement. |
| Click the painted reaper | The figure leans forward, swings a sickle and returns to the original pose. |
| Press **X** | Pause or resume the sun and time-of-day colour changes. |
| Click the visible sun while time is paused | Switch between daylight and sunset. |
| Use the button above the painting while paused | Switch lighting even when the sun is hidden behind the mountains. |

Natural sky brightness, wheat wind, mouse interaction and harvesting continue while time is paused. The header displays the current time state and interaction instructions.

## Code structure

| File | Responsibility |
| --- | --- |
| `index.html` | Page layout, instructions and script loading. |
| `sketch.js` | Shared image loading, object creation, drawing order and input events. |
| `Wheat.js` | Field mask, mouse response and combined mouse/wind pixel rendering. |
| `Sky.js` | Sampled sky blocks, cached pixel rendering and original tree detail. |
| `Reaper.js` | Painted body/arm cutouts and the click-triggered harvesting gesture. |
| `Time.js` | Xinyan's original time cycle, sky colours, sun movement and scene lighting. |
| `integration/noise-mechanic.js` | Adapted spatial wind provider based on Xinyue's Noise mechanic. |
| `integration/sky-background.js` | Noise-driven brightness applied to the time-coloured sky. |
| `integration/time-controls.js` | Independent time clock, X-key control, sun clicks and status feedback. |
| `member-notes/` | Individual contribution notes and original member README documents. |

The root `noise-mechanic.js` and `sky-background.js` preserve the teammate's original source and comments. The page loads their adapted versions from `integration/`; loading both versions would duplicate declarations.

## How the code works

**Wheat and mouse:** A soft image mask defines the wheatfield and protects the figure. Mouse movement and local waves produce displacement; neighbouring source pixels are blended to retain the painting's texture.

**Natural wind:** `noise()` provides smoothly varying wind, while `random()` sets fixed differences during setup. Wind samples are interpolated across a grid and combined with mouse displacement before the wheat is drawn once.

**Sky and time:** Sky colours are sampled from the sun-free painting. Time changes their base colours, Noise adds local brightness variation, and a separate painted sun moves behind the mountain foreground.

**Harvesting:** Original-image body and arm layers rotate around waist and shoulder pivots. A nearby wheat patch covers the old upper-body position during the 2.1-second gesture.

**Pause and switching:** An independent clock controls the original Time module without editing it. X pauses that clock; sun clicks select a daylight or sunset moment while the other animations continue.

## Drawing order

1. Update the time clock, wind and sky noise.
2. Draw the sun-free background, pixel sky, moving sun and mountain foreground.
3. Draw the combined mouse/wind wheat layer and harvesting animation.
4. Apply scene lighting and restore the original green tree.
5. Update pointer feedback for interactive elements.

This order prevents the foreground from covering animated wheat and applies the same lighting to the moving figure and field.

## Image assets

- `assets/vangogh.jpg`: original shared artwork, retained as a reference.
- `assets/painting-without-sun.jpg`: shared background and pixel-sampling source.
- `assets/original-painted-sun.png`: painted sun cutout.
- `assets/mountain-foreground.png`: foreground mask that hides the setting sun.
- `assets/original-green-tree.png`: tree layer preserving its original colour.

## Mechanic ownership

- **User Input and shared integration:** Wheat/mouse interaction, pixel sky, harvesting, pause/sun controls and module integration. See [input contribution notes](member-notes/input_note.md).
- **Tang Xinyue - Perlin Noise and Randomness:** Natural wheat wind and sky brightness variation. See [original Noise notes](member-notes/Noise-README.md).
- **Xinyan LIN - Time-based:** The `Time_based03` time cycle, colour transitions, sun movement and supporting image layers. See [original Time notes](member-notes/Time-README.md).

Member source files and original notes are preserved. The linked original notes describe individual prototypes; this root README describes the final running project.

## Techniques and optimisation

The implementation uses classes, arrays, loops, image sampling, pixel masks, `noise()`, `random()`, `lerp()`, trigonometric waves, `millis()`, and `translate()`/`rotate()` with `push()`/`pop()`. Bilinear pixel sampling and polygon masking support the image-based effects.

Cached sky geometry and pixel buffers reduce repeated work, and mouse waves are calculated only inside their influence radius. In a controlled moving-mouse comparison, median drawing time fell from 34.7 ms to 13.9 ms with identical screenshots; actual performance varies by device.

## Checks and limitations

Checks covered JavaScript syntax, script/assets loading, combined wind and mouse movement, harvesting, X-key pause/resume, daylight/sunset switching, scaled sun clicks and browser runtime errors.

The time cycle is 840 active frames, approximately 14 seconds at 60 fps. The canvas retains its 800 x 632 internal coordinates and scales through CSS; masks fit this source image. Tree edges and the harvesting background patch may remain visible, and harvesting animates a gesture without permanently removing wheat.


