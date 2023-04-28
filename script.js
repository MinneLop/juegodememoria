// Define variables
const gameContainer = document.getElementById("game");
const scoreContainer = document.getElementById("score");
const startButton = document.getElementById("start-button");
const restartButton = document.getElementById("restart-button");
const COLORS = [
  "red",
  "blue",
  "green",
  "orange",
  "purple",
  "yellow",
  "pink",
  "brown",
  "gray",
  "black",
  "red",
  "blue",
  "green",
  "orange",
  "purple",
  "yellow",
  "pink",
  "brown",
  "gray",
  "black"
];
let score = 0;
let cardsFlipped = 0;
let firstCard = null;
let secondCard = null;
let canFlipCards = true;

// Helper function to shuffle the colors array
function shuffle(array) {
  let counter = array.length;
  while (counter > 0) {
    let index = Math.floor(Math.random() * counter);
    counter--;
    let temp = array[counter];
    array[counter] = array[index];
    array[index] = temp;
  }
  return array;
}

// Function to create the game board
function createGameBoard(colorArray) {
  for (let color of colorArray) {
    const newDiv = document.createElement("div");
    newDiv.classList.add("card");
    newDiv.classList.add("hidden");
    newDiv.style.backgroundColor = "white";
    newDiv.setAttribute("data-color", color);
    newDiv.addEventListener("click", handleCardClick);
    gameContainer.append(newDiv);
  }
}

// Function to handle card clicks
function handleCardClick(event) {
  if (!canFlipCards) return;
  if (event.target === firstCard) return;

  // Flip the card
  event.target.style.backgroundColor = event.target.getAttribute("data-color");
  event.target.classList.remove("hidden");

  // Check if first or second card
  if (firstCard === null) {
    firstCard = event.target;
  } else {
    secondCard = event.target;
    canFlipCards = false;
    checkForMatch();
  }
}

// Function to check for a match
function checkForMatch() {
  let firstColor = firstCard.getAttribute("data-color");
  let secondColor = secondCard.getAttribute("data-color");

  // Check if the cards match
  if (firstColor === secondColor) {
    cardsFlipped += 2;
    firstCard.removeEventListener("click", handleCardClick);
    secondCard.removeEventListener("click", handleCardClick);
    firstCard = null;
    secondCard = null;
    canFlipCards = true;
    score++;
    scoreContainer.innerText = `Score: ${score}`;
    if (cardsFlipped === COLORS.length) endGame();
  } else {
    setTimeout(() => {
      firstCard.style.backgroundColor = "white";
      firstCard.classList.add("hidden");
      secondCard.style.backgroundColor = "white";
      secondCard.classList.add("hidden");
      firstCard = null;
      secondCard = null;
      canFlipCards = true;
    }, 500);
  }
}


// Function to start a new game
function startGame() {
  score = 0;
  cardsFlipped = 0;
  scoreContainer.innerText = `Score: ${score}`;
  gameContainer.innerHTML = "";
  startButton.disabled = true;
  restartButton.disabled = false;
  let shuffledColors = shuffle(COLORS);
  createGameBoard(shuffledColors);
}

// Function to end the game
function endGame() {
  alert(`Congratulations! You paired the ${score
    } colors.`);
  startButton.disabled = false;
  restartButton.disabled = true;
}

// Event listener for start button
startButton.addEventListener("click", startGame);

// Event listener for restart button
restartButton.addEventListener("click", startGame);
