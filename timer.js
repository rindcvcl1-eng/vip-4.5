function startNewRound() {
  aiBet();         // AI nhà cái (đã có)
  aiPlayerBet();   // AI người chơi (mới)
}
setInterval(updateStockMarket, 300000); // 5 phút
