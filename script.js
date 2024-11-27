// script.js
const quoteDisplay = document.getElementById("quoteDisplay");
const quoteInput = document.getElementById("quoteInput");
const avgWpmDisplay = document.getElementById("avgWpm");
const statusMessage = document.getElementById("statusMessage");
const restartBtn = document.getElementById("restartBtn");

const quotes = [
    "Mai tao rai ni moss I moss mang ngo ao noi nong moss Wai pao moss herrr"
    
];

let currentQuote = "";
let startTime = null;
let typingStarted = false;
let totalWords = 0;
let totalTime = 0;

function getRandomQuote() {
    const randomIndex = Math.floor(Math.random() * quotes.length);
    return quotes[randomIndex];
}

function updateWPM() {
    const typedText = quoteInput.value;
    const wordCount = typedText.split(/\s+/).filter(Boolean).length; // Split by spaces and count words
    const timeElapsed = (Date.now() - startTime) / 60000; // Time in minutes

    if (timeElapsed > 0) {
        const wpm = Math.round(wordCount / timeElapsed);
        avgWpmDisplay.textContent = `Average WPM: ${wpm}`;
    }
}

function updateStatus() {
    const typedText = quoteInput.value;
    if (typedText === currentQuote) {
        statusMessage.textContent = "You finished typing the quote!";
        statusMessage.style.color = "green";
    } else if (typedText.length > 0) {
        statusMessage.textContent = "Keep typing...";
        statusMessage.style.color = "orange";
    } else {
        statusMessage.textContent = "";
    }
}

// Set the initial quote
function startTest() {
    quoteDisplay.textContent = getRandomQuote(); // Display the random quote
    currentQuote = quoteDisplay.textContent; // Store the current quote for comparison
    quoteInput.value = ""; // Clear the input area
    avgWpmDisplay.textContent = "Average WPM: 0"; // Reset WPM display
    statusMessage.textContent = ""; // Clear any status message
    quoteInput.disabled = false; // Enable the input area
    typingStarted = false; // Reset the typing started flag
}

// Restart the test when the button is clicked
restartBtn.addEventListener("click", restartTest);

function restartTest() {
    startTest(); // Call the startTest function to reset everything
}

// Listen for user typing
quoteInput.addEventListener("input", () => {
    if (!typingStarted) {
        typingStarted = true;
        startTime = Date.now();
    }

    updateWPM();
    updateStatus(); // Update the completion status
});

// Start the typing test initially
startTest();
