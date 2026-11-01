import React, { useState } from 'react';
import { CheckSquare, CheckCircle2, XCircle, Clock, Save, User, Calendar } from 'lucide-react';
import { useData } from '../../context/DataContext';

interface StudentRosterItem {
  id: string;
  name: string;
  rollNo: string;
  status: 'PRESENT' | 'ABSENT' | 'LATE';
}

export const FacultyAttendance: React.FC = () => {
  const { subjects, recordAttendance } = useData();
  const [selectedSubject, setSelectedSubject] = useState<string>('CS501');
  const [selectedDate, setSelectedDate] = useState<string>(new Date().toISOString().split('T')[0]);
  const [timeSlot, setTimeSlot] = useState<string>('09:00 - 10:30 AM');
  const [savedBanner, setSavedBanner] = useState(false);

  // Student roster state for marking
  const [roster, setRoster] = useState<StudentRosterItem[]>([
    { id: 'user-stu-1', name: 'Marcus Chen', rollNo: 'SU-2024-CS-042', status: 'PRESENT' },
    { id: 'user-stu-2', name: 'Aisha Khan', rollNo: 'SU-2024-CS-043', status: 'PRESENT' },
    { id: 'user-stu-3', name: 'Liam Ross', rollNo: 'SU-2024-EC-015', status: 'PRESENT' },
    { id: 'user-stu-4', name: 'Devon Vance', rollNo: 'SU-2024-CS-088', status: 'ABSENT' },
    { id: 'user-stu-5', name: 'Chloe Bennett', rollNo: 'SU-2024-CS-092', status: 'PRESENT' },
    { id: 'user-stu-6', name: 'Siddharth Patel', rollNo: 'SU-2024-CS-104', status: 'PRESENT' },
  ]);

  const toggleStatus = (id: string, newStatus: 'PRESENT' | 'ABSENT' | 'LATE') => {
    setRoster(prev => prev.map(s => (s.id === id ? { ...s, status: newStatus } : s)));
  };

  const handleMarkAll = (status: 'PRESENT' | 'ABSENT') => {
    setRoster(prev => prev.map(s => ({ ...s, status })));
  };

  const handleSaveAttendance = () => {
    // Record into shared state
    roster.forEach(student => {
      recordAttendance({
        studentId: student.id,
        studentName: student.name,
        rollNo: student.rollNo,
        subjectCode: selectedSubject,
        status: student.status,
        timeSlot,
      });
    });

    setSavedBanner(true);
    setTimeout(() => setSavedBanner(false), 3500);
  };

  const presentCount = roster.filter(r => r.status === 'PRESENT').length;
  const absentCount = roster.filter(r => r.status === 'ABSENT').length;
  const sessionPercentage = Math.round((presentCount / roster.length) * 100);

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="p-6 sm:p-8 rounded-3xl glass-card border border-slate-200 dark:border-slate-800">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
          <div>
            <div className="inline-flex items-center space-x-2 px-3 py-1 rounded-full bg-amber-100 dark:bg-amber-900/60 text-amber-700 dark:text-amber-300 text-xs font-semibold mb-2">
              <CheckSquare className="w-3.5 h-3.5" />
              <span>Interactive Session Attendance Marker</span>
            </div>
            <h2 className="text-2xl font-black text-slate-900 dark:text-white">Record & Update Class Attendance</h2>
            <p className="text-xs text-slate-500 dark:text-slate-400 mt-1">
              Select course, lecture session, and mark students present or absent. Automatically synchronized with student portals.
            </p>
          </div>

          <div className="flex items-center space-x-3">
            <button
              onClick={handleSaveAttendance}
              className="px-5 py-2.5 rounded-xl bg-blue-600 hover:bg-blue-700 text-white font-bold text-xs shadow-md shadow-blue-500/25 transition-all flex items-center space-x-2"
            >
              <Save className="w-4 h-4" />
              <span>Save & Publish Attendance</span>
            </button>
          </div>
        </div>

        {savedBanner && (
          <div className="mt-4 p-3 rounded-xl bg-emerald-50 dark:bg-emerald-950/40 border border-emerald-200 dark:border-emerald-900 text-emerald-700 dark:text-emerald-300 text-xs flex items-center space-x-2">
            <CheckCircle2 className="w-4 h-4" />
            <span>Attendance records committed to database! Session rate: {sessionPercentage}%</span>
          </div>
        )}
      </div>

      {/* Session Controls Bar */}
      <div className="p-5 rounded-3xl glass-card border border-slate-200 dark:border-slate-800 grid grid-cols-1 sm:grid-cols-3 gap-4">
        <div>
          <label className="block text-xs font-semibold text-slate-600 dark:text-slate-300 mb-1">Select Subject</label>
          <select
            value={selectedSubject}
            onChange={e => setSelectedSubject(e.target.value)}
            className="w-full px-3 py-2 rounded-xl border border-slate-200 dark:border-slate-700 bg-white/70 dark:bg-slate-900 text-xs font-semibold focus:ring-2 focus:ring-blue-500 outline-none"
          >
            {subjects.map(s => (
              <option key={s.id} value={s.code}>
                {s.code} - {s.name}
              </option>
            ))}
          </select>
        </div>

        <div>
          <label className="block text-xs font-semibold text-slate-600 dark:text-slate-300 mb-1">Session Date</label>
          <input
            type="date"
            value={selectedDate}
            onChange={e => setSelectedDate(e.target.value)}
            className="w-full px-3 py-2 rounded-xl border border-slate-200 dark:border-slate-700 bg-white/70 dark:bg-slate-900 text-xs font-semibold focus:ring-2 focus:ring-blue-500 outline-none"
          />
        </div>

        <div>
          <label className="block text-xs font-semibold text-slate-600 dark:text-slate-300 mb-1">Session Slot</label>
          <select
            value={timeSlot}
            onChange={e => setTimeSlot(e.target.value)}
            className="w-full px-3 py-2 rounded-xl border border-slate-200 dark:border-slate-700 bg-white/70 dark:bg-slate-900 text-xs font-semibold focus:ring-2 focus:ring-blue-500 outline-none"
          >
            <option value="09:00 - 10:30 AM">09:00 - 10:30 AM (Morning Slot 1)</option>
            <option value="11:00 - 12:30 PM">11:00 - 12:30 PM (Morning Slot 2)</option>
            <option value="02:00 - 03:30 PM">02:00 - 03:30 PM (Afternoon Lab)</option>
          </select>
        </div>
      </div>

      {/* Roster & Quick Actions */}
      <div className="p-6 rounded-3xl glass-card border border-slate-200 dark:border-slate-800">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-4 border-b border-slate-100 dark:border-slate-800">
          <div>
            <h3 className="text-base font-bold text-slate-900 dark:text-white">Class Roster</h3>
            <p className="text-xs text-slate-500">
              {presentCount} Present • {absentCount} Absent • {sessionPercentage}% Attendance Rate
            </p>
          </div>

          <div className="flex gap-2">
            <button
              onClick={() => handleMarkAll('PRESENT')}
              className="px-3 py-1.5 rounded-lg bg-emerald-50 text-emerald-700 border border-emerald-200 hover:bg-emerald-100 text-xs font-semibold transition-colors"
            >
              Mark All Present
            </button>
            <button
              onClick={() => handleMarkAll('ABSENT')}
              className="px-3 py-1.5 rounded-lg bg-rose-50 text-rose-700 border border-rose-200 hover:bg-rose-100 text-xs font-semibold transition-colors"
            >
              Mark All Absent
            </button>
          </div>
        </div>

        {/* Student Cards in Roster */}
        <div className="mt-4 divide-y divide-slate-100 dark:divide-slate-800">
          {roster.map(student => (
            <div key={student.id} className="py-3 flex items-center justify-between gap-4 text-xs">
              <div className="flex items-center space-x-3">
                <div className="w-8 h-8 rounded-full bg-slate-200 dark:bg-slate-800 flex items-center justify-center font-bold text-slate-600 dark:text-slate-300">
                  {student.name[0]}
                </div>
                <div>
                  <p className="font-bold text-slate-900 dark:text-white">{student.name}</p>
                  <p className="text-[11px] text-slate-400 font-mono">{student.rollNo}</p>
                </div>
              </div>

              {/* Status Action Buttons */}
              <div className="flex items-center space-x-2">
                <button
                  type="button"
                  onClick={() => toggleStatus(student.id, 'PRESENT')}
                  className={`px-3 py-1.5 rounded-xl font-bold transition-all ${
                    student.status === 'PRESENT'
                      ? 'bg-emerald-600 text-white shadow-sm'
                      : 'bg-slate-100 dark:bg-slate-800 text-slate-500 hover:text-emerald-600'
                  }`}
                >
                  Present
                </button>
                <button
                  type="button"
                  onClick={() => toggleStatus(student.id, 'ABSENT')}
                  className={`px-3 py-1.5 rounded-xl font-bold transition-all ${
                    student.status === 'ABSENT'
                      ? 'bg-rose-600 text-white shadow-sm'
                      : 'bg-slate-100 dark:bg-slate-800 text-slate-500 hover:text-rose-600'
                  }`}
                >
                  Absent
                </button>
                <button
                  type="button"
                  onClick={() => toggleStatus(student.id, 'LATE')}
                  className={`px-3 py-1.5 rounded-xl font-bold transition-all ${
                    student.status === 'LATE'
                      ? 'bg-amber-600 text-white shadow-sm'
                      : 'bg-slate-100 dark:bg-slate-800 text-slate-500 hover:text-amber-600'
                  }`}
                >
                  Late
                </button>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};
