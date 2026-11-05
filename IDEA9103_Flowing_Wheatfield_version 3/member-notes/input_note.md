# Input Mechanic and Integration Notes

**Version 3 - Final Group Assignment Version**

This is the third version of my input-mechanic work and the final integrated version of our group assignment.

My main responsibility was the user-input mechanic, including mouse-driven wheat movement and click interactions. I also combined the individual prototypes into the final group project, with ChatGPT/Codex assistance.

- **Wheat class:** Developed an image-based wheat layer that preserves the original brushstrokes. A soft mask limits deformation to the field and protects the painted figure.

- **Mouse interaction:** Used mouse position and movement to create local wheat waves and directional drag. `lerp()` smooths the response and fade-out.

- **Pixel sky:** Added a 6-pixel sky following the tutor's feedback, while keeping the mountains and wheat painterly. Restored the tree's original image texture above the sky.

- **Click-to-harvest:** Added a click-triggered animation using painted body and arm cutouts. Rotation around the waist and shoulder creates a reach, cutting swing and return gesture.

- **Shared project structure:** Combined the modules through one `preload()`, `setup()` and `draw()` in `sketch.js`. Updated script loading and drawing order so the layers work together.

- **Time integration:** Connected Xinyan LIN's `Time_based03` module and its image assets. Used a shared sun-free background to avoid a duplicate sun and placed the moving sun behind the mountains.

- **Noise integration:** Adapted Tang Xinyue's wind output so Wheat combines natural wind and mouse displacement in one rendering pass. Applied sky noise after the time-based colours so both effects remain visible.

- **Performance optimisation:** Cached sky geometry and pixel buffers, reduced repeated interpolation calls and calculated mouse waves only within their influence area. A controlled browser test reduced median draw time from 34.7 ms to 13.9 ms with identical comparison screenshots.

- **X-key time control:** Added pause/resume for the sun and time-of-day colours using an independent clock. Natural sky variation, wheat wind and mouse interactions continue while time is paused.

- **Sun interaction:** Added daylight/sunset switching by clicking the visible sun while paused. A header button provides the same control when the sun is hidden behind the mountains.

- **Instructions and feedback:** Added interaction instructions and a running/paused status above the artwork. Pointer feedback and scaled hit testing help users identify and click interactive elements.

- **Original member files:** Preserved teammates' original files, comments and README documents. Kept the modified Noise implementations and time controls separately in `integration/`.

- **Checks and documentation:** Checked the combined interactions, pause/resume, sun switching, smaller-screen clicks and browser errors. Prepared the Version 1 and Version 2 README descriptions and these final contribution notes.

## Acknowledgement

ChatGPT/Codex assisted with code development, integration, debugging, performance optimisation, browser checks and documentation. The Time and Noise mechanics were contributed by the group members named above; these notes describe my input mechanic and the work connecting the contributions.
