import React, { useState } from 'react';
import { FileText, Clock, Upload, CheckCircle2, AlertCircle, ArrowUpRight, Award, MessageSquare } from 'lucide-react';
import { useData } from '../../context/DataContext';
import { Assignment } from '../../types';

export const StudentAssignments: React.FC = () => {
  const { assignments, submitAssignment } = useData();
  const [selectedAsg, setSelectedAsg] = useState<Assignment | null>(null);
  const [submissionText, setSubmissionText] = useState('');
  const [submittedModal, setSubmittedModal] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!selectedAsg) return;

    submitAssignment(selectedAsg.id, submissionText || 'https://github.com/student/assignment-submission');
    setSubmittedModal(true);
    setSelectedAsg(null);
    setSubmissionText('');
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="p-6 sm:p-8 rounded-3xl glass-card border border-slate-200 dark:border-slate-800">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
          <div>
            <div className="inline-flex items-center space-x-2 px-3 py-1 rounded-full bg-indigo-100 dark:bg-indigo-900/60 text-indigo-700 dark:text-indigo-300 text-xs font-semibold mb-2">
              <FileText className="w-3.5 h-3.5" />
              <span>Continuous Assessment & Lab Practicals</span>
            </div>
            <h2 className="text-2xl font-black text-slate-900 dark:text-white">Assignments & Coursework</h2>
            <p className="text-xs text-slate-500 dark:text-slate-400 mt-1">
              Submit coursework solutions, view automated evaluation scores, and read instructor feedback.
            </p>
          </div>

          <div className="flex items-center space-x-3">
            <span className="text-xs font-bold text-slate-600 dark:text-slate-300">
              {assignments.filter(a => a.status === 'PENDING').length} Action Items Due
            </span>
          </div>
        </div>
      </div>

      {/* Assignment Cards List */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {assignments.map(asg => {
          const isPending = asg.status === 'PENDING';
          const isGraded = asg.status === 'GRADED';

          return (
            <div
              key={asg.id}
              className={`p-6 rounded-3xl glass-card border transition-all flex flex-col justify-between ${
                isPending
                  ? 'border-indigo-500/40 hover:shadow-xl'
                  : 'border-slate-200/80 dark:border-slate-800'
              }`}
            >
              <div>
                <div className="flex items-center justify-between mb-3">
                  <span className="font-extrabold text-xs px-2.5 py-1 rounded-full bg-blue-100 dark:bg-blue-900/60 text-blue-700 dark:text-blue-300">
                    {asg.subjectCode}
                  </span>

                  {isPending && (
                    <span className="inline-flex items-center space-x-1 text-xs font-bold text-amber-600 dark:text-amber-400 bg-amber-50 dark:bg-amber-950/60 px-2.5 py-0.5 rounded-full">
                      <Clock className="w-3 h-3" />
                      <span>Due {asg.dueDate}</span>
                    </span>
                  )}

                  {asg.status === 'SUBMITTED' && (
                    <span className="inline-flex items-center space-x-1 text-xs font-bold text-blue-600 dark:text-blue-400 bg-blue-50 dark:bg-blue-950/60 px-2.5 py-0.5 rounded-full">
                      <CheckCircle2 className="w-3 h-3" />
                      <span>Submitted (In Review)</span>
                    </span>
                  )}

                  {isGraded && (
                    <span className="inline-flex items-center space-x-1 text-xs font-bold text-emerald-600 dark:text-emerald-400 bg-emerald-50 dark:bg-emerald-950/60 px-2.5 py-0.5 rounded-full">
                      <Award className="w-3 h-3" />
                      <span>{asg.marksAwarded} / {asg.totalPoints} pts</span>
                    </span>
                  )}
                </div>

                <h3 className="text-base font-bold text-slate-900 dark:text-white leading-tight">{asg.title}</h3>
                <p className="text-xs text-slate-500 dark:text-slate-400 mt-1">Instructor: {asg.facultyName}</p>

                <p className="text-xs text-slate-600 dark:text-slate-300 mt-3 leading-relaxed">
                  {asg.description}
                </p>

                {asg.feedback && (
                  <div className="mt-3 p-3 rounded-2xl bg-slate-50 dark:bg-slate-900/60 border border-slate-200 dark:border-slate-800 text-xs">
                    <div className="flex items-center space-x-1.5 text-blue-600 dark:text-blue-400 font-semibold mb-1">
                      <MessageSquare className="w-3.5 h-3.5" />
                      <span>Instructor Feedback</span>
                    </div>
                    <p className="text-slate-600 dark:text-slate-300 italic">"{asg.feedback}"</p>
                  </div>
                )}
              </div>

              <div className="mt-5 pt-4 border-t border-slate-100 dark:border-slate-800 flex items-center justify-between">
                <span className="text-xs font-semibold text-slate-400">Total Points: {asg.totalPoints}</span>

                {isPending ? (
                  <button
                    onClick={() => setSelectedAsg(asg)}
                    className="px-4 py-2 rounded-xl bg-blue-600 hover:bg-blue-700 text-white font-semibold text-xs shadow-md shadow-blue-500/25 transition-all flex items-center space-x-1.5"
                  >
                    <Upload className="w-3.5 h-3.5" />
                    <span>Submit Work</span>
                  </button>
                ) : (
                  <span className="text-xs font-semibold text-slate-500 flex items-center space-x-1">
                    <CheckCircle2 className="w-3.5 h-3.5 text-emerald-500" />
                    <span>Completed</span>
                  </span>
                )}
              </div>
            </div>
          );
        })}
      </div>

      {/* Submit Assignment Modal */}
      {selectedAsg && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-900/60 backdrop-blur-sm animate-in fade-in">
          <div className="max-w-lg w-full p-6 sm:p-8 rounded-3xl glass-card border border-slate-200 dark:border-slate-800 shadow-2xl">
            <h3 className="text-lg font-bold text-slate-900 dark:text-white">Submit Assignment</h3>
            <p className="text-xs text-blue-600 font-semibold mt-0.5">{selectedAsg.title}</p>
            <p className="text-xs text-slate-500 dark:text-slate-400 mt-2">{selectedAsg.description}</p>

            <form onSubmit={handleSubmit} className="mt-4 space-y-3.5">
              <div>
                <label className="block text-xs font-semibold text-slate-700 dark:text-slate-200 mb-1">
                  Submission Notes or Repository Link
                </label>
                <textarea
                  rows={4}
                  required
                  placeholder="Paste GitHub repository URL or write assignment write-up here..."
                  value={submissionText}
                  onChange={e => setSubmissionText(e.target.value)}
                  className="w-full px-3 py-2 rounded-xl border border-slate-200 dark:border-slate-700 bg-white/70 dark:bg-slate-900 text-xs focus:ring-2 focus:ring-blue-500 outline-none"
                />
              </div>

              <div className="p-4 rounded-2xl border-2 border-dashed border-slate-200 dark:border-slate-700 text-center">
                <Upload className="w-6 h-6 text-slate-400 mx-auto mb-1" />
                <p className="text-xs font-medium text-slate-700 dark:text-slate-200">
                  Simulated File Attachment (PDF, ZIP, IPYNB)
                </p>
                <p className="text-[10px] text-slate-400 mt-0.5">Drag files or click to simulate attachment</p>
              </div>

              <div className="flex gap-3 pt-2">
                <button
                  type="button"
                  onClick={() => setSelectedAsg(null)}
                  className="flex-1 py-2.5 rounded-xl border border-slate-300 dark:border-slate-700 text-xs font-semibold hover:bg-slate-100 dark:hover:bg-slate-800"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="flex-1 py-2.5 rounded-xl bg-blue-600 hover:bg-blue-700 text-white text-xs font-semibold shadow-md shadow-blue-500/25"
                >
                  Confirm Submission
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* Success Notification Modal */}
      {submittedModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-900/60 backdrop-blur-sm animate-in fade-in">
          <div className="max-w-sm w-full p-6 rounded-3xl glass-card border border-slate-200 dark:border-slate-800 shadow-2xl text-center">
            <div className="w-12 h-12 rounded-2xl bg-emerald-100 text-emerald-600 mx-auto flex items-center justify-center mb-3">
              <CheckCircle2 className="w-6 h-6" />
            </div>
            <h4 className="text-base font-bold text-slate-900 dark:text-white">Submission Logged!</h4>
            <p className="text-xs text-slate-600 dark:text-slate-300 mt-1">
              Your assignment submission has been registered and timestamped. Prof. Alexander Wright will review and assign
              marks.
            </p>
            <button
              onClick={() => setSubmittedModal(false)}
              className="mt-4 w-full py-2 rounded-xl bg-blue-600 text-white text-xs font-semibold shadow-md"
            >
              Done
            </button>
          </div>
        </div>
      )}
    </div>
  );
};
