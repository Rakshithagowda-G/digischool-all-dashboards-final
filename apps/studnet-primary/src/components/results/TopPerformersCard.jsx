import Card from "@mui/material/Card";
import Box from "@mui/material/Box";
import Avatar from "@mui/material/Avatar";
import Typography from "@mui/material/Typography";

// Using placeholder avatars
const avatar1 = "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=100&h=100&fit=crop&crop=face";
const avatar2 = "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=100&h=100&fit=crop&crop=face";
const avatar3 = "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=100&h=100&fit=crop&crop=face";

const performers = [
  {
    name: "Jack Blade",
    achievement: "Best in Marks",
    score: "9.9 GPA",
    avatar: avatar1,
  },
  {
    name: "Ann Kennedy",
    achievement: "Best in Attendance",
    score: "100%",
    avatar: avatar2,
  },
  {
    name: "Marta Lewis",
    achievement: "Best Exam Result",
    score: "10/10",
    avatar: avatar3,
  },
];

function TopPerformersCard() {
  return (
    <Card
      sx={{
        width: "100%",
        height: "100%",
        minHeight: "380px",
        flexShrink: 0,
        background: "linear-gradient(126.97deg, rgba(6, 11, 40, 0.74) 28.26%, rgba(10, 14, 35, 0.71) 91.2%)",
        borderRadius: "24px",
        padding: "24px",
        boxShadow: "0 8px 30px rgba(0, 0, 0, 0.25)",
        display: "flex",
        flexDirection: "column",
        justifyContent: "space-between",
        fontFamily: '"Poppins", sans-serif',
      }}
    >
      <Box mb={2}>
        <Typography 
          variant="h6" 
          fontWeight="bold" 
          sx={{ 
            color: "white", 
            textTransform: "capitalize",
            fontFamily: '"Poppins", sans-serif',
          }}
        >
          Top Performers
        </Typography>
      </Box>

      <Box display="flex" flexDirection="column" gap={2} flex={1}>
        {performers.map((performer, index) => (
          <Box
            key={index}
            display="flex"
            alignItems="center"
            gap={2}
            p={1.5}
            sx={{
              borderRadius: "12px",
              background: "linear-gradient(126.97deg, rgb(6, 11, 40) 28.26%, rgb(10, 14, 35) 91.2%)",
              transition: "transform 0.2s ease-in-out",
              "&:hover": {
                transform: "translateY(-2px)",
              },
            }}
          >
            <Avatar
              src={performer.avatar}
              alt={performer.name}
              sx={{ 
                width: 48, 
                height: 48,
                boxShadow: "0 4px 10px rgba(0, 0, 0, 0.3)",
              }}
            />
            <Box flex={1}>
              <Typography 
                variant="subtitle1" 
                fontWeight="bold" 
                sx={{ 
                  color: "white",
                  fontFamily: '"Poppins", sans-serif',
                }}
              >
                {performer.name}
              </Typography>
              <Typography 
                variant="body2" 
                sx={{ 
                  color: "rgba(255, 255, 255, 0.7)",
                  fontFamily: '"Poppins", sans-serif',
                }}
              >
                {performer.achievement}
              </Typography>
            </Box>
            <Box
              sx={{
                background: "linear-gradient(97.89deg, #4318ff, #9f7aea)",
                borderRadius: "8px",
                padding: "8px 16px",
                minWidth: "60px",
                textAlign: "center",
              }}
            >
              <Typography 
                variant="button" 
                fontWeight="bold" 
                sx={{ 
                  color: "white",
                  fontFamily: '"Poppins", sans-serif',
                }}
              >
                {performer.score}
              </Typography>
            </Box>
          </Box>
        ))}
      </Box>
    </Card>
  );
}

export default TopPerformersCard;
