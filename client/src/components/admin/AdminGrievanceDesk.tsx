import React, { useState } from 'react';
import { AlertCircle, MessageSquare, CheckCircle2, Clock, Send, Shield } from 'lucide-react';
import { useData } from '../../context/DataContext';
import { Grievance } from '../../types';

export const AdminGrievanceDesk: React.FC = () => {
  const { grievances, respondGrievance } = useData();
  const [selectedTicket, setSelectedTicket] = useState<Grievance | null>(null);
  const [responseText, setResponseText] = useState('');
  const [statusUpdate, setStatusUpdate] = useState<Grievance['status']>('RESOLVED');
  const [successMsg, setSuccessMsg] = useState(false);

  const handleRespond = (e: React.FormEvent) => {
    e.preventDefault();
    if (!selectedTicket || !responseText.trim()) return;

    respondGrievance(selectedTicket.id, responseText.trim(), statusUpdate);
    setSelectedTicket(null);
    setResponseText('');
    setSuccessMsg(true);
    setTimeout(() => setSuccessMsg(false), 3500);
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="p-6 sm:p-8 rounded-3xl glass-card border border-slate-200 dark:border-slate-800">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
          <div>
            <div className="inline-flex items-center space-x-2 px-3 py-1 rounded-full bg-rose-100 dark:bg-rose-900/60 text-rose-700 dark:text-rose-300 text-xs font-semibold mb-2">
              <Shield className="w-3.5 h-3.5" />
              <span>University Ombudsman & Grievance Desk</span>
            </div>
            <h2 className="text-2xl font-black text-slate-900 dark:text-white">Student Grievance Resolution Desk</h2>
            <p className="text-xs text-slate-500 dark:text-slate-400 mt-1 max-w-xl">
              Review filed student tickets, assign departments, publish verified administrative responses, and update case status.
            </p>
          </div>

          <div className="flex items-center space-x-2">
            <span className="px-3 py-1.5 rounded-full bg-rose-100 text-rose-700 dark:bg-rose-950/60 dark:text-rose-300 text-xs font-bold">
              {grievances.filter(g => g.status === 'PENDING').length} Awaiting Initial Response
            </span>
          </div>
        </div>

        {successMsg && (
          <div className="mt-4 p-3 rounded-xl bg-emerald-50 dark:bg-emerald-950/40 border border-emerald-200 dark:border-emerald-900 text-emerald-700 dark:text-emerald-300 text-xs flex items-center space-x-2">
            <CheckCircle2 className="w-4 h-4" />
            <span>Administrative resolution logged and student notified!</span>
          </div>
        )}
      </div>

      {/* Grievance Tickets List */}
      <div className="space-y-4">
        {grievances.map(ticket => (
          <div
            key={ticket.id}
            className="p-6 rounded-3xl glass-card border border-slate-200 dark:border-slate-800 flex flex-col justify-between"
          >
            <div>
              <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 mb-2">
                <div className="flex items-center space-x-2">
                  <span className="text-xs font-bold px-2.5 py-0.5 rounded-full bg-slate-100 dark:bg-slate-800 text-slate-700 dark:text-slate-300">
                    {ticket.category}
                  </span>
                  <span className="text-xs font-bold text-rose-600 bg-rose-50 dark:bg-rose-950/50 px-2.5 py-0.5 rounded-full">
                    Priority: {ticket.priority}
                  </span>
                  <span className="text-xs text-slate-400">Filed by {ticket.studentName} on {ticket.createdAt}</span>
                </div>

                <span
                  className={`px-3 py-1 rounded-full text-xs font-black ${
                    ticket.status === 'RESOLVED'
                      ? 'bg-emerald-100 text-emerald-700 dark:bg-emerald-950/60 dark:text-emerald-300'
                      : ticket.status === 'IN_PROGRESS'
                      ? 'bg-blue-100 text-blue-700 dark:bg-blue-950/60 dark:text-blue-300'
                      : 'bg-amber-100 text-amber-700 dark:bg-amber-950/60 dark:text-amber-300'
                  }`}
                >
                  {ticket.status.replace('_', ' ')}
                </span>
              </div>

              <h3 className="text-base font-bold text-slate-900 dark:text-white">{ticket.subject}</h3>
              <p className="text-xs text-slate-600 dark:text-slate-300 mt-2 leading-relaxed">{ticket.description}</p>

              {/* Existing Response History */}
              {ticket.responses.length > 0 && (
                <div className="mt-4 pt-3 border-t border-slate-100 dark:border-slate-800 space-y-2">
                  <p className="text-[10px] font-bold uppercase text-slate-400">Recorded Administrative Responses</p>
                  {ticket.responses.map(res => (
                    <div
                      key={res.id}
                      className="p-3 rounded-xl bg-blue-50/70 dark:bg-blue-950/40 border border-blue-100 dark:border-blue-900 text-xs"
                    >
                      <div className="flex justify-between font-bold text-blue-700 dark:text-blue-300 mb-1">
                        <span>{res.authorName}</span>
                        <span className="text-[10px] text-slate-400">{res.date}</span>
                      </div>
                      <p className="text-slate-700 dark:text-slate-200">{res.text}</p>
                    </div>
                  ))}
                </div>
              )}
            </div>

            <div className="mt-5 pt-4 border-t border-slate-100 dark:border-slate-800 flex justify-end">
              <button
                onClick={() => {
                  setSelectedTicket(ticket);
                  setStatusUpdate(ticket.status === 'PENDING' ? 'IN_PROGRESS' : 'RESOLVED');
                }}
                className="px-4 py-2 rounded-xl bg-purple-600 hover:bg-purple-700 text-white font-bold text-xs shadow-md shadow-purple-500/25 transition-all flex items-center space-x-1.5"
              >
                <MessageSquare className="w-3.5 h-3.5" />
                <span>Write Administrative Response</span>
              </button>
            </div>
          </div>
        ))}
      </div>

      {/* Response Modal */}
      {selectedTicket && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-900/60 backdrop-blur-sm animate-in fade-in">
          <div className="max-w-md w-full p-6 sm:p-8 rounded-3xl glass-card border border-slate-200 dark:border-slate-800 shadow-2xl">
            <h3 className="text-lg font-bold text-slate-900 dark:text-white">Respond to Grievance Ticket</h3>
            <p className="text-xs text-purple-600 font-semibold mt-0.5">{selectedTicket.subject}</p>
            <p className="text-xs text-slate-500 dark:text-slate-400 mt-2">
              Student: {selectedTicket.studentName} ({selectedTicket.category})
            </p>

            <form onSubmit={handleRespond} className="mt-4 space-y-3.5">
              <div>
                <label className="block text-xs font-semibold text-slate-700 dark:text-slate-200 mb-1">
                  New Status
                </label>
                <select
                  value={statusUpdate}
                  onChange={e => setStatusUpdate(e.target.value as any)}
                  className="w-full px-3 py-2 rounded-xl border border-slate-200 dark:border-slate-700 bg-white/70 dark:bg-slate-900 text-xs font-semibold focus:ring-2 focus:ring-purple-500 outline-none"
                >
                  <option value="IN_PROGRESS">IN_PROGRESS (Under Investigation)</option>
                  <option value="RESOLVED">RESOLVED (Action Completed)</option>
                  <option value="REJECTED">REJECTED (Ineligible)</option>
                </select>
              </div>

              <div>
                <label className="block text-xs font-semibold text-slate-700 dark:text-slate-200 mb-1">
                  Official Administrative Reply
                </label>
                <textarea
                  rows={4}
                  required
                  placeholder="Detail the remedial actions taken by the university..."
                  value={responseText}
                  onChange={e => setResponseText(e.target.value)}
                  className="w-full px-3 py-2 rounded-xl border border-slate-200 dark:border-slate-700 bg-white/70 dark:bg-slate-900 text-xs focus:ring-2 focus:ring-purple-500 outline-none"
                />
              </div>

              <div className="flex gap-3 pt-2">
                <button
                  type="button"
                  onClick={() => setSelectedTicket(null)}
                  className="flex-1 py-2.5 rounded-xl border border-slate-300 dark:border-slate-700 text-xs font-semibold hover:bg-slate-100 dark:hover:bg-slate-800"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="flex-1 py-2.5 rounded-xl bg-purple-600 hover:bg-purple-700 text-white text-xs font-semibold shadow-md shadow-purple-500/25 flex items-center justify-center space-x-1"
                >
                  <Send className="w-3.5 h-3.5" />
                  <span>Submit Response</span>
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};
