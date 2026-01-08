import { useState, useEffect } from "react";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Badge } from "@/components/ui/badge";
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
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { BookOpen, User, FileText, ChevronDown } from "lucide-react";
import {
  DropdownMenu,
  DropdownMenuTrigger,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
} from "@/components/ui/dropdown-menu";
import { toast } from "sonner";

const Subjects = () => {
  const [subjects, setSubjects] = useState([]);
  const [selectedClass, setSelectedClass] = useState("");
  const [selectedSubject, setSelectedSubject] = useState(null);
  const [detailDialogOpen, setDetailDialogOpen] = useState(false);
  const [addRemoveDialogOpen, setAddRemoveDialogOpen] = useState(false);
  const [confirmDialogOpen, setConfirmDialogOpen] = useState(false);
  const [actionType, setActionType] = useState("add");
  const [formData, setFormData] = useState({
    name: "",
    code: "",
    class: "",
    syllabus: "",
    notes: "",
    teacher: "",
  });
  const [removeSubjectId, setRemoveSubjectId] = useState("");
  const [expandedGroups, setExpandedGroups] = useState({});

  // Extract unique classes from subjects data (numerical sort)
  const classes = Array.from(
    new Set(
      subjects.map((subject) => `Class ${subject.class}`)
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
    setSubjects([
      {
        id: 1,
        name: "Mathematics",
        code: "MATH101",
        class: 1,
        teacher: "Dr. Rajesh Kumar",
        syllabus: "Numbers, Addition, Subtraction, Shapes, Patterns",
        notes: "Basic arithmetic operations and geometric shapes for beginners",
      },
      {
        id: 2,
        name: "English",
        code: "ENG101",
        class: 1,
        teacher: "Ms. Priya Sharma",
        syllabus: "Alphabets, Phonics, Simple Words, Rhymes",
        notes: "Introduction to English language with fun activities",
      },
      {
        id: 3,
        name: "Science",
        code: "SCI201",
        class: 2,
        teacher: "Dr. Amit Patel",
        syllabus: "Plants, Animals, Human Body, Water, Air",
        notes: "Basic science concepts with practical examples",
      },
      {
        id: 4,
        name: "Mathematics",
        code: "MATH201",
        class: 2,
        teacher: "Dr. Rajesh Kumar",
        syllabus: "Multiplication, Division, Fractions, Time, Money",
        notes: "Advanced arithmetic with real-world applications",
      },
      {
        id: 5,
        name: "Social Studies",
        code: "SST301",
        class: 3,
        teacher: "Mr. Suresh Reddy",
        syllabus: "Family, Community, Maps, History basics",
        notes: "Understanding society and basic geography",
      },
      {
        id: 6,
        name: "Physics",
        code: "PHY401",
        class: 6,
        teacher: "Prof. Anil Joshi",
        syllabus: "Motion, Force, Energy, Sound, Light",
        notes: "Fundamental physics concepts with experiments",
      },
      {
        id: 7,
        name: "Chemistry",
        code: "CHEM501",
        class: 7,
        teacher: "Dr. Meera Singh",
        syllabus: "Elements, Compounds, Acids, Bases, Metals",
        notes: "Introduction to chemical reactions and properties",
      },
      {
        id: 8,
        name: "Biology",
        code: "BIO601",
        class: 9,
        teacher: "Prof. Vikram Rao",
        syllabus: "Cell Structure, Genetics, Human Systems, Ecology",
        notes: "Life sciences with practical applications",
      },
    ]);
  }, []);

  // Filter subjects by selected class ("" = all)
  const filteredSubjects =
    selectedClass === ""
      ? subjects
      : subjects.filter((subject) => `Class ${subject.class}` === selectedClass);

  const handleCardClick = (subject) => {
    setSelectedSubject(subject);
    setDetailDialogOpen(true);
  };

  const handleAddRemoveClick = () => {
    setAddRemoveDialogOpen(true);
    setActionType("add");
    setFormData({
      name: "",
      code: "",
      class: "",
      syllabus: "",
      notes: "",
      teacher: "",
    });
  };

  const handleFormChange = (field, value) => {
    setFormData(prev => ({ ...prev, [field]: value }));
  };

  const validateForm = () => {
    if (!formData.name.trim()) {
      toast.error("Subject Name is required");
      return false;
    }
    if (!formData.code.trim()) {
      toast.error("Subject Code is required");
      return false;
    }
    if (!formData.class) {
      toast.error("Class must be selected");
      return false;
    }
    if (formData.syllabus.length < 10) {
      toast.error("Syllabus must be at least 10 characters");
      return false;
    }
    return true;
  };

  const handleSubmit = () => {
    if (!validateForm()) return;
    setAddRemoveDialogOpen(false);
    setConfirmDialogOpen(true);
  };

  const handleConfirmAdd = () => {
    const newSubject = {
      id: subjects.length + 1,
      ...formData,
    };
    setSubjects(prev => [...prev, newSubject]);
    setConfirmDialogOpen(false);
    toast.success("Subject added successfully!");
    setFormData({
      name: "",
      code: "",
      class: "",
      syllabus: "",
      notes: "",
      teacher: "",
    });
  };

  const handleRemoveClick = () => {
    setActionType("remove");
    setRemoveSubjectId("");
  };

  const handleConfirmRemove = () => {
    if (!removeSubjectId) {
      toast.error("Please select a subject to remove");
      return;
    }
    setSubjects(prev => prev.filter(subject => subject.id.toString() !== removeSubjectId));
    setAddRemoveDialogOpen(false);
    setConfirmDialogOpen(false);
    toast.success("Subject removed successfully!");
    setRemoveSubjectId("");
  };

  return (
    <div className="space-y-4 md:space-y-5">
      {/* Header Section - Responsive */}
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-3 sm:gap-4">
        <div className="flex-1 min-w-0">
          <h1 className="text-xl sm:text-2xl font-bold text-foreground truncate">
            Subjects Management
          </h1>
          <p className="text-xs sm:text-sm text-muted-foreground mt-0.5">
            Manage subjects for each class
          </p>
        </div>

        <div className="flex items-center gap-2 sm:gap-3">
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

          {/* Add/Remove Button - Responsive */}
          <Button
            onClick={handleAddRemoveClick}
            className="bg-primary text-primary-foreground hover:bg-primary/90 h-10 sm:h-12 text-sm whitespace-nowrap"
          >
            Add / Remove
          </Button>
        </div>
      </div>

      {/* Subject Cards Grid - Responsive */}
      {filteredSubjects.length === 0 ? (
        <Card className="p-6 sm:p-8 text-center">
          <p className="text-xs sm:text-sm text-muted-foreground">
            No subjects found for {selectedClass || "this class"}
          </p>
        </Card>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3 sm:gap-4">
          {filteredSubjects.map((subject) => (
            <Card
              key={subject.id}
              className="p-3.5 sm:p-4 cursor-pointer hover:shadow-md transition-all duration-200 hover:border-primary"
              onClick={() => handleCardClick(subject)}
            >
              <div className="flex items-start justify-between mb-2.5 sm:mb-3">
                <div className="flex items-center gap-2 sm:gap-2.5 min-w-0 flex-1">
                  <div className="w-9 h-9 sm:w-10 sm:h-10 rounded-lg bg-primary/10 flex items-center justify-center flex-shrink-0">
                    <BookOpen className="w-4 h-4 sm:w-5 sm:h-5 text-primary" />
                  </div>
                  <div className="min-w-0 flex-1">
                    <h3 className="font-semibold text-sm sm:text-base text-foreground truncate">
                      {subject.name}
                    </h3>
                    <p className="text-xs text-muted-foreground truncate">{subject.code}</p>
                  </div>
                </div>
                <Badge variant="secondary" className="text-xs flex-shrink-0 ml-2">
                  Class {subject.class}
                </Badge>
              </div>
              {subject.teacher && (
                <div className="flex items-center gap-2 mb-2 text-xs text-muted-foreground">
                  <User className="w-3 h-3 sm:w-3.5 sm:h-3.5 flex-shrink-0" />
                  <span className="truncate">{subject.teacher}</span>
                </div>
              )}
              <div className="flex items-start gap-2 text-xs text-muted-foreground">
                <FileText className="w-3 h-3 sm:w-3.5 sm:h-3.5 mt-0.5 flex-shrink-0" />
                <p className="line-clamp-2">{subject.syllabus}</p>
              </div>
            </Card>
          ))}
        </div>
      )}

      {/* Subject Detail Dialog - Responsive */}
      <Dialog open={detailDialogOpen} onOpenChange={setDetailDialogOpen}>
        <DialogContent className="w-[95vw] max-w-2xl max-h-[85vh] overflow-y-auto p-4 sm:p-6">
          <DialogHeader>
            <DialogTitle className="text-lg sm:text-xl md:text-2xl">Subject Details</DialogTitle>
          </DialogHeader>
          {selectedSubject && (
            <div className="space-y-3 sm:space-y-4">
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 sm:gap-4">
                <div>
                  <Label className="text-xs sm:text-sm text-muted-foreground">Subject Name</Label>
                  <p className="text-base sm:text-lg font-semibold text-foreground">
                    {selectedSubject.name}
                  </p>
                </div>
                <div>
                  <Label className="text-xs sm:text-sm text-muted-foreground">Subject Code</Label>
                  <p className="text-base sm:text-lg font-semibold text-foreground">
                    {selectedSubject.code}
                  </p>
                </div>
              </div>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 sm:gap-4">
                <div>
                  <Label className="text-xs sm:text-sm text-muted-foreground">Class</Label>
                  <p className="text-base sm:text-lg font-semibold text-foreground">
                    Class {selectedSubject.class}
                  </p>
                </div>
                <div>
                  <Label className="text-xs sm:text-sm text-muted-foreground">Teacher Assigned</Label>
                  <p className="text-base sm:text-lg font-semibold text-foreground">
                    {selectedSubject.teacher || "Not Assigned"}
                  </p>
                </div>
              </div>
              <div>
                <Label className="text-xs sm:text-sm text-muted-foreground">Full Syllabus</Label>
                <p className="text-sm sm:text-base text-foreground mt-2 p-3 sm:p-4 bg-muted/50 rounded-lg">
                  {selectedSubject.syllabus}
                </p>
              </div>
              <div>
                <Label className="text-xs sm:text-sm text-muted-foreground">Notes / Materials</Label>
                <p className="text-sm sm:text-base text-foreground mt-2 p-3 sm:p-4 bg-muted/50 rounded-lg">
                  {selectedSubject.notes || "No notes available"}
                </p>
              </div>
            </div>
          )}
          <DialogFooter>
            <Button onClick={() => setDetailDialogOpen(false)} className="w-full sm:w-auto text-sm">
              Close
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>

      {/* Add/Remove Subject Dialog - Responsive */}
      <Dialog open={addRemoveDialogOpen} onOpenChange={setAddRemoveDialogOpen}>
        <DialogContent className="w-[95vw] max-w-2xl max-h-[85vh] overflow-y-auto p-4 sm:p-6">
          <DialogHeader>
            <DialogTitle className="text-lg sm:text-xl">
              {actionType === "add" ? "Add New Subject" : "Remove Subject"}
            </DialogTitle>
          </DialogHeader>
          
          {actionType === "add" ? (
            <div className="space-y-3 sm:space-y-3.5">
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 sm:gap-4">
                <div>
                  <Label htmlFor="name" className="text-xs sm:text-sm">Subject Name</Label>
                  <Input
                    id="name"
                    value={formData.name}
                    onChange={(e) => handleFormChange("name", e.target.value)}
                    placeholder="e.g. Mathematics"
                    className="text-sm"
                  />
                </div>
                <div>
                  <Label htmlFor="code" className="text-xs sm:text-sm">Subject Code</Label>
                  <Input
                    id="code"
                    value={formData.code}
                    onChange={(e) => handleFormChange("code", e.target.value)}
                    placeholder="e.g. MATH101"
                    className="text-sm"
                  />
                </div>
              </div>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 sm:gap-4">
                <div>
                  <Label htmlFor="class" className="text-xs sm:text-sm">Class</Label>
                  <Select
                    value={formData.class}
                    onValueChange={(value) => handleFormChange("class", value)}
                  >
                    <SelectTrigger className="text-sm">
                      <SelectValue placeholder="Select Class" />
                    </SelectTrigger>
                    <SelectContent>
                      {classes.map((cls) => (
                        <SelectItem key={cls} value={cls} className="text-sm">
                          {cls}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>
                <div>
                  <Label htmlFor="teacher" className="text-xs sm:text-sm">Teacher Assigned (Optional)</Label>
                  <Input
                    id="teacher"
                    value={formData.teacher}
                    onChange={(e) => handleFormChange("teacher", e.target.value)}
                    placeholder="e.g. Dr. John Doe"
                    className="text-sm"
                  />
                </div>
              </div>
              <div>
                <Label htmlFor="syllabus" className="text-xs sm:text-sm">Syllabus (min 10 characters)</Label>
                <Textarea
                  id="syllabus"
                  value={formData.syllabus}
                  onChange={(e) => handleFormChange("syllabus", e.target.value)}
                  placeholder="Enter the syllabus details..."
                  rows={4}
                  className="text-sm resize-none"
                />
              </div>
              <div>
                <Label htmlFor="notes" className="text-xs sm:text-sm">Notes / Materials (Optional)</Label>
                <Textarea
                  id="notes"
                  value={formData.notes}
                  onChange={(e) => handleFormChange("notes", e.target.value)}
                  placeholder="Enter additional notes or materials..."
                  rows={3}
                  className="text-sm resize-none"
                />
              </div>
            </div>
          ) : (
            <div className="space-y-3 sm:space-y-4">
              <Label className="text-xs sm:text-sm">Select Subject to Remove</Label>
              <Select
                value={removeSubjectId}
                onValueChange={setRemoveSubjectId}
              >
                <SelectTrigger className="text-sm">
                  <SelectValue placeholder="Choose a subject" />
                </SelectTrigger>
                <SelectContent>
                  {subjects.map((subject) => (
                    <SelectItem
                      key={subject.id}
                      value={subject.id.toString()}
                      className="text-sm"
                    >
                      {subject.name} ({subject.code}) - Class {subject.class}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>
          )}
          
          <DialogFooter className="gap-2 flex-col sm:flex-row">
            <Button
              variant="outline"
              onClick={() => setAddRemoveDialogOpen(false)}
              className="w-full sm:w-auto text-sm"
            >
              Cancel
            </Button>
            {actionType === "add" ? (
              <Button
                onClick={handleSubmit}
                className="bg-primary text-primary-foreground hover:bg-primary/90 w-full sm:w-auto text-sm"
              >
                Add Subject
              </Button>
            ) : (
              <Button
                onClick={handleConfirmRemove}
                variant="destructive"
                className="w-full sm:w-auto text-sm"
              >
                Remove Subject
              </Button>
            )}
          </DialogFooter>
        </DialogContent>
      </Dialog>

      {/* Confirmation Dialog - Responsive */}
      <AlertDialog open={confirmDialogOpen} onOpenChange={setConfirmDialogOpen}>
        <AlertDialogContent className="w-[95vw] max-w-md">
          <AlertDialogHeader>
            <AlertDialogTitle className="text-base sm:text-lg">
              {actionType === "add" ? "Confirm Add Subject" : "Confirm Remove Subject"}
            </AlertDialogTitle>
            <AlertDialogDescription className="text-xs sm:text-sm">
              {actionType === "add"
                ? `Are you sure you want to add "${formData.name} (${formData.code})" to Class ${formData.class}?`
                : "Are you sure you want to remove this subject? This action cannot be undone."}
            </AlertDialogDescription>
          </AlertDialogHeader>
          <AlertDialogFooter className="flex-col sm:flex-row gap-2">
            <AlertDialogCancel className="w-full sm:w-auto text-sm">Cancel</AlertDialogCancel>
            <AlertDialogAction
              onClick={actionType === "add" ? handleConfirmAdd : handleConfirmRemove}
              className={`w-full sm:w-auto text-sm ${
                actionType === "add"
                  ? "bg-primary hover:bg-primary/90"
                  : "bg-destructive hover:bg-destructive/90"
              }`}
            >
              {actionType === "add" ? "Add Subject" : "Remove Subject"}
            </AlertDialogAction>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>
    </div>
  );
};

export default Subjects;
