let timer;
let minutes = 25;
let seconds = 0;
let points = 0;

// Load saved points
if (localStorage.getItem("studyPoints")) {
  points = parseInt(localStorage.getItem("studyPoints"));
  updatePointsDisplay();
}

function startTimer() {
  clearInterval(timer);
  timer = setInterval(() => {
    if (seconds === 0) {
      if (minutes === 0) {
        clearInterval(timer);
        alert("Pomodoro finished! +1 point 🎉");
        addPoint();
        resetTimer(); // Optionally reset automatically
        return;
      }
      minutes--;
      seconds = 59;
    } else {
      seconds--;
    }
    updateDisplay();
  }, 1000);
}

function resetTimer() {
  clearInterval(timer);
  minutes = 25;
  seconds = 0;
  updateDisplay();
}

function updateDisplay() {
  const timerDisplay = document.getElementById("timer");
  timerDisplay.textContent = `${String(minutes).padStart(2, "0")}:${String(seconds).padStart(2, "0")}`;
}

function addPoint() {
  points += 1;
  localStorage.setItem("studyPoints", points);
  updatePointsDisplay();
}

function updatePointsDisplay() {
  document.getElementById("points").textContent = points;
}
