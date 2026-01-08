import { BrowserRouter, Routes, Route } from "react-router-dom";
import { SidebarDemo } from "./components/ui/sidebar-demo";
import { PageWithSidebar } from "./components/layouts/PageWithSidebar";
import { CoursesPage } from "./pages/CoursesPage";
import StudentDetailsPage from "./pages/StudentDetailsPage";
import EventPage from "./pages/EventPage";
import CoursesDetailPage from "./pages/CoursesDetailPage";
import AssignmentPage from "./pages/AssignmentPage";
import ELibraryPage from "./pages/ELibraryPage";
import AnnouncementsPage from "./pages/AnnouncementsPage";
import ResultPage from "./pages/ResultPage";
import { ProfilePage } from "./components/ui/profile-page";
import BillingPage from "./pages/BillingPage";
export function Router() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<SidebarDemo />} />
        <Route path="/courses" element={<CoursesPage />} />
        <Route path="/attendance" element={<StudentDetailsPage />} />
        <Route path="/events" element={<EventPage />} />
        <Route path="/assignments" element={<AssignmentPage />} />
        <Route path="/elibrary" element={<ELibraryPage />} />
        <Route path="/announcements" element={<AnnouncementsPage />} />
        <Route path="/courses-detail" element={<CoursesDetailPage />} />
        <Route path="/results" element={<ResultPage />} />
        <Route path="/profile" element={<PageWithSidebar><ProfilePage /></PageWithSidebar>} />
        <Route path="/payment" element={<PageWithSidebar><BillingPage /></PageWithSidebar>} />
        {/* Add more routes here as needed */}
      </Routes>
    </BrowserRouter>
  );
}

