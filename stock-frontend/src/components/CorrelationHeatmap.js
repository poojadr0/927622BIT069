import React, { useMemo } from "react";
import { Paper, Typography, Box, Tooltip, useTheme } from "@mui/material";

// Calculate Pearson correlation coefficient
const calculateCorrelation = (x, y) => {
  const n = Math.min(x.length, y.length);
  if (n === 0) return 0;

  let sumX = 0, sumY = 0, sumXY = 0;
  let sumX2 = 0, sumY2 = 0;

  for (let i = 0; i < n; i++) {
    sumX += x[i];
    sumY += y[i];
    sumXY += x[i] * y[i];
    sumX2 += x[i] * x[i];
    sumY2 += y[i] * y[i];
  }

  const numerator = n * sumXY - sumX * sumY;
  const denominator = Math.sqrt((n * sumX2 - sumX * sumX) * (n * sumY2 - sumY * sumY));

  return denominator === 0 ? 0 : numerator / denominator;
};

export default function CorrelationHeatmap({ stocks, histories }) {
  const theme = useTheme();
  
  const correlations = useMemo(() => {
    const result = {};
    const stockSymbols = Object.keys(histories);

    stockSymbols.forEach(symbol1 => {
      result[symbol1] = {};
      stockSymbols.forEach(symbol2 => {
        const prices1 = histories[symbol1].map(h => h.price);
        const prices2 = histories[symbol2].map(h => h.price);
        result[symbol1][symbol2] = calculateCorrelation(prices1, prices2);
      });
    });

    return result;
  }, [histories]);

  const getColor = (correlation) => {
    const intensity = Math.abs(correlation);
    const hue = correlation > 0 ? 200 : 0; // Blue for positive, Red for negative
    return `hsl(${hue}, 70%, ${100 - intensity * 50}%)`;
  };

  return (
    <Paper sx={{ 
      p: 3,
      background: "linear-gradient(135deg, #ffffff 0%, #f8f9fa 100%)"
    }}>
      <Typography variant="h6" sx={{ mb: 3, color: theme.palette.primary.main }}>
        Stock Correlation Heatmap
      </Typography>
      
      <Box sx={{ 
        display: "flex", 
        flexDirection: "column", 
        gap: 1,
        overflowX: "auto",
        "&::-webkit-scrollbar": {
          height: "8px",
        },
        "&::-webkit-scrollbar-track": {
          background: "#f1f1f1",
          borderRadius: "4px",
        },
        "&::-webkit-scrollbar-thumb": {
          background: "#888",
          borderRadius: "4px",
          "&:hover": {
            background: "#555",
          },
        },
      }}>
        {Object.keys(correlations).map(symbol1 => (
          <Box key={symbol1} sx={{ display: "flex", gap: 1 }}>
            {Object.keys(correlations[symbol1]).map(symbol2 => {
              const correlation = correlations[symbol1][symbol2];
              return (
                <Tooltip
                  key={`${symbol1}-${symbol2}`}
                  title={
                    <Box sx={{ p: 1 }}>
                      <Typography variant="subtitle2">
                        {symbol1} vs {symbol2}
                      </Typography>
                      <Typography variant="body2">
                        Correlation: {correlation.toFixed(2)}
                      </Typography>
                    </Box>
                  }
                >
                  <Box
                    sx={{
                      width: 50,
                      height: 50,
                      bgcolor: getColor(correlation),
                      display: "flex",
                      alignItems: "center",
                      justifyContent: "center",
                      cursor: "pointer",
                      transition: "all 0.2s ease-in-out",
                      borderRadius: "8px",
                      "&:hover": {
                        transform: "scale(1.05)",
                        boxShadow: "0 2px 8px rgba(0,0,0,0.1)",
                      }
                    }}
                  >
                    <Typography 
                      variant="caption" 
                      sx={{ 
                        color: "white",
                        fontWeight: "bold",
                        textShadow: "0 1px 2px rgba(0,0,0,0.2)",
                      }}
                    >
                      {correlation.toFixed(2)}
                    </Typography>
                  </Box>
                </Tooltip>
              );
            })}
          </Box>
        ))}
      </Box>

      <Box sx={{ 
        mt: 3, 
        display: "flex", 
        alignItems: "center", 
        gap: 2,
        flexWrap: "wrap"
      }}>
        <Typography variant="body2" color="text.secondary">
          Correlation Legend:
        </Typography>
        <Box sx={{ display: "flex", gap: 2, alignItems: "center" }}>
          <Box sx={{ display: "flex", alignItems: "center", gap: 1 }}>
            <Box sx={{ width: 20, height: 20, bgcolor: "hsl(0, 70%, 50%)", borderRadius: "4px" }} />
            <Typography variant="caption">Strong Negative</Typography>
          </Box>
          <Box sx={{ display: "flex", alignItems: "center", gap: 1 }}>
            <Box sx={{ width: 20, height: 20, bgcolor: "hsl(0, 70%, 100%)", borderRadius: "4px" }} />
            <Typography variant="caption">No Correlation</Typography>
          </Box>
          <Box sx={{ display: "flex", alignItems: "center", gap: 1 }}>
            <Box sx={{ width: 20, height: 20, bgcolor: "hsl(200, 70%, 50%)", borderRadius: "4px" }} />
            <Typography variant="caption">Strong Positive</Typography>
          </Box>
        </Box>
      </Box>
    </Paper>
  );
} 