const startBtn = document.querySelector('#start');
const timeList = document.querySelector('#time-list');
const timeEl = document.querySelector('#time');
const board = document.querySelector('#board');
const screens = document.querySelectorAll('.screen');
let time = 0;
let score = 0;

startBtn.addEventListener('click', (e) => {
  e.preventDefault();
  screens[0].classList.add('up');
});

timeList.addEventListener('click', (e) => {
  if (e.target.classList.contains('time-btn')) {
    time = parseInt(e.target.getAttribute('data-time'));
    screens[1].classList.add('up');

    startGame();
  }
});

board.addEventListener('click', (e) => {
  if (e.target.classList.contains('circle')) {
    score++;
    e.target.remove();
    createRandomCircle();
  }
});

function startGame() {
  setInterval(decreaseTime, 1000);
  createRandomCircle();
  setTime(time);
}

function decreaseTime() {
  if (time === 0) {
    finishGame();
    return;
  } else {
    let current = --time;
    if (current < 10) {
      current = `0${current}`;
    }
    setTime(current);
  }
}

function setTime(value) {
  timeEl.innerHTML = `00:${value}`;
}

function finishGame() {
  timeEl.parentNode.classList.add('hide');
  board.innerHTML = `<h1>Ваш счет: ${score}</h1>`;
}

function createRandomCircle() {
  const circle = document.createElement('div');
  const size = getRundomNumber(10, 60);
  const { width, height } = board.getBoundingClientRect();
  const x = getRundomNumber(0, width - size);
  const y = getRundomNumber(0, height - size);
  const color = Math.floor(Math.random() * 16777215).toString(16);

  circle.classList.add('circle');
  circle.style.width = `${size}px`;
  circle.style.height = `${size}px`;
  circle.style.top = `${y}px`;
  circle.style.left = `${x}px`;
  circle.style.backgroundColor = `#${color}`;
  circle.style.boxShadow = `0 0 2px #${color}, 0 0 5px #${color}`;
  board.append(circle);
}

function getRundomNumber(min, max) {
  return Math.round(Math.random() * (max - min) + min);
}
