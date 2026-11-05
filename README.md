# Flowing Wheatfield

**IDEA9103 Creative Coding · Final Group Submission**

*Flowing Wheatfield* is an interactive p5.js reinterpretation of Vincent van Gogh’s *Wheatfield with a Reaper* (1889). The project combines three mechanics: mouse and keyboard input, Perlin noise and randomness, and time-based animation.

## Inspiration

Van Gogh’s curved brushstrokes make the wheatfield look as though it is already moving. We used the original painted pixels to carry that movement into the interaction. Natural wind keeps the field in motion, and the mouse adds a local wave that follows the viewer’s movement.

Following tutor feedback, we rebuilt the sky as a grid of six-pixel colour blocks while retaining the painted texture of the wheat, mountains and tree. The separate sun and mountain layers let the sun descend behind the ridge. The reaper’s gesture gives the viewer another way to interact with the painting.

## How to run

1. Download or clone the repository from the `main` branch.
2. Open the project folder in VS Code.
3. Open `index.html` with Live Server or another local web server.
4. Keep an internet connection available so the page can load p5.js 1.9.4 from the CDN.

## Interaction instructions

| Action | Result |
| --- | --- |
| Move the mouse across the wheatfield | Nearby wheat sways and follows the direction of your movement. Move outside the canvas to let the mouse effect fade. |
| Click the painted reaper | The figure leans forward, swings his sickle and returns to his starting pose. |
| Press **X** | Pause the sun’s movement and the time-of-day colour transitions. Press **X** again to resume. |
| Click the visible sun while paused | Switch between daylight and sunset. |
| Use the button above the painting while paused | Switch the lighting when the sun is hidden behind the mountains. |

Natural wheat wind, subtle changes in sky brightness and mouse interactions continue while time is paused. The instructions above the painting show the current time state.

## Techniques and design decisions

- **Image sampling and masking.** `loadImage()`, `loadPixels()` and `updatePixels()` give us access to the painting’s pixels. A soft mask limits deformation to the wheatfield and reduces movement around the figure. The renderer samples neighbouring pixels at shifted positions to keep the moving brushstrokes smooth.
- **Mouse input and easing.** The difference between `mouseX` and `pmouseX`, and between `mouseY` and `pmouseY`, determines the direction of the local drag. Interpolation smooths the response and fade-out. Sine and cosine waves add a swaying motion around the pointer.
- **Perlin noise and randomness.** `noise()` creates continuous variations in wind and sky brightness. `random()` assigns fixed differences to the wind grid during setup. The renderer interpolates between nearby wind samples and combines their offsets with the mouse displacement before drawing the wheat.
- **Pixel sky and scene lighting.** The sky samples colours from the sun-free painting and follows the mountain outline. Time adjusts the base sky colours and Noise adds local brightness variation. Drawing the mountain layer over the moving sun creates the sunset occlusion.
- **Harvesting animation.** The reaper’s upper body and arm are cut out from the source painting. `translate()` and `rotate()` move those layers around the waist and shoulder. Easing controls the reach, cutting swing and return, and the original legs stay fixed.
- **Independent time control.** A separate clock drives the Time module. Pausing this clock holds the sun and lighting at their current state while the main drawing loop continues updating the field, sky Noise and reaper.

We cache the sky’s fixed geometry and reuse pixel buffers to reduce work during `draw()`. Mouse waves are evaluated only within their area of influence. In a controlled browser comparison with a moving mouse, the median drawing time decreased from 34.7 ms to 13.9 ms per frame, and the comparison screenshots matched.

## Code structure

| File or folder | Responsibility |
| --- | --- |
| `index.html` | Loads p5.js and the project scripts, and displays the instructions and time status. |
| `sketch.js` | Loads the artwork, creates the scene objects, coordinates drawing order and handles input events. |
| `Wheat.js` | Builds the field mask and renders the combined mouse and wind displacement. |
| `Sky.js` | Builds the pixel sky, updates its colours and restores the original tree detail. |
| `Reaper.js` | Creates the figure’s image layers and plays the harvesting gesture. |
| `Time.js` | Provides the original time cycle, sky colours, sun movement and lighting. |
| `integration/` | Contains the adapted wind and sky Noise modules and the pause and sun-switching controls. |
| `assets/` | Contains the original painting, sun-free background, sun, mountain foreground and tree layers. |
| `member-notes/` | Contains the individual contribution notes and original member documentation. |

The final page loads the Noise adapters from `integration/`. The two original Noise scripts remain at the repository root as records of the teammate’s contribution.

## Mechanic ownership

| Team member | Mechanic and contribution |
| --- | --- |
| **[Your name]** | **User Input and shared integration.** Developed the mouse-driven wheat, pixel sky and click-to-harvest interaction. Integrated the group modules and added the pause and sun controls, on-screen instructions and rendering optimisations. [Input contribution notes](./member-notes/input_note.md) |
| **Tang Xinyue** | **Perlin Noise and Randomness.** Developed the natural wind in the wheatfield and the gradual brightness variations in the sky. [Noise contribution notes](./member-notes/Noise-README.md) |
| **Xinyan LIN** | **Time-based.** Developed `Time_based03`, including the daylight-to-sunset transitions, the sun’s path, scene lighting and associated image layers. [Time contribution notes](./member-notes/Time-README.md) |

## AI acknowledgement

We used **ChatGPT/Codex** to assist with code drafting, debugging, preparing image layers, integrating the mechanics, improving performance and writing documentation. Relevant code comments and member notes record this assistance.

- In `Wheat.js` and `Sky.js`, AI-assisted code uses masks and image sampling to retain the painting’s texture. Wheat colours come from displaced source positions. Sky blocks stay in place and change colour.
- In `Reaper.js`, AI assistance helped separate the upper-body layers and refine their rotations. A patch sampled from nearby wheat covers the original upper-body position during the gesture.
- In `sketch.js` and `integration/`, AI assistance helped connect the shared drawing loop, combine wind and mouse offsets, and add time controls. The independent clock lets the viewer pause the lighting cycle while the other mechanics continue.

## External references

- **Vincent van Gogh, *Wheatfield with a Reaper* (1889).** The painting’s brushwork, sun and reaper informed the movement and layering of the scene. The project image was supplied through the group’s shared assets. [Van Gogh Museum collection record](https://www.vangoghmuseum.nl/en/collection/s0049V1962)
- **IDEA9103 lecture and tutorial materials.** Course examples on classes, arrays, image manipulation, Perlin noise, easing and transformations informed the implementation.
- **p5.js 1.9.4.** The project uses the library for drawing, image and pixel operations, input events, noise and transformations. The dependency is declared in `index.html`. [Library used by the project](https://cdn.jsdelivr.net/npm/p5@1.9.4/lib/p5.min.js)

## Testing and limitations

We checked JavaScript syntax, image loading, mouse and wind interaction, harvesting, time pause and resume, daylight and sunset switching, and click positions at different canvas sizes.

The automatic time cycle lasts 840 active frames, or approximately 14 seconds at 60 fps. The canvas scales to the browser width while retaining its original 800 × 632 coordinate system. Harvesting plays a short gesture, after which the figure returns to its original pose and the wheatfield remains intact.
