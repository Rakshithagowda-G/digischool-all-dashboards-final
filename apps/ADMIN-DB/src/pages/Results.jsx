import { useState, useMemo } from "react";
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Label } from "@/components/ui/label";
import { Badge } from "@/components/ui/badge";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Users, CheckCircle2, XCircle, TrendingUp, ChevronDown } from "lucide-react";
import {
  DropdownMenu,
  DropdownMenuTrigger,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
} from "@/components/ui/dropdown-menu";

// Mock data for results
const mockResultsData = {
  "1st Std": [
    {
      id: "STU001",
      name: "Alice Johnson",
      class: "1st Std",
      subjects: [
        { name: "Mathematics", marksObtained: 85, maxMarks: 100 },
        { name: "English", marksObtained: 78, maxMarks: 100 },
        { name: "Science", marksObtained: 82, maxMarks: 100 },
        { name: "Social Studies", marksObtained: 80, maxMarks: 100 },
      ],
    },
    {
      id: "STU002",
      name: "Bob Smith",
      class: "1st Std",
      subjects: [
        { name: "Mathematics", marksObtained: 92, maxMarks: 100 },
        { name: "English", marksObtained: 88, maxMarks: 100 },
        { name: "Science", marksObtained: 90, maxMarks: 100 },
        { name: "Social Studies", marksObtained: 85, maxMarks: 100 },
      ],
    },
    {
      id: "STU003",
      name: "Charlie Brown",
      class: "1st Std",
      subjects: [
        { name: "Mathematics", marksObtained: 45, maxMarks: 100 },
        { name: "English", marksObtained: 52, maxMarks: 100 },
        { name: "Science", marksObtained: 48, maxMarks: 100 },
        { name: "Social Studies", marksObtained: 50, maxMarks: 100 },
      ],
    },
    {
      id: "STU004",
      name: "Diana Prince",
      class: "1st Std",
      subjects: [
        { name: "Mathematics", marksObtained: 88, maxMarks: 100 },
        { name: "English", marksObtained: 85, maxMarks: 100 },
        { name: "Science", marksObtained: 90, maxMarks: 100 },
        { name: "Social Studies", marksObtained: 87, maxMarks: 100 },
      ],
    },
    {
      id: "STU005",
      name: "Ethan Hunt",
      class: "1st Std",
      subjects: [
        { name: "Mathematics", marksObtained: 75, maxMarks: 100 },
        { name: "English", marksObtained: 72, maxMarks: 100 },
        { name: "Science", marksObtained: 78, maxMarks: 100 },
        { name: "Social Studies", marksObtained: 74, maxMarks: 100 },
      ],
    },
  ],
  "2nd Std": [
    {
      id: "STU006",
      name: "Fiona Green",
      class: "2nd Std",
      subjects: [
        { name: "Mathematics", marksObtained: 95, maxMarks: 100 },
        { name: "English", marksObtained: 92, maxMarks: 100 },
        { name: "Science", marksObtained: 94, maxMarks: 100 },
        { name: "Social Studies", marksObtained: 90, maxMarks: 100 },
        { name: "Hindi", marksObtained: 88, maxMarks: 100 },
      ],
    },
  ],
  "3rd Std": [
    {
      id: "STU011",
      name: "Kevin Hart",
      class: "3rd Std",
      subjects: [
        { name: "Mathematics", marksObtained: 88, maxMarks: 100 },
        { name: "English", marksObtained: 85, maxMarks: 100 },
        { name: "Science", marksObtained: 90, maxMarks: 100 },
        { name: "Social Studies", marksObtained: 87, maxMarks: 100 },
        { name: "Hindi", marksObtained: 82, maxMarks: 100 },
        { name: "Computer Science", marksObtained: 89, maxMarks: 100 },
      ],
    },
  ],
  "4th Std": [
    {
      id: "STU013",
      name: "Mike Johnson",
      class: "4th Std",
      subjects: [
        { name: "Mathematics", marksObtained: 92, maxMarks: 100 },
        { name: "English", marksObtained: 90, maxMarks: 100 },
        { name: "Science", marksObtained: 94, maxMarks: 100 },
        { name: "Social Studies", marksObtained: 88, maxMarks: 100 },
        { name: "Hindi", marksObtained: 91, maxMarks: 100 },
        { name: "Computer Science", marksObtained: 93, maxMarks: 100 },
        { name: "Art", marksObtained: 89, maxMarks: 100 },
      ],
    },
  ],
};

const Results = () => {
  const [selectedClass, setSelectedClass] = useState("");
  const [selectedStudent, setSelectedStudent] = useState(null);
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const [expandedGroups, setExpandedGroups] = useState({});

  // Extract unique classes from results data (numerical sort)
  const classes = Object.keys(mockResultsData).sort((a, b) => {
    const numA = parseInt(a.match(/\d+/)?.[0] || 0);
    const numB = parseInt(b.match(/\d+/)?.[0] || 0);
    return numA - numB;
  });

  // Group classes: 1st-5th Std and 6th-10th Std
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

  const currentClassData = useMemo(() => {
    if (!selectedClass) return [];
    return mockResultsData[selectedClass] || [];
  }, [selectedClass]);

  const calculateTotalPercentage = (student) => {
    const totalMarks = student.subjects.reduce((sum, sub) => sum + sub.marksObtained, 0);
    const maxTotalMarks = student.subjects.reduce((sum, sub) => sum + sub.maxMarks, 0);
    return maxTotalMarks > 0 ? (totalMarks / maxTotalMarks * 100).toFixed(1) : "0.0";
  };

  const isPassed = (student) => {
    const percentage = parseFloat(calculateTotalPercentage(student));
    return percentage >= 40;
  };

  const summaryStats = useMemo(() => {
    if (!currentClassData.length) {
      return { totalStudents: 0, passedStudents: 0, passPercentage: "0.0" };
    }
    const totalStudents = currentClassData.length;
    const passedStudents = currentClassData.filter(student => isPassed(student)).length;
    const passPercentage = totalStudents > 0 ? ((passedStudents / totalStudents) * 100).toFixed(1) : "0.0";
    return { totalStudents, passedStudents, passPercentage };
  }, [currentClassData]);

  const handleRowClick = (student) => {
    setSelectedStudent(student);
    setIsDialogOpen(true);
  };

  return (
    <div className="space-y-4 md:space-y-6">
      {/* Header - Responsive */}
      <div className="mb-4 md:mb-6">
        <h2 className="text-xl sm:text-2xl font-semibold mb-1 sm:mb-2 text-foreground">Results</h2>
        <p className="text-sm sm:text-base text-muted-foreground">
          View and analyze student examination results by class
        </p>
      </div>

      <Card className="p-4 sm:p-5 md:p-6">
        {/* Class Selector - Responsive */}
        <div className="mb-4 sm:mb-5 md:mb-6">
          <Label htmlFor="classSelect" className="text-foreground mb-2 block text-sm">
            Select Class
          </Label>
          
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <button
                id="classSelect"
                className="bg-background border border-border text-foreground w-full sm:w-auto sm:min-w-[280px] md:min-w-[300px] h-10 sm:h-12 px-3 py-2 rounded-md flex items-center justify-between text-sm"
              >
                <span className="truncate">{selectedClass || "Choose a class"}</span>
                <ChevronDown className="w-4 h-4 flex-shrink-0 ml-2" />
              </button>
            </DropdownMenuTrigger>
            <DropdownMenuContent 
              align="start" 
              className="w-[var(--radix-dropdown-menu-trigger-width)] sm:w-[280px] md:w-[300px] max-h-80 overflow-y-auto p-1"
            >
              {/* Classes 1st-5th Std GROUP */}
              <div className="py-1">
                <DropdownMenuItem 
                  className="cursor-pointer p-2 hover:bg-accent text-sm"
                  onClick={() => toggleGroup('lower')}
                  onSelect={(e) => e.preventDefault()}
                >
                  <span className="flex items-center justify-between w-full font-medium">
                    <span>Classes 1st-5th Std</span>
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
              
              {/* Classes 6th-10th Std GROUP */}
              <div className="py-1">
                <DropdownMenuItem 
                  className="cursor-pointer p-2 hover:bg-accent text-sm"
                  onClick={() => toggleGroup('upper')}
                  onSelect={(e) => e.preventDefault()}
                >
                  <span className="flex items-center justify-between w-full font-medium">
                    <span>Classes 6th-10th Std</span>
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
        </div>

        {/* Summary Stats Cards - Responsive Grid */}
        {selectedClass && currentClassData.length > 0 && (
          <div className="grid gap-3 sm:gap-4 grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 mb-4 sm:mb-5 md:mb-6">
            <Card className="p-3 sm:p-4 hover:shadow-lg transition-shadow">
              <div className="flex items-center justify-between">
                <div className="flex-1 min-w-0">
                  <p className="text-xs sm:text-sm text-muted-foreground mb-1 truncate">Total Students</p>
                  <p className="text-2xl sm:text-3xl font-bold text-foreground">
                    {summaryStats.totalStudents}
                  </p>
                </div>
                <div className="p-2.5 sm:p-3 rounded-lg bg-muted text-primary flex-shrink-0 ml-3">
                  <Users className="w-5 h-5 sm:w-6 sm:h-6" />
                </div>
              </div>
            </Card>

            <Card className="p-3 sm:p-4 hover:shadow-lg transition-shadow">
              <div className="flex items-center justify-between">
                <div className="flex-1 min-w-0">
                  <p className="text-xs sm:text-sm text-muted-foreground mb-1 truncate">Passed Students</p>
                  <p className="text-2xl sm:text-3xl font-bold text-foreground">
                    {summaryStats.passedStudents}
                  </p>
                </div>
                <div className="p-2.5 sm:p-3 rounded-lg bg-muted text-green-600 flex-shrink-0 ml-3">
                  <CheckCircle2 className="w-5 h-5 sm:w-6 sm:h-6" />
                </div>
              </div>
            </Card>

            <Card className="p-3 sm:p-4 hover:shadow-lg transition-shadow sm:col-span-2 lg:col-span-1">
              <div className="flex items-center justify-between">
                <div className="flex-1 min-w-0">
                  <p className="text-xs sm:text-sm text-muted-foreground mb-1 truncate">Pass Percentage</p>
                  <p className="text-2xl sm:text-3xl font-bold text-foreground">
                    {summaryStats.passPercentage}%
                  </p>
                </div>
                <div className="p-2.5 sm:p-3 rounded-lg bg-muted text-blue-600 flex-shrink-0 ml-3">
                  <TrendingUp className="w-5 h-5 sm:w-6 sm:h-6" />
                </div>
              </div>
            </Card>
          </div>
        )}

        {/* Results Table - Responsive */}
        {selectedClass && currentClassData.length > 0 ? (
          <>
            <div className="rounded-md border border-border overflow-hidden">
              <div className="overflow-x-auto">
                <Table className="min-w-[600px]">
                  <TableHeader>
                    <TableRow className="bg-muted">
                      <TableHead className="text-foreground text-xs sm:text-sm">Student ID</TableHead>
                      <TableHead className="text-foreground text-xs sm:text-sm">Name</TableHead>
                      <TableHead className="text-foreground text-xs sm:text-sm">Class</TableHead>
                      <TableHead className="text-foreground text-xs sm:text-sm">Total</TableHead>
                      <TableHead className="text-center text-foreground text-xs sm:text-sm">Result</TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    {currentClassData.map((student) => {
                      const totalPercentage = calculateTotalPercentage(student);
                      const passed = isPassed(student);
                      return (
                        <TableRow
                          key={student.id}
                          className="cursor-pointer hover:bg-muted/50 transition-colors"
                          onClick={() => handleRowClick(student)}
                        >
                          <TableCell className="text-foreground text-xs sm:text-sm">{student.id}</TableCell>
                          <TableCell className="text-foreground font-medium text-xs sm:text-sm">{student.name}</TableCell>
                          <TableCell className="text-foreground text-xs sm:text-sm">{student.class}</TableCell>
                          <TableCell className="text-foreground text-xs sm:text-sm">{totalPercentage}%</TableCell>
                          <TableCell className="text-center">
                            <Badge
                              className={`text-xs ${
                                passed
                                  ? "bg-green-100 text-green-700 hover:bg-green-100 border-green-200 dark:bg-green-900/30 dark:text-green-400"
                                  : "bg-red-100 text-red-700 hover:bg-red-100 border-red-200 dark:bg-red-900/30 dark:text-red-400"
                              }`}
                            >
                              {passed ? "Pass" : "Fail"}
                            </Badge>
                          </TableCell>
                        </TableRow>
                      );
                    })}
                  </TableBody>
                </Table>
              </div>
            </div>
            
            {/* Mobile Scroll Hint */}
            <p className="text-xs text-muted-foreground mt-2 text-center sm:hidden">
              ← Swipe to see more →
            </p>
          </>
        ) : selectedClass ? (
          <div className="text-center py-6 sm:py-8 text-sm sm:text-base text-muted-foreground">
            No results available for {selectedClass}.
          </div>
        ) : (
          <div className="text-center py-6 sm:py-8 text-sm sm:text-base text-muted-foreground">
            Please select a class to view results.
          </div>
        )}
      </Card>

      {/* Student Detail Dialog - Responsive */}
      <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
        <DialogContent className="w-[95vw] max-w-2xl max-h-[80vh] overflow-y-auto p-4 sm:p-6">
          <DialogHeader>
            <DialogTitle className="text-base sm:text-lg md:text-xl font-semibold">
              Subject-wise Marks - {selectedStudent?.name}
            </DialogTitle>
          </DialogHeader>
          
          {selectedStudent && (
            <>
              <div className="mt-3 sm:mt-4">
                {/* Student Info - Responsive */}
                <div className="mb-3 sm:mb-4 text-xs sm:text-sm text-muted-foreground space-y-1">
                  <p>
                    <span className="font-medium">Student ID:</span> {selectedStudent.id}
                  </p>
                  <p>
                    <span className="font-medium">Class:</span> {selectedStudent.class}
                  </p>
                </div>

                {/* Subject Marks Table - Responsive */}
                <div className="rounded-md border border-border overflow-hidden">
                  <div className="overflow-x-auto">
                    <Table className="min-w-[500px]">
                      <TableHeader>
                        <TableRow className="bg-muted">
                          <TableHead className="text-foreground text-xs sm:text-sm">Subject</TableHead>
                          <TableHead className="text-foreground text-xs sm:text-sm">Marks</TableHead>
                          <TableHead className="text-foreground text-xs sm:text-sm">Max</TableHead>
                          <TableHead className="text-foreground text-xs sm:text-sm">%</TableHead>
                        </TableRow>
                      </TableHeader>
                      <TableBody>
                        {selectedStudent.subjects.map((subject, index) => {
                          const percentage = (subject.marksObtained / subject.maxMarks * 100).toFixed(1);
                          return (
                            <TableRow key={index}>
                              <TableCell className="text-foreground font-medium text-xs sm:text-sm">
                                {subject.name}
                              </TableCell>
                              <TableCell className="text-foreground text-xs sm:text-sm">{subject.marksObtained}</TableCell>
                              <TableCell className="text-foreground text-xs sm:text-sm">{subject.maxMarks}</TableCell>
                              <TableCell className="text-foreground text-xs sm:text-sm">{percentage}%</TableCell>
                            </TableRow>
                          );
                        })}
                      </TableBody>
                    </Table>
                  </div>
                </div>

                {/* Mobile Scroll Hint */}
                <p className="text-xs text-muted-foreground mt-2 text-center sm:hidden">
                  ← Swipe to see more →
                </p>

                {/* Summary Box - Responsive */}
                <div className="mt-3 sm:mt-4 p-3 sm:p-4 bg-muted rounded-md">
                  <div className="flex justify-between items-center">
                    <span className="font-medium text-foreground text-sm sm:text-base">Total Percentage:</span>
                    <span className="text-base sm:text-lg font-bold text-foreground">
                      {calculateTotalPercentage(selectedStudent)}%
                    </span>
                  </div>
                  <div className="flex justify-between items-center mt-2">
                    <span className="font-medium text-foreground text-sm sm:text-base">Result:</span>
                    <Badge
                      className={`text-xs sm:text-sm ${
                        isPassed(selectedStudent)
                          ? "bg-green-100 text-green-700 hover:bg-green-100 border-green-200 dark:bg-green-900/30 dark:text-green-400"
                          : "bg-red-100 text-red-700 hover:bg-red-100 border-red-200 dark:bg-red-900/30 dark:text-red-400"
                      }`}
                    >
                      {isPassed(selectedStudent) ? "Pass" : "Fail"}
                    </Badge>
                  </div>
                </div>
              </div>
            </>
          )}
        </DialogContent>
      </Dialog>
    </div>
  );
};

export default Results;
