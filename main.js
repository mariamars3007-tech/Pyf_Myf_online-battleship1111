// Элементы страницы
const playerBoard = document.getElementById('player-board');
const enemyBoard = document.getElementById('enemy-board');
const startBtn = document.getElementById('start');
const playerInput = document.getElementById('player-input');
const setNameBtn = document.getElementById('set-name');
const playerName = document.getElementById('player-name');
const enemyName = document.getElementById('enemy-name');

const size = 10; // размер поля
let playerCells = [];
let enemyCells = [];

// Звуки
const hitSound = new Audio('sounds/hit.mp3');
const missSound = new Audio('sounds/miss.mp3');
const clickSound = new Audio('sounds/click.mp3');

// Устанавливаем имя игрока
setNameBtn.addEventListener('click', () => {
  playerName.textContent = playerInput.value || "Игрок 1";
  clickSound.play();
});

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

// Функция случайного хода противника
function enemyTurn() {
  let available = playerCells.filter(c => !c.classList.contains('hit') && !c.classList.contains('miss'));
  if (available.length === 0) return; // все клетки открыты
  let cell = available[Math.floor(Math.random() * available.length)];
  if (cell.classList.contains('ship')) {
    cell.classList.add('hit');
    hitSound.play();
    alert(`${enemyName.textContent} попал!`);
  } else {
    cell.classList.add('miss');
    missSound.play();
    alert(`${enemyName.textContent} промахнулся!`);
  }
}

// Обработка клика по полю противника
enemyCells.forEach(cell => {
  cell.addEventListener('click', () => {
    if (cell.classList.contains('hit') || cell.classList.contains('miss')) return; // уже кликнули
    if(cell.classList.contains('ship')) {
      cell.classList.add('hit');
      hitSound.play();
      alert('Попадание!');
    } else {
