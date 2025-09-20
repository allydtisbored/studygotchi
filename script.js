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
