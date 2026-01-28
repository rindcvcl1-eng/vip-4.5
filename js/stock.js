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
        <button onclick="sellStock('${id}')">BÁN</button>
      </div>
    `;
  }
}

// ===== KHỞI ĐỘNG =====
renderStocks();
updateMoneyUI();
// ===== BIẾN ĐỘNG GIÁ CỔ PHIẾU =====
function updateStockPrices() {
  stocks.forEach(stock => {
    const isIncrease = Math.random() < 0.2; // 20% tăng

    const changePercent = Math.random() * 0.15 + 0.05; // 5% -> 20%
    const changeAmount = stock.price * changePercent;

    if (isIncrease) {
      stock.price += changeAmount;
      stock.trend = 'up';
    } else {
      stock.price -= changeAmount;
      stock.trend = 'down';

      // nếu người chơi đang giữ cổ → trừ tiền trực tiếp
      if (playerStocks[stock.id]) {
        const loss =
          changeAmount * playerStocks[stock.id].quantity;
        playerMoney -= loss;
      }
    }

    // không cho giá âm
    if (stock.price < 0) stock.price = 0;
  });

  updateMoneyUI();
  renderStocks();
  renderPlayerStocks();
}

// ===== CHẠY MỖI 5 PHÚT =====
setInterval(updateStockPrices, 5 * 60 * 1000);
// ===== AI NHÀ ĐẦU TƯ =====
let aiMoney = 2_000_000_000;
let aiStocks = {};

// AI quyết định mua cổ phiếu
function aiBuyStocks() {
  stocks.forEach(stock => {
    // bỏ qua nếu hết cổ hoặc AI đã mua
    if (stock.supply < 30 || aiStocks[stock.id]) return;

    // AI ưu tiên cổ đang tăng
    let buyChance = stock.trend === 'up' ? 0.6 : 0.15;

    if (Math.random() < buyChance) {
      const quantity = 30;
      const cost = stock.price * quantity;

      if (aiMoney >= cost) {
        aiMoney -= cost;
        stock.supply -= quantity;

        aiStocks[stock.id] = {
          quantity,
          buyPrice: stock.price
        };

        console.log(`🤖 AI mua ${quantity} cổ ${stock.id}`);
      }
    }
  });

  renderStocks();
}
setInterval(aiBuyStocks, 5 * 60 * 1000);
// ===== BÁN CỔ PHIẾU =====
function sellStock(stockId) {
  const stock = stocks.find(s => s.id === stockId);
  const ps = playerStocks[stockId];
  if (!stock || !ps) return;

  const value = stock.price * ps.quantity;

  playerMoney += value;
  stock.supply += ps.quantity;

  delete playerStocks[stockId];

  updateMoneyUI();
  renderStocks();
  renderPlayerStocks();

  alert(`✅ Đã bán cổ phiếu ${stockId}`);
}
// ===== KIỂM TRA PHÁ SẢN =====
function checkBankruptcy() {
  stocks.forEach(stock => {
    if (stock.price === 0 && !stock.bankrupt) {
      stock.bankrupt = true;

      // người chơi đang giữ
      if (playerStocks[stock.id]) {
        playerMoney -= 200_000_000;
        delete playerStocks[stock.id];
      }

      // AI đang giữ
      if (aiStocks[stock.id]) {
        aiMoney -= 200_000_000;
        delete aiStocks[stock.id];
      }

      alert(`💣 Cổ phiếu ${stock.id} PHÁ SẢN!`);
    }
  });

  updateMoneyUI();
  renderStocks();
  renderPlayerStocks();
  checkBankruptcy();
}
