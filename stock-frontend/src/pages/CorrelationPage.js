import React, { useState, useEffect } from "react";
import { Typography, Select, MenuItem, Box, FormControl, InputLabel, Paper, CircularProgress } from "@mui/material";
import { fetchStocks, fetchAllStockHistories } from "../api/stockApi";
import CorrelationHeatmap from "../components/CorrelationHeatmap";

const TIME_OPTIONS = [5, 15, 30, 60];

export default function CorrelationPage() {
  const [stocks, setStocks] = useState([]);
  const [minutes, setMinutes] = useState(15);
  const [histories, setHistories] = useState({});
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    const loadStocks = async () => {
      const data = await fetchStocks();
      setStocks(data);
    };
    loadStocks();
  }, []);

  useEffect(() => {
    const loadHistories = async () => {
      if (stocks.length > 0) {
        setLoading(true);
        const symbols = stocks.map(s => s.symbol);
        const data = await fetchAllStockHistories(symbols, minutes);
        setHistories(data);
        setLoading(false);
      }
    };
    loadHistories();
  }, [stocks, minutes]);

  return (
    <Box>
      <Paper sx={{ p: 3, mb: 4, background: "linear-gradient(45deg, #ffffff 30%, #f5f5f5 90%)" }}>
        <Typography variant="h4" sx={{ mb: 3, color: "#1a237e" }}>
          Stock Correlation Analysis
        </Typography>
        
        <Box sx={{ mb: 2 }}>
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

        <Typography variant="body2" color="text.secondary" sx={{ mt: 2 }}>
          Hover over cells to see detailed correlation values between stocks
        </Typography>
      </Paper>

      {loading ? (
        <Box sx={{ display: "flex", justifyContent: "center", p: 4 }}>
          <CircularProgress />
        </Box>
      ) : (
        <CorrelationHeatmap stocks={stocks} histories={histories} />
      )}
    </Box>
  );
} 