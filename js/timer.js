console.log("Script loaded");

/// script.js

// Countdown Timer Variables
let totalTime = 40 * 60; // Total time in seconds (40 minutes)
let timeLeft = totalTime;

// Function to format time as MM:SS
function formatTime(seconds) {
  const minutes = Math.floor(seconds / 60);
  const secs = seconds % 60;
  return `${minutes}:${secs < 10 ? '0' : ''}${secs}`;
}

// Display the initial timer
const timerElement = document.getElementById('timer');
timerElement.textContent = formatTime(timeLeft);

// Update the timer every second
const countdownInterval = setInterval(() => {
  timeLeft--;
  if (timeLeft < 0) {
    clearInterval(countdownInterval);
    timerElement.textContent = 'Time\'s up!';
    // You can add additional code here to handle when time is up
  } else {
    timerElement.textContent = formatTime(timeLeft);
  }
}, 1000);