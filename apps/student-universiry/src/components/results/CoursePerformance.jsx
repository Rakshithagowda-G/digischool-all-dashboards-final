import { useState, useEffect } from "react";
import PropTypes from "prop-types";
import Card from "@mui/material/Card";
import Accordion from "@mui/material/Accordion";
import AccordionSummary from "@mui/material/AccordionSummary";
import AccordionDetails from "@mui/material/AccordionDetails";
import LinearProgress from "@mui/material/LinearProgress";
import IconButton from "@mui/material/IconButton";
import Typography from "@mui/material/Typography";
import Box from "@mui/material/Box";
import Chip from "@mui/material/Chip";
import { useTheme } from "@mui/material/styles";
import CheckCircleIcon from "@mui/icons-material/CheckCircle";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";
import DownloadIcon from "@mui/icons-material/Download";
import { AlertCircle } from "lucide-react";
import html2canvas from "html2canvas";
import jsPDF from "jspdf";

const getProgressColor = (marks, maxMarks) => {
  const percentage = (marks / maxMarks) * 100;
  if (percentage >= 80) return "#10b981";
  if (percentage >= 60) return "#3b82f6";
  return "#f59e0b";
};

function CoursePerformance({ initialData = [], examName = "Latest Examination Results" }) {
  const theme = useTheme();
  const isDarkMode = theme.palette.mode === 'dark';

  const [testsData, setTestsData] = useState([]);
  const [expanded, setExpanded] = useState({
    latest: true
  });

  useEffect(() => {
    if (initialData && initialData.length > 0) {
      setTestsData([{
        id: "latest",
        title: examName,
        testData: initialData.map(s => ({
          subject: s.subject,
          maxMarks: s.maxMarks,
          minMarks: s.minMarks,
          result: s.marksObtained,
          status: s.result === "PASS" ? "Pass" : "Fail"
        })),
        rank: "-" // Rank is usually in overview, not per subject
      }]);
    } else {
      setTestsData([]);
    }
  }, [initialData, examName]);

  const downloadResult = async () => {
    const element = document.getElementById("coursePerformance");
    if (!element) return;

    const canvas = await html2canvas(element, {
      scale: 2,
      useCORS: true,
      backgroundColor: isDarkMode ? "#11142d" : "#ffffff",
    });
    const imgData = canvas.toDataURL("image/png");
    const pdf = new jsPDF("p", "mm", "a4");
    const pdfWidth = pdf.internal.pageSize.getWidth();
    const pdfHeight = pdf.internal.pageSize.getHeight();
    const ratio = Math.min(pdfWidth / canvas.width, pdfHeight / canvas.height);
    const imgX = (pdfWidth - canvas.width * ratio) / 2;
    pdf.addImage(imgData, "PNG", imgX, 10, canvas.width * ratio, canvas.height * ratio);
    pdf.save("course-performance-result.pdf");
  };

  const handleChange = (panel) => (_, isExpanded) =>
    setExpanded((prev) => ({
      ...prev,
      [panel]: isExpanded,
    }));

  const renderTestCard = (test) => {
    const totalMarks = test.testData.reduce((sum, item) => sum + item.maxMarks, 0);
    const marksObtained = test.testData.reduce((sum, item) => sum + item.result, 0);
    const percentage = totalMarks > 0 ? ((marksObtained / totalMarks) * 100).toFixed(2) : 0;

    return (
      <Card
        sx={{
          borderRadius: "24px",
          background: isDarkMode
            ? "linear-gradient(135deg, #1e1b4b 0%, #312e81 50%, #1e1b4b 100%)"
            : "#ffffff",
          color: isDarkMode ? "#fff" : "#1c204b",
          border: isDarkMode ? "1px solid rgba(255,255,255,0.1)" : "1px solid rgba(0,0,0,0.1)",
          boxShadow: isDarkMode
            ? "0 15px 40px rgba(0,0,0,0.45)"
            : "0 15px 40px rgba(0,0,0,0.1)",
          overflow: { xs: "visible", lg: "hidden", xl: "hidden" },
          fontFamily: "Poppins, sans-serif",
        }}
      >
        <Box
          sx={{
            background: isDarkMode
              ? "linear-gradient(90deg, #4338ca 0%, #5b21b6 100%)"
              : "linear-gradient(90deg, #6366f1 0%, #8b5cf6 100%)",
            padding: { xs: "16px 24px", lg: "12px 16px", xl: "16px 24px" },
            display: "flex",
            alignItems: "center",
            justifyContent: "space-between",
            gap: 1.5,
          }}
        >
          <Box display="flex" alignItems="center" gap={1.5}>
            <CheckCircleIcon sx={{ color: "#fff" }} />
            <Typography sx={{ fontWeight: 600, color: "#fff", fontFamily: "Poppins, sans-serif" }}>{test.title}</Typography>
          </Box>
          <IconButton
            onClick={downloadResult}
            sx={{ color: "#fff", "&:hover": { background: "rgba(255,255,255,0.15)" } }}
          >
            <DownloadIcon />
          </IconButton>
        </Box>

        <Box>
          <Box
            display="flex"
            py={{ xs: 2, lg: 1.5, xl: 2 }}
            px={{ xs: 3, lg: 2, xl: 3 }}
            sx={{
              background: isDarkMode ? "rgba(255,255,255,0.07)" : "rgba(99, 102, 241, 0.05)",
              borderBottom: isDarkMode ? "1px solid rgba(255,255,255,0.1)" : "1px solid rgba(99, 102, 241, 0.1)",
              flexWrap: { xs: "nowrap", lg: "nowrap", xl: "nowrap" },
              overflowX: { xs: "auto", lg: "visible", xl: "visible" }
            }}
          >
            {["Subject", "Max Marks", "Min Marks", "Marks Obtained", "Result"].map((header) => (
              <Box key={header} width={{ xs: "20%", lg: "18%", xl: "20%" }} textAlign={header === "Subject" ? "left" : "center"} sx={{ flexShrink: 0 }}>
                <Typography
                  variant="caption"
                  sx={{
                    color: isDarkMode ? "rgba(255,255,255,0.8)" : "rgba(28,32,75,0.8)",
                    letterSpacing: { xs: 1, lg: 0.5, xl: 1 },
                    textTransform: "uppercase",
                    fontFamily: "Poppins, sans-serif",
                    fontSize: { xs: "0.75rem", lg: "0.7rem", xl: "0.75rem" }
                  }}
                >
                  {header}
                </Typography>
              </Box>
            ))}
          </Box>

          {test.testData.map((item, index) => {
            const progressPercentage = item.maxMarks > 0 ? (item.result / item.maxMarks) * 100 : 0;
            return (
              <Box
                key={item.subject}
                display="flex"
                alignItems="center"
                py={{ xs: 2, lg: 1.5, xl: 2 }}
                px={{ xs: 3, lg: 2, xl: 3 }}
                sx={{
                  background: isDarkMode
                    ? (index % 2 === 0 ? "rgba(255,255,255,0.04)" : "rgba(255,255,255,0.07)")
                    : (index % 2 === 0 ? "rgba(99, 102, 241, 0.02)" : "rgba(99, 102, 241, 0.05)"),
                  borderBottom:
                    index < test.testData.length - 1
                      ? (isDarkMode ? "1px solid rgba(255,255,255,0.08)" : "1px solid rgba(99, 102, 241, 0.1)")
                      : "none",
                  flexWrap: { xs: "nowrap", lg: "nowrap", xl: "nowrap" },
                  overflowX: { xs: "auto", lg: "visible", xl: "visible" }
                }}
              >
                <Box width={{ xs: "20%", lg: "18%", xl: "20%" }} sx={{ flexShrink: 0 }}>
                  <Typography sx={{ color: isDarkMode ? "#fff" : "#1c204b", fontWeight: 600, fontFamily: "Poppins, sans-serif", fontSize: { lg: "0.875rem", xl: "1rem" } }}>{item.subject}</Typography>
                </Box>
                <Box width={{ xs: "20%", lg: "18%", xl: "20%" }} textAlign="center" sx={{ flexShrink: 0 }}>
                  <Typography sx={{ color: isDarkMode ? "rgba(255,255,255,0.85)" : "rgba(28,32,75,0.85)", fontFamily: "Poppins, sans-serif", fontSize: { lg: "0.875rem", xl: "1rem" } }}>{item.maxMarks}</Typography>
                </Box>
                <Box width={{ xs: "20%", lg: "18%", xl: "20%" }} textAlign="center" sx={{ flexShrink: 0 }}>
                  <Typography sx={{ color: isDarkMode ? "rgba(255,255,255,0.85)" : "rgba(28,32,75,0.85)", fontFamily: "Poppins, sans-serif", fontSize: { lg: "0.875rem", xl: "1rem" } }}>{item.minMarks}</Typography>
                </Box>
                <Box width={{ xs: "20%", lg: "18%", xl: "20%" }} sx={{ flexShrink: 0 }}>
                  <Typography sx={{ color: isDarkMode ? "#fff" : "#1c204b", fontWeight: 600, textAlign: "center", fontFamily: "Poppins, sans-serif", fontSize: { lg: "0.875rem", xl: "1rem" } }}>
                    {item.result}
                  </Typography>
                  <LinearProgress
                    variant="determinate"
                    value={Math.min(progressPercentage, 100)}
                    sx={{
                      height: { xs: 4, lg: 3, xl: 4 },
                      borderRadius: 2,
                      backgroundColor: isDarkMode ? "rgba(255,255,255,0.2)" : "rgba(99, 102, 241, 0.2)",
                      "& .MuiLinearProgress-bar": {
                        background: getProgressColor(item.result, item.maxMarks),
                      },
                    }}
                  />
                </Box>
                <Box width={{ xs: "20%", lg: "18%", xl: "20%" }} textAlign="center" sx={{ flexShrink: 0 }}>
                  <Chip
                    label={item.status}
                    size="small"
                    sx={{
                      background: item.status === "Pass" ? "rgba(34,197,94,0.15)" : "rgba(239,68,68,0.15)",
                      color: item.status === "Pass" ? "#22c55e" : "#ef4444",
                      fontWeight: 600,
                      fontFamily: "Poppins, sans-serif",
                      fontSize: { lg: "0.7rem", xl: "0.75rem" },
                      height: { lg: 24, xl: 28 }
                    }}
                  />
                </Box>
              </Box>
            );
          })}

          <Box
            sx={{
              background: isDarkMode
                ? "linear-gradient(90deg, #0f172a 0%, #1e293b 100%)"
                : "rgba(99, 102, 241, 0.05)",
              padding: "16px 24px",
              display: "flex",
              flexWrap: "wrap",
              gap: 3,
            }}
          >
            <Box>
              <Typography variant="caption" sx={{ color: isDarkMode ? "rgba(255,255,255,0.7)" : "rgba(28,32,75,0.7)", fontFamily: "Poppins, sans-serif" }}>
                Total Max
              </Typography>
              <Typography sx={{ color: isDarkMode ? "#fff" : "#1c204b", fontWeight: 700, fontFamily: "Poppins, sans-serif" }}>{totalMarks}</Typography>
            </Box>
            <Box>
              <Typography variant="caption" sx={{ color: isDarkMode ? "rgba(255,255,255,0.7)" : "rgba(28,32,75,0.7)", fontFamily: "Poppins, sans-serif" }}>
                Marks Obtained
              </Typography>
              <Typography sx={{ color: isDarkMode ? "#fff" : "#1c204b", fontWeight: 700, fontFamily: "Poppins, sans-serif" }}>{marksObtained}</Typography>
            </Box>
            <Box>
              <Typography variant="caption" sx={{ color: isDarkMode ? "rgba(255,255,255,0.7)" : "rgba(28,32,75,0.7)", fontFamily: "Poppins, sans-serif" }}>
                Percentage
              </Typography>
              <Typography sx={{ color: isDarkMode ? "#fff" : "#1c204b", fontWeight: 700, fontFamily: "Poppins, sans-serif" }}>{percentage}%</Typography>
            </Box>
          </Box>
        </Box>
      </Card>
    );
  };

  if (testsData.length === 0) {
    return (
      <Box
        sx={{
          p: 6,
          textAlign: "center",
          background: isDarkMode ? "rgba(255,255,255,0.05)" : "#fff",
          borderRadius: "24px",
          border: isDarkMode ? "1px dashed rgba(255,255,255,0.2)" : "1px dashed rgba(0,0,0,0.1)",
          display: "flex",
          flexDirection: "column",
          alignItems: "center"
        }}
      >
        <AlertCircle size={48} color={isDarkMode ? "#94a3b8" : "#cbd5e1"} style={{ marginBottom: 16 }} />
        <Typography sx={{ color: isDarkMode ? "#94a3b8" : "#64748b", fontWeight: 500 }}>
          No result data available
        </Typography>
      </Box>
    );
  }

  return (
    <Box id="coursePerformance" sx={{ fontFamily: "Poppins, sans-serif" }}>
      {testsData.map((test) => {
        const totalMarks = test.testData.reduce((sum, item) => sum + item.maxMarks, 0);
        const marksObtained = test.testData.reduce((sum, item) => sum + item.result, 0);

        return (
          <Accordion
            key={test.id}
            expanded={expanded[test.id]}
            onChange={handleChange(test.id)}
            sx={{
              borderRadius: "24px",
              background: "transparent",
              mb: 3,
              boxShadow: "none",
              "&:before": { display: "none" },
            }}
          >
            <AccordionSummary
              expandIcon={<ExpandMoreIcon sx={{ color: isDarkMode ? "#fff" : "#1c204b" }} />}
              sx={{
                borderRadius: "24px",
                background: isDarkMode
                  ? "linear-gradient(135deg, #1e1b4b 0%, #312e81 100%)"
                  : "#ffffff",
                border: isDarkMode
                  ? "1px solid rgba(255,255,255,0.15)"
                  : "1px solid rgba(0,0,0,0.1)",
                color: isDarkMode ? "#fff" : "#1c204b",
                "& .MuiAccordionSummary-content": { alignItems: "center", gap: 2 },
                fontFamily: "Poppins, sans-serif",
              }}
            >
              <Box display="flex" alignItems="center" gap={2} flex={1}>
                <CheckCircleIcon sx={{ color: isDarkMode ? "#fff" : "#1c204b" }} />
                <Typography sx={{ fontWeight: 600, color: isDarkMode ? "#fff" : "#1c204b", fontFamily: "Poppins, sans-serif" }}>{test.title}</Typography>
              </Box>
              <Typography sx={{ fontWeight: 600, color: isDarkMode ? "#fff" : "#1c204b", fontFamily: "Poppins, sans-serif" }}>
                {marksObtained} / {totalMarks}
              </Typography>
            </AccordionSummary>
            <AccordionDetails sx={{ padding: 0, pt: 2 }}>{renderTestCard(test)}</AccordionDetails>
          </Accordion>
        );
      })}
    </Box>
  );
}

CoursePerformance.propTypes = {
  initialData: PropTypes.array,
  examName: PropTypes.string,
};

export default CoursePerformance;

