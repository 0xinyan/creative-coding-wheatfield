// Mouse/keyboard controls for the shared scene. Original Time.js is unchanged.
// AI assistance: ChatGPT helped connect pause/resume and manual lighting modes.
class TimeControls {
  constructor() {
    this.paused = false;
    this.frame = 0;
    this.status = document.getElementById('time-status');
    this.switchButton = document.getElementById('sun-toggle');
    this.switchButton.addEventListener('click', () => this.switchMode());
    timeSun.loadPixels();
    timeMountains.loadPixels();
    this.lastCursor = '';
    this.updateInstructions();
  }

  applyFrame(frame) {
    // Run the member's frame-based function on an independent clock. Restore
    // p5's counter immediately so the mouse/wheat animation keeps its own time.
    const liveFrame = frameCount;
    try {
      frameCount = frame;
      updateTime();
    } finally {
      frameCount = liveFrame;
    }
  }

  update() {
    if (this.paused) return;
    this.applyFrame(this.frame);
    this.frame = (this.frame + 1) % 840;
  }

  togglePause() {
    this.paused = !this.paused;
    // Freeze the displayed moment, then resume from the following frame.
    this.frame = this.paused ? timeFrame : (timeFrame + 1) % 840;
    this.updateInstructions();
  }

  switchMode() {
    if (!this.paused) return;
    // At frame 480 sunset colours are strong, but the sun still peeks above
    // the mountain and can be clicked again. Frame 600 would hide it entirely.
    this.frame = timeSunset >= 0.5 ? 0 : 480;
    this.applyFrame(this.frame);
    this.updateInstructions();
  }

  containsSun(x, y) {
    if (!this.paused || timeFrame >= 720 || x < 0 || y < 0 || x >= width || y >= height) return false;
    const sunX = (301 + 214 * timeProgress) * width / 800;
    const sunY = (39 + 136 * timeProgress) * height / 632;
    const size = 102 - 18 * timeProgress;
    const drawWidth = size * width / 800;
    const drawHeight = size * height / 632;
    const u = (x - sunX + drawWidth / 2) / drawWidth;
    const v = (y - sunY + drawHeight / 2) / drawHeight;
    if (u < 0 || v < 0 || u >= 1 || v >= 1) return false;
    const sunIndex = 4 * (Math.floor(v * timeSun.height) * timeSun.width + Math.floor(u * timeSun.width));
    const mx = Math.floor(x * timeMountains.width / width);
    const my = Math.floor(y * timeMountains.height / height);
    const mountainIndex = 4 * (my * timeMountains.width + mx);
    // Only the visible painted sun responds, not transparent padding or mountain.
    return timeSun.pixels[sunIndex + 3] > 30 && timeMountains.pixels[mountainIndex + 3] < 200;
  }

  updateCursor() {
    const next = this.containsSun(mouseX, mouseY) || reaper.contains(mouseX, mouseY) ? 'pointer' : 'default';
    if (next !== this.lastCursor) {
      cursor(next);
      this.lastCursor = next;
    }
  }

  updateInstructions() {
    this.status.textContent = this.paused
      ? 'TIME PAUSED · Sky motion, wind and mouse interaction remain active'
      : 'TIME RUNNING · Press X to pause the sun and time-of-day colours';
    this.switchButton.hidden = !this.paused;
    this.switchButton.textContent = timeSunset >= 0.5 ? 'Switch to daylight' : 'Switch to sunset';
  }
}
