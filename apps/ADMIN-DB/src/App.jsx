import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { SidebarProvider } from './contexts/SidebarContext'; 
import { cn } from '@/lib/utils';
import { useSidebar } from './contexts/SidebarContext';
import Layout from './components/layout/Layout'; 
import Dashboard from "./pages/Dashboard";
import Requests from "./pages/Requests";
import AddTeacher from "./pages/AddTeacher";
import Teachers from "./pages/Teachers";
import Students from "./pages/Students";
import AddStudent from "./pages/AddStudent";
import Parents from "./pages/Parents";
import Subjects from "./pages/Subjects";
import Attendance from "./pages/Attendance";
import Results from "./pages/Results";
import Announcements from "./pages/Announcements";
import { ProfileProvider } from "@/contexts/ProfileContext";
import Sidebar from "./components/layout/Sidebar";
import Topbar from "./components/layout/Topbar";

const queryClient = new QueryClient();

const App = () => (
  
  <QueryClientProvider client={queryClient}>
    <TooltipProvider>
      <Toaster />
      <Sonner />
      <ProfileProvider>
      <SidebarProvider>
      <BrowserRouter>
        <div className="min-h-screen bg-sidebar p-3">
          <Layout>
                <Routes>
                  <Route path="/" element={<Dashboard />} />
                  <Route path="/requests" element={<Requests />} />
                  <Route path="/add-teacher" element={<AddTeacher />} />
                  <Route path="/teachers" element={<Teachers />} />
                  <Route path="/students" element={<Students />} />
                  <Route path="/add-student" element={<AddStudent />} />
                  <Route path="/parents" element={<Parents />} />
                  <Route path="/subjects" element={<Subjects />} />
                  <Route path="/attendance" element={<Attendance />} />
                  <Route path="/results" element={<Results />} />
                  <Route path="/announcements" element={<Announcements />} />
                  <Route path="*" element={<div className="text-center p-6">Page not found</div>} />
                </Routes>
              </Layout>
        </div>
      </BrowserRouter>
      </SidebarProvider>
      </ProfileProvider>
    </TooltipProvider>
  </QueryClientProvider>
);

export default App;

