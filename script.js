let workMinutes = 25;
let breakMinutes = 5;
let isWorkSession = true;
let timer;
let minutes = workMinutes;
let seconds = 0;
let sessions = 0;

const minutesDisplay = document.getElementById("minutes");
const secondsDisplay = document.getElementById("seconds");
const statusDisplay = document.getElementById("status");
const sessionsDisplay = document.getElementById("sessions");

const circle = document.querySelector(".progress-ring__circle");
const radius = circle.r.baseVal.value;
const circumference = 2 * Math.PI * radius;
circle.style.strokeDasharray = circumference;
circle.style.strokeDashoffset = 0;

let totalTime = workMinutes * 60; // total seconds

function updateDisplay() {
  minutesDisplay.textContent = String(minutes).padStart(2, '0');
  secondsDisplay.textContent = String(seconds).padStart(2, '0');
}

function setProgress(timeLeft) {
  const progress = timeLeft / totalTime;
  const offset = circumference * (1 - progress);
  circle.style.strokeDashoffset = offset;
}

function startTimer() {
  if (!timer) {
    totalTime = isWorkSession ? workMinutes * 60 : breakMinutes * 60;
    let timeLeft = totalTime;

    timer = setInterval(() => {
      if (seconds === 0) {
        if (minutes === 0) {
          clearInterval(timer);
          timer = null;
          if (isWorkSession) {
            sessions++;
            sessionsDisplay.textContent = sessions;
            minutes = breakMinutes;
            statusDisplay.textContent = "Break Time";
          } else {
            minutes = workMinutes;
            statusDisplay.textContent = "Work Session";
          }
          isWorkSession = !isWorkSession;
          seconds = 0;
          totalTime = minutes * 60;
          updateDisplay();
          setProgress(totalTime);
          startTimer(); // auto start next
        } else {
          minutes--;
          seconds = 59;
        }
      } else {
        seconds--;
      }
      timeLeft = minutes * 60 + seconds;
      updateDisplay();
      setProgress(timeLeft);
    }, 1000);
  }
}

function pauseTimer() {
  clearInterval(timer);
  timer = null;
}

function resetTimer() {
  clearInterval(timer);
  timer = null;
  isWorkSession = true;
  minutes = workMinutes;
  seconds = 0;
  statusDisplay.textContent = "Work Session";
  updateDisplay();
  setProgress(workMinutes * 60);
}

document.getElementById("start").addEventListener("click", startTimer);
document.getElementById("pause").addEventListener("click", pauseTimer);
document.getElementById("reset").addEventListener("click", resetTimer);

updateDisplay();
setProgress(workMinutes * 60);
