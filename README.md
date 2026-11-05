# Flowing Wheatfield

**IDEA9103 Creative Coding · Final Group Submission**

*Flowing Wheatfield* is an interactive p5.js reinterpretation of Vincent van Gogh’s *Wheatfield with a Reaper* (1889). Move the mouse to send waves through the wheat, click the reaper to animate his harvesting gesture, or pause the passage of time and switch between daylight and sunset.

[Open the final project](./IDEA9103_Flowing_Wheatfield_version%203/) · [Read the final project’s technical notes](./IDEA9103_Flowing_Wheatfield_version%203/README.md)

## Inspiration

We were drawn to the way Van Gogh’s curved brushstrokes already suggest movement in a still image. We used those painted marks as the material for our animation. When the mouse passes over the field, nearby brushstrokes bend and flow, while Perlin noise makes the field move gently on its own.

Following tutor feedback, we represented the sky with six-pixel colour blocks and retained the painted texture of the wheat, mountains and tree. The contrast makes the changing light easy to see while preserving the original landscape. We also separated the painted sun and parts of the reaper into image layers so both could move within the original composition.

## Three iterations

The first two versions document the development of the User Input contribution. The third is the group’s final submission and combines all three team mechanics.

| Version | Development |
| --- | --- |
| [Version 1 · Mouse Interaction Prototype](./IDEA9103_Flowing_Wheatfield/) | Built a wheat mask and used mouse movement to displace nearby image pixels while retaining the original brushstrokes. |
| [Version 2 · Pixel Sky and Harvesting](./IDEA9103_Flowing_Wheatfieldf_stage2/IDEA9103_Flowing_Wheatfield/) | Added the pixel sky, preserved the painted tree, and introduced the click-triggered reaper animation. |
| [Version 3 · Final Group Submission](./IDEA9103_Flowing_Wheatfield_version%203/) | Combined User Input, Noise and Time. Added pause/resume, daylight and sunset switching, on-screen instructions, and rendering optimisations. |

## How to run

1. Download or clone the repository.
2. Open the `IDEA9103_Flowing_Wheatfield_version 3` folder in VS Code.
3. Run that folder’s `index.html` with Live Server or another local web server.
4. Keep an internet connection available so the page can load p5.js 1.9.4 from the CDN.

## Interaction instructions

| What you do | What happens |
| --- | --- |
| Move the mouse across the wheatfield | Nearby wheat sways and responds to the direction of your movement. The mouse effect gradually fades when the pointer leaves the canvas. |
| Click the painted reaper | The figure leans forward, swings his sickle, and returns to his starting pose. |
| Press **X** | Pause the sun’s movement and the time-of-day colour transitions. Press **X** again to resume. |
| Click the visible sun while paused | Switch between daylight and sunset. |
| Use the button above the painting while paused | Switch the lighting when the sun is hidden behind the mountains. |

While time is paused, natural sky brightness, wheat wind, mouse movement and harvesting continue. The instructions above the painting show whether the time cycle is running or paused.

## Techniques and design decisions

| Technique | How we used it and why |
| --- | --- |
| Image sampling and masks | `loadImage()`, `loadPixels()` and `updatePixels()` let us animate the original artwork. `Wheat.js` uses a soft mask to limit deformation to the field and reduce movement around the reaper. |
| Mouse input and interpolation | The difference between the current and previous mouse positions determines the direction of the local displacement. Interpolation smooths the response, and blending neighbouring source pixels helps retain the painted texture. |
| Perlin noise and randomness | `noise()` produces gradual variations in wind and sky brightness. `random()` assigns fixed differences to wind sample points during setup, so the field has variety without flickering between frames. |
| Pixel sky and layered artwork | `Sky.js` samples colours into six-pixel blocks along the mountain outline. A separate foreground layer lets the moving sun disappear behind the mountains, and the tree layer retains its original painted detail. |
| Transformations and easing | `Reaper.js` extracts the painted upper body and arm into image layers. `translate()` and `rotate()` move them around waist and shoulder pivots, while easing shapes the reach, swing and return. `push()` and `pop()` isolate the transformations from the rest of the scene. |
| Frame-based time control | The Time mechanic changes the sun position and scene colours through a frame-based cycle. A separate time controller pauses or selects a moment in that cycle while the other animations keep updating. |

In the final version, `sketch.js` coordinates image loading, input events and the drawing order. `Wheat.js` combines natural wind and mouse displacement before drawing one wheat layer. `Sky.js` applies time-of-day colours first, then adds Noise brightness variation. This lets both mechanics affect the same scene without one layer covering the other.

We cache the sky’s fixed geometry and pixel buffers, and calculate mouse waves only within their area of influence. In a controlled browser comparison, median drawing time decreased from **34.7 ms to 13.9 ms per frame**, and the comparison screenshots matched.

## Mechanic ownership

| Team member | Mechanic and contribution |
| --- | --- |
| **[Your name]** | **User Input and shared integration.** Developed the mouse-driven wheat, pixel sky and click-to-harvest animation. Connected the team modules, added pause and sun switching, and worked on rendering performance and interaction instructions. [Input notes](./IDEA9103_Flowing_Wheatfield_version%203/member-notes/input_note.md) |
| **Tang Xinyue** | **Perlin Noise and Randomness.** Developed the natural wheat wind and slowly varying sky brightness. The final version adapts these effects to the shared wheat and sky renderers. [Noise notes](./IDEA9103_Flowing_Wheatfield_version%203/member-notes/Noise-README.md) |
| **Xinyan LIN** | **Time-based.** Developed `Time_based03`, which controls the daylight-to-sunset colour changes, the moving sun, scene lighting and the associated image layers. [Time notes](./IDEA9103_Flowing_Wheatfield_version%203/member-notes/Time-README.md) |

## AI acknowledgement

We used **ChatGPT/Codex** to assist with code drafting, debugging, image-layer preparation, module integration, performance checks and documentation. The relevant code comments and individual contribution notes record this assistance.

- **Wheat and sky rendering.** AI-assisted changes helped sample colours from the original image, restrict deformation with masks and reuse pixel buffers. The wheat effect reads from shifted positions in the source image. The sky keeps its block positions and updates their colours.
- **Reaper animation.** AI assistance helped separate the painted body and arm and refine their movement. The code rotates the two layers around fixed pivots and uses nearby wheat pixels to fill the space exposed by the moving figure.
- **Integration and controls.** AI assistance helped combine wind and mouse offsets and connect the sky’s colour effects. It also helped implement the separate time clock that lets **X** pause the sun and lighting while the wind, sky Noise and mouse interactions continue.

## External references

- **Vincent van Gogh, *Wheatfield with a Reaper* (1889).** The painting’s composition, brushstrokes, sun and reaper informed our choice of layers and interactions. The image used in the project was supplied through the group’s shared assets. [Van Gogh Museum collection record](https://www.vangoghmuseum.nl/en/collection/s0049V1962)
- **IDEA9103 lecture and tutorial materials.** The course exercises on classes and arrays, image manipulation, Perlin noise, easing and transformations informed how we organised and animated the scene.
- **p5.js 1.9.4.** The project uses p5.js for the canvas, image and pixel operations, input events, noise and transformations. The dependency is declared in `index.html`. [p5.js library used by the project](https://cdn.jsdelivr.net/npm/p5@1.9.4/lib/p5.min.js)

## Testing and limitations

We checked JavaScript syntax, asset loading, mouse and wind interaction, harvesting, pause/resume, daylight and sunset switching, and click positions when the canvas is scaled. The time cycle takes about 14 seconds at 60 fps and can run slower on devices with a lower frame rate. The harvesting gesture returns the figure to its original pose, and the wheatfield remains intact.
