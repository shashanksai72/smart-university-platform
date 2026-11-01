import React from 'react';
import {
  BarChart3,
  TrendingUp,
  PieChart as PieIcon,
  Download,
  Calendar,
  Layers,
  ArrowUpRight,
} from 'lucide-react';
import {
  ResponsiveContainer,
  LineChart,
  Line,
  BarChart,
  Bar,
  PieChart,
  Pie,
  Cell,
  XAxis,
  YAxis,
  Tooltip,
  Legend,
  CartesianGrid,
} from 'recharts';

export const AdminAnalytics: React.FC = () => {
  // 1. Monthly Attendance Trend
  const attendanceTrends = [
    { month: 'Jun', rate: 94.5, target: 75 },
    { month: 'Jul', rate: 93.2, target: 75 },
    { month: 'Aug', rate: 89.8, target: 75 },
    { month: 'Sep', rate: 92.1, target: 75 },
    { month: 'Oct', rate: 91.8, target: 75 },
    { month: 'Nov (Projected)', rate: 93.5, target: 75 },
  ];

  // 2. Department-wise Enrolled Students & Faculty
  const departmentStats = [
    { name: 'Computer Science', students: 420, faculty: 28 },
    { name: 'Electronics', students: 310, faculty: 22 },
    { name: 'Mechanical', students: 260, faculty: 18 },
    { name: 'Business & Mgmt', students: 190, faculty: 14 },
  ];

  // 3. Fee Revenue Distribution by Stream
  const feeDistribution = [
    { name: 'Tuition Fees', value: 2460000, color: '#3b82f6' },
    { name: 'Lab & HPC Access', value: 540000, color: '#06b6d4' },
    { name: 'Hostel & Amenities', value: 280000, color: '#8b5cf6' },
    { name: 'Exam & Library', value: 140000, color: '#10b981' },
  ];

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="p-6 sm:p-8 rounded-3xl glass-card border border-slate-200 dark:border-slate-800">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
          <div>
            <div className="inline-flex items-center space-x-2 px-3 py-1 rounded-full bg-purple-100 dark:bg-purple-900/60 text-purple-700 dark:text-purple-300 text-xs font-semibold mb-2">
              <BarChart3 className="w-3.5 h-3.5" />
              <span>Institutional Business Intelligence</span>
            </div>
            <h2 className="text-2xl font-black text-slate-900 dark:text-white">Campus Visual Analytics & Trends</h2>
            <p className="text-xs text-slate-500 dark:text-slate-400 mt-1 max-w-xl">
              Real-time monitoring of campus-wide student attendance trajectories, department staffing ratios, and bursar
              revenue realization.
            </p>
          </div>

          <button
            onClick={() => alert('Analytics Executive Summary CSV report downloaded!')}
            className="px-4 py-2.5 rounded-xl bg-blue-600 hover:bg-blue-700 text-white font-semibold text-xs shadow-md shadow-blue-500/25 transition-all flex items-center space-x-2"
          >
            <Download className="w-4 h-4" />
            <span>Export Analytics Report</span>
          </button>
        </div>
      </div>

      {/* Chart 1: Attendance Trends Line Chart */}
      <div className="p-6 rounded-3xl glass-card border border-slate-200 dark:border-slate-800">
        <div className="flex items-center justify-between mb-4">
          <div>
            <h3 className="text-base font-bold text-slate-900 dark:text-white flex items-center space-x-2">
              <TrendingUp className="w-4 h-4 text-blue-500" />
              <span>Campus-Wide Attendance Trajectory (%)</span>
            </h3>
            <p className="text-xs text-slate-500 dark:text-slate-400">
              Aggregated monthly attendance compared against mandatory 75% regulatory line
            </p>
          </div>
          <span className="text-xs font-bold text-emerald-600 dark:text-emerald-400">+2.1% Year-over-Year</span>
        </div>

        <div className="h-72 w-full">
          <ResponsiveContainer width="100%" height="100%">
            <LineChart data={attendanceTrends} margin={{ top: 10, right: 20, left: -10, bottom: 0 }}>
              <CartesianGrid strokeDasharray="3 3" opacity={0.15} />
              <XAxis dataKey="month" tick={{ fontSize: 11 }} />
              <YAxis domain={[60, 100]} tick={{ fontSize: 11 }} />
              <Tooltip
                contentStyle={{
                  backgroundColor: 'rgba(15, 23, 42, 0.95)',
                  borderRadius: '12px',
                  border: 'none',
                  color: '#fff',
                  fontSize: '12px',
                }}
              />
              <Legend wrapperStyle={{ fontSize: '11px', paddingTop: '10px' }} />
              <Line type="monotone" dataKey="rate" name="Average Campus Attendance (%)" stroke="#3b82f6" strokeWidth={3} dot={{ r: 4 }} activeDot={{ r: 7 }} />
              <Line type="monotone" dataKey="target" name="Minimum Regulatory Threshold (75%)" stroke="#f43f5e" strokeWidth={2} strokeDasharray="5 5" />
            </LineChart>
          </ResponsiveContainer>
        </div>
      </div>

      {/* Bottom Grid: Department Breakdown (Bar Chart) & Fee Revenue (Pie Chart) */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Department Enrollment Bar Chart */}
        <div className="p-6 rounded-3xl glass-card border border-slate-200 dark:border-slate-800">
          <div className="flex items-center justify-between mb-4">
            <div>
              <h3 className="text-base font-bold text-slate-900 dark:text-white">Department Staffing & Students</h3>
              <p className="text-xs text-slate-500 dark:text-slate-400">Student enrollment compared with faculty allocation</p>
            </div>
            <span className="text-xs font-semibold text-slate-400">4 Colleges</span>
          </div>

          <div className="h-64 w-full">
            <ResponsiveContainer width="100%" height="100%">
              <BarChart data={departmentStats} margin={{ top: 10, right: 10, left: -10, bottom: 0 }}>
                <CartesianGrid strokeDasharray="3 3" opacity={0.15} />
                <XAxis dataKey="name" tick={{ fontSize: 10 }} />
                <YAxis tick={{ fontSize: 11 }} />
                <Tooltip
                  contentStyle={{
                    backgroundColor: 'rgba(15, 23, 42, 0.95)',
                    borderRadius: '12px',
                    border: 'none',
                    color: '#fff',
                    fontSize: '12px',
                  }}
                />
                <Legend wrapperStyle={{ fontSize: '11px', paddingTop: '10px' }} />
                <Bar dataKey="students" name="Students Enrolled" fill="#3b82f6" radius={[6, 6, 0, 0]} />
                <Bar dataKey="faculty" name="Faculty Members" fill="#8b5cf6" radius={[6, 6, 0, 0]} />
              </BarChart>
            </ResponsiveContainer>
          </div>
        </div>

        {/* Fee Revenue Distribution Donut / Pie Chart */}
        <div className="p-6 rounded-3xl glass-card border border-slate-200 dark:border-slate-800">
          <div className="flex items-center justify-between mb-4">
            <div>
              <h3 className="text-base font-bold text-slate-900 dark:text-white">Fee Revenue Distribution</h3>
              <p className="text-xs text-slate-500 dark:text-slate-400">Total $3.42M collected by financial category</p>
            </div>
            <span className="text-xs font-bold text-emerald-600 dark:text-emerald-400">96.8% Realized</span>
          </div>

          <div className="h-64 w-full flex items-center justify-center">
            <ResponsiveContainer width="100%" height="100%">
              <PieChart>
                <Pie
                  data={feeDistribution}
                  cx="50%"
                  cy="50%"
                  innerRadius={55}
                  outerRadius={85}
                  paddingAngle={4}
                  dataKey="value"
                >
                  {feeDistribution.map((entry, index) => (
                    <Cell key={`cell-${index}`} fill={entry.color} />
                  ))}
                </Pie>
                <Tooltip
                  formatter={(value: any) => [`$${Number(value).toLocaleString()}`, 'Amount']}
                  contentStyle={{
                    backgroundColor: 'rgba(15, 23, 42, 0.95)',
                    borderRadius: '12px',
                    border: 'none',
                    color: '#fff',
                    fontSize: '12px',
                  }}
                />
                <Legend wrapperStyle={{ fontSize: '11px' }} />
              </PieChart>
            </ResponsiveContainer>
          </div>
        </div>
      </div>
    </div>
  );
};
