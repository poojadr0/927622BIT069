const express = require('express');
const cors = require('cors');

const app = express();
const port = 3001;

// Enable CORS for all routes
app.use(cors());

// Mock stock data
const stocks = [
  { symbol: 'AAPL', name: 'Apple Inc.' },
  { symbol: 'GOOGL', name: 'Alphabet Inc.' },
  { symbol: 'MSFT', name: 'Microsoft Corporation' },
  { symbol: 'AMZN', name: 'Amazon.com Inc.' },
  { symbol: 'TSLA', name: 'Tesla Inc.' }
];

// Generate mock price history
function generatePriceHistory(symbol, minutes) {
  const history = [];
  const basePrice = Math.random() * 1000 + 100; // Random base price between 100 and 1100
  const now = Date.now();
  
  for (let i = minutes; i >= 0; i--) {
    const timestamp = now - (i * 60 * 1000); // Convert minutes to milliseconds
    const price = basePrice + (Math.random() - 0.5) * 20; // Random price variation
    history.push({
      timestamp,
      price: parseFloat(price.toFixed(2))
    });
  }
  
  return history;
}

// API Routes
app.get('/stocks', (req, res) => {
  res.json(stocks);
});

app.get('/stocks/:symbol/history', (req, res) => {
  const { symbol } = req.params;
  const minutes = parseInt(req.query.minutes) || 15;
  
  const stock = stocks.find(s => s.symbol === symbol);
  if (!stock) {
    return res.status(404).json({ error: 'Stock not found' });
  }
  
  const history = generatePriceHistory(symbol, minutes);
  res.json(history);
});

app.listen(port, () => {
  console.log(`Stock API server running at http://localhost:${port}`);
}); 