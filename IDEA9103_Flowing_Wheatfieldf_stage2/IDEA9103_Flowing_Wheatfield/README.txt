IDEA9103 - Flowing Wheatfield
Version 2: Pixel Sky and Click-to-Harvest Interaction

PROJECT OVERVIEW

This is the second version of the user-input prototype for our p5.js group
reinterpretation of Vincent van Gogh's Wheatfield with a Reaper.

It retains Version 1's mouse-driven wheat movement and adds a pixel-style sky
and a clickable harvesting animation. The wheatfield, mountains and tree keep
their original painted texture.

CHANGES FROM VERSION 1

- Added Sky.js to represent the sky with 6-pixel colour blocks.
- Preserved the mountain outline and restored the tree's original brushstrokes.
- Added Reaper.js so clicking the figure triggers a harvesting gesture.
- Updated sketch.js and index.html to load and coordinate the new classes.

FILE STRUCTURE

- index.html: loads p5.js 1.9.4 and the project scripts, and centres the canvas.
- sketch.js: loads the painting, creates the objects and handles mouse clicks.
- Wheat.js: controls the field mask, mouse response and pixel displacement.
- Sky.js: samples sky colours and draws blocks around the mountain boundary.
- Reaper.js: extracts the painted body and arm, then animates a harvesting action.
- assets/vangogh.jpg: the original 800 x 632 painting.

HOW THE PROGRAM RUNS

1. preload() loads the artwork.
2. setup() creates the canvas and the Wheat, Sky and Reaper objects.
3. draw() displays the original painting, pixel sky, animated wheat and reaper.
4. mousePressed() checks whether the figure was clicked and starts its animation.

THE WHEAT CLASS

A soft mask limits pixel displacement to the wheatfield and protects the figure.
wheatTop(x) estimates the field boundary using points and lerp().

display() samples shifted source pixels and blends neighbouring colours,
preserving brushstrokes. Each frame starts from the original image data.

MOUSE INTERACTION

Mouse movement creates local waves and directional drag. constrain() limits
movement, and lerp() smooths the response and fade-out.

sin(), cos() and frameCount animate the waves. Hovering inside the canvas keeps
them active; moving outside lets them fade.

THE SKY CLASS

Sky samples the painting into 6-pixel colour blocks. Stored boundary points
trim the blocks along the mountain ridge.

Original-image strips restore the tree above the pixel sky. The sky is static
in this version, and the sun is included in its pixel pattern.

THE REAPER CLASS

Polygon outlines extract the painted upper body and arm into transparent layers.
A patch of nearby wheat covers the figure's original upper-body position.

Clicking the figure starts a 2.1-second action: reach, swing and return.
translate(), rotate() and lerp() move the body around the waist and the arm
around the shoulder, while the legs stay fixed. A drawn sickle follows the hand.

MAIN PARAMETERS

- Wheat radius = 175: mouse influence range.
- waveStrength = 28; verticalStrength = 9: wave intensity.
- Sky pixelSize = 6: colour-block size.
- Reaper duration = 2100: animation length in milliseconds.

VERSION 2 SCOPE

This version combines mouse-driven wheat, a static pixel sky and click-to-harvest.
The harvesting gesture does not permanently remove wheat.

The group's Noise and Time mechanics, X-key pause and sun switching are not yet
included. Masks are approximate, and background patches may show during movement.

HOW TO RUN

1. Open the folder in VS Code and run index.html with Live Server.
2. Stay online to load p5.js.
3. Move over the wheatfield to make it flow; click the reaper to play the gesture.

TECHNIQUES

Classes, arrays, loops, image sampling, pixel masks, mouse input, millis(),
sin()/cos(), frameCount, constrain(), lerp(), translate(), rotate(), push()/pop().

ACKNOWLEDGEMENT

Artwork: Vincent van Gogh, Wheatfield with a Reaper (1889), supplied by the group.

ChatGPT/Codex assisted with code development, sky sampling, figure extraction,
animation fixes, explanations and this Version 2 documentation.
