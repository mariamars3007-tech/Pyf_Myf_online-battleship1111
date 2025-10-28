// Простая логика хода противника
function enemyTurn() {
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
}

// После клика игрока запускаем ход противника
enemyCells.forEach(cell => {
  cell.addEventListener('click', () => {
    if (cell.classList.contains('hit') || cell.classList.contains('miss')) return;

    if(cell.classList.contains('ship')) {
      cell.classList.add('hit');
      hitSound.play();
    } else {
      cell.classList.add('miss');
      missSound.play();
    }

    // ход противника через небольшой таймаут, чтобы было видно
    setTimeout(enemyTurn, 500);
  });
});
