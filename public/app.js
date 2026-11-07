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
  toggle.textContent = running ? 'Sett på pause' : 'Start demo +';
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

// Illustrative data only. No applications or activity are detected by this page.
const examplePrograms = [
  {name: 'Microsoft Excel', task: 'Regneark og gjentatte operasjoner', clicks: 2480, distance: 86},
  {name: 'Nettleser', task: 'Fagsystemer, søk og navigasjon', clicks: 1920, distance: 124},
  {name: 'Microsoft Outlook', task: 'E-post og kalender', clicks: 1140, distance: 42},
  {name: 'Microsoft Teams', task: 'Møter og samarbeid', clicks: 680, distance: 28},
];
function renderRanking(metric) {
  const sorted = [...examplePrograms].sort((a, b) => b[metric] - a[metric]);
  const list = document.querySelector('#ranking-list');
  list.replaceChildren(...sorted.map((program, index) => {
    const row = document.createElement('li');
    const rank = document.createElement('span'); rank.className = 'rank-number'; rank.textContent = `0${index + 1}`;
    const label = document.createElement('div'); label.className = 'rank-label';
    const name = document.createElement('strong'); name.textContent = program.name;
    const task = document.createElement('small'); task.textContent = program.task;
    label.append(name, task);
    const value = document.createElement('span'); value.className = 'rank-value';
    value.textContent = `${program[metric].toLocaleString('nb-NO')} ${metric === 'clicks' ? 'klikk' : 'm'}`;
    row.append(rank, label, value); return row;
  }));
  document.querySelectorAll('[data-rank]').forEach(button => button.setAttribute('aria-pressed', String(button.dataset.rank === metric)));
}
document.querySelectorAll('[data-rank]').forEach(button => button.addEventListener('click', () => renderRanking(button.dataset.rank)));
renderRanking('clicks');
