// main.js
let playerMoney = 1000000000;

let tableBet = {
  player: { tai: 0, xiu: 0 },
  ai: { tai: 0, xiu: 0 }
};

let timeLeft = 180;
let diceResult = [];
let isRolled = false;
let isOpened = false;

let playerMoney = 1_000_000_000;
let currentBet = { tai: 0, xiu: 0 };
let history = [];

const timerEl = document.getElementById("timer");
const cupEl = document.getElementById("cup");
const diceEl = document.getElementById("dice");
const historyEl = document.getElementById("history");

// TIMER
setInterval(() => {
  timeLeft--;
  timerEl.innerText = timeLeft;

  if (timeLeft <= 0) {
    rollDice();
    timeLeft = 180;
  }
}, 1000);

// ĐẶT CƯỢC
function bet(side, amount) {
  if (isRolled && !isOpened) return;
  if (playerMoney < amount) return alert("Không đủ tiền");

  currentBet[side] += amount;
  playerMoney -= amount;
  updateMoney();
}

// XÚC
function rollDice() {
  isRolled = true;
  isOpened = false;
  diceEl.style.opacity = 0;

  const desired = casinoAIResult(); // AI quyết định
  diceResult = generateDice(desired);

  cupEl.classList.add("shaking");
  setTimeout(() => {
    cupEl.classList.remove("shaking");
  }, 2000);
}

// RANDOM
function rand() {
  return Math.floor(Math.random() * 6) + 1;
}

// MỞ CHÉN
cupEl.onclick = () => {
  if (!isRolled || isOpened) return;

  diceEl.innerText = diceResult.join(" - ");
  diceEl.style.opacity = 1;
  isOpened = true;

  resolveGame();
};

// TÍNH KẾT QUẢ
function resolveGame() {
  const sum = diceResult.reduce((a, b) => a + b, 0);
  const result = sum >= 11 ? "tai" : "xiu";

  if (currentBet[result] > 0) {
    playerMoney += currentBet[result] * 2;
    winStreak++;
    loseStreak = 0;
  } else {
    loseStreak++;
    winStreak = 0;
  }

  history.unshift(result);
  if (history.length > 10) history.pop();

  renderHistory();
  updateMoney();
}


// HIỂN THỊ
function renderHistory() {
  historyEl.innerHTML = history
    .map(r => r === "tai" ? "🔴" : "🔵")
    .join("");
}
let winStreak = 0;
let loseStreak = 0;

// AI NHÀ CÁI QUYẾT ĐỊNH
function casinoAIResult() {
  const r = Math.random();

  // đang thắng nhiều → đè
  if (winStreak >= 2) {
    return r < 0.75 ? "xiu" : "tai";
  }

  // đang thua nhiều → thả
  if (loseStreak >= 2) {
    return r < 0.6 ? "tai" : "xiu";
  }

  // trạng thái bình thường
  if (r < 0.39) return "tai";   // cho thắng
  if (r < 0.90) return "xiu";   // cho thua
  return Math.random() < 0.5 ? "tai" : "xiu";
}

// SINH XÚC XẮC PHÙ HỢP
function generateDice(side) {
  let d1, d2, d3, sum;

  do {
    d1 = rand();
    d2 = rand();
    d3 = rand();
    sum = d1 + d2 + d3;
  } while (
    (side === "tai" && sum < 11) ||
    (side === "xiu" && sum >= 11)
  );

  return [d1, d2, d3];
}

function updateMoney() {
  document.querySelector(".money").innerText =
    playerMoney.toLocaleString();
}
// main.js
function updateBetUI() {
  document.getElementById('player-tai').innerText = tableBet.player.tai;
  document.getElementById('player-xiu').innerText = tableBet.player.xiu;
  document.getElementById('ai-tai').innerText = tableBet.ai.tai;
  document.getElementById('ai-xiu').innerText = tableBet.ai.xiu;
}
