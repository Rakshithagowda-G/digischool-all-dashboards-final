import React, { useState, useEffect } from "react";
import Card from "@mui/material/Card";
import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import { useTheme } from "@mui/material/styles";
import useMediaQuery from "@mui/material/useMediaQuery";
import { getTopSubjects } from "@/lib/api";
import { Loader2, AlertCircle } from "lucide-react";

function TopPerformersCard({ studentId }) {
  const theme = useTheme();
  const isDarkMode = theme.palette.mode === 'dark';
  const isTablet = useMediaQuery("(min-width:1024px) and (max-width:1366px)");
  const [performers, setPerformers] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchTopSubjects = async () => {
      try {
        setLoading(true);
        const data = await getTopSubjects(studentId);
        if (Array.isArray(data)) {
          const medals = ["🥇", "🥈", "🥉"];
          const achievements = ["Highest Score", "Excellent", "Great Progress"];
          const mapped = data.map((item, index) => ({
            name: item.subject,
            achievement: achievements[index] || "Consistent",
            score: `${item.marks}/${item.maxMarks}`,
            medal: medals[index] || "⭐",
          }));
          setPerformers(mapped);
        }
      } catch (error) {
        console.error("Error fetching top subjects:", error);
      } finally {
        setLoading(false);
      }
    };
    if (studentId) fetchTopSubjects();
  }, [studentId]);

  return (
    <Card
      sx={{
        width: "100%",
        minHeight: isTablet ? 360 : 420,
        height: isTablet ? 360 : 420,
        borderRadius: "20px",
        padding: { xs: "24px", lg: "16px", xl: "24px" },
        background: isDarkMode ? "#141E5A" : "#ffffff",
        boxShadow: isDarkMode
          ? "0 20px 45px rgba(10, 15, 70, 0.55)"
          : "0 4px 6px -1px rgba(0, 0, 0, 0.1), 0 2px 4px -1px rgba(0, 0, 0, 0.06)",
        border: "none",
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
          textTransform: "capitalize",
          fontFamily: "Poppins, sans-serif",
          fontSize: { lg: "1rem", xl: "1.25rem" }
        }}
      >
        Top Performance Subjects
      </Typography>

      <Box display="flex" flexDirection="column" gap={1.5} sx={{ flex: 1, overflow: "hidden", justifyContent: "center" }}>
        {loading ? (
          <Box display="flex" flexDirection="column" alignItems="center" gap={1}>
            <Loader2 className="w-8 h-8 animate-spin text-blue-500" />
            <Typography variant="caption" color={isDarkMode ? "rgba(255,255,255,0.6)" : "textSecondary"}>
              Loading top subjects...
            </Typography>
          </Box>
        ) : performers.length === 0 ? (
          <Box display="flex" flexDirection="column" alignItems="center" gap={1}>
            <AlertCircle className="w-8 h-8 text-gray-400" />
            <Typography variant="caption" color={isDarkMode ? "rgba(255,255,255,0.6)" : "textSecondary"}>
              No result data available
            </Typography>
          </Box>
        ) : (
          performers.map((performer) => (
            <Box
              key={performer.name}
              display="flex"
              alignItems="center"
              gap={2}
              p={1.5}
              sx={{
                borderRadius: "16px",
                background: isDarkMode ? "rgba(255, 255, 255, 0.07)" : "rgba(99, 102, 241, 0.05)",
                border: isDarkMode ? "1px solid rgba(255, 255, 255, 0.12)" : "1px solid rgba(99, 102, 241, 0.1)",
                backdropFilter: isDarkMode ? "blur(10px)" : "none",
                transition: "transform 0.15s ease",
                flexShrink: 0,
                "&:hover": {
                  transform: "translateY(-3px)",
                },
              }}
            >
              <Box
                sx={{
                  width: { lg: 32, xl: 40 },
                  height: { lg: 32, xl: 40 },
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                  fontSize: { lg: "1.5rem", xl: "1.75rem" },
                }}
              >
                {performer.medal}
              </Box>
              <Box flex={1} sx={{ minWidth: 0 }}>
                <Typography variant="subtitle2" sx={{ color: isDarkMode ? "#fff" : "#1c204b", fontWeight: 600, fontFamily: "Poppins, sans-serif", fontSize: { lg: "0.75rem", xl: "0.875rem" } }}>
                  {performer.name}
                </Typography>
                <Typography variant="caption" sx={{ color: isDarkMode ? "rgba(255,255,255,0.7)" : "rgba(28,32,75,0.7)", fontFamily: "Poppins, sans-serif", fontSize: { lg: "0.7rem", xl: "0.75rem" } }}>
                  {performer.achievement}
                </Typography>
              </Box>
              <Box textAlign="right" sx={{ flexShrink: 0 }}>
                <Typography sx={{ color: isDarkMode ? "#fff" : "#1c204b", fontWeight: 700, fontSize: { lg: "0.75rem", xl: "0.875rem" }, fontFamily: "Poppins, sans-serif" }}>
                  {performer.score}
                </Typography>
              </Box>
            </Box>
          ))
        )}
      </Box>
    </Card>
  );
}

export default TopPerformersCard;

