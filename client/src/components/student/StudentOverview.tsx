import React from 'react';
import {
  CheckSquare,
  Award,
  CreditCard,
  FileText,
  Clock,
  Sparkles,
  ArrowRight,
  TrendingUp,
  Calendar,
  AlertTriangle,
  Megaphone,
  BookOpen,
} from 'lucide-react';
import { ResponsiveContainer, AreaChart, Area, XAxis, YAxis, Tooltip, CartesianGrid } from 'recharts';
import { useAuth } from '../../context/AuthContext';
import { useData } from '../../context/DataContext';

interface StudentOverviewProps {
  onNavigate: (tab: string) => void;
}

export const StudentOverview: React.FC<StudentOverviewProps> = ({ onNavigate }) => {
  const { user } = useAuth();
  const { subjects, assignments, timetables, examinations, announcements, semesterResults } = useData();

  const pendingAssignments = assignments.filter(a => a.status === 'PENDING').length;
  const attendanceRate = user?.attendanceRate || 94.2;
  const isLowAttendance = attendanceRate < 75;

  const chartData = semesterResults.map(r => ({
    semester: r.semester.replace(' (Current)', ''),
    gpa: r.gpa,
  }));

  return (
    <div className="space-y-6">
      {/* 1. Welcome Hero Banner */}
      <div className="relative overflow-hidden rounded-3xl p-6 sm:p-8 bg-gradient-to-r from-blue-600 via-indigo-600 to-cyan-600 text-white shadow-xl shadow-blue-500/15">
        <div className="relative z-10 max-w-2xl">
          <div className="inline-flex items-center space-x-2 px-3 py-1 rounded-full bg-white/20 text-white text-xs font-semibold backdrop-blur-md mb-3">
            <Sparkles className="w-3.5 h-3.5 text-cyan-200" />
            <span>Academic Year 2026 - 2027 • Semester 5</span>
          </div>
          <h1 className="text-2xl sm:text-3xl font-extrabold tracking-tight">
            Welcome back, {user?.fullName || 'Marcus Chen'}! 👋
          </h1>
          <p className="mt-2 text-sm text-blue-100 font-normal leading-relaxed">
            Student ID: <span className="font-semibold text-white">{user?.studentId || 'SU-2024-CS-042'}</span> • Department
            of <span className="font-semibold text-white">{user?.department || 'Computer Science & Engineering'}</span>.
            Your academic performance is on track with distinction standing.
          </p>

          <div className="mt-5 flex flex-wrap gap-2.5">
            <button
              onClick={() => onNavigate('timetable')}
              className="px-4 py-2 rounded-xl bg-white text-blue-600 hover:bg-blue-50 font-bold text-xs shadow-md transition-all flex items-center space-x-1.5"
            >
              <Calendar className="w-4 h-4" />
              <span>Today's Schedule</span>
            </button>
            <button
              onClick={() => onNavigate('ai-assistant')}
              className="px-4 py-2 rounded-xl bg-white/20 hover:bg-white/30 text-white font-semibold text-xs backdrop-blur-md transition-all flex items-center space-x-1.5"
            >
              <Sparkles className="w-4 h-4 text-cyan-300" />
              <span>Ask Athena AI</span>
            </button>
          </div>
        </div>

        {/* Decorative elements */}
        <div className="absolute right-0 bottom-0 translate-x-10 translate-y-10 w-72 h-72 bg-white/10 rounded-full blur-2xl pointer-events-none" />
      </div>

      {/* Low Attendance Warning if Applicable */}
      {isLowAttendance && (
        <div className="p-4 rounded-2xl bg-rose-50 dark:bg-rose-950/40 border border-rose-200 dark:border-rose-900 text-rose-800 dark:text-rose-200 text-xs flex items-center justify-between">
          <div className="flex items-center space-x-3">
            <AlertTriangle className="w-5 h-5 text-rose-600 flex-shrink-0" />
            <span>
              <strong>Low Attendance Notice:</strong> Your attendance is currently {attendanceRate}%, which is below the
              mandatory 75% threshold. Please consult your academic advisor immediately.
            </span>
          </div>
          <button
            onClick={() => onNavigate('attendance')}
            className="px-3 py-1.5 rounded-lg bg-rose-600 text-white font-semibold text-[11px] hover:bg-rose-700 transition-colors"
          >
            Review Attendance
          </button>
        </div>
      )}

      {/* 2. Key Metrics Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        {/* Attendance Card */}
        <div
          onClick={() => onNavigate('attendance')}
          className="p-5 rounded-2xl glass-card hover:border-blue-500/50 hover:shadow-lg transition-all cursor-pointer group"
        >
          <div className="flex items-center justify-between">
            <span className="text-xs font-semibold text-slate-500 dark:text-slate-400">Overall Attendance</span>
            <div className="p-2 rounded-xl bg-blue-100 dark:bg-blue-900/40 text-blue-600 dark:text-blue-400 group-hover:scale-110 transition-transform">
              <CheckSquare className="w-5 h-5" />
            </div>
          </div>
          <p className="text-2xl font-black text-slate-900 dark:text-white mt-2">{attendanceRate}%</p>
          <div className="mt-2 flex items-center justify-between text-[11px]">
            <span className="text-emerald-600 dark:text-emerald-400 font-semibold">Eligible for Exams</span>
            <span className="text-slate-400">&gt;75% required</span>
          </div>
          <div className="mt-2.5 w-full bg-slate-100 dark:bg-slate-800 h-2 rounded-full overflow-hidden">
            <div
              className={`h-full rounded-full transition-all duration-500 ${
                isLowAttendance ? 'bg-rose-500' : 'bg-blue-600'
              }`}
              style={{ width: `${Math.min(attendanceRate, 100)}%` }}
            />
          </div>
        </div>

        {/* CGPA Card */}
        <div
          onClick={() => onNavigate('academics')}
          className="p-5 rounded-2xl glass-card hover:border-cyan-500/50 hover:shadow-lg transition-all cursor-pointer group"
        >
          <div className="flex items-center justify-between">
            <span className="text-xs font-semibold text-slate-500 dark:text-slate-400">Cumulative CGPA</span>
            <div className="p-2 rounded-xl bg-cyan-100 dark:bg-cyan-900/40 text-cyan-600 dark:text-cyan-400 group-hover:scale-110 transition-transform">
              <Award className="w-5 h-5" />
            </div>
          </div>
          <p className="text-2xl font-black text-slate-900 dark:text-white mt-2">{user?.cgpa || 3.84} / 4.0</p>
          <div className="mt-2 flex items-center justify-between text-[11px]">
            <span className="text-cyan-600 dark:text-cyan-400 font-semibold">Top 5% of Cohort</span>
            <span className="text-slate-400">96 Credits</span>
          </div>
          <div className="mt-2.5 w-full bg-slate-100 dark:bg-slate-800 h-2 rounded-full overflow-hidden">
            <div
              className="h-full bg-cyan-500 rounded-full transition-all duration-500"
              style={{ width: `${((user?.cgpa || 3.84) / 4.0) * 100}%` }}
            />
          </div>
        </div>

        {/* Assignments Card */}
        <div
          onClick={() => onNavigate('assignments')}
          className="p-5 rounded-2xl glass-card hover:border-indigo-500/50 hover:shadow-lg transition-all cursor-pointer group"
        >
          <div className="flex items-center justify-between">
            <span className="text-xs font-semibold text-slate-500 dark:text-slate-400">Active Coursework</span>
            <div className="p-2 rounded-xl bg-indigo-100 dark:bg-indigo-900/40 text-indigo-600 dark:text-indigo-400 group-hover:scale-110 transition-transform">
              <FileText className="w-5 h-5" />
            </div>
          </div>
          <p className="text-2xl font-black text-slate-900 dark:text-white mt-2">{pendingAssignments} Pending</p>
          <div className="mt-2 flex items-center justify-between text-[11px]">
            <span className="text-amber-600 dark:text-amber-400 font-semibold">Next due in 7 days</span>
            <span className="text-slate-400">Transformer task</span>
          </div>
          <div className="mt-2.5 w-full bg-slate-100 dark:bg-slate-800 h-2 rounded-full overflow-hidden">
            <div className="h-full bg-indigo-500 rounded-full" style={{ width: '60%' }} />
          </div>
        </div>

        {/* Fee Status Card */}
        <div
          onClick={() => onNavigate('fees')}
          className="p-5 rounded-2xl glass-card hover:border-emerald-500/50 hover:shadow-lg transition-all cursor-pointer group"
        >
          <div className="flex items-center justify-between">
            <span className="text-xs font-semibold text-slate-500 dark:text-slate-400">Fee Clearance</span>
            <div className="p-2 rounded-xl bg-emerald-100 dark:bg-emerald-900/40 text-emerald-600 dark:text-emerald-400 group-hover:scale-110 transition-transform">
              <CreditCard className="w-5 h-5" />
            </div>
          </div>
          <p className="text-2xl font-black text-slate-900 dark:text-white mt-2">
            ${user?.pendingFees || 250}.00 Due
          </p>
          <div className="mt-2 flex items-center justify-between text-[11px]">
            <span className="text-emerald-600 dark:text-emerald-400 font-semibold">$4,250 Cleared</span>
            <span className="text-slate-400">Due Nov 25</span>
          </div>
          <div className="mt-2.5 w-full bg-slate-100 dark:bg-slate-800 h-2 rounded-full overflow-hidden">
            <div className="h-full bg-emerald-500 rounded-full" style={{ width: '94%' }} />
          </div>
        </div>
      </div>

      {/* 3. Middle Section: Performance Graph & Today's Schedule */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* GPA Progression Chart */}
        <div className="lg:col-span-2 p-6 rounded-3xl glass-card border border-slate-200 dark:border-slate-800">
          <div className="flex items-center justify-between mb-4">
            <div>
              <h3 className="text-base font-bold text-slate-900 dark:text-white">Academic GPA Progression</h3>
              <p className="text-xs text-slate-500 dark:text-slate-400">Semester-wise Grade Point Average trajectory</p>
            </div>
            <span className="inline-flex items-center text-xs font-semibold text-emerald-600 dark:text-emerald-400">
              <TrendingUp className="w-3.5 h-3.5 mr-1" />
              Consistent 3.8+ GPA
            </span>
          </div>

          <div className="h-64 w-full">
            <ResponsiveContainer width="100%" height="100%">
              <AreaChart data={chartData} margin={{ top: 10, right: 10, left: -20, bottom: 0 }}>
                <defs>
                  <linearGradient id="gpaGrad" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="5%" stopColor="#3b82f6" stopOpacity={0.4} />
                    <stop offset="95%" stopColor="#3b82f6" stopOpacity={0.0} />
                  </linearGradient>
                </defs>
                <CartesianGrid strokeDasharray="3 3" opacity={0.15} />
                <XAxis dataKey="semester" tick={{ fontSize: 11 }} />
                <YAxis domain={[3.0, 4.0]} tick={{ fontSize: 11 }} />
                <Tooltip
                  contentStyle={{
                    backgroundColor: 'rgba(15, 23, 42, 0.9)',
                    borderRadius: '12px',
                    border: 'none',
                    color: '#fff',
                    fontSize: '12px',
                  }}
                />
                <Area type="monotone" dataKey="gpa" stroke="#3b82f6" strokeWidth={3} fillOpacity={1} fill="url(#gpaGrad)" />
              </AreaChart>
            </ResponsiveContainer>
          </div>
        </div>

        {/* Today's Classes Card */}
        <div className="p-6 rounded-3xl glass-card border border-slate-200 dark:border-slate-800 flex flex-col justify-between">
          <div>
            <div className="flex items-center justify-between mb-4">
              <h3 className="text-base font-bold text-slate-900 dark:text-white">Today's Lectures</h3>
              <span className="text-[11px] font-semibold text-blue-600 dark:text-blue-400">Monday</span>
            </div>

            <div className="space-y-3">
              {timetables.slice(0, 3).map((item, idx) => (
                <div
                  key={item.id}
                  className={`p-3 rounded-2xl border text-xs transition-colors ${
                    idx === 0
                      ? 'bg-blue-50/70 dark:bg-blue-950/40 border-blue-200 dark:border-blue-900'
                      : 'bg-slate-50/60 dark:bg-slate-900/40 border-slate-200/80 dark:border-slate-800'
                  }`}
                >
                  <div className="flex items-center justify-between">
                    <span className="font-bold text-slate-800 dark:text-slate-100">{item.code}</span>
                    <span className="text-[10px] text-slate-400 font-mono">{item.time}</span>
                  </div>
                  <p className="text-slate-700 dark:text-slate-300 font-medium mt-1 truncate">{item.subject}</p>
                  <div className="flex items-center justify-between text-[11px] text-slate-400 mt-2">
                    <span>{item.room}</span>
                    <span className="text-blue-600 dark:text-blue-400 font-medium">{item.type}</span>
                  </div>
                </div>
              ))}
            </div>
          </div>

          <button
            onClick={() => onNavigate('timetable')}
            className="mt-4 w-full py-2.5 rounded-xl border border-slate-200 dark:border-slate-700 hover:bg-slate-100 dark:hover:bg-slate-800 text-xs font-semibold text-slate-700 dark:text-slate-200 transition-all flex items-center justify-center space-x-1"
          >
            <span>View Full Timetable</span>
            <ArrowRight className="w-3.5 h-3.5" />
          </button>
        </div>
      </div>

      {/* 4. Bottom Section: Upcoming Examinations & Campus Announcements */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {/* Upcoming Examinations */}
        <div className="p-6 rounded-3xl glass-card border border-slate-200 dark:border-slate-800">
          <div className="flex items-center justify-between mb-4">
            <h3 className="text-base font-bold text-slate-900 dark:text-white flex items-center space-x-2">
              <Clock className="w-4 h-4 text-indigo-500" />
              <span>Upcoming Examinations</span>
            </h3>
            <button
              onClick={() => onNavigate('examinations')}
              className="text-xs font-semibold text-blue-600 dark:text-blue-400 hover:underline"
            >
              Hall Tickets &rarr;
            </button>
          </div>

          <div className="space-y-3">
            {examinations.map(exam => (
              <div
                key={exam.id}
                className="p-3.5 rounded-2xl bg-slate-50/70 dark:bg-slate-900/40 border border-slate-200 dark:border-slate-800 flex items-center justify-between"
              >
                <div>
                  <div className="flex items-center space-x-2">
                    <span className="font-bold text-xs text-slate-900 dark:text-white">{exam.subjectCode}</span>
                    <span className="text-[10px] px-2 py-0.5 rounded-full bg-indigo-100 dark:bg-indigo-950/60 text-indigo-700 dark:text-indigo-300 font-semibold">
                      {exam.hall}
                    </span>
                  </div>
                  <p className="text-xs text-slate-600 dark:text-slate-300 mt-0.5 font-medium">{exam.subjectName}</p>
                </div>
                <div className="text-right">
                  <p className="text-xs font-bold text-slate-800 dark:text-slate-100">{exam.date}</p>
                  <p className="text-[10px] text-slate-400">{exam.time.split('-')[0]}</p>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Campus Announcements */}
        <div className="p-6 rounded-3xl glass-card border border-slate-200 dark:border-slate-800">
          <div className="flex items-center justify-between mb-4">
            <h3 className="text-base font-bold text-slate-900 dark:text-white flex items-center space-x-2">
              <Megaphone className="w-4 h-4 text-cyan-500" />
              <span>Campus Announcements</span>
            </h3>
            <span className="text-xs text-slate-400">Official Notices</span>
          </div>

          <div className="space-y-3">
            {announcements.map(ann => (
              <div
                key={ann.id}
                className="p-3.5 rounded-2xl bg-slate-50/70 dark:bg-slate-900/40 border border-slate-200 dark:border-slate-800"
              >
                <div className="flex items-center justify-between mb-1">
                  <span className="text-xs font-bold text-slate-900 dark:text-white truncate">{ann.title}</span>
                  <span className="text-[10px] text-slate-400 whitespace-nowrap ml-2">{ann.date}</span>
                </div>
                <p className="text-xs text-slate-600 dark:text-slate-300 line-clamp-2">{ann.content}</p>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};
