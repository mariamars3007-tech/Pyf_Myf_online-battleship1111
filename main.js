// Элементы страницы
const playerBoard = document.getElementById('player-board');
const enemyBoard = document.getElementById('enemy-board');
const startBtn = document.getElementById('start');

const playerName = document.getElementById('player-name');
const enemyName = document.getElementById('enemy-name');

// Устанавливаем имена по умолчанию
playerName.textContent = "Пыфин";
enemyName.textContent = "Мыфин";

const size = 10; // размер поля
let playerCells = [];
let enemyCells = [];

// Звуки
const hitSound = new Audio('sounds/hit.mp3');
const missSound = new Audio('sounds/miss.mp3');
const clickSound = new Audio('sounds/click.mp3');

let currentTurn = "player"; // кто ходит: "player" или "enemy"

// Функция создания поля
function createBoard(board, cellsArray) {
  for (let i = 0; i < size * size; i++) {
    const cell = document.createElement('div');
    cellsArray.push(cell);
    board.appendChild(cell);
  }
}

// Создаём поля
createBoard(playerBoard, playerCells);
createBoard(enemyBoard, enemyCells);

// Пример кораблей игрока (серый)
playerCells[0].classList.add('ship');
playerCells[1].classList.add('ship');
playerCells[2].classList.add('ship');

// Пример кораблей противника (скрытые)
enemyCells[4].classList.add('ship');
enemyCells[5].classList.add('ship');
enemyCells[6].classList.add('ship');

// Смена хода
function switchTurn() {
  currentTurn = currentTurn === "player" ? "enemy" : "player";
  alert(`${currentTurn === "player" ? playerName.textContent : enemyName.textContent} ходит!`);
}

// Логика хода противника
function enemyTurn() {
  if (currentTurn !== "enemy") return;

  let shot;
  do {
    shot = Math.floor(Math.random() * playerCells.length);
  } while(playerCells[shot].classList.contains('hit') || playerCells[shot].classList.contains('miss'));

  if(playerCells[shot].classList.contains('ship')) {
    playerCells[shot].classList.add('hit');
    hitSound.play();
    alert(`${enemyName.textContent} попал!`);
  } else {
    playerCells[shot].classList.add('miss');
    missSound.play();
    alert(`${enemyName.textContent} промахнулся!`);
  }

  switchTurn(); // ход снова игрока
}

// Клик по полю противника
enemyCells.forEach(cell => {
  cell.addEventListener('click', () => {
    if (currentTurn !== "player") return; // ходит только игрок
    if (cell.classList.contains('hit') || cell.classList.contains('miss')) return;

    if(cell.classList.contains('ship')) {
      cell.classList.add('hit');
      hitSound.play();
    } else {
      cell.classList.add('miss');
      missSound.play();
    }

    switchTurn(); // ход переходит к противнику
    setTimeout(enemyTurn, 500); // через 0.5 сек ход противника
  });
});

// Кнопка начала игры
startBtn.addEventListener('click', () => {
  clickSound.play();
  alert(`${playerName.textContent} начинает игру!`);
});
