import { useState, useEffect } from "react";
import { Card } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Mail, Phone, Users, UserCircle, ChevronDown } from "lucide-react";
import {
  DropdownMenu,
  DropdownMenuTrigger,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
} from "@/components/ui/dropdown-menu";
import ParentDetailDialog from "@/components/ParentDetailDialog";

const Parents = () => {
  const [parents, setParents] = useState([]);
  const [students, setStudents] = useState([]);
  const [selectedClass, setSelectedClass] = useState("");
  const [selectedParent, setSelectedParent] = useState(null);
  const [detailDialogOpen, setDetailDialogOpen] = useState(false);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [expandedGroups, setExpandedGroups] = useState({});

  // Extract unique classes from parents' children (numerical sort)
  const classes = Array.from(
    new Set(
      parents.length > 0
        ? parents.flatMap((parent) =>
            parent.children.map((child) => child.class)
          )
        : []
    )
  ).sort((a, b) => {
    const numA = parseInt(a.match(/\d+/)?.[0] || 0);
    const numB = parseInt(b.match(/\d+/)?.[0] || 0);
    return numA - numB;
  });

  const toggleGroup = (group) => {
    setExpandedGroups(prev => ({
      ...prev,
      [group]: !prev[group]
    }));
  };

  const lowerClasses = classes.filter(cls => {
    const num = parseInt(cls.match(/\d+/)?.[0] || 0);
    return num >= 1 && num <= 5;
  });

  const upperClasses = classes.filter(cls => {
    const num = parseInt(cls.match(/\d+/)?.[0] || 0);
    return num >= 6;
  });

  useEffect(() => {
    // Set students data first
    const studentsData = [
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
        ],
        teacherFeedback: [],
        coursesPurchased: [],
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
        ],
        teacherFeedback: [],
        coursesPurchased: [],
        fees: {
          total: 65000,
          paid: 45000,
          pending: 20000,
          nextDueDate: "2025-01-25"
        }
      },
    ];

    setStudents(studentsData);

    setParents([
      {
        id: 1,
        parentId: "PRT-2024-001",
        name: "Rajesh Sharma",
        email: "rajesh.sharma@parent.com",
        phone: "9876543210",
        address: "123 MG Road, Bandra West, Mumbai, Maharashtra 400050",
        nationalId: "AADHAAR-1234-5678-9012",
        occupation: "Software Engineer",
        registrationDate: "2024-01-10",
        profilePicture: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=400",
        ptmsAttended: 8,
        messagesSent: 12,
        lastLogin: "Today",
        children: [
          { 
            studentId: 1,
            name: "Aarav Sharma", 
            class: "Class 1",
            rollNumber: "2024001" 
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
        parentId: "PRT-2024-002",
        name: "Neha Patel",
        email: "neha.patel@parent.com",
        phone: "9876543211",
        address: "45 Park Street, Andheri East, Mumbai, Maharashtra 400069",
        nationalId: "AADHAAR-2345-6789-0123",
        occupation: "Doctor",
        registrationDate: "2024-01-08",
        profilePicture: "https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=400",
        ptmsAttended: 10,
        messagesSent: 15,
        lastLogin: "Yesterday",
        children: [
          { 
            studentId: 2,
            name: "Diya Patel", 
            class: "Class 1",
            rollNumber: "2024002" 
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
        id: 6,
        parentId: "PRT-2024-006",
        name: "Amit Gupta",
        email: "amit.gupta@parent.com",
        phone: "9876543215",
        address: "89 Rose Garden, Sector 15, Gurgaon, Haryana 122001",
        nationalId: "AADHAAR-6789-0123-4567",
        occupation: "Chartered Accountant",
        registrationDate: "2024-01-05",
        profilePicture: "https://images.unsplash.com/photo-1560250097-0b93528c311a?w=400",
        ptmsAttended: 9,
        messagesSent: 18,
        lastLogin: "Today",
        children: [
          { 
            studentId: 6,
            name: "Ishaan Gupta", 
            class: "Class 3",
            rollNumber: "2024006" 
          },
          { 
            studentId: 7,
            name: "Kavya Gupta", 
            class: "Class 5",
            rollNumber: "2024007" 
          },
        ],
        fees: {
          total: 125000,
          paid: 75000,
          pending: 50000,
          nextDueDate: "2025-01-10"
        }
      },
    ]);
  }, []);

  // Filter parents by selected class
  const filteredParents =
    selectedClass === ""
      ? parents
      : parents.filter((parent) =>
          parent.children.some((child) => child.class === selectedClass)
        );

  const handleCardClick = (parent) => {
    setSelectedParent(parent);
    setDetailDialogOpen(true);
  };

  return (
    <div className="space-y-4 md:space-y-6">
      {/* Header Section - Responsive */}
      <div className="flex flex-col gap-3 sm:flex-row sm:items-start sm:justify-between sm:gap-4">
        <div className="flex-1 min-w-0">
          <h1 className="text-2xl sm:text-3xl font-bold text-foreground truncate">Parents</h1>
          <p className="text-sm sm:text-base text-muted-foreground mt-1">
            View and manage parent information
          </p>
        </div>

        {/* Right Side Controls - Responsive */}
        <div className="flex flex-col sm:flex-row items-stretch sm:items-center gap-3 sm:gap-4">
          {/* Class Filter Dropdown - Responsive */}
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button
                variant="outline"
                className="flex items-center gap-2 h-10 sm:h-12 w-full sm:w-48 md:w-60 justify-between text-sm"
              >
                <span className="truncate">{selectedClass === "" ? "All Classes" : selectedClass}</span>
                <ChevronDown className="w-4 h-4 flex-shrink-0" />
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="end" className="w-[var(--radix-dropdown-menu-trigger-width)] sm:w-60 max-h-80 overflow-y-auto p-1">
              <DropdownMenuItem onClick={() => setSelectedClass("")} className="text-sm">
                All Classes
              </DropdownMenuItem>
              <DropdownMenuSeparator />
              
              <div className="py-1">
                <DropdownMenuItem 
                  className="cursor-pointer p-2 hover:bg-accent text-sm"
                  onClick={() => toggleGroup('lower')}
                  onSelect={(e) => e.preventDefault()}
                >
                  <span className="flex items-center justify-between w-full font-medium">
                    <span>Classes 1-5</span>
                    <ChevronDown className={`w-4 h-4 transition-transform ${expandedGroups.lower ? 'rotate-180' : ''}`} />
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
              
              <div className="py-1">
                <DropdownMenuItem 
                  className="cursor-pointer p-2 hover:bg-accent text-sm"
                  onClick={() => toggleGroup('upper')}
                  onSelect={(e) => e.preventDefault()}
                >
                  <span className="flex items-center justify-between w-full font-medium">
                    <span>Classes 6-12</span>
                    <ChevronDown className={`w-4 h-4 transition-transform ${expandedGroups.upper ? 'rotate-180' : ''}`} />
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

          {/* Total Parents Box - Responsive */}
          <div className="flex items-center justify-between bg-primary/10 border border-primary/20 px-3 sm:px-4 py-2.5 sm:py-3 rounded-xl w-full sm:w-auto sm:min-w-[180px] md:min-w-[192px] h-10 sm:h-12">
            <div className="flex items-center gap-2 w-full sm:w-auto">
              <div className="h-5 w-5 rounded-full bg-primary/20 flex items-center justify-center text-primary flex-shrink-0">
                <Users className="w-4 h-4" />
              </div>
              <div className="text-left flex-1 sm:flex-none">
                <p className="text-xs uppercase tracking-wide text-primary/70">
                  Total Parents
                </p>
                <p className="text-lg sm:text-xl font-bold text-primary">
                  {filteredParents.length}
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Loading / Error States - Responsive */}
      {loading && (
        <div className="text-center py-6 sm:py-8">
          <p className="text-sm sm:text-base text-muted-foreground">Loading parents...</p>
        </div>
      )}

      {error && (
        <div className="text-center py-6 sm:py-8">
          <p className="text-sm sm:text-base text-destructive">Error loading parents: {error}</p>
        </div>
      )}

      {/* Parent Cards - Responsive */}
      {!loading && !error && (
        <>
          <p className="text-xs sm:text-sm text-muted-foreground mb-3 sm:mb-4">
            Showing {filteredParents.length} parent
            {filteredParents.length !== 1 ? "s" : ""}{" "}
            {selectedClass === ""
              ? "across all classes"
              : `in ${selectedClass}`}
          </p>

          {filteredParents.length === 0 ? (
            <Card className="p-8 sm:p-12 text-center">
              <p className="text-sm sm:text-base text-muted-foreground">
                No parents found for this class.
              </p>
            </Card>
          ) : (
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-5 md:gap-6">
              {filteredParents.map((parent) => (
                <Card
                  key={parent.id}
                  className="p-4 sm:p-5 md:p-6 hover:shadow-lg transition-shadow cursor-pointer"
                  onClick={() => handleCardClick(parent)}
                >
                  <div className="space-y-3 sm:space-y-4">
                    {/* Parent Header - Responsive */}
                    <div className="flex items-start justify-between">
                      <div className="flex items-center gap-2 sm:gap-3 min-w-0 flex-1">
                        <div className="w-10 h-10 sm:w-12 sm:h-12 rounded-full overflow-hidden border-2 border-primary/20 flex-shrink-0">
                          {parent.profilePicture ? (
                            <img 
                              src={parent.profilePicture} 
                              alt={parent.name}
                              className="w-full h-full object-cover"
                            />
                          ) : (
                            <div className="w-full h-full bg-primary/10 flex items-center justify-center">
                              <UserCircle className="w-5 h-5 sm:w-6 sm:h-6 text-primary" />
                            </div>
                          )}
                        </div>
                        <div className="min-w-0 flex-1">
                          <h3 className="font-semibold text-sm sm:text-base text-foreground truncate">
                            {parent.name}
                          </h3>
                          <p className="text-xs sm:text-sm text-muted-foreground">
                            {parent.children.length}{" "}
                            {parent.children.length === 1 ? "child" : "children"}
                          </p>
                        </div>
                      </div>
                    </div>

                    {/* Contact Info - Responsive */}
                    <div className="space-y-1.5 sm:space-y-2 text-xs sm:text-sm">
                      <div className="flex items-center gap-2 text-muted-foreground">
                        <Mail className="w-3.5 h-3.5 sm:w-4 sm:h-4 flex-shrink-0" />
                        <span className="truncate">{parent.email}</span>
                      </div>
                      <div className="flex items-center gap-2 text-muted-foreground">
                        <Phone className="w-3.5 h-3.5 sm:w-4 sm:h-4 flex-shrink-0" />
                        <span>{parent.phone}</span>
                      </div>
                    </div>

                    {/* Children List - Responsive */}
                    <div className="pt-3 sm:pt-4 border-t border-border">
                      <p className="text-xs sm:text-sm font-medium text-muted-foreground mb-1.5 sm:mb-2">
                        Children
                      </p>
                      <div className="space-y-1">
                        {parent.children.map((child, idx) => (
                          <div
                            key={idx}
                            className="flex items-center justify-between gap-2"
                          >
                            <span className="text-xs sm:text-sm text-foreground truncate">
                              {child.name}
                            </span>
                            <Badge variant="secondary" className="text-xs flex-shrink-0">
                              {child.class}
                            </Badge>
                          </div>
                        ))}
                      </div>
                    </div>
                  </div>
                </Card>
              ))}
            </div>
          )}
        </>
      )}

      <ParentDetailDialog
        parent={selectedParent}
        open={detailDialogOpen}
        onOpenChange={setDetailDialogOpen}
        allStudents={students}
      />
    </div>
  );
};

export default Parents;
