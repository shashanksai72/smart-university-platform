import React, { useState } from 'react';
import { Users, Search, Filter, Mail, Award, CheckSquare, AlertTriangle } from 'lucide-react';

export const FacultyStudents: React.FC = () => {
  const [searchTerm, setSearchTerm] = useState('');

  const studentList = [
    {
      id: 's1',
      name: 'Marcus Chen',
      rollNo: 'SU-2024-CS-042',
      email: 'student@smartuni.edu',
      course: 'B.Tech CS & AI',
      semester: 5,
      cgpa: 3.84,
      attendance: 94.2,
      standing: 'Distinction',
    },
    {
      id: 's2',
      name: 'Aisha Khan',
      rollNo: 'SU-2024-CS-043',
      email: 'aisha@smartuni.edu',
      course: 'B.Tech CS & AI',
      semester: 5,
      cgpa: 3.92,
      attendance: 98.0,
      standing: 'Distinction',
    },
    {
      id: 's3',
      name: 'Liam Ross',
      rollNo: 'SU-2024-EC-015',
      email: 'liam@smartuni.edu',
      course: 'B.Tech Electronics',
      semester: 3,
      cgpa: 3.45,
      attendance: 88.5,
      standing: 'High Merit',
    },
    {
      id: 's4',
      name: 'Devon Vance',
      rollNo: 'SU-2024-CS-088',
      email: 'devon@smartuni.edu',
      course: 'B.Tech CS & AI',
      semester: 5,
      cgpa: 2.85,
      attendance: 68.5,
      standing: 'Attendance Attention Needed',
    },
    {
      id: 's5',
      name: 'Chloe Bennett',
      rollNo: 'SU-2024-CS-092',
      email: 'chloe@smartuni.edu',
      course: 'B.Tech CS & AI',
      semester: 5,
      cgpa: 3.55,
      attendance: 71.2,
      standing: 'Attendance Warning',
    },
  ];

  const filtered = studentList.filter(
    s =>
      s.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      s.rollNo.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="p-6 sm:p-8 rounded-3xl glass-card border border-slate-200 dark:border-slate-800">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
          <div>
            <div className="inline-flex items-center space-x-2 px-3 py-1 rounded-full bg-blue-100 dark:bg-blue-900/60 text-blue-700 dark:text-blue-300 text-xs font-semibold mb-2">
              <Users className="w-3.5 h-3.5" />
              <span>Student Cohort Directory</span>
            </div>
            <h2 className="text-2xl font-black text-slate-900 dark:text-white">Assigned Student Roster</h2>
            <p className="text-xs text-slate-500 dark:text-slate-400 mt-1">
              Directory of students enrolled in your active courses and lab sections.
            </p>
          </div>

          <div className="relative w-full sm:w-72">
            <Search className="w-4 h-4 text-slate-400 absolute left-3.5 top-1/2 -translate-y-1/2" />
            <input
              type="text"
              value={searchTerm}
              onChange={e => setSearchTerm(e.target.value)}
              placeholder="Search by name or roll number..."
              className="w-full pl-10 pr-3 py-2 rounded-xl border border-slate-200 dark:border-slate-700 bg-white/70 dark:bg-slate-900 text-xs focus:ring-2 focus:ring-blue-500 outline-none"
            />
          </div>
        </div>
      </div>

      {/* Student List Table */}
      <div className="p-6 rounded-3xl glass-card border border-slate-200 dark:border-slate-800">
        <div className="overflow-x-auto">
          <table className="w-full text-left text-xs">
            <thead className="bg-slate-100/70 dark:bg-slate-900/60 text-slate-500 uppercase text-[10px] font-bold">
              <tr>
                <th className="py-3 px-4 rounded-l-xl">Student Name</th>
                <th className="py-3 px-4">Institutional Roll No</th>
                <th className="py-3 px-4">Program & Sem</th>
                <th className="py-3 px-4">Attendance</th>
                <th className="py-3 px-4">Current CGPA</th>
                <th className="py-3 px-4 rounded-r-xl">Academic Status</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100 dark:divide-slate-800">
              {filtered.map(s => {
                const isLowAttendance = s.attendance < 75;
                return (
                  <tr key={s.id} className="hover:bg-slate-50/50 dark:hover:bg-slate-800/40 transition-colors">
                    <td className="py-3.5 px-4">
                      <p className="font-bold text-slate-900 dark:text-white text-xs">{s.name}</p>
                      <p className="text-[11px] text-slate-400">{s.email}</p>
                    </td>
                    <td className="py-3.5 px-4 font-mono font-semibold text-blue-600 dark:text-blue-400">{s.rollNo}</td>
                    <td className="py-3.5 px-4 text-slate-600 dark:text-slate-300">
                      {s.course} • Sem {s.semester}
                    </td>
                    <td className="py-3.5 px-4">
                      <span
                        className={`font-black text-xs ${
                          isLowAttendance ? 'text-rose-600' : 'text-emerald-600 dark:text-emerald-400'
                        }`}
                      >
                        {s.attendance}%
                      </span>
                    </td>
                    <td className="py-3.5 px-4 font-bold text-slate-800 dark:text-slate-100">{s.cgpa}</td>
                    <td className="py-3.5 px-4">
                      <span
                        className={`px-2.5 py-0.5 rounded-full text-[10px] font-bold ${
                          isLowAttendance
                            ? 'bg-rose-100 text-rose-700 dark:bg-rose-950/60 dark:text-rose-300'
                            : 'bg-emerald-100 text-emerald-700 dark:bg-emerald-950/60 dark:text-emerald-300'
                        }`}
                      >
                        {s.standing}
                      </span>
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};
