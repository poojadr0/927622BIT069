import React from "react";
import { BrowserRouter as Router, Routes, Route, Link } from "react-router-dom";
import { AppBar, Toolbar, Button, Container, CssBaseline, ThemeProvider, createTheme, Box, Typography, useMediaQuery } from "@mui/material";
import StockPage from "./pages/StockPage";
import CorrelationPage from "./pages/CorrelationPage";

const theme = createTheme({
  palette: {
    primary: {
      main: "#1a237e",
      light: "#534bae",
      dark: "#000051",
    },
    secondary: {
      main: "#f50057",
      light: "#ff5983",
      dark: "#bb002f",
    },
    background: {
      default: "#f8f9fa",
      paper: "#ffffff",
    },
  },
  typography: {
    fontFamily: '"Poppins", "Roboto", "Helvetica", "Arial", sans-serif',
    h4: {
      fontWeight: 600,
      color: "#1a237e",
      letterSpacing: "-0.5px",
    },
    h6: {
      fontWeight: 500,
      letterSpacing: "-0.25px",
    },
    button: {
      textTransform: "none",
      fontWeight: 500,
    },
  },
  components: {
    MuiButton: {
      styleOverrides: {
        root: {
          borderRadius: 8,
          padding: "8px 16px",
          transition: "all 0.2s ease-in-out",
          "&:hover": {
            transform: "translateY(-1px)",
            boxShadow: "0 4px 8px rgba(0,0,0,0.1)",
          },
        },
        contained: {
          boxShadow: "0 2px 4px rgba(0,0,0,0.1)",
        },
      },
    },
    MuiPaper: {
      styleOverrides: {
        root: {
          borderRadius: 16,
          boxShadow: "0 4px 20px rgba(0, 0, 0, 0.08)",
          transition: "all 0.3s ease-in-out",
          "&:hover": {
            boxShadow: "0 6px 24px rgba(0, 0, 0, 0.12)",
          },
        },
      },
    },
    MuiAppBar: {
      styleOverrides: {
        root: {
          boxShadow: "0 2px 10px rgba(0,0,0,0.1)",
        },
      },
    },
  },
});

function App() {
  const isMobile = useMediaQuery(theme.breakpoints.down('sm'));

  return (
    <ThemeProvider theme={theme}>
      <CssBaseline />
      <Router>
        <Box sx={{ display: "flex", flexDirection: "column", minHeight: "100vh" }}>
          <AppBar 
            position="static" 
            elevation={0} 
            sx={{ 
              background: "linear-gradient(135deg, #1a237e 0%, #534bae 100%)",
              backdropFilter: "blur(10px)",
            }}
          >
            <Toolbar>
              <Typography 
                variant="h6" 
                sx={{ 
                  flexGrow: 1, 
                  fontWeight: "bold",
                  background: "linear-gradient(45deg, #fff 30%, #e3f2fd 90%)",
                  WebkitBackgroundClip: "text",
                  WebkitTextFillColor: "transparent",
                }}
              >
                Stock Market Analytics
              </Typography>
              <Box sx={{ display: "flex", gap: 2 }}>
                <Button 
                  color="inherit" 
                  component={Link} 
                  to="/"
                  sx={{ 
                    "&:hover": {
                      backgroundColor: "rgba(255, 255, 255, 0.1)",
                    }
                  }}
                >
                  Stock Analysis
                </Button>
                <Button 
                  color="inherit" 
                  component={Link} 
                  to="/correlation"
                  sx={{
                    "&:hover": {
                      backgroundColor: "rgba(255, 255, 255, 0.1)",
                    }
                  }}
                >
                  Correlation Heatmap
                </Button>
              </Box>
            </Toolbar>
          </AppBar>
          <Container 
            maxWidth="lg" 
            sx={{ 
              py: 4, 
              flexGrow: 1,
              px: isMobile ? 2 : 4,
            }}
          >
            <Routes>
              <Route path="/" element={<StockPage />} />
              <Route path="/correlation" element={<CorrelationPage />} />
            </Routes>
          </Container>
          <Box 
            component="footer" 
            sx={{ 
              py: 3, 
              px: 2, 
              mt: "auto", 
              background: "linear-gradient(135deg, #f8f9fa 0%, #e9ecef 100%)",
              textAlign: "center",
              borderTop: "1px solid rgba(0,0,0,0.05)",
            }}
          >
            <Typography variant="body2" color="text.secondary">
              © 2024 Stock Market Analytics. All rights reserved.
            </Typography>
          </Box>
        </Box>
      </Router>
    </ThemeProvider>
  );
}

export default App;
