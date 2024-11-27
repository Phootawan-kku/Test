// DOM Elements
const userChoiceDisplay = document.getElementById('user-choice').querySelector('span');
const computerChoiceDisplay = document.getElementById('computer-choice').querySelector('span');
const winnerDisplay = document.getElementById('winner').querySelector('span');

// Buttons
const choices = document.querySelectorAll('.choice-btn');

// Possible choices
const options = ['Rock', 'Paper', 'Scissors'];

// Event listeners for buttons
choices.forEach(button => {
  button.addEventListener('click', () => {
    const userChoice = button.id;
    const computerChoice = getComputerChoice();
    const winner = determineWinner(userChoice, computerChoice);

    // Update the display
    userChoiceDisplay.textContent = capitalize(userChoice);
    computerChoiceDisplay.textContent = computerChoice;
    winnerDisplay.textContent = winner;
  });
});

// Function to get computer choice
function getComputerChoice() {
  const randomIndex = Math.floor(Math.random() * options.length);
  return options[randomIndex];
}

// Function to determine the winner
function determineWinner(user, computer) {
  if (user === computer.toLowerCase()) {
    return 'It\'s a Tie!';
  }
  if (
    (user === 'rock' && computer === 'Scissors') ||
    (user === 'paper' && computer === 'Rock') ||
    (user === 'scissors' && computer === 'Paper')
  ) {
    return 'You Win!';
  }
  return 'Computer Wins!';
}

// Function to capitalize the first letter
function capitalize(str) {
  return str.charAt(0).toUpperCase() + str.slice(1);
}
