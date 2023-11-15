"use strict";

const startBtn = document.querySelector(".start__btn");
const container = document.querySelector(".container");

const winningConditions = [
  [1, 2, 3],
  [1, 5, 9],
  [1, 4, 7],
  [2, 5, 8],
  [3, 5, 7],
  [3, 6, 9],
  [4, 5, 6],
  [7, 8, 9],
];

let game = true;

startBtn.addEventListener("click", (e) => {
  const markup = `
  <div class="game">
        <span class="display">Playing: O</span>
        <div class="board">
          <div class="square" data-value="1"></div>
          <div class="square" data-value="2"></div>
          <div class="square" data-value="3"></div>
          <div class="square" data-value="4"></div>
          <div class="square" data-value="5"></div>
          <div class="square" data-value="6"></div>
          <div class="square" data-value="7"></div>
          <div class="square" data-value="8"></div>
          <div class="square" data-value="9"></div>
        </div>
        <button class="reset">RESTART GAME</button>
      </div>
  `;

  container.innerHTML = markup;

  const game = document.querySelector(".game");

  setTimeout(() => {
    game.style.opacity = 1;
  }, 100);

  ticTacToe();
});

function ticTacToe() {
  const squares = document.querySelectorAll(".square");
  const reset = document.querySelector(".reset");
  const display = document.querySelector(".display");
  let player = Math.floor(Math.random() * 2);
  display.textContent = `Playing: ${player === 1 ? "X" : "O"}`;

  squares.forEach((sq) => sq.addEventListener("click", handleGame));
  reset.addEventListener("click", resetGame);

  let boardScore = [[], [], [], [], [], [], [], [], [], []];
  let occupied = 0;

  function handleGame(e) {
    if (game === false) return;
    occupied += 1;
    const squareNum = e.target.dataset.value;

    if (player === 1) {
      e.target.textContent = "X";
      display.textContent = "Playing: O";
    } else {
      e.target.textContent = "O";
      display.textContent = "Playing: X";
    }

    const squareValue = e.target.textContent;

    boardScore[squareNum] = squareValue;
    e.target.removeEventListener("click", handleGame);

    console.log(boardScore);
    checkWinner(squareValue);
  }

  function checkWinner(squareValue) {
    for (let i = 0; i < winningConditions.length; i++) {
      const arr = winningConditions[i];
      let winnerArr = [[], [], []];
      let checkingCounter = 0;

      if (!game) break;

      for (let j = 0; j < arr.length; j++) {
        if (boardScore[arr[j]] === squareValue) winnerArr[j] = squareValue;
        checkingCounter += 1;
      }

      if (
        winnerArr[0] === "X" &&
        winnerArr[1] === "X" &&
        winnerArr[2] === "X"
      ) {
        endGameSettings(player, "X");
      } else if (
        winnerArr[0] === "O" &&
        winnerArr[1] === "O" &&
        winnerArr[2] === "O"
      ) {
        endGameSettings(player, "O");
      } else if (occupied === 9 && checkingCounter === 3) {
        endGameSettings("");
      }

      function endGameSettings(state = null, symbol = "") {
        let winner = symbol;
        display.textContent = `${
          state === player ? `${winner} WINS!` : "It`s a draw"
        }`;
        game = false;
        reset.style.opacity = 1;
      }
    }

    player === 1 ? (player = 2) : (player = 1);
  }

  function resetGame() {
    squares.forEach((sq) => (sq.textContent = ""));
    boardScore = [[], [], [], [], [], [], [], [], [], []];
    player = Math.floor(Math.random() * 2);
    display.textContent = `Playing: ${player === 1 ? "X" : "O"}`;
    occupied = 0;
    reset.style.opacity = 0;
    game = true;
    squares.forEach((sq) => sq.addEventListener("click", handleGame));
  }
}
