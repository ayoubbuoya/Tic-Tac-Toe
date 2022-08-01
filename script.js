var orgBoard;
const userPlayer = "X";
const machinePlayer = "O";
const winCombo = [
  [0, 1, 2],
  [3, 4, 5],
  [6, 7, 8],
  [0, 3, 6],
  [1, 4, 7],
  [2, 5, 8],
  [0, 4, 8],
  [6, 4, 2],
];

const cells = document.querySelectorAll(".cell");

startGame();

function startGame() {
  document.querySelector(".endgame").style.display = "none";
  // create array have values from 0 to 8 [[],[],[] ]
  orgBoard = Array.from(Array(9).keys());
  //delete previous x and o
  for (let i = 0; i < cells.length; i++) {
    cells[i].innerText = "";
    // remove the win game bg color
    cells[i].style.removeProperty("background-color");
    // add click eevent .when presing on a cell launch changeTurn
    cells[i].addEventListener("click", changeTurn, false);
  }
}

// function called when on click on  cell
function changeTurn(square) {
  // prevent running funct for already clicked ones
  if (typeof orgBoard[square.target.id] === "number") {
    // user turn
    playTurn(square.target.id, userPlayer);
    // check if the cells are full
    if (!checkTie()) {
      // machine turn
      playTurn(bestSpot(), machinePlayer);
    }
  }
}

// function to show your play desc and check for win
function playTurn(squareId, player) {
  orgBoard[squareId] = player;
  document.getElementById(squareId).innerText = player;
  // check if you win or machine
  let gameWon = checkWin(orgBoard, player);
  if (gameWon) gameOver(gameWon);
}

function checkWin(board, player) {
  // let plays = board.reduce((preValue, currValue, currIndex) => {
  //   if (currValue === player) {
  //     preValue.concat(currIndex);
  //   }
  //   return preValue;
  // }, []);
  let plays = board.reduce(
    (initValue, currValue, currIndex) =>
      currValue === player ? initValue.concat(currIndex) : initValue,
    []
  );
  // show the plays of a player
  // let plays = [];
  // for (let i = 0; i < board.length; i++) {
  //   if (board[i] == player) {
  //     plays.push(i);
  //   }
  // }

  let won = null;
  // for of like for in on python
  // entries is like enumerate
  for (let [index, win] of winCombo.entries()) {
    // condition for win
    if (win.every((elem) => plays.indexOf(elem) > -1)) {
      // which player win and with which combo
      won = { index: index, player: player };
      break;
    }
  }
  return won;
}

function gameOver(won) {
  for (let index of winCombo[won.index]) {
    // console.log(index);
    document.getElementById(index).style.backgroundColor =
      won.player === userPlayer ? "green" : "red";

    // remove the click eventlistner for clicked cells
    for (let i = 0; i < cells.length; i++) {
      cells[i].removeEventListener("click", changeTurn, false);
    }
  }
  declareWinner(won.player === userPlayer ? "You Win!" : "You Lose!");
}

function emptySquares() {
  return orgBoard.filter((sq) => typeof sq === "number");
}

function declareWinner(winner) {
  document.querySelector(".endgame").style.display = "block";
  document.querySelector(".endgame .text").innerText = winner;
}
// function returns the machine choice
function bestSpot() {
  // return the first empty square ind
  console.log(emptySquares()[0]);
  return emptySquares()[0];
}
// function checking for a tie
function checkTie() {
  if (emptySquares().length === 0) {
    // squares filled up and no one won so
    for (let i = 0; i < cells.length; i++) {
      cells[i].style.backgroundColor = "gray";
      cells[i].removeEventListener("click", changeTurn, false);
    }
    declareWinner("Tie Game!");
    return true;
  }
  return false;
}
