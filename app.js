export function formatTime(date) {
  const h = String(date.getHours()).padStart(2, '0');
  const m = String(date.getMinutes()).padStart(2, '0');
  const s = String(date.getSeconds()).padStart(2, '0');
  return `${h}:${m}:${s}`;
}

function updateClock() {
  const el = document.getElementById('clock');
  if (el) {
    el.textContent = formatTime(new Date());
  }
}

async function requestWakeLock() {
  try {
    if ('wakeLock' in navigator) {
      let lock = await navigator.wakeLock.request('screen');
      document.addEventListener('visibilitychange', async () => {
        if (document.visibilityState === 'visible') {
          lock = await navigator.wakeLock.request('screen');
        }
      });
    }
  } catch {
    // Wake Lock not supported or denied
  }
}

if (typeof document !== 'undefined') {
  updateClock();
  setInterval(updateClock, 1000);
  requestWakeLock();
}
