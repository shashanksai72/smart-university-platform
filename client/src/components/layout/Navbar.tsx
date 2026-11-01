import React, { useState } from 'react';
import {
  GraduationCap,
  Bell,
  Sun,
  Moon,
  LogOut,
  User,
  Shield,
  ChevronDown,
  Sparkles,
  CheckCircle2,
  Clock,
  AlertTriangle,
} from 'lucide-react';
import { useAuth } from '../../context/AuthContext';
import { useTheme } from '../../context/ThemeContext';
import { useData } from '../../context/DataContext';
import { UserRole } from '../../types';

interface NavbarProps {
  onNavigateHome: () => void;
  onOpenProfile?: () => void;
  onToggleSidebar?: () => void;
}

export const Navbar: React.FC<NavbarProps> = ({ onNavigateHome, onOpenProfile, onToggleSidebar }) => {
  const { user, role, quickLogin, logout } = useAuth();
  const { theme, toggleTheme } = useTheme();
  const { notifications, unreadNotifCount, markAllNotificationsAsRead } = useData();

  const [showNotifications, setShowNotifications] = useState(false);
  const [showRoleMenu, setShowRoleMenu] = useState(false);

  const getRoleBadgeColor = (r: UserRole | null) => {
    switch (r) {
      case 'ADMINISTRATOR':
        return 'bg-purple-100 text-purple-800 dark:bg-purple-900/40 dark:text-purple-300 border-purple-300 dark:border-purple-700';
      case 'FACULTY':
        return 'bg-amber-100 text-amber-800 dark:bg-amber-900/40 dark:text-amber-300 border-amber-300 dark:border-amber-700';
      default:
        return 'bg-blue-100 text-blue-800 dark:bg-blue-900/40 dark:text-blue-300 border-blue-300 dark:border-blue-700';
    }
  };

  return (
    <header className="sticky top-0 z-40 w-full glass-panel border-b border-slate-200/80 dark:border-slate-800 backdrop-blur-md transition-colors duration-200">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          {/* Left: Logo & Sidebar Toggle */}
          <div className="flex items-center space-x-3">
            {onToggleSidebar && (
              <button
                onClick={onToggleSidebar}
                className="md:hidden p-2 rounded-lg text-slate-600 dark:text-slate-300 hover:bg-slate-100 dark:hover:bg-slate-800 focus:outline-none"
                aria-label="Toggle Menu"
              >
                <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
                </svg>
              </button>
            )}

            <button
              onClick={onNavigateHome}
              className="flex items-center space-x-3 group text-left focus:outline-none"
            >
              <div className="w-10 h-10 rounded-xl bg-gradient-to-tr from-blue-600 to-cyan-500 flex items-center justify-center text-white shadow-md shadow-blue-500/20 group-hover:scale-105 transition-transform">
                <GraduationCap className="w-6 h-6" />
              </div>
              <div>
                <div className="flex items-center space-x-1.5">
                  <span className="font-extrabold text-lg tracking-tight bg-gradient-to-r from-blue-600 via-indigo-600 to-cyan-500 dark:from-blue-400 dark:to-cyan-300 bg-clip-text text-transparent">
                    SMART UNIVERSITY
                  </span>
                  <span className="hidden sm:inline-block text-[10px] font-semibold tracking-wider uppercase px-1.5 py-0.5 rounded bg-blue-100 dark:bg-blue-900/60 text-blue-700 dark:text-blue-300">
                    v2.0
                  </span>
                </div>
                <p className="text-[11px] text-slate-500 dark:text-slate-400 -mt-0.5 hidden sm:block">
                  Digital Transformation Ecosystem
                </p>
              </div>
            </button>
          </div>

          {/* Right: Controls & Profile */}
          <div className="flex items-center space-x-2 sm:space-x-3">
            {/* Quick Role Switcher Pill */}
            <div className="relative">
              <button
                onClick={() => setShowRoleMenu(!showRoleMenu)}
                className={`flex items-center space-x-1.5 px-3 py-1.5 rounded-full border text-xs font-semibold shadow-sm transition-all hover:opacity-90 ${getRoleBadgeColor(
                  role
                )}`}
                title="Switch demo persona"
              >
                <Shield className="w-3.5 h-3.5" />
                <span>{role || 'GUEST'}</span>
                <ChevronDown className="w-3 h-3 ml-0.5" />
              </button>

              {/* Role Dropdown */}
              {showRoleMenu && (
                <div className="absolute right-0 mt-2 w-56 rounded-xl glass-card border border-slate-200 dark:border-slate-800 shadow-xl py-2 z-50 animate-in fade-in zoom-in-95">
                  <div className="px-3 py-1.5 border-b border-slate-100 dark:border-slate-800">
                    <p className="text-[11px] font-semibold text-slate-400 uppercase tracking-wider">
                      Switch Demo Role
                    </p>
                  </div>
                  <button
                    onClick={() => {
                      quickLogin('STUDENT');
                      setShowRoleMenu(false);
                    }}
                    className="w-full text-left px-3 py-2 text-xs font-medium text-slate-700 dark:text-slate-200 hover:bg-blue-50 dark:hover:bg-blue-900/30 flex items-center justify-between"
                  >
                    <div>
                      <p className="font-semibold text-blue-600 dark:text-blue-400">Student Persona</p>
                      <p className="text-[11px] text-slate-400">Marcus Chen (SU-2024-CS-042)</p>
                    </div>
                    {role === 'STUDENT' && <CheckCircle2 className="w-4 h-4 text-blue-600" />}
                  </button>

                  <button
                    onClick={() => {
                      quickLogin('FACULTY');
                      setShowRoleMenu(false);
                    }}
                    className="w-full text-left px-3 py-2 text-xs font-medium text-slate-700 dark:text-slate-200 hover:bg-amber-50 dark:hover:bg-amber-900/30 flex items-center justify-between"
                  >
                    <div>
                      <p className="font-semibold text-amber-600 dark:text-amber-400">Faculty Persona</p>
                      <p className="text-[11px] text-slate-400">Prof. Alexander Wright</p>
                    </div>
                    {role === 'FACULTY' && <CheckCircle2 className="w-4 h-4 text-amber-600" />}
                  </button>

                  <button
                    onClick={() => {
                      quickLogin('ADMINISTRATOR');
                      setShowRoleMenu(false);
                    }}
                    className="w-full text-left px-3 py-2 text-xs font-medium text-slate-700 dark:text-slate-200 hover:bg-purple-50 dark:hover:bg-purple-900/30 flex items-center justify-between"
                  >
                    <div>
                      <p className="font-semibold text-purple-600 dark:text-purple-400">Admin Persona</p>
                      <p className="text-[11px] text-slate-400">Dr. Sarah Jenkins (Registrar)</p>
                    </div>
                    {role === 'ADMINISTRATOR' && <CheckCircle2 className="w-4 h-4 text-purple-600" />}
                  </button>
                </div>
              )}
            </div>

            {/* Dark / Light Mode Switch */}
            <button
              onClick={toggleTheme}
              className="p-2 rounded-xl text-slate-600 dark:text-slate-300 hover:bg-slate-100 dark:hover:bg-slate-800 transition-colors"
              title={theme === 'dark' ? 'Switch to Light Mode' : 'Switch to Dark Mode'}
              aria-label="Toggle theme"
            >
              {theme === 'dark' ? (
                <Sun className="w-5 h-5 text-amber-400 hover:rotate-45 transition-transform" />
              ) : (
                <Moon className="w-5 h-5 text-slate-600 hover:-rotate-12 transition-transform" />
              )}
            </button>

            {/* Notification Bell with Dropdown */}
            <div className="relative">
              <button
                onClick={() => setShowNotifications(!showNotifications)}
                className="relative p-2 rounded-xl text-slate-600 dark:text-slate-300 hover:bg-slate-100 dark:hover:bg-slate-800 transition-colors"
                title="Notifications"
                aria-label="Notifications"
              >
                <Bell className="w-5 h-5" />
                {unreadNotifCount > 0 && (
                  <span className="absolute top-1 right-1 flex h-4 w-4 items-center justify-center rounded-full bg-rose-500 text-[9px] font-bold text-white shadow-sm ring-2 ring-white dark:ring-navy-950 animate-pulse">
                    {unreadNotifCount}
                  </span>
                )}
              </button>

              {/* Notification Popover */}
              {showNotifications && (
                <div className="absolute right-0 mt-2 w-80 sm:w-96 rounded-2xl glass-card border border-slate-200 dark:border-slate-800 shadow-2xl p-3 z-50">
                  <div className="flex items-center justify-between pb-2 mb-2 border-b border-slate-100 dark:border-slate-800">
                    <div className="flex items-center space-x-1.5">
                      <span className="font-bold text-sm text-slate-800 dark:text-slate-100">Notifications</span>
                      <span className="text-[10px] bg-blue-100 text-blue-700 dark:bg-blue-900/60 dark:text-blue-300 px-1.5 py-0.5 rounded-full font-semibold">
                        {unreadNotifCount} new
                      </span>
                    </div>
                    <button
                      onClick={markAllNotificationsAsRead}
                      className="text-xs text-blue-600 dark:text-blue-400 hover:underline font-medium"
                    >
                      Mark all read
                    </button>
                  </div>

                  <div className="max-h-80 overflow-y-auto space-y-2 pr-1">
                    {notifications.map(notif => (
                      <div
                        key={notif.id}
                        className={`p-2.5 rounded-xl text-xs transition-colors ${
                          notif.isRead
                            ? 'bg-slate-50/50 dark:bg-slate-900/40 opacity-70'
                            : 'bg-blue-50/70 dark:bg-blue-950/40 border-l-4 border-blue-500'
                        }`}
                      >
                        <div className="flex items-start justify-between">
                          <p className="font-semibold text-slate-800 dark:text-slate-100">{notif.title}</p>
                          <span className="text-[10px] text-slate-400 flex items-center ml-2 whitespace-nowrap">
                            <Clock className="w-2.5 h-2.5 mr-1" />
                            {notif.time}
                          </span>
                        </div>
                        <p className="text-slate-600 dark:text-slate-300 mt-1">{notif.message}</p>
                      </div>
                    ))}
                  </div>
                </div>
              )}
            </div>

            {/* User Profile Avatar & Info */}
            {user ? (
              <div className="flex items-center space-x-2 pl-2 border-l border-slate-200 dark:border-slate-800">
                <button
                  onClick={onOpenProfile}
                  className="flex items-center space-x-2 p-1 rounded-xl hover:bg-slate-100 dark:hover:bg-slate-800 transition-colors group text-left"
                  title="View Profile"
                >
                  <img
                    src={user.avatarUrl || 'https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?auto=format&fit=crop&q=80&w=256'}
                    alt={user.fullName}
                    className="w-8 h-8 rounded-full object-cover ring-2 ring-blue-500/30 group-hover:ring-blue-500 transition-all"
                  />
                  <div className="hidden lg:block">
                    <p className="text-xs font-bold text-slate-800 dark:text-slate-100 leading-tight">
                      {user.fullName.split(' ')[0]}
                    </p>
                    <p className="text-[10px] text-slate-400">{user.studentId || user.employeeId || 'ID Verified'}</p>
                  </div>
                </button>

                <button
                  onClick={logout}
                  className="p-1.5 rounded-lg text-slate-400 hover:text-rose-600 hover:bg-rose-50 dark:hover:bg-rose-950/40 transition-colors"
                  title="Sign Out"
                >
                  <LogOut className="w-4 h-4" />
                </button>
              </div>
            ) : (
              <button
                onClick={() => quickLogin('STUDENT')}
                className="px-3.5 py-1.5 rounded-xl bg-blue-600 hover:bg-blue-700 text-white text-xs font-semibold shadow-md shadow-blue-500/25 transition-all"
              >
                Sign In
              </button>
            )}
          </div>
        </div>
      </div>
    </header>
  );
};
