// ===== DỮ LIỆU CỔ PHIẾU =====
let stocks = [
  { id: 'CP01', price: 520_000_000, trend: 'up', supply: 100 },
  { id: 'CP02', price: 610_000_000, trend: 'down', supply: 100 },
  { id: 'CP03', price: 780_000_000, trend: 'up', supply: 100 },
];

// ===== TIỀN & SỞ HỮU =====
let playerMoney = 1_000_000_000;
let playerStocks = {};

// ===== HIỂN THỊ TIỀN =====
function updateMoneyUI() {
  document.querySelector('.money').innerText =
    playerMoney.toLocaleString('vi-VN');
}

// ===== RENDER DANH SÁCH CỔ PHIẾU =====
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
      <button onclick="buyStock('${stock.id}', 30)">Mua 30</button>
    `;

    list.appendChild(div);
  });
}

// ===== MUA CỔ PHIẾU =====
function buyStock(stockId, quantity) {
  const stock = stocks.find(s => s.id === stockId);
  if (!stock) return;

  if (playerStocks[stockId]) {
    alert('❌ Đã mua cổ phiếu này rồi!');
    return;
  }

  if (stock.supply < quantity) {
    alert('❌ Không đủ cổ phiếu!');
    return;
  }

  const cost = stock.price * quantity;
  playerMoney -= cost;
  stock.supply -= quantity;

  playerStocks[stockId] = {
    quantity,
    buyPrice: stock.price
  };

  updateMoneyUI();
  renderStocks();
  renderPlayerStocks();
}

// ===== RENDER CỔ PHIẾU ĐÃ MUA =====
function renderPlayerStocks() {
  const div = document.getElementById('player-stock-list');
  div.innerHTML = '';

  for (let id in playerStocks) {
    const ps = playerStocks[id];
    div.innerHTML += `
      <div>
        ${id} – ${ps.quantity} cổ
        (Giá mua ${(ps.buyPrice / 1e6).toFixed(0)}tr)
      </div>
    `;
  }
}

// ===== KHỞI ĐỘNG =====
renderStocks();
updateMoneyUI();
