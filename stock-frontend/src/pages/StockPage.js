import React, { useState, useEffect } from "react";
import { Typography, Select, MenuItem, Box, FormControl, InputLabel, Paper, CircularProgress } from "@mui/material";
import { fetchStocks, fetchStockHistory } from "../api/stockApi";
import StockChart from "../components/StockChart";

const TIME_OPTIONS = [5, 15, 30, 60];

export default function StockPage() {
  const [stocks, setStocks] = useState([]);
  const [selected, setSelected] = useState("");
  const [minutes, setMinutes] = useState(15);
  const [history, setHistory] = useState([]);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    const loadStocks = async () => {
      const data = await fetchStocks();
      setStocks(data);
      if (data.length > 0) {
        setSelected(data[0].symbol);
      }
    };
    loadStocks();
  }, []);

  useEffect(() => {
    const loadHistory = async () => {
      if (selected) {
        setLoading(true);
        const data = await fetchStockHistory(selected, minutes);
        setHistory(data);
        setLoading(false);
      }
    };
    loadHistory();
  }, [selected, minutes]);

  return (
    <Box>
      <Paper sx={{ p: 3, mb: 4, background: "linear-gradient(45deg, #ffffff 30%, #f5f5f5 90%)" }}>
        <Typography variant="h4" sx={{ mb: 3, color: "#1a237e" }}>
          Stock Price Analysis
        </Typography>
        
        <Box sx={{ display: "flex", gap: 2, flexWrap: "wrap" }}>
          <FormControl sx={{ minWidth: 200 }}>
            <InputLabel>Select Stock</InputLabel>
            <Select
              value={selected}
              onChange={(e) => setSelected(e.target.value)}
              label="Select Stock"
              sx={{
                "& .MuiOutlinedInput-notchedOutline": {
                  borderColor: "rgba(0, 0, 0, 0.23)",
                },
                "&:hover .MuiOutlinedInput-notchedOutline": {
                  borderColor: "primary.main",
                },
              }}
            >
              {stocks.map((stock) => (
                <MenuItem key={stock.symbol} value={stock.symbol}>
                  {stock.name} ({stock.symbol})
                </MenuItem>
              ))}
            </Select>
          </FormControl>

          <FormControl sx={{ minWidth: 150 }}>
            <InputLabel>Time Interval</InputLabel>
            <Select
              value={minutes}
              onChange={(e) => setMinutes(e.target.value)}
              label="Time Interval"
              sx={{
                "& .MuiOutlinedInput-notchedOutline": {
                  borderColor: "rgba(0, 0, 0, 0.23)",
                },
                "&:hover .MuiOutlinedInput-notchedOutline": {
                  borderColor: "primary.main",
                },
              }}
            >
              {TIME_OPTIONS.map((m) => (
                <MenuItem key={m} value={m}>
                  Last {m} minutes
                </MenuItem>
              ))}
            </Select>
          </FormControl>
        </Box>
      </Paper>

      {loading ? (
        <Box sx={{ display: "flex", justifyContent: "center", p: 4 }}>
          <CircularProgress />
        </Box>
      ) : (
        <StockChart data={history} />
      )}
    </Box>
  );
} 