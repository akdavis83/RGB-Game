/*
 * Global Variables
 */
 
var colors = [], pickedColor = "rgb(0, 0, 0)", numSquares = 6;
var background = "#232323";

/*
 *  Document Selectors
 */

var h1 = document.querySelector("h1");
var resetButton = document.querySelector("#resetButton");
var messageDisplay = document.querySelector("#messageDisplay");
var colorDisplay = document.querySelector("#colorDisplay");
var squares = document.querySelectorAll(".square");
var modes = document.querySelectorAll(".mode");

/*
 * Methods
 */

function newGame() {
  /* Our main loop for initializing a new game. */

  // Reset our text labels and colors.
  resetButton.textContent = "New Colors";
  messageDisplay.textContent = "";
  h1.style.backgroundColor = "steelblue";
  colors = genRandomColors(numSquares);
  pickedColor = colors[random(colors.length)];
  colorDisplay.textContent = pickedColor;

  // Give each square an available color from the colors list.
  // Hide any extra squares that do not have a color.
  for (var i = 0; i < squares.length; i++) {
    if (colors[i]) {
      squares[i].style.backgroundColor = colors[i];
    } else {
      squares[i].style.backgroundColor = background;
    }
  }
}


function updateButtons() {
  /* Helper function for updating our game-mode buttons. */

  // Clear active class from all buttons, apply to current button.
  modes.forEach(function(mode) {mode.classList.remove("active");});
  this.classList.add("active");

  // If the current mode button is "Easy", decrease the difficulty
  // by reducing nuber of squares. Then reset the game.
  numSquares = (this.textContent === "Easy") ? 3 : 6;
  newGame();
}

function updateSquares() {
  /* Update our square tile when clicked. If the player picks
   * our winning square, do something cool. Otherwise, hide
   * the square from the game board. */

  // Fetch the color of our square.
  var clickedColor = this.style.backgroundColor;

  // Check if this square matches the winning color.
  if (clickedColor === pickedColor) {
    messageDisplay.textContent = "Correct!";
    resetButton.textContent = "Play Again?";
    changeColors(clickedColor);

  // Else, hide the square.
  } else {
    this.style.backgroundColor = background;
    messageDisplay.textContent = "Try again!";
  }
}


function changeColors(color) {
  /* Helper function to change all the squares on the game
   * board to the same matching :color: (RGB) value. */

  h1.style.backgroundColor = color;
  squares.forEach(function(sq) {sq.style.backgroundColor = color;});
}


function genRandomColors(num) {
  /* Create an array of :num: size, and fill it with colors
   * using random RGB values. */

  var arr = [];
  for (var i = 0; i < num; i++) {
    arr.push(`rgb(${random(256)}, ${random(256)}, ${random(256)})`);
  }
  return arr;
}


function random(range) {
  /* Generate a random number within :range: values. */

  return Math.floor(Math.random() * (range));
}

/*
 * Event Listeners
 */

window.addEventListener('load', newGame);
resetButton.addEventListener("click", newGame);

squares.forEach(function(square) {
  square.addEventListener("click", updateSquares);
});

modes.forEach(function(btn) {
  btn.addEventListener("click", updateButtons);
});
