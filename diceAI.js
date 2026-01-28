// diceAI.js
function aiBet() {
  const side = Math.random() < 0.5 ? 'tai' : 'xiu';
  const amountList = [20000, 50000, 100000];
  const amount = amountList[Math.floor(Math.random() * amountList.length)];

  tableBet.ai[side] += amount;
  updateBetUI();
}
