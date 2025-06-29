// Real-time price from Binance
async function fetchBitcoinPrice() {
  try {
    const response = await fetch('https://api.binance.com/api/v3/ticker/24hr?symbol=BTCUSDT');
    const data = await response.json();
    
    // Format price
    const price = parseFloat(data.lastPrice).toLocaleString('en-US', {
      style: 'currency',
      currency: 'USD',
      minimumFractionDigits: 2,
      maximumFractionDigits: 2
    });
    
    // Update DOM
    document.getElementById('btc-price').textContent = price;
    
    // Update change percentage
    const change = parseFloat(data.priceChangePercent).toFixed(2);
    const changeElement = document.getElementById('price-change');
    changeElement.textContent = `${change}%`;
    
    // Color coding
    if (change >= 0) {
      changeElement.className = 'change positive';
    } else {
      changeElement.className = 'change negative';
    }
    
    // Animate price change
    gsap.fromTo('#btc-price', 
      { scale: 1.1, color: change >= 0 ? '#00E676' : '#FF3D00' },
      { scale: 1, color: '#FFF', duration: 0.5 }
    );
    
  } catch (error) {
    console.error('Price fetch error:', error);
  }
}

// Initialize
fetchBitcoinPrice();
setInterval(fetchBitcoinPrice, 30000); // Update every 30 seconds

// TradingView Widget (pseudo-code - would use their SDK)
function loadTradingViewWidget() {
  // Implementation depends on TradingView license
}