import Card from "@mui/material/Card";
import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import { useTheme } from "@mui/material/styles";

const MedalIcon = ({ rank, color }) => (
  <Box
    sx={{
      width: 44,
      height: 44,
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
      position: 'relative'
    }}
  >
    {/* Ribbon part */}
    <svg width="24" height="24" viewBox="0 0 24 24" fill="none" style={{ position: 'absolute', top: -2, zIndex: 1 }}>
      <path d="M7 2L12 6L17 2V12L12 16L7 12V2Z" fill="#7CABF9" />
    </svg>
    {/* Circle part */}
    <Box
      sx={{
        width: 28,
        height: 28,
        borderRadius: '50%',
        backgroundColor: color || "#6366f1",
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        border: '2px solid #fff',
        boxShadow: '0 2px 4px rgba(0,0,0,0.1)',
        zIndex: 2,
        marginTop: '8px'
      }}
    >
      <Typography sx={{ color: '#fff', fontWeight: 800, fontSize: '0.9rem', lineHeight: 1 }}>
        {rank}
      </Typography>
    </Box>
  </Box>
);

const getMedalColor = (rank) => {
  if (rank === 1) return "#EDA15E"; // Gold
  if (rank === 2) return "#C5B4E3"; // Silver
  if (rank === 3) return "#D28D7B"; // Bronze
  return "#6366f1";
};

function TopPerformersCard({ topSubjects = [] }) {
  const theme = useTheme();
  const isDarkMode = theme.palette.mode === 'dark';

  return (
    <Card
      sx={{
        width: "100%",
        minHeight: { xs: "auto", lg: "400px", xl: "400px" },
        borderRadius: "24px",
        padding: "24px",
        background: isDarkMode ? "#111827" : "#ffffff",
        boxShadow: isDarkMode
          ? "0 10px 15px -3px rgba(0, 0, 0, 0.1), 0 4px 6px -2px rgba(0, 0, 0, 0.05)"
          : "0 4px 6px -1px rgba(0, 0, 0, 0.1), 0 2px 4px -1px rgba(0, 0, 0, 0.06)",
        display: "flex",
        flexDirection: "column",
        gap: 3,
        fontFamily: "'Poppins', sans-serif",
      }}
    >
      <Typography
        variant="h5"
        sx={{
          color: isDarkMode ? "#fff" : "#1E266D",
          fontWeight: 700,
          fontFamily: "'Poppins', sans-serif",
          fontSize: "1.4rem",
        }}
      >
        Top Performance Subjects
      </Typography>

      <Box display="flex" flexDirection="column" gap={2}>
        {topSubjects.length > 0 ? (
          topSubjects.map((subject, index) => (
            <Box
              key={subject.subjectName || index}
              display="flex"
              alignItems="center"
              gap={2.5}
              p={2}
              sx={{
                borderRadius: "20px",
                background: isDarkMode ? "rgba(255, 255, 255, 0.03)" : "#F2F5FF",
                transition: "transform 0.2s ease, box-shadow 0.2s ease",
                "&:hover": {
                  transform: "translateY(-4px)",
                  boxShadow: "0 10px 20px rgba(0,0,0,0.05)"
                },
              }}
            >
              <MedalIcon rank={subject.rank || index + 1} color={getMedalColor(subject.rank || index + 1)} />

              <Box flex={1}>
                <Typography sx={{ color: isDarkMode ? "#fff" : "#1E266D", fontWeight: 700, fontSize: "1.1rem", fontFamily: "'Poppins', sans-serif" }}>
                  {subject.subjectName}
                </Typography>
                <Typography sx={{ color: isDarkMode ? "rgba(255,255,255,0.5)" : "#94A3B8", fontWeight: 500, fontSize: "0.875rem", fontFamily: "'Poppins', sans-serif" }}>
                  {subject.tagline || (subject.rank === 1 ? "Highest Score" : "Top Performer")}
                </Typography>
              </Box>

              <Box>
                <Typography sx={{ color: isDarkMode ? "#fff" : "#1E266D", fontWeight: 800, fontSize: "1.2rem", fontFamily: "'Poppins', sans-serif" }}>
                  {subject.marks}/{subject.maxMarks || 100}
                </Typography>
              </Box>
            </Box>
          ))
        ) : (
          <Typography sx={{ color: isDarkMode ? "rgba(255,255,255,0.5)" : "#94A3B8", textAlign: 'center', py: 4 }}>
            No top performers data available
          </Typography>
        )}
      </Box>
    </Card>
  );
}

export default TopPerformersCard;
