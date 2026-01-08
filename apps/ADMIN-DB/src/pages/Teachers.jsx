import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { Card } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import {
  Mail,
  Phone,
  Award,
  UserPlus,
  Users as UsersIcon,
  ChevronDown,
} from "lucide-react";
import {
  DropdownMenu,
  DropdownMenuTrigger,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuGroup,
  DropdownMenuSeparator,
} from "@/components/ui/dropdown-menu";
import TeacherDetailDialog from "@/components/TeacherDetailDialog";

const Teachers = () => {
  const [teachers, setTeachers] = useState([]);
  const [selectedClass, setSelectedClass] = useState("");
  const [selectedTeacher, setSelectedTeacher] = useState(null);
  const [detailDialogOpen, setDetailDialogOpen] = useState(false);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [expandedGroups, setExpandedGroups] = useState({});

  // Extract unique classes from teachers (numerical sort)
  const classes = Array.from(
    new Set(
      teachers.length > 0
        ? teachers.flatMap((teacher) => teacher.assignedClasses)
        : []
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
    setTeachers([
      {
        id: 1,
        teacherId: "TCH-2024-001",
        nationalId: "AADHAAR-1234-5678-9012",
        name: "Dr. Sarah Johnson",
        email: "sarah.johnson@lms.com",
        phone: "9876543210",
        subject: "Mathematics",
        experience: 12,
        qualification: "Ph.D in Mathematics",
        assignedClasses: ["Class 6", "Class 7", "Class 8", "Class 9", "Class 10", "Class 11"],
        assignedSubjects: ["Mathematics", "Advanced Mathematics", "Statistics"],
        location: "Mumbai, Maharashtra",
        profilePicture: "https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=400",
        averageGPA: "3.8",
      },
      {
        id: 2,
        teacherId: "TCH-2024-002",
        nationalId: "AADHAAR-2345-6789-0123",
        name: "Prof. Michael Chen",
        email: "michael.chen@lms.com",
        phone: "9876543211",
        subject: "Physics",
        experience: 8,
        qualification: "M.Sc Physics, B.Ed",
        assignedClasses: ["Class 11", "Class 12"],
        assignedSubjects: ["Physics", "Applied Physics"],
        location: "Delhi, Delhi",
        profilePicture: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=400",
        averageGPA: "3.6",
      },
      {
        id: 3,
        teacherId: "TCH-2024-003",
        nationalId: "AADHAAR-3456-7890-1234",
        name: "Ms. Priya Sharma",
        email: "priya.sharma@lms.com",
        phone: "9876543212",
        subject: "English Literature",
        experience: 6,
        qualification: "M.A English, B.Ed",
        assignedClasses: ["Class 1", "Class 2", "Class 3"],
        assignedSubjects: ["English", "Literature", "Grammar"],
        location: "Bangalore, Karnataka",
        profilePicture: "https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=400",
        averageGPA: "3.9",
      },
      {
        id: 4,
        teacherId: "TCH-2024-004",
        nationalId: "AADHAAR-4567-8901-2345",
        name: "Mr. Rahul Verma",
        email: "rahul.verma@lms.com",
        phone: "9876543213",
        subject: "Chemistry",
        experience: 10,
        qualification: "M.Sc Chemistry",
        assignedClasses: ["Class 4", "Class 5", "Class 10", "Class 11", "Class 12"],
        assignedSubjects: ["Chemistry", "Organic Chemistry", "Physical Chemistry"],
        location: "Pune, Maharashtra",
        profilePicture: "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=400",
        averageGPA: "3.7",
      },
    ]);
  }, []);

  // Filter teachers by selected class
  const filteredTeachers =
    selectedClass === ""
      ? teachers
      : teachers.filter((teacher) =>
          teacher.assignedClasses.includes(selectedClass)
        );

  const handleCardClick = (teacher) => {
    setSelectedTeacher(teacher);
    setDetailDialogOpen(true);
  };

  return (
    <div className="space-y-4 md:space-y-6">
      {/* Header section - Responsive */}
      <div className="flex flex-col gap-4">
        {/* Title */}
        <div>
          <h1 className="text-2xl sm:text-3xl font-bold text-foreground">Teachers</h1>
          <p className="text-sm sm:text-base text-muted-foreground mt-1">
            Manage and view all teacher profiles
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
              <DropdownMenuItem 
                onClick={() => setSelectedClass("")}
                className="cursor-pointer p-2 text-sm"
              >
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

          {/* Total Teachers Box - Responsive */}
          <div className="flex items-center justify-between bg-primary/10 border border-primary/20 px-3 sm:px-4 py-2.5 sm:py-3 rounded-xl flex-1 sm:flex-none sm:w-auto h-10 sm:h-12">
            <div className="flex items-center gap-2 w-full sm:w-auto justify-between sm:justify-start">
              <div className="h-4 w-4 sm:h-5 sm:w-5 rounded-full bg-primary/20 flex items-center justify-center text-primary flex-shrink-0">
                <UsersIcon className="w-3 h-3 sm:w-4 sm:h-4" />
              </div>
              <div className="flex items-center gap-2 sm:gap-3">
                <p className="text-xs uppercase tracking-wide text-primary/70">
                  Total Teachers
                </p>
                <p className="text-lg sm:text-xl font-bold text-primary">
                  {filteredTeachers.length}
                </p>
              </div>
            </div>
          </div>

          {/* Add Teacher Button - Responsive */}
          <Button asChild className="h-10 sm:h-12 text-sm w-full sm:w-auto">
            <Link to="/add-teacher" className="flex items-center justify-center gap-2">
              <UserPlus className="w-4 h-4" />
              <span className="hidden xs:inline">Add Teacher</span>
              <span className="xs:hidden">Add Teacher</span>
            </Link>
          </Button>
        </div>
      </div>

      {/* Loading State */}
      {loading && (
        <div className="text-center py-6 sm:py-8">
          <p className="text-sm sm:text-base text-muted-foreground">Loading teachers...</p>
        </div>
      )}

      {/* Error State */}
      {error && (
        <div className="text-center py-6 sm:py-8">
          <p className="text-sm sm:text-base text-destructive">Error loading teachers: {error}</p>
        </div>
      )}

      {/* Teacher Cards */}
      {!loading && !error && (
        <>
          <p className="text-xs sm:text-sm text-muted-foreground mb-3 sm:mb-4">
            Showing {filteredTeachers.length} teacher
            {filteredTeachers.length !== 1 ? "s" : ""}{" "}
            {selectedClass === ""
              ? "across all classes"
              : `in ${selectedClass}`}
          </p>

          {filteredTeachers.length === 0 ? (
            <Card className="p-8 sm:p-12 text-center">
              <p className="text-sm sm:text-base text-muted-foreground">
                No teachers found for this class.
              </p>
            </Card>
          ) : (
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-5 md:gap-6">
              {filteredTeachers.map((teacher) => (
                <Card
                  key={teacher.id}
                  className="p-4 sm:p-5 md:p-6 hover:shadow-lg transition-shadow cursor-pointer"
                  onClick={() => handleCardClick(teacher)}
                >
                  <div className="space-y-3 sm:space-y-4">
                    <div className="flex items-start justify-between">
                      <div className="flex items-center gap-2 sm:gap-3 min-w-0 flex-1">
                        <div className="w-10 h-10 sm:w-12 sm:h-12 rounded-full bg-primary/10 flex items-center justify-center overflow-hidden flex-shrink-0">
                          {teacher.profilePicture ? (
                            <img 
                              src={teacher.profilePicture} 
                              alt={teacher.name}
                              className="w-full h-full object-cover"
                            />
                          ) : (
                            <span className="text-base sm:text-lg font-bold text-primary">
                              {teacher.name
                                .split(" ")
                                .map((n) => n[0])
                                .join("")}
                            </span>
                          )}
                        </div>
                        <div className="min-w-0 flex-1">
                          <h3 className="font-semibold text-sm sm:text-base text-foreground truncate">
                            {teacher.name}
                          </h3>
                          <p className="text-xs sm:text-sm text-muted-foreground truncate">
                            {teacher.subject}
                          </p>
                        </div>
                      </div>
                    </div>
                  </div>
                </Card>
              ))}
            </div>
          )}
        </>
      )}

      <TeacherDetailDialog
        teacher={selectedTeacher}
        open={detailDialogOpen}
        onOpenChange={setDetailDialogOpen}
      />
    </div>
  );
};

export default Teachers;
