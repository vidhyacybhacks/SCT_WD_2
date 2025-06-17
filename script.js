let startTime, updatedTime, difference, timerInterval;
let running = false;
let laps = [];

const timeDisplay = document.getElementById('time');
const lapsContainer = document.getElementById('laps');

function formatTime(ms) {
  const date = new Date(ms);
  const minutes = String(date.getUTCMinutes()).padStart(2, '0');
  const seconds = String(date.getUTCSeconds()).padStart(2, '0');
  const milliseconds = String(date.getUTCMilliseconds()).padStart(3, '0');
  return `${minutes}:${seconds}.${milliseconds}`;
}

function updateDisplay() {
  updatedTime = Date.now();
  difference = updatedTime - startTime;
  timeDisplay.textContent = formatTime(difference);
}

document.getElementById('startBtn').addEventListener('click', () => {
  if (!running) {
    startTime = Date.now() - (difference || 0);
    timerInterval = setInterval(updateDisplay, 10);
    running = true;
  }
});

document.getElementById('pauseBtn').addEventListener('click', () => {
  if (running) {
    clearInterval(timerInterval);
    running = false;
  }
});

document.getElementById('resetBtn').addEventListener('click', () => {
  clearInterval(timerInterval);
  running = false;
  difference = 0;
  timeDisplay.textContent = "00:00:00.000";
  laps = [];
  lapsContainer.innerHTML = "";
});

document.getElementById('lapBtn').addEventListener('click', () => {
  if (running) {
    const lapTime = formatTime(difference);
    laps.push(lapTime);
    const lapElement = document.createElement('div');
    lapElement.className = 'lap';
    lapElement.textContent = `Lap ${laps.length}: ${lapTime}`;
    lapsContainer.appendChild(lapElement);
    lapsContainer.scrollTop = lapsContainer.scrollHeight;
  }
});
