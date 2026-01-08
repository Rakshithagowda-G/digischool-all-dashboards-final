import { useState, useEffect } from "react";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { UserPlus, Plus } from "lucide-react";
import {
  Tabs,
  TabsList,
  TabsTrigger,
  TabsContent,
} from "@/components/ui/tabs";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogFooter,
} from "@/components/ui/dialog";
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
} from "@/components/ui/alert-dialog";
import {
  CheckCircle,
  XCircle,
  Mail,
  Phone,
  User,
  FileText,
  Upload,
  Eye,
  Calendar,
  MapPin,
  CreditCard,
  Users,
  Briefcase,
  Edit,
  Save,
  X,
} from "lucide-react";
import { Link } from "react-router-dom";
import { Badge } from "@/components/ui/badge";
import { toast } from "sonner";

const Requests = () => {
  const [studentRequests, setStudentRequests] = useState([]);
  const [teacherContentRequests, setTeacherContentRequests] = useState([]);
  const [teacherRecruitmentRequests, setTeacherRecruitmentRequests] = useState([]);
  const [dialogOpen, setDialogOpen] = useState(false);
  const [detailDialogOpen, setDetailDialogOpen] = useState(false);
  const [imageViewerOpen, setImageViewerOpen] = useState(false);
  const [selectedImage, setSelectedImage] = useState("");
  const [selectedRequest, setSelectedRequest] = useState(null);
  const [actionType, setActionType] = useState("accept");
  const [requestType, setRequestType] = useState("student");
  
  // Edit mode states for teacher recruitment
  const [editMode, setEditMode] = useState(false);
  const [tempSubjects, setTempSubjects] = useState([]);
  const [tempAssignedClasses, setTempAssignedClasses] = useState([]);

  // Available subjects and classes for editing
  const availableSubjects = [
    "Mathematics",
    "Science",
    "English",
    "Hindi",
    "Social Studies",
    "Physics",
    "Chemistry",
    "Biology",
    "Computer Science",
    "History",
    "Geography",
    "Economics",
    "Physical Education",
  ];

  const availableClasses = Array.from({ length: 12 }, (_, i) => `Class ${i + 1}`);

  useEffect(() => {
    // Mock student data with all fields from AddStudent form
    setStudentRequests([
      {
        id: 1,
        firstName: "John",
        lastName: "Smith",
        gender: "Male",
        dateOfBirth: "2015-05-20",
        email: "john.smith@email.com",
        phone: "9876543210",
        class: "Class 5",
        academicYear: "2024-2025",
        studentId: "STU-2024-001",
        discoverySource: "Google Search",
        parentName: "Robert Smith",
        parentEmail: "robert.smith@email.com",
        parentPhone: "9876543200",
        relationship: "Father",
        country: "India",
        state: "Maharashtra",
        city: "Mumbai",
        pincode: "400001",
        address: "123 Main St, Andheri West",
        requestDate: "2024-01-15",
        profilePicture: "https://images.unsplash.com/photo-1546456073-92b9f0a8d413?w=400",
        governmentProof: "https://images.unsplash.com/photo-1554224155-6726b3ff858f?w=400",
      },
      {
        id: 2,
        firstName: "Emma",
        lastName: "Wilson",
        gender: "Female",
        dateOfBirth: "2017-08-15",
        email: "emma.wilson@email.com",
        phone: "9876543211",
        class: "Class 3",
        academicYear: "2024-2025",
        studentId: "STU-2024-002",
        discoverySource: "School Recommendation",
        parentName: "Sarah Wilson",
        parentEmail: "sarah.wilson@email.com",
        parentPhone: "9876543201",
        relationship: "Mother",
        country: "India",
        state: "Delhi",
        city: "New Delhi",
        pincode: "110001",
        address: "456 Park Ave, Connaught Place",
        requestDate: "2024-01-16",
        profilePicture: "https://images.unsplash.com/photo-1554780336-390462301acf?w=400",
        governmentProof: "https://images.unsplash.com/photo-1589829085413-56de8ae18c73?w=400",
      },
    ]);

    setTeacherContentRequests([
      {
        id: 1,
        teacherName: "Dr. Sarah Johnson",
        type: "Notes",
        subject: "Mathematics",
        class: "Class 10",
        title: "Quadratic Equations - Chapter 4",
        description: "Comprehensive notes covering quadratic equations, formulas, and problem-solving techniques",
        fileName: "quadratic_equations_notes.pdf",
        fileSize: "2.5 MB",
        requestDate: "2024-01-18",
      },
      {
        id: 2,
        teacherName: "Prof. Michael Chen",
        type: "Assignment",
        subject: "Physics",
        class: "Class 12",
        title: "Laws of Motion - Practice Problems",
        description: "Assignment containing 15 problems on Newton's laws of motion with varying difficulty levels",
        fileName: "motion_assignment.pdf",
        fileSize: "1.8 MB",
        requestDate: "2024-01-17",
      },
      {
        id: 3,
        teacherName: "Ms. Priya Sharma",
        type: "Exam",
        subject: "English",
        class: "Class 8",
        title: "Mid-Term Examination Paper",
        description: "Mid-term exam paper covering comprehension, grammar, and essay writing",
        fileName: "english_midterm.pdf",
        fileSize: "3.2 MB",
        requestDate: "2024-01-19",
      },
    ]);

    // Mock teacher recruitment data with all fields from AddTeacher form
    setTeacherRecruitmentRequests([
      {
        id: 1,
        firstName: "Raj",
        lastName: "Kumar",
        email: "raj.kumar@email.com",
        phone: "9876543222",
        gender: "Male",
        nationalId: "AADHR-1234-5678-9012",
        subjects: ["Mathematics", "Physics"],
        assignedClasses: ["Class 10", "Class 11", "Class 12"],
        experience: "5",
        qualification: "M.Sc, B.Ed",
        country: "India",
        state: "Karnataka",
        city: "Bangalore",
        requestDate: "2024-01-20",
        dateOfBirth: "1990-03-15",
        profilePicture: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=400",
      },
      {
        id: 2,
        firstName: "Anita",
        lastName: "Verma",
        email: "anita.verma@email.com",
        phone: "9876543333",
        gender: "Female",
        nationalId: "AADHR-9876-5432-1098",
        subjects: ["English", "Hindi"],
        assignedClasses: ["Class 6", "Class 7", "Class 8"],
        experience: "3",
        qualification: "M.A, B.Ed",
        country: "India",
        state: "Maharashtra",
        city: "Pune",
        requestDate: "2024-01-21",
        dateOfBirth: "1992-07-22",
        profilePicture: "https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=400",
      },
    ]);
  }, []);

  const handleCardClick = (request, type) => {
    setSelectedRequest(request);
    setRequestType(type);
    setDetailDialogOpen(true);
    setEditMode(false);
    if (type === "teacher-recruitment") {
      setTempSubjects(request.subjects);
      setTempAssignedClasses(request.assignedClasses);
    }
  };

  const handleAction = (request, action, type) => {
    setSelectedRequest(request);
    setActionType(action);
    setRequestType(type);
    setDetailDialogOpen(false);
    setDialogOpen(true);
  };

  const handleImageView = (imageUrl) => {
    setSelectedImage(imageUrl);
    setImageViewerOpen(true);
  };

  // Start editing
  const handleEditStart = () => {
    setEditMode(true);
    setTempSubjects(selectedRequest.subjects);
    setTempAssignedClasses(selectedRequest.assignedClasses);
  };

  // Cancel editing
  const handleEditCancel = () => {
    setEditMode(false);
    setTempSubjects(selectedRequest.subjects);
    setTempAssignedClasses(selectedRequest.assignedClasses);
  };

  // Save edits
  const handleEditSave = () => {
    if (tempSubjects.length === 0) {
      toast.error("Please select at least one subject");
      return;
    }
    if (tempAssignedClasses.length === 0) {
      toast.error("Please select at least one class");
      return;
    }

    const updatedRequest = {
      ...selectedRequest,
      subjects: tempSubjects,
      assignedClasses: tempAssignedClasses,
    };
    setSelectedRequest(updatedRequest);

    setTeacherRecruitmentRequests(prev =>
      prev.map(req => req.id === updatedRequest.id ? updatedRequest : req)
    );

    setEditMode(false);
    toast.success("Subjects and classes updated successfully!");
  };

  // Toggle subject selection
  const toggleSubject = (subject) => {
    setTempSubjects(prev =>
      prev.includes(subject)
        ? prev.filter(s => s !== subject)
        : [...prev, subject]
    );
  };

  // Toggle class selection
  const toggleClass = (className) => {
    setTempAssignedClasses(prev =>
      prev.includes(className)
        ? prev.filter(c => c !== className)
        : [...prev, className]
    );
  };

  const confirmAction = async () => {
    if (selectedRequest) {
      if (requestType === "student") {
        setStudentRequests(prev =>
          prev.filter(req => req.id !== selectedRequest.id)
        );
      } else if (requestType === "teacher-content") {
        setTeacherContentRequests(prev =>
          prev.filter(req => req.id !== selectedRequest.id)
        );
      } else if (requestType === "teacher-recruitment") {
        setTeacherRecruitmentRequests(prev =>
          prev.filter(req => req.id !== selectedRequest.id)
        );
      }

      toast.success(
        `${
          requestType === "student"
            ? "Student"
            : requestType === "teacher-content"
            ? "Teacher content"
            : "Teacher recruitment"
        } ${actionType === "accept" ? "accepted" : "declined"} successfully!`
      );
    }
    setDialogOpen(false);
    setSelectedRequest(null);
  };

  const totalTeacherRequests = teacherContentRequests.length + teacherRecruitmentRequests.length;

  return (
    <div className="space-y-4 md:space-y-6">
      {/* HEADER - Responsive */}
      <div className="flex flex-col sm:flex-row items-start sm:items-center sm:justify-between gap-3 sm:gap-4">
        <div className="flex-1 min-w-0">
          <h1 className="text-2xl sm:text-3xl font-bold text-foreground truncate">Requests</h1>
          <p className="text-sm sm:text-base text-muted-foreground mt-1">
            Review and manage student registrations and teacher content uploads
          </p>
        </div>
        
        {/* ADD BUTTONS - Responsive */}
        <div className="flex items-center gap-2 sm:gap-3 w-full sm:w-auto">
          <Button asChild className="flex items-center gap-2 bg-primary hover:bg-primary/90 shadow-lg h-9 sm:h-10 px-3 sm:px-4 flex-1 sm:flex-none text-sm">
            <Link to="/add-student">
              <Plus className="w-3.5 h-3.5 sm:w-4 sm:h-4" />
              <span className="hidden xs:inline">Add Student</span>
              <span className="xs:hidden">Add Student</span>
            </Link>
          </Button>
          
          <Button asChild className="flex items-center gap-2 bg-primary hover:bg-primary/90 shadow-lg h-9 sm:h-10 px-3 sm:px-4 flex-1 sm:flex-none text-sm">
            <Link to="/add-teacher">
              <Plus className="w-3.5 h-3.5 sm:w-4 sm:h-4" />
              <span className="hidden xs:inline">Add Teacher</span>
              <span className="xs:hidden">Add Teacher</span>
            </Link>
          </Button>
        </div>
      </div>

      <Tabs defaultValue="students" className="w-full">
        <TabsList className="grid w-full max-w-full sm:max-w-md grid-cols-2 h-auto">
          <TabsTrigger value="students" className="text-xs sm:text-sm px-2 sm:px-4">
            <span className="hidden sm:inline">Student Requests ({studentRequests.length})</span>
            <span className="sm:hidden">Students ({studentRequests.length})</span>
          </TabsTrigger>
          <TabsTrigger value="teachers" className="text-xs sm:text-sm px-2 sm:px-4">
            <span className="hidden sm:inline">Teacher Requests ({totalTeacherRequests})</span>
            <span className="sm:hidden">Teachers ({totalTeacherRequests})</span>
          </TabsTrigger>
        </TabsList>

        <TabsContent value="students" className="mt-4 sm:mt-6">
          {studentRequests.length === 0 ? (
            <Card className="p-8 sm:p-12 text-center">
              <div className="w-12 h-12 sm:w-16 sm:h-16 rounded-full bg-muted mx-auto mb-3 sm:mb-4 flex items-center justify-center">
                <Mail className="w-6 h-6 sm:w-8 sm:h-8 text-muted-foreground" />
              </div>
              <h3 className="text-lg sm:text-xl font-semibold text-foreground mb-1 sm:mb-2">
                No Pending Student Requests
              </h3>
              <p className="text-sm sm:text-base text-muted-foreground">
                All student registration requests have been processed.
              </p>
            </Card>
          ) : (
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-5 md:gap-6">
              {studentRequests.map((request) => (
                <Card
                  key={request.id}
                  className="p-4 sm:p-5 md:p-6 hover:shadow-lg transition-shadow cursor-pointer"
                  onClick={() => handleCardClick(request, "student")}
                >
                  <div className="space-y-3 sm:space-y-4">
                    <div className="flex items-start justify-between">
                      <div className="flex items-center gap-2 sm:gap-3 min-w-0 flex-1">
                        <div className="w-10 h-10 sm:w-12 sm:h-12 rounded-full bg-primary/10 flex items-center justify-center overflow-hidden flex-shrink-0">
                          {request.profilePicture ? (
                            <img 
                              src={request.profilePicture} 
                              alt={`${request.firstName} ${request.lastName}`}
                              className="w-full h-full object-cover"
                            />
                          ) : (
                            <User className="w-5 h-5 sm:w-6 sm:h-6 text-primary" />
                          )}
                        </div>
                        <div className="min-w-0 flex-1">
                          <h3 className="font-semibold text-sm sm:text-base text-foreground truncate">
                            {request.firstName} {request.lastName}
                          </h3>
                          <p className="text-xs sm:text-sm text-muted-foreground truncate">
                            {request.class}
                          </p>
                        </div>
                      </div>
                    </div>
                    <div className="space-y-1.5 sm:space-y-2 text-xs sm:text-sm">
                      <div className="flex items-center gap-2 text-muted-foreground">
                        <Mail className="w-3.5 h-3.5 sm:w-4 sm:h-4 flex-shrink-0" />
                        <span className="truncate">{request.email}</span>
                      </div>
                      <div className="flex items-center gap-2 text-muted-foreground">
                        <Phone className="w-3.5 h-3.5 sm:w-4 sm:h-4 flex-shrink-0" />
                        <span>{request.phone}</span>
                      </div>
                      <div className="flex items-center gap-2 text-muted-foreground">
                        <User className="w-3.5 h-3.5 sm:w-4 sm:h-4 flex-shrink-0" />
                        <span className="truncate">Parent: {request.parentName}</span>
                      </div>
                    </div>
                    <div className="pt-3 sm:pt-4 border-t border-border">
                      <p className="text-xs text-muted-foreground">
                        Requested on {new Date(request.requestDate).toLocaleDateString()}
                      </p>
                    </div>
                  </div>
                </Card>
              ))}
            </div>
          )}
        </TabsContent>

        <TabsContent value="teachers" className="mt-4 sm:mt-6 space-y-6 sm:space-y-8">
          {/* SECTION 1: Content Upload Requests */}
          <section className="space-y-3 sm:space-y-4">
            <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-2 sm:gap-4">
              <div className="flex-1 min-w-0">
                <h2 className="text-lg sm:text-xl font-semibold truncate">Content Upload Requests</h2>
                <p className="text-xs sm:text-sm text-muted-foreground mt-1">
                  Manage notes, assignments, and exam paper submissions
                </p>
              </div>
              <Badge variant="secondary" className="text-xs sm:text-sm self-start sm:self-auto">
                {teacherContentRequests.length} pending
              </Badge>
            </div>

            {teacherContentRequests.length === 0 ? (
              <Card className="p-6 sm:p-8 text-center">
                <div className="w-12 h-12 sm:w-16 sm:h-16 rounded-full bg-muted mx-auto mb-3 sm:mb-4 flex items-center justify-center">
                  <Upload className="w-6 h-6 sm:w-8 sm:h-8 text-muted-foreground" />
                </div>
                <h3 className="text-base sm:text-lg font-semibold text-foreground mb-1 sm:mb-2">
                  No Pending Content Requests
                </h3>
                <p className="text-sm sm:text-base text-muted-foreground">
                  All teacher content upload requests have been processed.
                </p>
              </Card>
            ) : (
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-5 md:gap-6">
                {teacherContentRequests.map((request) => (
                  <Card
                    key={request.id}
                    className="p-4 sm:p-5 md:p-6 hover:shadow-lg transition-shadow cursor-pointer"
                    onClick={() => handleCardClick(request, "teacher-content")}
                  >
                    <div className="space-y-3 sm:space-y-4">
                      <div className="flex items-start justify-between">
                        <div className="flex items-center gap-2 sm:gap-3 min-w-0 flex-1">
                          <div className="w-10 h-10 sm:w-12 sm:h-12 rounded-full bg-primary/10 flex items-center justify-center flex-shrink-0">
                            <FileText className="w-5 h-5 sm:w-6 sm:h-6 text-primary" />
                          </div>
                          <div className="min-w-0 flex-1">
                            <h3 className="font-semibold text-sm sm:text-base text-foreground line-clamp-1">
                              {request.title}
                            </h3>
                            <p className="text-xs sm:text-sm text-muted-foreground truncate">
                              {request.subject} - {request.class}
                            </p>
                          </div>
                        </div>
                      </div>
                      <Badge
                        variant="outline"
                        className={`text-xs ${
                          request.type === "Notes"
                            ? "border-blue-500 text-blue-500"
                            : request.type === "Assignment"
                            ? "border-orange-500 text-orange-500"
                            : "border-red-500 text-red-500"
                        }`}
                      >
                        {request.type}
                      </Badge>
                      <div className="space-y-1.5 sm:space-y-2 text-xs sm:text-sm">
                        <div className="flex items-center gap-2 text-muted-foreground">
                          <User className="w-3.5 h-3.5 sm:w-4 sm:h-4 flex-shrink-0" />
                          <span className="truncate">{request.teacherName}</span>
                        </div>
                        <div className="flex items-center gap-2 text-muted-foreground">
                          <Upload className="w-3.5 h-3.5 sm:w-4 sm:h-4 flex-shrink-0" />
                          <span className="truncate">
                            {request.fileName} ({request.fileSize})
                          </span>
                        </div>
                      </div>
                      <div className="pt-3 sm:pt-4 border-t border-border">
                        <p className="text-xs text-muted-foreground">
                          Requested on {new Date(request.requestDate).toLocaleDateString()}
                        </p>
                      </div>
                    </div>
                  </Card>
                ))}
              </div>
            )}
          </section>

          {/* SECTION 2: Teacher Recruitment Requests */}
          <section className="space-y-3 sm:space-y-4">
            <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-2 sm:gap-4">
              <div className="flex-1 min-w-0">
                <h2 className="text-lg sm:text-xl font-semibold truncate">Teacher Recruitment Requests</h2>
                <p className="text-xs sm:text-sm text-muted-foreground mt-1">
                  Review and manage teacher applications
                </p>
              </div>
              <Badge variant="secondary" className="text-xs sm:text-sm self-start sm:self-auto">
                {teacherRecruitmentRequests.length} pending
              </Badge>
            </div>

            {teacherRecruitmentRequests.length === 0 ? (
              <Card className="p-6 sm:p-8 text-center">
                <div className="w-12 h-12 sm:w-16 sm:h-16 rounded-full bg-muted mx-auto mb-3 sm:mb-4 flex items-center justify-center">
                  <UserPlus className="w-6 h-6 sm:w-8 sm:h-8 text-muted-foreground" />
                </div>
                <h3 className="text-base sm:text-lg font-semibold text-foreground mb-1 sm:mb-2">
                  No Pending Recruitment Requests
                </h3>
                <p className="text-sm sm:text-base text-muted-foreground">
                  All teacher recruitment requests have been processed.
                </p>
              </Card>
            ) : (
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-5 md:gap-6">
                {teacherRecruitmentRequests.map((request) => (
                  <Card
                    key={request.id}
                    className="p-4 sm:p-5 md:p-6 hover:shadow-lg transition-shadow cursor-pointer"
                    onClick={() => handleCardClick(request, "teacher-recruitment")}
                  >
                    <div className="space-y-3 sm:space-y-4">
                      <div className="flex items-start justify-between">
                        <div className="flex items-center gap-2 sm:gap-3 min-w-0 flex-1">
                          <div className="w-10 h-10 sm:w-12 sm:h-12 rounded-full bg-primary/10 flex items-center justify-center overflow-hidden flex-shrink-0">
                            {request.profilePicture ? (
                              <img 
                                src={request.profilePicture} 
                                alt={`${request.firstName} ${request.lastName}`}
                                className="w-full h-full object-cover"
                              />
                            ) : (
                              <UserPlus className="w-5 h-5 sm:w-6 sm:h-6 text-primary" />
                            )}
                          </div>
                          <div className="min-w-0 flex-1">
                            <h3 className="font-semibold text-sm sm:text-base text-foreground truncate">
                              {request.firstName} {request.lastName}
                            </h3>
                            <p className="text-xs sm:text-sm text-muted-foreground truncate">
                              {request.subjects.join(", ")}
                            </p>
                          </div>
                        </div>
                      </div>
                      <div className="space-y-1.5 sm:space-y-2 text-xs sm:text-sm">
                        <div className="flex items-center gap-2 text-muted-foreground">
                          <Mail className="w-3.5 h-3.5 sm:w-4 sm:h-4 flex-shrink-0" />
                          <span className="truncate">{request.email}</span>
                        </div>
                        <div className="flex items-center gap-2 text-muted-foreground">
                          <Phone className="w-3.5 h-3.5 sm:w-4 sm:h-4 flex-shrink-0" />
                          <span>{request.phone}</span>
                        </div>
                        <div className="flex items-center gap-2 text-muted-foreground">
                          <FileText className="w-3.5 h-3.5 sm:w-4 sm:h-4 flex-shrink-0" />
                          <span className="truncate">
                            {request.experience} years · {request.qualification}
                          </span>
                        </div>
                      </div>
                      <div className="pt-3 sm:pt-4 border-t border-border">
                        <p className="text-xs text-muted-foreground">
                          Applied on {new Date(request.requestDate).toLocaleDateString()}
                        </p>
                      </div>
                    </div>
                  </Card>
                ))}
              </div>
            )}
          </section>
        </TabsContent>
      </Tabs>

      {/* Detail Dialog - Responsive */}
      <Dialog open={detailDialogOpen} onOpenChange={setDetailDialogOpen}>
        <DialogContent className="w-[95vw] max-w-3xl max-h-[85vh] overflow-y-auto p-4 sm:p-6">
          <DialogHeader>
            <DialogTitle className="text-lg sm:text-xl md:text-2xl">
              {requestType === "student"
                ? "Student Request Details"
                : requestType === "teacher-content"
                ? "Teacher Upload Request"
                : "Teacher Recruitment Request"}
            </DialogTitle>
          </DialogHeader>
          {selectedRequest &&
            (requestType === "student" ? (
              <div className="space-y-4 sm:space-y-6">
                {/* Profile Picture Section - Responsive */}
                <div className="flex items-center justify-center pb-3 sm:pb-4 border-b">
                  <div className="relative">
                    <div className="w-24 h-24 sm:w-28 sm:h-28 md:w-32 md:h-32 rounded-full overflow-hidden border-4 border-primary/20">
                      {selectedRequest.profilePicture ? (
                        <img 
                          src={selectedRequest.profilePicture} 
                          alt={`${selectedRequest.firstName} ${selectedRequest.lastName}`}
                          className="w-full h-full object-cover"
                        />
                      ) : (
                        <div className="w-full h-full bg-primary/10 flex items-center justify-center">
                          <User className="w-12 h-12 sm:w-14 sm:h-14 md:w-16 md:h-16 text-primary" />
                        </div>
                      )}
                    </div>
                    {selectedRequest.profilePicture && (
                      <Button
                        size="sm"
                        variant="secondary"
                        className="absolute bottom-0 right-0 rounded-full w-8 h-8 sm:w-10 sm:h-10 p-0"
                        onClick={(e) => {
                          e.stopPropagation();
                          handleImageView(selectedRequest.profilePicture);
                        }}
                      >
                        <Eye className="w-3.5 h-3.5 sm:w-4 sm:h-4" />
                      </Button>
                    )}
                  </div>
                </div>

                {/* Student Information - Responsive Grid */}
                <div className="space-y-3 sm:space-y-4">
                  <h3 className="text-base sm:text-lg font-semibold flex items-center gap-2">
                    <User className="w-4 h-4 sm:w-5 sm:h-5 text-primary" />
                    Student Information
                  </h3>
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 sm:gap-4">
                    <div className="space-y-1">
                      <p className="text-xs sm:text-sm text-muted-foreground">First Name</p>
                      <p className="text-sm sm:text-base font-medium">{selectedRequest.firstName}</p>
                    </div>
                    <div className="space-y-1">
                      <p className="text-xs sm:text-sm text-muted-foreground">Last Name</p>
                      <p className="text-sm sm:text-base font-medium">{selectedRequest.lastName}</p>
                    </div>
                    <div className="space-y-1">
                      <p className="text-xs sm:text-sm text-muted-foreground">Gender</p>
                      <p className="text-sm sm:text-base font-medium">{selectedRequest.gender}</p>
                    </div>
                    <div className="space-y-1">
                      <p className="text-xs sm:text-sm text-muted-foreground">Date of Birth</p>
                      <p className="text-sm sm:text-base font-medium">
                        {new Date(selectedRequest.dateOfBirth).toLocaleDateString()}
                      </p>
                    </div>
                    <div className="space-y-1">
                      <p className="text-xs sm:text-sm text-muted-foreground">Student ID</p>
                      <p className="text-sm sm:text-base font-medium">{selectedRequest.studentId}</p>
                    </div>
                    <div className="space-y-1">
                      <p className="text-xs sm:text-sm text-muted-foreground">Class</p>
                      <p className="text-sm sm:text-base font-medium">{selectedRequest.class}</p>
                    </div>
                    <div className="space-y-1">
                      <p className="text-xs sm:text-sm text-muted-foreground">Academic Year</p>
                      <p className="text-sm sm:text-base font-medium">{selectedRequest.academicYear}</p>
                    </div>
                    <div className="space-y-1">
                      <p className="text-xs sm:text-sm text-muted-foreground">Discovery Source</p>
                      <p className="text-sm sm:text-base font-medium">{selectedRequest.discoverySource}</p>
                    </div>
                  </div>
                </div>

                {/* Contact Information - Responsive */}
                <div className="space-y-3 sm:space-y-4 pt-3 sm:pt-4 border-t">
                  <h3 className="text-base sm:text-lg font-semibold flex items-center gap-2">
                    <Mail className="w-4 h-4 sm:w-5 sm:h-5 text-primary" />
                    Contact Information
                  </h3>
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 sm:gap-4">
                    <div className="space-y-1">
                      <p className="text-xs sm:text-sm text-muted-foreground">Email</p>
                      <p className="text-sm sm:text-base font-medium break-all">{selectedRequest.email}</p>
                    </div>
                    <div className="space-y-1">
                      <p className="text-xs sm:text-sm text-muted-foreground">Phone</p>
                      <p className="text-sm sm:text-base font-medium">{selectedRequest.phone}</p>
                    </div>
                  </div>
                </div>

                {/* Parent Information - Responsive */}
                <div className="space-y-3 sm:space-y-4 pt-3 sm:pt-4 border-t">
                  <h3 className="text-base sm:text-lg font-semibold flex items-center gap-2">
                    <Users className="w-4 h-4 sm:w-5 sm:h-5 text-primary" />
                    Parent/Guardian Information
                  </h3>
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 sm:gap-4">
                    <div className="space-y-1">
                      <p className="text-xs sm:text-sm text-muted-foreground">Parent Name</p>
                      <p className="text-sm sm:text-base font-medium">{selectedRequest.parentName}</p>
                    </div>
                    <div className="space-y-1">
                      <p className="text-xs sm:text-sm text-muted-foreground">Relationship</p>
                      <p className="text-sm sm:text-base font-medium">{selectedRequest.relationship}</p>
                    </div>
                    <div className="space-y-1">
                      <p className="text-xs sm:text-sm text-muted-foreground">Parent Email</p>
                      <p className="text-sm sm:text-base font-medium break-all">{selectedRequest.parentEmail}</p>
                    </div>
                    <div className="space-y-1">
                      <p className="text-xs sm:text-sm text-muted-foreground">Parent Phone</p>
                      <p className="text-sm sm:text-base font-medium">{selectedRequest.parentPhone}</p>
                    </div>
                  </div>
                </div>

                {/* Address Information - Responsive */}
                <div className="space-y-3 sm:space-y-4 pt-3 sm:pt-4 border-t">
                  <h3 className="text-base sm:text-lg font-semibold flex items-center gap-2">
                    <MapPin className="w-4 h-4 sm:w-5 sm:h-5 text-primary" />
                    Address Information
                  </h3>
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 sm:gap-4">
                    <div className="space-y-1">
                      <p className="text-xs sm:text-sm text-muted-foreground">Country</p>
                      <p className="text-sm sm:text-base font-medium">{selectedRequest.country}</p>
                    </div>
                    <div className="space-y-1">
                      <p className="text-xs sm:text-sm text-muted-foreground">State</p>
                      <p className="text-sm sm:text-base font-medium">{selectedRequest.state}</p>
                    </div>
                    <div className="space-y-1">
                      <p className="text-xs sm:text-sm text-muted-foreground">City</p>
                      <p className="text-sm sm:text-base font-medium">{selectedRequest.city}</p>
                    </div>
                    <div className="space-y-1">
                      <p className="text-xs sm:text-sm text-muted-foreground">Pincode</p>
                      <p className="text-sm sm:text-base font-medium">{selectedRequest.pincode}</p>
                    </div>
                    <div className="space-y-1 sm:col-span-2">
                      <p className="text-xs sm:text-sm text-muted-foreground">Full Address</p>
                      <p className="text-sm sm:text-base font-medium">{selectedRequest.address}</p>
                    </div>
                  </div>
                </div>

                {/* Government Proof - Responsive */}
                {selectedRequest.governmentProof && (
                  <div className="space-y-3 sm:space-y-4 pt-3 sm:pt-4 border-t">
                    <h3 className="text-base sm:text-lg font-semibold flex items-center gap-2">
                      <CreditCard className="w-4 h-4 sm:w-5 sm:h-5 text-primary" />
                      Government Proof
                    </h3>
                    <div className="relative inline-block">
                      <img 
                        src={selectedRequest.governmentProof} 
                        alt="Government proof" 
                        className="w-40 h-40 sm:w-48 sm:h-48 object-cover rounded-lg border-2 border-muted cursor-pointer"
                        onClick={() => handleImageView(selectedRequest.governmentProof)}
                      />
                      <Button
                        size="sm"
                        variant="secondary"
                        className="absolute bottom-2 right-2 rounded-full w-8 h-8 sm:w-10 sm:h-10 p-0"
                        onClick={(e) => {
                          e.stopPropagation();
                          handleImageView(selectedRequest.governmentProof);
                        }}
                      >
                        <Eye className="w-3.5 h-3.5 sm:w-4 sm:h-4" />
                      </Button>
                    </div>
                  </div>
                )}

                {/* Request Date - Responsive */}
                <div className="space-y-3 sm:space-y-4 pt-3 sm:pt-4 border-t">
                  <div className="flex items-center gap-2 text-muted-foreground">
                    <Calendar className="w-3.5 h-3.5 sm:w-4 sm:h-4 flex-shrink-0" />
                    <span className="text-xs sm:text-sm">
                      Request submitted on {new Date(selectedRequest.requestDate).toLocaleDateString('en-US', { 
                        year: 'numeric', 
                        month: 'long', 
                        day: 'numeric' 
                      })}
                    </span>
                  </div>
                </div>
              </div>
            ) : requestType === "teacher-content" ? (
              <div className="space-y-4 sm:space-y-6">
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 sm:gap-4">
                  <div className="space-y-1">
                    <p className="text-xs sm:text-sm text-muted-foreground">Teacher Name</p>
                    <p className="text-sm sm:text-base font-medium">{selectedRequest.teacherName}</p>
                  </div>
                  <div className="space-y-1">
                    <p className="text-xs sm:text-sm text-muted-foreground">Type</p>
                    <Badge
                      variant="outline"
                      className={`text-xs ${
                        selectedRequest.type === "Notes"
                          ? "border-blue-500 text-blue-500"
                          : selectedRequest.type === "Assignment"
                          ? "border-orange-500 text-orange-500"
                          : "border-red-500 text-red-500"
                      }`}
                    >
                      {selectedRequest.type}
                    </Badge>
                  </div>
                  <div className="space-y-1">
                    <p className="text-xs sm:text-sm text-muted-foreground">Subject</p>
                    <p className="text-sm sm:text-base font-medium">{selectedRequest.subject}</p>
                  </div>
                  <div className="space-y-1">
                    <p className="text-xs sm:text-sm text-muted-foreground">Class</p>
                    <p className="text-sm sm:text-base font-medium">{selectedRequest.class}</p>
                  </div>
                  <div className="space-y-1 sm:col-span-2">
                    <p className="text-xs sm:text-sm text-muted-foreground">Title</p>
                    <p className="text-sm sm:text-base font-medium">{selectedRequest.title}</p>
                  </div>
                  <div className="space-y-1 sm:col-span-2">
                    <p className="text-xs sm:text-sm text-muted-foreground">Description</p>
                    <p className="text-sm sm:text-base font-medium">{selectedRequest.description}</p>
                  </div>
                  <div className="space-y-1">
                    <p className="text-xs sm:text-sm text-muted-foreground">File Name</p>
                    <p className="text-sm sm:text-base font-medium break-all">{selectedRequest.fileName}</p>
                  </div>
                  <div className="space-y-1">
                    <p className="text-xs sm:text-sm text-muted-foreground">File Size</p>
                    <p className="text-sm sm:text-base font-medium">{selectedRequest.fileSize}</p>
                  </div>
                  <div className="space-y-1">
                    <p className="text-xs sm:text-sm text-muted-foreground">Request Date</p>
                    <p className="text-sm sm:text-base font-medium">
                      {new Date(selectedRequest.requestDate).toLocaleDateString()}
                    </p>
                  </div>
                </div>
              </div>
            ) : (
              <div className="space-y-4 sm:space-y-6">
                {/* Profile Picture Section - Responsive */}
                <div className="flex items-center justify-center pb-3 sm:pb-4 border-b">
                  <div className="relative">
                    <div className="w-24 h-24 sm:w-28 sm:h-28 md:w-32 md:h-32 rounded-full overflow-hidden border-4 border-primary/20">
                      {selectedRequest.profilePicture ? (
                        <img 
                          src={selectedRequest.profilePicture} 
                          alt={`${selectedRequest.firstName} ${selectedRequest.lastName}`}
                          className="w-full h-full object-cover"
                        />
                      ) : (
                        <div className="w-full h-full bg-primary/10 flex items-center justify-center">
                          <UserPlus className="w-12 h-12 sm:w-14 sm:h-14 md:w-16 md:h-16 text-primary" />
                        </div>
                      )}
                    </div>
                    {selectedRequest.profilePicture && (
                      <Button
                        size="sm"
                        variant="secondary"
                        className="absolute bottom-0 right-0 rounded-full w-8 h-8 sm:w-10 sm:h-10 p-0"
                        onClick={(e) => {
                          e.stopPropagation();
                          handleImageView(selectedRequest.profilePicture);
                        }}
                      >
                        <Eye className="w-3.5 h-3.5 sm:w-4 sm:h-4" />
                      </Button>
                    )}
                  </div>
                </div>

                {/* Personal Information - Responsive */}
                <div className="space-y-3 sm:space-y-4">
                  <h3 className="text-base sm:text-lg font-semibold flex items-center gap-2">
                    <User className="w-4 h-4 sm:w-5 sm:h-5 text-primary" />
                    Personal Information
                  </h3>
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 sm:gap-4">
                    <div className="space-y-1">
                      <p className="text-xs sm:text-sm text-muted-foreground">First Name</p>
                      <p className="text-sm sm:text-base font-medium">{selectedRequest.firstName}</p>
                    </div>
                    <div className="space-y-1">
                      <p className="text-xs sm:text-sm text-muted-foreground">Last Name</p>
                      <p className="text-sm sm:text-base font-medium">{selectedRequest.lastName}</p>
                    </div>
                    <div className="space-y-1">
                      <p className="text-xs sm:text-sm text-muted-foreground">Gender</p>
                      <p className="text-sm sm:text-base font-medium">{selectedRequest.gender}</p>
                    </div>
                    <div className="space-y-1">
                      <p className="text-xs sm:text-sm text-muted-foreground">Date of Birth</p>
                      <p className="text-sm sm:text-base font-medium">
                        {new Date(selectedRequest.dateOfBirth).toLocaleDateString()}
                      </p>
                    </div>
                    <div className="space-y-1 sm:col-span-2">
                      <p className="text-xs sm:text-sm text-muted-foreground">National ID</p>
                      <p className="text-sm sm:text-base font-medium break-all">{selectedRequest.nationalId}</p>
                    </div>
                  </div>
                </div>

                {/* Contact Information - Responsive */}
                <div className="space-y-3 sm:space-y-4 pt-3 sm:pt-4 border-t">
                  <h3 className="text-base sm:text-lg font-semibold flex items-center gap-2">
                    <Mail className="w-4 h-4 sm:w-5 sm:h-5 text-primary" />
                    Contact Information
                  </h3>
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 sm:gap-4">
                    <div className="space-y-1">
                      <p className="text-xs sm:text-sm text-muted-foreground">Email</p>
                      <p className="text-sm sm:text-base font-medium break-all">{selectedRequest.email}</p>
                    </div>
                    <div className="space-y-1">
                      <p className="text-xs sm:text-sm text-muted-foreground">Phone</p>
                      <p className="text-sm sm:text-base font-medium">{selectedRequest.phone}</p>
                    </div>
                  </div>
                </div>

                {/* Professional Information - WITH EDIT MODE - Responsive */}
                <div className="space-y-3 sm:space-y-4 pt-3 sm:pt-4 border-t">
                  <h3 className="text-base sm:text-lg font-semibold flex items-center gap-2">
                    <Briefcase className="w-4 h-4 sm:w-5 sm:h-5 text-primary" />
                    Professional Information
                  </h3>
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 sm:gap-4">
                    <div className="space-y-1">
                      <p className="text-xs sm:text-sm text-muted-foreground">Qualification</p>
                      <p className="text-sm sm:text-base font-medium">{selectedRequest.qualification}</p>
                    </div>
                    <div className="space-y-1">
                      <p className="text-xs sm:text-sm text-muted-foreground">Experience</p>
                      <p className="text-sm sm:text-base font-medium">{selectedRequest.experience} years</p>
                    </div>
                    
                    {/* Subjects - EDITABLE - Responsive */}
                    <div className="space-y-2 sm:col-span-2">
                      <div className="flex items-center justify-between">
                        <p className="text-xs sm:text-sm text-muted-foreground">Subjects</p>
                        {!editMode && requestType === "teacher-recruitment" && (
                          <Button
                            variant="ghost"
                            size="sm"
                            onClick={handleEditStart}
                            className="flex items-center gap-1 h-7 sm:h-8 px-2 text-xs"
                          >
                            <Edit className="w-3 h-3" />
                            Edit
                          </Button>
                        )}
                      </div>
                      {editMode ? (
                        <div className="space-y-2 sm:space-y-3">
                          <div className="flex flex-wrap gap-1.5 sm:gap-2 p-3 sm:p-4 border rounded-lg bg-muted/30 max-h-48 overflow-y-auto">
                            {availableSubjects.map((subject) => (
                              <Button
                                key={subject}
                                type="button"
                                variant={tempSubjects.includes(subject) ? "default" : "outline"}
                                size="sm"
                                onClick={() => toggleSubject(subject)}
                                className="text-xs h-7 sm:h-8"
                              >
                                {subject}
                              </Button>
                            ))}
                          </div>
                          {tempSubjects.length > 0 && (
                            <p className="text-xs sm:text-sm text-muted-foreground">
                              Selected: {tempSubjects.join(", ")}
                            </p>
                          )}
                        </div>
                      ) : (
                        <div className="flex flex-wrap gap-1.5 sm:gap-2">
                          {selectedRequest.subjects.map((subject, index) => (
                            <Badge key={index} variant="secondary" className="text-xs">
                              {subject}
                            </Badge>
                          ))}
                        </div>
                      )}
                    </div>
                    
                    {/* Assigned Classes - EDITABLE - Responsive */}
                    <div className="space-y-2 sm:col-span-2">
                      <p className="text-xs sm:text-sm text-muted-foreground">Assigned Classes</p>
                      {editMode ? (
                        <div className="space-y-2 sm:space-y-3">
                          <div className="flex flex-wrap gap-1.5 sm:gap-2 p-3 sm:p-4 border rounded-lg bg-muted/30 max-h-48 overflow-y-auto">
                            {availableClasses.map((className) => (
                              <Button
                                key={className}
                                type="button"
                                variant={tempAssignedClasses.includes(className) ? "default" : "outline"}
                                size="sm"
                                onClick={() => toggleClass(className)}
                                className="text-xs h-7 sm:h-8"
                              >
                                {className}
                              </Button>
                            ))}
                          </div>
                          {tempAssignedClasses.length > 0 && (
                            <p className="text-xs sm:text-sm text-muted-foreground">
                              Selected: {tempAssignedClasses.join(", ")}
                            </p>
                          )}
                        </div>
                      ) : (
                        <div className="flex flex-wrap gap-1.5 sm:gap-2">
                          {selectedRequest.assignedClasses.map((cls, index) => (
                            <Badge key={index} variant="outline" className="text-xs">
                              {cls}
                            </Badge>
                          ))}
                        </div>
                      )}
                    </div>
                    
                    {/* Edit Mode Action Buttons - Responsive */}
                    {editMode && (
                      <div className="sm:col-span-2 flex flex-col-reverse sm:flex-row items-stretch sm:items-center justify-end gap-2 pt-2">
                        <Button
                          variant="outline"
                          size="sm"
                          onClick={handleEditCancel}
                          className="flex items-center justify-center gap-2 text-xs sm:text-sm"
                        >
                          <X className="w-3.5 h-3.5 sm:w-4 sm:h-4" />
                          Cancel
                        </Button>
                        <Button
                          size="sm"
                          onClick={handleEditSave}
                          className="flex items-center justify-center gap-2 text-xs sm:text-sm"
                        >
                          <Save className="w-3.5 h-3.5 sm:w-4 sm:h-4" />
                          Save Changes
                        </Button>
                      </div>
                    )}
                  </div>
                </div>

                {/* Location Information - Responsive */}
                <div className="space-y-3 sm:space-y-4 pt-3 sm:pt-4 border-t">
                  <h3 className="text-base sm:text-lg font-semibold flex items-center gap-2">
                    <MapPin className="w-4 h-4 sm:w-5 sm:h-5 text-primary" />
                    Location Information
                  </h3>
                  <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 sm:gap-4">
                    <div className="space-y-1">
                      <p className="text-xs sm:text-sm text-muted-foreground">Country</p>
                      <p className="text-sm sm:text-base font-medium">{selectedRequest.country}</p>
                    </div>
                    <div className="space-y-1">
                      <p className="text-xs sm:text-sm text-muted-foreground">State</p>
                      <p className="text-sm sm:text-base font-medium">{selectedRequest.state}</p>
                    </div>
                    <div className="space-y-1">
                      <p className="text-xs sm:text-sm text-muted-foreground">City</p>
                      <p className="text-sm sm:text-base font-medium">{selectedRequest.city}</p>
                    </div>
                  </div>
                </div>

                {/* Application Date - Responsive */}
                <div className="space-y-3 sm:space-y-4 pt-3 sm:pt-4 border-t">
                  <div className="flex items-center gap-2 text-muted-foreground">
                    <Calendar className="w-3.5 h-3.5 sm:w-4 sm:h-4 flex-shrink-0" />
                    <span className="text-xs sm:text-sm">
                      Application submitted on {new Date(selectedRequest.requestDate).toLocaleDateString('en-US', { 
                        year: 'numeric', 
                        month: 'long', 
                        day: 'numeric' 
                      })}
                    </span>
                  </div>
                </div>
              </div>
            ))}
          <DialogFooter className="gap-2 pt-3 sm:pt-4 flex-col sm:flex-row">
            {!editMode && (
              <>
                <Button
                  variant="outline"
                  className="text-destructive hover:text-destructive/90 w-full sm:w-auto text-sm"
                  onClick={() => handleAction(selectedRequest, "decline", requestType)}
                >
                  <XCircle className="w-3.5 h-3.5 sm:w-4 sm:h-4 mr-2" />
                  Decline
                </Button>
                <Button
                  onClick={() => handleAction(selectedRequest, "accept", requestType)}
                  className="w-full sm:w-auto text-sm"
                >
                  <CheckCircle className="w-3.5 h-3.5 sm:w-4 sm:h-4 mr-2" />
                  Accept
                </Button>
              </>
            )}
          </DialogFooter>
        </DialogContent>
      </Dialog>

      {/* Image Viewer Dialog - Responsive */}
      <Dialog open={imageViewerOpen} onOpenChange={setImageViewerOpen}>
        <DialogContent className="w-[95vw] max-w-3xl p-2 sm:p-4 md:p-6">
          <DialogHeader>
            <DialogTitle className="text-base sm:text-lg">Image Preview</DialogTitle>
          </DialogHeader>
          <div className="flex items-center justify-center p-2 sm:p-4">
            <img 
              src={selectedImage} 
              alt="Preview" 
              className="max-w-full max-h-[70vh] object-contain rounded-lg"
            />
          </div>
        </DialogContent>
      </Dialog>

      {/* Alert Dialog - Responsive */}
      <AlertDialog open={dialogOpen} onOpenChange={setDialogOpen}>
        <AlertDialogContent className="w-[95vw] max-w-md">
          <AlertDialogHeader>
            <AlertDialogTitle className="text-base sm:text-lg">
              {actionType === "accept" ? "Accept Request" : "Decline Request"}
            </AlertDialogTitle>
            <AlertDialogDescription className="text-xs sm:text-sm">
              Are you sure you want to {actionType} this{" "}
              {requestType === "student"
                ? "student registration"
                : requestType === "teacher-content"
                ? "teacher content upload request"
                : "teacher recruitment request"}
              ? {actionType === "accept" && "This will add the item to the system."}
            </AlertDialogDescription>
          </AlertDialogHeader>
          <AlertDialogFooter className="flex-col sm:flex-row gap-2">
            <AlertDialogCancel className="w-full sm:w-auto text-sm">Cancel</AlertDialogCancel>
            <AlertDialogAction onClick={confirmAction} className="w-full sm:w-auto text-sm">
              {actionType === "accept" ? "Accept" : "Decline"}
            </AlertDialogAction>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>
    </div>
  );
};

export default Requests;
