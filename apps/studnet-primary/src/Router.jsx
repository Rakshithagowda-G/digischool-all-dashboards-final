import { BrowserRouter, Routes, Route } from "react-router-dom";
import { SidebarDemo } from "./components/ui/sidebar-demo";
import { PageWithSidebar } from "./components/layouts/PageWithSidebar";
import { CoursesPage } from "./pages/CoursesPage";
import StudentDetailsPage from "./pages/StudentDetailsPage";
import EventPage from "./pages/EventPage";
import CoursesDetailPage from "./pages/CoursesDetailPage";
import ELibraryPage from "./pages/ELibraryPage";
import AnnouncementsPage from "./pages/AnnouncementsPage";
import { ProfilePage } from "./components/ui/profile-page";

import StudentDashboardPage from "./pages/StudentDashboardPage";
import ResultsPage from "./pages/ResultsPage";
export function Router() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<SidebarDemo />} />
        <Route path="/courses" element={<CoursesPage />} />
        <Route path="/attendance" element={<StudentDetailsPage />} />
        <Route path="/events" element={<EventPage />} />
        <Route path="/elibrary" element={<ELibraryPage />} />
        <Route path="/announcements" element={<AnnouncementsPage />} />
        <Route path="/courses-detail/:courseId" element={<CoursesDetailPage />} />
        <Route path="/profile" element={<PageWithSidebar><ProfilePage /></PageWithSidebar>} />

        <Route path="/assignment" element={<StudentDashboardPage />} />
        <Route path="/results" element={<ResultsPage />} />
        {/* Add more routes here as needed */}
      </Routes>
    </BrowserRouter>
  );
}

