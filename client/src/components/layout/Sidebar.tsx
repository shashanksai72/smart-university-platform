import React from 'react';
import {
  LayoutDashboard,
  UserCheck,
  Calendar,
  FileText,
  Clock,
  BookOpen,
  CreditCard,
  AlertCircle,
  Bot,
  Award,
  Users,
  CheckSquare,
  BarChart3,
  Building2,
  Megaphone,
  Settings,
  Sparkles,
  ChevronRight,
  ShieldAlert,
} from 'lucide-react';
import { useAuth } from '../../context/AuthContext';
import { useData } from '../../context/DataContext';

interface SidebarLink {
  id: string;
  label: string;
  icon: React.ComponentType<{ className?: string }>;
  badge?: string;
  alert?: boolean;
  isAi?: boolean;
}

interface SidebarProps {
  currentTab: string;
  onSelectTab: (tab: string) => void;
  isOpen: boolean;
  onClose: () => void;
}

export const Sidebar: React.FC<SidebarProps> = ({ currentTab, onSelectTab, isOpen, onClose }) => {
  const { role, user } = useAuth();
  const { grievances } = useData();

  const pendingGrievances = grievances.filter(g => g.status === 'PENDING').length;

  const studentLinks: SidebarLink[] = [
    { id: 'overview', label: 'Overview', icon: LayoutDashboard },
    { id: 'profile', label: 'My Profile', icon: UserCheck },
    { id: 'attendance', label: 'Attendance', icon: CheckSquare, badge: `${user?.attendanceRate || 94.2}%` },
    { id: 'academics', label: 'Academic Results', icon: Award },
    { id: 'timetable', label: 'Timetable', icon: Calendar },
    { id: 'assignments', label: 'Assignments', icon: FileText, badge: '2 Due' },
    { id: 'examinations', label: 'Examinations', icon: Clock },
    { id: 'library', label: 'Digital Library', icon: BookOpen },
    { id: 'fees', label: 'Fee Details', icon: CreditCard, alert: (user?.pendingFees || 0) > 0 },
    { id: 'grievances', label: 'Grievances', icon: AlertCircle },
    { id: 'ai-assistant', label: 'AI Assistant', icon: Bot, isAi: true },
  ];

  const facultyLinks: SidebarLink[] = [
    { id: 'faculty-overview', label: 'Overview', icon: LayoutDashboard },
    { id: 'faculty-students', label: 'Assigned Students', icon: Users, badge: '142' },
    { id: 'faculty-attendance', label: 'Record Attendance', icon: CheckSquare },
    { id: 'faculty-marks', label: 'Enter Internal Marks', icon: Award },
    { id: 'faculty-assignments', label: 'Course Assignments', icon: FileText },
    { id: 'faculty-timetable', label: 'Faculty Timetable', icon: Calendar },
    { id: 'faculty-announcements', label: 'Announcements', icon: Megaphone },
  ];

  const adminLinks: SidebarLink[] = [
    { id: 'admin-overview', label: 'Command Center', icon: LayoutDashboard },
    { id: 'admin-analytics', label: 'Visual Analytics', icon: BarChart3, badge: 'Live' },
    { id: 'admin-students', label: 'Manage Students', icon: Users },
    { id: 'admin-faculty', label: 'Manage Faculty', icon: UserCheck },
    { id: 'admin-departments', label: 'Departments & Courses', icon: Building2 },
    { id: 'admin-grievances', label: 'Grievance Desk', icon: AlertCircle, badge: pendingGrievances > 0 ? `${pendingGrievances} New` : undefined },
    { id: 'admin-announcements', label: 'Announcements', icon: Megaphone },
    { id: 'admin-settings', label: 'System & DB Config', icon: Settings },
  ];

  const activeLinks = role === 'ADMINISTRATOR' ? adminLinks : (role === 'FACULTY' ? facultyLinks : studentLinks);

  return (
    <>
      {/* Mobile Backdrop */}
      {isOpen && (
        <div
          onClick={onClose}
          className="fixed inset-0 z-40 bg-slate-900/50 backdrop-blur-sm md:hidden"
        />
      )}

      {/* Sidebar Container */}
      <aside
        className={`fixed md:sticky top-16 z-40 h-[calc(100vh-4rem)] w-64 flex-shrink-0 transition-transform duration-300 ease-in-out md:translate-x-0 glass-panel border-r border-slate-200/80 dark:border-slate-800 p-3 overflow-y-auto ${
          isOpen ? 'translate-x-0' : '-translate-x-full'
        }`}
      >
        {/* User Card Mini */}
        <div className="p-3 mb-3 rounded-2xl bg-gradient-to-br from-blue-50 to-indigo-50/50 dark:from-slate-900/80 dark:to-blue-950/40 border border-blue-100 dark:border-blue-900/40">
          <div className="flex items-center space-x-2.5">
            <div className="relative">
              <img
                src={user?.avatarUrl || 'https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?auto=format&fit=crop&q=80&w=256'}
                alt="Avatar"
                className="w-10 h-10 rounded-full object-cover ring-2 ring-blue-500/40"
              />
              <span className="absolute bottom-0 right-0 w-3 h-3 rounded-full bg-emerald-500 ring-2 ring-white dark:ring-navy-900" />
            </div>
            <div className="overflow-hidden">
              <p className="text-xs font-bold text-slate-800 dark:text-slate-100 truncate">
                {user?.fullName || 'User'}
              </p>
              <p className="text-[10px] text-blue-600 dark:text-blue-400 font-semibold truncate">
                {user?.course || user?.department || 'Smart Campus'}
              </p>
            </div>
          </div>
        </div>

        {/* Navigation Section */}
        <div className="space-y-1">
          <div className="px-3 py-1 text-[10px] font-bold uppercase tracking-wider text-slate-400 dark:text-slate-500">
            {role === 'ADMINISTRATOR' ? 'ADMINISTRATION' : (role === 'FACULTY' ? 'FACULTY PORTAL' : 'STUDENT NAVIGATION')}
          </div>

          {activeLinks.map(link => {
            const Icon = link.icon;
            const isActive = currentTab === link.id;

            return (
              <button
                key={link.id}
                onClick={() => {
                  onSelectTab(link.id);
                  onClose();
                }}
                className={`w-full flex items-center justify-between px-3 py-2.5 rounded-xl text-xs font-medium transition-all group ${
                  isActive
                    ? 'bg-blue-600 text-white shadow-md shadow-blue-500/25 font-semibold'
                    : 'text-slate-600 dark:text-slate-300 hover:bg-slate-100 dark:hover:bg-slate-800/70 hover:text-blue-600 dark:hover:text-blue-400'
                }`}
              >
                <div className="flex items-center space-x-3">
                  <Icon
                    className={`w-4 h-4 transition-transform group-hover:scale-110 ${
                      isActive ? 'text-white' : link.isAi ? 'text-cyan-500' : 'text-slate-400 group-hover:text-blue-500'
                    }`}
                  />
                  <span>{link.label}</span>
                </div>

                <div className="flex items-center space-x-1.5">
                  {link.badge && (
                    <span
                      className={`text-[10px] px-2 py-0.5 rounded-full font-bold ${
                        isActive
                          ? 'bg-white/20 text-white'
                          : 'bg-blue-100 text-blue-700 dark:bg-blue-900/60 dark:text-blue-300'
                      }`}
                    >
                      {link.badge}
                    </span>
                  )}
                  {link.alert && (
                    <span className="w-2 h-2 rounded-full bg-rose-500 ring-2 ring-white dark:ring-navy-900 animate-pulse" />
                  )}
                  {link.isAi && !isActive && (
                    <Sparkles className="w-3.5 h-3.5 text-cyan-500 animate-spin" style={{ animationDuration: '8s' }} />
                  )}
                </div>
              </button>
            );
          })}
        </div>

        {/* AI Quick Banner in Student Sidebar */}
        {role === 'STUDENT' && (
          <div className="mt-6 p-3 rounded-2xl bg-gradient-to-r from-blue-600/10 via-cyan-500/10 to-indigo-600/10 border border-blue-200/50 dark:border-blue-800/40 text-center">
            <div className="w-8 h-8 mx-auto rounded-full bg-cyan-500/20 text-cyan-600 dark:text-cyan-400 flex items-center justify-center mb-1.5">
              <Bot className="w-4 h-4" />
            </div>
            <p className="text-xs font-bold text-slate-800 dark:text-slate-200">Athena Campus AI</p>
            <p className="text-[10px] text-slate-500 dark:text-slate-400 mt-0.5">
              Available 24/7 for timetable, exams & fee assistance
            </p>
            <button
              onClick={() => {
                onSelectTab('ai-assistant');
                onClose();
              }}
              className="mt-2 w-full py-1.5 px-3 rounded-lg bg-gradient-to-r from-blue-600 to-cyan-500 hover:from-blue-700 hover:to-cyan-600 text-white text-[11px] font-semibold shadow-sm transition-all flex items-center justify-center space-x-1"
            >
              <span>Ask Athena</span>
              <ChevronRight className="w-3 h-3" />
            </button>
          </div>
        )}
      </aside>
    </>
  );
};
