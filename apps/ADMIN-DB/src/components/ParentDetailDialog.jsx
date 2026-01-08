import { useState } from "react";
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import {
  ArrowLeft,
  Mail,
  Phone,
  Users,
  GraduationCap,
  MapPin,
  IdCard,
  Hash,
  Eye,
  X,
  UserCircle,
  DollarSign,
  Calendar,
  ExternalLink,
} from "lucide-react";
import StudentDetailDialog from "@/components/StudentDetailDialog";

const ParentDetailDialog = ({ parent, open, onOpenChange, allStudents }) => {
  const [imageViewerOpen, setImageViewerOpen] = useState(false);
  const [studentDialogOpen, setStudentDialogOpen] = useState(false);
  const [selectedStudent, setSelectedStudent] = useState(null);

  const handleImageView = () => {
    setImageViewerOpen(true);
  };

  const closeImageViewer = () => {
    setImageViewerOpen(false);
  };

  const handleChildClick = (studentId) => {
    // Find the student from allStudents array
    const student = allStudents?.find(s => s.id === studentId);
    if (student) {
      setSelectedStudent(student);
      setStudentDialogOpen(true);
    }
  };

  if (!parent) return null;

  return (
    <>
      <Dialog open={open} onOpenChange={onOpenChange}>
        <DialogContent className="w-[95vw] max-w-4xl max-h-[90vh] overflow-y-auto p-4 sm:p-6">
          <DialogHeader>
            <div className="flex items-center gap-2 sm:gap-3">
              <Button
                variant="ghost"
                size="icon"
                onClick={() => onOpenChange(false)}
                className="h-7 w-7 sm:h-8 sm:w-8"
              >
                <ArrowLeft className="w-3.5 h-3.5 sm:w-4 sm:h-4" />
              </Button>
              <DialogTitle className="text-lg sm:text-xl md:text-2xl">Parent Profile</DialogTitle>
            </div>
          </DialogHeader>

          {/* Image Viewer Overlay - Responsive */}
          {imageViewerOpen && parent.profilePicture && (
            <div 
              className="fixed inset-0 z-50 flex items-center justify-center bg-black/80 backdrop-blur-sm animate-in fade-in-0"
              onClick={closeImageViewer}
            >
              <div className="relative max-w-[95vw] sm:max-w-4xl max-h-[90vh] p-2 sm:p-4">
                <Button
                  size="sm"
                  variant="ghost"
                  className="absolute top-1 right-1 sm:top-2 sm:right-2 z-10 bg-black/50 hover:bg-black/70 text-white rounded-full w-8 h-8 sm:w-10 sm:h-10 p-0"
                  onClick={closeImageViewer}
                >
                  <X className="w-4 h-4 sm:w-5 sm:h-5" />
                </Button>
                <img 
                  src={parent.profilePicture} 
                  alt={parent.name}
                  className="max-w-full max-h-[85vh] object-contain rounded-lg shadow-2xl"
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
                  {parent.profilePicture ? (
                    <img 
                      src={parent.profilePicture} 
                      alt={parent.name}
                      className="w-full h-full object-cover"
                    />
                  ) : (
                    <div className="w-full h-full bg-primary/10 flex items-center justify-center">
                      <UserCircle className="w-10 h-10 sm:w-12 sm:h-12 text-primary" />
                    </div>
                  )}
                </div>
                {parent.profilePicture && (
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
              <div className="space-y-1 sm:space-y-2 text-center sm:text-left">
                <h3 className="text-xl sm:text-2xl md:text-3xl font-bold text-foreground">{parent.name}</h3>
                <div className="flex items-center justify-center sm:justify-start gap-2">
                  <Users className="w-3.5 h-3.5 sm:w-4 sm:h-4 text-muted-foreground" />
                  <span className="text-sm sm:text-base text-muted-foreground">
                    Parent of {parent.children.length} student{parent.children.length > 1 ? "s" : ""}
                  </span>
                </div>
              </div>
            </div>

            {/* Personal & Contact Information - Responsive Grid */}
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-4 sm:gap-6 pt-4 sm:pt-6 border-t">
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
                      <p className="text-sm sm:text-base text-foreground break-all">{parent.email}</p>
                    </div>
                  </div>

                  <div className="space-y-1">
                    <p className="text-xs sm:text-sm font-medium text-muted-foreground">Phone</p>
                    <div className="flex items-center gap-2">
                      <Phone className="w-3.5 h-3.5 sm:w-4 sm:h-4 text-muted-foreground flex-shrink-0" />
                      <p className="text-sm sm:text-base text-foreground">{parent.phone}</p>
                    </div>
                  </div>

                  <div className="space-y-1">
                    <p className="text-xs sm:text-sm font-medium text-muted-foreground">Address</p>
                    <div className="flex items-start gap-2">
                      <MapPin className="w-3.5 h-3.5 sm:w-4 sm:h-4 text-muted-foreground flex-shrink-0 mt-0.5" />
                      <p className="text-sm sm:text-base text-foreground">{parent.address}</p>
                    </div>
                  </div>
                </div>
              </div>

              <div className="space-y-3 sm:space-y-4">
                <h4 className="font-semibold text-foreground text-base sm:text-lg flex items-center gap-2">
                  <IdCard className="w-4 h-4 sm:w-5 sm:h-5" />
                  Account Information
                </h4>
                
                <div className="space-y-2.5 sm:space-y-3">
                  <div className="space-y-1">
                    <p className="text-xs sm:text-sm font-medium text-muted-foreground">Parent ID</p>
                    <div className="flex items-center gap-2">
                      <Hash className="w-3.5 h-3.5 sm:w-4 sm:h-4 text-muted-foreground flex-shrink-0" />
                      <p className="text-sm sm:text-base text-foreground font-mono">{parent.parentId}</p>
                    </div>
                  </div>

                  <div className="space-y-1">
                    <p className="text-xs sm:text-sm font-medium text-muted-foreground">National ID</p>
                    <div className="flex items-center gap-2">
                      <IdCard className="w-3.5 h-3.5 sm:w-4 sm:h-4 text-muted-foreground flex-shrink-0" />
                      <p className="text-sm sm:text-base text-foreground break-all">{parent.nationalId}</p>
                    </div>
                  </div>

                  <div className="space-y-1">
                    <p className="text-xs sm:text-sm font-medium text-muted-foreground">Registration Date</p>
                    <div className="flex items-center gap-2">
                      <Calendar className="w-3.5 h-3.5 sm:w-4 sm:h-4 text-muted-foreground flex-shrink-0" />
                      <p className="text-sm sm:text-base text-foreground">{parent.registrationDate}</p>
                    </div>
                  </div>

                  <div className="space-y-1">
                    <p className="text-xs sm:text-sm font-medium text-muted-foreground">Number of Kids</p>
                    <div className="flex items-center gap-2">
                      <Users className="w-3.5 h-3.5 sm:w-4 sm:h-4 text-muted-foreground flex-shrink-0" />
                      <p className="text-sm sm:text-base text-foreground">{parent.children.length}</p>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            {/* Children Details - Responsive */}
            <div className="pt-4 sm:pt-6 border-t">
              <h4 className="font-semibold text-foreground text-base sm:text-lg mb-3 sm:mb-4 flex items-center gap-2">
                <GraduationCap className="w-4 h-4 sm:w-5 sm:h-5" />
                Children Details
              </h4>
              <p className="text-xs sm:text-sm text-muted-foreground mb-2 sm:mb-3">
                Click on any child to view their complete profile
              </p>
              <div className="space-y-2 sm:space-y-3">
                {parent.children.map((child, index) => (
                  <div 
                    key={index} 
                    className="p-3 sm:p-4 bg-muted rounded-lg flex items-center justify-between hover:bg-accent transition-colors cursor-pointer group border border-transparent hover:border-primary/50"
                    onClick={() => handleChildClick(child.studentId)}
                  >
                    <div className="flex items-center gap-2 sm:gap-3 min-w-0 flex-1">
                      <div className="w-8 h-8 sm:w-10 sm:h-10 rounded-full bg-primary/10 flex items-center justify-center flex-shrink-0">
                        <GraduationCap className="w-4 h-4 sm:w-5 sm:h-5 text-primary" />
                      </div>
                      <div className="min-w-0 flex-1">
                        <div className="flex items-center gap-1.5 sm:gap-2">
                          <p className="font-medium text-sm sm:text-base text-foreground group-hover:text-primary transition-colors truncate">
                            {child.name}
                          </p>
                          <ExternalLink className="w-3 h-3 text-muted-foreground group-hover:text-primary transition-colors flex-shrink-0" />
                        </div>
                        <p className="text-xs sm:text-sm text-muted-foreground truncate">
                          Roll: {child.rollNumber} • {child.class}
                        </p>
                      </div>
                    </div>
                    <Badge variant="secondary" className="text-xs flex-shrink-0">{child.class}</Badge>
                  </div>
                ))}
              </div>
            </div>

            {/* Engagement Overview - Responsive Grid */}
            <div className="pt-4 sm:pt-6 border-t">
              <h4 className="font-semibold text-foreground text-base sm:text-lg mb-3 sm:mb-4">Engagement Overview</h4>
              <div className="grid grid-cols-2 lg:grid-cols-4 gap-2 sm:gap-3 md:gap-4">
                <div className="p-3 sm:p-4 bg-muted rounded-lg text-center">
                  <p className="text-xl sm:text-2xl font-bold text-foreground">{parent.children.length}</p>
                  <p className="text-xs sm:text-sm text-muted-foreground mt-1">Children</p>
                </div>
                <div className="p-3 sm:p-4 bg-muted rounded-lg text-center">
                  <p className="text-xl sm:text-2xl font-bold text-foreground">{parent.ptmsAttended}</p>
                  <p className="text-xs sm:text-sm text-muted-foreground mt-1">PTMs Attended</p>
                </div>
                <div className="p-3 sm:p-4 bg-muted rounded-lg text-center">
                  <p className="text-xl sm:text-2xl font-bold text-foreground">{parent.messagesSent}</p>
                  <p className="text-xs sm:text-sm text-muted-foreground mt-1">Messages Sent</p>
                </div>
                <div className="p-3 sm:p-4 bg-muted rounded-lg text-center">
                  <p className="text-xl sm:text-2xl font-bold text-foreground">{parent.lastLogin}</p>
                  <p className="text-xs sm:text-sm text-muted-foreground mt-1">Last Login</p>
                </div>
              </div>
            </div>

            {/* Fees Section - Responsive Grid */}
            <div className="pt-4 sm:pt-6 border-t">
              <h4 className="font-semibold text-foreground text-base sm:text-lg mb-3 sm:mb-4 flex items-center gap-2">
                <DollarSign className="w-4 h-4 sm:w-5 sm:h-5" />
                Fees Information
              </h4>
              <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 sm:gap-4">
                <div className="p-3 sm:p-4 bg-muted rounded-lg">
                  <p className="text-xs sm:text-sm text-muted-foreground mb-1">Total Fees</p>
                  <p className="text-xl sm:text-2xl font-bold text-foreground">
                    ₹{parent.fees?.total.toLocaleString() || "0"}
                  </p>
                </div>
                <div className="p-3 sm:p-4 bg-green-50 dark:bg-green-950 border border-green-200 dark:border-green-800 rounded-lg">
                  <p className="text-xs sm:text-sm text-green-700 dark:text-green-300 mb-1">Paid</p>
                  <p className="text-xl sm:text-2xl font-bold text-green-600 dark:text-green-400">
                    ₹{parent.fees?.paid.toLocaleString() || "0"}
                  </p>
                </div>
                <div className="p-3 sm:p-4 bg-orange-50 dark:bg-orange-950 border border-orange-200 dark:border-orange-800 rounded-lg">
                  <p className="text-xs sm:text-sm text-orange-700 dark:text-orange-300 mb-1">Pending</p>
                  <p className="text-xl sm:text-2xl font-bold text-orange-600 dark:text-orange-400">
                    ₹{parent.fees?.pending.toLocaleString() || "0"}
                  </p>
                </div>
              </div>
              {parent.fees?.nextDueDate && (
                <div className="mt-3 sm:mt-4 p-2.5 sm:p-3 bg-orange-50 dark:bg-orange-950 border border-orange-200 dark:border-orange-800 rounded-lg">
                  <p className="text-xs sm:text-sm text-orange-800 dark:text-orange-200">
                    Next payment due: <span className="font-medium">{parent.fees.nextDueDate}</span>
                  </p>
                </div>
              )}
            </div>
          </div>
        </DialogContent>
      </Dialog>

      {/* Student Detail Dialog */}
      <StudentDetailDialog
        student={selectedStudent}
        open={studentDialogOpen}
        onOpenChange={setStudentDialogOpen}
      />
    </>
  );
};

export default ParentDetailDialog;
