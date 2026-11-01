import React, { useState } from 'react';
import { Award, Save, CheckCircle2, Search, Filter } from 'lucide-react';
import { useData } from '../../context/DataContext';

export const FacultyMarks: React.FC = () => {
  const { subjects, submitMarks } = useData();
  const [selectedSubject, setSelectedSubject] = useState('CS501');
  const [assessmentType, setAssessmentType] = useState('Continuous Assessment 2');
  const [maxMarks, setMaxMarks] = useState(50);
  const [successBanner, setSuccessBanner] = useState(false);

  const [studentScores, setStudentScores] = useState([
    { id: 'user-stu-1', name: 'Marcus Chen', rollNo: 'SU-2024-CS-042', obtained: 48.5 },
    { id: 'user-stu-2', name: 'Aisha Khan', rollNo: 'SU-2024-CS-043', obtained: 49.0 },
    { id: 'user-stu-3', name: 'Liam Ross', rollNo: 'SU-2024-EC-015', obtained: 42.0 },
    { id: 'user-stu-4', name: 'Devon Vance', rollNo: 'SU-2024-CS-088', obtained: 34.5 },
    { id: 'user-stu-5', name: 'Chloe Bennett', rollNo: 'SU-2024-CS-092', obtained: 44.0 },
  ]);

  const handleScoreChange = (id: string, val: number) => {
    setStudentScores(prev =>
      prev.map(s => (s.id === id ? { ...s, obtained: Math.min(Math.max(val, 0), maxMarks) } : s))
    );
  };

  const handleCommitMarks = (e: React.FormEvent) => {
    e.preventDefault();
    studentScores.forEach(s => {
      submitMarks({
        studentId: s.id,
        subjectCode: selectedSubject,
        assessment: assessmentType,
        maxMarks,
        obtainedMarks: s.obtained,
      });
    });

    setSuccessBanner(true);
    setTimeout(() => setSuccessBanner(false), 3500);
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="p-6 sm:p-8 rounded-3xl glass-card border border-slate-200 dark:border-slate-800">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
          <div>
            <div className="inline-flex items-center space-x-2 px-3 py-1 rounded-full bg-cyan-100 dark:bg-cyan-900/60 text-cyan-700 dark:text-cyan-300 text-xs font-semibold mb-2">
              <Award className="w-3.5 h-3.5" />
              <span>Academic Assessment Entry</span>
            </div>
            <h2 className="text-2xl font-black text-slate-900 dark:text-white">Enter Continuous Internal Marks</h2>
            <p className="text-xs text-slate-500 dark:text-slate-400 mt-1">
              Enter mid-term tests, laboratory assignments, and quiz scores for your enrolled cohort.
            </p>
          </div>

          <button
            onClick={handleCommitMarks}
            className="px-5 py-2.5 rounded-xl bg-blue-600 hover:bg-blue-700 text-white font-bold text-xs shadow-md shadow-blue-500/25 transition-all flex items-center space-x-2"
          >
            <Save className="w-4 h-4" />
            <span>Publish Marks to Transcripts</span>
          </button>
        </div>

        {successBanner && (
          <div className="mt-4 p-3 rounded-xl bg-emerald-50 dark:bg-emerald-950/40 border border-emerald-200 dark:border-emerald-900 text-emerald-700 dark:text-emerald-300 text-xs flex items-center space-x-2">
            <CheckCircle2 className="w-4 h-4" />
            <span>Internal marks recorded and published to student dashboards!</span>
          </div>
        )}
      </div>

      {/* Assessment Config */}
      <div className="p-5 rounded-3xl glass-card border border-slate-200 dark:border-slate-800 grid grid-cols-1 sm:grid-cols-3 gap-4">
        <div>
          <label className="block text-xs font-semibold text-slate-600 dark:text-slate-300 mb-1">Subject</label>
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
          <label className="block text-xs font-semibold text-slate-600 dark:text-slate-300 mb-1">Assessment Type</label>
          <select
            value={assessmentType}
            onChange={e => setAssessmentType(e.target.value)}
            className="w-full px-3 py-2 rounded-xl border border-slate-200 dark:border-slate-700 bg-white/70 dark:bg-slate-900 text-xs font-semibold focus:ring-2 focus:ring-blue-500 outline-none"
          >
            <option value="Continuous Assessment 1">Internal Test 1 (Theory)</option>
            <option value="Continuous Assessment 2">Internal Test 2 (Theory)</option>
            <option value="Lab Practical Exam">Lab Evaluation & Code Review</option>
            <option value="Quiz & Presentation">Quiz & Seminar Evaluation</option>
          </select>
        </div>

        <div>
          <label className="block text-xs font-semibold text-slate-600 dark:text-slate-300 mb-1">Maximum Score</label>
          <input
            type="number"
            value={maxMarks}
            onChange={e => setMaxMarks(Number(e.target.value))}
            className="w-full px-3 py-2 rounded-xl border border-slate-200 dark:border-slate-700 bg-white/70 dark:bg-slate-900 text-xs font-semibold focus:ring-2 focus:ring-blue-500 outline-none"
          />
        </div>
      </div>

      {/* Marks Entry Table */}
      <div className="p-6 rounded-3xl glass-card border border-slate-200 dark:border-slate-800">
        <h3 className="text-base font-bold text-slate-900 dark:text-white mb-4">Student Marks Scorecard</h3>

        <div className="overflow-x-auto">
          <table className="w-full text-left text-xs">
            <thead className="bg-slate-100/70 dark:bg-slate-900/60 text-slate-500 uppercase text-[10px] font-bold">
              <tr>
                <th className="py-3 px-4 rounded-l-xl">Student Name</th>
                <th className="py-3 px-4">Roll Number</th>
                <th className="py-3 px-4">Score (Max: {maxMarks})</th>
                <th className="py-3 px-4">Calculated Grade</th>
                <th className="py-3 px-4 rounded-r-xl">Performance Standing</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100 dark:divide-slate-800">
              {studentScores.map(s => {
                const ratio = s.obtained / maxMarks;
                const grade = ratio >= 0.9 ? 'O' : ratio >= 0.8 ? 'A+' : ratio >= 0.7 ? 'A' : ratio >= 0.6 ? 'B+' : 'B';
                return (
                  <tr key={s.id} className="hover:bg-slate-50/50 dark:hover:bg-slate-800/40">
                    <td className="py-3.5 px-4 font-bold text-slate-900 dark:text-white">{s.name}</td>
                    <td className="py-3.5 px-4 font-mono text-slate-500">{s.rollNo}</td>
                    <td className="py-3.5 px-4">
                      <input
                        type="number"
                        step="0.5"
                        min="0"
                        max={maxMarks}
                        value={s.obtained}
                        onChange={e => handleScoreChange(s.id, parseFloat(e.target.value) || 0)}
                        className="w-24 px-3 py-1.5 rounded-xl border border-slate-200 dark:border-slate-700 bg-white dark:bg-slate-900 font-bold text-sm focus:ring-2 focus:ring-blue-500 outline-none"
                      />
                    </td>
                    <td className="py-3.5 px-4">
                      <span className="px-2.5 py-1 rounded-full bg-blue-100 text-blue-700 dark:bg-blue-900/60 dark:text-blue-300 font-black text-xs">
                        {grade}
                      </span>
                    </td>
                    <td className="py-3.5 px-4 text-emerald-600 font-semibold">
                      {ratio >= 0.8 ? 'Distinction' : 'Standard Pass'}
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
