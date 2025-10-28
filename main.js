const playerBoard = document.getElementById('player-board');
const enemyBoard = document.getElementById('enemy-board');
const startBtn = document.getElementById('start');

const size = 10; // размер поля 10x10
let playerCells = [];
let enemyCells = [];

// функция создаёт поле
function createBoard(board, cellsArray) {
  for (let i = 0; i < size * size; i++) {
    const cell = document.createElement('div');
    cellsArray.push(cell);
    board.appendChild(cell);
  }
}

// создаём поля
createBoard(playerBoard, playerCells);
createBoard(enemyBoard, enemyCells);

// пример корабля на поле игрока
playerCells[0].classList.add('ship');
playerCells[1].classList.add('ship');
playerCells[2].classList.add('ship');
