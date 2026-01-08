import { BrowserRouter, Routes, Route } from "react-router-dom";
import { SidebarDemo } from "./components/ui/sidebar-demo";
import { PageWithSidebar } from "./components/layouts/PageWithSidebar";
import StudentDetailsPage from "./pages/StudentDetailsPage";
import AnnouncementsPage from "./pages/AnnouncementsPage";
import ResultPage from "./pages/ResultPage";
import PerformancePage from "./pages/PerformancePage";
import { ProfilePage } from "./components/ui/profile-page";

export function Router() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<SidebarDemo />} />
        <Route path="/attendance" element={<StudentDetailsPage />} />
        <Route path="/announcements" element={<AnnouncementsPage />} />
        <Route path="/results" element={<ResultPage />} />
        <Route path="/performance" element={<PerformancePage />} />
        <Route path="/profile" element={<PageWithSidebar><ProfilePage /></PageWithSidebar>} />
      </Routes>
    </BrowserRouter>
  );
}
