function updateStockMarket() {
  stocks.forEach(stock => {
    const upChance = 0.2; // đúng yêu cầu bạn: tăng 20%
    const isUp = Math.random() < upChance;

    if (isUp) {
      stock.trend = 'up';
      stock.price *= 1.05;
    } else {
      stock.trend = 'down';
      stock.price *= 0.95;
    }
  });

  renderStocks();
}
