import { useState } from "react";
import Card from "@mui/material/Card";
import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import TrendingUpIcon from "@mui/icons-material/TrendingUp";
import { ResponsiveContainer, PieChart, Pie, Cell, LabelList } from "recharts";

const chartData = [
  { subject: "Mathematics", marks: 275, fill: "#4318ff" },
  { subject: "English", marks: 200, fill: "#0075ff" },
  { subject: "Physics", marks: 173, fill: "#5b21b6" },
  { subject: "Chemistry", marks: 187, fill: "#4338ca" },
  { subject: "Biology", marks: 90, fill: "#6366f1" },
];

export default function RoundedPieChart() {
  const [hoveredSubject, setHoveredSubject] = useState(null);

  return (
    <Card
      sx={{
        borderRadius: "24px",
        background: "linear-gradient(126.97deg, rgba(6, 11, 40, 0.74) 28.26%, rgba(10, 14, 35, 0.71) 91.2%)",
        padding: "24px",
        width: "100%",
        height: "100%",
        minHeight: "380px",
        flexShrink: 0,
        boxShadow: "0 8px 30px rgba(0, 0, 0, 0.25)",
        display: "flex",
        flexDirection: "column",
        justifyContent: "space-between",
        fontFamily: '"Poppins", sans-serif',
      }}
    >
      <Box display="flex" flexDirection="column" gap={2} flex={1}>
        <Box display="flex" alignItems="center" justifyContent="center" gap={1} mb={1}>
          <Typography 
            variant="h6" 
            fontWeight="bold" 
            sx={{ 
              color: "white", 
              textTransform: "capitalize",
              fontFamily: '"Poppins", sans-serif',
            }}
          >
            Subject Marks
          </Typography>
          <Box
            sx={{
              color: "#22c55e",
              background: "rgba(34, 197, 94, 0.1)",
              border: "none",
              padding: "4px 8px",
              borderRadius: "12px",
              display: "flex",
              alignItems: "center",
              gap: 0.5,
            }}
          >
            <TrendingUpIcon sx={{ height: "16px", width: "16px" }} />
            <Typography 
              variant="caption" 
              sx={{ 
                color: "white", 
                fontWeight: "600",
                fontFamily: '"Poppins", sans-serif',
              }}
            >
              5.2%
            </Typography>
          </Box>
        </Box>
        <Typography 
          variant="body2" 
          sx={{ 
            textAlign: "center", 
            color: "rgba(255, 255, 255, 0.7)",
            fontFamily: '"Poppins", sans-serif',
            mb: 1,
          }}
        >
          Academic Performance Overview
        </Typography>
        <Box
          sx={{
            width: "100%",
            flex: 1,
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            minHeight: "280px",
          }}
        >
          <ResponsiveContainer width="100%" height="100%">
            <PieChart>
              <Pie
                data={chartData}
                innerRadius={60}
                outerRadius={100}
                dataKey="marks"
                cornerRadius={8}
                paddingAngle={4}
                onMouseEnter={(data, index) => {
                  if (data && data.subject) {
                    setHoveredSubject(data.subject);
                  } else if (index !== undefined && chartData[index]) {
                    setHoveredSubject(chartData[index].subject);
                  }
                }}
                onMouseLeave={() => {
                  setHoveredSubject(null);
                }}
              >
                <LabelList
                  dataKey="marks"
                  stroke="none"
                  fontSize={12}
                  fontWeight={500}
                  fill="#ffffff"
                  fontFamily="Poppins, sans-serif"
                  formatter={(value) => value.toString()}
                />
                {chartData.map((entry, index) => (
                  <Cell key={`cell-${index}`} fill={entry.fill} />
                ))}
              </Pie>
            </PieChart>
          </ResponsiveContainer>
        </Box>
      </Box>
    </Card>
  );
}
