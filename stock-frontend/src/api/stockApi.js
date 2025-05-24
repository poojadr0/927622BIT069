import axios from "axios";

const API_BASE = "http://localhost:3000"; // Updated to match backend port

export const fetchStocks = async () => {
  try {
    const res = await axios.get(`${API_BASE}/stocks`);
    return res.data;
  } catch (error) {
    console.error("Error fetching stocks:", error);
    return [];
  }
};

export const fetchStockHistory = async (symbol, minutes) => {
  try {
    const res = await axios.get(`${API_BASE}/stocks/${symbol}/history?minutes=${minutes}`);
    return res.data;
  } catch (error) {
    console.error(`Error fetching history for ${symbol}:`, error);
    return [];
  }
};

export const fetchAllStockHistories = async (symbols, minutes) => {
  try {
    const promises = symbols.map(symbol => fetchStockHistory(symbol, minutes));
    const results = await Promise.all(promises);
    return Object.fromEntries(symbols.map((symbol, index) => [symbol, results[index]]));
  } catch (error) {
    console.error("Error fetching all stock histories:", error);
    return {};
  }
}; 