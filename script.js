let points = 0;
let petName = "Fluffy";

// Dummy ranking system (you can add real backend later for persistent ranking)
let rankings = [
    { name: "Alice", points: 150 },
    { name: "Bob", points: 120 },
    { name: "Charlie", points: 80 }
];

// Update pet points display
const pointsDisplay = document.getElementById("points");
const studyButton = document.getElementById("study-button");
const rankingList = document.getElementById("ranking-list");

// Function to increase points when user clicks "Study Now"
studyButton.addEventListener("click", function() {
    points += 10; // Increase points by 10
    pointsDisplay.textContent = points; // Update points on screen

    // Add your pet care behavior here
    alert("Your pet is happy! You've earned 10 points.");
    updateRanking();
});

// Function to update the ranking list
function updateRanking() {
    rankings.push({ name: "You", points: points }); // Add current user to ranking
    rankings.sort((a, b) => b.points - a.points); // Sort in descending order

    rankingList.innerHTML = ""; // Clear current rankings
    rankings.forEach((rank, index) => {
        const li = document.createElement("li");
        li.textContent = `${index + 1}. ${rank.name}: ${rank.points} points`;
        rankingList.appendChild(li);
    });
}

// Initial ranking display
updateRanking();
// Pomodoro logic
let pomodoroDuration = 25 * 60; // 25 minutes
let breakDuration = 5 * 60; // 5 minutes
let timer;
let timeLeft = pomodoroDuration;
let isRunning = false;
let isOnBreak = false;

const timerDisplay = document.getElementById("timer-display");
const statusDisplay = document.getElementById("pomodoro-status");

document.getElementById("start-timer").addEventListener("click", () => {
    if (!isRunning) {
        isRunning = true;
        timer = setInterval(updateTimer, 1000);
        statusDisplay.textContent = isOnBreak ? "Status: Break Time!" : "Status: Focus!";
    }
});

document.getElementById("stop-timer").addEventListener("click", () => {
    clearInterval(timer);
    isRunning = false;
    statusDisplay.textContent = "Status: Paused";
});

document.getElementById("reset-timer").addEventListener("click", () => {
    clearInterval(timer);
    isRunning = false;
    isOnBreak = false;
    timeLeft = pomodoroDuration;
    updateDisplay();
    statusDisplay.textContent = "Status: Ready";
});

function updateTimer() {
    timeLeft--;
    updateDisplay();

    if (timeLeft <= 0) {
        clearInterval(timer);
        isRunning = false;

        if (!isOnBreak) {
            // Earn points after study session
            points += 25;
            pointsDisplay.textContent = points;

            // Make pet happy (optional)
            petImage.classList.add("happy");
            setTimeout(() => petImage.classList.remove("happy"), 1000);

            alert("Great job! You completed a Pomodoro session! 🎉 +25 points!");

            // Switch to break
            isOnBreak = true;
            timeLeft = breakDuration;
            statusDisplay.textContent = "Status: Break Time!";
            timer = setInterval(updateTimer, 1000);
            isRunning = true;
        } else {
            // Break is over
            isOnBreak = false;
            timeLeft = pomodoroDuration;
            statusDisplay.textContent = "Status: Ready";
            updateDisplay();
        }

        updateRanking(); // Refresh leaderboard
    }
}

function updateDisplay() {
    const minutes = Math.floor(timeLeft / 60);
    const seconds = timeLeft % 60;
    timerDisplay.textContent = `${String(minutes).padStart(2, '0')}:${String(seconds).padStart(2, '0')}`;
}
