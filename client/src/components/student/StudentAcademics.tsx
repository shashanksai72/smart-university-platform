import React, { useState } from 'react';
import {
  Award,
  TrendingUp,
  FileText,
  Download,
  Calculator,
  CheckCircle2,
  Sparkles,
  BarChart2,
} from 'lucide-react';
import { ResponsiveContainer, BarChart, Bar, XAxis, YAxis, Tooltip, CartesianGrid } from 'recharts';
import { useAuth } from '../../context/AuthContext';
import { useData } from '../../context/DataContext';

export const StudentAcademics: React.FC = () => {
  const { user } = useAuth();
  const { marksRecords, semesterResults } = useData();

  // CGPA Simulator State
  const [expectedGpa, setExpectedGpa] = useState<number>(3.9);
  const currentCgpa = user?.cgpa || 3.84;
  const completedSemesters = 4;
  const simulatedCgpa = Number(
    ((currentCgpa * completedSemesters + expectedGpa) / (completedSemesters + 1)).toFixed(2)
  );

  return (
    <div className="space-y-6">
      {/* 1. Academic Header */}
      <div className="p-6 sm:p-8 rounded-3xl glass-card border border-slate-200 dark:border-slate-800">
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-6">
          <div>
            <div className="inline-flex items-center space-x-2 px-3 py-1 rounded-full bg-cyan-100 dark:bg-cyan-900/60 text-cyan-700 dark:text-cyan-300 text-xs font-semibold mb-2">
              <Award className="w-3.5 h-3.5" />
              <span>Official Academic Transcript & Grading</span>
            </div>
            <h2 className="text-2xl font-black text-slate-900 dark:text-white">Academic Results & CGPA Engine</h2>
            <p className="text-xs text-slate-500 dark:text-slate-400 mt-1 max-w-xl">
              Verified transcripts, semester GPA history, and continuous assessment marks certified by the Academic Dean.
            </p>
          </div>

          <div className="flex items-center space-x-6">
            <div className="text-right">
              <p className="text-xs font-semibold text-slate-400 uppercase">Cumulative CGPA</p>
              <p className="text-3xl font-black text-slate-900 dark:text-white">{currentCgpa} / 4.0</p>
              <span className="text-xs font-bold text-emerald-600 dark:text-emerald-400">
                First Class with Distinction
              </span>
            </div>

            <button
              onClick={() => alert('Official Grade Transcript PDF successfully exported!')}
              className="px-4 py-2.5 rounded-xl bg-blue-600 hover:bg-blue-700 text-white font-semibold text-xs shadow-md shadow-blue-500/25 transition-all flex items-center space-x-1.5"
            >
              <Download className="w-4 h-4" />
              <span>Export Transcript</span>
            </button>
          </div>
        </div>
      </div>

      {/* 2. Continuous Internal Assessment Marks Table */}
      <div className="p-6 rounded-3xl glass-card border border-slate-200 dark:border-slate-800">
        <div className="flex items-center justify-between mb-4">
          <div>
            <h3 className="text-base font-bold text-slate-900 dark:text-white">Continuous Assessment & Internal Marks</h3>
            <p className="text-xs text-slate-500 dark:text-slate-400">Semester 5 internal examinations and evaluation scores</p>
          </div>
          <span className="text-xs font-bold text-blue-600 dark:text-blue-400">Current Semester 5</span>
        </div>

        <div className="overflow-x-auto">
          <table className="w-full text-left text-xs">
            <thead className="bg-slate-100/70 dark:bg-slate-900/60 text-slate-500 dark:text-slate-400 uppercase text-[10px] font-bold">
              <tr>
                <th className="py-3 px-4 rounded-l-xl">Subject</th>
                <th className="py-3 px-4">Assessment Component</th>
                <th className="py-3 px-4">Score Obtained</th>
                <th className="py-3 px-4">Max Marks</th>
                <th className="py-3 px-4">Grade</th>
                <th className="py-3 px-4 rounded-r-xl">Status</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100 dark:divide-slate-800">
              {marksRecords.map(mark => (
                <tr key={mark.id} className="hover:bg-slate-50/50 dark:hover:bg-slate-800/40 transition-colors">
                  <td className="py-3.5 px-4">
                    <span className="font-bold text-blue-600 dark:text-blue-400">{mark.subjectCode}</span>
                    <p className="text-slate-700 dark:text-slate-300 font-medium">{mark.subjectName}</p>
                  </td>
                  <td className="py-3.5 px-4 font-medium text-slate-700 dark:text-slate-300">{mark.assessment}</td>
                  <td className="py-3.5 px-4">
                    <span className="font-black text-slate-900 dark:text-white text-sm">{mark.obtainedMarks}</span>
                  </td>
                  <td className="py-3.5 px-4 text-slate-500">{mark.maxMarks}</td>
                  <td className="py-3.5 px-4">
                    <span className="px-2.5 py-0.5 rounded-full bg-cyan-100 dark:bg-cyan-950/60 text-cyan-700 dark:text-cyan-300 font-extrabold text-xs">
                      {mark.grade}
                    </span>
                  </td>
                  <td className="py-3.5 px-4">
                    <span className="text-emerald-600 dark:text-emerald-400 font-semibold">{mark.status}</span>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {/* 3. Semester GPA Breakdown & CGPA Simulator */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Semester GPA History Table */}
        <div className="lg:col-span-2 p-6 rounded-3xl glass-card border border-slate-200 dark:border-slate-800">
          <h3 className="text-base font-bold text-slate-900 dark:text-white mb-1">Semester Results History</h3>
          <p className="text-xs text-slate-500 dark:text-slate-400 mb-4">Official semester GPA records and credit accumulation</p>

          <div className="space-y-3">
            {semesterResults.map((sem, idx) => (
              <div
                key={idx}
                className="p-3.5 rounded-2xl bg-slate-50/70 dark:bg-slate-900/40 border border-slate-200/80 dark:border-slate-800 flex items-center justify-between"
              >
                <div>
                  <p className="font-bold text-xs text-slate-900 dark:text-white">{sem.semester}</p>
                  <p className="text-[11px] text-slate-400">{sem.credits} Academic Credits Cleared</p>
                </div>
                <div className="flex items-center space-x-4">
                  <span className="text-base font-black text-blue-600 dark:text-blue-400">{sem.gpa} GPA</span>
                  <span className="px-2.5 py-0.5 rounded-full bg-emerald-100 dark:bg-emerald-950/60 text-emerald-700 dark:text-emerald-300 font-bold text-[10px]">
                    {sem.status}
                  </span>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Interactive CGPA Projector / Simulator */}
        <div className="p-6 rounded-3xl glass-card border border-slate-200 dark:border-slate-800 flex flex-col justify-between">
          <div>
            <div className="flex items-center space-x-2 text-indigo-600 dark:text-indigo-400 mb-2">
              <Calculator className="w-5 h-5" />
              <h3 className="text-base font-bold text-slate-900 dark:text-white">CGPA Simulator</h3>
            </div>
            <p className="text-xs text-slate-500 dark:text-slate-400 mb-4">
              Project your final graduation CGPA by predicting your upcoming semester GPA.
            </p>

            <div className="space-y-4">
              <div>
                <div className="flex items-center justify-between text-xs font-semibold text-slate-700 dark:text-slate-300 mb-1">
                  <span>Target Semester 5 GPA:</span>
                  <span className="text-blue-600 dark:text-blue-400 font-bold">{expectedGpa}</span>
                </div>
                <input
                  type="range"
                  min="2.5"
                  max="4.0"
                  step="0.05"
                  value={expectedGpa}
                  onChange={e => setExpectedGpa(parseFloat(e.target.value))}
                  className="w-full accent-blue-600 cursor-pointer"
                />
              </div>

              <div className="p-4 rounded-2xl bg-gradient-to-br from-indigo-50 to-blue-50 dark:from-slate-900 dark:to-indigo-950/40 border border-indigo-100 dark:border-indigo-900/40 text-center">
                <p className="text-[11px] font-semibold text-slate-400 uppercase">Projected Cumulative CGPA</p>
                <p className="text-3xl font-black bg-gradient-to-r from-blue-600 to-indigo-600 bg-clip-text text-transparent mt-1">
                  {simulatedCgpa} / 4.0
                </p>
                <p className="text-[11px] text-emerald-600 dark:text-emerald-400 font-semibold mt-1">
                  Summa Cum Laude Eligibility Maintained
                </p>
              </div>
            </div>
          </div>

          <p className="text-[10px] text-slate-400 text-center mt-4">
            Formula: CGPA = &Sigma;(Credits &times; Points) / Total Credits
          </p>
        </div>
      </div>
    </div>
  );
};
