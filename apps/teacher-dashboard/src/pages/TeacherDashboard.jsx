import React, { useState, useEffect } from 'react';
import Sidebar from './teacher/components/layout/Sidebar';
import Header from './teacher/components/layout/Header';
import HomePage from './teacher/components/sections/HomePage';
import SubjectPage from './teacher/components/sections/SubjectPage';
import ClassesPage from './teacher/components/sections/ClassesPage';
import AssignmentsPage from './teacher/components/sections/AssignmentsPage';
import NotesPage from './teacher/components/sections/NotesPage';
import ExamsPage from './teacher/components/sections/ExamsPage';
import ReportCardPage from './teacher/components/sections/ReportCardPage';
import TimeTablePage from './teacher/components/sections/TimeTablePage';
import ProfilePage from './teacher/components/sections/ProfilePage';
import Meetings from './teacher/components/sections/Meetings';


export default function TeacherDashboard() {
  const [currentPage, setCurrentPage] = useState("Home");
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);

  useEffect(() => {
    document.title = `Teacher Dashboard - ${currentPage}`;
  }, [currentPage]);

  const renderPage = () => {
    switch (currentPage) {
      case "Home":
        return <HomePage />;
      case "Subject":
        return <SubjectPage />;
      case "Classes":
        return <ClassesPage />;
      case "Assignments":
        return <AssignmentsPage />;
      case "Notes":
        return <NotesPage />;
      case "Exams":
        return <ExamsPage />;
      case "Report Card":
        return <ReportCardPage />;
      case "Lesson planner":
        return <TimeTablePage />;
      case "Profile":
        return <ProfilePage />;
      case "Meeting":
        return <Meetings />;
      default:
        return <HomePage />;
    }
  };

  return (
    <div className="flex h-screen bg-[#F4F7FE]">
      <Sidebar
        currentPage={currentPage}
        setCurrentPage={setCurrentPage}
        isSidebarOpen={isSidebarOpen}
        setIsSidebarOpen={setIsSidebarOpen}
      />
      <div className="flex-1 flex flex-col h-screen overflow-y-auto">
        <Header
          toggleSidebar={() => setIsSidebarOpen(s => !s)}
          currentPage={currentPage}
        />
        <main className="flex-1 p-4 md:p-6">
          {renderPage()}
        </main>
      </div>
    </div>
  );
}
