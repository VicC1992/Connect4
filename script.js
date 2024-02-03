const cellPlace = document.getElementById("grid");
let player1 = "Red";
let player2 = "Yellow";
let turnTo = player1;
let displayNextPlayer = document.getElementById("itsTurnTo");
displayNextPlayer.innerText = turnTo;
let winner = "";
let circle = document.querySelectorAll(".cell");
const nrColumns = 7;
const nrRows = 6;

window.onload = generateCell;

function generateCell() {
    circle = [];
    for (let i = 0; i < nrRows; ++i) {
        let row = [];
        for (let j = 0; j < nrColumns; ++j) {
            row.push(" ");
            let cell = document.createElement("div");
            cell.classList.add("cell");
            cell.id = i.toString() + "/" + j.toString();
            cellPlace.appendChild(cell);
            cell.addEventListener("click", fillCells);
        }
        circle.push(row);
    }
}

let lastRow = [5, 5, 5, 5, 5, 5, 5];
let clickCounter = 0;

function fillCells() {
    let targetRow = this.id.split("/")[0];
    let targetColumn = this.id.split("/")[1];
    targetRow = lastRow[targetColumn];
    if (targetRow < 0) {
        return;
    }
    circle[targetRow][targetColumn] = turnTo;
    let cell = document.getElementById(targetRow.toString() + "/" + targetColumn.toString());
    if (turnTo == player1) {
        cell.classList.add("Red-Player");
        turnTo = player2;
        displayNextPlayer.innerText = turnTo;
    } else {
        cell.classList.add("Yellow-Player");
        turnTo = player1;
        displayNextPlayer.innerText = turnTo;
    }
    --targetRow;
    ++clickCounter;
    lastRow[targetColumn] = targetRow;
    checkWinner();
}

function checkWinner() {
    if (clickCounter >= 42 && winner != player1 && winner != player2) {
        winner = "Draw!!";
        gameOver(winner);
    }

    for (let i = 0; i < nrRows; ++i) {
        for (j = 0; j < nrColumns - 3; ++j) {
            if (circle[i][j] != " " && circle[i][j] == circle[i][j + 1] && circle[i][j + 1] == circle[i][j + 2] && circle[i][j + 2] == circle[i][j + 3]) {
                winner = `Winner is: ${circle[i][j]}`;
                gameOver(winner)
            }
        }
    }

    for (let i = 0; i < nrColumns; ++i) {
        for (let j = 0; j < nrRows - 3; ++j) {
            if (circle[j][i] != " " && circle[j][i] == circle[j + 1][i] && circle[j + 1][i] == circle[j + 2][i] && circle[j + 2][i] == circle[j + 3][i]) {
                winner = `Winner is: ${circle[j][i]}`;
                gameOver(winner)
            }
        }
    }

    for (let i = 0; i < nrRows - 3; ++i) {
        for (let j = 0; j < nrColumns - 3; ++j) {
            if (circle[i][j] != " " && circle[i][j] == circle[i + 1][j + 1] && circle[i + 1][j + 1] == circle[i + 2][j + 2] && circle[i + 2][j + 2] == circle[i + 3][j + 3]) {
                winner = `Winner is: ${circle[i][j]}`;
                gameOver(winner)
            }
        }
    }

    for (let i = 3; i < nrColumns; ++i) {
        for (let j = 0; j < nrColumns - 3; ++j) {
            if (circle[i][j] != " " && circle[i][j] == circle[i - 1][j + 1] && circle[i - 1][j + 1] == circle[i - 2][j + 2] && circle[i - 2][j + 2] == circle[i - 3][j + 3]) {
                winner = `Winner is: ${circle[i][j]}`;
                gameOver(winner);
            }
        }
    }
}

let winnerBlock = document.getElementById("winnerBlock");
let winnerSpan = document.getElementById("winnerSpan");
let btnNewGame = document.getElementById("btnRestartGame");
let board = document.getElementById("grid");

function gameOver(winner) {
    board.style.pointerEvents = "none";
    winnerBlock.style.display = "flex";
    winnerSpan.innerText = winner;
}

function newGame() {
    document.location.reload();
}
btnNewGame.addEventListener("click", newGame);