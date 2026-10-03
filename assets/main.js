// Shared scripts for every page.

// Live San Luis Obispo clock (homepage status line only)
const clock = document.getElementById('clock');
if (clock) {
  const fmt = new Intl.DateTimeFormat('en-US', {
    hour: '2-digit', minute: '2-digit', second: '2-digit', hour12: false, timeZone: 'America/Los_Angeles'
  });
  const tick = () => { clock.textContent = fmt.format(new Date()); };
  tick();
  setInterval(tick, 1000);
}

// Prompt log toggle in the footer
const btn = document.querySelector('.log-btn');
const log = document.getElementById('log');
if (btn && log) {
  btn.addEventListener('click', () => {
    const open = log.hidden;
    log.hidden = !open;
    btn.setAttribute('aria-expanded', String(open));
    btn.textContent = open ? 'close log ×' : 'how this was made';
  });
}
