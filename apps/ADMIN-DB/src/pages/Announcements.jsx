import { useState, useEffect } from "react";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Checkbox } from "@/components/ui/checkbox";
import { Badge } from "@/components/ui/badge";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogFooter,
} from "@/components/ui/dialog";
import { Megaphone, Clock, Users } from "lucide-react";
import { toast } from "sonner";

const Announcements = () => {
  const [announcements, setAnnouncements] = useState([]);
  const [selectedAnnouncement, setSelectedAnnouncement] = useState(null);
  const [detailDialogOpen, setDetailDialogOpen] = useState(false);
  const [formData, setFormData] = useState({
    title: "",
    description: "",
    recipients: { all: false, students: false, teachers: false, parents: false },
  });

  useEffect(() => {
    // Mock data for announcements
    setAnnouncements([
      {
        id: 1,
        title: "School Holiday Notification",
        description: "School will remain closed on Friday, 26th January due to Republic Day. Classes will resume on Monday, 29th January.",
        recipients: ["All"],
        timestamp: "2024-01-20 10:30 AM",
      },
      {
        id: 2,
        title: "Parent-Teacher Meeting",
        description: "Parent-Teacher meeting is scheduled for next Saturday. All parents are requested to attend the meeting to discuss their child's progress.",
        recipients: ["Parents"],
        timestamp: "2024-01-19 02:15 PM",
      },
      {
        id: 3,
        title: "Exam Schedule Released",
        description: "The final examination schedule for all classes has been released. Students can check the schedule on the notice board or download from the portal.",
        recipients: ["Students", "Parents"],
        timestamp: "2024-01-18 09:00 AM",
      },
      {
        id: 4,
        title: "Staff Training Workshop",
        description: "A professional development workshop for all teaching staff will be conducted next Wednesday. Attendance is mandatory.",
        recipients: ["Teachers"],
        timestamp: "2024-01-17 11:45 AM",
      },
    ]);
  }, []);

  const handleFormChange = (field, value) => {
    setFormData(prev => ({ ...prev, [field]: value }));
  };

  const handleRecipientChange = (recipient, checked) => {
    if (recipient === "all") {
      setFormData(prev => ({
        ...prev,
        recipients: {
          all: checked,
          students: false,
          teachers: false,
          parents: false,
        },
      }));
    } else {
      setFormData(prev => ({
        ...prev,
        recipients: {
          ...prev.recipients,
          all: false,
          [recipient]: checked,
        },
      }));
    }
  };

  const validateForm = () => {
    if (!formData.title.trim()) {
      toast.error("Title is required");
      return false;
    }
    if (!formData.description.trim()) {
      toast.error("Description is required");
      return false;
    }
    if (!formData.recipients.all && !formData.recipients.students && !formData.recipients.teachers && !formData.recipients.parents) {
      toast.error("Please select at least one recipient group");
      return false;
    }
    return true;
  };

  const handleSubmit = () => {
    if (!validateForm()) return;

    const recipients = [];
    if (formData.recipients.all) recipients.push("All");
    if (formData.recipients.students) recipients.push("Students");
    if (formData.recipients.teachers) recipients.push("Teachers");
    if (formData.recipients.parents) recipients.push("Parents");

    const newAnnouncement = {
      ...formData,
      id: announcements.length + 1,
      recipients,
      timestamp: new Date().toLocaleString('en-IN', {
        year: 'numeric',
        month: '2-digit',
        day: '2-digit',
        hour: '2-digit',
        minute: '2-digit',
        hour12: true,
      }),
    };

    setAnnouncements(prev => [newAnnouncement, ...prev]);
    toast.success("Announcement sent successfully!");

    // Reset form
    setFormData({
      title: "",
      description: "",
      recipients: { all: false, students: false, teachers: false, parents: false },
    });
  };

  const handleCardClick = (announcement) => {
    setSelectedAnnouncement(announcement);
    setDetailDialogOpen(true);
  };

  const getRecipientBadgeColor = (recipient) => {
    switch (recipient) {
      case "All": return "bg-primary/10 text-primary hover:bg-primary/20";
      case "Students": return "bg-blue-500/10 text-blue-600 hover:bg-blue-500/20";
      case "Teachers": return "bg-green-500/10 text-green-600 hover:bg-green-500/20";
      case "Parents": return "bg-purple-500/10 text-purple-600 hover:bg-purple-500/20";
      default: return "bg-muted text-muted-foreground";
    }
  };

  return (
    <div className="space-y-4 md:space-y-6">
      {/* Header Section - Responsive */}
      <div className="flex flex-col gap-2 md:gap-1">
        <h1 className="text-2xl sm:text-3xl font-bold text-foreground">Announcements</h1>
        <p className="text-sm sm:text-base md:text-lg text-muted-foreground">
          Create and manage announcements for students, teachers, and parents
        </p>
      </div>

      {/* Announcement Creation Form - Responsive */}
      <Card className="p-4 sm:p-6 md:p-8">
        <h2 className="text-lg sm:text-xl md:text-2xl font-semibold text-foreground mb-4 md:mb-6 flex items-center gap-2 md:gap-3">
          <Megaphone className="w-5 h-5 sm:w-6 sm:h-6 text-primary" />
          Create New Announcement
        </h2>
        
        <div className="space-y-4 md:space-y-6">
          <div>
            <Label htmlFor="title" className="text-sm sm:text-base font-medium">
              Title
            </Label>
            <Input
              id="title"
              value={formData.title}
              onChange={(e) => handleFormChange("title", e.target.value)}
              placeholder="Enter announcement title"
              className="mt-2 text-base sm:text-lg"
            />
          </div>

          <div>
            <Label htmlFor="description" className="text-sm sm:text-base font-medium">
              Description
            </Label>
            <Textarea
              id="description"
              value={formData.description}
              onChange={(e) => handleFormChange("description", e.target.value)}
              placeholder="Enter announcement description"
              rows={4}
              className="mt-2 text-sm sm:text-base leading-relaxed"
            />
          </div>

          {/* Recipients Checkboxes - Responsive */}
          <div>
            <Label className="text-sm sm:text-base font-medium mb-3 md:mb-4 block">
              Recipients
            </Label>
            {/* Desktop: Single Row */}
            <div className="hidden md:flex items-center gap-6 lg:gap-8 p-4 bg-muted/30 rounded-lg border">
              <div className="flex items-center space-x-3">
                <Checkbox
                  id="all"
                  checked={formData.recipients.all}
                  onCheckedChange={(checked) => handleRecipientChange("all", checked)}
                />
                <Label htmlFor="all" className="cursor-pointer font-medium text-base leading-tight">
                  All
                </Label>
              </div>
              <div className="flex items-center space-x-3">
                <Checkbox
                  id="students"
                  checked={formData.recipients.students}
                  onCheckedChange={(checked) => handleRecipientChange("students", checked)}
                  disabled={formData.recipients.all}
                />
                <Label 
                  htmlFor="students" 
                  className={`cursor-pointer font-medium text-base leading-tight ${
                    formData.recipients.all ? 'text-muted-foreground' : ''
                  }`}
                >
                  Students
                </Label>
              </div>
              <div className="flex items-center space-x-3">
                <Checkbox
                  id="teachers"
                  checked={formData.recipients.teachers}
                  onCheckedChange={(checked) => handleRecipientChange("teachers", checked)}
                  disabled={formData.recipients.all}
                />
                <Label 
                  htmlFor="teachers" 
                  className={`cursor-pointer font-medium text-base leading-tight ${
                    formData.recipients.all ? 'text-muted-foreground' : ''
                  }`}
                >
                  Teachers
                </Label>
              </div>
              <div className="flex items-center space-x-3">
                <Checkbox
                  id="parents"
                  checked={formData.recipients.parents}
                  onCheckedChange={(checked) => handleRecipientChange("parents", checked)}
                  disabled={formData.recipients.all}
                />
                <Label 
                  htmlFor="parents" 
                  className={`cursor-pointer font-medium text-base leading-tight ${
                    formData.recipients.all ? 'text-muted-foreground' : ''
                  }`}
                >
                  Parents
                </Label>
              </div>
            </div>

            {/* Mobile/Tablet: Grid Layout */}
            <div className="md:hidden grid grid-cols-2 gap-3 p-4 bg-muted/30 rounded-lg border">
              <div className="flex items-center space-x-2.5">
                <Checkbox
                  id="all-mobile"
                  checked={formData.recipients.all}
                  onCheckedChange={(checked) => handleRecipientChange("all", checked)}
                />
                <Label htmlFor="all-mobile" className="cursor-pointer font-medium text-sm leading-tight">
                  All
                </Label>
              </div>
              <div className="flex items-center space-x-2.5">
                <Checkbox
                  id="students-mobile"
                  checked={formData.recipients.students}
                  onCheckedChange={(checked) => handleRecipientChange("students", checked)}
                  disabled={formData.recipients.all}
                />
                <Label 
                  htmlFor="students-mobile" 
                  className={`cursor-pointer font-medium text-sm leading-tight ${
                    formData.recipients.all ? 'text-muted-foreground' : ''
                  }`}
                >
                  Students
                </Label>
              </div>
              <div className="flex items-center space-x-2.5">
                <Checkbox
                  id="teachers-mobile"
                  checked={formData.recipients.teachers}
                  onCheckedChange={(checked) => handleRecipientChange("teachers", checked)}
                  disabled={formData.recipients.all}
                />
                <Label 
                  htmlFor="teachers-mobile" 
                  className={`cursor-pointer font-medium text-sm leading-tight ${
                    formData.recipients.all ? 'text-muted-foreground' : ''
                  }`}
                >
                  Teachers
                </Label>
              </div>
              <div className="flex items-center space-x-2.5">
                <Checkbox
                  id="parents-mobile"
                  checked={formData.recipients.parents}
                  onCheckedChange={(checked) => handleRecipientChange("parents", checked)}
                  disabled={formData.recipients.all}
                />
                <Label 
                  htmlFor="parents-mobile" 
                  className={`cursor-pointer font-medium text-sm leading-tight ${
                    formData.recipients.all ? 'text-muted-foreground' : ''
                  }`}
                >
                  Parents
                </Label>
              </div>
            </div>
          </div>

          <Button onClick={handleSubmit} className="w-full h-10 sm:h-12 text-base sm:text-lg">
            <Megaphone className="w-4 h-4 sm:w-5 sm:h-5 mr-2" />
            Submit Announcement
          </Button>
        </div>
      </Card>

      {/* Recent Announcements List - Responsive */}
      <Card className="p-4 sm:p-6 md:p-8">
        <h2 className="text-lg sm:text-xl md:text-2xl font-semibold text-foreground mb-4 md:mb-6">
          Recent Announcements
        </h2>
        
        {announcements.length === 0 ? (
          <Card className="p-8 sm:p-12 text-center">
            <p className="text-lg sm:text-xl text-muted-foreground">
              No announcements yet
            </p>
          </Card>
        ) : (
          <div className="space-y-3 md:space-y-4">
            {announcements.map((announcement) => (
              <Card
                key={announcement.id}
                className="p-4 sm:p-5 md:p-6 cursor-pointer hover:shadow-lg transition-all duration-200 hover:border-primary/50"
                onClick={() => handleCardClick(announcement)}
              >
                <div className="flex items-start gap-3 md:gap-4">
                  <div className="w-10 h-10 sm:w-12 sm:h-12 rounded-xl bg-primary/10 flex items-center justify-center flex-shrink-0">
                    <Megaphone className="w-5 h-5 sm:w-6 sm:h-6 text-primary" />
                  </div>
                  <div className="flex-1 min-w-0">
                    <h3 className="font-bold text-base sm:text-lg md:text-xl leading-tight mb-1 sm:mb-2">
                      {announcement.title}
                    </h3>
                    <p className="text-sm sm:text-base text-muted-foreground line-clamp-2 mb-3 md:mb-4 leading-relaxed">
                      {announcement.description}
                    </p>
                    <div className="flex flex-col sm:flex-row sm:items-center gap-2 sm:gap-4">
                      <div className="flex items-center gap-1.5 text-xs sm:text-sm text-muted-foreground">
                        <Clock className="w-3 h-3 sm:w-4 sm:h-4" />
                        <span>{announcement.timestamp}</span>
                      </div>
                      <div className="flex items-center gap-1.5 flex-wrap">
                        <Users className="w-3 h-3 sm:w-4 sm:h-4 text-muted-foreground" />
                        {announcement.recipients.map((recipient) => (
                          <Badge
                            key={recipient}
                            variant="secondary"
                            className={`text-xs sm:text-sm px-2 sm:px-3 py-0.5 sm:py-1 ${getRecipientBadgeColor(recipient)}`}
                          >
                            {recipient}
                          </Badge>
                        ))}
                      </div>
                    </div>
                  </div>
                </div>
              </Card>
            ))}
          </div>
        )}
      </Card>

      {/* Announcement Detail Dialog - Responsive */}
      <Dialog open={detailDialogOpen} onOpenChange={setDetailDialogOpen}>
        <DialogContent className="w-[95vw] max-w-4xl p-4 sm:p-6 md:p-8 max-h-[90vh] overflow-y-auto">
          <DialogHeader>
            <DialogTitle className="text-xl sm:text-2xl md:text-3xl font-bold">
              Announcement Details
            </DialogTitle>
          </DialogHeader>
          
          {selectedAnnouncement && (
            <div className="space-y-4 md:space-y-6">
              <div>
                <Label className="text-base sm:text-lg font-medium text-muted-foreground mb-2">
                  Title
                </Label>
                <p className="text-lg sm:text-xl md:text-2xl font-bold text-foreground">
                  {selectedAnnouncement.title}
                </p>
              </div>

              <div>
                <Label className="text-base sm:text-lg font-medium text-muted-foreground mb-2 md:mb-3">
                  Full Description
                </Label>
                <p className="text-sm sm:text-base md:text-lg text-foreground p-4 sm:p-5 md:p-6 bg-muted/50 rounded-xl leading-relaxed">
                  {selectedAnnouncement.description}
                </p>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 md:gap-6">
                <div>
                  <Label className="text-base sm:text-lg font-medium text-muted-foreground mb-2">
                    Sent To
                  </Label>
                  <div className="flex flex-wrap gap-2 mt-2">
                    {selectedAnnouncement.recipients.map((recipient) => (
                      <Badge
                        key={recipient}
                        variant="secondary"
                        className={`text-sm sm:text-base px-2.5 sm:px-3 py-1 ${getRecipientBadgeColor(recipient)}`}
                      >
                        {recipient}
                      </Badge>
                    ))}
                  </div>
                </div>
                <div>
                  <Label className="text-base sm:text-lg font-medium text-muted-foreground mb-2">
                    Created Time
                  </Label>
                  <p className="text-sm sm:text-base md:text-lg text-foreground mt-2">
                    {selectedAnnouncement.timestamp}
                  </p>
                </div>
              </div>
            </div>
          )}
          
          <DialogFooter>
            <Button 
              onClick={() => setDetailDialogOpen(false)}
              className="w-full sm:w-auto text-base sm:text-lg h-10 sm:h-12"
            >
              Close
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </div>
  );
};

export default Announcements;
