import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { AuthProvider } from "@/contexts/AuthContext";
import ProtectedRoute from "@/components/ProtectedRoute";
import Login from "./pages/Login";
import Register from "./pages/Register";
import Dashboard from "./pages/Dashboard";
import StudentDashboard from "./pages/StudentDashboard";
import StudyMaterials from "./pages/StudyMaterials";
import CompanyPrep from "./pages/CompanyPrep";
import CodingChallenges from "./pages/CodingChallenges";
import MockTests from "./pages/MockTests";
import Progress from "./pages/Progress";
import SkillGap from "./pages/SkillGap";
import AIPage from "./pages/AI";
import StudentProfile from "./pages/StudentProfile";
import AdminDashboard from "./pages/AdminDashboard";
import PlacementDashboard from "./pages/PlacementDashboard";
import NotFound from "./pages/NotFound";

const queryClient = new QueryClient();

const P = ({ children, roles }: { children: React.ReactNode; roles?: string[] }) => (
  <ProtectedRoute allowedRoles={roles}>{children}</ProtectedRoute>
);

const App = () => (
  <QueryClientProvider client={queryClient}>
    <AuthProvider>
      <TooltipProvider>
        <Toaster />
        <Sonner />
        <BrowserRouter>
          <Routes>
            <Route path="/" element={<Dashboard />} />
            <Route path="/login" element={<Login />} />
            <Route path="/register" element={<Register />} />

            {/* Student routes */}
            <Route path="/dashboard" element={<P roles={["student"]}><StudentDashboard /></P>} />
            <Route path="/materials" element={<P roles={["student"]}><StudyMaterials /></P>} />
            <Route path="/study-materials" element={<P roles={["student"]}><StudyMaterials /></P>} />
            <Route path="/company-prep" element={<P roles={["student"]}><CompanyPrep /></P>} />
            <Route path="/coding" element={<P roles={["student"]}><CodingChallenges /></P>} />
            <Route path="/mock-tests" element={<P roles={["student"]}><MockTests /></P>} />
            <Route path="/progress" element={<P roles={["student"]}><Progress /></P>} />
            <Route path="/skill-gap" element={<P roles={["student"]}><SkillGap /></P>} />
            <Route path="/ai" element={<P roles={["student"]}><AIPage /></P>} />
            <Route path="/profile" element={<P roles={["student"]}><StudentProfile /></P>} />

            {/* Admin routes */}
            <Route path="/admin" element={<P roles={["admin"]}><AdminDashboard /></P>} />
            <Route path="/admin/students" element={<P roles={["admin"]}><AdminDashboard /></P>} />
            <Route path="/admin/upload" element={<P roles={["admin"]}><AdminDashboard /></P>} />
            <Route path="/admin/tests" element={<P roles={["admin"]}><AdminDashboard /></P>} />

            {/* Placement routes */}
            <Route path="/placement" element={<P roles={["placement"]}><PlacementDashboard /></P>} />
            <Route path="/placement/*" element={<P roles={["placement"]}><PlacementDashboard /></P>} />

            <Route path="*" element={<NotFound />} />
          </Routes>
        </BrowserRouter>
      </TooltipProvider>
    </AuthProvider>
  </QueryClientProvider>
);

export default App;
