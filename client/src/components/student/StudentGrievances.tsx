import React, { useState } from 'react';
import { AlertCircle, Plus, Clock, CheckCircle2, MessageSquare, ArrowRight } from 'lucide-react';
import { useAuth } from '../../context/AuthContext';
import { useData } from '../../context/DataContext';
import { Grievance } from '../../types';

export const StudentGrievances: React.FC = () => {
  const { user } = useAuth();
  const { grievances, createGrievance } = useData();

  const [showCreateModal, setShowCreateModal] = useState(false);
  const [subject, setSubject] = useState('');
  const [category, setCategory] = useState<Grievance['category']>('ACADEMIC');
  const [priority, setPriority] = useState<Grievance['priority']>('MEDIUM');
  const [description, setDescription] = useState('');
  const [successMsg, setSuccessMsg] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!subject || !description) return;

    createGrievance({ subject, category, priority, description });
    setShowCreateModal(false);
    setSubject('');
    setDescription('');
    setSuccessMsg(true);
    setTimeout(() => setSuccessMsg(false), 3500);
  };

  const getStatusBadge = (status: Grievance['status']) => {
    switch (status) {
      case 'RESOLVED':
        return 'bg-emerald-100 text-emerald-700 dark:bg-emerald-950/60 dark:text-emerald-300 border-emerald-300';
      case 'IN_PROGRESS':
        return 'bg-blue-100 text-blue-700 dark:bg-blue-950/60 dark:text-blue-300 border-blue-300';
      case 'PENDING':
        return 'bg-amber-100 text-amber-700 dark:bg-amber-950/60 dark:text-amber-300 border-amber-300';
      default:
        return 'bg-slate-100 text-slate-700';
    }
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="p-6 sm:p-8 rounded-3xl glass-card border border-slate-200 dark:border-slate-800">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
          <div>
            <div className="inline-flex items-center space-x-2 px-3 py-1 rounded-full bg-rose-100 dark:bg-rose-900/60 text-rose-700 dark:text-rose-300 text-xs font-semibold mb-2">
              <AlertCircle className="w-3.5 h-3.5" />
              <span>University Grievance Redressal Cell</span>
            </div>
            <h2 className="text-2xl font-black text-slate-900 dark:text-white">Grievance & Issue Resolution</h2>
            <p className="text-xs text-slate-500 dark:text-slate-400 mt-1 max-w-xl">
              File institutional complaints, monitor administrative review stages, and receive verified official replies.
            </p>
          </div>

          <button
            onClick={() => setShowCreateModal(true)}
            className="px-4 py-2.5 rounded-xl bg-blue-600 hover:bg-blue-700 text-white font-semibold text-xs shadow-md shadow-blue-500/25 transition-all flex items-center space-x-2"
          >
            <Plus className="w-4 h-4" />
            <span>File New Grievance</span>
          </button>
        </div>

        {successMsg && (
          <div className="mt-4 p-3 rounded-xl bg-emerald-50 dark:bg-emerald-950/40 border border-emerald-200 dark:border-emerald-900 text-emerald-700 dark:text-emerald-300 text-xs flex items-center space-x-2">
            <CheckCircle2 className="w-4 h-4" />
            <span>Grievance ticket lodged successfully! Assigned to Dean Office review queue.</span>
          </div>
        )}
      </div>

      {/* Grievance Ticket Cards */}
      <div className="space-y-4">
        {grievances.map(g => (
          <div
            key={g.id}
            className="p-6 rounded-3xl glass-card border border-slate-200 dark:border-slate-800 shadow-sm transition-all"
          >
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 mb-3">
              <div className="flex items-center space-x-2">
                <span className="text-[11px] font-bold px-2.5 py-0.5 rounded-full bg-slate-100 dark:bg-slate-800 text-slate-700 dark:text-slate-300">
                  {g.category}
                </span>
                <span className="text-[11px] font-bold px-2 py-0.5 rounded-full bg-slate-100 dark:bg-slate-800 text-slate-500">
                  Priority: {g.priority}
                </span>
                <span className="text-xs text-slate-400">• Filed {g.createdAt}</span>
              </div>

              <span className={`px-3 py-1 rounded-full text-xs font-bold border ${getStatusBadge(g.status)}`}>
                {g.status.replace('_', ' ')}
              </span>
            </div>

            <h3 className="text-base font-bold text-slate-900 dark:text-white">{g.subject}</h3>
            <p className="text-xs text-slate-600 dark:text-slate-300 mt-2 leading-relaxed">{g.description}</p>

            {/* Responses Thread */}
            {g.responses.length > 0 && (
              <div className="mt-4 pt-4 border-t border-slate-100 dark:border-slate-800 space-y-2">
                <p className="text-[11px] font-bold uppercase tracking-wider text-slate-400">Official Responses</p>
                {g.responses.map(res => (
                  <div
                    key={res.id}
                    className="p-3.5 rounded-2xl bg-blue-50/60 dark:bg-blue-950/30 border border-blue-100 dark:border-blue-900/40 text-xs"
                  >
                    <div className="flex items-center justify-between text-blue-700 dark:text-blue-300 font-bold mb-1">
                      <span className="flex items-center space-x-1.5">
                        <MessageSquare className="w-3.5 h-3.5" />
                        <span>{res.authorName}</span>
                      </span>
                      <span className="text-[10px] text-slate-400">{res.date}</span>
                    </div>
                    <p className="text-slate-700 dark:text-slate-200">{res.text}</p>
                  </div>
                ))}
              </div>
            )}
          </div>
        ))}
      </div>

      {/* New Grievance Modal */}
      {showCreateModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-900/60 backdrop-blur-sm animate-in fade-in">
          <div className="max-w-md w-full p-6 sm:p-8 rounded-3xl glass-card border border-slate-200 dark:border-slate-800 shadow-2xl">
            <h3 className="text-lg font-bold text-slate-900 dark:text-white">Lodge Formal Grievance</h3>
            <p className="text-xs text-slate-500 dark:text-slate-400 mt-0.5">
              Confidential submission to University Administration
            </p>

            <form onSubmit={handleSubmit} className="mt-4 space-y-3.5">
              <div>
                <label className="block text-xs font-semibold text-slate-700 dark:text-slate-200 mb-1">
                  Issue Category
                </label>
                <select
                  value={category}
                  onChange={e => setCategory(e.target.value as any)}
                  className="w-full px-3 py-2 rounded-xl border border-slate-200 dark:border-slate-700 bg-white/70 dark:bg-slate-900 text-xs focus:ring-2 focus:ring-blue-500 outline-none"
                >
                  <option value="ACADEMIC">Academic / Coursework</option>
                  <option value="FACILITIES">Campus Infrastructure & Labs</option>
                  <option value="HOSTEL">Hostel & Food Amenities</option>
                  <option value="FINANCIAL">Scholarships & Fee Discrepancy</option>
                  <option value="EXAM">Examination & Hall Seating</option>
                  <option value="OTHER">Other University Services</option>
                </select>
              </div>

              <div>
                <label className="block text-xs font-semibold text-slate-700 dark:text-slate-200 mb-1">Subject</label>
                <input
                  type="text"
                  required
                  placeholder="Concise summary of the grievance..."
                  value={subject}
                  onChange={e => setSubject(e.target.value)}
                  className="w-full px-3 py-2 rounded-xl border border-slate-200 dark:border-slate-700 bg-white/70 dark:bg-slate-900 text-xs focus:ring-2 focus:ring-blue-500 outline-none"
                />
              </div>

              <div>
                <label className="block text-xs font-semibold text-slate-700 dark:text-slate-200 mb-1">
                  Detailed Description
                </label>
                <textarea
                  rows={4}
                  required
                  placeholder="Provide complete facts, dates, venues, and context..."
                  value={description}
                  onChange={e => setDescription(e.target.value)}
                  className="w-full px-3 py-2 rounded-xl border border-slate-200 dark:border-slate-700 bg-white/70 dark:bg-slate-900 text-xs focus:ring-2 focus:ring-blue-500 outline-none"
                />
              </div>

              <div>
                <label className="block text-xs font-semibold text-slate-700 dark:text-slate-200 mb-1">Priority</label>
                <select
                  value={priority}
                  onChange={e => setPriority(e.target.value as any)}
                  className="w-full px-3 py-2 rounded-xl border border-slate-200 dark:border-slate-700 bg-white/70 dark:bg-slate-900 text-xs focus:ring-2 focus:ring-blue-500 outline-none"
                >
                  <option value="LOW">Low - General Feedback</option>
                  <option value="MEDIUM">Medium - Standard Request</option>
                  <option value="HIGH">High - Urgent Academic Impact</option>
                  <option value="URGENT">Urgent - Emergency</option>
                </select>
              </div>

              <div className="flex gap-3 pt-2">
                <button
                  type="button"
                  onClick={() => setShowCreateModal(false)}
                  className="flex-1 py-2.5 rounded-xl border border-slate-300 dark:border-slate-700 text-xs font-semibold hover:bg-slate-100 dark:hover:bg-slate-800"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="flex-1 py-2.5 rounded-xl bg-blue-600 hover:bg-blue-700 text-white text-xs font-semibold shadow-md shadow-blue-500/25"
                >
                  Submit Ticket
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};
