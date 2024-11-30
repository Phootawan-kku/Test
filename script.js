const quoteDisplay = document.getElementById("quoteDisplay");
const quoteInput = document.getElementById("quoteInput");
const avgWpmDisplay = document.getElementById("avgWpm");
const statusMessage = document.getElementById("statusMessage");
const restartBtn = document.getElementById("restartBtn");
const themeToggle = document.getElementById("themeToggle");

const quotes = [
    "Mai tao rai ni moss I moss mang ngo ao noi nong moss Wai pao moss herrr"
];

let currentQuote = "";
let startTime = null;
let typingStarted = false;

function getRandomQuote() {
    const randomIndex = Math.floor(Math.random() * quotes.length);
    return quotes[randomIndex];
}

function updateWPM() {
    const typedText = quoteInput.value;
    const wordCount = typedText.split(/\s+/).filter(Boolean).length;
    const timeElapsed = (Date.now() - startTime) / 60000;

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

function startTest() {
    quoteDisplay.textContent = getRandomQuote();
    currentQuote = quoteDisplay.textContent;
    quoteInput.value = "";
    avgWpmDisplay.textContent = "Average WPM: 0";
    statusMessage.textContent = "";
    quoteInput.disabled = false;
    typingStarted = false;
}

restartBtn.addEventListener("click", startTest);

quoteInput.addEventListener("input", () => {
    if (!typingStarted) {
        typingStarted = true;
        startTime = Date.now();
    }
    updateWPM();
    updateStatus();
});

themeToggle.addEventListener("click", () => {
    document.body.classList.toggle("dark-mode");
    const isDarkMode = document.body.classList.contains("dark-mode");
    localStorage.setItem("theme", isDarkMode ? "dark" : "light");
});

window.addEventListener("load", () => {
    const savedTheme = localStorage.getItem("theme");
    if (savedTheme === "dark") {
        document.body.classList.add("dark-mode");
    }
});

startTest();
