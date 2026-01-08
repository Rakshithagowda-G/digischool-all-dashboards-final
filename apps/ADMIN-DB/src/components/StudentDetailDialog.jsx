import { useState } from "react";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import {
  ArrowLeft,
  Mail,
  Phone,
  User,
  MapPin,
  Eye,
  X,
  Calendar,
  IdCard,
  Users,
  TrendingUp,
  DollarSign,
  BookOpen,
  MessageSquare,
  Award,
  Hash,
} from "lucide-react";

const StudentDetailDialog = ({ student, open, onOpenChange }) => {
  const [imageViewerOpen, setImageViewerOpen] = useState(false);

  const handleImageView = () => {
    setImageViewerOpen(true);
  };

  const closeImageViewer = () => {
    setImageViewerOpen(false);
  };

  if (!student) return null;

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="w-[95vw] max-w-5xl max-h-[90vh] overflow-y-auto p-4 sm:p-6">
        <DialogHeader>
          <div className="flex items-center gap-2 sm:gap-3">
            <Button
              variant="ghost"
              size="icon"
              onClick={() => onOpenChange(false)}
              className="h-7 w-7 sm:h-8 sm:w-8 flex-shrink-0"
            >
              <ArrowLeft className="w-3.5 h-3.5 sm:w-4 sm:h-4" />
            </Button>
            <DialogTitle className="text-lg sm:text-xl md:text-2xl truncate">Student Profile</DialogTitle>
          </div>
        </DialogHeader>

        {/* Image Viewer Overlay - Responsive */}
        {imageViewerOpen && student.profilePicture && (
          <div 
            className="fixed inset-0 z-50 flex items-center justify-center bg-black/80 backdrop-blur-sm animate-in fade-in-0 p-4"
            onClick={closeImageViewer}
          >
            <div className="relative w-full max-w-4xl max-h-[90vh]">
              <Button
                size="sm"
                variant="ghost"
                className="absolute -top-2 -right-2 sm:top-2 sm:right-2 z-10 bg-black/50 hover:bg-black/70 text-white rounded-full w-8 h-8 sm:w-10 sm:h-10 p-0"
                onClick={closeImageViewer}
              >
                <X className="w-4 h-4 sm:w-5 sm:h-5" />
              </Button>
              <img 
                src={student.profilePicture} 
                alt={student.name}
                className="w-full h-auto max-h-[85vh] object-contain rounded-lg shadow-2xl"
                onClick={(e) => e.stopPropagation()}
              />
            </div>
          </div>
        )}

        <div className="space-y-4 sm:space-y-6 pt-3 sm:pt-4">
          {/* Profile Header - Responsive */}
          <div className="flex flex-col sm:flex-row items-center sm:items-start gap-4 sm:gap-6">
            <div className="relative flex-shrink-0">
              <div className="w-20 h-20 sm:w-24 sm:h-24 rounded-full overflow-hidden border-4 border-primary/20">
                {student.profilePicture ? (
                  <img 
                    src={student.profilePicture} 
                    alt={student.name}
                    className="w-full h-full object-cover"
                  />
                ) : (
                  <div className="w-full h-full bg-primary/10 flex items-center justify-center">
                    <User className="w-10 h-10 sm:w-12 sm:h-12 text-primary" />
                  </div>
                )}
              </div>
              {student.profilePicture && (
                <Button
                  size="sm"
                  variant="secondary"
                  className="absolute bottom-0 right-0 rounded-full w-7 h-7 sm:w-8 sm:h-8 p-0 shadow-lg"
                  onClick={handleImageView}
                >
                  <Eye className="w-3.5 h-3.5 sm:w-4 sm:h-4" />
                </Button>
              )}
            </div>
            <div className="space-y-2 text-center sm:text-left flex-1 min-w-0">
              <h3 className="text-xl sm:text-2xl md:text-3xl font-bold text-foreground truncate">
                {student.name}
              </h3>
              <div className="flex items-center justify-center sm:justify-start gap-2 sm:gap-3 flex-wrap">
                <Badge variant="default" className="text-xs">Roll {student.rollNumber}</Badge>
                <Badge variant="outline" className="text-xs">Class {student.class}</Badge>
                <Badge variant="secondary" className="text-xs">{student.age} years old</Badge>
              </div>
            </div>
          </div>

          {/* Personal & Contact Information - Responsive Grid */}
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-4 sm:gap-6 pt-4 sm:pt-6 border-t">
            <div className="space-y-3 sm:space-y-4">
              <h4 className="font-semibold text-foreground text-base sm:text-lg flex items-center gap-2">
                <User className="w-4 h-4 sm:w-5 sm:h-5" />
                Personal Information
              </h4>
              
              <div className="space-y-2.5 sm:space-y-3">
                <div className="space-y-1">
                  <p className="text-xs sm:text-sm font-medium text-muted-foreground">Student ID</p>
                  <div className="flex items-center gap-2">
                    <Hash className="w-3.5 h-3.5 sm:w-4 sm:h-4 text-muted-foreground flex-shrink-0" />
                    <p className="text-sm sm:text-base text-foreground break-all">{student.studentId}</p>
                  </div>
                </div>

                <div className="space-y-1">
                  <p className="text-xs sm:text-sm font-medium text-muted-foreground">Date of Birth</p>
                  <div className="flex items-center gap-2">
                    <Calendar className="w-3.5 h-3.5 sm:w-4 sm:h-4 text-muted-foreground flex-shrink-0" />
                    <p className="text-sm sm:text-base text-foreground">{student.dateOfBirth}</p>
                  </div>
                </div>

                <div className="space-y-1">
                  <p className="text-xs sm:text-sm font-medium text-muted-foreground">Age</p>
                  <p className="text-sm sm:text-base text-foreground">{student.age} years</p>
                </div>

                <div className="space-y-1">
                  <p className="text-xs sm:text-sm font-medium text-muted-foreground">National ID</p>
                  <div className="flex items-center gap-2">
                    <IdCard className="w-3.5 h-3.5 sm:w-4 sm:h-4 text-muted-foreground flex-shrink-0" />
                    <p className="text-sm sm:text-base text-foreground break-all">{student.nationalId}</p>
                  </div>
                </div>

                <div className="space-y-1">
                  <p className="text-xs sm:text-sm font-medium text-muted-foreground">Proof of ID</p>
                  <p className="text-sm sm:text-base text-foreground">{student.proofOfId}</p>
                </div>
              </div>
            </div>

            <div className="space-y-3 sm:space-y-4">
              <h4 className="font-semibold text-foreground text-base sm:text-lg flex items-center gap-2">
                <Mail className="w-4 h-4 sm:w-5 sm:h-5" />
                Contact Information
              </h4>
              
              <div className="space-y-2.5 sm:space-y-3">
                <div className="space-y-1">
                  <p className="text-xs sm:text-sm font-medium text-muted-foreground">Email</p>
                  <div className="flex items-center gap-2">
                    <Mail className="w-3.5 h-3.5 sm:w-4 sm:h-4 text-muted-foreground flex-shrink-0" />
                    <p className="text-sm sm:text-base text-foreground break-all">{student.email}</p>
                  </div>
                </div>

                <div className="space-y-1">
                  <p className="text-xs sm:text-sm font-medium text-muted-foreground">Phone</p>
                  <div className="flex items-center gap-2">
                    <Phone className="w-3.5 h-3.5 sm:w-4 sm:h-4 text-muted-foreground flex-shrink-0" />
                    <p className="text-sm sm:text-base text-foreground">{student.phone}</p>
                  </div>
                </div>

                <div className="space-y-1">
                  <p className="text-xs sm:text-sm font-medium text-muted-foreground">Address</p>
                  <div className="flex items-start gap-2">
                    <MapPin className="w-3.5 h-3.5 sm:w-4 sm:h-4 text-muted-foreground flex-shrink-0 mt-0.5" />
                    <p className="text-sm sm:text-base text-foreground">{student.address}</p>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Parent Information - Responsive */}
          <div className="pt-4 sm:pt-6 border-t">
            <h4 className="font-semibold text-foreground text-base sm:text-lg mb-3 sm:mb-4 flex items-center gap-2">
              <Users className="w-4 h-4 sm:w-5 sm:h-5" />
              Parent/Guardian Information
            </h4>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 sm:gap-6">
              <div className="space-y-2.5 sm:space-y-3">
                <div className="space-y-1">
                  <p className="text-xs sm:text-sm font-medium text-muted-foreground">Father's Name</p>
                  <p className="text-sm sm:text-base text-foreground">{student.fatherName}</p>
                </div>
                <div className="space-y-1">
                  <p className="text-xs sm:text-sm font-medium text-muted-foreground">Mother's Name</p>
                  <p className="text-sm sm:text-base text-foreground">{student.motherName}</p>
                </div>
              </div>
              <div className="space-y-2.5 sm:space-y-3">
                <div className="space-y-1">
                  <p className="text-xs sm:text-sm font-medium text-muted-foreground">Registered By</p>
                  <Badge variant="outline" className="text-xs">{student.registeredBy}</Badge>
                </div>
                <div className="space-y-1">
                  <p className="text-xs sm:text-sm font-medium text-muted-foreground">How They Found Us</p>
                  <p className="text-sm sm:text-base text-foreground">{student.discoverySource}</p>
                </div>
              </div>
            </div>
          </div>

          {/* Academic Performance - Responsive */}
          <div className="pt-4 sm:pt-6 border-t">
            <h4 className="font-semibold text-foreground text-base sm:text-lg mb-3 sm:mb-4 flex items-center gap-2">
              <Award className="w-4 h-4 sm:w-5 sm:h-5" />
              Academic Performance
            </h4>
            <div className="grid grid-cols-2 lg:grid-cols-4 gap-3 sm:gap-4 mb-4 sm:mb-6">
              <div className="p-3 sm:p-4 bg-muted rounded-lg text-center">
                <p className="text-xl sm:text-2xl font-bold text-foreground">{student.attendance}%</p>
                <p className="text-xs sm:text-sm text-muted-foreground mt-1">Attendance</p>
              </div>
              <div className="p-3 sm:p-4 bg-muted rounded-lg text-center">
                <p className="text-xl sm:text-2xl font-bold text-foreground">{student.ptmsAttended}</p>
                <p className="text-xs sm:text-sm text-muted-foreground mt-1">PTMs Attended</p>
              </div>
              <div className="p-3 sm:p-4 bg-muted rounded-lg text-center">
                <p className="text-xl sm:text-2xl font-bold text-foreground">{student.backlogs}</p>
                <p className="text-xs sm:text-sm text-muted-foreground mt-1">Backlogs</p>
              </div>
              <div className="p-3 sm:p-4 bg-muted rounded-lg text-center">
                <p className="text-xl sm:text-2xl font-bold text-foreground">{student.averageGrade}</p>
                <p className="text-xs sm:text-sm text-muted-foreground mt-1">Average Grade</p>
              </div>
            </div>

            {/* Year-wise Marks Table - Responsive */}
            <div className="space-y-2 sm:space-y-3">
              <h5 className="font-medium text-sm sm:text-base text-foreground">Year-wise Marks</h5>
              <div className="border rounded-lg overflow-hidden">
                <div className="overflow-x-auto">
                  <table className="w-full min-w-[500px]">
                    <thead className="bg-muted">
                      <tr>
                        <th className="text-left p-2 sm:p-3 text-xs sm:text-sm font-medium text-foreground">Year</th>
                        <th className="text-left p-2 sm:p-3 text-xs sm:text-sm font-medium text-foreground">Subject</th>
                        <th className="text-left p-2 sm:p-3 text-xs sm:text-sm font-medium text-foreground">Marks</th>
                        <th className="text-left p-2 sm:p-3 text-xs sm:text-sm font-medium text-foreground">Grade</th>
                      </tr>
                    </thead>
                    <tbody>
                      {student.yearwiseMarks && student.yearwiseMarks.map((record, index) => (
                        <tr key={index} className="border-t">
                          <td className="p-2 sm:p-3 text-xs sm:text-sm">{record.year}</td>
                          <td className="p-2 sm:p-3 text-xs sm:text-sm">{record.subject}</td>
                          <td className="p-2 sm:p-3 text-xs sm:text-sm">{record.marks}/100</td>
                          <td className="p-2 sm:p-3 text-xs sm:text-sm">
                            <Badge variant="outline" className="text-xs">{record.grade}</Badge>
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              </div>
              {/* Scroll hint for mobile */}
              <p className="text-xs text-muted-foreground text-center sm:hidden">
                ← Swipe to see more →
              </p>
            </div>
          </div>

          {/* Teacher Feedback - Responsive */}
          {student.teacherFeedback && student.teacherFeedback.length > 0 && (
            <div className="pt-4 sm:pt-6 border-t">
              <h4 className="font-semibold text-foreground text-base sm:text-lg mb-3 sm:mb-4 flex items-center gap-2">
                <MessageSquare className="w-4 h-4 sm:w-5 sm:h-5" />
                Teacher Feedback
              </h4>
              <div className="space-y-2.5 sm:space-y-3">
                {student.teacherFeedback.map((feedback, index) => (
                  <div key={index} className="p-3 sm:p-4 bg-muted rounded-lg">
                    <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-2 mb-2">
                      <p className="font-medium text-sm sm:text-base text-foreground">{feedback.teacherName}</p>
                      <Badge variant="secondary" className="text-xs self-start sm:self-auto">{feedback.subject}</Badge>
                    </div>
                    <p className="text-xs sm:text-sm text-muted-foreground">{feedback.comment}</p>
                    <p className="text-xs text-muted-foreground mt-2">{feedback.date}</p>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* Courses Purchased - Responsive Grid */}
          <div className="pt-4 sm:pt-6 border-t">
            <h4 className="font-semibold text-foreground text-base sm:text-lg mb-3 sm:mb-4 flex items-center gap-2">
              <BookOpen className="w-4 h-4 sm:w-5 sm:h-5" />
              Courses Purchased
            </h4>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 sm:gap-4">
              {student.coursesPurchased && student.coursesPurchased.map((course, index) => (
                <div key={index} className="p-3 sm:p-4 border rounded-lg">
                  <h5 className="font-medium text-sm sm:text-base text-foreground mb-2">{course.name}</h5>
                  <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-2">
                    <span className="text-xs sm:text-sm text-muted-foreground">{course.instructor}</span>
                    <Badge variant="secondary" className="text-xs self-start sm:self-auto">{course.status}</Badge>
                  </div>
                  <p className="text-xs text-muted-foreground mt-2">
                    Purchased: {course.purchaseDate}
                  </p>
                </div>
              ))}
            </div>
          </div>

          {/* Fees Section - Responsive */}
          <div className="pt-4 sm:pt-6 border-t">
            <h4 className="font-semibold text-foreground text-base sm:text-lg mb-3 sm:mb-4 flex items-center gap-2">
              <DollarSign className="w-4 h-4 sm:w-5 sm:h-5" />
              Fees Information
            </h4>
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 sm:gap-4">
              <div className="p-3 sm:p-4 bg-muted rounded-lg">
                <p className="text-xs sm:text-sm text-muted-foreground mb-1">Total Fees</p>
                <p className="text-xl sm:text-2xl font-bold text-foreground">
                  ₹{student.fees?.total || "0"}
                </p>
              </div>
              <div className="p-3 sm:p-4 bg-muted rounded-lg">
                <p className="text-xs sm:text-sm text-muted-foreground mb-1">Paid</p>
                <p className="text-xl sm:text-2xl font-bold text-green-600">
                  ₹{student.fees?.paid || "0"}
                </p>
              </div>
              <div className="p-3 sm:p-4 bg-muted rounded-lg">
                <p className="text-xs sm:text-sm text-muted-foreground mb-1">Pending</p>
                <p className="text-xl sm:text-2xl font-bold text-orange-600">
                  ₹{student.fees?.pending || "0"}
                </p>
              </div>
            </div>
            {student.fees?.nextDueDate && (
              <div className="mt-3 sm:mt-4 p-2.5 sm:p-3 bg-orange-50 dark:bg-orange-950 border border-orange-200 dark:border-orange-800 rounded-lg">
                <p className="text-xs sm:text-sm text-orange-800 dark:text-orange-200">
                  Next payment due: <span className="font-medium">{student.fees.nextDueDate}</span>
                </p>
              </div>
            )}
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
};

export default StudentDetailDialog;
