import React, { useState, useEffect } from 'react';
import { useAuth } from './context/AuthContext';
import { Navbar } from './components/layout/Navbar';
import { Sidebar } from './components/layout/Sidebar';
import { LandingPage } from './components/landing/LandingPage';
import { LoginPage } from './components/auth/LoginPage';
import { RegisterModal } from './components/auth/RegisterModal';
import { DemoBanner } from './components/common/DemoBanner';

// Student Components
import { StudentOverview } from './components/student/StudentOverview';
import { StudentProfile } from './components/student/StudentProfile';
import { StudentAttendance } from './components/student/StudentAttendance';
import { StudentAcademics } from './components/student/StudentAcademics';
import { StudentTimetable } from './components/student/StudentTimetable';
import { StudentAssignments } from './components/student/StudentAssignments';
import { StudentExaminations } from './components/student/StudentExaminations';
import { StudentLibrary } from './components/student/StudentLibrary';
import { StudentFees } from './components/student/StudentFees';
import { StudentGrievances } from './components/student/StudentGrievances';
import { StudentAiAssistant } from './components/student/StudentAiAssistant';

// Faculty Components
import { FacultyOverview } from './components/faculty/FacultyOverview';
import { FacultyStudents } from './components/faculty/FacultyStudents';
import { FacultyAttendance } from './components/faculty/FacultyAttendance';
import { FacultyMarks } from './components/faculty/FacultyMarks';
import { FacultyAssignments } from './components/faculty/FacultyAssignments';

// Admin Components
import { AdminOverview } from './components/admin/AdminOverview';
import { AdminAnalytics } from './components/admin/AdminAnalytics';
import { AdminStudents } from './components/admin/AdminStudents';
import { AdminFaculty } from './components/admin/AdminFaculty';
import { AdminGrievanceDesk } from './components/admin/AdminGrievanceDesk';
import { AdminAnnouncements } from './components/admin/AdminAnnouncements';
import { AdminSettings } from './components/admin/AdminSettings';

export const App: React.FC = () => {
  const { user, role, isAuthenticated } = useAuth();

  const [currentView, setCurrentView] = useState<'landing' | 'login' | 'dashboard'>('landing');
  const [activeTab, setActiveTab] = useState<string>('overview');
  const [isRegisterOpen, setIsRegisterOpen] = useState(false);
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);

  // Auto-align default active tab whenever persona/role changes
  useEffect(() => {
    if (role === 'ADMINISTRATOR') {
      setActiveTab('admin-overview');
    } else if (role === 'FACULTY') {
      setActiveTab('faculty-overview');
    } else {
      setActiveTab('overview');
    }
  }, [role]);

  // If user lands on landing page and clicks Get Started
  const handleGetStarted = () => {
    setCurrentView('dashboard');
  };

  const handleOpenLogin = () => {
    setCurrentView('login');
  };

  // Render Dashboard Content based on role & active tab
  const renderDashboardContent = () => {
    if (role === 'ADMINISTRATOR') {
      switch (activeTab) {
        case 'admin-overview':
          return <AdminOverview onNavigate={setActiveTab} />;
        case 'admin-analytics':
          return <AdminAnalytics />;
        case 'admin-students':
          return <AdminStudents />;
        case 'admin-faculty':
          return <AdminFaculty />;
        case 'admin-departments':
          return <AdminAnalytics />;
        case 'admin-grievances':
          return <AdminGrievanceDesk />;
        case 'admin-announcements':
          return <AdminAnnouncements />;
        case 'admin-settings':
          return <AdminSettings />;
        default:
          return <AdminOverview onNavigate={setActiveTab} />;
      }
    }

    if (role === 'FACULTY') {
      switch (activeTab) {
        case 'faculty-overview':
          return <FacultyOverview onNavigate={setActiveTab} />;
        case 'faculty-students':
          return <FacultyStudents />;
        case 'faculty-attendance':
          return <FacultyAttendance />;
        case 'faculty-marks':
          return <FacultyMarks />;
        case 'faculty-assignments':
          return <FacultyAssignments />;
        case 'faculty-timetable':
          return <StudentTimetable />;
        case 'faculty-announcements':
          return <AdminAnnouncements />;
        default:
          return <FacultyOverview onNavigate={setActiveTab} />;
      }
    }

    // Default to STUDENT role
    switch (activeTab) {
      case 'overview':
        return <StudentOverview onNavigate={setActiveTab} />;
      case 'profile':
        return <StudentProfile />;
      case 'attendance':
        return <StudentAttendance />;
      case 'academics':
        return <StudentAcademics />;
      case 'timetable':
        return <StudentTimetable />;
      case 'assignments':
        return <StudentAssignments />;
      case 'examinations':
        return <StudentExaminations />;
      case 'library':
        return <StudentLibrary />;
      case 'fees':
        return <StudentFees />;
      case 'grievances':
        return <StudentGrievances />;
      case 'ai-assistant':
        return <StudentAiAssistant />;
      default:
        return <StudentOverview onNavigate={setActiveTab} />;
    }
  };

  return (
    <div className="min-h-screen bg-slate-50 dark:bg-navy-950 text-slate-800 dark:text-slate-100 transition-colors duration-200">
      {/* 1. Landing Page View */}
      {currentView === 'landing' && (
        <LandingPage
          onGetStarted={handleGetStarted}
          onExploreDashboard={() => setCurrentView('dashboard')}
        />
      )}

      {/* 2. Login View */}
      {currentView === 'login' && (
        <LoginPage
          onSuccess={() => setCurrentView('dashboard')}
          onOpenRegister={() => setIsRegisterOpen(true)}
          onBackToHome={() => setCurrentView('landing')}
        />
      )}

      {/* 3. Authenticated Dashboard View */}
      {currentView === 'dashboard' && (
        <div className="min-h-screen flex flex-col">
          {/* Demo Sandbox Top Pill */}
          <DemoBanner />

          {/* Top Sticky Navbar */}
          <Navbar
            onNavigateHome={() => setCurrentView('landing')}
            onOpenProfile={() => setActiveTab(role === 'STUDENT' ? 'profile' : (role === 'FACULTY' ? 'faculty-overview' : 'admin-overview'))}
            onToggleSidebar={() => setIsSidebarOpen(!isSidebarOpen)}
          />

          {/* Main App Container */}
          <div className="flex-1 flex max-w-7xl w-full mx-auto">
            {/* Collapsible Sidebar */}
            <Sidebar
              currentTab={activeTab}
              onSelectTab={setActiveTab}
              isOpen={isSidebarOpen}
              onClose={() => setIsSidebarOpen(false)}
            />

            {/* Content Area */}
            <main className="flex-1 p-4 sm:p-6 lg:p-8 overflow-y-auto">
              <div className="max-w-6xl mx-auto">
                {renderDashboardContent()}
              </div>
            </main>
          </div>
        </div>
      )}

      {/* Registration Modal */}
      <RegisterModal
        isOpen={isRegisterOpen}
        onClose={() => setIsRegisterOpen(false)}
        onSuccess={() => {
          setIsRegisterOpen(false);
          setCurrentView('dashboard');
        }}
      />
    </div>
  );
};
