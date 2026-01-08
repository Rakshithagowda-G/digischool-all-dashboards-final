import PropTypes from "prop-types";
import Card from "@mui/material/Card";
import Divider from "@mui/material/Divider";
import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import Avatar from "@mui/material/Avatar";
import { useTheme } from "@mui/material/styles";


function ResultProfileCard({ title, avatar, info }) {
  const theme = useTheme();
  const isDarkMode = theme.palette.mode === 'dark';

  return (
    <Card
      sx={{
        height: "100%",
        borderRadius: "20px",
        position: "relative",
        overflow: "hidden",
        border: "none",
        boxShadow: isDarkMode
          ? "0 20px 45px rgba(10, 15, 70, 0.55)"
          : "0 4px 6px -1px rgba(0, 0, 0, 0.1), 0 2px 4px -1px rgba(0, 0, 0, 0.06)",
        backgroundColor: isDarkMode ? "transparent" : "#ffffff",
        color: isDarkMode ? "#fff" : "#1c204b",
        fontFamily: "Poppins, sans-serif",
        width: "100%",
        display: "flex",
        flexDirection: "column",
      }}
    >
      {isDarkMode && (
        <Box
          sx={{
            position: "absolute",
            top: 0,
            left: 0,
            width: "100%",
            height: "100%",
            backgroundImage: "url('/img/body-background.png')",
            backgroundSize: "cover",
            backgroundPosition: "center",
            backgroundRepeat: "no-repeat",
            zIndex: 0,
          }}
        />
      )}

      <Box
        sx={{
          position: "relative",
          zIndex: 1,
          padding: { xs: "24px", lg: "16px", xl: "24px" },
          display: "flex",
          flexDirection: "column",
          flex: 1,
        }}
      >
        <Typography variant="h6" sx={{ fontWeight: 600, textTransform: "capitalize", fontFamily: "Poppins, sans-serif", fontSize: { lg: "1rem", xl: "1.25rem" } }} gutterBottom>
          {title}
        </Typography>
        <Box display="flex" justifyContent="center" mb={3} sx={{ mb: { lg: 2, xl: 3 } }}>
          <Avatar
            src={avatar}
            alt="profile"
            sx={{
              width: { lg: 80, xl: 96 },
              height: { lg: 80, xl: 96 },
              borderRadius: "30%",
              border: "3px solid rgba(255,255,255,0.3)",
            }}
          />
        </Box>
        <Divider sx={{ borderColor: isDarkMode ? "rgba(255,255,255,0.15)" : "rgba(0,0,0,0.1)", mb: 3 }} />
        <Box display="flex" flexDirection="column" gap={2}>
          {Object.entries(info).map(([label, value]) => (
            <Box
              key={label}
              sx={{
                borderRadius: "16px",
                background: isDarkMode ? "rgba(255,255,255,0.08)" : "rgba(99, 102, 241, 0.05)",
                border: isDarkMode ? "1px solid rgba(255,255,255,0.12)" : "1px solid rgba(99, 102, 241, 0.1)",
                padding: { xs: "12px 16px", lg: "10px 12px", xl: "12px 16px" },
              }}
            >
              <Typography
                variant="caption"
                sx={{
                  textTransform: "uppercase",
                  letterSpacing: 1,
                  color: isDarkMode ? "rgba(255,255,255,0.7)" : "rgba(28,32,75,0.7)",
                  fontFamily: "Poppins, sans-serif",
                }}
              >
                {label}
              </Typography>
              <Typography variant="subtitle2" sx={{ color: isDarkMode ? "#fff" : "#1c204b", fontWeight: 600, fontFamily: "Poppins, sans-serif" }}>
                {value}
              </Typography>
            </Box>
          ))}
        </Box>
      </Box>
    </Card>
  );
}

ResultProfileCard.propTypes = {
  title: PropTypes.string.isRequired,
  avatar: PropTypes.string.isRequired,
  info: PropTypes.object.isRequired,
};

export default ResultProfileCard;

