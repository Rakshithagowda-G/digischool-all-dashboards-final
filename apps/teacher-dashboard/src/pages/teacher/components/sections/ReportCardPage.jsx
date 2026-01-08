import React, { useState } from 'react';
import { Upload, Download, FileText, Eye, X } from 'lucide-react';
import jsPDF from 'jspdf';
import autoTable from 'jspdf-autotable';


const ReportCardPage = () => {
  const [activeTab, setActiveTab] = useState('generate');
  const [uploadedFiles, setUploadedFiles] = useState([]); // Changed to array for multiple files
  const [logoUrl, setLogoUrl] = useState('');
  const [showPreview, setShowPreview] = useState(false);


  const [formData, setFormData] = useState({
    studentId: '',
    studentName: '',
    className: 'Class 9',
    academicYear: '2024-2025',
    universityName: 'MIT International School',
  });


  const [subjects, setSubjects] = useState([
    { id: 1, name: 'Mathematics', maxMarks: 100, minMarks: 35, obtained: 0 },
    { id: 2, name: 'Science', maxMarks: 100, minMarks: 35, obtained: 0 },
    { id: 3, name: 'English', maxMarks: 100, minMarks: 35, obtained: 0 },
    { id: 4, name: 'Social Studies', maxMarks: 100, minMarks: 35, obtained: 0 },
    { id: 5, name: 'Hindi', maxMarks: 100, minMarks: 35, obtained: 0 },
  ]);


  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };


  const handleSubjectChange = (id, field, value) => {
    setSubjects((prev) =>
      prev.map((subject) => {
        if (subject.id === id) {
          if (field === 'name') {
            return { ...subject, name: value };
          }
          const numValue = parseFloat(value) || 0;
          if (field === 'maxMarks') {
            const newObtained = numValue < subject.obtained ? numValue : subject.obtained;
            return { ...subject, maxMarks: numValue, obtained: newObtained };
          }
          if (field === 'minMarks') {
            return { ...subject, minMarks: numValue };
          }
          if (field === 'obtained') {
            const validObtained = numValue > subject.maxMarks ? subject.maxMarks : numValue;
            return { ...subject, obtained: validObtained };
          }
        }
        return subject;
      })
    );
  };


  const addSubject = () => {
    const newId = subjects.length > 0 ? Math.max(...subjects.map((s) => s.id)) + 1 : 1;
    setSubjects((prev) => [
      ...prev,
      { id: newId, name: '', maxMarks: 100, minMarks: 35, obtained: 0 },
    ]);
  };


  const removeSubject = (id) => {
    if (subjects.length > 1) {
      setSubjects((prev) => prev.filter((subject) => subject.id !== id));
    }
  };


  const calculatePercentage = (obtained, maxMarks) => {
    if (maxMarks === 0) return 0;
    return ((obtained / maxMarks) * 100).toFixed(2);
  };


  const calculateGrade = (percentage) => {
    if (percentage >= 90) return 'A+';
    if (percentage >= 80) return 'A';
    if (percentage >= 70) return 'B+';
    if (percentage >= 60) return 'B';
    if (percentage >= 50) return 'C+';
    if (percentage >= 40) return 'C';
    if (percentage >= 35) return 'D';
    return 'F';
  };


  const calculateGPA = () => {
    let totalGradePoints = 0;
    let totalSubjects = subjects.length;


    subjects.forEach((subject) => {
      const percentage = parseFloat(calculatePercentage(subject.obtained, subject.maxMarks));
      let gradePoint = 0;


      if (percentage >= 90) gradePoint = 5.0;
      else if (percentage >= 80) gradePoint = 4.5;
      else if (percentage >= 70) gradePoint = 4.0;
      else if (percentage >= 60) gradePoint = 3.5;
      else if (percentage >= 50) gradePoint = 3.0;
      else if (percentage >= 40) gradePoint = 2.5;
      else if (percentage >= 35) gradePoint = 2.0;
      else gradePoint = 0.0;


      totalGradePoints += gradePoint;
    });


    return totalSubjects > 0 ? (totalGradePoints / totalSubjects).toFixed(2) : 0.0;
  };


  const calculateTotals = () => {
    const totalObtained = subjects.reduce((sum, sub) => sum + sub.obtained, 0);
    const totalMax = subjects.reduce((sum, sub) => sum + sub.maxMarks, 0);
    const percentage = totalMax > 0 ? ((totalObtained / totalMax) * 100).toFixed(2) : 0;


    return { totalObtained, totalMax, percentage };
  };


  const getBase64Image = (url) => {
    return new Promise((resolve, reject) => {
      const img = new Image();
      img.crossOrigin = 'Anonymous';
      img.onload = function () {
        const canvas = document.createElement('canvas');
        canvas.width = this.width;
        canvas.height = this.height;
        const ctx = canvas.getContext('2d');
        ctx.drawImage(this, 0, 0);
        const dataURL = canvas.toDataURL('image/png');
        resolve(dataURL);
      };
      img.onerror = function () {
        reject(new Error('Could not load image'));
      };
      img.src = url;
    });
  };


  const generatePDF = async () => {
    setShowPreview(false);
    if (!formData.studentId || !formData.studentName) {
      alert('Please enter Student ID and Name');
      return;
    }


    const doc = new jsPDF();
    const { totalObtained, totalMax, percentage } = calculateTotals();
    const gpa = calculateGPA();
    const pageWidth = doc.internal.pageSize.getWidth();
    const pageHeight = doc.internal.pageSize.getHeight();


    doc.setFillColor(47, 105, 255);
    doc.rect(0, 0, pageWidth, 4, 'F');
    doc.setFillColor(250, 251, 255);
    doc.rect(0, 4, pageWidth, 42, 'F');


    if (logoUrl) {
      try {
        const logoData = await getBase64Image(logoUrl);
        doc.addImage(logoData, 'PNG', 12, 12, 16, 16);
      } catch {
        doc.setFillColor(47, 105, 255);
        doc.circle(20, 20, 8, 'F');
        doc.setTextColor(255, 255, 255);
        doc.setFontSize(14);
        doc.setFont('helvetica', 'bold');
        doc.text(formData.universityName.substring(0, 1), 20, 23, { align: 'center' });
      }
    } else {
      doc.setFillColor(47, 105, 255);
      doc.circle(20, 20, 8, 'F');
      doc.setTextColor(255, 255, 255);
      doc.setFontSize(14);
      doc.setFont('helvetica', 'bold');
      doc.text(formData.universityName.substring(0, 1), 20, 23, { align: 'center' });
    }


    doc.setTextColor(30, 41, 59);
    doc.setFontSize(18);
    doc.setFont('helvetica', 'bold');
    doc.text(formData.universityName.toUpperCase(), 33, 18);


    doc.setFontSize(9);
    doc.setFont('helvetica', 'normal');
    doc.setTextColor(71, 85, 105);
    doc.text('NAAC A+ Accredited', 33, 24);
    doc.text('Phone: 0821 2343887 | Email: mit@school.edu', 33, 29);


    doc.setFontSize(16);
    doc.setFont('helvetica', 'bold');
    doc.setTextColor(47, 105, 255);
    doc.text('REPORT CARD', pageWidth / 2, 39, { align: 'center' });


    doc.setDrawColor(226, 232, 240);
    doc.setLineWidth(0.5);
    doc.line(0, 46, pageWidth, 46);


    doc.setFillColor(241, 245, 249);
    doc.rect(0, 46, pageWidth, 10, 'F');


    doc.setFontSize(8);
    doc.setFont('helvetica', 'normal');
    doc.setTextColor(51, 65, 85);
    doc.text(`Document ID: RC-${formData.studentId}-${Date.now()}`, 15, 52);
    doc.text(`Academic Year: ${formData.academicYear}`, pageWidth / 2, 52, { align: 'center' });
    doc.text(`Issue Date: ${new Date().toLocaleDateString('en-US')}`, pageWidth - 15, 52, { align: 'right' });


    doc.setFontSize(11);
    doc.setFont('helvetica', 'bold');
    doc.setTextColor(30, 41, 59);
    doc.text('STUDENT INFORMATION', 15, 64);


    doc.setDrawColor(226, 232, 240);
    doc.setLineWidth(0.3);
    doc.rect(15, 67, pageWidth - 30, 28);


    doc.line(15, 74, pageWidth - 15, 74);
    doc.line(15, 81, pageWidth - 15, 81);
    doc.line(15, 88, pageWidth - 15, 88);
    doc.line(pageWidth / 2, 67, pageWidth / 2, 95);


    doc.setFontSize(8);
    doc.setFont('helvetica', 'bold');
    doc.setTextColor(71, 85, 105);


    doc.text('Student Name', 18, 71);
    doc.text('Student ID', 18, 78);
    doc.text('Grade Level', 18, 85);
    doc.text('Program', 18, 92);


    doc.text('Date of Birth', pageWidth / 2 + 3, 71);
    doc.text('Enrollment Status', pageWidth / 2 + 3, 78);
    doc.text('Academic Advisor', pageWidth / 2 + 3, 85);
    doc.text('Graduation Date', pageWidth / 2 + 3, 92);


    doc.setFont('helvetica', 'normal');
    doc.setTextColor(30, 41, 59);


    doc.text(formData.studentName, 50, 71);
    doc.text(formData.studentId, 50, 78);
    doc.text(formData.className, 50, 85);
    doc.text('Regular Academic Program', 50, 92);


    doc.text('01/01/2008', pageWidth / 2 + 35, 71);
    doc.text('Active - Full Time', pageWidth / 2 + 35, 78);
    doc.text('Academic Office', pageWidth / 2 + 35, 85);
    doc.text('Expected: June 2026', pageWidth / 2 + 35, 92);


    doc.setFontSize(11);
    doc.setFont('helvetica', 'bold');
    doc.setTextColor(30, 41, 59);
    doc.text('ACADEMIC PERFORMANCE RECORD', 15, 106);


    const perfStatus = percentage >= 90 ? 'EXCELLENT' : percentage >= 80 ? 'VERY GOOD' : percentage >= 70 ? 'GOOD' : percentage >= 60 ? 'SATISFACTORY' : 'NEEDS IMPROVEMENT';
    const perfColor = percentage >= 90 ? [34, 197, 94] : percentage >= 80 ? [59, 130, 246] : percentage >= 70 ? [139, 92, 246] : percentage >= 60 ? [251, 146, 60] : [239, 68, 68];


    doc.setFillColor(...perfColor);
    doc.roundedRect(pageWidth - 65, 100, 50, 8, 2, 2, 'F');
    doc.setFontSize(8);
    doc.setFont('helvetica', 'bold');
    doc.setTextColor(255, 255, 255);
    doc.text(perfStatus, pageWidth - 40, 105, { align: 'center' });


    const tableData = subjects.map((subject, index) => {
      const perc = parseFloat(calculatePercentage(subject.obtained, subject.maxMarks));
      const grade = calculateGrade(perc);


      let descriptor = '';
      if (perc >= 90) descriptor = 'Outstanding';
      else if (perc >= 80) descriptor = 'Excellent';
      else if (perc >= 70) descriptor = 'Proficient';
      else if (perc >= 60) descriptor = 'Satisfactory';
      else if (perc >= 40) descriptor = 'Developing';
      else descriptor = 'Needs Support';


      return [
        (index + 1).toString(),
        subject.name,
        subject.maxMarks.toString(),
        subject.obtained.toString(),
        perc.toFixed(1) + '%',
        grade,
        descriptor,
      ];
    });


    autoTable(doc, {
      startY: 112,
      head: [['#', 'Subject/Course', 'Max', 'Score', 'Percent', 'Grade', 'Performance Level']],
      body: tableData,
      theme: 'grid',
      headStyles: {
        fillColor: [51, 65, 85],
        textColor: [255, 255, 255],
        fontStyle: 'bold',
        fontSize: 9,
        halign: 'center',
        cellPadding: 3,
        lineWidth: 0.1,
        lineColor: [148, 163, 184],
      },
      bodyStyles: {
        fontSize: 9,
        cellPadding: 2.5,
        lineWidth: 0.1,
        lineColor: [226, 232, 240],
        textColor: [30, 41, 59],
      },
      alternateRowStyles: {
        fillColor: [248, 250, 252],
      },
      columnStyles: {
        0: { cellWidth: 10, halign: 'center', fontStyle: 'bold', fillColor: [241, 245, 249] },
        1: { cellWidth: 55, halign: 'left', fontStyle: 'bold' },
        2: { cellWidth: 18, halign: 'center', fillColor: [248, 250, 252] },
        3: { cellWidth: 18, halign: 'center', fontStyle: 'bold', textColor: [47, 105, 255] },
        4: { cellWidth: 22, halign: 'center', fontStyle: 'bold' },
        5: { cellWidth: 18, halign: 'center', fontStyle: 'bold', fontSize: 10 },
        6: { cellWidth: 38, halign: 'center', fontSize: 8, textColor: [71, 85, 105] },
      },
      margin: { left: 15, right: 15 },
      didParseCell: function (data) {
        if (data.column.index === 5 && data.section === 'body') {
          const grade = data.cell.text[0];
          if (grade === 'A+' || grade === 'A') {
            data.cell.styles.textColor = [34, 197, 94];
          } else if (grade === 'B+' || grade === 'B') {
            data.cell.styles.textColor = [59, 130, 246];
          } else if (grade === 'C+' || grade === 'C') {
            data.cell.styles.textColor = [251, 146, 60];
          } else if (grade === 'D') {
            data.cell.styles.textColor = [156, 163, 175];
          } else {
            data.cell.styles.textColor = [239, 68, 68];
          }
        }
      },
    });


    const summaryY = doc.lastAutoTable.finalY + 10;


    doc.setFontSize(11);
    doc.setFont('helvetica', 'bold');
    doc.setTextColor(30, 41, 59);
    doc.text('ACADEMIC SUMMARY', 15, summaryY);


    doc.setDrawColor(226, 232, 240);
    doc.setLineWidth(0.3);
    doc.rect(15, summaryY + 3, pageWidth - 30, 28);


    const col1 = 15 + (pageWidth - 30) / 4;
    const col2 = 15 + (pageWidth - 30) / 2;
    const col3 = 15 + (3 * (pageWidth - 30)) / 4;


    doc.line(col1, summaryY + 3, col1, summaryY + 31);
    doc.line(col2, summaryY + 3, col2, summaryY + 31);
    doc.line(col3, summaryY + 3, col3, summaryY + 31);


    doc.setFontSize(8);
    doc.setFont('helvetica', 'normal');
    doc.setTextColor(71, 85, 105);


    doc.text('Total Credits', (15 + col1) / 2, summaryY + 10, { align: 'center' });
    doc.text('Attempted', (15 + col1) / 2, summaryY + 14, { align: 'center' });
    doc.text('Total Credits', (col1 + col2) / 2, summaryY + 10, { align: 'center' });
    doc.text('Earned', (col1 + col2) / 2, summaryY + 14, { align: 'center' });
    doc.text('Overall', (col2 + col3) / 2, summaryY + 10, { align: 'center' });
    doc.text('Percentage', (col2 + col3) / 2, summaryY + 14, { align: 'center' });
    doc.text('Grade Point', (col3 + pageWidth - 15) / 2, summaryY + 10, { align: 'center' });
    doc.text('Average (GPA)', (col3 + pageWidth - 15) / 2, summaryY + 14, { align: 'center' });


    doc.setFontSize(16);
    doc.setFont('helvetica', 'bold');
    doc.setTextColor(30, 41, 59);


    doc.text(totalMax.toString(), (15 + col1) / 2, summaryY + 23, { align: 'center' });
    doc.text(totalObtained.toString(), (col1 + col2) / 2, summaryY + 23, { align: 'center' });


    doc.setTextColor(47, 105, 255);
    doc.text(percentage + '%', (col2 + col3) / 2, summaryY + 23, { align: 'center' });


    doc.setTextColor(34, 197, 94);
    doc.text(gpa, (col3 + pageWidth - 15) / 2, summaryY + 23, { align: 'center' });


    const gradeY = summaryY + 38;


    doc.setFontSize(10);
    doc.setFont('helvetica', 'bold');
    doc.setTextColor(30, 41, 59);
    doc.text('GRADING SCALE & PERFORMANCE STANDARDS', 15, gradeY);


    doc.setDrawColor(226, 232, 240);
    doc.setLineWidth(0.3);
    doc.roundedRect(15, gradeY + 3, pageWidth - 30, 18, 2, 2);


    doc.setTextColor(47, 105, 255);
    doc.setFontSize(9);
    doc.setFont('helvetica', 'bold');
    doc.text('GRADING SCALE', 20, gradeY + 7);


    doc.setFont('helvetica', 'normal');
    doc.setFontSize(7.5);


    const gradeColors = [
      [34, 197, 94],
      [59, 130, 246],
      [139, 92, 246],
      [236, 72, 153],
      [251, 146, 60],
      [234, 179, 8],
      [156, 163, 175],
      [239, 68, 68],
    ];


    const grades = ['A+', 'A', 'B+', 'B', 'C+', 'C', 'D', 'F'];
    const gradeRanges = ['90-100', '80-89', '70-79', '60-69', '50-59', '40-49', '35-39', '<35'];


    let gradeX = 20;
    grades.forEach((grade, index) => {
      doc.setFillColor(...gradeColors[index]);
      doc.roundedRect(gradeX, gradeY + 11, 5, 5, 0.8, 0.8, 'F');


      doc.setTextColor(30, 30, 30);
      doc.setFont('helvetica', 'bold');
      doc.text(grade, gradeX + 7, gradeY + 14);


      doc.setFont('helvetica', 'normal');
      doc.setFontSize(6.5);
      doc.text(gradeRanges[index], gradeX + 7, gradeY + 18);


      doc.setFontSize(7.5);
      gradeX += 22;
    });


    const remarkY = gradeY + 26;


    doc.setFontSize(10);
    doc.setFont('helvetica', 'bold');
    doc.setTextColor(30, 41, 59);
    doc.text('REMARKS & RECOMMENDATIONS', 15, remarkY);


    doc.setDrawColor(226, 232, 240);
    doc.setLineWidth(0.3);
    doc.rect(15, remarkY + 3, pageWidth - 30, 15);


    doc.setFontSize(8);
    doc.setFont('helvetica', 'italic');
    doc.setTextColor(71, 85, 105);


    let remark = '';
    if (percentage >= 90) {
      remark = 'Outstanding academic achievement. Student demonstrates exceptional mastery of all subjects.';
    } else if (percentage >= 80) {
      remark = 'Excellent performance. Student shows strong understanding and consistent high achievement.';
    } else if (percentage >= 70) {
      remark = 'Good academic progress. Student meets all learning standards with solid performance.';
    } else if (percentage >= 60) {
      remark = 'Satisfactory achievement. Continued effort recommended to strengthen understanding.';
    } else {
      remark = 'Additional support recommended. Student would benefit from focused intervention strategies.';
    }


    doc.text(remark, 18, remarkY + 9);
    doc.text('This transcript is valid only with official seal and authorized signature.', 18, remarkY + 14);


    const footerY = pageHeight - 28;


    doc.setDrawColor(226, 232, 240);
    doc.setLineWidth(0.3);
    doc.line(15, footerY, pageWidth - 15, footerY);


    doc.setFontSize(8);
    doc.setFont('helvetica', 'normal');
    doc.setTextColor(71, 85, 105);


    doc.line(20, footerY + 12, 60, footerY + 12);
    doc.text('Principal/Head of School', 40, footerY + 17, { align: 'center' });
    doc.text(`Date: ${new Date().toLocaleDateString('en-US')}`, 40, footerY + 21, { align: 'center' });


    doc.line(pageWidth - 60, footerY + 12, pageWidth - 20, footerY + 12);
    doc.text('Registrar/Academic Officer', pageWidth - 40, footerY + 17, { align: 'center' });
    doc.text(`Date: ${new Date().toLocaleDateString('en-US')}`, pageWidth - 40, footerY + 21, { align: 'center' });


    doc.setDrawColor(47, 105, 255);
    doc.setLineWidth(1.5);
    doc.circle(pageWidth / 2, footerY + 12, 8, 'S');


    doc.setFontSize(7);
    doc.setFont('helvetica', 'bold');
    doc.setTextColor(47, 105, 255);
    doc.text('OFFICIAL', pageWidth / 2, footerY + 10, { align: 'center' });
    doc.text('SEAL', pageWidth / 2, footerY + 14, { align: 'center' });


    doc.setFillColor(47, 105, 255);
    doc.rect(0, pageHeight - 4, pageWidth, 4, 'F');


    doc.save(`${formData.studentId}.pdf`);


    alert(` Official academic transcript generated successfully!\n\nStudent: ${formData.studentName}\nGPA: ${gpa}/5.0\nStatus: ${perfStatus}`);
  };


  // Updated to handle multiple files
  const handleFileUpload = (e) => {
    const files = Array.from(e.target.files);
    const validFiles = files.filter(file => file.type === 'application/pdf');
    
    if (validFiles.length > 0) {
      const newFiles = validFiles.map(file => ({
        id: Date.now() + Math.random(),
        file: file,
        name: file.name,
        size: file.size,
        uploadDate: new Date().toLocaleDateString()
      }));
      
      setUploadedFiles(prev => [...prev, ...newFiles]);
      alert(`${validFiles.length} file(s) uploaded successfully!`);
    }
    
    if (files.length !== validFiles.length) {
      alert('Some files were not PDFs and were skipped');
    }
    
    // Reset input
    e.target.value = '';
  };


  // Download single file
  const downloadUploadedFile = (fileObj) => {
    const url = URL.createObjectURL(fileObj.file);
    const link = document.createElement('a');
    link.href = url;
    link.download = fileObj.name;
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
    URL.revokeObjectURL(url);
  };


  // Remove single file
  const removeUploadedFile = (fileId) => {
    setUploadedFiles(prev => prev.filter(f => f.id !== fileId));
  };


  // Download all files as zip (optional - requires additional library like JSZip)
  const downloadAllFiles = () => {
    uploadedFiles.forEach(fileObj => {
      downloadUploadedFile(fileObj);
    });
  };


  const ReportPreview = () => {
    const { totalObtained, totalMax, percentage } = calculateTotals();
    const gpa = calculateGPA();


    return (
      <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-30 z-40">
        <div className="bg-white max-w-2xl w-full rounded-3xl shadow-lg border border-blue-100 p-8 relative max-h-96 overflow-y-auto">
          <button
            onClick={() => setShowPreview(false)}
            className="absolute top-4 right-4 text-gray-400 hover:text-gray-700 text-2xl"
            aria-label="Close"
          >
            &times;
          </button>
          <div className="mb-4 flex items-center gap-4">
            {logoUrl ? (
              <img src={logoUrl} alt="Logo" className="w-12 h-12 rounded" onError={(e) => (e.target.style.display = 'none')} />
            ) : (
              <div className="w-12 h-12 bg-blue-200 rounded-full flex items-center justify-center text-2xl font-bold text-blue-800">
                {formData.universityName?.[0] || 'U'}
              </div>
            )}
            <div>
              <h2 className="text-xl font-bold text-[#2F69FF]">{formData.universityName}</h2>
              <p className="text-sm text-gray-600">{formData.academicYear}</p>
            </div>
          </div>
          <h3 className="font-semibold text-lg mb-2">Student Details</h3>
          <div className="grid grid-cols-2 gap-4 text-sm mb-4">
            <div>
              <span className="font-medium">Name:</span> {formData.studentName}
            </div>
            <div>
              <span className="font-medium">ID:</span> {formData.studentId}
            </div>
            <div>
              <span className="font-medium">Class:</span> {formData.className}
            </div>
            <div>
              <span className="font-medium">Academic Year:</span> {formData.academicYear}
            </div>
          </div>
          <h3 className="font-semibold text-lg mb-2">Subjects / Grades</h3>
          <div className="overflow-x-auto mb-4">
            <table className="min-w-full text-xs border">
              <thead className="bg-gray-100">
                <tr>
                  <th className="px-2 py-2 border">Subject</th>
                  <th className="px-2 py-2 border">Max</th>
                  <th className="px-2 py-2 border">Obtained</th>
                  <th className="px-2 py-2 border">%</th>
                  <th className="px-2 py-2 border">Grade</th>
                </tr>
              </thead>
              <tbody>
                {subjects.map((subj) => {
                  const perc = calculatePercentage(subj.obtained, subj.maxMarks);
                  const grade = calculateGrade(perc);
                  return (
                    <tr key={subj.id}>
                      <td className="border px-2">{subj.name}</td>
                      <td className="border px-2 text-center">{subj.maxMarks}</td>
                      <td className="border px-2 text-center">{subj.obtained}</td>
                      <td className="border px-2 text-center">{perc}%</td>
                      <td className="border px-2 text-center font-bold">{grade}</td>
                    </tr>
                  );
                })}
              </tbody>
            </table>
          </div>
          <div className="grid grid-cols-2 gap-4 mb-4 p-3 bg-blue-50 rounded-lg">
            <div>
              <div className="text-sm text-gray-600">Total Obtained</div>
              <div className="font-bold text-[#2F69FF] text-lg">{totalObtained} / {totalMax}</div>
            </div>
            <div>
              <div className="text-sm text-gray-600">Overall % / GPA</div>
              <div className="font-bold text-[#2F69FF] text-lg">{percentage}% &nbsp; | &nbsp; {gpa} / 5.0</div>
            </div>
          </div>
          <div className="flex justify-end gap-3 mt-6">
            <button onClick={() => setShowPreview(false)} className="px-4 py-2 rounded-lg border bg-white text-gray-700 hover:bg-gray-100">Cancel</button>
            <button onClick={generatePDF} className="px-6 py-2 rounded-lg bg-gradient-to-r from-[#2F69FF] to-blue-700 text-white font-semibold flex items-center gap-2 shadow hover:scale-105 transition">
              <Download size={18} /> Generate PDF
            </button>
          </div>
        </div>
      </div>
    );
  };


  return (
    <div className="space-y-6">
      {showPreview && <ReportPreview />}
      <div className="p-6 bg-white rounded-3xl shadow-sm">
        <div className="flex gap-4 border-b border-gray-200">
          <button onClick={() => setActiveTab('generate')} className={`pb-3 px-4 font-semibold transition-all ${activeTab === 'generate' ? 'border-b-2 border-[#2F69FF] text-[#2F69FF]' : 'text-gray-500 hover:text-gray-700'}`}>
            <FileText className="inline-block mr-2" size={18} /> Generate Report Card
          </button>
          <button onClick={() => setActiveTab('upload')} className={`pb-3 px-4 font-semibold transition-all ${activeTab === 'upload' ? 'border-b-2 border-[#2F69FF] text-[#2F69FF]' : 'text-gray-500 hover:text-gray-700'}`}>
            <Upload className="inline-block mr-2" size={18} /> Upload Report Card
          </button>
        </div>
      </div>


      {activeTab === 'generate' && (
        <div className="space-y-6">
          <div className="p-6 bg-white rounded-3xl shadow-sm">
            <h3 className="text-lg font-semibold mb-4">Student & School Information</h3>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Student ID </label>
                <input type="text" name="studentId" value={formData.studentId} onChange={handleInputChange} placeholder="e.g., STU2024001" className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#2F69FF] focus:border-transparent outline-none" required />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Student Name </label>
                <input type="text" name="studentName" value={formData.studentName} onChange={handleInputChange} placeholder="e.g., Raghav M J" className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#2F69FF] focus:border-transparent outline-none" required />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">University/School Name </label>
                <input type="text" name="universityName" value={formData.universityName} onChange={handleInputChange} placeholder="e.g., MIT School" className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#2F69FF] focus:border-transparent outline-none" required />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Class</label>
                <select name="className" value={formData.className} onChange={handleInputChange} className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#2F69FF] focus:border-transparent outline-none">
                  <option>Class 9</option>
                  <option>Class 8</option>
                  <option>Class 10</option>
                  <option>Class 11</option>
                  <option>Class 12</option>
                </select>
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Academic Year</label>
                <select name="academicYear" value={formData.academicYear} onChange={handleInputChange} className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#2F69FF] focus:border-transparent outline-none">
                  <option>2024-2025</option>
                  <option>2023-2024</option>
                  <option>2022-2023</option>
                </select>
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">School Logo URL (Optional)</label>
                <input type="text" value={logoUrl} onChange={(e) => setLogoUrl(e.target.value)} placeholder="https://example.com/logo.png" className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#2F69FF] focus:border-transparent outline-none" />
                <p className="text-xs text-gray-500 mt-1">Direct image URL (PNG, JPG)</p>
              </div>
            </div>
          </div>
          <div className="p-6 bg-white rounded-3xl shadow-sm">
            <div className="flex justify-between items-center mb-4">
              <h3 className="text-lg font-semibold">Subject-wise Marks</h3>
              <button onClick={addSubject} className="py-2 px-4 bg-blue-500 text-white font-medium rounded-3xl hover:bg-blue-600 transition">Add Subject</button>
            </div>
            <div className="overflow-x-auto">
              <table className="min-w-full divide-y divide-gray-200">
                <thead className="bg-gray-50">
                  <tr>
                    <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase ">Subject Name</th>
                    <th className="px-4 py-3 text-center text-xs font-medium text-gray-500 uppercase">Max Marks</th>
                    <th className="px-4 py-3 text-center text-xs font-medium text-gray-500 uppercase">Min Marks</th>
                    <th className="px-4 py-3 text-center text-xs font-medium text-gray-500 uppercase">Obtained</th>
                    <th className="px-4 py-3 text-center text-xs font-medium text-gray-500 uppercase">Percentage</th>
                    <th className="px-4 py-3 text-center text-xs font-medium text-gray-500 uppercase">Grade</th>
                    <th className="px-4 py-3 text-center text-xs font-medium text-gray-500 uppercase">Action</th>
                  </tr>
                </thead>
                <tbody className="bg-white divide-y divide-gray-200 ">
                  {subjects.map((subject) => {
                    const percentage = calculatePercentage(subject.obtained, subject.maxMarks);
                    const grade = calculateGrade(percentage);
                    return (
                      <tr key={subject.id}>
                        <td className="px-4 py-3">
                          <input type="text" value={subject.name} onChange={(e) => handleSubjectChange(subject.id, 'name', e.target.value)} placeholder="Subject Name" className="w-full px-3 py-1 border border-gray-300 rounded-3xl focus:ring-1 focus:ring-[#2F69FF] outline-none" />
                        </td>
                        <td className="px-4 py-3">
                          <input type="number" value={subject.maxMarks} onChange={(e) => handleSubjectChange(subject.id, 'maxMarks', e.target.value)} className="w-20 px-3 py-1 ml-10 border border-gray-300 rounded-3xl text-center focus:ring-1 focus:ring-[#2F69FF] outline-none" min="0" />
                        </td>
                        <td className="px-4 py-3">
                          <input type="number" value={subject.minMarks} onChange={(e) => handleSubjectChange(subject.id, 'minMarks', e.target.value)} className="w-20 px-3 py-1 ml-10 border border-gray-300 rounded-3xl text-center focus:ring-1 focus:ring-[#2F69FF] outline-none" min="0" />
                        </td>
                        <td className="px-4 py-3">
                          <input type="number" value={subject.obtained} onChange={(e) => handleSubjectChange(subject.id, 'obtained', e.target.value)} className="w-20 px-3 py-1 ml-12 border border-gray-300 rounded-3xl text-center focus:ring-1 focus:ring-[#2F69FF] outline-none" min="0" max={subject.maxMarks} />
                          {subject.obtained > subject.maxMarks && (<p className="text-xs text-red-500 mt-1">Max: {subject.maxMarks}</p>)}
                        </td>
                        <td className="px-4 py-3 text-center text-sm font-medium text-gray-700">{percentage}%</td>
                        <td className="px-4 py-3 text-center text-sm font-bold text-gray-800">{grade}</td>
                        <td className="px-4 py-3 text-center">
                          <button onClick={() => removeSubject(subject.id)} className="text-blue-600 hover:text-blue-800 font-medium" disabled={subjects.length === 1}>Remove</button>
                        </td>
                      </tr>
                    );
                  })}
                </tbody>
              </table>
            </div>
            <div className="mt-6 p-4 bg-gradient-to-r from-blue-50 to-indigo-50 rounded-lg border border-blue-200">
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                <div>
                  <p className="text-sm text-gray-600 ml-2">Total Marks Obtained</p>
                  <p className="text-2xl font-bold text-[#2F69FF] ml-5">{calculateTotals().totalObtained} / {calculateTotals().totalMax}</p>
                </div>
                <div>
                  <p className="text-sm text-gray-600 ml-10">Overall Percentage</p>
                  <p className="text-2xl font-bold text-[#2F69FF] ml-14">{calculateTotals().percentage}%</p>
                </div>
                <div>
                  <p className="text-sm text-gray-600 ml-20">GPA (5.0 Scale)</p>
                  <p className="text-2xl font-bold text-blue-600 ml-20">{calculateGPA()} / 5.0</p>
                </div>
              </div>
            </div>
          </div>
          <div className="flex gap-4 justify-center">
            <button onClick={() => setShowPreview(true)} className="py-3 px-6 bg-gradient-to-r from-[#2F69FF] to-[#1e4fd9] text-white font-semibold rounded-3xl shadow-lg hover:shadow-xl transform hover:scale-105 transition-all duration-200 flex items-center gap-2">
              <Eye size={20} /> View Report
            </button>
          </div>
        </div>
      )}


      {activeTab === 'upload' && (
        <div className="p-6 bg-white rounded-lg shadow-sm">
          <div className="flex justify-between items-center mb-4">
            <h3 className="text-lg font-semibold">Upload Existing Report Cards</h3>
            {uploadedFiles.length > 0 && (
              <div className="flex gap-2">
                <span className="px-3 py-1 bg-blue-100 text-blue-700 rounded-full text-sm font-medium">
                  {uploadedFiles.length} file{uploadedFiles.length !== 1 ? 's' : ''} uploaded
                </span>
                <button 
                  onClick={downloadAllFiles}
                  className="py-1 px-4 bg-[#2F69FF] text-white font-medium rounded-lg hover:bg-blue-700 flex items-center gap-2 text-sm"
                >
                  <Download size={16} /> Download All
                </button>
              </div>
            )}
          </div>
          
          <div className="border-2 border-dashed border-gray-300 rounded-3xl p-8 text-center hover:border-[#2F69FF] transition">
            <Upload className="mx-auto mb-4 text-gray-400" size={48} />
            <p className="text-gray-600 mb-2">Upload PDF report card files</p>
            <p className="text-sm text-gray-500 mb-4">You can select multiple files at once</p>
            <label className="inline-block">
              <input 
                type="file" 
                accept=".pdf" 
                onChange={handleFileUpload} 
                className="hidden" 
                multiple
              />
              <span className="py-2 px-6 bg-[#2F69FF] text-white font-medium rounded-3xl cursor-pointer hover:bg-blue-700 inline-block">
                Choose Files
              </span>
            </label>
          </div>

          {uploadedFiles.length > 0 && (
            <div className="mt-6 space-y-3">
              <h4 className="font-semibold text-gray-800">Uploaded Files</h4>
              {uploadedFiles.map((fileObj) => (
                <div 
                  key={fileObj.id} 
                  className="p-4 bg-blue-50 border border-blue-200 rounded-lg hover:shadow-md transition-all"
                >
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-3 flex-1">
                      <FileText className="text-blue-600 flex-shrink-0" size={24} />
                      <div className="flex-1 min-w-0">
                        <p className="font-semibold text-gray-800 truncate">{fileObj.name}</p>
                        <div className="flex gap-4 text-sm text-gray-600">
                          <span>{(fileObj.size / 1024).toFixed(2)} KB</span>
                          <span>Uploaded: {fileObj.uploadDate}</span>
                        </div>
                      </div>
                    </div>
                    <div className="flex items-center gap-2 ml-4">
                      <button 
                        onClick={() => downloadUploadedFile(fileObj)} 
                        className="py-2 px-4 bg-[#2F69FF] text-white font-medium rounded-lg hover:bg-blue-700 flex items-center gap-2 transition-all"
                      >
                        <Download size={18} /> Download
                      </button>
                      <button
                        onClick={() => removeUploadedFile(fileObj.id)}
                        className="p-2 bg-red-100 text-red-600 rounded-lg hover:bg-red-200 transition-all"
                        title="Remove file"
                      >
                        <X size={18} />
                      </button>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
      )}
    </div>
  );
};


export default ReportCardPage;
