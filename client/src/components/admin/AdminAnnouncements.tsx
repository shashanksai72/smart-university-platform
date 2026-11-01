import React, { useState } from 'react';
import { Megaphone, Plus, Pin, Clock, CheckCircle2, Users } from 'lucide-react';
import { useData } from '../../context/DataContext';
import { Announcement } from '../../types';

export const AdminAnnouncements: React.FC = () => {
  const { announcements, createAnnouncement } = useData();
  const [showModal, setShowModal] = useState(false);
  const [title, setTitle] = useState('');
  const [content, setContent] = useState('');
  const [category, setCategory] = useState<Announcement['category']>('ACADEMIC');
  const [target, setTarget] = useState<Announcement['target']>('ALL');
  const [isPinned, setIsPinned] = useState(false);
  const [success, setSuccess] = useState(false);

  const handleCreate = (e: React.FormEvent) => {
    e.preventDefault();
    if (!title || !content) return;

    createAnnouncement({
      title,
      content,
      category,
      target,
      isPinned,
      author: 'Dr. Sarah Jenkins (Registrar)',
    });

    setShowModal(false);
    setTitle('');
    setContent('');
    setIsPinned(false);
    setSuccess(true);
    setTimeout(() => setSuccess(false), 3500);
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="p-6 sm:p-8 rounded-3xl glass-card border border-slate-200 dark:border-slate-800">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
          <div>
            <div className="inline-flex items-center space-x-2 px-3 py-1 rounded-full bg-cyan-100 dark:bg-cyan-900/60 text-cyan-700 dark:text-cyan-300 text-xs font-semibold mb-2">
              <Megaphone className="w-3.5 h-3.5" />
              <span>Campus Public Announcements</span>
            </div>
            <h2 className="text-2xl font-black text-slate-900 dark:text-white">Broadcast University Notices</h2>
            <p className="text-xs text-slate-500 dark:text-slate-400 mt-1 max-w-xl">
              Publish university-wide bulletins, examination circulations, holiday announcements, and emergency notifications.
            </p>
          </div>

          <button
            onClick={() => setShowModal(true)}
            className="px-4 py-2.5 rounded-xl bg-blue-600 hover:bg-blue-700 text-white font-bold text-xs shadow-md shadow-blue-500/25 transition-all flex items-center space-x-2"
          >
            <Plus className="w-4 h-4" />
            <span>Publish Announcement</span>
          </button>
        </div>

        {success && (
          <div className="mt-4 p-3 rounded-xl bg-emerald-50 dark:bg-emerald-950/40 border border-emerald-200 dark:border-emerald-900 text-emerald-700 dark:text-emerald-300 text-xs flex items-center space-x-2">
            <CheckCircle2 className="w-4 h-4" />
            <span>Notice broadcasted across campus dashboards!</span>
          </div>
        )}
      </div>

      {/* Announcements List */}
      <div className="space-y-4">
        {announcements.map(ann => (
          <div
            key={ann.id}
            className={`p-6 rounded-3xl glass-card border transition-all ${
              ann.isPinned
                ? 'border-blue-500/50 dark:border-blue-500/40 shadow-md'
                : 'border-slate-200 dark:border-slate-800'
            }`}
          >
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 mb-2">
              <div className="flex items-center space-x-2">
                <span className="text-xs font-bold px-2.5 py-0.5 rounded-full bg-blue-100 dark:bg-blue-900/60 text-blue-700 dark:text-blue-300">
                  {ann.category}
                </span>
                <span className="text-xs font-semibold text-slate-400 flex items-center space-x-1">
                  <Users className="w-3.5 h-3.5" />
                  <span>Target: {ann.target}</span>
                </span>
                <span className="text-xs text-slate-400">• Published {ann.date}</span>
              </div>

              {ann.isPinned && (
                <span className="inline-flex items-center space-x-1 text-xs font-bold text-amber-600 dark:text-amber-400 bg-amber-50 dark:bg-amber-950/50 px-2.5 py-0.5 rounded-full">
                  <Pin className="w-3 h-3" />
                  <span>Pinned Priority</span>
                </span>
              )}
            </div>

            <h3 className="text-base font-bold text-slate-900 dark:text-white">{ann.title}</h3>
            <p className="text-xs text-slate-600 dark:text-slate-300 mt-2 leading-relaxed">{ann.content}</p>
            <p className="text-[11px] text-slate-400 font-semibold mt-3">Author: {ann.author}</p>
          </div>
        ))}
      </div>

      {/* Modal */}
      {showModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-900/60 backdrop-blur-sm animate-in fade-in">
          <div className="max-w-md w-full p-6 sm:p-8 rounded-3xl glass-card border border-slate-200 dark:border-slate-800 shadow-2xl">
            <h3 className="text-lg font-bold text-slate-900 dark:text-white">New Campus Announcement</h3>
            <p className="text-xs text-slate-500 dark:text-slate-400 mt-0.5">
              Broadcast notice to university community
            </p>

            <form onSubmit={handleCreate} className="mt-4 space-y-3.5">
              <div>
                <label className="block text-xs font-semibold text-slate-700 dark:text-slate-200 mb-1">
                  Announcement Title
                </label>
                <input
                  type="text"
                  required
                  placeholder="e.g. End-Semester Examination Hall Allotments Released"
                  value={title}
                  onChange={e => setTitle(e.target.value)}
                  className="w-full px-3 py-2 rounded-xl border border-slate-200 dark:border-slate-700 bg-white/70 dark:bg-slate-900 text-xs focus:ring-2 focus:ring-blue-500 outline-none"
                />
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="block text-xs font-semibold text-slate-700 dark:text-slate-200 mb-1">
                    Category
                  </label>
                  <select
                    value={category}
                    onChange={e => setCategory(e.target.value as any)}
                    className="w-full px-3 py-2 rounded-xl border border-slate-200 dark:border-slate-700 bg-white/70 dark:bg-slate-900 text-xs focus:ring-2 focus:ring-blue-500 outline-none"
                  >
                    <option value="ACADEMIC">ACADEMIC</option>
                    <option value="EXAM">EXAM</option>
                    <option value="EVENT">EVENT</option>
                    <option value="URGENT">URGENT</option>
                  </select>
                </div>

                <div>
                  <label className="block text-xs font-semibold text-slate-700 dark:text-slate-200 mb-1">
                    Target Audience
                  </label>
                  <select
                    value={target}
                    onChange={e => setTarget(e.target.value as any)}
                    className="w-full px-3 py-2 rounded-xl border border-slate-200 dark:border-slate-700 bg-white/70 dark:bg-slate-900 text-xs focus:ring-2 focus:ring-blue-500 outline-none"
                  >
                    <option value="ALL">Entire Campus (All)</option>
                    <option value="STUDENT">Students Only</option>
                    <option value="FACULTY">Faculty Only</option>
                  </select>
                </div>
              </div>

              <div>
                <label className="block text-xs font-semibold text-slate-700 dark:text-slate-200 mb-1">
                  Announcement Body
                </label>
                <textarea
                  rows={4}
                  required
                  placeholder="Compose notice message..."
                  value={content}
                  onChange={e => setContent(e.target.value)}
                  className="w-full px-3 py-2 rounded-xl border border-slate-200 dark:border-slate-700 bg-white/70 dark:bg-slate-900 text-xs focus:ring-2 focus:ring-blue-500 outline-none"
                />
              </div>

              <label className="flex items-center space-x-2 text-xs font-semibold text-slate-700 dark:text-slate-300 cursor-pointer">
                <input
                  type="checkbox"
                  checked={isPinned}
                  onChange={e => setIsPinned(e.target.checked)}
                  className="rounded text-blue-600 focus:ring-blue-500"
                />
                <span>Pin notice to top of dashboard</span>
              </label>

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
                  Publish Notice
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};
