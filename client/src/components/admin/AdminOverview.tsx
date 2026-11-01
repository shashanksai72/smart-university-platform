import React from 'react';
import {
  Users,
  GraduationCap,
  Building2,
  CreditCard,
  CheckSquare,
  AlertCircle,
  Megaphone,
  TrendingUp,
  Shield,
  Activity,
  ArrowRight,
} from 'lucide-react';
import { useAuth } from '../../context/AuthContext';
import { useData } from '../../context/DataContext';

interface AdminOverviewProps {
  onNavigate: (tab: string) => void;
}

export const AdminOverview: React.FC<AdminOverviewProps> = ({ onNavigate }) => {
  const { user } = useAuth();
  const { departments, grievances, announcements } = useData();

  const pendingGrievances = grievances.filter(g => g.status === 'PENDING').length;

  return (
    <div className="space-y-6">
      {/* Admin Hero Card */}
      <div className="relative overflow-hidden rounded-3xl p-6 sm:p-8 bg-gradient-to-r from-purple-700 via-indigo-700 to-blue-700 text-white shadow-xl shadow-purple-500/15">
        <div className="relative z-10 max-w-2xl">
          <div className="inline-flex items-center space-x-2 px-3 py-1 rounded-full bg-white/20 text-white text-xs font-semibold backdrop-blur-md mb-3">
            <Shield className="w-3.5 h-3.5 text-purple-200" />
            <span>Central University Administration Command Center</span>
          </div>
          <h1 className="text-2xl sm:text-3xl font-extrabold tracking-tight">
            Administrator Console • {user?.fullName || 'Dr. Sarah Jenkins'}
          </h1>
          <p className="mt-2 text-sm text-purple-100 font-normal leading-relaxed">
            Role: <span className="font-semibold text-white">{user?.title || 'Registrar & Chief Academic Officer'}</span>.
            Unified governance across all 4 departments, 1,180 students, and 82 faculty members.
          </p>

          <div className="mt-5 flex flex-wrap gap-2.5">
            <button
              onClick={() => onNavigate('admin-analytics')}
              className="px-4 py-2 rounded-xl bg-white text-purple-800 hover:bg-purple-50 font-bold text-xs shadow-md transition-all flex items-center space-x-1.5"
            >
              <TrendingUp className="w-4 h-4" />
              <span>Visual Analytics & Reports</span>
            </button>
            <button
              onClick={() => onNavigate('admin-students')}
              className="px-4 py-2 rounded-xl bg-white/20 hover:bg-white/30 text-white font-semibold text-xs backdrop-blur-md transition-all flex items-center space-x-1.5"
            >
              <Users className="w-4 h-4 text-purple-200" />
              <span>Manage Student Accounts</span>
            </button>
          </div>
        </div>
      </div>

      {/* KPI Metrics Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        {/* Total Students */}
        <div
          onClick={() => onNavigate('admin-students')}
          className="p-5 rounded-2xl glass-card hover:border-purple-500/50 hover:shadow-lg transition-all cursor-pointer group"
        >
          <div className="flex items-center justify-between">
            <span className="text-xs font-semibold text-slate-500 dark:text-slate-400">Total Enrolled Students</span>
            <div className="p-2 rounded-xl bg-purple-100 dark:bg-purple-900/40 text-purple-600 dark:text-purple-400 group-hover:scale-110 transition-transform">
              <Users className="w-5 h-5" />
            </div>
          </div>
          <p className="text-2xl font-black text-slate-900 dark:text-white mt-2">1,180</p>
          <div className="mt-2 flex items-center justify-between text-[11px]">
            <span className="text-emerald-600 dark:text-emerald-400 font-semibold">+68 New Admissions</span>
            <span className="text-slate-400">4 Cohorts</span>
          </div>
        </div>

        {/* Total Faculty */}
        <div
          onClick={() => onNavigate('admin-faculty')}
          className="p-5 rounded-2xl glass-card hover:border-blue-500/50 hover:shadow-lg transition-all cursor-pointer group"
        >
          <div className="flex items-center justify-between">
            <span className="text-xs font-semibold text-slate-500 dark:text-slate-400">Distinguished Faculty</span>
            <div className="p-2 rounded-xl bg-blue-100 dark:bg-blue-900/40 text-blue-600 dark:text-blue-400 group-hover:scale-110 transition-transform">
              <GraduationCap className="w-5 h-5" />
            </div>
          </div>
          <p className="text-2xl font-black text-slate-900 dark:text-white mt-2">82</p>
          <div className="mt-2 flex items-center justify-between text-[11px]">
            <span className="text-blue-600 dark:text-blue-400 font-semibold">1:14 Faculty-Student Ratio</span>
            <span className="text-slate-400">100% Ph.D.</span>
          </div>
        </div>

        {/* Total Fees Collected */}
        <div className="p-5 rounded-2xl glass-card border border-slate-200 dark:border-slate-800">
          <div className="flex items-center justify-between">
            <span className="text-xs font-semibold text-slate-500 dark:text-slate-400">Fee Revenue (YTD)</span>
            <div className="p-2 rounded-xl bg-emerald-100 dark:bg-emerald-900/40 text-emerald-600 dark:text-emerald-400">
              <CreditCard className="w-5 h-5" />
            </div>
          </div>
          <p className="text-2xl font-black text-slate-900 dark:text-white mt-2">$3.42M</p>
          <div className="mt-2 flex items-center justify-between text-[11px]">
            <span className="text-emerald-600 dark:text-emerald-400 font-semibold">96.8% Collection Rate</span>
            <span className="text-slate-400">$148K Pending</span>
          </div>
        </div>

        {/* Grievance Queue */}
        <div
          onClick={() => onNavigate('admin-grievances')}
          className="p-5 rounded-2xl glass-card hover:border-rose-500/50 hover:shadow-lg transition-all cursor-pointer group"
        >
          <div className="flex items-center justify-between">
            <span className="text-xs font-semibold text-slate-500 dark:text-slate-400">Active Grievance Tickets</span>
            <div className="p-2 rounded-xl bg-rose-100 dark:bg-rose-900/40 text-rose-600 dark:text-rose-400 group-hover:scale-110 transition-transform">
              <AlertCircle className="w-5 h-5" />
            </div>
          </div>
          <p className="text-2xl font-black text-slate-900 dark:text-white mt-2">{pendingGrievances} Pending</p>
          <div className="mt-2 flex items-center justify-between text-[11px]">
            <span className="text-rose-600 font-semibold">Resolution time &lt; 24h</span>
            <span className="text-slate-400">Click to Review</span>
          </div>
        </div>
      </div>

      {/* Middle Section: Recent System Activities & Department Performance */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Recent Activities Audit Log */}
        <div className="p-6 rounded-3xl glass-card border border-slate-200 dark:border-slate-800">
          <div className="flex items-center justify-between mb-4">
            <h3 className="text-base font-bold text-slate-900 dark:text-white flex items-center space-x-2">
              <Activity className="w-4 h-4 text-purple-500" />
              <span>Campus Audit & Event Log</span>
            </h3>
            <span className="text-xs text-slate-400">Automated Audit Stream</span>
          </div>

          <div className="space-y-3">
            {[
              { time: '10 mins ago', desc: 'Fall 2026 End-Semester Examination timetable published by Dean Office' },
              { time: '32 mins ago', desc: 'Prof. Alexander Wright submitted Continuous Assessment marks for CS501' },
              { time: '1 hour ago', desc: 'Marcus Chen simulated tuition fee clearance of $3,500 (Ref #REC-SU-9081)' },
              { time: '2 hours ago', desc: 'Automated 75% attendance threshold report generated across all colleges' },
              { time: '4 hours ago', desc: 'Central Library registered 14 new artificial intelligence textbook titles' },
            ].map((ev, i) => (
              <div
                key={i}
                className="p-3.5 rounded-2xl bg-slate-50/70 dark:bg-slate-900/40 border border-slate-200/80 dark:border-slate-800 flex items-start space-x-3 text-xs"
              >
                <div className="w-2 h-2 rounded-full bg-purple-500 mt-1.5 flex-shrink-0" />
                <div className="flex-1">
                  <p className="text-slate-700 dark:text-slate-200 font-medium">{ev.desc}</p>
                  <p className="text-[10px] text-slate-400 mt-0.5">{ev.time}</p>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Academic Departments Overview */}
        <div className="p-6 rounded-3xl glass-card border border-slate-200 dark:border-slate-800 flex flex-col justify-between">
          <div>
            <div className="flex items-center justify-between mb-4">
              <h3 className="text-base font-bold text-slate-900 dark:text-white flex items-center space-x-2">
                <Building2 className="w-4 h-4 text-blue-500" />
                <span>Academic Departments</span>
              </h3>
              <button
                onClick={() => onNavigate('admin-departments')}
                className="text-xs font-semibold text-blue-600 dark:text-blue-400 hover:underline"
              >
                View Details &rarr;
              </button>
            </div>

            <div className="space-y-3">
              {departments.map(d => (
                <div
                  key={d.id}
                  className="p-3.5 rounded-2xl bg-slate-50/70 dark:bg-slate-900/40 border border-slate-200/80 dark:border-slate-800 flex items-center justify-between text-xs"
                >
                  <div>
                    <span className="font-bold text-blue-600 dark:text-blue-400">{d.code}</span>
                    <p className="font-semibold text-slate-900 dark:text-white">{d.name}</p>
                    <p className="text-[10px] text-slate-400">{d.hod}</p>
                  </div>
                  <div className="text-right">
                    <p className="font-black text-slate-900 dark:text-white">{d.studentsCount} Students</p>
                    <p className="text-[11px] text-slate-400">{d.facultyCount} Faculty</p>
                  </div>
                </div>
              ))}
            </div>
          </div>

          <button
            onClick={() => onNavigate('admin-analytics')}
            className="mt-4 w-full py-2.5 rounded-xl border border-slate-200 dark:border-slate-700 hover:bg-slate-100 dark:hover:bg-slate-800 text-xs font-semibold text-slate-700 dark:text-slate-200 transition-all flex items-center justify-center space-x-1.5"
          >
            <span>Open Recharts Visual Analytics</span>
            <ArrowRight className="w-4 h-4" />
          </button>
        </div>
      </div>
    </div>
  );
};
