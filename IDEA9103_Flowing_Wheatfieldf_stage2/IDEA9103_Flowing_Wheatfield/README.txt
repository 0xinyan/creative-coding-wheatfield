IDEA9103 — Flowing Wheatfield (Mouse Interaction)

FILES
index.html        Loads p5.js, Wheat.js, and sketch.js
sketch.js         Shared p5.js setup()/draw() test file
Wheat.js          Wheat class and your mouse interaction
assets/vangogh.jpg  Original 800x632 painting

RUN
1. Open the folder using VS Code.
2. Start Live Server and open index.html (an internet connection is needed for the p5.js CDN).
3. Move the cursor across the WHEATFIELD to make the painting flow.
4. Move the cursor outside the canvas to let the effect fade.

TEAM INTEGRATION
- Keep only ONE setup() and ONE draw() in the shared sketch.js.
- Load Wheat.js before sketch.js in index.html.
- In your team's setup(): wheat = new Wheat(painting);
- In draw() after the background: wheat.updateMouse(); wheat.display();
- Optional noise teammate interface: wheat.setNoiseOffset(windX, windY);
- Noise is NOT implemented in this ZIP.

CUSTOMISE IN Wheat.js
this.radius             Default 175 — mouse influence radius
this.waveStrength       Default 28  — horizontal flow intensity
this.verticalStrength   Default 9   — vertical flow intensity

NOTE
The wheatfield/reaper mask is approximate and calibrated only for the included painting.
The effect is pixel displacement of original artwork, not per-stalk wheat simulation.
