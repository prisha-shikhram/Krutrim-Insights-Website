// import routers
import { Routes, Route } from "react-router-dom";
import { Navigate, Outlet } from "react-router-dom";

// import scroll to top
import ScrollToTop from "./components/utils/Scroltotop";

// import pages
import HomePage from "./pages/HomePage";
import AboutPage from "./pages/AboutPage";
import Training from "./pages/Trainning";
import Gallery from "./pages/Gallery";
import ContactPage from "./pages/ContactPage";
import TermsPage from "./pages/TermsPage";
import PrivacyPage from "./pages/PrivacyPage";

// admin portal pages
import AdminLoginPage from "./pages/AdminLoginPage";
import AdminDashboardPage from "./pages/AdminDashboardPage";

// admin dashboard pages
import Overview from "./sections/Admin/Overview";
import ContactLeads from "./sections/Admin/ContactLeads";
import BrochureLeads from "./sections/Admin/BrochureLeads";
import CollegeLeads from "./sections/Admin/CollegeLeads";
import ProjectLeads from "./sections/Admin/ProjectLeads";
import UserManagement from "./sections/Admin/UserManagement";
import ActivityLogs from "./sections/Admin/ActivityLogs";
import EnrolledStudents from "./sections/Admin/EnrolledStudents";
import BatchManagement from "./sections/Admin/BatchManagement";
import RegisteredStudents from "./sections/Admin/RegisteredStudents";
import NoticePage from "./sections/Admin/NoticeBoard";

// mentor pages
import MentorLoginPage from "./pages/MentorLoginPage";
import MentorDashboard from "./sections/Mentor/MentorDashboard";

// mentor dashboard pages
import MentorNoticePage from "./sections/Mentor/MentorNoticePage";
import MentorAssignments from "./sections/Mentor/MentorAssignments";
import MentorAttendance from "./sections/Mentor/MentorAttendance";
import MentorProjects from "./sections/Mentor/MentorProjects";

// student portal pages
import StudentLogin from "./sections/Student/StudentLogin";
import EnrollmentPage from "./pages/EnrollmentPage";

// student dashboard
import StudentDashboard from "./sections/Student/StudentDashboard";
import StudentHome from "./sections/Student/StudentHome";
import StudententAttendance from "./sections/Student/StudententAttendance";
import StudentAssignment from "./sections/Student/StudentAssignment";
import StudentNoticeBoard from "./sections/Student/StudentNoticeBoard";
import StudentSettings from "./sections/Student/StudentSettings";
import StudentProjects from "./sections/Student/StudentProjects";

// college pages
import CollegeMain from "./pages/CollegeMain";
import College1 from "./pages/College1";
import College2 from "./pages/College2";

// course pages
import AgenticAI from "./pages/AgenticAI";
import DataAnalysis from "./pages/DataAnalysis";
import WebDev from "./pages/WebDev";
import BusinessAI from "./pages/BusinessAI";

// external pages
import ProjeProjectSubmission from "./pages/ProjectSubmissionPage";
import StudentRegistration from "./pages/StudentRegistrationPage";

// import routes
import { PublicRoute } from "./components/utils/PublicRoute";
import { ProtectedRoute } from "./components/utils/ProtectedRoute";

// main app component
export default function App() {
  return (
    <>
      <ScrollToTop />

      <Routes>
        {/* --- PUBLIC WEBSITE ROUTES --- */}
        <Route path="/" element={<HomePage />} />
        <Route path="/about" element={<AboutPage />} />
        <Route path="/training" element={<Training />} />
        <Route path="/project-gallery" element={<Gallery />} />
        <Route path="/contact" element={<ContactPage />} />
        <Route path="/terms" element={<TermsPage />} />
        <Route path="/privacy" element={<PrivacyPage />} />
        <Route path="/project-submission" element={<ProjeProjectSubmission />} />
        <Route path="/student-registration" element={<StudentRegistration />} />

        {/* --- ADMIN AUTH ROUTES --- */}
        <Route element={<PublicRoute userType="admin" />}>
          <Route path="/admin/login" element={<AdminLoginPage />} />
        </Route>

        {/* --- ADMIN PRIVATE ROUTES --- */}
        <Route element={<ProtectedRoute userType="admin" />}>
          <Route path="/admin/dashboard" element={<AdminDashboardPage />}>
            <Route index element={<Overview />} />
            <Route path="contact" element={<ContactLeads />} />
            <Route path="brochure" element={<BrochureLeads />} />
            <Route path="colleges" element={<CollegeLeads />} />
            <Route path="project" element={<ProjectLeads />} />
            <Route path="users" element={<UserManagement />} />
            <Route path="logs" element={<ActivityLogs />} />
            <Route path="enrolled" element={<EnrolledStudents />} />
            <Route path="batches" element={<BatchManagement />} />
            <Route path="registered" element={<RegisteredStudents />} />
            <Route path="notices" element={<NoticePage />} />
          </Route>
        </Route>

        {/* --- Mentor AUTH ROUTES --- */}
        <Route element={<PublicRoute userType="mentor" />}>
          <Route path="/mentor/login" element={<MentorLoginPage />} />
        </Route>

        <Route element={<ProtectedRoute userType="mentor" />}>
          <Route path="/mentor/dashboard" element={<MentorDashboard />}>
            <Route index element={<EnrolledStudents />} />

            <Route path="assignments" element={<MentorAssignments />} />
            <Route path="attendance" element={<MentorAttendance />} />
            <Route path="projects" element={<MentorProjects />} />
            <Route path="notices" element={<MentorNoticePage />} />
          </Route>
        </Route>

        {/* --- Student AUTH ROUTES --- */}
        <Route element={<PublicRoute userType="student" />}>
          <Route path="/student/login" element={<StudentLogin />} />
        </Route>

        <Route path="/student/enroll" element={<EnrollmentPage />} />

        <Route element={<ProtectedRoute userType="student" />}>
          <Route path="/student/dashboard" element={<StudentDashboard />}>
            <Route index element={<StudentHome />} />

            <Route path="overview" element={<StudentHome />} />
            <Route path="attendance" element={<StudententAttendance />} />
            <Route path="assignments" element={<StudentAssignment />} />
            <Route path="projects" element={<StudentProjects />} />
            <Route path="notices" element={<StudentNoticeBoard />} />
            <Route path="settings" element={<StudentSettings />} />
          </Route>
        </Route>

        {/* --- COURSE & COLLEGE ROUTES --- */}
        <Route path="/courses/agentic-ai" element={<AgenticAI />} />
        <Route path="/courses/data-analysis" element={<DataAnalysis />} />
        <Route path="/courses/web-development" element={<WebDev />} />
        <Route path="/courses/ai-for-business" element={<BusinessAI />} />

        <Route path="/college/home" element={<CollegeMain />} />
        <Route path="/college/Tecnia" element={<College1 />} />
        <Route path="/college/SGTBIMIT" element={<College2 />} />

      </Routes>
    </>
  );
}