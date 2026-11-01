import React, { useState } from 'react';
import {
  CheckSquare,
  AlertTriangle,
  Download,
  Calendar,
  Filter,
  CheckCircle2,
  XCircle,
  Clock,
  Sparkles,
} from 'lucide-react';
import { useAuth } from '../../context/AuthContext';
import { useData } from '../../context/DataContext';

export const StudentAttendance: React.FC = () => {
  const { user } = useAuth();
  const { subjects, attendanceRecords } = useData();

  const [selectedSubject, setSelectedSubject] = useState<string>('ALL');
  const [downloadModal, setDownloadModal] = useState(false);

  const overallRate = user?.attendanceRate || 94.2;
  const isWarning = overallRate < 75;

  const filteredRecords =
    selectedSubject === 'ALL'
      ? attendanceRecords
      : attendanceRecords.filter(r => r.subjectCode === selectedSubject);

  const handleDownloadReport = () => {
    setDownloadModal(true);
  };

  return (
    <div className="space-y-6">
      {/* Attendance Header & Gauge Summary */}
      <div className="p-6 sm:p-8 rounded-3xl glass-card border border-slate-200 dark:border-slate-800">
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-6">
          <div>
            <div className="inline-flex items-center space-x-2 px-3 py-1 rounded-full bg-blue-100 dark:bg-blue-900/60 text-blue-700 dark:text-blue-300 text-xs font-semibold mb-2">
              <CheckSquare className="w-3.5 h-3.5" />
              <span>Smart Biometric & Session Attendance</span>
            </div>
            <h2 className="text-2xl font-black text-slate-900 dark:text-white">Attendance Analytics & Tracking</h2>
            <p className="text-xs text-slate-500 dark:text-slate-400 mt-1 max-w-xl">
              Real-time attendance calculated across lectures, laboratory practicals, and mandatory academic seminars.
              Eligible for end-semester examinations at &ge; 75%.
            </p>
          </div>

          <div className="flex items-center space-x-4">
            <div className="text-right">
              <p className="text-xs font-semibold text-slate-400 uppercase">Overall Attendance</p>
              <p className="text-3xl font-black text-slate-900 dark:text-white">{overallRate}%</p>
              <span
                className={`text-[11px] font-bold ${
                  isWarning ? 'text-rose-600' : 'text-emerald-600 dark:text-emerald-400'
                }`}
              >
                {isWarning ? 'Action Required (<75%)' : 'Exceeds University Threshold'}
              </span>
            </div>

            <button
              onClick={handleDownloadReport}
              className="px-4 py-2.5 rounded-xl bg-blue-600 hover:bg-blue-700 text-white font-semibold text-xs shadow-md shadow-blue-500/25 transition-all flex items-center space-x-1.5"
            >
              <Download className="w-4 h-4" />
              <span className="hidden sm:inline">Download Certificate</span>
            </button>
          </div>
        </div>

        {/* Warning Alert if < 75% */}
        {isWarning && (
          <div className="mt-5 p-3.5 rounded-2xl bg-rose-50 dark:bg-rose-950/40 border border-rose-200 dark:border-rose-900 text-rose-800 dark:text-rose-200 text-xs flex items-center space-x-3">
            <AlertTriangle className="w-5 h-5 text-rose-600 flex-shrink-0" />
            <span>
              <strong>Low Attendance Alert:</strong> Your cumulative attendance is {overallRate}%. As per Academic
              Regulation Rule 14.2, students with &lt;75% attendance without verified medical certificates cannot receive
              end-semester examination hall tickets.
            </span>
          </div>
        )}
      </div>

      {/* Subject-Wise Attendance Cards */}
      <div>
        <h3 className="text-sm font-bold uppercase tracking-wider text-slate-400 mb-3">Course Breakdown</h3>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
          {subjects.map(sub => {
            const isSubWarning = sub.percentage < 75;
            return (
              <div
                key={sub.id}
                className="p-5 rounded-2xl glass-card border border-slate-200 dark:border-slate-800 hover:shadow-lg transition-all"
              >
                <div className="flex items-center justify-between mb-2">
                  <span className="font-extrabold text-sm text-slate-900 dark:text-white">{sub.code}</span>
                  <span
                    className={`text-xs font-bold px-2 py-0.5 rounded-full ${
                      isSubWarning
                        ? 'bg-rose-100 text-rose-700 dark:bg-rose-950/60 dark:text-rose-300'
                        : 'bg-emerald-100 text-emerald-700 dark:bg-emerald-950/60 dark:text-emerald-300'
                    }`}
                  >
                    {sub.percentage}%
                  </span>
                </div>

                <p className="text-xs font-medium text-slate-700 dark:text-slate-300 truncate" title={sub.name}>
                  {sub.name}
                </p>
                <p className="text-[11px] text-slate-400 mt-1">{sub.facultyName}</p>

                <div className="mt-3 flex items-center justify-between text-[11px] text-slate-500 dark:text-slate-400">
                  <span>
                    Classes: <strong className="text-slate-800 dark:text-slate-100">{sub.attendedClasses}</strong> /{' '}
                    {sub.totalClasses}
                  </span>
                  <span>{sub.credits} Credits</span>
                </div>

                <div className="mt-2 w-full bg-slate-100 dark:bg-slate-800 h-2 rounded-full overflow-hidden">
                  <div
                    className={`h-full rounded-full transition-all duration-500 ${
                      isSubWarning ? 'bg-rose-500' : 'bg-blue-600'
                    }`}
                    style={{ width: `${sub.percentage}%` }}
                  />
                </div>
              </div>
            );
          })}
        </div>
      </div>

      {/* Date-Wise Detailed Attendance History Table */}
      <div className="p-6 rounded-3xl glass-card border border-slate-200 dark:border-slate-800">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 mb-4">
          <div>
            <h3 className="text-base font-bold text-slate-900 dark:text-white">Session History Log</h3>
            <p className="text-xs text-slate-500 dark:text-slate-400">Date-wise verified class attendance recordings</p>
          </div>

          <div className="flex items-center space-x-2">
            <Filter className="w-4 h-4 text-slate-400" />
            <select
              value={selectedSubject}
              onChange={e => setSelectedSubject(e.target.value)}
              className="px-3 py-1.5 rounded-xl border border-slate-200 dark:border-slate-700 bg-white/80 dark:bg-slate-900 text-xs font-medium text-slate-700 dark:text-slate-200 outline-none"
            >
              <option value="ALL">All Subjects</option>
              {subjects.map(s => (
                <option key={s.id} value={s.code}>
                  {s.code} - {s.name}
                </option>
              ))}
            </select>
          </div>
        </div>

        <div className="overflow-x-auto">
          <table className="w-full text-left text-xs">
            <thead className="bg-slate-100/70 dark:bg-slate-900/60 text-slate-500 dark:text-slate-400 uppercase text-[10px] font-bold">
              <tr>
                <th className="py-3 px-4 rounded-l-xl">Date & Time</th>
                <th className="py-3 px-4">Subject</th>
                <th className="py-3 px-4">Faculty</th>
                <th className="py-3 px-4">Status</th>
                <th className="py-3 px-4 rounded-r-xl">Verification</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100 dark:divide-slate-800">
              {filteredRecords.map(rec => (
                <tr key={rec.id} className="hover:bg-slate-50/50 dark:hover:bg-slate-800/40 transition-colors">
                  <td className="py-3.5 px-4">
                    <p className="font-bold text-slate-800 dark:text-slate-100">{rec.date}</p>
                    <p className="text-[10px] text-slate-400">{rec.timeSlot}</p>
                  </td>
                  <td className="py-3.5 px-4">
                    <span className="font-bold text-blue-600 dark:text-blue-400">{rec.subjectCode}</span>
                    <p className="text-slate-600 dark:text-slate-300 text-[11px] truncate">{rec.subjectName}</p>
                  </td>
                  <td className="py-3.5 px-4 text-slate-600 dark:text-slate-300">{rec.facultyName}</td>
                  <td className="py-3.5 px-4">
                    {rec.status === 'PRESENT' ? (
                      <span className="inline-flex items-center space-x-1 px-2.5 py-1 rounded-full bg-emerald-100 dark:bg-emerald-950/60 text-emerald-700 dark:text-emerald-300 text-[11px] font-bold">
                        <CheckCircle2 className="w-3 h-3" />
                        <span>Present</span>
                      </span>
                    ) : (
                      <span className="inline-flex items-center space-x-1 px-2.5 py-1 rounded-full bg-rose-100 dark:bg-rose-950/60 text-rose-700 dark:text-rose-300 text-[11px] font-bold">
                        <XCircle className="w-3 h-3" />
                        <span>Absent</span>
                      </span>
                    )}
                  </td>
                  <td className="py-3.5 px-4 text-slate-400 text-[11px]">RFID & Faculty Portal</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {/* Simulated Download Certificate Modal */}
      {downloadModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-900/60 backdrop-blur-sm animate-in fade-in">
          <div className="max-w-md w-full p-6 rounded-3xl glass-card border border-slate-200 dark:border-slate-800 shadow-2xl text-center">
            <div className="w-12 h-12 rounded-2xl bg-emerald-100 text-emerald-600 mx-auto flex items-center justify-center mb-4">
              <CheckCircle2 className="w-6 h-6" />
            </div>
            <h3 className="text-lg font-bold text-slate-900 dark:text-white">Official Attendance Clearance Ready</h3>
            <p className="text-xs text-slate-600 dark:text-slate-300 mt-2 leading-relaxed">
              Official verifiable certificate for <strong>{user?.fullName}</strong> (ID: {user?.studentId}) generated with
              cumulative <strong>{overallRate}%</strong> standing. Certified by Controller of Examinations.
            </p>
            <div className="mt-5 flex gap-3">
              <button
                onClick={() => setDownloadModal(false)}
                className="flex-1 py-2 rounded-xl border border-slate-300 dark:border-slate-700 text-xs font-semibold hover:bg-slate-100 dark:hover:bg-slate-800"
              >
                Close
              </button>
              <button
                onClick={() => {
                  alert('Attendance Certificate PDF downloaded to your device!');
                  setDownloadModal(false);
                }}
                className="flex-1 py-2 rounded-xl bg-blue-600 hover:bg-blue-700 text-white text-xs font-semibold shadow-md"
              >
                Save PDF
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
