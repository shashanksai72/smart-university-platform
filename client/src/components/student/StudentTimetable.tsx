import React, { useState } from 'react';
import { Calendar, Clock, MapPin, User, BookOpen, Layers, CheckCircle2 } from 'lucide-react';
import { useData } from '../../context/DataContext';

export const StudentTimetable: React.FC = () => {
  const { timetables } = useData();
  const [selectedDay, setSelectedDay] = useState<string>('Monday');

  const days = ['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday'];

  const daySchedule = timetables.filter(t => t.day === selectedDay);

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="p-6 sm:p-8 rounded-3xl glass-card border border-slate-200 dark:border-slate-800">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
          <div>
            <div className="inline-flex items-center space-x-2 px-3 py-1 rounded-full bg-blue-100 dark:bg-blue-900/60 text-blue-700 dark:text-blue-300 text-xs font-semibold mb-2">
              <Calendar className="w-3.5 h-3.5" />
              <span>Smart Campus Lecture & Lab Schedules</span>
            </div>
            <h2 className="text-2xl font-black text-slate-900 dark:text-white">Class Timetable & Venues</h2>
            <p className="text-xs text-slate-500 dark:text-slate-400 mt-1">
              Semester 5 Computer Science & Artificial Intelligence (Section A)
            </p>
          </div>

          <div className="flex items-center space-x-2">
            <span className="text-xs font-semibold text-emerald-600 dark:text-emerald-400 flex items-center space-x-1.5">
              <span className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse" />
              <span>Fall Semester 2026 Active</span>
            </span>
          </div>
        </div>

        {/* Day Selector Pills */}
        <div className="mt-6 flex flex-wrap gap-2">
          {days.map(d => (
            <button
              key={d}
              onClick={() => setSelectedDay(d)}
              className={`px-4 py-2 rounded-xl text-xs font-bold transition-all ${
                selectedDay === d
                  ? 'bg-blue-600 text-white shadow-md shadow-blue-500/25'
                  : 'bg-slate-100 dark:bg-slate-800/80 text-slate-600 dark:text-slate-300 hover:bg-slate-200 dark:hover:bg-slate-700'
              }`}
            >
              {d}
            </button>
          ))}
        </div>
      </div>

      {/* Selected Day Schedule Cards */}
      <div className="space-y-3">
        <h3 className="text-sm font-bold uppercase tracking-wider text-slate-400">
          Classes for {selectedDay} ({daySchedule.length} Sessions)
        </h3>

        {daySchedule.length === 0 ? (
          <div className="p-8 rounded-3xl glass-card text-center text-slate-400 text-xs">
            No scheduled classes for this day. Dedicated to project research and faculty office hours.
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {daySchedule.map((item, idx) => (
              <div
                key={item.id}
                className={`p-5 rounded-3xl glass-card border transition-all hover:shadow-lg ${
                  idx === 0
                    ? 'border-blue-500/50 dark:border-blue-500/40'
                    : 'border-slate-200/80 dark:border-slate-800'
                }`}
              >
                <div className="flex items-center justify-between mb-3">
                  <span className="px-2.5 py-1 rounded-full bg-blue-100 dark:bg-blue-900/60 text-blue-700 dark:text-blue-300 text-xs font-black">
                    {item.code}
                  </span>
                  <div className="flex items-center space-x-1.5 text-xs text-slate-600 dark:text-slate-300 font-mono">
                    <Clock className="w-3.5 h-3.5 text-blue-500" />
                    <span>{item.time}</span>
                  </div>
                </div>

                <h4 className="text-base font-bold text-slate-900 dark:text-white leading-tight">{item.subject}</h4>

                <div className="mt-4 pt-3 border-t border-slate-100 dark:border-slate-800/80 space-y-2 text-xs text-slate-600 dark:text-slate-300">
                  <div className="flex items-center space-x-2">
                    <User className="w-3.5 h-3.5 text-slate-400" />
                    <span>{item.faculty}</span>
                  </div>
                  <div className="flex items-center justify-between">
                    <span className="flex items-center space-x-2">
                      <MapPin className="w-3.5 h-3.5 text-cyan-500" />
                      <strong className="text-slate-800 dark:text-slate-100">{item.room}</strong>
                    </span>
                    <span className="text-[11px] font-semibold text-indigo-600 dark:text-indigo-400 bg-indigo-50 dark:bg-indigo-950/60 px-2 py-0.5 rounded-full">
                      {item.type}
                    </span>
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>

      {/* Weekly Overview Matrix */}
      <div className="p-6 rounded-3xl glass-card border border-slate-200 dark:border-slate-800">
        <h3 className="text-base font-bold text-slate-900 dark:text-white mb-1">Weekly Classroom Overview</h3>
        <p className="text-xs text-slate-500 dark:text-slate-400 mb-4">Complete weekly master timetable</p>

        <div className="overflow-x-auto">
          <table className="w-full text-left text-xs">
            <thead className="bg-slate-100/70 dark:bg-slate-900/60 text-slate-500 dark:text-slate-400 uppercase text-[10px] font-bold">
              <tr>
                <th className="py-3 px-4 rounded-l-xl">Day</th>
                <th className="py-3 px-4">Time</th>
                <th className="py-3 px-4">Subject</th>
                <th className="py-3 px-4">Faculty</th>
                <th className="py-3 px-4 rounded-r-xl">Venue</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100 dark:divide-slate-800">
              {timetables.map(t => (
                <tr key={t.id} className="hover:bg-slate-50/50 dark:hover:bg-slate-800/40">
                  <td className="py-3 px-4 font-bold text-slate-800 dark:text-slate-100">{t.day}</td>
                  <td className="py-3 px-4 font-mono text-slate-600 dark:text-slate-300">{t.time}</td>
                  <td className="py-3 px-4 font-medium text-slate-900 dark:text-white">
                    <span className="text-blue-600 font-bold mr-1.5">{t.code}</span>
                    {t.subject}
                  </td>
                  <td className="py-3 px-4 text-slate-600 dark:text-slate-300">{t.faculty}</td>
                  <td className="py-3 px-4 font-semibold text-cyan-600 dark:text-cyan-400">{t.room}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};
