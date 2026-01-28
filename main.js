let timeLeft = 180;
let diceResult = [];
let isRolled = false;
let isOpened = false;

const timerEl = document.getElementById("timer");
const cupEl = document.getElementById("cup");
const diceEl = document.getElementById("dice");

// TIMER 3 PHÚT
setInterval(() => {
  timeLeft--;
  timerEl.innerText = timeLeft;

  if (timeLeft <= 0) {
    rollDice();
    timeLeft = 180;
  }
}, 1000);

// XÚC XẮC
function rollDice() {
  isRolled = true;
  isOpened = false;

  diceResult = [
    randDice(),
    randDice(),
    randDice()
  ];

  diceEl.style.opacity = 0;
  cupEl.classList.add("shaking");

  // xúc trong 2s
  setTimeout(() => {
    cupEl.classList.remove("shaking");
  }, 2000);
}

// RANDOM XÚC XẮC
function randDice() {
  return Math.floor(Math.random() * 6) + 1;
}

// BẤM CHÉN MỚI MỞ
cupEl.onclick = () => {
  if (!isRolled || isOpened) return;

  diceEl.innerText = diceResult.join(" - ");
  diceEl.style.opacity = 1;
  isOpened = true;
};
