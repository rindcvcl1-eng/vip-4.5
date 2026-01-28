let stocks = [
  { id: 'CP01', price: 520000000, trend: 'up', supply: 100 },
  { id: 'CP02', price: 610000000, trend: 'down', supply: 100 },
  { id: 'CP03', price: 780000000, trend: 'up', supply: 100 },
  { id: 'CP04', price: 900000000, trend: 'down', supply: 100 },
  { id: 'CP05', price: 1200000000, trend: 'up', supply: 100 }
];
function renderStocks() {
  const list = document.getElementById('stock-list');
  list.innerHTML = '';

  stocks.forEach(stock => {
    const div = document.createElement('div');
    div.className = 'stock-item';
    div.innerHTML = `
      <strong>${stock.id}</strong>
      <span>${stock.trend === 'up' ? '⬆️' : '⬇️'}</span>
      <span>${(stock.price / 1e6).toFixed(0)}tr</span>
      <span>Còn: ${stock.supply}</span>
    `;
    list.appendChild(div);
  });
}
