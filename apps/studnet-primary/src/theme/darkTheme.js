import { createTheme } from "@mui/material/styles";

const darkTheme = createTheme({
  palette: {
    mode: "dark",
    primary: {
      main: "#3b82f6", // Bright blue accent
      light: "#60a5fa",
      dark: "#2563eb",
    },
    secondary: {
      main: "#10b981", // Bright green accent
      light: "#34d399",
      dark: "#059669",
    },
    background: {
      default: "#0f172a", // Very dark blue/black
      paper: "#1e293b", // Dark blue-gray for cards
    },
    text: {
      primary: "#f1f5f9", // Light gray/white
      secondary: "rgba(241, 245, 249, 0.7)",
    },
    divider: "rgba(255, 255, 255, 0.1)",
  },
  typography: {
    fontFamily: '"Poppins", "Roboto", "Helvetica", "Arial", sans-serif',
    fontWeightLight: 300,
    fontWeightRegular: 400,
    fontWeightMedium: 500,
    fontWeightBold: 700,
  },
  shape: {
    borderRadius: 24,
  },
  components: {
    MuiCard: {
      styleOverrides: {
        root: {
          backgroundColor: "#1e293b",
          backgroundImage: "none",
        },
      },
    },
    MuiPaper: {
      styleOverrides: {
        root: {
          backgroundColor: "#1e293b",
          backgroundImage: "none",
        },
      },
    },
  },
});

export default darkTheme;



