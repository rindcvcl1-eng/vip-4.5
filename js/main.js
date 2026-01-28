// ====== GLOBAL ======
let playerMoney = 1000000000;
let bets = {
  tai: 0,
  xiu: 0
};

let isAdmin = false;

// ====== BET ======
function bet(side, amount) {
  if (playerMoney < amount) {
    alert("Không đủ tiền");
    return;
  }

  bets[side] += amount;
  playerMoney -= amount;

  updateUI();
}

function updateUI() {
  document.querySelector('.money').innerText =
    playerMoney.toLocaleString();

  document.getElementById('player-tai').innerText = bets.tai;
  document.getElementById('player-xiu').innerText = bets.xiu;
}
