import { useState, useEffect, useMemo } from "react";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
  DropdownMenu,
  DropdownMenuTrigger,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
} from "@/components/ui/dropdown-menu";
import mockAttendanceData from "../data/mockAttendanceData";
import { Download, Search as SearchIcon, ChevronDown } from "lucide-react";

const Attendance = () => {
  const [selectedClass, setSelectedClass] = useState("");
  const [selectedSubject, setSelectedSubject] = useState("");
  const [searchTerm, setSearchTerm] = useState("");
  const [expandedGroups, setExpandedGroups] = useState({});

  useEffect(() => {
    if (!selectedClass) {
      setSelectedSubject("");
    }
  }, [selectedClass]);

  // Extract REAL classes from mockAttendanceData (numerical sort)
  const classes = useMemo(() => {
    const uniqueClasses = Array.from(
      new Set(mockAttendanceData.map(item => item.class))
    ).sort((a, b) => {
      const numA = parseInt(a.match(/\d+/)?.[0] || 0);
      const numB = parseInt(b.match(/\d+/)?.[0] || 0);
      return numA - numB;
    });
    return uniqueClasses;
  }, []);

  // Group classes: 1st-5th and 6th+
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
    return mockAttendanceData.find(item => item.class === selectedClass) || null;
  }, [selectedClass]);

  const availableSubjects = currentClassData?.subjects ?? [];

  const attendanceRows = useMemo(() => {
    if (!currentClassData || !selectedSubject) return [];

    const query = searchTerm.trim().toLowerCase();
    return currentClassData.students
      .filter(student => student.name.toLowerCase().includes(query))
      .map(student => {
        const statsForSubject = student.attendance[selectedSubject] ?? { total: 0, present: 0 };
        const totalClasses = statsForSubject.total;
        const presentClasses = statsForSubject.present;
        const attendancePct = totalClasses ? (presentClasses / totalClasses * 100).toFixed(1) : "0.0";
        
        return {
          id: student.id,
          name: student.name,
          total: totalClasses,
          present: presentClasses,
          percentage: attendancePct,
        };
      });
  }, [currentClassData, selectedSubject, searchTerm]);

  const handleDownloadReport = () => {
    if (!attendanceRows.length) return;

    const header = ["Student Name", "Student ID", "Total Classes", "Present", "Attendance %"];
    const rows = attendanceRows.map(row => [
      row.name,
      row.id,
      row.total,
      row.present,
      row.percentage,
    ]);

    const csvContent = [header, ...rows.map(row => row.join(","))].join("\n");
    const blob = new Blob([csvContent], { type: "text/csv;charset=utf-8" });
    const url = URL.createObjectURL(blob);
    const link = document.createElement("a");
    link.href = url;
    link.download = `${selectedClass} - ${selectedSubject} attendance-report.csv`;
    link.click();
    URL.revokeObjectURL(url);
  };

  return (
    <div className="space-y-4 md:space-y-6">
      {/* Header - Responsive */}
      <div className="mb-4 md:mb-6">
        <h2 className="text-xl sm:text-2xl font-semibold mb-1 sm:mb-2 text-foreground">Attendance</h2>
        <p className="text-sm sm:text-base text-muted-foreground">
          Monitor daily attendance trends across classes and subjects.
        </p>
      </div>

      <Card className="p-4 sm:p-5 md:p-6">
        {/* Filters - Responsive Grid */}
        <div className="grid gap-3 sm:gap-4 grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 mb-4">
          {/* Class Dropdown - Responsive */}
          <div>
            <Label htmlFor="classSelect" className="text-foreground mb-2 block text-sm">
              Select Class
            </Label>
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <Button
                  id="classSelect"
                  variant="outline"
                  className="w-full justify-between h-9 sm:h-10 bg-background border-border text-foreground text-sm"
                >
                  <span className="truncate">{selectedClass || "Choose a class"}</span>
                  <ChevronDown className="w-4 h-4 shrink-0 opacity-50 ml-2" />
                </Button>
              </DropdownMenuTrigger>
              <DropdownMenuContent 
                align="start" 
                className="w-[var(--radix-dropdown-menu-trigger-width)] sm:w-60 max-h-80 overflow-y-auto p-1"
              >
                {/* Classes 1st-5th GROUP */}
                <div className="py-1">
                  <DropdownMenuItem 
                    className="cursor-pointer p-2 hover:bg-accent text-sm"
                    onClick={() => toggleGroup('lower')}
                    onSelect={(e) => e.preventDefault()}
                  >
                    <span className="flex items-center justify-between w-full font-medium">
                      <span>Classes 1st-5th</span>
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
                
                {/* Classes 6th+ GROUP */}
                <div className="py-1">
                  <DropdownMenuItem 
                    className="cursor-pointer p-2 hover:bg-accent text-sm"
                    onClick={() => toggleGroup('upper')}
                    onSelect={(e) => e.preventDefault()}
                  >
                    <span className="flex items-center justify-between w-full font-medium">
                      <span>Classes 6th+</span>
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

          {/* Subject Select - Responsive */}
          <div>
            <Label htmlFor="subjectSelect" className="text-foreground mb-2 block text-sm">
              Select Subject
            </Label>
            <select
              id="subjectSelect"
              value={selectedSubject}
              onChange={(e) => setSelectedSubject(e.target.value)}
              disabled={!selectedClass}
              className={`w-full h-9 sm:h-10 px-3 py-2 rounded-md border text-foreground text-sm ${
                !selectedClass 
                  ? 'bg-background border-border cursor-not-allowed opacity-50' 
                  : 'bg-background border-border focus:border-primary focus:ring-2 focus:ring-ring focus:ring-offset-2'
              }`}
            >
              <option value="" disabled>
                {selectedClass ? "Choose a subject" : "Select class first"}
              </option>
              {availableSubjects.map((sub) => (
                <option key={sub} value={sub}>
                  {sub}
                </option>
              ))}
            </select>
          </div>

          {/* Search Student - Responsive */}
          <div className="sm:col-span-2 lg:col-span-1">
            <Label htmlFor="searchStudent" className="text-foreground mb-2 block text-sm">
              Search Student
            </Label>
            <div className="relative">
              <SearchIcon className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
              <Input
                id="searchStudent"
                placeholder="Student name..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                disabled={!selectedSubject}
                className="pl-10 bg-background border-border text-foreground h-9 sm:h-10 text-sm"
              />
            </div>
          </div>
        </div>

        {/* Stats and Download - Responsive */}
        <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-3 mb-4">
          <p className="text-xs sm:text-sm text-muted-foreground">
            Showing <span className="font-medium text-foreground">
              {attendanceRows.length}
            </span> {attendanceRows.length === 1 ? "student" : "students"}
          </p>
          <Button
            onClick={handleDownloadReport}
            variant="outline"
            size="sm"
            className="gap-2 w-full sm:w-auto text-xs sm:text-sm h-8 sm:h-9"
            disabled={!attendanceRows.length}
          >
            <Download className="w-3 h-3 sm:w-4 sm:h-4" />
            <span className="hidden xs:inline">Download Report</span>
            <span className="xs:hidden">Download</span>
          </Button>
        </div>

        {/* Table - Responsive with horizontal scroll */}
        <div className="rounded-md border border-border overflow-hidden">
          <div className="overflow-x-auto">
            <table className="w-full min-w-[640px]">
              <thead className="bg-muted">
                <tr>
                  <th className="px-3 sm:px-4 md:px-6 py-2 sm:py-3 text-left text-xs sm:text-sm font-medium text-foreground">
                    Student Name
                  </th>
                  <th className="px-3 sm:px-4 md:px-6 py-2 sm:py-3 text-left text-xs sm:text-sm font-medium text-foreground">
                    Student ID
                  </th>
                  <th className="px-3 sm:px-4 md:px-6 py-2 sm:py-3 text-left text-xs sm:text-sm font-medium text-foreground">
                    Total Classes
                  </th>
                  <th className="px-3 sm:px-4 md:px-6 py-2 sm:py-3 text-left text-xs sm:text-sm font-medium text-foreground">
                    Present
                  </th>
                  <th className="px-3 sm:px-4 md:px-6 py-2 sm:py-3 font-medium text-foreground text-center text-xs sm:text-sm">
                    Attendance %
                  </th>
                </tr>
              </thead>
              <tbody className="bg-background divide-y divide-border">
                {attendanceRows.length === 0 ? (
                  <tr>
                    <td colSpan={5} className="px-4 sm:px-6 py-6 sm:py-8 text-center text-muted-foreground text-xs sm:text-sm">
                      {!selectedClass 
                        ? "Select a class to view attendance data." 
                        : !selectedSubject 
                          ? "Select a subject to view attendance data." 
                          : "No students found matching your search."
                      }
                    </td>
                  </tr>
                ) : (
                  attendanceRows.map((row) => (
                    <tr key={row.id} className="hover:bg-muted/50 transition-colors">
                      <td className="px-3 sm:px-4 md:px-6 py-3 sm:py-4 text-xs sm:text-sm text-foreground font-medium">
                        {row.name}
                      </td>
                      <td className="px-3 sm:px-4 md:px-6 py-3 sm:py-4 text-xs sm:text-sm text-muted-foreground">
                        {row.id}
                      </td>
                      <td className="px-3 sm:px-4 md:px-6 py-3 sm:py-4 text-xs sm:text-sm text-foreground">
                        {row.total}
                      </td>
                      <td className="px-3 sm:px-4 md:px-6 py-3 sm:py-4 text-xs sm:text-sm text-foreground">
                        {row.present}
                      </td>
                      <td className="px-3 sm:px-4 md:px-6 py-3 sm:py-4 text-center">
                        <span
                          className={`inline-block px-2 sm:px-3 py-0.5 sm:py-1 rounded-full text-xs sm:text-sm font-medium ${
                            parseFloat(row.percentage) >= 75
                              ? "bg-green-100 text-green-700 dark:bg-green-900/30 dark:text-green-400"
                              : parseFloat(row.percentage) >= 50
                              ? "bg-yellow-100 text-yellow-700 dark:bg-yellow-900/30 dark:text-yellow-400"
                              : "bg-red-100 text-red-700 dark:bg-red-900/30 dark:text-red-400"
                          }`}
                        >
                          {row.percentage}%
                        </span>
                      </td>
                    </tr>
                  ))
                )}
              </tbody>
            </table>
          </div>
        </div>

        {/* Mobile Scroll Hint */}
        {attendanceRows.length > 0 && (
          <p className="text-xs text-muted-foreground mt-2 text-center sm:hidden">
            ← Swipe to see more →
          </p>
        )}
      </Card>
    </div>
  );
};

export default Attendance;
