# Integration adapters

The root `noise-mechanic.js`, `sky-background.js` and `Time.js` preserve the
teammates' original files, including all original comments, byte for byte.
Unmodified teammate README files are retained under `member-notes/`.

The page loads the two Noise adapters in this directory instead of the two
original Noise files. Loading both versions would duplicate their declarations.
`Time.js` is loaded directly from the root because no adaptation was needed.

The adapters retain the running integration and performance improvements:
spatial wind is provided to Wheat's single renderer; sky noise adjusts Time's
colours in the existing Sky renderer. Their comments describe integration work,
not replacements for the teammates' original notes.

AI acknowledgement: ChatGPT assisted with these adapters and the separation of
original member source files from integrated implementations.

## Time controls

`time-controls.js` adds the input mechanic without editing the original Time.js.
It advances that file using a private frame clock and immediately restores p5's
live frameCount, keeping mouse waves and the wind independent from time pause.

- X toggles pause/resume without jumping forward on resume. Held-key repeats are ignored.
- While paused, the sun and time-of-day light state remain frozen. Sky noise
  brightness continues naturally, independently of the time clock.
- Wind, mouse wheat and click-to-harvest continue through the normal draw loop.
- Clicking a visible sun switches between daylight (frame 0) and sunset (frame 480).
  The latter retains a visible portion above the mountain for a return click.
- The header offers the same switch while paused, including moments when the
  automatic cycle has already hidden the sun. Hit testing respects source alpha,
  mountain occlusion and CSS scaling.
- Instructions and the current time state appear in the black area above the art.
