IDEA9103 - Flowing Wheatfield
Version 1: Mouse Interaction Prototype

PROJECT OVERVIEW

This is the first version of the user-input mechanic for our p5.js group
reinterpretation of Vincent van Gogh's Wheatfield with a Reaper.

The aim is to preserve the original painting's brushstrokes while making the
wheatfield respond to the mouse. Instead of drawing individual wheat stalks,
the program displaces pixels from the original image to create a flowing effect.
This version focuses on the Wheat class and mouse interaction before integration
with the other group members' mechanics.

FILE STRUCTURE

- index.html: lays out the page and loads p5.js 1.9.4, Wheat.js and sketch.js,
  in that order. The canvas is centred against a dark background.
- sketch.js: loads the artwork, creates the canvas and Wheat object, and
  coordinates the update and drawing calls.
- Wheat.js: defines the Wheat class, including the image data, field mask,
  mouse response and pixel-based rendering.
- assets/vangogh.jpg: the original 800 x 632 painting used as the image source.

HOW THE PROGRAM RUNS

1. preload() loads the painting before setup() begins.
2. setup() creates a canvas matching the image dimensions, sets pixelDensity(1),
   and constructs one Wheat object.
3. Each draw() frame first displays the original painting.
4. wheat.updateMouse() updates the mouse position, influence and drag values.
5. wheat.display() samples displaced image pixels and draws the resulting wheat
   layer over the original artwork.

THE WHEAT CLASS

The constructor stores image pixels, creates a drawing layer and builds a
mask to limit movement to the wheatfield.

wheatTop(x) uses boundary points and lerp() to outline the field. A soft mask
blends the edge and protects the reaper.

display() shifts source pixels and blends neighbouring colours with lerp(),
retaining the original brushstrokes. Each frame starts from the original data.

MOUSE INTERACTION

Mouse movement creates local waves and directional drag. constrain() limits
movement, while lerp() smooths the response.

sin(), cos() and frameCount animate the waves. Hovering keeps them active;
leaving the canvas makes them fade. Only masked wheat pixels move.

MAIN PARAMETERS

- radius = 175: mouse influence range.
- waveStrength = 28: horizontal strength.
- verticalStrength = 9: vertical strength.

VERSION 1 SCOPE

This first version focuses on mouse-driven wheat deformation. Pixel sky,
harvesting and the Time/Noise mechanics are not included.

setNoiseOffset(x, y) reserves a wind input for later integration.
The approximate field and figure masks fit the supplied painting.

HOW TO RUN

1. Open the folder in VS Code and run index.html with Live Server.
2. Stay online to load p5.js.
3. Move over the wheatfield; leave the canvas to see the effect fade.

TECHNIQUES

Classes, arrays, loops, pixel manipulation, masks, mouse input, sin()/cos(),
frameCount, constrain(), lerp() and typed arrays.

ACKNOWLEDGEMENT

Artwork: Vincent van Gogh, Wheatfield with a Reaper (1889), supplied by the group.

ChatGPT/Codex assisted with code development, explanations and this documentation.
