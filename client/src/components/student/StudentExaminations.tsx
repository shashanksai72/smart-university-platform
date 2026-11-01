import React, { useState } from 'react';
import { Clock, MapPin, Download, QrCode, AlertCircle, CheckCircle2, ShieldCheck, Printer } from 'lucide-react';
import { useAuth } from '../../context/AuthContext';
import { useData } from '../../context/DataContext';

export const StudentExaminations: React.FC = () => {
  const { user } = useAuth();
  const { examinations } = useData();
  const [showHallTicket, setShowHallTicket] = useState(false);

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="p-6 sm:p-8 rounded-3xl glass-card border border-slate-200 dark:border-slate-800">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
          <div>
            <div className="inline-flex items-center space-x-2 px-3 py-1 rounded-full bg-purple-100 dark:bg-purple-900/60 text-purple-700 dark:text-purple-300 text-xs font-semibold mb-2">
              <Clock className="w-3.5 h-3.5" />
              <span>Office of Controller of Examinations</span>
            </div>
            <h2 className="text-2xl font-black text-slate-900 dark:text-white">Examinations & Hall Ticket</h2>
            <p className="text-xs text-slate-500 dark:text-slate-400 mt-1">
              Official schedule, hall allocations, seat numbers, and downloadable digital examination permit.
            </p>
          </div>

          <button
            onClick={() => setShowHallTicket(true)}
            className="px-4 py-2.5 rounded-xl bg-gradient-to-r from-blue-600 to-indigo-600 hover:from-blue-700 hover:to-indigo-700 text-white font-semibold text-xs shadow-md shadow-blue-500/25 transition-all flex items-center space-x-2"
          >
            <QrCode className="w-4 h-4" />
            <span>Generate Hall Ticket</span>
          </button>
        </div>
      </div>

      {/* Examination Schedule Table */}
      <div className="p-6 rounded-3xl glass-card border border-slate-200 dark:border-slate-800">
        <h3 className="text-base font-bold text-slate-900 dark:text-white mb-1">Upcoming Exam Timetable</h3>
        <p className="text-xs text-slate-500 dark:text-slate-400 mb-4">Official Fall 2026 End-Semester Examinations</p>

        <div className="overflow-x-auto">
          <table className="w-full text-left text-xs">
            <thead className="bg-slate-100/70 dark:bg-slate-900/60 text-slate-500 dark:text-slate-400 uppercase text-[10px] font-bold">
              <tr>
                <th className="py-3 px-4 rounded-l-xl">Subject</th>
                <th className="py-3 px-4">Exam Type</th>
                <th className="py-3 px-4">Date & Time</th>
                <th className="py-3 px-4">Hall & Seat</th>
                <th className="py-3 px-4 rounded-r-xl">Clearance</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100 dark:divide-slate-800">
              {examinations.map(exam => (
                <tr key={exam.id} className="hover:bg-slate-50/50 dark:hover:bg-slate-800/40 transition-colors">
                  <td className="py-3.5 px-4">
                    <span className="font-extrabold text-blue-600 dark:text-blue-400">{exam.subjectCode}</span>
                    <p className="font-semibold text-slate-900 dark:text-white text-xs">{exam.subjectName}</p>
                  </td>
                  <td className="py-3.5 px-4 text-slate-600 dark:text-slate-300 font-medium">{exam.examType}</td>
                  <td className="py-3.5 px-4">
                    <p className="font-bold text-slate-800 dark:text-slate-100">{exam.date}</p>
                    <p className="text-[10px] text-slate-400 font-mono">{exam.time}</p>
                  </td>
                  <td className="py-3.5 px-4">
                    <span className="font-semibold text-slate-800 dark:text-slate-100">{exam.hall}</span>
                    <p className="text-[11px] text-indigo-600 dark:text-indigo-400 font-bold">Seat: {exam.seatNo}</p>
                  </td>
                  <td className="py-3.5 px-4">
                    <span className="inline-flex items-center space-x-1 px-2.5 py-0.5 rounded-full bg-emerald-100 dark:bg-emerald-950/60 text-emerald-700 dark:text-emerald-300 text-[10px] font-bold">
                      <CheckCircle2 className="w-3 h-3" />
                      <span>Verified Active</span>
                    </span>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {/* Examination Regulations */}
      <div className="p-6 rounded-3xl glass-card border border-slate-200 dark:border-slate-800">
        <h3 className="text-base font-bold text-slate-900 dark:text-white mb-3">Campus Examination Rules & Guidelines</h3>
        <ul className="space-y-2 text-xs text-slate-600 dark:text-slate-300 list-disc list-inside">
          <li>Digital or printed Hall Ticket with institutional ID card is mandatory for entry.</li>
          <li>Candidates must report to their assigned Examination Complex at least 20 minutes before start time.</li>
          <li>Electronic devices including smartphones and smartwatches are strictly prohibited in the exam hall.</li>
          <li>Minimum 75% verified attendance is required to sit for the end-semester examinations.</li>
        </ul>
      </div>

      {/* Digital Hall Ticket Modal */}
      {showHallTicket && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-900/60 backdrop-blur-sm animate-in fade-in">
          <div className="max-w-xl w-full p-6 sm:p-8 rounded-3xl glass-card border-2 border-blue-500/40 shadow-2xl relative">
            <div className="flex items-center justify-between pb-4 border-b border-slate-200 dark:border-slate-800">
              <div className="flex items-center space-x-3">
                <div className="w-10 h-10 rounded-xl bg-blue-600 text-white flex items-center justify-center font-black">
                  SU
                </div>
                <div>
                  <h4 className="font-extrabold text-sm text-slate-900 dark:text-white">SMART UNIVERSITY</h4>
                  <p className="text-[10px] text-slate-400">Official Fall 2026 Examination Hall Ticket</p>
                </div>
              </div>
              <span className="px-2.5 py-1 rounded-full bg-emerald-100 text-emerald-700 text-xs font-bold">
                ELIGIBLE
              </span>
            </div>

            <div className="mt-4 flex items-center gap-4 p-4 rounded-2xl bg-slate-100/70 dark:bg-slate-900/50">
              <img
                src={user?.avatarUrl || 'https://images.unsplash.com/photo-1539571696357-5a69c17a67c6?auto=format&fit=crop&q=80&w=256'}
                alt="Student"
                className="w-16 h-16 rounded-2xl object-cover ring-2 ring-blue-500/40"
              />
              <div className="text-xs">
                <p className="font-black text-slate-900 dark:text-white text-sm">{user?.fullName}</p>
                <p className="text-slate-500 font-mono">Roll: {user?.studentId || 'SU-2024-CS-042'}</p>
                <p className="text-blue-600 font-semibold">{user?.course || 'B.Tech Computer Science & AI'}</p>
              </div>

              {/* Simulated QR Code */}
              <div className="ml-auto p-2 bg-white rounded-xl shadow-sm text-slate-900 flex flex-col items-center">
                <QrCode className="w-12 h-12" />
                <span className="text-[9px] font-mono mt-0.5">VERIFIED</span>
              </div>
            </div>

            {/* List of enrolled examination subjects */}
            <div className="mt-4 space-y-2 text-xs">
              <p className="font-bold text-slate-700 dark:text-slate-300">Authorized Exam Papers:</p>
              {examinations.map(e => (
                <div key={e.id} className="flex justify-between p-2 rounded-xl bg-slate-50 dark:bg-slate-800/40 text-[11px]">
                  <span>
                    <strong className="text-blue-600">{e.subjectCode}</strong>: {e.subjectName}
                  </span>
                  <span className="font-semibold text-slate-500">{e.date} (Seat: {e.seatNo})</span>
                </div>
              ))}
            </div>

            <div className="mt-6 flex gap-3">
              <button
                onClick={() => setShowHallTicket(false)}
                className="flex-1 py-2.5 rounded-xl border border-slate-300 dark:border-slate-700 text-xs font-semibold hover:bg-slate-100 dark:hover:bg-slate-800"
              >
                Close
              </button>
              <button
                onClick={() => {
                  window.print();
                }}
                className="flex-1 py-2.5 rounded-xl bg-blue-600 hover:bg-blue-700 text-white text-xs font-semibold shadow-md flex items-center justify-center space-x-1.5"
              >
                <Printer className="w-4 h-4" />
                <span>Print Hall Ticket</span>
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
