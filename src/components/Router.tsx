import { RouterProvider, createBrowserRouter } from "react-router-dom";
import { lazy, Suspense, useEffect, useRef } from "react";
import ErrorPage from "@/components/ErrorPage";
import { LoadingSpinner } from "@/components/ui/loading-spinner";

// Lazy load page components for better performance
const HomePage = lazy(() => import("@/components/pages/HomePage").catch(() => {
  return {
    default: () => (
      <div style={{ padding: '40px', textAlign: 'center', fontFamily: 'Arial, sans-serif' }}>
        <h1>🚀 VR Robotics Academy</h1>
        <p>Welcome to the home page</p>
        <p style={{ color: '#666' }}>The router is working!</p>
        <a href="/vr-robotics-academy/curriculum" style={{ display: 'inline-block', marginTop: '20px', padding: '10px 20px', background: '#007bff', color: 'white', textDecoration: 'none', borderRadius: '5px' }}>
          View Curriculum
        </a>
      </div>
    )
  };
}));
const AboutPage = lazy(() => import("@/components/pages/AboutPage"));
const ContactPage = lazy(() => import("@/components/pages/ContactPage"));
const LoginPage = lazy(() => import("@/components/pages/LoginPage"));
const StudentSignupPage = lazy(() => import("@/components/pages/StudentSignupPage"));
const TeacherLoginPage = lazy(() => import("@/components/pages/TeacherLoginPage"));
const TeacherSignupPage = lazy(() => import("@/components/pages/TeacherSignupPage"));
const DemoBookingPage = lazy(() => import("@/components/pages/DemoBookingPage"));
const DemoBookingsExportPage = lazy(() => import("@/components/pages/DemoBookingsExportPage"));
const CurriculumPage = lazy(() => import("@/components/pages/CurriculumPage"));
const AdmissionProcessPage = lazy(() => import("@/components/pages/AdmissionProcessPage"));
const ProgramFeesPage = lazy(() => import("@/components/pages/ProgramFeesPage"));
const WhyVRRoboticsPage = lazy(() => import("@/components/pages/WhyVRRoboticsPage"));
const WhatKidsLearnPage = lazy(() => import("@/components/pages/WhatKidsLearnPage"));
const HowKidsBuildPage = lazy(() => import("@/components/pages/HowKidsBuildPage"));
const PythonProgrammingPage = lazy(() => import("@/components/pages/PythonProgrammingPage"));
const Interactive3DRobotPage = lazy(() => import("@/components/pages/Interactive3DRobotPage"));
const Grades1to3CurriculumPage = lazy(() => import("@/components/pages/Grades1to3CurriculumPage"));

// Module pages
const ModuleDetailsPage = lazy(() => import("@/components/pages/ModuleDetailsPage"));
const Module1DetailsPage = lazy(() => import("@/components/pages/Module1DetailsPage"));
const Module2DetailsPage = lazy(() => import("@/components/pages/Module2DetailsPage"));
const Module3DetailsPage = lazy(() => import("@/components/pages/Module3DetailsPage"));
const Module4DetailsPage = lazy(() => import("@/components/pages/Module4DetailsPage"));
const Module5DetailsPage = lazy(() => import("@/components/pages/Module5DetailsPage"));
const Module6DetailsPage = lazy(() => import("@/components/pages/Module6DetailsPage"));
const Module7DetailsPage = lazy(() => import("@/components/pages/Module7DetailsPage"));
const Module8DetailsPage = lazy(() => import("@/components/pages/Module8DetailsPage"));
const Module9DetailsPage = lazy(() => import("@/components/pages/Module9DetailsPage"));


// Student pages
const StudentApplicationPage = lazy(() => import("@/components/pages/StudentApplicationPage"));
const StudentDashboardPage = lazy(() => import("@/components/pages/StudentDashboardPage"));
const StudentDashboardNewPage = lazy(() => import("@/components/pages/StudentDashboardNewPage"));
const StudentDashboardFinalPage = lazy(() => import("@/components/pages/StudentDashboardFinalPage"));
const StudentUpcomingClassesPage = lazy(() => import("@/components/pages/StudentUpcomingClassesPage"));
const GamifiedStudentDashboard = lazy(() => import("@/components/pages/GamifiedStudentDashboard"));

// Teacher pages
const TeacherDashboardPage = lazy(() => import("@/components/pages/TeacherDashboardPage"));
const TeacherProfilePage = lazy(() => import("@/components/pages/TeacherProfilePage"));
const TeacherDemoManagementPage = lazy(() => import("@/components/pages/TeacherDemoManagementPage"));
const TeacherCurriculumPage = lazy(() => import("@/components/pages/TeacherCurriculumPage"));
const TeacherClassManagementPage = lazy(() => import("@/components/pages/TeacherClassManagementPage"));
const TeacherRenewalPage = lazy(() => import("@/components/pages/TeacherRenewalPage"));
const TeacherMyTrainingPage = lazy(() => import("@/components/pages/TeacherMyTrainingPage"));
const TeacherAuditPage = lazy(() => import("@/components/pages/TeacherAuditPage"));
const TeacherPerformancePage = lazy(() => import("@/components/pages/TeacherPerformancePage"));
const TeacherPayoutPage = lazy(() => import("@/components/pages/TeacherPayoutPage"));
const TeacherLeaveManagementPage = lazy(() => import("@/components/pages/TeacherLeaveManagementPage"));
const TeacherOthersPage = lazy(() => import("@/components/pages/TeacherOthersPage"));
const TeacherHelpSupportPage = lazy(() => import("@/components/pages/TeacherHelpSupportPage"));
const TeacherUpcomingClassesPage = lazy(() => import("@/components/pages/TeacherUpcomingClassesPage"));
const TeacherToolsPage = lazy(() => import("@/components/pages/TeacherToolsPage"));
const TeacherApprovalPage = lazy(() => import("@/components/pages/TeacherApprovalPage"));

// Admin pages
const AdminDashboardPage = lazy(() => import("@/components/pages/AdminDashboardPage"));
const AdminDashboardNewPage = lazy(() => import("@/components/pages/AdminDashboardNewPage"));
const AdminPanelPage = lazy(() => import("@/components/pages/AdminPanelPage"));
const AdminAnalyticsPage = lazy(() => import("@/components/pages/AdminAnalyticsPage"));
const AdminAddCoursesPage = lazy(() => import("@/components/pages/AdminAddCoursesPage"));
const AdminFeaturedCoursesPage = lazy(() => import("@/components/pages/AdminFeaturedCoursesPage"));
const AdminNewStudentsPage = lazy(() => import("@/components/pages/AdminNewStudentsPage"));
const AdminNewTeachersPage = lazy(() => import("@/components/pages/AdminNewTeachersPage"));
const AdminStudentApprovalsPage = lazy(() => import("@/components/pages/AdminStudentApprovalsPage"));
const AdminUpcomingClassesPage = lazy(() => import("@/components/pages/AdminUpcomingClassesPage"));
const AdminNotificationsPage = lazy(() => import("@/components/pages/AdminNotificationsPage"));
const ManagementDashboardPage = lazy(() => import("@/components/pages/ManagementDashboardPage"));
const AdvancedAnalyticsPage = lazy(() => import("@/components/pages/AdvancedAnalyticsPage"));
const AdvancedGradingPage = lazy(() => import("@/components/pages/AdvancedGradingPage"));
const CollaborationHubPage = lazy(() => import("@/components/pages/CollaborationHubPage"));
const CertificatesPage = lazy(() => import("@/components/pages/CertificatesPage"));

// Loading wrapper component
const SuspenseWrapper = ({ children }: { children: React.ReactNode }) => (
  <Suspense fallback={<LoadingSpinner />}>
    {children}
  </Suspense>
);

const router = createBrowserRouter([
  // Public Pages
  {
    path: "/",
    element: <SuspenseWrapper><HomePage /></SuspenseWrapper>,
    errorElement: <ErrorPage />,
  },
  {
    path: "about",
    element: <SuspenseWrapper><AboutPage /></SuspenseWrapper>,
  },
  {
    path: "contact",
    element: <SuspenseWrapper><ContactPage /></SuspenseWrapper>,
  },
  {
    path: "demo-booking",
    element: <SuspenseWrapper><DemoBookingPage /></SuspenseWrapper>,
  },
  {
    path: "demo-bookings-export",
    element: <SuspenseWrapper><DemoBookingsExportPage /></SuspenseWrapper>,
  },
  {
    path: "curriculum",
    element: <SuspenseWrapper><CurriculumPage /></SuspenseWrapper>,
  },
  {
    path: "admission-process",
    element: <SuspenseWrapper><AdmissionProcessPage /></SuspenseWrapper>,
  },
  {
    path: "program-fees",
    element: <SuspenseWrapper><ProgramFeesPage /></SuspenseWrapper>,
  },
  {
    path: "why-vr-robotics",
    element: <SuspenseWrapper><WhyVRRoboticsPage /></SuspenseWrapper>,
  },
  {
    path: "what-kids-learn",
    element: <SuspenseWrapper><WhatKidsLearnPage /></SuspenseWrapper>,
  },
  {
    path: "how-kids-build",
    element: <SuspenseWrapper><HowKidsBuildPage /></SuspenseWrapper>,
  },
  {
    path: "python-programming",
    element: <SuspenseWrapper><PythonProgrammingPage /></SuspenseWrapper>,
  },
  {
    path: "interactive-3d-robot",
    element: <SuspenseWrapper><Interactive3DRobotPage /></SuspenseWrapper>,
  },
  {
    path: "grades-1-3-curriculum",
    element: <SuspenseWrapper><Grades1to3CurriculumPage /></SuspenseWrapper>,
  },

  // Module Pages
  {
    path: "modules",
    element: <SuspenseWrapper><ModuleDetailsPage /></SuspenseWrapper>,
  },
  {
    path: "module-1",
    element: <SuspenseWrapper><Module1DetailsPage /></SuspenseWrapper>,
  },
  {
    path: "module-2",
    element: <SuspenseWrapper><Module2DetailsPage /></SuspenseWrapper>,
  },
  {
    path: "module-3",
    element: <SuspenseWrapper><Module3DetailsPage /></SuspenseWrapper>,
  },
  {
    path: "module-4",
    element: <SuspenseWrapper><Module4DetailsPage /></SuspenseWrapper>,
  },
  {
    path: "module-5",
    element: <SuspenseWrapper><Module5DetailsPage /></SuspenseWrapper>,
  },
  {
    path: "module-6",
    element: <SuspenseWrapper><Module6DetailsPage /></SuspenseWrapper>,
  },
  {
    path: "module-7",
    element: <SuspenseWrapper><Module7DetailsPage /></SuspenseWrapper>,
  },
  {
    path: "module-8",
    element: <SuspenseWrapper><Module8DetailsPage /></SuspenseWrapper>,
  },
  {
    path: "module-9",
    element: <SuspenseWrapper><Module9DetailsPage /></SuspenseWrapper>,
  },

  // Authentication Pages
  {
    path: "login",
    element: <SuspenseWrapper><LoginPage /></SuspenseWrapper>,
  },
  {
    path: "student-signup",
    element: <SuspenseWrapper><StudentSignupPage /></SuspenseWrapper>,
  },
  {
    path: "teacher-login",
    element: <SuspenseWrapper><TeacherLoginPage /></SuspenseWrapper>,
  },
  {
    path: "teacher-signup",
    element: <SuspenseWrapper><TeacherSignupPage /></SuspenseWrapper>,
  },

  // Student Dashboard & Pages
  {
    path: "student-application",
    element: <SuspenseWrapper><StudentApplicationPage /></SuspenseWrapper>,
  },
  {
    path: "student-dashboard",
    element: <SuspenseWrapper><StudentDashboardPage /></SuspenseWrapper>,
  },
  {
    path: "student-dashboard-new",
    element: <SuspenseWrapper><StudentDashboardNewPage /></SuspenseWrapper>,
  },
  {
    path: "student-dashboard-final",
    element: <SuspenseWrapper><StudentDashboardFinalPage /></SuspenseWrapper>,
  },
  {
    path: "student-upcoming-classes",
    element: <SuspenseWrapper><StudentUpcomingClassesPage /></SuspenseWrapper>,
  },
  {
    path: "gamified-student-dashboard",
    element: <SuspenseWrapper><GamifiedStudentDashboard /></SuspenseWrapper>,
  },

  // Teacher Dashboard & Pages
  {
    path: "teacher-dashboard",
    element: <SuspenseWrapper><TeacherDashboardPage /></SuspenseWrapper>,
  },
  {
    path: "teacher-profile",
    element: <SuspenseWrapper><TeacherProfilePage /></SuspenseWrapper>,
  },
  {
    path: "teacher-demo-management",
    element: <SuspenseWrapper><TeacherDemoManagementPage /></SuspenseWrapper>,
  },
  {
    path: "teacher-curriculum",
    element: <SuspenseWrapper><TeacherCurriculumPage /></SuspenseWrapper>,
  },
  {
    path: "teacher-class-management",
    element: <SuspenseWrapper><TeacherClassManagementPage /></SuspenseWrapper>,
  },
  {
    path: "teacher-renewal",
    element: <SuspenseWrapper><TeacherRenewalPage /></SuspenseWrapper>,
  },
  {
    path: "teacher-my-training",
    element: <SuspenseWrapper><TeacherMyTrainingPage /></SuspenseWrapper>,
  },
  {
    path: "teacher-audit",
    element: <SuspenseWrapper><TeacherAuditPage /></SuspenseWrapper>,
  },
  {
    path: "teacher-performance",
    element: <SuspenseWrapper><TeacherPerformancePage /></SuspenseWrapper>,
  },
  {
    path: "teacher-payout",
    element: <SuspenseWrapper><TeacherPayoutPage /></SuspenseWrapper>,
  },
  {
    path: "teacher-leave-management",
    element: <SuspenseWrapper><TeacherLeaveManagementPage /></SuspenseWrapper>,
  },
  {
    path: "teacher-others",
    element: <SuspenseWrapper><TeacherOthersPage /></SuspenseWrapper>,
  },
  {
    path: "teacher-help-support",
    element: <SuspenseWrapper><TeacherHelpSupportPage /></SuspenseWrapper>,
  },
  {
    path: "teacher-upcoming-classes",
    element: <SuspenseWrapper><TeacherUpcomingClassesPage /></SuspenseWrapper>,
  },
  {
    path: "teacher-tools",
    element: <SuspenseWrapper><TeacherToolsPage /></SuspenseWrapper>,
  },
  {
    path: "teacher-approval",
    element: <SuspenseWrapper><TeacherApprovalPage /></SuspenseWrapper>,
  },

  // Admin Dashboard & Pages
  {
    path: "admin-dashboard",
    element: <SuspenseWrapper><AdminDashboardPage /></SuspenseWrapper>,
  },
  {
    path: "admin-dashboard-new",
    element: <SuspenseWrapper><AdminDashboardNewPage /></SuspenseWrapper>,
  },
  {
    path: "admin-panel",
    element: <SuspenseWrapper><AdminPanelPage /></SuspenseWrapper>,
  },
  {
    path: "admin-analytics",
    element: <SuspenseWrapper><AdminAnalyticsPage /></SuspenseWrapper>,
  },
  {
    path: "admin-add-courses",
    element: <SuspenseWrapper><AdminAddCoursesPage /></SuspenseWrapper>,
  },
  {
    path: "admin-featured-courses",
    element: <SuspenseWrapper><AdminFeaturedCoursesPage /></SuspenseWrapper>,
  },
  {
    path: "admin-new-students",
    element: <SuspenseWrapper><AdminNewStudentsPage /></SuspenseWrapper>,
  },
  {
    path: "admin-new-teachers",
    element: <SuspenseWrapper><AdminNewTeachersPage /></SuspenseWrapper>,
  },
  {
    path: "admin-student-approvals",
    element: <SuspenseWrapper><AdminStudentApprovalsPage /></SuspenseWrapper>,
  },
  {
    path: "admin-upcoming-classes",
    element: <SuspenseWrapper><AdminUpcomingClassesPage /></SuspenseWrapper>,
  },
  {
    path: "admin-notifications",
    element: <SuspenseWrapper><AdminNotificationsPage /></SuspenseWrapper>,
  },
  {
    path: "management-dashboard",
    element: <SuspenseWrapper><ManagementDashboardPage /></SuspenseWrapper>,
  },
  {
    path: "advanced-analytics",
    element: <SuspenseWrapper><AdvancedAnalyticsPage /></SuspenseWrapper>,
  },
  {
    path: "advanced-grading",
    element: <SuspenseWrapper><AdvancedGradingPage /></SuspenseWrapper>,
  },
  {
    path: "collaboration-hub",
    element: <SuspenseWrapper><CollaborationHubPage /></SuspenseWrapper>,
  },
  {
    path: "certificates",
    element: <SuspenseWrapper><CertificatesPage /></SuspenseWrapper>,
  },
], {
  basename: '/vr-robotics-academy'
});

export default function AppRouter() {
  console.log("[Router] AppRouter mounted");
  const lastPathRef = useRef<string | null>(null);

  useEffect(() => {
    const unsubscribe = router.subscribe((state) => {
      const nextPath = `${state.location.pathname}${state.location.search}${state.location.hash}`;
      if (lastPathRef.current !== nextPath) {
        window.scrollTo({ top: 0, left: 0, behavior: "smooth" });
        lastPathRef.current = nextPath;
      }
    });
    return unsubscribe;
  }, []);

  return <RouterProvider router={router} />;
}
