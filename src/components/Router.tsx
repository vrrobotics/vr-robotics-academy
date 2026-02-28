import { RouterProvider, createBrowserRouter } from "react-router-dom";
import { lazy, Suspense, useEffect, useRef, useState, type ChangeEvent, type FormEvent } from "react";
import ErrorPage from "@/components/ErrorPage";
import { LoadingSpinner } from "@/components/ui/loading-spinner";
import RazorpayService, { type DemoBookingDetails } from "@/services/razorpayService";

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
    errorElement: <ErrorPage />,
  },
  {
    path: "contact",
    element: <SuspenseWrapper><ContactPage /></SuspenseWrapper>,
    errorElement: <ErrorPage />,
  },
  {
    path: "demo-booking",
    element: <SuspenseWrapper><DemoBookingPage /></SuspenseWrapper>,
    errorElement: <ErrorPage />,
  },
  {
    path: "demo-bookings-export",
    element: <SuspenseWrapper><DemoBookingsExportPage /></SuspenseWrapper>,
    errorElement: <ErrorPage />,
  },
  {
    path: "curriculum",
    element: <SuspenseWrapper><CurriculumPage /></SuspenseWrapper>,
    errorElement: <ErrorPage />,
  },
  {
    path: "admission-process",
    element: <SuspenseWrapper><AdmissionProcessPage /></SuspenseWrapper>,
    errorElement: <ErrorPage />,
  },
  {
    path: "program-fees",
    element: <SuspenseWrapper><ProgramFeesPage /></SuspenseWrapper>,
    errorElement: <ErrorPage />,
  },
  {
    path: "why-vr-robotics",
    element: <SuspenseWrapper><WhyVRRoboticsPage /></SuspenseWrapper>,
    errorElement: <ErrorPage />,
  },
  {
    path: "what-kids-learn",
    element: <SuspenseWrapper><WhatKidsLearnPage /></SuspenseWrapper>,
    errorElement: <ErrorPage />,
  },
  {
    path: "how-kids-build",
    element: <SuspenseWrapper><HowKidsBuildPage /></SuspenseWrapper>,
    errorElement: <ErrorPage />,
  },
  {
    path: "python-programming",
    element: <SuspenseWrapper><PythonProgrammingPage /></SuspenseWrapper>,
    errorElement: <ErrorPage />,
  },
  {
    path: "interactive-3d-robot",
    element: <SuspenseWrapper><Interactive3DRobotPage /></SuspenseWrapper>,
    errorElement: <ErrorPage />,
  },
  {
    path: "grades-1-3-curriculum",
    element: <SuspenseWrapper><Grades1to3CurriculumPage /></SuspenseWrapper>,
    errorElement: <ErrorPage />,
  },

  // Module Pages
  {
    path: "modules",
    element: <SuspenseWrapper><ModuleDetailsPage /></SuspenseWrapper>,
    errorElement: <ErrorPage />,
  },
  {
    path: "module-1",
    element: <SuspenseWrapper><Module1DetailsPage /></SuspenseWrapper>,
    errorElement: <ErrorPage />,
  },
  {
    path: "module-2",
    element: <SuspenseWrapper><Module2DetailsPage /></SuspenseWrapper>,
    errorElement: <ErrorPage />,
  },
  {
    path: "module-3",
    element: <SuspenseWrapper><Module3DetailsPage /></SuspenseWrapper>,
    errorElement: <ErrorPage />,
  },
  {
    path: "module-4",
    element: <SuspenseWrapper><Module4DetailsPage /></SuspenseWrapper>,
    errorElement: <ErrorPage />,
  },
  {
    path: "module-5",
    element: <SuspenseWrapper><Module5DetailsPage /></SuspenseWrapper>,
    errorElement: <ErrorPage />,
  },
  {
    path: "module-6",
    element: <SuspenseWrapper><Module6DetailsPage /></SuspenseWrapper>,
    errorElement: <ErrorPage />,
  },
  {
    path: "module-7",
    element: <SuspenseWrapper><Module7DetailsPage /></SuspenseWrapper>,
    errorElement: <ErrorPage />,
  },
  {
    path: "module-8",
    element: <SuspenseWrapper><Module8DetailsPage /></SuspenseWrapper>,
    errorElement: <ErrorPage />,
  },
  {
    path: "module-9",
    element: <SuspenseWrapper><Module9DetailsPage /></SuspenseWrapper>,
    errorElement: <ErrorPage />,
  },

  // Authentication Pages
  {
    path: "login",
    element: <SuspenseWrapper><LoginPage /></SuspenseWrapper>,
    errorElement: <ErrorPage />,
  },
  {
    path: "student-signup",
    element: <SuspenseWrapper><StudentSignupPage /></SuspenseWrapper>,
    errorElement: <ErrorPage />,
  },
  {
    path: "teacher-login",
    element: <SuspenseWrapper><TeacherLoginPage /></SuspenseWrapper>,
    errorElement: <ErrorPage />,
  },
  {
    path: "teacher-signup",
    element: <SuspenseWrapper><TeacherSignupPage /></SuspenseWrapper>,
    errorElement: <ErrorPage />,
  },

  // Student Dashboard & Pages
  {
    path: "student-application",
    element: <SuspenseWrapper><StudentApplicationPage /></SuspenseWrapper>,
    errorElement: <ErrorPage />,
  },
  {
    path: "student-dashboard",
    element: <SuspenseWrapper><StudentDashboardPage /></SuspenseWrapper>,
    errorElement: <ErrorPage />,
  },
  {
    path: "student-dashboard-new",
    element: <SuspenseWrapper><StudentDashboardNewPage /></SuspenseWrapper>,
    errorElement: <ErrorPage />,
  },
  {
    path: "student-dashboard-final",
    element: <SuspenseWrapper><StudentDashboardFinalPage /></SuspenseWrapper>,
    errorElement: <ErrorPage />,
  },
  {
    path: "student-upcoming-classes",
    element: <SuspenseWrapper><StudentUpcomingClassesPage /></SuspenseWrapper>,
    errorElement: <ErrorPage />,
  },
  {
    path: "gamified-student-dashboard",
    element: <SuspenseWrapper><GamifiedStudentDashboard /></SuspenseWrapper>,
    errorElement: <ErrorPage />,
  },

  // Teacher Dashboard & Pages
  {
    path: "teacher-dashboard",
    element: <SuspenseWrapper><TeacherDashboardPage /></SuspenseWrapper>,
    errorElement: <ErrorPage />,
  },
  {
    path: "teacher-profile",
    element: <SuspenseWrapper><TeacherProfilePage /></SuspenseWrapper>,
    errorElement: <ErrorPage />,
  },
  {
    path: "teacher-demo-management",
    element: <SuspenseWrapper><TeacherDemoManagementPage /></SuspenseWrapper>,
    errorElement: <ErrorPage />,
  },
  {
    path: "teacher-curriculum",
    element: <SuspenseWrapper><TeacherCurriculumPage /></SuspenseWrapper>,
    errorElement: <ErrorPage />,
  },
  {
    path: "teacher-class-management",
    element: <SuspenseWrapper><TeacherClassManagementPage /></SuspenseWrapper>,
    errorElement: <ErrorPage />,
  },
  {
    path: "teacher-renewal",
    element: <SuspenseWrapper><TeacherRenewalPage /></SuspenseWrapper>,
    errorElement: <ErrorPage />,
  },
  {
    path: "teacher-my-training",
    element: <SuspenseWrapper><TeacherMyTrainingPage /></SuspenseWrapper>,
    errorElement: <ErrorPage />,
  },
  {
    path: "teacher-audit",
    element: <SuspenseWrapper><TeacherAuditPage /></SuspenseWrapper>,
    errorElement: <ErrorPage />,
  },
  {
    path: "teacher-performance",
    element: <SuspenseWrapper><TeacherPerformancePage /></SuspenseWrapper>,
    errorElement: <ErrorPage />,
  },
  {
    path: "teacher-payout",
    element: <SuspenseWrapper><TeacherPayoutPage /></SuspenseWrapper>,
    errorElement: <ErrorPage />,
  },
  {
    path: "teacher-leave-management",
    element: <SuspenseWrapper><TeacherLeaveManagementPage /></SuspenseWrapper>,
    errorElement: <ErrorPage />,
  },
  {
    path: "teacher-others",
    element: <SuspenseWrapper><TeacherOthersPage /></SuspenseWrapper>,
    errorElement: <ErrorPage />,
  },
  {
    path: "teacher-help-support",
    element: <SuspenseWrapper><TeacherHelpSupportPage /></SuspenseWrapper>,
    errorElement: <ErrorPage />,
  },
  {
    path: "teacher-upcoming-classes",
    element: <SuspenseWrapper><TeacherUpcomingClassesPage /></SuspenseWrapper>,
    errorElement: <ErrorPage />,
  },
  {
    path: "teacher-tools",
    element: <SuspenseWrapper><TeacherToolsPage /></SuspenseWrapper>,
    errorElement: <ErrorPage />,
  },
  {
    path: "teacher-approval",
    element: <SuspenseWrapper><TeacherApprovalPage /></SuspenseWrapper>,
    errorElement: <ErrorPage />,
  },

  // Admin Dashboard & Pages
  {
    path: "admin-dashboard",
    element: <SuspenseWrapper><AdminDashboardPage /></SuspenseWrapper>,
    errorElement: <ErrorPage />,
  },
  {
    path: "admin-dashboard-new",
    element: <SuspenseWrapper><AdminDashboardNewPage /></SuspenseWrapper>,
    errorElement: <ErrorPage />,
  },
  {
    path: "admin-panel",
    element: <SuspenseWrapper><AdminPanelPage /></SuspenseWrapper>,
    errorElement: <ErrorPage />,
  },
  {
    path: "admin-analytics",
    element: <SuspenseWrapper><AdminAnalyticsPage /></SuspenseWrapper>,
    errorElement: <ErrorPage />,
  },
  {
    path: "admin-add-courses",
    element: <SuspenseWrapper><AdminAddCoursesPage /></SuspenseWrapper>,
    errorElement: <ErrorPage />,
  },
  {
    path: "admin-featured-courses",
    element: <SuspenseWrapper><AdminFeaturedCoursesPage /></SuspenseWrapper>,
    errorElement: <ErrorPage />,
  },
  {
    path: "admin-new-students",
    element: <SuspenseWrapper><AdminNewStudentsPage /></SuspenseWrapper>,
    errorElement: <ErrorPage />,
  },
  {
    path: "admin-new-teachers",
    element: <SuspenseWrapper><AdminNewTeachersPage /></SuspenseWrapper>,
    errorElement: <ErrorPage />,
  },
  {
    path: "admin-student-approvals",
    element: <SuspenseWrapper><AdminStudentApprovalsPage /></SuspenseWrapper>,
    errorElement: <ErrorPage />,
  },
  {
    path: "admin-upcoming-classes",
    element: <SuspenseWrapper><AdminUpcomingClassesPage /></SuspenseWrapper>,
    errorElement: <ErrorPage />,
  },
  {
    path: "admin-notifications",
    element: <SuspenseWrapper><AdminNotificationsPage /></SuspenseWrapper>,
    errorElement: <ErrorPage />,
  },
  {
    path: "management-dashboard",
    element: <SuspenseWrapper><ManagementDashboardPage /></SuspenseWrapper>,
    errorElement: <ErrorPage />,
  },
  {
    path: "advanced-analytics",
    element: <SuspenseWrapper><AdvancedAnalyticsPage /></SuspenseWrapper>,
    errorElement: <ErrorPage />,
  },
  {
    path: "advanced-grading",
    element: <SuspenseWrapper><AdvancedGradingPage /></SuspenseWrapper>,
    errorElement: <ErrorPage />,
  },
  {
    path: "collaboration-hub",
    element: <SuspenseWrapper><CollaborationHubPage /></SuspenseWrapper>,
    errorElement: <ErrorPage />,
  },
  {
    path: "certificates",
    element: <SuspenseWrapper><CertificatesPage /></SuspenseWrapper>,
    errorElement: <ErrorPage />,
  },
], {
  basename: '/vr-robotics-academy'
});

export default function AppRouter() {
  console.log("[Router] AppRouter mounted");
  const lastPathRef = useRef<string | null>(null);
  const [showDemoDetailsForm, setShowDemoDetailsForm] = useState(false);
  const [demoDetails, setDemoDetails] = useState<DemoBookingDetails>({
    parentName: '',
    email: '',
    phone: '',
    childName: '',
    childAge: '',
    preferredDate: '',
    preferredTime: '',
    interests: '',
    message: ''
  });

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

  useEffect(() => {
    const openForm = (event: Event) => {
      const customEvent = event as CustomEvent<DemoBookingDetails>;
      setDemoDetails((prev) => ({
        ...prev,
        ...(customEvent.detail || {})
      }));
      setShowDemoDetailsForm(true);
    };

    window.addEventListener('vr:open-demo-details-form', openForm as EventListener);
    return () => window.removeEventListener('vr:open-demo-details-form', openForm as EventListener);
  }, []);

  useEffect(() => {
    const handleBookDemoLinks = (event: MouseEvent) => {
      if (event.defaultPrevented) return;
      if (event.button !== 0) return;
      if (event.metaKey || event.ctrlKey || event.shiftKey || event.altKey) return;

      const target = event.target as HTMLElement | null;
      if (!target) return;

      const anchor = target.closest("a[href]") as HTMLAnchorElement | null;
      if (!anchor) return;
      if (anchor.target === "_blank" || anchor.hasAttribute("download")) return;

      const href = anchor.getAttribute("href");
      if (!href) return;

      const isDemoBookingLink =
        href === "/demo-booking" ||
        href.endsWith("/demo-booking") ||
        href.startsWith("/demo-booking?");

      if (!isDemoBookingLink) return;

      event.preventDefault();
      void RazorpayService.initiateDemo1DollarPayment();
    };

    document.addEventListener("click", handleBookDemoLinks, true);
    return () => document.removeEventListener("click", handleBookDemoLinks, true);
  }, []);

  const handleDetailChange = (e: ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>) => {
    setDemoDetails((prev) => ({
      ...prev,
      [e.target.name]: e.target.value
    }));
  };

  const handleCloseDemoForm = () => {
    setShowDemoDetailsForm(false);
    window.dispatchEvent(new CustomEvent('vr:demo-details-cancelled'));
  };

  const handleSubmitDemoForm = (e: FormEvent) => {
    e.preventDefault();
    RazorpayService.storeDemoBookingDetails(demoDetails);
    setShowDemoDetailsForm(false);
    window.dispatchEvent(new CustomEvent('vr:demo-details-submitted', { detail: demoDetails }));
  };

  return (
    <>
      <RouterProvider router={router} />
      {showDemoDetailsForm && (
        <div className="fixed inset-0 z-[9999] bg-black/70 backdrop-blur-sm flex items-center justify-center p-4">
          <div className="w-full max-w-2xl rounded-2xl border border-primary/30 bg-background p-6 md:p-8 max-h-[90vh] overflow-y-auto">
            <div className="flex items-center justify-between mb-6">
              <h2 className="font-heading text-2xl text-foreground">Book Demo Details</h2>
              <button type="button" onClick={handleCloseDemoForm} className="text-foreground/70 hover:text-foreground">
                Close
              </button>
            </div>
            <form onSubmit={handleSubmitDemoForm} className="space-y-4">
              <div className="grid md:grid-cols-2 gap-4">
                <input name="parentName" value={demoDetails.parentName || ''} onChange={handleDetailChange} required placeholder="Parent/Guardian Name" className="w-full px-4 py-3 rounded-lg bg-background/50 border border-foreground/20 text-foreground" />
                <input type="email" name="email" value={demoDetails.email || ''} onChange={handleDetailChange} required placeholder="Email Address" className="w-full px-4 py-3 rounded-lg bg-background/50 border border-foreground/20 text-foreground" />
              </div>
              <div className="grid md:grid-cols-2 gap-4">
                <input name="phone" value={demoDetails.phone || ''} onChange={handleDetailChange} required placeholder="Phone Number" className="w-full px-4 py-3 rounded-lg bg-background/50 border border-foreground/20 text-foreground" />
                <input name="childName" value={demoDetails.childName || ''} onChange={handleDetailChange} required placeholder="Child's Name" className="w-full px-4 py-3 rounded-lg bg-background/50 border border-foreground/20 text-foreground" />
              </div>
              <div className="grid md:grid-cols-2 gap-4">
                <select name="childAge" value={demoDetails.childAge || ''} onChange={handleDetailChange} required className="w-full px-4 py-3 rounded-lg bg-background/50 border border-foreground/20 text-foreground">
                  <option value="">Child's Age</option>
                  {[...Array(9)].map((_, i) => (
                    <option key={i} value={8 + i}>{8 + i} years</option>
                  ))}
                </select>
                <input type="date" name="preferredDate" value={demoDetails.preferredDate || ''} onChange={handleDetailChange} required className="w-full px-4 py-3 rounded-lg bg-background/50 border border-foreground/20 text-foreground" />
              </div>
              <div className="grid md:grid-cols-2 gap-4">
                <select name="preferredTime" value={demoDetails.preferredTime || ''} onChange={handleDetailChange} required className="w-full px-4 py-3 rounded-lg bg-background/50 border border-foreground/20 text-foreground">
                  <option value="">Preferred Time</option>
                  <option value="morning">Morning (9AM - 12PM)</option>
                  <option value="afternoon">Afternoon (12PM - 3PM)</option>
                  <option value="evening">Evening (3PM - 6PM)</option>
                </select>
                <input name="interests" value={demoDetails.interests || ''} onChange={handleDetailChange} placeholder="Interests (optional)" className="w-full px-4 py-3 rounded-lg bg-background/50 border border-foreground/20 text-foreground" />
              </div>
              <textarea name="message" value={demoDetails.message || ''} onChange={handleDetailChange} rows={3} placeholder="Additional message (optional)" className="w-full px-4 py-3 rounded-lg bg-background/50 border border-foreground/20 text-foreground" />
              <button type="submit" className="w-full bg-primary text-primary-foreground font-heading font-semibold px-6 py-3 rounded-[10px]">
                Continue to Payment
              </button>
            </form>
          </div>
        </div>
      )}
    </>
  );
}
