import React, { useState } from 'react';
import {
  GraduationCap,
  Shield,
  User,
  Lock,
  Mail,
  ArrowRight,
  Eye,
  EyeOff,
  Sparkles,
  AlertCircle,
  CheckCircle2,
} from 'lucide-react';
import { useAuth } from '../../context/AuthContext';
import { UserRole } from '../../types';

interface LoginPageProps {
  onSuccess: () => void;
  onOpenRegister: () => void;
  onBackToHome: () => void;
}

export const LoginPage: React.FC<LoginPageProps> = ({ onSuccess, onOpenRegister, onBackToHome }) => {
  const { login, quickLogin } = useAuth();
  const [email, setEmail] = useState('student@smartuni.edu');
  const [password, setPassword] = useState('password123');
  const [showPassword, setShowPassword] = useState(false);
  const [selectedRoleTab, setSelectedRoleTab] = useState<UserRole>('STUDENT');
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);
  const [forgotSent, setForgotSent] = useState(false);

  const handleRoleTabClick = (role: UserRole) => {
    setSelectedRoleTab(role);
    if (role === 'STUDENT') {
      setEmail('student@smartuni.edu');
      setPassword('password123');
    } else if (role === 'FACULTY') {
      setEmail('faculty@smartuni.edu');
      setPassword('password123');
    } else {
      setEmail('admin@smartuni.edu');
      setPassword('password123');
    }
  };

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    setError('');

    if (!email || !password) {
      setError('Please provide your university email and password.');
      return;
    }

    setLoading(true);
    try {
      const ok = await login(email, password);
      if (ok) {
        onSuccess();
      } else {
        setError('Invalid university credentials. Please verify your email.');
      }
    } catch (err: any) {
      setError(err?.message || 'Login failed. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center p-4 bg-slate-50 dark:bg-navy-950 text-slate-800 dark:text-slate-100 transition-colors duration-200">
      {/* Background Orbs */}
      <div className="absolute top-1/4 left-1/3 w-80 h-80 bg-blue-500/10 rounded-full blur-3xl pointer-events-none" />
      <div className="absolute bottom-1/4 right-1/3 w-80 h-80 bg-cyan-500/10 rounded-full blur-3xl pointer-events-none" />

      <div className="w-full max-w-md relative z-10">
        {/* University Header */}
        <div className="text-center mb-6">
          <button
            onClick={onBackToHome}
            className="inline-flex items-center space-x-2 p-2 rounded-xl hover:bg-slate-200/50 dark:hover:bg-slate-800/60 transition-colors"
          >
            <div className="w-10 h-10 rounded-xl bg-gradient-to-tr from-blue-600 to-cyan-500 text-white flex items-center justify-center shadow-md">
              <GraduationCap className="w-6 h-6" />
            </div>
            <span className="font-extrabold text-xl tracking-tight bg-gradient-to-r from-blue-600 to-cyan-500 bg-clip-text text-transparent">
              SMART UNIVERSITY
            </span>
          </button>
          <h2 className="text-2xl font-bold text-slate-900 dark:text-white mt-3">Welcome to the Campus Portal</h2>
          <p className="text-xs text-slate-500 dark:text-slate-400 mt-1">
            Sign in with your role-verified institutional credentials
          </p>
        </div>

        {/* Login Card */}
        <div className="rounded-3xl glass-card border border-slate-200/90 dark:border-slate-800 shadow-2xl p-6 sm:p-8">
          {/* Quick Persona Selector */}
          <div className="mb-6">
            <p className="text-[11px] font-semibold text-slate-400 uppercase tracking-wider mb-2 text-center">
              Select Demo Role (1-Click Auto-Fill)
            </p>
            <div className="grid grid-cols-3 gap-2 p-1 rounded-xl bg-slate-100 dark:bg-slate-900 border border-slate-200 dark:border-slate-800 text-xs font-semibold">
              <button
                type="button"
                onClick={() => handleRoleTabClick('STUDENT')}
                className={`py-2 rounded-lg transition-all ${
                  selectedRoleTab === 'STUDENT'
                    ? 'bg-blue-600 text-white shadow-sm'
                    : 'text-slate-600 dark:text-slate-300 hover:text-blue-500'
                }`}
              >
                Student
              </button>
              <button
                type="button"
                onClick={() => handleRoleTabClick('FACULTY')}
                className={`py-2 rounded-lg transition-all ${
                  selectedRoleTab === 'FACULTY'
                    ? 'bg-amber-600 text-white shadow-sm'
                    : 'text-slate-600 dark:text-slate-300 hover:text-amber-500'
                }`}
              >
                Faculty
              </button>
              <button
                type="button"
                onClick={() => handleRoleTabClick('ADMINISTRATOR')}
                className={`py-2 rounded-lg transition-all ${
                  selectedRoleTab === 'ADMINISTRATOR'
                    ? 'bg-purple-600 text-white shadow-sm'
                    : 'text-slate-600 dark:text-slate-300 hover:text-purple-500'
                }`}
              >
                Admin
              </button>
            </div>
          </div>

          {error && (
            <div className="mb-4 p-3 rounded-xl bg-rose-50 dark:bg-rose-950/50 border border-rose-200 dark:border-rose-900 text-rose-700 dark:text-rose-300 text-xs flex items-center space-x-2">
              <AlertCircle className="w-4 h-4 flex-shrink-0" />
              <span>{error}</span>
            </div>
          )}

          {forgotSent && (
            <div className="mb-4 p-3 rounded-xl bg-emerald-50 dark:bg-emerald-950/50 border border-emerald-200 dark:border-emerald-900 text-emerald-700 dark:text-emerald-300 text-xs flex items-center space-x-2">
              <CheckCircle2 className="w-4 h-4 flex-shrink-0" />
              <span>Password reset instructions dispatched to your verified institutional email.</span>
            </div>
          )}

          <form onSubmit={handleLogin} className="space-y-4">
            <div>
              <label className="block text-xs font-semibold text-slate-700 dark:text-slate-200 mb-1.5">
                University Email Address
              </label>
              <div className="relative">
                <Mail className="w-4 h-4 text-slate-400 absolute left-3 top-1/2 -translate-y-1/2" />
                <input
                  type="email"
                  value={email}
                  onChange={e => setEmail(e.target.value)}
                  placeholder="e.g. student@smartuni.edu"
                  required
                  className="w-full pl-9 pr-3 py-2.5 rounded-xl border border-slate-200 dark:border-slate-700 bg-white/70 dark:bg-slate-900 text-xs focus:ring-2 focus:ring-blue-500 outline-none"
                />
              </div>
            </div>

            <div>
              <div className="flex items-center justify-between mb-1.5">
                <label className="text-xs font-semibold text-slate-700 dark:text-slate-200">
                  Password
                </label>
                <button
                  type="button"
                  onClick={() => setForgotSent(true)}
                  className="text-[11px] text-blue-600 dark:text-blue-400 hover:underline"
                >
                  Forgot password?
                </button>
              </div>
              <div className="relative">
                <Lock className="w-4 h-4 text-slate-400 absolute left-3 top-1/2 -translate-y-1/2" />
                <input
                  type={showPassword ? 'text' : 'password'}
                  value={password}
                  onChange={e => setPassword(e.target.value)}
                  placeholder="••••••••••••"
                  required
                  className="w-full pl-9 pr-9 py-2.5 rounded-xl border border-slate-200 dark:border-slate-700 bg-white/70 dark:bg-slate-900 text-xs focus:ring-2 focus:ring-blue-500 outline-none"
                />
                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className="absolute right-3 top-1/2 -translate-y-1/2 text-slate-400 hover:text-slate-600"
                >
                  {showPassword ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
                </button>
              </div>
            </div>

            <button
              type="submit"
              disabled={loading}
              className="w-full mt-2 py-3 rounded-xl bg-gradient-to-r from-blue-600 to-cyan-500 hover:from-blue-700 hover:to-cyan-600 text-white font-semibold text-xs sm:text-sm shadow-lg shadow-blue-500/25 transition-all flex items-center justify-center space-x-2"
            >
              <span>{loading ? 'Authenticating...' : 'Sign In to Portal'}</span>
              <ArrowRight className="w-4 h-4" />
            </button>
          </form>

          {/* Quick One-Click Demo Personas */}
          <div className="mt-6 pt-5 border-t border-slate-200 dark:border-slate-800">
            <p className="text-[11px] text-slate-500 dark:text-slate-400 text-center mb-3">
              Or instantly sign in with one click:
            </p>
            <div className="flex flex-col sm:flex-row gap-2">
              <button
                type="button"
                onClick={() => {
                  quickLogin('STUDENT');
                  onSuccess();
                }}
                className="flex-1 py-2 px-3 rounded-xl border border-blue-200 dark:border-blue-900/60 bg-blue-50/60 dark:bg-blue-950/40 hover:bg-blue-100 text-[11px] font-semibold text-blue-700 dark:text-blue-300 transition-all text-center"
              >
                Marcus (Student)
              </button>
              <button
                type="button"
                onClick={() => {
                  quickLogin('FACULTY');
                  onSuccess();
                }}
                className="flex-1 py-2 px-3 rounded-xl border border-amber-200 dark:border-amber-900/60 bg-amber-50/60 dark:bg-amber-950/40 hover:bg-amber-100 text-[11px] font-semibold text-amber-700 dark:text-amber-300 transition-all text-center"
              >
                Prof. Wright (Faculty)
              </button>
              <button
                type="button"
                onClick={() => {
                  quickLogin('ADMINISTRATOR');
                  onSuccess();
                }}
                className="flex-1 py-2 px-3 rounded-xl border border-purple-200 dark:border-purple-900/60 bg-purple-50/60 dark:bg-purple-950/40 hover:bg-purple-100 text-[11px] font-semibold text-purple-700 dark:text-purple-300 transition-all text-center"
              >
                Dr. Jenkins (Admin)
              </button>
            </div>
          </div>

          {/* Register Link */}
          <div className="mt-6 text-center text-xs text-slate-500 dark:text-slate-400">
            <span>New Student or Faculty? </span>
            <button
              onClick={onOpenRegister}
              className="font-bold text-blue-600 dark:text-blue-400 hover:underline"
            >
              Create Account
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};
