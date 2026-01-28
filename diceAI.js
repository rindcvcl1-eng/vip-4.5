// diceAI.js
function aiBet() {
  const side = Math.random() < 0.5 ? 'tai' : 'xiu';
  const amountList = [20000, 50000, 100000];
  const amount = amountList[Math.floor(Math.random() * amountList.length)];

  tableBet.ai[side] += amount;
  updateBetUI();
}
function aiPlayerBet() {
  // nếu AI hết tiền thì thôi
  if (aiPlayerMoney <= 0) return;

  // đọc dòng tiền trên bàn
  const taiMoney = tableBet.player.tai + tableBet.ai.tai;
  const xiuMoney = tableBet.player.xiu + tableBet.ai.xiu;

  let side;

  // nếu 1 bên quá đông tiền → né nhẹ
  if (taiMoney > xiuMoney * 1.5) {
    side = 'xiu';
  } else if (xiuMoney > taiMoney * 1.5) {
    side = 'tai';
  } else {
    side = Math.random() < 0.5 ? 'tai' : 'xiu';
  }

  // số tiền đặt
  const betList = [20000, 50000, 100000, 200000];
  const amount = betList[Math.floor(Math.random() * betList.length)];

  if (aiPlayerMoney < amount) return;

  aiPlayerMoney -= amount;
  tableBet.ai[side] += amount;

  updateBetUI();
}
