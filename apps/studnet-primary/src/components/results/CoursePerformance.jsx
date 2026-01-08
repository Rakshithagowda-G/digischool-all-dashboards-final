import React, { useState } from "react";
import Card from "@mui/material/Card";
import Accordion from "@mui/material/Accordion";
import AccordionSummary from "@mui/material/AccordionSummary";
import AccordionDetails from "@mui/material/AccordionDetails";
import LinearProgress from "@mui/material/LinearProgress";
import IconButton from "@mui/material/IconButton";
import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import CheckCircleIcon from "@mui/icons-material/CheckCircle";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";
import DownloadIcon from "@mui/icons-material/Download";
import Chip from "@mui/material/Chip";
import html2canvas from "html2canvas";
import jsPDF from "jspdf";

const testsData = [
  {
    id: "test1",
    title: "Monthly Test (May)",
    month: "May",
    testData: [
      { subject: "English", maxMarks: 150, minMarks: 100, marksObtained: 35, result: 65, status: "Pass" },
      { subject: "Mathematics", maxMarks: 214, minMarks: 100, marksObtained: 35, result: 73, status: "Pass" },
      { subject: "Physics", maxMarks: 120, minMarks: 100, marksObtained: 35, result: 55, status: "Pass" },
      { subject: "Chemistry", maxMarks: 110, minMarks: 100, marksObtained: 35, result: 90, status: "Pass" },
      { subject: "Spanish", maxMarks: 140, minMarks: 100, marksObtained: 35, result: 88, status: "Pass" },
    ],
    rank: 30,
  },
  {
    id: "test2",
    title: "Monthly Test (June)",
    month: "June",
    testData: [
      { subject: "English", maxMarks: 150, minMarks: 100, marksObtained: 35, result: 72, status: "Pass" },
      { subject: "Mathematics", maxMarks: 214, minMarks: 100, marksObtained: 35, result: 85, status: "Pass" },
      { subject: "Physics", maxMarks: 120, minMarks: 100, marksObtained: 35, result: 68, status: "Pass" },
      { subject: "Chemistry", maxMarks: 110, minMarks: 100, marksObtained: 35, result: 92, status: "Pass" },
      { subject: "Spanish", maxMarks: 140, minMarks: 100, marksObtained: 35, result: 80, status: "Pass" },
    ],
    rank: 25,
  },
  {
    id: "test3",
    title: "Monthly Test (July)",
    month: "July",
    testData: [
      { subject: "English", maxMarks: 150, minMarks: 100, marksObtained: 35, result: 78, status: "Pass" },
      { subject: "Mathematics", maxMarks: 214, minMarks: 100, marksObtained: 35, result: 88, status: "Pass" },
      { subject: "Physics", maxMarks: 120, minMarks: 100, marksObtained: 35, result: 70, status: "Pass" },
      { subject: "Chemistry", maxMarks: 110, minMarks: 100, marksObtained: 35, result: 95, status: "Pass" },
      { subject: "Spanish", maxMarks: 140, minMarks: 100, marksObtained: 35, result: 82, status: "Pass" },
    ],
    rank: 20,
  },
];

function CoursePerformance() {
  const [expanded, setExpanded] = useState({
    test1: true,
    test2: true,
    test3: true,
  });

  const handleChange = (panel) => (event, isExpanded) => {
    setExpanded((prev) => ({
      ...prev,
      [panel]: isExpanded,
    }));
  };

  const downloadResult = async () => {
    const element = document.getElementById("resultSection");
    if (!element) {
      console.error("Result section not found");
      return;
    }

    try {
      const canvas = await html2canvas(element, {
        scale: 2,
        useCORS: true,
        logging: false,
        backgroundColor: "#1e1b4b",
      });

      const imgData = canvas.toDataURL("image/png");
      const pdf = new jsPDF("p", "mm", "a4");
      const pdfWidth = pdf.internal.pageSize.getWidth();
      const pdfHeight = pdf.internal.pageSize.getHeight();
      const imgWidth = canvas.width;
      const imgHeight = canvas.height;
      const ratio = Math.min(pdfWidth / imgWidth, pdfHeight / imgHeight);
      const imgX = (pdfWidth - imgWidth * ratio) / 2;
      const imgY = 10;

      pdf.addImage(imgData, "PNG", imgX, imgY, imgWidth * ratio, imgHeight * ratio);
      pdf.save("course-performance-result.pdf");
    } catch (error) {
      console.error("Error generating PDF:", error);
      alert("Failed to generate PDF. Please try again.");
    }
  };

  const getProgressColor = (marks, maxMarks) => {
    const percentage = (marks / maxMarks) * 100;
    if (percentage >= 80) return "#10b981";
    if (percentage >= 60) return "#3b82f6";
    return "#f59e0b";
  };

  const renderTestCard = (test) => {
    const totalMarks = test.testData.reduce((sum, item) => sum + item.maxMarks, 0);
    const marksObtained = test.testData.reduce((sum, item) => sum + item.result, 0);
    const percentage = ((marksObtained / totalMarks) * 100).toFixed(2);

    return (
      <Card
        sx={{
          borderRadius: "24px",
          background: "linear-gradient(135deg, #1e1b4b 0%, #312e81 50%, #1e1b4b 100%)",
          backdropFilter: "blur(16px)",
          boxShadow: "0 8px 32px rgba(0, 0, 0, 0.3)",
          border: "1px solid rgba(255, 255, 255, 0.1)",
          overflow: "hidden",
          position: "relative",
          fontFamily: '"Poppins", sans-serif',
        }}
      >
        <Box
          sx={{
            background: "linear-gradient(90deg, #4338ca 0%, #5b21b6 100%)",
            padding: "16px 24px",
            display: "flex",
            alignItems: "center",
            justifyContent: "space-between",
            gap: 1.5,
            boxShadow: "0 4px 20px rgba(67, 56, 202, 0.4)",
            position: "relative",
            zIndex: 1,
          }}
        >
          <Box display="flex" alignItems="center" gap={1.5}>
            <CheckCircleIcon
              sx={{
                color: "#ffffff",
                fontSize: "22px",
              }}
            />
            <Typography
              variant="h6"
              fontWeight="bold"
              sx={{
                fontSize: "16px",
                color: "#ffffff",
                fontFamily: '"Poppins", sans-serif',
              }}
            >
              {test.title}
            </Typography>
          </Box>
          <IconButton
            onClick={downloadResult}
            sx={{
              color: "#ffffff",
              padding: "8px",
              "&:hover": {
                background: "rgba(255, 255, 255, 0.2)",
              },
            }}
          >
            <DownloadIcon />
          </IconButton>
        </Box>

        <Box sx={{ position: "relative", zIndex: 1 }}>
          <Box
            display="flex"
            py={2}
            px={3}
            sx={{
              background: "rgba(255, 255, 255, 0.05)",
              borderBottom: "1px solid rgba(255, 255, 255, 0.1)",
            }}
          >
            <Box width="30%">
              <Typography
                variant="button"
                fontWeight="600"
                sx={{
                  fontSize: "14px",
                  color: "rgba(255, 255, 255, 0.85)",
                  textTransform: "uppercase",
                  letterSpacing: "0.5px",
                  fontFamily: '"Poppins", sans-serif',
                }}
              >
                Subject
              </Typography>
            </Box>
            <Box width="15%" textAlign="center">
              <Typography
                variant="button"
                fontWeight="600"
                sx={{
                  fontSize: "14px",
                  color: "rgba(255, 255, 255, 0.85)",
                  textTransform: "uppercase",
                  letterSpacing: "0.5px",
                  fontFamily: '"Poppins", sans-serif',
                }}
              >
                Max Marks
              </Typography>
            </Box>
            <Box width="15%" textAlign="center">
              <Typography
                variant="button"
                fontWeight="600"
                sx={{
                  fontSize: "14px",
                  color: "rgba(255, 255, 255, 0.85)",
                  textTransform: "uppercase",
                  letterSpacing: "0.5px",
                  fontFamily: '"Poppins", sans-serif',
                }}
              >
                Min Marks
              </Typography>
            </Box>
            <Box width="20%" textAlign="center">
              <Typography
                variant="button"
                fontWeight="600"
                sx={{
                  fontSize: "14px",
                  color: "rgba(255, 255, 255, 0.85)",
                  textTransform: "uppercase",
                  letterSpacing: "0.5px",
                  fontFamily: '"Poppins", sans-serif',
                }}
              >
                Marks Obtained
              </Typography>
            </Box>
            <Box width="20%" textAlign="center">
              <Typography
                variant="button"
                fontWeight="600"
                sx={{
                  fontSize: "14px",
                  color: "rgba(255, 255, 255, 0.85)",
                  textTransform: "uppercase",
                  letterSpacing: "0.5px",
                  fontFamily: '"Poppins", sans-serif',
                }}
              >
                Result
              </Typography>
            </Box>
          </Box>

          {test.testData.map((item, index) => {
            const progressPercentage = (item.result / item.maxMarks) * 100;
            const progressColor = getProgressColor(item.result, item.maxMarks);

            return (
              <Box
                key={index}
                display="flex"
                alignItems="center"
                py={2}
                px={3}
                sx={{
                  background: index % 2 === 0 ? "rgba(255, 255, 255, 0.05)" : "rgba(255, 255, 255, 0.1)",
                  borderBottom: index < test.testData.length - 1 ? "1px solid rgba(255, 255, 255, 0.1)" : "none",
                  transition: "background 0.2s ease",
                  "&:hover": {
                    background: "rgba(255, 255, 255, 0.15)",
                  },
                }}
              >
                <Box width="30%">
                  <Typography
                    variant="body2"
                    fontWeight="600"
                    sx={{
                      fontSize: "14px",
                      color: "rgba(255, 255, 255, 0.85)",
                      fontFamily: '"Poppins", sans-serif',
                    }}
                  >
                    {item.subject}
                  </Typography>
                </Box>
                <Box width="15%" textAlign="center">
                  <Typography
                    variant="body2"
                    sx={{
                      fontSize: "14px",
                      color: "rgba(255, 255, 255, 0.85)",
                      fontFamily: '"Poppins", sans-serif',
                    }}
                  >
                    {item.maxMarks}
                  </Typography>
                </Box>
                <Box width="15%" textAlign="center">
                  <Typography
                    variant="body2"
                    sx={{
                      fontSize: "14px",
                      color: "rgba(255, 255, 255, 0.85)",
                      fontFamily: '"Poppins", sans-serif',
                    }}
                  >
                    {item.minMarks}
                  </Typography>
                </Box>
                <Box width="20%" textAlign="center">
                  <Box>
                    <Typography
                      variant="body2"
                      fontWeight="600"
                      sx={{
                        fontSize: "14px",
                        color: "rgba(255, 255, 255, 0.85)",
                        mb: 0.5,
                        fontFamily: '"Poppins", sans-serif',
                      }}
                    >
                      {item.result}
                    </Typography>
                    <LinearProgress
                      variant="determinate"
                      value={Math.min(progressPercentage, 100)}
                      sx={{
                        height: 4,
                        borderRadius: "2px",
                        backgroundColor: "rgba(255, 255, 255, 0.1)",
                        "& .MuiLinearProgress-bar": {
                          background: "linear-gradient(90deg, #60a5fa 0%, #38bdf8 100%)",
                          borderRadius: "2px",
                        },
                      }}
                    />
                  </Box>
                </Box>
                <Box width="20%" textAlign="center">
                  <Chip
                    label={item.status}
                    size="small"
                    sx={{
                      background:
                        item.status === "Pass"
                          ? "rgba(34, 197, 94, 0.2)"
                          : "rgba(239, 68, 68, 0.2)",
                      color: item.status === "Pass" ? "#22c55e" : "#ef4444",
                      fontSize: "12px",
                      height: "28px",
                      borderRadius: "14px",
                      fontWeight: "600",
                      border: "none",
                      fontFamily: '"Poppins", sans-serif',
                      "& .MuiChip-label": {
                        padding: "0 12px",
                      },
                    }}
                  />
                </Box>
              </Box>
            );
          })}

          <Box
            sx={{
              background: "linear-gradient(90deg, #0f172a 0%, #1e293b 100%)",
              borderRadius: "0 0 24px 24px",
              padding: "16px 24px",
              display: "flex",
              alignItems: "center",
              justifyContent: "space-between",
              flexWrap: "wrap",
              gap: 3,
              mt: 0,
              borderTop: "1px solid rgba(255, 255, 255, 0.1)",
            }}
          >
            <Box display="flex" alignItems="center" gap={1}>
              <Typography
                variant="caption"
                sx={{
                  color: "rgba(255, 255, 255, 0.7)",
                  fontSize: "12px",
                  fontWeight: "500",
                  fontFamily: '"Poppins", sans-serif',
                }}
              >
                Rank:
              </Typography>
              <Typography
                variant="body2"
                fontWeight="bold"
                sx={{
                  color: "#ffffff",
                  fontSize: "15px",
                  fontFamily: '"Poppins", sans-serif',
                }}
              >
                {test.rank}
              </Typography>
            </Box>
            <Box display="flex" alignItems="center" gap={1}>
              <Typography
                variant="caption"
                sx={{
                  color: "rgba(255, 255, 255, 0.7)",
                  fontSize: "12px",
                  fontWeight: "500",
                  fontFamily: '"Poppins", sans-serif',
                }}
              >
                Total:
              </Typography>
              <Typography
                variant="body2"
                fontWeight="bold"
                sx={{
                  color: "#ffffff",
                  fontSize: "15px",
                  fontFamily: '"Poppins", sans-serif',
                }}
              >
                {totalMarks}
              </Typography>
            </Box>
            <Box display="flex" alignItems="center" gap={1}>
              <Typography
                variant="caption"
                sx={{
                  color: "rgba(255, 255, 255, 0.7)",
                  fontSize: "12px",
                  fontWeight: "500",
                  fontFamily: '"Poppins", sans-serif',
                }}
              >
                Marks Obtained:
              </Typography>
              <Typography
                variant="body2"
                fontWeight="bold"
                sx={{
                  color: "#ffffff",
                  fontSize: "15px",
                  fontFamily: '"Poppins", sans-serif',
                }}
              >
                {marksObtained}
              </Typography>
            </Box>
            <Box display="flex" alignItems="center" gap={1}>
              <Typography
                variant="caption"
                sx={{
                  color: "rgba(255, 255, 255, 0.7)",
                  fontSize: "12px",
                  fontWeight: "500",
                  fontFamily: '"Poppins", sans-serif',
                }}
              >
                Percentage:
              </Typography>
              <Typography
                variant="body2"
                fontWeight="bold"
                sx={{
                  color: "#ffffff",
                  fontSize: "15px",
                  fontFamily: '"Poppins", sans-serif',
                }}
              >
                {percentage}%
              </Typography>
            </Box>
            <Box display="flex" alignItems="center" gap={1}>
              <Typography
                variant="caption"
                sx={{
                  color: "rgba(255, 255, 255, 0.7)",
                  fontSize: "12px",
                  fontWeight: "500",
                  fontFamily: '"Poppins", sans-serif',
                }}
              >
                Result:
              </Typography>
              <Chip
                label="Pass"
                size="small"
                sx={{
                  background: "rgba(34, 197, 94, 0.2)",
                  color: "#22c55e",
                  fontSize: "12px",
                  height: "28px",
                  borderRadius: "14px",
                  fontWeight: "600",
                  border: "none",
                  fontFamily: '"Poppins", sans-serif',
                  "& .MuiChip-label": {
                    padding: "0 12px",
                  },
                }}
              />
            </Box>
          </Box>
        </Box>
      </Card>
    );
  };

  return (
    <Box id="resultSection" sx={{ fontFamily: '"Poppins", sans-serif' }}>
      {testsData.map((test) => {
        const totalMarks = test.testData.reduce((sum, item) => sum + item.maxMarks, 0);
        const marksObtained = test.testData.reduce((sum, item) => sum + item.result, 0);

        return (
          <Accordion
            key={test.id}
            expanded={expanded[test.id] === true}
            onChange={handleChange(test.id)}
            sx={{
              borderRadius: "24px",
              border: "none",
              background: "transparent",
              marginBottom: 3,
              overflow: "hidden",
              transition: "all 0.2s ease",
              boxShadow: "none",
              "&:before": {
                display: "none",
              },
              "&.Mui-expanded": {
                margin: 0,
                marginBottom: 3,
              },
              "&:hover": {
                transform: "scale(1.01)",
                boxShadow: "0 12px 40px rgba(0, 0, 0, 0.4)",
              },
            }}
          >
            <AccordionSummary
              expandIcon={
                <ExpandMoreIcon
                  sx={{
                    color: "rgba(255, 255, 255, 0.7)",
                    transition: "transform 0.3s ease",
                    transform: expanded[test.id] ? "rotate(180deg)" : "rotate(0deg)",
                  }}
                />
              }
              sx={{
                padding: "18px 24px",
                minHeight: "auto",
                background: "linear-gradient(135deg, #1e1b4b 0%, #312e81 50%, #1e1b4b 100%)",
                borderRadius: "24px",
                border: "1px solid rgba(255, 255, 255, 0.1)",
                boxShadow: "0 8px 32px rgba(0, 0, 0, 0.3)",
                transition: "all 0.2s ease",
                "&:hover": {
                  boxShadow: "0 12px 40px rgba(0, 0, 0, 0.4)",
                },
                "& .MuiAccordionSummary-content": {
                  margin: 0,
                  alignItems: "center",
                  "&.Mui-expanded": {
                    margin: 0,
                  },
                },
              }}
            >
              <Box display="flex" alignItems="center" gap={2} flex={1}>
                <CheckCircleIcon
                  sx={{
                    color: "#ffffff",
                    fontSize: "22px",
                  }}
                />
                <Typography
                  variant="h6"
                  fontWeight="bold"
                  sx={{
                    fontSize: "16px",
                    color: "#ffffff",
                    fontFamily: '"Poppins", sans-serif',
                  }}
                >
                  {test.title}
                </Typography>
              </Box>
              <Box
                sx={{
                  marginRight: 2,
                }}
              >
                <Typography
                  variant="body2"
                  fontWeight="600"
                  sx={{
                    fontSize: "14px",
                    color: "rgba(255, 255, 255, 0.85)",
                    fontFamily: '"Poppins", sans-serif',
                  }}
                >
                  {marksObtained} / {totalMarks}
                </Typography>
              </Box>
            </AccordionSummary>
            <AccordionDetails
              sx={{
                padding: 0,
                paddingTop: 2,
                background: "transparent",
              }}
            >
              {renderTestCard(test)}
            </AccordionDetails>
          </Accordion>
        );
      })}
    </Box>
  );
}

export default CoursePerformance;
