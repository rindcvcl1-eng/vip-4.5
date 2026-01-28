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
// diceAI.js
function bankerDecideResult() {
  // tổng tiền trên bàn
  const taiMoney = tableBet.player.tai + tableBet.ai.tai;
  const xiuMoney = tableBet.player.xiu + tableBet.ai.xiu;

  // tỉ lệ nền: người chơi thắng ~39%
  let playerWinChance = 0.39;

  // nếu 1 bên quá đông tiền → giảm cơ hội bên đó
  if (taiMoney > xiuMoney * 1.4) playerWinChance -= 0.08;
  if (xiuMoney > taiMoney * 1.4) playerWinChance -= 0.08;

  // đọc lịch sử: tránh bệt quá dài
  const last3 = history.slice(0, 3);
  if (last3.length === 3 && last3.every(v => v === last3[0])) {
    playerWinChance -= 0.05;
  }

  // quyết định
  const playerWin = Math.random() < playerWinChance;

  // nếu người chơi thắng → chọn bên họ đặt nhiều hơn
  if (playerWin) {
    return tableBet.player.tai >= tableBet.player.xiu ? 'tai' : 'xiu';
  } 
  // nếu người chơi thua → chọn bên người chơi đặt ít hơn
  else {
    return tableBet.player.tai >= tableBet.player.xiu ? 'xiu' : 'tai';
  }
}
