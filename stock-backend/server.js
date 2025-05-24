const express = require('express');
const cors = require('cors');
const axios = require('axios');

const app = express();
const port = 3000;

// Enable CORS for all routes
app.use(cors());

// API Token
const API_TOKEN = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJNYXBDbGFpbXMiOnsiZXhwIjoxNzQ4MDcxNjAwLCJpYXQiOjE3NDgwNzEzMDAsImlzcyI6IkFmZm9yZG1lZCIsImp0aSI6IjI5YjNlOWE2LWY2OGQtNDQ4Ny1hZWVlLTFiNjhhYzgyOTgzMCIsInN1YiI6InBvb2phZHIwNTEyQGdtYWlsLmNvbSJ9LCJlbWFpbCI6InBvb2phZHIwNTEyQGdtYWlsLmNvbSIsIm5hbWUiOiJwb29qYSIsInJvbGxObyI6IjkyNzYyMmJpdDA2OSIsImFjY2Vzc0NvZGUiOiJ3aGVRVXkiLCJjbGllbnRJRCI6IjI5YjNlOWE2LWY2OGQtNDQ4Ny1hZWVlLTFiNjhhYzgyOTgzMCIsImNsaWVudFNlY3JldCI6IktCZ2hEQ1VYS01qek1IdWcifQ.h1wSlscWaADkHFs1Z4g0zGAGGFFTFDR4n0aMY1EmwSI';

// Stock list from data/stocks.js
const stocks = require('./data/stocks');

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
  const stockList = Object.entries(stocks).map(([name, symbol]) => ({
    symbol,
    name
  }));
  res.json(stockList);
});

app.get('/stocks/:symbol/history', async (req, res) => {
  const { symbol } = req.params;
  const minutes = parseInt(req.query.minutes) || 15;
  
  try {
    // Temporarily use mock data while we wait for the correct API endpoint
    const history = generatePriceHistory(symbol, minutes);
    res.json(history);
  } catch (error) {
    console.error('Error fetching stock data:', error);
    res.status(500).json({ error: 'Failed to fetch stock data' });
  }
});

app.listen(port, () => {
  console.log(`Stock API server running at http://localhost:${port}`);
}); 