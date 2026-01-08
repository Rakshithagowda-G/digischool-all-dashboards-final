import { useState } from "react";
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { ArrowLeft, Mail, Phone, BookOpen, Award, Users, Eye, X, IdCard, Hash } from "lucide-react";
import { Badge } from "@/components/ui/badge";

const TeacherDetailDialog = ({ teacher, open, onOpenChange }) => {
  const [imageViewerOpen, setImageViewerOpen] = useState(false);

  const handleImageView = () => {
    setImageViewerOpen(true);
  };

  const closeImageViewer = () => {
    setImageViewerOpen(false);
  };

  if (!teacher) return null;

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="w-[95vw] max-w-3xl max-h-[90vh] overflow-y-auto p-4 sm:p-6">
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
            <DialogTitle className="text-lg sm:text-xl md:text-2xl truncate">Teacher Details</DialogTitle>
          </div>
        </DialogHeader>

        {/* Image Viewer Overlay - Responsive */}
        {imageViewerOpen && teacher.profilePicture && (
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
                src={teacher.profilePicture} 
                alt={teacher.name}
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
                {teacher.profilePicture ? (
                  <img 
                    src={teacher.profilePicture} 
                    alt={teacher.name}
                    className="w-full h-full object-cover"
                  />
                ) : (
                  <div className="w-full h-full bg-primary/10 flex items-center justify-center text-primary text-2xl sm:text-3xl font-bold">
                    {teacher.name
                      .split(" ")
                      .map((n) => n[0])
                      .join("")}
                  </div>
                )}
              </div>
              {teacher.profilePicture && (
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
                {teacher.name}
              </h3>
              <div className="flex flex-col sm:flex-row items-center justify-center sm:justify-start gap-2 sm:gap-3">
                <Badge variant="default" className="text-xs">{teacher.subject}</Badge>
                <span className="text-xs sm:text-sm text-muted-foreground">
                  {teacher.experience} years experience
                </span>
              </div>
            </div>
          </div>

          {/* Contact & Professional Info - Responsive Grid */}
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-4 sm:gap-6 pt-4 sm:pt-6 border-t">
            {/* Contact Information */}
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
                    <p className="text-sm sm:text-base text-foreground break-all">{teacher.email}</p>
                  </div>
                </div>

                <div className="space-y-1">
                  <p className="text-xs sm:text-sm font-medium text-muted-foreground">Phone</p>
                  <div className="flex items-center gap-2">
                    <Phone className="w-3.5 h-3.5 sm:w-4 sm:h-4 text-muted-foreground flex-shrink-0" />
                    <p className="text-sm sm:text-base text-foreground">{teacher.phone}</p>
                  </div>
                </div>

                <div className="space-y-1">
                  <p className="text-xs sm:text-sm font-medium text-muted-foreground">Location</p>
                  <p className="text-sm sm:text-base text-foreground">{teacher.location}</p>
                </div>
              </div>
            </div>

            {/* Professional Details */}
            <div className="space-y-3 sm:space-y-4">
              <h4 className="font-semibold text-foreground text-base sm:text-lg flex items-center gap-2">
                <Award className="w-4 h-4 sm:w-5 sm:h-5" />
                Professional Details
              </h4>
              
              <div className="space-y-2.5 sm:space-y-3">
                <div className="space-y-1">
                  <p className="text-xs sm:text-sm font-medium text-muted-foreground">Teacher ID</p>
                  <div className="flex items-center gap-2">
                    <Hash className="w-3.5 h-3.5 sm:w-4 sm:h-4 text-muted-foreground flex-shrink-0" />
                    <p className="text-sm sm:text-base text-foreground break-all">{teacher.teacherId}</p>
                  </div>
                </div>

                <div className="space-y-1">
                  <p className="text-xs sm:text-sm font-medium text-muted-foreground">National ID</p>
                  <div className="flex items-center gap-2">
                    <IdCard className="w-3.5 h-3.5 sm:w-4 sm:h-4 text-muted-foreground flex-shrink-0" />
                    <p className="text-sm sm:text-base text-foreground break-all">{teacher.nationalId}</p>
                  </div>
                </div>

                <div className="space-y-1">
                  <p className="text-xs sm:text-sm font-medium text-muted-foreground">Qualification</p>
                  <div className="flex items-center gap-2">
                    <Award className="w-3.5 h-3.5 sm:w-4 sm:h-4 text-muted-foreground flex-shrink-0" />
                    <p className="text-sm sm:text-base text-foreground">{teacher.qualification}</p>
                  </div>
                </div>

                <div className="space-y-1">
                  <p className="text-xs sm:text-sm font-medium text-muted-foreground">Experience</p>
                  <p className="text-sm sm:text-base text-foreground">{teacher.experience} years</p>
                </div>
              </div>
            </div>
          </div>

          {/* Assigned Classes - Responsive */}
          <div className="pt-4 sm:pt-6 border-t">
            <h4 className="font-semibold text-foreground text-base sm:text-lg mb-3 sm:mb-4">
              Assigned Classes
            </h4>
            <div className="flex flex-wrap gap-2">
              {teacher.assignedClasses.map((cls, index) => (
                <Badge key={index} variant="secondary" className="text-xs sm:text-sm">
                  {cls}
                </Badge>
              ))}
            </div>
          </div>

          {/* Assigned Subjects - Responsive */}
          <div className="pt-4 sm:pt-6 border-t">
            <h4 className="font-semibold text-foreground text-base sm:text-lg mb-3 sm:mb-4">
              Assigned Subjects
            </h4>
            <div className="flex flex-wrap gap-2">
              {teacher.assignedSubjects && teacher.assignedSubjects.length > 0 ? (
                teacher.assignedSubjects.map((subject, index) => (
                  <Badge key={index} variant="outline" className="text-xs sm:text-sm">
                    <BookOpen className="w-3 h-3 mr-1" />
                    {subject}
                  </Badge>
                ))
              ) : (
                <Badge variant="outline" className="text-xs sm:text-sm">
                  <BookOpen className="w-3 h-3 mr-1" />
                  {teacher.subject}
                </Badge>
              )}
            </div>
          </div>

          {/* Teaching Statistics - Responsive */}
          <div className="pt-4 sm:pt-6 border-t">
            <h4 className="font-semibold text-foreground text-base sm:text-lg mb-3 sm:mb-4">
              Teaching Statistics
            </h4>
            <div className="grid grid-cols-3 gap-2 sm:gap-3 md:gap-4">
              <div className="p-3 sm:p-4 bg-muted rounded-lg text-center">
                <p className="text-xl sm:text-2xl font-bold text-foreground">245</p>
                <p className="text-xs sm:text-sm text-muted-foreground mt-1">Total Students</p>
              </div>
              <div className="p-3 sm:p-4 bg-muted rounded-lg text-center">
                <p className="text-xl sm:text-2xl font-bold text-foreground">
                  {teacher.assignedClasses.length}
                </p>
                <p className="text-xs sm:text-sm text-muted-foreground mt-1">Classes</p>
              </div>
              <div className="p-3 sm:p-4 bg-muted rounded-lg text-center">
                <p className="text-xl sm:text-2xl font-bold text-foreground">
                  {teacher.averageGPA || "3.7"}
                </p>
                <p className="text-xs sm:text-sm text-muted-foreground mt-1">Average GPA</p>
              </div>
            </div>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
};

export default TeacherDetailDialog;
