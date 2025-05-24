import React from "react";
import { XAxis, YAxis, Tooltip, ReferenceLine, ResponsiveContainer, CartesianGrid, Area, AreaChart } from "recharts";
import { Paper, Typography, Box, useTheme } from "@mui/material";

export default function StockChart({ data }) {
  const theme = useTheme();

  if (!data || data.length === 0) {
    return (
      <Paper sx={{ 
        p: 2, 
        height: 300, 
        display: "flex", 
        alignItems: "center", 
        justifyContent: "center",
        background: "linear-gradient(135deg, #ffffff 0%, #f8f9fa 100%)"
      }}>
        <Typography>No data available</Typography>
      </Paper>
    );
  }

  const avg = data.reduce((sum, d) => sum + d.price, 0) / data.length;
  const min = Math.min(...data.map(d => d.price));
  const max = Math.max(...data.map(d => d.price));
  const change = ((data[data.length - 1].price - data[0].price) / data[0].price) * 100;

  return (
    <Paper sx={{ 
      p: 3,
      background: "linear-gradient(135deg, #ffffff 0%, #f8f9fa 100%)"
    }}>
      <Box sx={{ mb: 3 }}>
        <Typography variant="h6" sx={{ color: theme.palette.primary.main, mb: 1 }}>
          Price Chart
        </Typography>
        <Box sx={{ 
          display: "flex", 
          gap: 3, 
          flexWrap: "wrap",
          alignItems: "center"
        }}>
          <Box>
            <Typography variant="body2" color="text.secondary">
              Average
            </Typography>
            <Typography variant="h6" color="text.primary">
              ${avg.toFixed(2)}
            </Typography>
          </Box>
          <Box>
            <Typography variant="body2" color="text.secondary">
              Min
            </Typography>
            <Typography variant="h6" color="text.primary">
              ${min.toFixed(2)}
            </Typography>
          </Box>
          <Box>
            <Typography variant="body2" color="text.secondary">
              Max
            </Typography>
            <Typography variant="h6" color="text.primary">
              ${max.toFixed(2)}
            </Typography>
          </Box>
          <Box>
            <Typography variant="body2" color="text.secondary">
              Change
            </Typography>
            <Typography 
              variant="h6" 
              color={change >= 0 ? "success.main" : "error.main"}
            >
              {change >= 0 ? "+" : ""}{change.toFixed(2)}%
            </Typography>
          </Box>
        </Box>
      </Box>
      <ResponsiveContainer width="100%" height={400}>
        <AreaChart data={data} margin={{ top: 5, right: 30, left: 20, bottom: 5 }}>
          <defs>
            <linearGradient id="colorPrice" x1="0" y1="0" x2="0" y2="1">
              <stop offset="5%" stopColor={theme.palette.primary.main} stopOpacity={0.3}/>
              <stop offset="95%" stopColor={theme.palette.primary.main} stopOpacity={0}/>
            </linearGradient>
          </defs>
          <CartesianGrid 
            strokeDasharray="3 3" 
            stroke={theme.palette.grey[200]}
            vertical={false}
          />
          <XAxis 
            dataKey="timestamp" 
            tickFormatter={(timestamp) => new Date(timestamp).toLocaleTimeString()}
            stroke={theme.palette.text.secondary}
            tick={{ fill: theme.palette.text.secondary }}
          />
          <YAxis 
            domain={['auto', 'auto']}
            tickFormatter={(value) => `$${value.toFixed(2)}`}
            stroke={theme.palette.text.secondary}
            tick={{ fill: theme.palette.text.secondary }}
          />
          <Tooltip 
            formatter={(value) => [`$${value.toFixed(2)}`, 'Price']}
            labelFormatter={(timestamp) => new Date(timestamp).toLocaleString()}
            contentStyle={{
              backgroundColor: "rgba(255, 255, 255, 0.9)",
              border: "1px solid #ccc",
              borderRadius: "8px",
              boxShadow: "0 2px 4px rgba(0,0,0,0.1)"
            }}
          />
          <Area
            type="monotone"
            dataKey="price"
            stroke={theme.palette.primary.main}
            fillOpacity={1}
            fill="url(#colorPrice)"
            strokeWidth={2}
          />
          <ReferenceLine 
            y={avg} 
            label={{ 
              value: "Avg", 
              position: "right",
              fill: theme.palette.secondary.main,
              fontSize: 12
            }} 
            stroke={theme.palette.secondary.main}
            strokeDasharray="3 3" 
          />
        </AreaChart>
      </ResponsiveContainer>
    </Paper>
  );
} 