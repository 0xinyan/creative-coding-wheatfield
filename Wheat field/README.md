# Wheat Field — Natural Wind Pilot

## Project

This Week 9 pilot supports our group reinterpretation of
Van Gogh's Wheatfield with a Reaper.

The pilot explores stable random variation and smooth
wind-driven movement in a simplified wheat field.

## Mechanic ownership

Tang Xinyue: Perlin noise + randomness.

The mechanic is stored in noise-mechanic.js.

## Running the project

1. Open the project folder in Visual Studio Code.
2. Check that libraries/p5.min.js is present.
3. Open index.html with Live Server.
4. Observe the wheat field in the browser.

No mouse interaction is required.

## Pilot implementation

- Fixed canvas: 900 x 600.
- Static sky, sun and ground.
- 180 wheat stalks arranged in six rows.
- Random differences in position, height and colour.
- Continuous swaying controlled by Perlin noise.

Random stalk properties are generated once during setup.
They are not regenerated every frame.

## Code structure

- sketch.js: main setup, draw and background.
- noise-mechanic.js: stalk creation, wind calculation and drawing.
- WheatStalk: stores and draws each stalk.
- stalks: array containing the shared wheat field.
- createWheatField(): generates the initial stalk data.
- getWindBend(): calculates wind-driven bending.
- updateWind(): updates the wind progress and stalk bends.
- drawWheatField(): draws the shared stalk array.

## Shared group rules

Design coordinates: 900 x 600.

Horizon: y = 250.

Each stalk stores:
- baseX and baseY
- stalkHeight
- baseR, baseG and baseB
- noiseOffset
- windBend
- inputBend

The noise mechanic updates windBend.

The mouse mechanic will update inputBend.

Final bending is windBend + inputBend.

The time mechanic will update sceneState colours,
sun position and wheat RGB shifts.

The original stalk colours remain unchanged.

The final group project will use one global setup()
and one global draw().

## Planned development

- Add the group's mouse-input mechanic.
- Add the group's time-based mechanic.
- Refine the artwork composition.
- Adjust wheat density, colours and visual details.
- Address final window-size requirements during integration.

The current stalk data and wind logic will remain
the foundation for further development.

## Course techniques

- Objects, functions, arrays and loops.
- Classes, constructors and drawing methods.
- setup() and draw().
- Basic shapes, line(), fill() and stroke().
- random(), noise() and constrain().

## AI acknowledgement

ChatGPT assisted with project planning, code organisation
and code generation.

random() creates stable initial differences between stalks.

noise() produces smoothly changing values used to calculate
wind-driven bending.

The code will be reviewed, tested and explained before submission.