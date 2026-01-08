import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { Card } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { 
  Mail, 
  Phone, 
  User, 
  ChevronDown, 
  Users, 
  MapPin 
} from "lucide-react";
import {
  DropdownMenu,
  DropdownMenuTrigger,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
} from "@/components/ui/dropdown-menu";
import StudentDetailDialog from "@/components/StudentDetailDialog";

const Students = () => {
  const navigate = useNavigate();
  const [students, setStudents] = useState([]);
  const [selectedClass, setSelectedClass] = useState("");
  const [selectedStudent, setSelectedStudent] = useState(null);
  const [detailDialogOpen, setDetailDialogOpen] = useState(false);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [expandedGroups, setExpandedGroups] = useState({});

  // Extract unique classes from students data (numerical sort)
  const classes = Array.from(
    new Set(
      students.map((student) => `Class ${student.class}`)
    )
  ).sort((a, b) => {
    const numA = parseInt(a.match(/\d+/)?.[0] || 0);
    const numB = parseInt(b.match(/\d+/)?.[0] || 0);
    return numA - numB;
  });

  // Group classes: 1-5 and 6-12
  const lowerClasses = classes.filter(cls => {
    const num = parseInt(cls.match(/\d+/)?.[0] || 0);
    return num >= 1 && num <= 5;
  });
  const upperClasses = classes.filter(cls => {
    const num = parseInt(cls.match(/\d+/)?.[0] || 0);
    return num >= 6;
  });

  // Toggle group expansion
  const toggleGroup = (group) => {
    setExpandedGroups(prev => ({
      ...prev,
      [group]: !prev[group]
    }));
  };

  useEffect(() => {
    setStudents([
      {
        id: 1,
        studentId: "STU-2024-001",
        name: "Aarav Sharma",
        rollNumber: "2024001",
        class: 1,
        age: 6,
        dateOfBirth: "2018-05-15",
        nationalId: "AADHAAR-1234-5678-9012",
        proofOfId: "Birth Certificate",
        fatherName: "Rajesh Sharma",
        motherName: "Priya Sharma",
        parentName: "Rajesh Sharma",
        email: "aarav.sharma@student.com",
        phone: "9876543210",
        address: "123 MG Road, Bandra West, Mumbai, Maharashtra 400050",
        profilePicture: "https://images.unsplash.com/photo-1546456073-92b9f0a8d413?w=400",
        registeredBy: "Parent",
        discoverySource: "Google Search",
        attendance: 92,
        ptmsAttended: 3,
        backlogs: 0,
        averageGrade: "A",
        yearwiseMarks: [
          { year: "2024", subject: "Mathematics", marks: 88, grade: "A" },
          { year: "2024", subject: "English", marks: 92, grade: "A+" },
          { year: "2024", subject: "Science", marks: 85, grade: "A" },
          { year: "2024", subject: "Hindi", marks: 90, grade: "A" },
        ],
        teacherFeedback: [
          {
            teacherName: "Ms. Priya Sharma",
            subject: "Mathematics",
            comment: "Excellent student with great potential. Shows strong analytical skills.",
            date: "2024-11-15"
          },
          {
            teacherName: "Mr. Amit Kumar",
            subject: "English",
            comment: "Good reading comprehension and writing skills.",
            date: "2024-11-20"
          }
        ],
        coursesPurchased: [
          {
            name: "Advanced Mathematics",
            instructor: "Dr. Sarah Johnson",
            status: "In Progress",
            purchaseDate: "2024-01-10"
          }
        ],
        fees: {
          total: 50000,
          paid: 30000,
          pending: 20000,
          nextDueDate: "2025-01-15"
        }
      },
      {
        id: 2,
        studentId: "STU-2024-002",
        name: "Diya Patel",
        rollNumber: "2024002",
        class: 1,
        age: 6,
        dateOfBirth: "2018-08-22",
        nationalId: "AADHAAR-2345-6789-0123",
        proofOfId: "Birth Certificate",
        fatherName: "Amit Patel",
        motherName: "Neha Patel",
        parentName: "Neha Patel",
        email: "diya.patel@student.com",
        phone: "9876543211",
        address: "45 Park Street, Andheri East, Mumbai, Maharashtra 400069",
        profilePicture: "https://images.unsplash.com/photo-1554780336-390462301acf?w=400",
        registeredBy: "Parent",
        discoverySource: "Social Media",
        attendance: 95,
        ptmsAttended: 4,
        backlogs: 0,
        averageGrade: "A+",
        yearwiseMarks: [
          { year: "2024", subject: "Mathematics", marks: 95, grade: "A+" },
          { year: "2024", subject: "English", marks: 93, grade: "A+" },
          { year: "2024", subject: "Science", marks: 90, grade: "A" },
          { year: "2024", subject: "Hindi", marks: 94, grade: "A+" },
        ],
        teacherFeedback: [
          {
            teacherName: "Ms. Priya Sharma",
            subject: "English",
            comment: "Outstanding performance in class. Very attentive and participative.",
            date: "2024-11-20"
          }
        ],
        coursesPurchased: [
          {
            name: "English Literature",
            instructor: "Ms. Priya Sharma",
            status: "Completed",
            purchaseDate: "2024-01-05"
          }
        ],
        fees: {
          total: 50000,
          paid: 50000,
          pending: 0,
          nextDueDate: null
        }
      },
      {
        id: 3,
        studentId: "STU-2024-003",
        name: "Arjun Kumar",
        rollNumber: "2024003",
        class: 2,
        age: 7,
        dateOfBirth: "2017-03-10",
        nationalId: "AADHAAR-3456-7890-1234",
        proofOfId: "Aadhar Card",
        fatherName: "Suresh Kumar",
        motherName: "Lakshmi Kumar",
        parentName: "Suresh Kumar",
        email: "arjun.kumar@student.com",
        phone: "9876543212",
        address: "78 Green Park, Vasant Kunj, Delhi, Delhi 110070",
        profilePicture: "https://images.unsplash.com/photo-1519340241574-2cec6aef0c01?w=400",
        registeredBy: "Parent",
        discoverySource: "Referral from Friend",
        attendance: 88,
        ptmsAttended: 2,
        backlogs: 1,
        averageGrade: "B+",
        yearwiseMarks: [
          { year: "2024", subject: "Mathematics", marks: 78, grade: "B+" },
          { year: "2024", subject: "English", marks: 82, grade: "A" },
          { year: "2024", subject: "Science", marks: 80, grade: "A" },
          { year: "2024", subject: "Social Studies", marks: 85, grade: "A" },
          { year: "2023", subject: "Mathematics", marks: 75, grade: "B+" },
          { year: "2023", subject: "English", marks: 80, grade: "A" },
        ],
        teacherFeedback: [
          {
            teacherName: "Dr. Sarah Johnson",
            subject: "Mathematics",
            comment: "Needs to focus more on problem-solving techniques. Shows improvement.",
            date: "2024-10-25"
          },
          {
            teacherName: "Ms. Priya Sharma",
            subject: "English",
            comment: "Good progress in reading and comprehension.",
            date: "2024-11-10"
          }
        ],
        coursesPurchased: [
          {
            name: "Mathematics Fundamentals",
            instructor: "Dr. Sarah Johnson",
            status: "In Progress",
            purchaseDate: "2024-02-15"
          },
          {
            name: "Creative Writing",
            instructor: "Ms. Priya Sharma",
            status: "Completed",
            purchaseDate: "2024-01-20"
          }
        ],
        fees: {
          total: 55000,
          paid: 35000,
          pending: 20000,
          nextDueDate: "2025-02-01"
        }
      },
      {
        id: 4,
        studentId: "STU-2024-004",
        name: "Ananya Singh",
        rollNumber: "2024004",
        class: 2,
        age: 7,
        dateOfBirth: "2017-11-18",
        nationalId: "AADHAAR-4567-8901-2345",
        proofOfId: "Passport",
        fatherName: "Vikram Singh",
        motherName: "Priya Singh",
        parentName: "Priya Singh",
        email: "ananya.singh@student.com",
        phone: "9876543213",
        address: "12 Lake View Apartments, Koramangala, Bangalore, Karnataka 560034",
        profilePicture: "https://images.unsplash.com/photo-1503454537195-1dcabb73ffb9?w=400",
        registeredBy: "Parent",
        discoverySource: "School Fair",
        attendance: 97,
        ptmsAttended: 5,
        backlogs: 0,
        averageGrade: "A+",
        yearwiseMarks: [
          { year: "2024", subject: "Mathematics", marks: 96, grade: "A+" },
          { year: "2024", subject: "English", marks: 98, grade: "A+" },
          { year: "2024", subject: "Science", marks: 95, grade: "A+" },
          { year: "2024", subject: "Social Studies", marks: 94, grade: "A+" },
          { year: "2023", subject: "Mathematics", marks: 92, grade: "A+" },
          { year: "2023", subject: "English", marks: 94, grade: "A+" },
        ],
        teacherFeedback: [
          {
            teacherName: "Dr. Sarah Johnson",
            subject: "Mathematics",
            comment: "Exceptional student. Shows advanced understanding of concepts.",
            date: "2024-11-18"
          },
          {
            teacherName: "Prof. Michael Chen",
            subject: "Science",
            comment: "Consistently excellent performance. Very curious and engaged.",
            date: "2024-11-22"
          }
        ],
        coursesPurchased: [
          {
            name: "Advanced Science",
            instructor: "Prof. Michael Chen",
            status: "In Progress",
            purchaseDate: "2024-01-08"
          },
          {
            name: "Creative Mathematics",
            instructor: "Dr. Sarah Johnson",
            status: "In Progress",
            purchaseDate: "2024-02-01"
          }
        ],
        fees: {
          total: 55000,
          paid: 55000,
          pending: 0,
          nextDueDate: null
        }
      },
      {
        id: 5,
        studentId: "STU-2024-005",
        name: "Vihaan Reddy",
        rollNumber: "2024005",
        class: 3,
        age: 8,
        dateOfBirth: "2016-06-25",
        nationalId: "AADHAAR-5678-9012-3456",
        proofOfId: "Aadhar Card",
        fatherName: "Ramesh Reddy",
        motherName: "Kavita Reddy",
        parentName: "Ramesh Reddy",
        email: "vihaan.reddy@student.com",
        phone: "9876543214",
        address: "56 Hill View Colony, Banjara Hills, Hyderabad, Telangana 500034",
        profilePicture: "https://images.unsplash.com/photo-1568602471122-7832951cc4c5?w=400",
        registeredBy: "Parent",
        discoverySource: "Online Advertisement",
        attendance: 90,
        ptmsAttended: 3,
        backlogs: 0,
        averageGrade: "A",
        yearwiseMarks: [
          { year: "2024", subject: "Mathematics", marks: 87, grade: "A" },
          { year: "2024", subject: "English", marks: 89, grade: "A" },
          { year: "2024", subject: "Science", marks: 91, grade: "A" },
          { year: "2024", subject: "Social Studies", marks: 88, grade: "A" },
          { year: "2024", subject: "Computer Science", marks: 93, grade: "A+" },
          { year: "2023", subject: "Mathematics", marks: 85, grade: "A" },
          { year: "2023", subject: "English", marks: 86, grade: "A" },
        ],
        teacherFeedback: [
          {
            teacherName: "Prof. Michael Chen",
            subject: "Computer Science",
            comment: "Shows great aptitude for technology. Very innovative thinking.",
            date: "2024-11-12"
          }
        ],
        coursesPurchased: [
          {
            name: "Introduction to Coding",
            instructor: "Mr. Rahul Verma",
            status: "In Progress",
            purchaseDate: "2024-03-01"
          }
        ],
        fees: {
          total: 60000,
          paid: 40000,
          pending: 20000,
          nextDueDate: "2025-01-20"
        }
      },
      {
        id: 6,
        studentId: "STU-2024-006",
        name: "Ishaan Gupta",
        rollNumber: "2024006",
        class: 3,
        age: 8,
        dateOfBirth: "2016-09-14",
        nationalId: "AADHAAR-6789-0123-4567",
        proofOfId: "Birth Certificate",
        fatherName: "Amit Gupta",
        motherName: "Sneha Gupta",
        parentName: "Amit Gupta",
        email: "ishaan.gupta@student.com",
        phone: "9876543215",
        address: "89 Rose Garden, Sector 15, Gurgaon, Haryana 122001",
        profilePicture: "https://images.unsplash.com/photo-1504257432389-52343af06ae3?w=400",
        registeredBy: "Parent",
        discoverySource: "Google Search",
        attendance: 85,
        ptmsAttended: 2,
        backlogs: 2,
        averageGrade: "B",
        yearwiseMarks: [
          { year: "2024", subject: "Mathematics", marks: 72, grade: "B" },
          { year: "2024", subject: "English", marks: 75, grade: "B+" },
          { year: "2024", subject: "Science", marks: 78, grade: "B+" },
          { year: "2024", subject: "Social Studies", marks: 80, grade: "A" },
          { year: "2023", subject: "Mathematics", marks: 70, grade: "B" },
          { year: "2023", subject: "English", marks: 73, grade: "B" },
        ],
        teacherFeedback: [
          {
            teacherName: "Dr. Sarah Johnson",
            subject: "Mathematics",
            comment: "Needs additional support with homework. Recommend extra tutoring.",
            date: "2024-10-30"
          },
          {
            teacherName: "Ms. Priya Sharma",
            subject: "English",
            comment: "Shows improvement with regular practice. Keep encouraging.",
            date: "2024-11-05"
          }
        ],
        coursesPurchased: [
          {
            name: "Mathematics Basics",
            instructor: "Dr. Sarah Johnson",
            status: "In Progress",
            purchaseDate: "2024-02-20"
          }
        ],
        fees: {
          total: 60000,
          paid: 20000,
          pending: 40000,
          nextDueDate: "2024-12-15"
        }
      },
      {
        id: 7,
        studentId: "STU-2024-007",
        name: "Kavya Gupta",
        rollNumber: "2024007",
        class: 5,
        age: 10,
        dateOfBirth: "2014-12-05",
        nationalId: "AADHAAR-7890-1234-5678",
        proofOfId: "Aadhar Card",
        fatherName: "Amit Gupta",
        motherName: "Sneha Gupta",
        parentName: "Amit Gupta",
        email: "kavya.gupta@student.com",
        phone: "9876543216",
        address: "89 Rose Garden, Sector 15, Gurgaon, Haryana 122001",
        profilePicture: "https://images.unsplash.com/photo-1581403341630-a6e0b9d2d257?w=400",
        registeredBy: "Parent",
        discoverySource: "Referral from Friend",
        attendance: 93,
        ptmsAttended: 4,
        backlogs: 0,
        averageGrade: "A",
        yearwiseMarks: [
          { year: "2024", subject: "Mathematics", marks: 90, grade: "A" },
          { year: "2024", subject: "English", marks: 92, grade: "A+" },
          { year: "2024", subject: "Science", marks: 88, grade: "A" },
          { year: "2024", subject: "Social Studies", marks: 91, grade: "A" },
          { year: "2024", subject: "Hindi", marks: 89, grade: "A" },
          { year: "2023", subject: "Mathematics", marks: 87, grade: "A" },
          { year: "2023", subject: "English", marks: 90, grade: "A" },
          { year: "2023", subject: "Science", marks: 85, grade: "A" },
        ],
        teacherFeedback: [
          {
            teacherName: "Ms. Priya Sharma",
            subject: "English",
            comment: "Excellent writing skills. Very creative in assignments.",
            date: "2024-11-08"
          },
          {
            teacherName: "Dr. Sarah Johnson",
            subject: "Mathematics",
            comment: "Strong problem-solving abilities. Participates actively in class.",
            date: "2024-11-15"
          }
        ],
        coursesPurchased: [
          {
            name: "Advanced English Literature",
            instructor: "Ms. Priya Sharma",
            status: "Completed",
            purchaseDate: "2024-01-12"
          },
          {
            name: "Creative Writing Workshop",
            instructor: "Ms. Priya Sharma",
            status: "In Progress",
            purchaseDate: "2024-03-05"
          }
        ],
        fees: {
          total: 65000,
          paid: 45000,
          pending: 20000,
          nextDueDate: "2025-01-25"
        }
      },
      {
        id: 8,
        studentId: "STU-2024-008",
        name: "Rohan Mehta",
        rollNumber: "2024008",
        class: 6,
        age: 11,
        dateOfBirth: "2013-04-20",
        nationalId: "AADHAAR-8901-2345-6789",
        proofOfId: "Passport",
        fatherName: "Vikram Mehta",
        motherName: "Anjali Mehta",
        parentName: "Vikram Mehta",
        email: "rohan.mehta@student.com",
        phone: "9876543217",
        address: "34 Sea View Apartments, Marine Drive, Mumbai, Maharashtra 400002",
        profilePicture: "https://images.unsplash.com/photo-1492562080023-ab3db95bfbce?w=400",
        registeredBy: "Student",
        discoverySource: "YouTube Advertisement",
        attendance: 89,
        ptmsAttended: 3,
        backlogs: 1,
        averageGrade: "B+",
        yearwiseMarks: [
          { year: "2024", subject: "Mathematics", marks: 83, grade: "A" },
          { year: "2024", subject: "English", marks: 80, grade: "A" },
          { year: "2024", subject: "Science", marks: 85, grade: "A" },
          { year: "2024", subject: "Social Studies", marks: 79, grade: "B+" },
          { year: "2024", subject: "Hindi", marks: 77, grade: "B+" },
          { year: "2023", subject: "Mathematics", marks: 80, grade: "A" },
          { year: "2023", subject: "English", marks: 78, grade: "B+" },
          { year: "2023", subject: "Science", marks: 82, grade: "A" },
        ],
        teacherFeedback: [
          {
            teacherName: "Prof. Michael Chen",
            subject: "Science",
            comment: "Shows great interest in practical experiments. Good lab skills.",
            date: "2024-11-10"
          }
        ],
        coursesPurchased: [
          {
            name: "Physics Fundamentals",
            instructor: "Prof. Michael Chen",
            status: "In Progress",
            purchaseDate: "2024-02-18"
          }
        ],
        fees: {
          total: 70000,
          paid: 50000,
          pending: 20000,
          nextDueDate: "2025-02-10"
        }
      },
      {
        id: 9,
        studentId: "STU-2024-009",
        name: "Sneha Joshi",
        rollNumber: "2024009",
        class: 7,
        age: 12,
        dateOfBirth: "2012-07-30",
        nationalId: "AADHAAR-9012-3456-7890",
        proofOfId: "Aadhar Card",
        fatherName: "Anil Joshi",
        motherName: "Meera Joshi",
        parentName: "Anil Joshi",
        email: "sneha.joshi@student.com",
        phone: "9876543218",
        address: "67 Sunshine Society, Juhu, Mumbai, Maharashtra 400049",
        profilePicture: "https://images.unsplash.com/photo-1529626455594-4ff0802cfb7e?w=400",
        registeredBy: "Parent",
        discoverySource: "School Recommendation",
        attendance: 96,
        ptmsAttended: 5,
        backlogs: 0,
        averageGrade: "A+",
        yearwiseMarks: [
          { year: "2024", subject: "Mathematics", marks: 94, grade: "A+" },
          { year: "2024", subject: "English", marks: 96, grade: "A+" },
          { year: "2024", subject: "Science", marks: 93, grade: "A+" },
          { year: "2024", subject: "Social Studies", marks: 95, grade: "A+" },
          { year: "2024", subject: "Hindi", marks: 92, grade: "A+" },
          { year: "2023", subject: "Mathematics", marks: 91, grade: "A" },
          { year: "2023", subject: "English", marks: 94, grade: "A+" },
          { year: "2023", subject: "Science", marks: 90, grade: "A" },
        ],
        teacherFeedback: [
          {
            teacherName: "Ms. Priya Sharma",
            subject: "English",
            comment: "Outstanding literary analysis skills. Top performer in class.",
            date: "2024-11-25"
          },
          {
            teacherName: "Dr. Sarah Johnson",
            subject: "Mathematics",
            comment: "Exceptional mathematical reasoning. Natural leader in group work.",
            date: "2024-11-20"
          }
        ],
        coursesPurchased: [
          {
            name: "Advanced Mathematics",
            instructor: "Dr. Sarah Johnson",
            status: "In Progress",
            purchaseDate: "2024-01-15"
          },
          {
            name: "English Literature Honors",
            instructor: "Ms. Priya Sharma",
            status: "Completed",
            purchaseDate: "2024-01-10"
          }
        ],
        fees: {
          total: 75000,
          paid: 75000,
          pending: 0,
          nextDueDate: null
        }
      },
      {
        id: 10,
        studentId: "STU-2024-010",
        name: "Aditya Rao",
        rollNumber: "2024010",
        class: 9,
        age: 14,
        dateOfBirth: "2010-10-12",
        nationalId: "AADHAAR-0123-4567-8901",
        proofOfId: "Passport",
        fatherName: "Sanjay Rao",
        motherName: "Divya Rao",
        parentName: "Sanjay Rao",
        email: "aditya.rao@student.com",
        phone: "9876543219",
        address: "23 Whitefield Road, Whitefield, Bangalore, Karnataka 560066",
        profilePicture: "https://images.unsplash.com/photo-1531891437562-4301cf35b7e4?w=400",
        registeredBy: "Student",
        discoverySource: "Social Media",
        attendance: 87,
        ptmsAttended: 2,
        backlogs: 1,
        averageGrade: "B+",
        yearwiseMarks: [
          { year: "2024", subject: "Mathematics", marks: 84, grade: "A" },
          { year: "2024", subject: "English", marks: 81, grade: "A" },
          { year: "2024", subject: "Physics", marks: 86, grade: "A" },
          { year: "2024", subject: "Chemistry", marks: 79, grade: "B+" },
          { year: "2024", subject: "Biology", marks: 82, grade: "A" },
          { year: "2023", subject: "Mathematics", marks: 80, grade: "A" },
          { year: "2023", subject: "English", marks: 78, grade: "B+" },
          { year: "2023", subject: "Science", marks: 83, grade: "A" },
        ],
        teacherFeedback: [
          {
            teacherName: "Prof. Michael Chen",
            subject: "Physics",
            comment: "Strong conceptual understanding. Needs to improve consistency.",
            date: "2024-11-01"
          },
          {
            teacherName: "Mr. Rahul Verma",
            subject: "Chemistry",
            comment: "Good practical skills. Should focus more on theory preparation.",
            date: "2024-11-12"
          }
        ],
        coursesPurchased: [
          {
            name: "Advanced Physics",
            instructor: "Prof. Michael Chen",
            status: "In Progress",
            purchaseDate: "2024-03-10"
          },
          {
            name: "Organic Chemistry Mastery",
            instructor: "Mr. Rahul Verma",
            status: "In Progress",
            purchaseDate: "2024-03-15"
          }
        ],
        fees: {
          total: 80000,
          paid: 55000,
          pending: 25000,
          nextDueDate: "2025-01-05"
        }
      },
    ]);
  }, []);

  // Filter students by selected class ("" = all)
  const filteredStudents =
    selectedClass === ""
      ? students
      : students.filter((student) => `Class ${student.class}` === selectedClass);

  const handleCardClick = (student) => {
    setSelectedStudent(student);
    setDetailDialogOpen(true);
  };

  return (
    <div className="space-y-4 md:space-y-6">
      {/* Header Section - Responsive */}
      <div className="flex flex-col gap-4">
        {/* Title */}
        <div>
          <h1 className="text-2xl sm:text-3xl font-bold text-foreground">Students</h1>
          <p className="text-sm sm:text-base text-muted-foreground mt-1">
            View students grouped by their classes
          </p>
        </div>

        {/* Controls - Responsive Layout */}
        <div className="flex flex-col sm:flex-row items-stretch sm:items-center gap-3 sm:gap-4">
          {/* Class Filter Dropdown - Responsive */}
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button
                variant="outline"
                className="flex items-center gap-2 h-10 sm:h-12 w-full sm:w-auto sm:min-w-[240px] justify-between text-sm"
              >
                <span className="truncate">{selectedClass === "" ? "All Classes" : selectedClass}</span>
                <ChevronDown className="w-4 h-4 flex-shrink-0" />
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent 
              align="start" 
              className="w-[var(--radix-dropdown-menu-trigger-width)] sm:w-60 max-h-80 overflow-y-auto p-1"
            >
              {/* All Classes */}
              <DropdownMenuItem onClick={() => setSelectedClass("")} className="text-sm">
                All Classes
              </DropdownMenuItem>
              <DropdownMenuSeparator />
              
              {/* Classes 1-5 GROUP */}
              <div className="py-1">
                <DropdownMenuItem 
                  className="cursor-pointer p-2 hover:bg-accent text-sm"
                  onClick={() => toggleGroup('lower')}
                  onSelect={(e) => e.preventDefault()}
                >
                  <span className="flex items-center justify-between w-full font-medium">
                    <span>Classes 1-5</span>
                    <ChevronDown 
                      className={`w-4 h-4 transition-transform ${
                        expandedGroups.lower ? 'rotate-180' : ''
                      }`}
                    />
                  </span>
                </DropdownMenuItem>
                {expandedGroups.lower && lowerClasses.length > 0 && (
                  <div className="pl-4 sm:pl-6 space-y-0.5 animate-in slide-in-from-top-2 duration-200">
                    {lowerClasses.map((cls) => (
                      <DropdownMenuItem
                        key={cls}
                        className="cursor-pointer p-1 pl-3 -mx-1 hover:bg-accent text-sm"
                        onClick={() => setSelectedClass(cls)}
                      >
                        {cls}
                      </DropdownMenuItem>
                    ))}
                  </div>
                )}
              </div>
              
              <DropdownMenuSeparator />
              
              {/* Classes 6-12 GROUP */}
              <div className="py-1">
                <DropdownMenuItem 
                  className="cursor-pointer p-2 hover:bg-accent text-sm"
                  onClick={() => toggleGroup('upper')}
                  onSelect={(e) => e.preventDefault()}
                >
                  <span className="flex items-center justify-between w-full font-medium">
                    <span>Classes 6-12</span>
                    <ChevronDown 
                      className={`w-4 h-4 transition-transform ${
                        expandedGroups.upper ? 'rotate-180' : ''
                      }`}
                    />
                  </span>
                </DropdownMenuItem>
                {expandedGroups.upper && upperClasses.length > 0 && (
                  <div className="pl-4 sm:pl-6 space-y-0.5 animate-in slide-in-from-top-2 duration-200">
                    {upperClasses.map((cls) => (
                      <DropdownMenuItem
                        key={cls}
                        className="cursor-pointer p-1 pl-3 -mx-1 hover:bg-accent text-sm"
                        onClick={() => setSelectedClass(cls)}
                      >
                        {cls}
                      </DropdownMenuItem>
                    ))}
                  </div>
                )}
              </div>
            </DropdownMenuContent>
          </DropdownMenu>

          {/* Total Students Box - Responsive */}
          <div className="flex items-center justify-between bg-primary/10 border border-primary/20 px-3 sm:px-4 py-2.5 sm:py-3 rounded-xl flex-1 sm:flex-none sm:w-auto h-10 sm:h-12">
            <div className="flex items-center gap-2 w-full sm:w-auto justify-between sm:justify-start">
              <div className="h-4 w-4 sm:h-5 sm:w-5 rounded-full bg-primary/20 flex items-center justify-center text-primary flex-shrink-0">
                <Users className="w-3 h-3 sm:w-4 sm:h-4" />
              </div>
              <div className="flex items-center gap-2 sm:gap-3">
                <p className="text-xs uppercase tracking-wide text-primary/70">
                  Total Students
                </p>
                <p className="text-lg sm:text-xl font-bold text-primary">
                  {filteredStudents.length}
                </p>
              </div>
            </div>
          </div>

          {/* Add Student Button - Responsive */}
          <Button 
            onClick={() => navigate("/add-student")}
            className="bg-primary text-primary-foreground hover:bg-primary/90 flex items-center justify-center gap-2 h-10 sm:h-12 text-sm w-full sm:w-auto"
          >
            <Users className="w-4 h-4" />
            <span className="hidden xs:inline">Add Student</span>
            <span className="xs:hidden">Add Student</span>
          </Button>
        </div>
      </div>

      {/* Loading / Error States */}
      {loading && (
        <div className="text-center py-6 sm:py-8">
          <p className="text-sm sm:text-base text-muted-foreground">Loading students...</p>
        </div>
      )}

      {error && (
        <div className="text-center py-6 sm:py-8">
          <p className="text-sm sm:text-base text-destructive">Error loading students: {error}</p>
        </div>
      )}

      {/* Student Cards */}
      {!loading && !error && (
        <>
          <p className="text-xs sm:text-sm text-muted-foreground mb-3 sm:mb-4">
            Showing {filteredStudents.length} student
            {filteredStudents.length !== 1 ? "s" : ""}{" "}
            {selectedClass === ""
              ? "across all classes"
              : `in ${selectedClass}`}
          </p>

          {filteredStudents.length === 0 ? (
            <Card className="p-8 sm:p-12 text-center">
              <p className="text-sm sm:text-base text-muted-foreground">
                No students found for this class.
              </p>
            </Card>
          ) : (
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-5 md:gap-6">
              {filteredStudents.map((student) => (
                <Card
                  key={student.id}
                  className="p-4 sm:p-5 md:p-6 hover:shadow-lg transition-shadow cursor-pointer"
                  onClick={() => handleCardClick(student)}
                >
                  <div className="space-y-3 sm:space-y-4">
                    <div className="flex items-start justify-between">
                      <div className="flex items-center gap-2 sm:gap-3 min-w-0 flex-1">
                        <div className="w-10 h-10 sm:w-12 sm:h-12 rounded-full overflow-hidden border-2 border-primary/20 flex-shrink-0">
                          {student.profilePicture ? (
                            <img 
                              src={student.profilePicture} 
                              alt={student.name}
                              className="w-full h-full object-cover"
                            />
                          ) : (
                            <div className="w-full h-full bg-primary/10 flex items-center justify-center">
                              <User className="w-5 h-5 sm:w-6 sm:h-6 text-primary" />
                            </div>
                          )}
                        </div>
                        <div className="min-w-0 flex-1">
                          <h3 className="font-semibold text-sm sm:text-base text-foreground truncate">
                            {student.name}
                          </h3>
                          <p className="text-xs sm:text-sm text-muted-foreground truncate">
                            Roll {student.rollNumber}
                          </p>
                        </div>
                      </div>
                    </div>

                    <div className="space-y-1.5 sm:space-y-2 text-xs sm:text-sm">
                      <div className="flex items-center gap-2 text-muted-foreground">
                        <User className="w-3.5 h-3.5 sm:w-4 sm:h-4 flex-shrink-0" />
                        <span className="truncate">Parent: {student.parentName}</span>
                      </div>
                      <div className="flex items-center gap-2 text-muted-foreground">
                        <Mail className="w-3.5 h-3.5 sm:w-4 sm:h-4 flex-shrink-0" />
                        <span className="truncate">{student.email}</span>
                      </div>
                      <div className="flex items-center gap-2 text-muted-foreground">
                        <Phone className="w-3.5 h-3.5 sm:w-4 sm:h-4 flex-shrink-0" />
                        <span>{student.phone}</span>
                      </div>
                    </div>

                    <div className="pt-3 sm:pt-4 border-t border-border">
                      <Badge variant="outline" className="text-primary border-primary text-xs">
                        Class {student.class}
                      </Badge>
                    </div>
                  </div>
                </Card>
              ))}
            </div>
          )}
        </>
      )}

      <StudentDetailDialog
        student={selectedStudent}
        open={detailDialogOpen}
        onOpenChange={setDetailDialogOpen}
      />
    </div>
  );
};

export default Students;
