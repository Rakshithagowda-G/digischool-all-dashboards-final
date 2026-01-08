import { useState } from "react";
import Card from "@mui/material/Card";
import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import { useTheme } from "@mui/material/styles";
import useMediaQuery from "@mui/material/useMediaQuery";
import TrendingUpIcon from "@mui/icons-material/TrendingUp";
import { PieChart } from "@mui/x-charts/PieChart";

const FALLBACK_COLORS = ["#6366f1", "#3b82f6", "#8b5cf6", "#4338ca", "#06b6d4", "#ec4899", "#f59e0b"];

export default function RoundedPieChart({ subjects = [] }) {
  const theme = useTheme();
  const isDark = theme.palette.mode === "dark";

  const isTablet = useMediaQuery("(min-width:1024px) and (max-width:1366px)");
  const isMobile = useMediaQuery("(max-width:768px)");

  const chartData = subjects.map((s, i) => ({
    id: i,
    label: s.subject || s.subjectName || "Subject",
    value: s.marks || s.result || 0,
    color: FALLBACK_COLORS[i % FALLBACK_COLORS.length]
  }));

  const total = chartData.reduce((sum, s) => sum + s.value, 0);

  return (
    <Card
      sx={{
        borderRadius: 4,
        p: 2,
        minHeight: isTablet ? 360 : isMobile ? 400 : 420,
        background: isDark
          ? "linear-gradient(135deg,#141727 0%,#3a416f 100%)"
          : "#fff",
        display: "flex",
        flexDirection: "column",
        gap: 1
      }}
    >
      {/* HEADER */}
      <Box
        display="flex"
        alignItems="center"
        justifyContent="center"
        gap={1}
      >
        <Typography
          fontWeight={600}
          sx={{ color: isDark ? "#fff" : "#1c204b" }}
        >
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
            Academic Performance
          </Typography>
        </Box>
      </Box>

      <Typography
        variant="caption"
        textAlign="center"
        color={isDark ? "rgba(255,255,255,.7)" : "rgba(28,32,75,.7)"}
      >
        Distribution of marks across subjects
      </Typography>

      {/* FIXED HEIGHT BOX */}
      <Box
        sx={{
          width: "100%",
          height: isTablet ? 250 : isMobile ? 280 : 300,
          minHeight: isTablet ? 250 : isMobile ? 280 : 300,
          display: "flex",
          alignItems: "center",
          justifyContent: "center"
        }}
      >
        {chartData.length > 0 ? (
          <PieChart
            series={[
              {
                data: chartData,
                innerRadius: isMobile ? 50 : isTablet ? 60 : 70,
                outerRadius: isMobile ? 80 : isTablet ? 90 : 100,
                paddingAngle: 2,
                cornerRadius: 4,
                cx: "50%",
                cy: "50%",
              },
            ]}
            colors={chartData.map(d => d.color)}
            height={isTablet ? 250 : isMobile ? 280 : 300}
            margin={{ top: 10, right: 10, bottom: 10, left: 10 }}
            slotProps={{
              legend: { hidden: true },
            }}
            sx={{
              "& .MuiChartsLegend-root": {
                display: "none",
              },
            }}
          >
            <text
              x="50%"
              y="45%"
              textAnchor="middle"
              dominantBaseline="central"
              style={{
                fontSize: "18px",
                fill: isDark ? "#fff" : "#1c204b",
                fontWeight: 700
              }}
            >
              {total}
            </text>

            <text
              x="50%"
              y="55%"
              textAnchor="middle"
              dominantBaseline="central"
              style={{
                fontSize: "12px",
                fill: isDark ? "#cbd5e1" : "#64748b"
              }}
            >
              Total Marks
            </text>
          </PieChart>
        ) : (
          <Typography sx={{ color: isDark ? "rgba(255,255,255,0.5)" : "#94A3B8" }}>
            No data available
          </Typography>
        )}
      </Box>

      {/* LEGEND */}
      <Box
        sx={{
          mt: 1,
          display: "grid",
          gridTemplateColumns: "repeat(2,1fr)",
          gap: 0.5,
          maxHeight: 100,
          overflowY: 'auto'
        }}
      >
        {chartData.map((c) => (
          <Box
            key={c.id}
            sx={{
              display: "flex",
              alignItems: "center",
              gap: 1,
              fontSize: 12,
              color: isDark ? "#fff" : "#1c204b"
            }}
          >
            <Box
              sx={{
                width: 10,
                height: 10,
                borderRadius: "50%",
                background: c.color,
                flexShrink: 0
              }}
            />
            {c.label}
          </Box>
        ))}
      </Box>

    </Card>
  );
}
