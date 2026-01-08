// import { useState, useEffect } from "react";
// import Card from "@mui/material/Card";
// import Box from "@mui/material/Box";
// import Typography from "@mui/material/Typography";
// import { useTheme } from "@mui/material/styles";
// import useMediaQuery from "@mui/material/useMediaQuery";
// import TrendingUpIcon from "@mui/icons-material/TrendingUp";
// import { ResponsiveContainer, PieChart, Pie, Cell, LabelList, Label } from "recharts";

// const chartData = [
//   { subject: "Mathematics", marks: 275, color: "#4318ff" },
//   { subject: "English", marks: 200, color: "#0075ff" },
//   { subject: "Physics", marks: 173, color: "#5b21b6" },
//   { subject: "Chemistry", marks: 187, color: "#4338ca" },
//   { subject: "Biology", marks: 90, color: "#6366f1" },
// ];

// function RoundedPieChart() {
//   const theme = useTheme();
//   const isDarkMode = theme.palette.mode === 'dark';
//   const isIPadPro = useMediaQuery('(min-width:1024px) and (max-width:1366px)');
//   const [hoveredSubject, setHoveredSubject] = useState(null);
//   const innerRadius = isIPadPro ? 40 : 50;
//   const outerRadius = isIPadPro ? 60 : 75;

//   return (
//     <Card
//       sx={{
//         borderRadius: "20px",
//         background: isDarkMode
//           ? "linear-gradient(135deg, #141727 0%, #3a416f 100%)"
//           : "#ffffff",
//         padding: { xs: "24px", lg: "16px", xl: "24px" },
//         width: "100%",
//         minHeight: { xs: "auto", lg: "350px", xl: "350px" },
//         height: { xs: "auto", lg: "350px", xl: "350px" },
//         boxShadow: isDarkMode
//           ? "0 20px 45px rgba(10, 15, 70, 0.55)"
//           : "0 4px 6px -1px rgba(0, 0, 0, 0.1), 0 2px 4px -1px rgba(0, 0, 0, 0.06)",
//         border: isDarkMode ? "none" : "none",
//         display: "flex",
//         flexDirection: "column",
//         gap: 1.5,
//         fontFamily: "Poppins, sans-serif",
//         overflow: "hidden",
//       }}
//     >
//       <Box display="flex" alignItems="center" justifyContent="center" gap={1} sx={{ flexShrink: 0 }}>
//         <Typography variant="h6" sx={{ color: isDarkMode ? "#fff" : "#1c204b", fontWeight: 600, fontFamily: "Poppins, sans-serif", fontSize: { lg: "1rem", xl: "1.25rem" } }}>
//           Subject Marks
//         </Typography>
//         <Box
//           sx={{
//             color: "#22c55e",
//             background: "rgba(34, 197, 94, 0.1)",
//             padding: "4px 8px",
//             borderRadius: "12px",
//             display: "flex",
//             alignItems: "center",
//             gap: 0.5,
//           }}
//         >
//           <TrendingUpIcon sx={{ fontSize: 16 }} />
//           <Typography variant="caption" sx={{ color: "#22c55e", fontWeight: 600, fontFamily: "Poppins, sans-serif" }}>
//             5.2%
//           </Typography>
//         </Box>
//       </Box>
//       <Typography variant="caption" sx={{ textAlign: "center", color: isDarkMode ? "rgba(255,255,255,0.7)" : "rgba(28,32,75,0.7)", fontFamily: "Poppins, sans-serif", flexShrink: 0 }}>
//         Academic Performance Overview
//       </Typography>
//       <Box sx={{ flex: 1, position: "relative", minHeight: { xs: "240px", md: "260px", lg: "280px" }, overflow: "hidden" }}>
//         <ResponsiveContainer width="100%" height="100%">
//           <PieChart>
//             <Pie
//               data={chartData}
//               dataKey="marks"
//               nameKey="subject"
//               innerRadius={innerRadius}
//               outerRadius={outerRadius}
//               cornerRadius={8}
//               paddingAngle={4}
//               onMouseEnter={(data, index, e) => {
//                 if (data && data.subject) {
//                   setHoveredSubject(data.subject);
//                 } else if (index !== undefined && chartData[index]) {
//                   setHoveredSubject(chartData[index].subject);
//                 }
//               }}
//               onMouseLeave={() => {
//                 setHoveredSubject(null);
//               }}
//               label={false}
//             >
//               <LabelList
//                 dataKey="marks"
//                 position="inside"
//                 fill="#fff"
//                 fontFamily="Poppins, sans-serif"
//               />
//               <Label
//                 content={({ viewBox }) => {
//                   if (hoveredSubject && viewBox) {
//                     return (
//                       <text
//                         x={viewBox.cx}
//                         y={viewBox.cy}
//                         textAnchor="middle"
//                         dominantBaseline="middle"
//                         style={{
//                           fontSize: "16px",
//                           fontWeight: 600,
//                           fill: isDarkMode ? "#fff" : "#1c204b",
//                           fontFamily: "Poppins, sans-serif",
//                         }}
//                       >
//                         {hoveredSubject}
//                       </text>
//                     );
//                   }
//                   return null;
//                 }}
//               />
//               {chartData.map((entry) => (
//                 <Cell key={entry.subject} fill={entry.color} />
//               ))}
//             </Pie>
//           </PieChart>
//         </ResponsiveContainer>
//       </Box>
//     </Card>
//   );
// }

// export default RoundedPieChart;
import { useState } from "react";
import Card from "@mui/material/Card";
import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import { useTheme } from "@mui/material/styles";
import useMediaQuery from "@mui/material/useMediaQuery";
import TrendingUpIcon from "@mui/icons-material/TrendingUp";
import { PieChart as MuiPieChart } from "@mui/x-charts/PieChart";
import { AlertCircle } from "lucide-react";

import {
  ResponsiveContainer,
  PieChart,
  Pie,
  Cell,
  Tooltip
} from "recharts";

const SUBJECT_COLORS = ["#6366f1", "#3b82f6", "#8b5cf6", "#4338ca", "#06b6d4", "#f43f5e", "#10b981", "#f59e0b"];

export default function RoundedPieChart({ data }) {
  const theme = useTheme();
  const isDark = theme.palette.mode === "dark";
  const isTablet = useMediaQuery("(min-width:1024px) and (max-width:1366px)");

  const subjects = data?.subjects || [];
  const chartData = subjects.map((s, i) => ({
    subject: s.label,
    marks: s.value,
    color: SUBJECT_COLORS[i % SUBJECT_COLORS.length]
  }));

  const total = chartData.reduce((sum, s) => sum + s.marks, 0);

  if (subjects.length === 0) {
    return (
      <Card
        sx={{
          borderRadius: 4,
          p: 2,
          minHeight: isTablet ? 360 : 420,
          background: isDark ? "#141E5A" : "#fff",
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          justifyContent: "center",
          gap: 2
        }}
      >
        <AlertCircle size={48} color={isDark ? "#94a3b8" : "#cbd5e1"} />
        <Typography color={isDark ? "#94a3b8" : "#64748b"}>
          No result data available
        </Typography>
      </Card>
    );
  }

  // Prepare data for MUI Chart
  const muiData = chartData.map((d, i) => ({
    id: i,
    value: d.marks,
    label: d.subject,
    color: d.color
  }));

  return (
    <Card
      sx={{
        borderRadius: 4,
        p: 2,
        minHeight: isTablet ? 360 : 420,
        background: isDark ? "#141E5A" : "#fff",
        display: "flex",
        flexDirection: "column",
        gap: 1,
        minWidth: 0,
      }}
    >
      {/* HEADER */}
      <Box display="flex" alignItems="center" justifyContent="center" gap={1}>
        <Typography fontWeight={600} sx={{ color: isDark ? "#fff" : "#1c204b" }}>
          Subject Marks
        </Typography>

        <Box
          sx={{
            background: "rgba(34,197,94,0.12)",
            px: 1,
            borderRadius: 2,
            display: "flex",
            alignItems: "center",
            gap: 0.5
          }}
        >
          <TrendingUpIcon sx={{ fontSize: 14, color: "#22c55e" }} />
          <Typography fontSize={12} fontWeight={600} color="#22c55e">
            {data?.trend || "Stable"}
          </Typography>
        </Box>
      </Box>

      <Typography
        variant="caption"
        textAlign="center"
        color={isDark ? "rgba(255,255,255,.7)" : "rgba(28,32,75,.7)"}
      >
        Academic Performance
      </Typography>

      <div className="w-full h-[280px] sm:h-[300px] md:h-[320px] lg:h-[360px] min-h-[260px] relative">
        {isTablet ? (
          <MuiPieChart
            series={[
              {
                data: muiData,
                innerRadius: 70,
                outerRadius: 100,
                paddingAngle: 4,
                cornerRadius: 6,
                highlightScope: { faded: 'global', highlighted: 'item' },
              },
            ]}
            margin={{ top: 10, bottom: 10, left: 10, right: 10 }}
            slotProps={{
              legend: { hidden: true },
            }}
            tooltip={{ trigger: 'item' }}
          />
        ) : (
          <ResponsiveContainer width="100%" height="100%">
            <PieChart>
              <Pie
                data={chartData}
                dataKey="marks"
                nameKey="subject"
                innerRadius={70}
                outerRadius={100}
                paddingAngle={4}
                stroke="none"
              >
                {chartData.map((entry) => (
                  <Cell key={entry.subject} fill={entry.color} />
                ))}
              </Pie>
              <Tooltip />
            </PieChart>
          </ResponsiveContainer>
        )}

        {/* CENTER LABEL */}
        <div className="absolute inset-0 flex flex-col items-center justify-center pointer-events-none">
          <span style={{ fontSize: "18px", color: isDark ? "#fff" : "#1c204b", fontWeight: 700 }}>
            {total}
          </span>
          <span style={{ fontSize: "12px", color: isDark ? "#cbd5e1" : "#64748b" }}>
            Total Marks
          </span>
        </div>
      </div>

      {/* LEGEND */}
      <Box sx={{ mt: 1, display: "grid", gridTemplateColumns: "repeat(2,1fr)", gap: 0.5 }}>
        {chartData.map((c) => (
          <Box
            key={c.subject}
            sx={{
              display: "flex",
              alignItems: "center",
              gap: 1,
              fontSize: 12,
              color: isDark ? "#fff" : "#1c204b"
            }}
          >
            <Box sx={{ width: 10, height: 10, borderRadius: "50%", background: c.color }} />
            {c.subject}
          </Box>
        ))}
      </Box>
    </Card>
  );
}
