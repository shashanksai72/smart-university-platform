import React from 'react';
import {
  Users,
  BookOpen,
  Calendar,
  CheckSquare,
  Award,
  Megaphone,
  Clock,
  Sparkles,
  ArrowRight,
  TrendingUp,
  AlertTriangle,
} from 'lucide-react';
import { useAuth } from '../../context/AuthContext';
import { useData } from '../../context/DataContext';

interface FacultyOverviewProps {
  onNavigate: (tab: string) => void;
}

export const FacultyOverview: React.FC<FacultyOverviewProps> = ({ onNavigate }) => {
  const { user } = useAuth();
  const { subjects, assignments } = useData();

  return (
    <div className="space-y-6">
      {/* Faculty Welcome Hero */}
      <div className="relative overflow-hidden rounded-3xl p-6 sm:p-8 bg-gradient-to-r from-amber-600 via-orange-600 to-indigo-600 text-white shadow-xl shadow-amber-500/15">
        <div className="relative z-10 max-w-2xl">
          <div className="inline-flex items-center space-x-2 px-3 py-1 rounded-full bg-white/20 text-white text-xs font-semibold backdrop-blur-md mb-3">
            <Sparkles className="w-3.5 h-3.5 text-amber-200" />
            <span>Faculty Academic Management Portal</span>
          </div>
          <h1 className="text-2xl sm:text-3xl font-extrabold tracking-tight">
            Welcome, {user?.fullName || 'Prof. Alexander Wright'}!
          </h1>
          <p className="mt-2 text-sm text-amber-100 leading-relaxed font-normal">
            Employee Code: <span className="font-semibold text-white">{user?.employeeId || 'FAC-CS-101'}</span> •{' '}
            {user?.title || 'Associate Professor & AI Lab Director'} • Department of Computer Science & Engineering.
          </p>

          <div className="mt-5 flex flex-wrap gap-2.5">
            <button
              onClick={() => onNavigate('faculty-attendance')}
              className="px-4 py-2 rounded-xl bg-white text-amber-700 hover:bg-amber-50 font-bold text-xs shadow-md transition-all flex items-center space-x-1.5"
            >
              <CheckSquare className="w-4 h-4" />
              <span>Record Today's Attendance</span>
            </button>
            <button
              onClick={() => onNavigate('faculty-marks')}
              className="px-4 py-2 rounded-xl bg-white/20 hover:bg-white/30 text-white font-semibold text-xs backdrop-blur-md transition-all flex items-center space-x-1.5"
            >
              <Award className="w-4 h-4" />
              <span>Enter Internal Marks</span>
            </button>
          </div>
        </div>
      </div>

      {/* KPI Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        <div
          onClick={() => onNavigate('faculty-students')}
          className="p-5 rounded-2xl glass-card hover:border-amber-500/50 hover:shadow-lg transition-all cursor-pointer group"
        >
          <div className="flex items-center justify-between">
            <span className="text-xs font-semibold text-slate-500 dark:text-slate-400">Assigned Students</span>
            <div className="p-2 rounded-xl bg-amber-100 dark:bg-amber-900/40 text-amber-600 dark:text-amber-400 group-hover:scale-110 transition-transform">
              <Users className="w-5 h-5" />
            </div>
          </div>
          <p className="text-2xl font-black text-slate-900 dark:text-white mt-2">142 Students</p>
          <p className="text-[11px] text-emerald-600 dark:text-emerald-400 mt-1 font-semibold">3 Active Batches</p>
        </div>

        <div className="p-5 rounded-2xl glass-card border border-slate-200 dark:border-slate-800">
          <div className="flex items-center justify-between">
            <span className="text-xs font-semibold text-slate-500 dark:text-slate-400">Assigned Subjects</span>
            <div className="p-2 rounded-xl bg-blue-100 dark:bg-blue-900/40 text-blue-600 dark:text-blue-400">
              <BookOpen className="w-5 h-5" />
            </div>
          </div>
          <p className="text-2xl font-black text-slate-900 dark:text-white mt-2">3 Courses</p>
          <p className="text-[11px] text-blue-600 dark:text-blue-400 mt-1 font-semibold">CS501, CS502, CS503</p>
        </div>

        <div
          onClick={() => onNavigate('faculty-attendance')}
          className="p-5 rounded-2xl glass-card hover:border-emerald-500/50 hover:shadow-lg transition-all cursor-pointer group"
        >
          <div className="flex items-center justify-between">
            <span className="text-xs font-semibold text-slate-500 dark:text-slate-400">Cohort Attendance Avg</span>
            <div className="p-2 rounded-xl bg-emerald-100 dark:bg-emerald-900/40 text-emerald-600 dark:text-emerald-400 group-hover:scale-110 transition-transform">
              <TrendingUp className="w-5 h-5" />
            </div>
          </div>
          <p className="text-2xl font-black text-slate-900 dark:text-white mt-2">92.4%</p>
          <p className="text-[11px] text-emerald-600 dark:text-emerald-400 mt-1 font-semibold">
            3 students flagged &lt;75%
          </p>
        </div>

        <div
          onClick={() => onNavigate('faculty-assignments')}
          className="p-5 rounded-2xl glass-card hover:border-indigo-500/50 hover:shadow-lg transition-all cursor-pointer group"
        >
          <div className="flex items-center justify-between">
            <span className="text-xs font-semibold text-slate-500 dark:text-slate-400">Assignments Set</span>
            <div className="p-2 rounded-xl bg-indigo-100 dark:bg-indigo-900/40 text-indigo-600 dark:text-indigo-400 group-hover:scale-110 transition-transform">
              <CheckSquare className="w-5 h-5" />
            </div>
          </div>
          <p className="text-2xl font-black text-slate-900 dark:text-white mt-2">3 Tasks</p>
          <p className="text-[11px] text-indigo-600 dark:text-indigo-400 mt-1 font-semibold">48 Submissions to grade</p>
        </div>
      </div>

      {/* Today's Teaching Schedule & Quick Attendance Action */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <div className="p-6 rounded-3xl glass-card border border-slate-200 dark:border-slate-800">
          <h3 className="text-base font-bold text-slate-900 dark:text-white mb-1">Today's Class Schedule</h3>
          <p className="text-xs text-slate-500 dark:text-slate-400 mb-4">Monday Lecture and Practical Lab Allocations</p>

          <div className="space-y-3">
            <div className="p-4 rounded-2xl bg-amber-50/70 dark:bg-amber-950/40 border border-amber-200 dark:border-amber-900/60 flex items-center justify-between text-xs">
              <div>
                <span className="font-black text-amber-700 dark:text-amber-300">CS501 (Lecture)</span>
                <p className="font-bold text-slate-900 dark:text-white mt-0.5">Deep Learning & Neural Architectures</p>
                <p className="text-slate-400 text-[11px] mt-1">Venue: Turing Hall 301 • 45 Students Enrolled</p>
              </div>
              <div className="text-right">
                <span className="font-mono font-bold text-slate-800 dark:text-slate-100">09:00 - 10:30 AM</span>
                <button
                  onClick={() => onNavigate('faculty-attendance')}
                  className="mt-2 block px-3 py-1 rounded-lg bg-amber-600 text-white font-semibold text-[10px] hover:bg-amber-700 transition-colors"
                >
                  Mark Attendance
                </button>
              </div>
            </div>

            <div className="p-4 rounded-2xl bg-slate-50/70 dark:bg-slate-900/40 border border-slate-200 dark:border-slate-800 flex items-center justify-between text-xs">
              <div>
                <span className="font-black text-blue-600 dark:text-blue-400">CS502 (Practical Lab)</span>
                <p className="font-bold text-slate-900 dark:text-white mt-0.5">Distributed Cloud Systems Lab</p>
                <p className="text-slate-400 text-[11px] mt-1">Venue: Cloud Cluster Lab 4 • Terminal Cluster</p>
              </div>
              <div className="text-right">
                <span className="font-mono font-bold text-slate-800 dark:text-slate-100">11:00 - 12:30 PM</span>
                <span className="mt-2 block text-[10px] text-slate-400 font-semibold">Upcoming</span>
              </div>
            </div>
          </div>
        </div>

        {/* Low Attendance Notice Queue */}
        <div className="p-6 rounded-3xl glass-card border border-slate-200 dark:border-slate-800 flex flex-col justify-between">
          <div>
            <div className="flex items-center space-x-2 text-rose-600 mb-2">
              <AlertTriangle className="w-5 h-5" />
              <h3 className="text-base font-bold text-slate-900 dark:text-white">Attendance Threshold Warnings</h3>
            </div>
            <p className="text-xs text-slate-500 dark:text-slate-400 mb-4">
              Students in your courses falling below 75% attendance threshold:
            </p>

            <div className="space-y-2.5 text-xs">
              <div className="p-3 rounded-xl bg-slate-50 dark:bg-slate-900/40 border border-slate-200 dark:border-slate-800 flex items-center justify-between">
                <div>
                  <p className="font-bold text-slate-800 dark:text-slate-100">Devon Vance (SU-2024-CS-088)</p>
                  <p className="text-[11px] text-slate-400">CS501 Deep Learning</p>
                </div>
                <span className="px-2 py-0.5 rounded-full bg-rose-100 text-rose-700 text-[11px] font-bold">
                  68.5%
                </span>
              </div>

              <div className="p-3 rounded-xl bg-slate-50 dark:bg-slate-900/40 border border-slate-200 dark:border-slate-800 flex items-center justify-between">
                <div>
                  <p className="font-bold text-slate-800 dark:text-slate-100">Chloe Bennett (SU-2024-CS-092)</p>
                  <p className="text-[11px] text-slate-400">CS502 Distributed Systems</p>
                </div>
                <span className="px-2 py-0.5 rounded-full bg-rose-100 text-rose-700 text-[11px] font-bold">
                  71.2%
                </span>
              </div>
            </div>
          </div>

          <button
            onClick={() => onNavigate('faculty-attendance')}
            className="mt-4 w-full py-2.5 rounded-xl border border-slate-200 dark:border-slate-700 hover:bg-slate-100 dark:hover:bg-slate-800 text-xs font-semibold text-slate-700 dark:text-slate-200 transition-all"
          >
            Manage Course Attendance Records
          </button>
        </div>
      </div>
    </div>
  );
};
