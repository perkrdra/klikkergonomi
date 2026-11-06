'use strict';
const pad = document.querySelector('#pad');
const toggle = document.querySelector('#toggle');
const status = document.querySelector('#status');
const dot = document.querySelector('#dot');
let running = false, clicks = 0, distance = 0, previous = null;
function render() {
  document.querySelector('#clicks').textContent = clicks.toLocaleString('nb-NO');
  document.querySelector('#distance').textContent = Math.round(distance).toLocaleString('nb-NO');
}
toggle.addEventListener('click', () => {
  running = !running; previous = null;
  toggle.textContent = running ? 'Sett på pause' : 'Start demo ↗';
  status.textContent = running ? 'Måler i feltet' : 'På pause';
  if (!running) dot.style.display = 'none';
});
document.querySelector('#reset').addEventListener('click', () => {
  clicks = 0; distance = 0; previous = null; render();
});
pad.addEventListener('pointermove', event => {
  if (!running || event.pointerType !== 'mouse') return;
  if (previous) distance += Math.hypot(event.clientX - previous.x, event.clientY - previous.y);
  previous = {x:event.clientX, y:event.clientY};
  const rect = pad.getBoundingClientRect();
  dot.style.display = 'block'; dot.style.left = `${event.clientX - rect.left}px`; dot.style.top = `${event.clientY - rect.top}px`;
  render();
});
pad.addEventListener('pointerleave', () => { previous = null; dot.style.display = 'none'; });
pad.addEventListener('pointerdown', event => { if (running && event.pointerType === 'mouse') { clicks++; render(); } });
document.addEventListener('visibilitychange', () => { previous = null; });
