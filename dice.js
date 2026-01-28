// tiền đang nằm trên bàn (reset mỗi ván)
let tableBet = {
  player: {
    tai: 0,
    xiu: 0
  },
  ai: {
    tai: 0,
    xiu: 0
  }
};
// dice.js
function resetTableBet() {
  tableBet.player.tai = 0;
  tableBet.player.xiu = 0;
  tableBet.ai.tai = 0;
  tableBet.ai.xiu = 0;
  updateBetUI();
}
function endRound() {
  resetTableBet();
}
// dice.js
let history = []; // 'tai' hoặc 'xiu'

function addHistory(result) {
  history.unshift(result);
  if (history.length > 10) history.pop();
}
