import React, { useState } from 'react';
import { FileText, Plus, Clock, CheckCircle2, Award, Users } from 'lucide-react';
import { useData } from '../../context/DataContext';

export const FacultyAssignments: React.FC = () => {
  const { assignments, subjects, createAssignment } = useData();
  const [showModal, setShowModal] = useState(false);
  const [title, setTitle] = useState('');
  const [subjectCode, setSubjectCode] = useState('CS501');
  const [dueDate, setDueDate] = useState('');
  const [totalPoints, setTotalPoints] = useState(100);
  const [description, setDescription] = useState('');
  const [success, setSuccess] = useState(false);

  const handleCreate = (e: React.FormEvent) => {
    e.preventDefault();
    if (!title || !dueDate || !description) return;

    createAssignment({
      title,
      subjectCode,
      subjectName: subjects.find(s => s.code === subjectCode)?.name || subjectCode,
      facultyName: 'Prof. Alexander Wright',
      dueDate,
      totalPoints,
      description,
    });

    setShowModal(false);
    setTitle('');
    setDescription('');
    setSuccess(true);
    setTimeout(() => setSuccess(false), 3500);
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="p-6 sm:p-8 rounded-3xl glass-card border border-slate-200 dark:border-slate-800">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
          <div>
            <div className="inline-flex items-center space-x-2 px-3 py-1 rounded-full bg-indigo-100 dark:bg-indigo-900/60 text-indigo-700 dark:text-indigo-300 text-xs font-semibold mb-2">
              <FileText className="w-3.5 h-3.5" />
              <span>Faculty Coursework & Lab Assignments</span>
            </div>
            <h2 className="text-2xl font-black text-slate-900 dark:text-white">Manage Assignments</h2>
            <p className="text-xs text-slate-500 dark:text-slate-400 mt-1">
              Create homework tasks, code challenges, and inspect student submission progress.
            </p>
          </div>

          <button
            onClick={() => setShowModal(true)}
            className="px-4 py-2.5 rounded-xl bg-blue-600 hover:bg-blue-700 text-white font-bold text-xs shadow-md shadow-blue-500/25 transition-all flex items-center space-x-2"
          >
            <Plus className="w-4 h-4" />
            <span>Create New Assignment</span>
          </button>
        </div>

        {success && (
          <div className="mt-4 p-3 rounded-xl bg-emerald-50 dark:bg-emerald-950/40 border border-emerald-200 dark:border-emerald-900 text-emerald-700 dark:text-emerald-300 text-xs flex items-center space-x-2">
            <CheckCircle2 className="w-4 h-4" />
            <span>Assignment created and published to enrolled students!</span>
          </div>
        )}
      </div>

      {/* Assignments List */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {assignments.map(asg => (
          <div
            key={asg.id}
            className="p-6 rounded-3xl glass-card border border-slate-200 dark:border-slate-800 flex flex-col justify-between"
          >
            <div>
              <div className="flex items-center justify-between mb-3">
                <span className="font-black text-xs px-2.5 py-1 rounded-full bg-blue-100 dark:bg-blue-900/60 text-blue-700 dark:text-blue-300">
                  {asg.subjectCode}
                </span>
                <span className="text-xs font-bold text-slate-500 flex items-center space-x-1">
                  <Clock className="w-3.5 h-3.5" />
                  <span>Due {asg.dueDate}</span>
                </span>
              </div>

              <h3 className="text-base font-bold text-slate-900 dark:text-white leading-tight">{asg.title}</h3>
              <p className="text-xs text-slate-600 dark:text-slate-300 mt-2 leading-relaxed">{asg.description}</p>
            </div>

            <div className="mt-5 pt-3 border-t border-slate-100 dark:border-slate-800 flex items-center justify-between text-xs">
              <span className="text-slate-400">Total: {asg.totalPoints} Points</span>
              <span className="font-semibold text-blue-600 dark:text-blue-400">
                {asg.status === 'GRADED' ? 'Evaluated & Graded' : 'Accepting Submissions'}
              </span>
            </div>
          </div>
        ))}
      </div>

      {/* Modal */}
      {showModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-900/60 backdrop-blur-sm animate-in fade-in">
          <div className="max-w-md w-full p-6 sm:p-8 rounded-3xl glass-card border border-slate-200 dark:border-slate-800 shadow-2xl">
            <h3 className="text-lg font-bold text-slate-900 dark:text-white">Create Course Assignment</h3>
            <p className="text-xs text-slate-500 dark:text-slate-400 mt-0.5">
              Publish task to enrolled student portals
            </p>

            <form onSubmit={handleCreate} className="mt-4 space-y-3.5">
              <div>
                <label className="block text-xs font-semibold text-slate-700 dark:text-slate-200 mb-1">Subject</label>
                <select
                  value={subjectCode}
                  onChange={e => setSubjectCode(e.target.value)}
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
                <label className="block text-xs font-semibold text-slate-700 dark:text-slate-200 mb-1">
                  Assignment Title
                </label>
                <input
                  type="text"
                  required
                  placeholder="e.g. Attention Mechanism Implementation"
                  value={title}
                  onChange={e => setTitle(e.target.value)}
                  className="w-full px-3 py-2 rounded-xl border border-slate-200 dark:border-slate-700 bg-white/70 dark:bg-slate-900 text-xs focus:ring-2 focus:ring-blue-500 outline-none"
                />
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="block text-xs font-semibold text-slate-700 dark:text-slate-200 mb-1">
                    Due Date
                  </label>
                  <input
                    type="date"
                    required
                    value={dueDate}
                    onChange={e => setDueDate(e.target.value)}
                    className="w-full px-3 py-2 rounded-xl border border-slate-200 dark:border-slate-700 bg-white/70 dark:bg-slate-900 text-xs focus:ring-2 focus:ring-blue-500 outline-none"
                  />
                </div>
                <div>
                  <label className="block text-xs font-semibold text-slate-700 dark:text-slate-200 mb-1">
                    Total Points
                  </label>
                  <input
                    type="number"
                    value={totalPoints}
                    onChange={e => setTotalPoints(Number(e.target.value))}
                    className="w-full px-3 py-2 rounded-xl border border-slate-200 dark:border-slate-700 bg-white/70 dark:bg-slate-900 text-xs focus:ring-2 focus:ring-blue-500 outline-none"
                  />
                </div>
              </div>

              <div>
                <label className="block text-xs font-semibold text-slate-700 dark:text-slate-200 mb-1">
                  Task Instructions & Rubric
                </label>
                <textarea
                  rows={4}
                  required
                  placeholder="Explain deliverable format, dataset requirements, and grading criteria..."
                  value={description}
                  onChange={e => setDescription(e.target.value)}
                  className="w-full px-3 py-2 rounded-xl border border-slate-200 dark:border-slate-700 bg-white/70 dark:bg-slate-900 text-xs focus:ring-2 focus:ring-blue-500 outline-none"
                />
              </div>

              <div className="flex gap-3 pt-2">
                <button
                  type="button"
                  onClick={() => setShowModal(false)}
                  className="flex-1 py-2.5 rounded-xl border border-slate-300 dark:border-slate-700 text-xs font-semibold hover:bg-slate-100 dark:hover:bg-slate-800"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="flex-1 py-2.5 rounded-xl bg-blue-600 hover:bg-blue-700 text-white text-xs font-semibold shadow-md shadow-blue-500/25"
                >
                  Publish Assignment
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};
