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
function loginAdmin() {
  const u = document.getElementById('admin-user').value;
  const p = document.getElementById('admin-pass').value;

  if (u === "0987654321" && p === "zxcvbnm") {
    isAdmin = true;
    alert("Đăng nhập admin thành công");
    document.getElementById('admin-panel').style.display = "block";
  } else {
    alert("Sai admin");
  }
}
