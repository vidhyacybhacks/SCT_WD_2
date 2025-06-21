let startTime;
let isRunning = false;
let elapsedTime = 0;
let timerInterval;

const display = document.getElementById("display");
const startBtn = document.getElementById("startBtn");
const pauseBtn = document.getElementById("pauseBtn");
const resetBtn = document.getElementById("resetBtn");
const lapBtn = document.getElementById("lapBtn");
const lapList = document.getElementById("lapList");

function updateDisplay() {
  const time = Date.now() - startTime + elapsedTime;
  const hrs = String(Math.floor(time / (1000 * 60 * 60))).padStart(2, '0');
  const mins = String(Math.floor((time / (1000 * 60)) % 60)).padStart(2, '0');
  const secs = String(Math.floor((time / 1000) % 60)).padStart(2, '0');
  display.textContent = `${hrs}:${mins}:${secs}`;
}

function startStopwatch() {
  if (isRunning) return;
  startTime = Date.now();
  timerInterval = setInterval(updateDisplay, 1000);
  isRunning = true;
}

function pauseStopwatch() {
  if (!isRunning) return;
  clearInterval(timerInterval);
  elapsedTime += Date.now() - startTime;
  isRunning = false;
}

function resetStopwatch() {
  clearInterval(timerInterval);
  isRunning = false;
  elapsedTime = 0;
  display.textContent = "00:00:00";
  lapList.innerHTML = "";
}

function lapTime() {
  if (!isRunning) return;
  const currentTime = display.textContent;
  const lapItem = document.createElement("li");
  lapItem.textContent = `Lap: ${currentTime}`;
  lapList.appendChild(lapItem);
}

startBtn.addEventListener("click", startStopwatch);
pauseBtn.addEventListener("click", pauseStopwatch);
resetBtn.addEventListener("click", resetStopwatch);
lapBtn.addEventListener("click", lapTime);
