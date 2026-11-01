import React, { useState } from 'react';
import {
  User,
  Mail,
  Phone,
  MapPin,
  GraduationCap,
  Calendar,
  Award,
  Shield,
  Edit2,
  Check,
  Building2,
  BookOpen,
} from 'lucide-react';
import { useAuth } from '../../context/AuthContext';

export const StudentProfile: React.FC = () => {
  const { user, updateProfile } = useAuth();
  const [isEditing, setIsEditing] = useState(false);
  const [phone, setPhone] = useState(user?.phone || '+1 (555) 234-8901');
  const [address, setAddress] = useState(user?.address || 'Pioneer Hall, Room 314, Smart University Campus');
  const [savedSuccess, setSavedSuccess] = useState(false);

  const handleSave = (e: React.FormEvent) => {
    e.preventDefault();
    updateProfile({ phone, address });
    setIsEditing(false);
    setSavedSuccess(true);
    setTimeout(() => setSavedSuccess(false), 3000);
  };

  return (
    <div className="space-y-6 max-w-5xl mx-auto">
      {/* Profile Header Card */}
      <div className="rounded-3xl glass-card border border-slate-200 dark:border-slate-800 p-6 sm:p-8 relative overflow-hidden">
        <div className="absolute top-0 right-0 w-64 h-64 bg-gradient-to-bl from-blue-500/10 via-cyan-500/10 to-transparent rounded-bl-full pointer-events-none" />

        <div className="flex flex-col sm:flex-row items-center sm:items-start gap-6 relative z-10">
          <div className="relative">
            <img
              src={user?.avatarUrl || 'https://images.unsplash.com/photo-1539571696357-5a69c17a67c6?auto=format&fit=crop&q=80&w=256'}
              alt={user?.fullName}
              className="w-24 h-24 sm:w-28 sm:h-28 rounded-3xl object-cover ring-4 ring-blue-500/30 shadow-xl shadow-blue-500/10"
            />
            <span className="absolute bottom-1 right-1 w-5 h-5 rounded-full bg-emerald-500 ring-2 ring-white dark:ring-navy-900" />
          </div>

          <div className="flex-1 text-center sm:text-left">
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2">
              <div>
                <h2 className="text-2xl font-black text-slate-900 dark:text-white">{user?.fullName || 'Marcus Chen'}</h2>
                <p className="text-xs font-semibold text-blue-600 dark:text-blue-400 mt-0.5">
                  Institutional ID: {user?.studentId || 'SU-2024-CS-042'}
                </p>
              </div>

              <button
                onClick={() => setIsEditing(!isEditing)}
                className="self-center sm:self-auto inline-flex items-center space-x-1.5 px-3.5 py-1.5 rounded-xl border border-slate-300 dark:border-slate-700 hover:bg-slate-100 dark:hover:bg-slate-800 text-xs font-semibold text-slate-700 dark:text-slate-200 transition-all"
              >
                <Edit2 className="w-3.5 h-3.5" />
                <span>{isEditing ? 'Cancel Edit' : 'Edit Contact Info'}</span>
              </button>
            </div>

            <div className="mt-4 flex flex-wrap items-center justify-center sm:justify-start gap-2">
              <span className="px-3 py-1 rounded-full bg-blue-100 dark:bg-blue-900/60 text-blue-700 dark:text-blue-300 text-xs font-semibold">
                {user?.course || 'B.Tech Computer Science & AI'}
              </span>
              <span className="px-3 py-1 rounded-full bg-cyan-100 dark:bg-cyan-900/60 text-cyan-700 dark:text-cyan-300 text-xs font-semibold">
                Year {user?.year || 3} • Semester {user?.semester || 5} (Section {user?.section || 'A'})
              </span>
              <span className="px-3 py-1 rounded-full bg-emerald-100 dark:bg-emerald-900/60 text-emerald-700 dark:text-emerald-300 text-xs font-semibold">
                Status: Verified Active
              </span>
            </div>
          </div>
        </div>

        {savedSuccess && (
          <div className="mt-4 p-3 rounded-xl bg-emerald-50 dark:bg-emerald-950/40 border border-emerald-200 dark:border-emerald-900 text-emerald-700 dark:text-emerald-300 text-xs flex items-center space-x-2">
            <Check className="w-4 h-4" />
            <span>Contact information updated successfully!</span>
          </div>
        )}
      </div>

      {/* Profile Details Sections */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {/* Contact Information & Editable Form */}
        <div className="p-6 rounded-3xl glass-card border border-slate-200 dark:border-slate-800">
          <h3 className="text-base font-bold text-slate-900 dark:text-white mb-4">Contact Information</h3>

          {isEditing ? (
            <form onSubmit={handleSave} className="space-y-4">
              <div>
                <label className="text-xs font-semibold text-slate-600 dark:text-slate-300">Email Address (Read Only)</label>
                <input
                  type="email"
                  value={user?.email || 'student@smartuni.edu'}
                  disabled
                  className="mt-1 w-full px-3 py-2 rounded-xl border border-slate-200 dark:border-slate-700 bg-slate-100 dark:bg-slate-800 text-xs text-slate-500 cursor-not-allowed"
                />
              </div>

              <div>
                <label className="text-xs font-semibold text-slate-600 dark:text-slate-300">Phone Number</label>
                <input
                  type="tel"
                  value={phone}
                  onChange={e => setPhone(e.target.value)}
                  required
                  className="mt-1 w-full px-3 py-2 rounded-xl border border-slate-200 dark:border-slate-700 bg-white/70 dark:bg-slate-900 text-xs focus:ring-2 focus:ring-blue-500 outline-none"
                />
              </div>

              <div>
                <label className="text-xs font-semibold text-slate-600 dark:text-slate-300">Campus Residence Address</label>
                <textarea
                  rows={3}
                  value={address}
                  onChange={e => setAddress(e.target.value)}
                  required
                  className="mt-1 w-full px-3 py-2 rounded-xl border border-slate-200 dark:border-slate-700 bg-white/70 dark:bg-slate-900 text-xs focus:ring-2 focus:ring-blue-500 outline-none"
                />
              </div>

              <button
                type="submit"
                className="w-full py-2.5 rounded-xl bg-blue-600 hover:bg-blue-700 text-white font-semibold text-xs shadow-md transition-all flex items-center justify-center space-x-1.5"
              >
                <Check className="w-4 h-4" />
                <span>Save Changes</span>
              </button>
            </form>
          ) : (
            <div className="space-y-3.5 text-xs">
              <div className="flex items-center space-x-3 text-slate-600 dark:text-slate-300">
                <Mail className="w-4 h-4 text-blue-500" />
                <div>
                  <p className="text-[10px] text-slate-400">Institutional Email</p>
                  <p className="font-semibold text-slate-800 dark:text-slate-100">{user?.email || 'student@smartuni.edu'}</p>
                </div>
              </div>

              <div className="flex items-center space-x-3 text-slate-600 dark:text-slate-300">
                <Phone className="w-4 h-4 text-cyan-500" />
                <div>
                  <p className="text-[10px] text-slate-400">Mobile Phone</p>
                  <p className="font-semibold text-slate-800 dark:text-slate-100">{phone}</p>
                </div>
              </div>

              <div className="flex items-center space-x-3 text-slate-600 dark:text-slate-300">
                <MapPin className="w-4 h-4 text-indigo-500" />
                <div>
                  <p className="text-[10px] text-slate-400">Residence Address</p>
                  <p className="font-semibold text-slate-800 dark:text-slate-100">{address}</p>
                </div>
              </div>
            </div>
          )}
        </div>

        {/* Academic Faculty Advisory */}
        <div className="p-6 rounded-3xl glass-card border border-slate-200 dark:border-slate-800">
          <h3 className="text-base font-bold text-slate-900 dark:text-white mb-4">Academic Administration & Advisory</h3>

          <div className="space-y-3.5 text-xs">
            <div className="flex items-center space-x-3">
              <Building2 className="w-4 h-4 text-purple-500" />
              <div>
                <p className="text-[10px] text-slate-400">Department</p>
                <p className="font-semibold text-slate-800 dark:text-slate-100">
                  {user?.department || 'Computer Science & Engineering'}
                </p>
              </div>
            </div>

            <div className="flex items-center space-x-3">
              <User className="w-4 h-4 text-blue-500" />
              <div>
                <p className="text-[10px] text-slate-400">Faculty Advisor</p>
                <p className="font-semibold text-slate-800 dark:text-slate-100">Prof. Alexander Wright (Associate Professor)</p>
              </div>
            </div>

            <div className="flex items-center space-x-3">
              <Award className="w-4 h-4 text-cyan-500" />
              <div>
                <p className="text-[10px] text-slate-400">Batch Cohort</p>
                <p className="font-semibold text-slate-800 dark:text-slate-100">Class of 2024 - 2028 (Undergraduate)</p>
              </div>
            </div>

            <div className="flex items-center space-x-3">
              <Shield className="w-4 h-4 text-emerald-500" />
              <div>
                <p className="text-[10px] text-slate-400">Academic Standing</p>
                <p className="font-semibold text-emerald-600 dark:text-emerald-400">Good Standing • Dean's Honor Roll</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
