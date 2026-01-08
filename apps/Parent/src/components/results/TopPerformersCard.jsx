import Card from "@mui/material/Card";
import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import { useTheme } from "@mui/material/styles";
import { Info } from "lucide-react";

// Helper function to get badge info based on score
const getBadgeInfo = (score) => {
  if (score >= 90) {
    return {
      badge: "Excellent",
      badgeColor: "#22c55e", // green
      badgeBg: "rgba(34, 197, 94, 0.1)"
    };
  } else if (score >= 80) {
    return {
      badge: "Very Good",
      badgeColor: "#3b82f6", // blue
      badgeBg: "rgba(59, 130, 246, 0.1)"
    };
  } else if (score >= 70) {
    return {
      badge: "Good",
      badgeColor: "#f97316", // orange
      badgeBg: "rgba(249, 115, 22, 0.1)"
    };
  }
  return {
    badge: "Fair",
    badgeColor: "#64748b", // gray
    badgeBg: "rgba(100, 116, 139, 0.1)"
  };
};

const rankIcons = ["🥇", "🥈", "🥉", "🏅", "🏅"];

function TopPerformersCard({ subjects = [] }) {
  const theme = useTheme();
  const isDarkMode = theme.palette.mode === 'dark';

  const safeSubjects = Array.isArray(subjects) ? subjects : [];

  return (
    <Card
      sx={{
        width: "100%",
        minHeight: { xs: "auto", lg: "360px", xl: "420px" },
        height: { xs: "auto", lg: "360px", xl: "420px" },
        borderRadius: "20px",
        padding: { xs: "24px", lg: "16px", xl: "24px" },
        background: isDarkMode
          ? "linear-gradient(135deg, #141727 0%, #3a416f 100%)"
          : "#ffffff",
        boxShadow: isDarkMode
          ? "0 20px 45px rgba(10, 15, 70, 0.55)"
          : "0 4px 6px -1px rgba(0, 0, 0, 0.1), 0 2px 4px -1px rgba(0, 0, 0, 0.06)",
        border: isDarkMode ? "none" : "none",
        display: "flex",
        flexDirection: "column",
        gap: 2.5,
        fontFamily: "Poppins, sans-serif",
        overflow: "hidden",
      }}
    >
      <Typography
        variant="h6"
        sx={{
          color: isDarkMode ? "#fff" : "#1c204b",
          fontWeight: 600,
          fontFamily: "Poppins, sans-serif",
          fontSize: { xs: "1rem", lg: "1rem", xl: "1.25rem" },
          lineHeight: 1.3
        }}
      >
        Your Child – Top Subject Performance
      </Typography>

      <Box
        display="flex"
        flexDirection="column"
        gap={1.5}
        sx={{
          flex: 1,
          overflowY: "auto",
          overflowX: "hidden",
          paddingRight: "4px",
          "&::-webkit-scrollbar": { width: "6px" },
          "&::-webkit-scrollbar-track": { background: "transparent" },
          "&::-webkit-scrollbar-thumb": {
            background: isDarkMode ? "rgba(255,255,255,0.2)" : "rgba(0,0,0,0.1)",
            borderRadius: "3px"
          },
          "&::-webkit-scrollbar-thumb:hover": {
            background: isDarkMode ? "rgba(255,255,255,0.3)" : "rgba(0,0,0,0.2)"
          }
        }}
      >
        {safeSubjects.length === 0 ? (
          <Box display="flex" flexDirection="column" alignItems="center" justifyContent="center" height="100%" color="gray">
            <Info size={32} />
            <Typography variant="body2" sx={{ mt: 1, fontStyle: 'italic' }}>No subject data available</Typography>
          </Box>
        ) : (
          safeSubjects.map((item, index) => {
            const badge = getBadgeInfo(item.score || 0);
            return (
              <Box
                key={index}
                display="flex"
                alignItems="center"
                gap={{ xs: 1.5, lg: 2 }}
                p={{ xs: 2, lg: 1.5, xl: 2 }}
                sx={{
                  borderRadius: "16px",
                  background: isDarkMode
                    ? "rgba(255, 255, 255, 0.07)"
                    : "rgba(99, 102, 241, 0.05)",
                  border: isDarkMode
                    ? "1px solid rgba(255, 255, 255, 0.12)"
                    : "1px solid rgba(99, 102, 241, 0.1)",
                  backdropFilter: isDarkMode ? "blur(10px)" : "none",
                  transition: "transform 0.15s ease",
                  flexShrink: 0,
                  "&:hover": {
                    transform: "translateY(-3px)",
                  },
                  flexDirection: { xs: "column", sm: "row" },
                  alignItems: { xs: "flex-start", sm: "center" }
                }}
              >
                {/* Rank Icon */}
                <Box
                  sx={{
                    fontSize: { xs: "28px", lg: "24px", xl: "32px" },
                    flexShrink: 0,
                    lineHeight: 1
                  }}
                >
                  {rankIcons[index] || "🏅"}
                </Box>

                {/* Subject Name */}
                <Box flex={1} sx={{ minWidth: 0 }}>
                  <Typography
                    variant="subtitle2"
                    sx={{
                      color: isDarkMode ? "#fff" : "#1c204b",
                      fontWeight: 600,
                      fontFamily: "Poppins, sans-serif",
                      fontSize: { xs: "0.875rem", lg: "0.75rem", xl: "0.875rem" }
                    }}
                  >
                    {item.subject || "Unknown"}
                  </Typography>
                </Box>

                {/* Score */}
                <Box
                  textAlign={{ xs: "left", sm: "right" }}
                  sx={{
                    flexShrink: 0,
                    width: { xs: "100%", sm: "auto" }
                  }}
                >
                  <Typography
                    sx={{
                      color: isDarkMode ? "#60a5fa" : "#3b82f6",
                      fontWeight: 700,
                      fontSize: { xs: "1.125rem", lg: "0.875rem", xl: "1rem" },
                      fontFamily: "Poppins, sans-serif"
                    }}
                  >
                    {item.score || 0}%
                  </Typography>
                </Box>

                {/* Performance Badge */}
                <Box
                  sx={{
                    flexShrink: 0,
                    width: { xs: "100%", sm: "auto" }
                  }}
                >
                  <Box
                    sx={{
                      display: "inline-flex",
                      alignItems: "center",
                      px: { xs: 2, lg: 1.5, xl: 2 },
                      py: { xs: 0.75, lg: 0.5, xl: 0.75 },
                      borderRadius: "12px",
                      background: badge.badgeBg,
                      border: `1px solid ${badge.badgeColor}30`,
                    }}
                  >
                    <Typography
                      sx={{
                        color: badge.badgeColor,
                        fontWeight: 600,
                        fontSize: { xs: "0.75rem", lg: "0.65rem", xl: "0.75rem" },
                        fontFamily: "Poppins, sans-serif",
                        textTransform: "capitalize"
                      }}
                    >
                      {badge.badge}
                    </Typography>
                  </Box>
                </Box>
              </Box>
            );
          })
        )}
      </Box>
    </Card>
  );
}

export default TopPerformersCard;
