import React from 'react';
import {
  GraduationCap,
  Sparkles,
  ArrowRight,
  ShieldCheck,
  CheckCircle2,
  Clock,
  BookOpen,
  CreditCard,
  AlertCircle,
  Bot,
  Award,
  Users,
  Building2,
  BarChart3,
  Layers,
  Zap,
  Mail,
  MapPin,
  Phone,
  ChevronRight,
  LayoutDashboard,
} from 'lucide-react';
import { useAuth } from '../../context/AuthContext';
import { useTheme } from '../../context/ThemeContext';

interface LandingPageProps {
  onGetStarted: () => void;
  onExploreDashboard: () => void;
}

export const LandingPage: React.FC<LandingPageProps> = ({ onGetStarted, onExploreDashboard }) => {
  const { quickLogin } = useAuth();
  const { theme, toggleTheme } = useTheme();

  return (
    <div className="min-h-screen bg-slate-50 dark:bg-navy-950 text-slate-900 dark:text-slate-100 selection:bg-blue-600 selection:text-white transition-colors duration-200">
      {/* 1. Sticky Navigation Bar */}
      <nav className="sticky top-0 z-50 glass-panel border-b border-slate-200/80 dark:border-slate-800 backdrop-blur-lg">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-16 flex items-center justify-between">
          <div className="flex items-center space-x-3">
            <div className="w-10 h-10 rounded-xl bg-gradient-to-tr from-blue-600 to-cyan-500 flex items-center justify-center text-white shadow-md shadow-blue-500/20">
              <GraduationCap className="w-6 h-6" />
            </div>
            <div>
              <span className="font-extrabold text-lg tracking-tight bg-gradient-to-r from-blue-600 via-indigo-600 to-cyan-500 dark:from-blue-400 dark:to-cyan-300 bg-clip-text text-transparent">
                SMART UNIVERSITY
              </span>
              <p className="text-[10px] text-slate-500 dark:text-slate-400 -mt-1 hidden sm:block">
                Digital Transformation Platform
              </p>
            </div>
          </div>

          <div className="hidden md:flex items-center space-x-6 text-sm font-medium text-slate-600 dark:text-slate-300">
            <a href="#features" className="hover:text-blue-600 dark:hover:text-blue-400 transition-colors">
              Platform Features
            </a>
            <a href="#transformation" className="hover:text-blue-600 dark:hover:text-blue-400 transition-colors">
              Digital Transformation
            </a>
            <a href="#ai-portal" className="hover:text-blue-600 dark:hover:text-blue-400 transition-colors flex items-center space-x-1">
              <Sparkles className="w-3.5 h-3.5 text-cyan-500" />
              <span>Athena AI</span>
            </a>
            <a href="#stats" className="hover:text-blue-600 dark:hover:text-blue-400 transition-colors">
              Campus Impact
            </a>
            <a href="#contact" className="hover:text-blue-600 dark:hover:text-blue-400 transition-colors">
              Contact
            </a>
          </div>

          <div className="flex items-center space-x-3">
            <button
              onClick={() => {
                quickLogin('STUDENT');
                onExploreDashboard();
              }}
              className="hidden sm:inline-flex px-3.5 py-1.5 rounded-xl border border-slate-300 dark:border-slate-700 hover:bg-slate-100 dark:hover:bg-slate-800 text-xs font-semibold text-slate-700 dark:text-slate-200 transition-all"
            >
              Demo Login
            </button>
            <button
              onClick={onGetStarted}
              className="px-4 py-2 rounded-xl bg-gradient-to-r from-blue-600 to-cyan-500 hover:from-blue-700 hover:to-cyan-600 text-white text-xs sm:text-sm font-semibold shadow-md shadow-blue-500/25 hover:shadow-blue-500/40 hover:scale-[1.02] transition-all flex items-center space-x-1.5"
            >
              <span>Launch Portal</span>
              <ArrowRight className="w-4 h-4" />
            </button>
          </div>
        </div>
      </nav>

      {/* 2. Hero Section */}
      <section className="relative overflow-hidden pt-12 pb-20 sm:pt-20 sm:pb-28">
        {/* Futuristic Gradient Background Blobs */}
        <div className="absolute top-1/4 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] bg-gradient-to-tr from-blue-500/15 via-cyan-500/15 to-indigo-500/15 blur-3xl pointer-events-none rounded-full" />
        <div className="absolute top-1/3 -left-32 w-96 h-96 bg-blue-600/10 blur-3xl pointer-events-none rounded-full" />
        <div className="absolute top-1/2 -right-32 w-96 h-96 bg-cyan-500/10 blur-3xl pointer-events-none rounded-full" />

        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          {/* Badge */}
          <div className="inline-flex items-center space-x-2 px-3.5 py-1.5 rounded-full bg-blue-50 dark:bg-blue-950/60 border border-blue-200 dark:border-blue-800/60 text-blue-700 dark:text-blue-300 text-xs font-semibold shadow-sm mb-6 animate-pulse">
            <Sparkles className="w-3.5 h-3.5 text-cyan-500" />
            <span>Next-Generation Intelligent Campus Ecosystem</span>
          </div>

          {/* Main Headline */}
          <h1 className="text-4xl sm:text-6xl lg:text-7xl font-extrabold tracking-tight text-slate-900 dark:text-white leading-[1.15]">
            Transforming Education Through{' '}
            <span className="bg-gradient-to-r from-blue-600 via-indigo-600 to-cyan-500 dark:from-blue-400 dark:via-cyan-300 dark:to-indigo-300 bg-clip-text text-transparent">
              Intelligent Technology
            </span>
          </h1>

          {/* Project Description */}
          <p className="mt-6 max-w-3xl mx-auto text-base sm:text-xl text-slate-600 dark:text-slate-300 leading-relaxed font-normal">
            A centralized digital platform connecting students, faculty, administrators, and university leadership.
            Eliminate paperwork, automate academic attendance and grading, streamline fee reconciliation, and empower
            your campus with 24/7 AI-driven assistance.
          </p>

          {/* Call to Action Buttons */}
          <div className="mt-8 flex flex-col sm:flex-row items-center justify-center gap-4">
            <button
              onClick={onGetStarted}
              className="w-full sm:w-auto px-8 py-3.5 rounded-xl bg-blue-600 hover:bg-blue-700 text-white font-semibold text-base shadow-xl shadow-blue-500/30 hover:scale-105 transition-all flex items-center justify-center space-x-2"
            >
              <span>Get Started Now</span>
              <ArrowRight className="w-5 h-5" />
            </button>

            <button
              onClick={() => {
                quickLogin('STUDENT');
                onExploreDashboard();
              }}
              className="w-full sm:w-auto px-8 py-3.5 rounded-xl glass-card hover:bg-slate-100 dark:hover:bg-slate-800/80 font-semibold text-base text-slate-800 dark:text-slate-100 border border-slate-300 dark:border-slate-700 shadow-sm hover:scale-105 transition-all flex items-center justify-center space-x-2"
            >
              <LayoutDashboard className="w-5 h-5 text-blue-500" />
              <span>Explore Platform Demo</span>
            </button>
          </div>

          {/* Interactive Campus Dashboard Preview Mockup */}
          <div className="mt-14 max-w-5xl mx-auto rounded-3xl glass-card p-3 sm:p-5 border border-slate-200/90 dark:border-slate-800 shadow-2xl relative overflow-hidden group">
            <div className="flex items-center justify-between pb-3 mb-3 border-b border-slate-200 dark:border-slate-800 text-xs">
              <div className="flex items-center space-x-2">
                <div className="w-3 h-3 rounded-full bg-rose-500" />
                <div className="w-3 h-3 rounded-full bg-amber-500" />
                <div className="w-3 h-3 rounded-full bg-emerald-500" />
                <span className="text-slate-400 font-mono text-[11px] ml-2">portal.smartuni.edu/dashboard</span>
              </div>
              <div className="flex items-center space-x-2 text-slate-500 dark:text-slate-400 font-medium">
                <span className="flex items-center space-x-1 text-emerald-600 dark:text-emerald-400">
                  <span className="w-2 h-2 rounded-full bg-emerald-500 animate-ping inline-block" />
                  <span>Real-time Sync</span>
                </span>
              </div>
            </div>

            {/* Mock Dashboard Grid Preview */}
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-3 text-left">
              <div className="p-4 rounded-2xl bg-gradient-to-br from-blue-50 to-indigo-50/40 dark:from-slate-900 dark:to-blue-950/30 border border-blue-100 dark:border-blue-900/40">
                <div className="flex items-center justify-between text-blue-600 dark:text-blue-400 mb-2">
                  <span className="text-xs font-semibold">Attendance Rate</span>
                  <CheckCircle2 className="w-4 h-4" />
                </div>
                <p className="text-2xl font-black text-slate-900 dark:text-white">94.2%</p>
                <p className="text-[11px] text-emerald-600 dark:text-emerald-400 mt-1 font-medium">
                  +2.4% above requirement
                </p>
              </div>

              <div className="p-4 rounded-2xl bg-gradient-to-br from-cyan-50 to-blue-50/40 dark:from-slate-900 dark:to-cyan-950/30 border border-cyan-100 dark:border-cyan-900/40">
                <div className="flex items-center justify-between text-cyan-600 dark:text-cyan-400 mb-2">
                  <span className="text-xs font-semibold">Cumulative CGPA</span>
                  <Award className="w-4 h-4" />
                </div>
                <p className="text-2xl font-black text-slate-900 dark:text-white">3.84 / 4.0</p>
                <p className="text-[11px] text-blue-600 dark:text-blue-400 mt-1 font-medium">
                  First Class with Distinction
                </p>
              </div>

              <div className="p-4 rounded-2xl bg-gradient-to-br from-indigo-50 to-purple-50/40 dark:from-slate-900 dark:to-indigo-950/30 border border-indigo-100 dark:border-indigo-900/40">
                <div className="flex items-center justify-between text-indigo-600 dark:text-indigo-400 mb-2">
                  <span className="text-xs font-semibold">Upcoming Exams</span>
                  <Clock className="w-4 h-4" />
                </div>
                <p className="text-2xl font-black text-slate-900 dark:text-white">3 Papers</p>
                <p className="text-[11px] text-indigo-600 dark:text-indigo-400 mt-1 font-medium">
                  Hall Ticket Generated
                </p>
              </div>

              <div className="p-4 rounded-2xl bg-gradient-to-br from-purple-50 to-pink-50/40 dark:from-slate-900 dark:to-purple-950/30 border border-purple-100 dark:border-purple-900/40">
                <div className="flex items-center justify-between text-purple-600 dark:text-purple-400 mb-2">
                  <span className="text-xs font-semibold">Athena AI Tutor</span>
                  <Bot className="w-4 h-4" />
                </div>
                <p className="text-2xl font-black text-slate-900 dark:text-white">Active 24/7</p>
                <p className="text-[11px] text-purple-600 dark:text-purple-400 mt-1 font-medium">
                  Query answer latency &lt; 0.4s
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* 3. Platform Key Modules (Section 4 & Detailed Specs) */}
      <section id="features" className="py-20 bg-white/60 dark:bg-navy-900/50 border-y border-slate-200/80 dark:border-slate-800">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center max-w-3xl mx-auto mb-16">
            <h2 className="text-xs font-bold uppercase tracking-wider text-blue-600 dark:text-blue-400">
              Complete Digital Capabilities
            </h2>
            <p className="mt-2 text-3xl sm:text-4xl font-extrabold text-slate-900 dark:text-white">
              Every University Process, Unified in One Modern Interface
            </p>
            <p className="mt-4 text-slate-600 dark:text-slate-300">
              Replace disjointed legacy portals with a high-performance web platform designed for seamless collaboration.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {/* Feature 1 */}
            <div className="p-6 rounded-3xl glass-card hover:border-blue-500/50 hover:shadow-xl transition-all group">
              <div className="w-12 h-12 rounded-2xl bg-blue-100 dark:bg-blue-900/40 text-blue-600 dark:text-blue-400 flex items-center justify-center mb-5 group-hover:scale-110 transition-transform">
                <CheckCircle2 className="w-6 h-6" />
              </div>
              <h3 className="text-lg font-bold text-slate-900 dark:text-white">Smart Attendance Tracking</h3>
              <p className="mt-2 text-sm text-slate-600 dark:text-slate-300 leading-relaxed">
                Subject-wise and date-wise attendance records with automated percentage calculation and early low-attendance
                warnings below 75%.
              </p>
            </div>

            {/* Feature 2 */}
            <div className="p-6 rounded-3xl glass-card hover:border-cyan-500/50 hover:shadow-xl transition-all group">
              <div className="w-12 h-12 rounded-2xl bg-cyan-100 dark:bg-cyan-900/40 text-cyan-600 dark:text-cyan-400 flex items-center justify-center mb-5 group-hover:scale-110 transition-transform">
                <Award className="w-6 h-6" />
              </div>
              <h3 className="text-lg font-bold text-slate-900 dark:text-white">Academics & CGPA Engine</h3>
              <p className="mt-2 text-sm text-slate-600 dark:text-slate-300 leading-relaxed">
                Continuous internal marks recording, official semester grade transcripts, and interactive CGPA projection
                simulators for students.
              </p>
            </div>

            {/* Feature 3 */}
            <div className="p-6 rounded-3xl glass-card hover:border-indigo-500/50 hover:shadow-xl transition-all group">
              <div className="w-12 h-12 rounded-2xl bg-indigo-100 dark:bg-indigo-900/40 text-indigo-600 dark:text-indigo-400 flex items-center justify-center mb-5 group-hover:scale-110 transition-transform">
                <Clock className="w-6 h-6" />
              </div>
              <h3 className="text-lg font-bold text-slate-900 dark:text-white">Dynamic Smart Timetable</h3>
              <p className="mt-2 text-sm text-slate-600 dark:text-slate-300 leading-relaxed">
                Daily and weekly schedule view with classroom allocation, live current-class highlights, and faculty directory
                links.
              </p>
            </div>

            {/* Feature 4 */}
            <div className="p-6 rounded-3xl glass-card hover:border-purple-500/50 hover:shadow-xl transition-all group">
              <div className="w-12 h-12 rounded-2xl bg-purple-100 dark:bg-purple-900/40 text-purple-600 dark:text-purple-400 flex items-center justify-center mb-5 group-hover:scale-110 transition-transform">
                <BookOpen className="w-6 h-6" />
              </div>
              <h3 className="text-lg font-bold text-slate-900 dark:text-white">Digital Campus Library</h3>
              <p className="mt-2 text-sm text-slate-600 dark:text-slate-300 leading-relaxed">
                Search physical and digital book inventories, monitor copy availability, borrow titles with one click, and track
                due date countdowns.
              </p>
            </div>

            {/* Feature 5 */}
            <div className="p-6 rounded-3xl glass-card hover:border-emerald-500/50 hover:shadow-xl transition-all group">
              <div className="w-12 h-12 rounded-2xl bg-emerald-100 dark:bg-emerald-900/40 text-emerald-600 dark:text-emerald-400 flex items-center justify-center mb-5 group-hover:scale-110 transition-transform">
                <CreditCard className="w-6 h-6" />
              </div>
              <h3 className="text-lg font-bold text-slate-900 dark:text-white">Fee Management & Receipts</h3>
              <p className="mt-2 text-sm text-slate-600 dark:text-slate-300 leading-relaxed">
                Transparent fee breakdowns for tuition, laboratories, and examinations. Simulated clearing with official
                verifiable digital receipts.
              </p>
            </div>

            {/* Feature 6 */}
            <div className="p-6 rounded-3xl glass-card hover:border-amber-500/50 hover:shadow-xl transition-all group">
              <div className="w-12 h-12 rounded-2xl bg-amber-100 dark:bg-amber-900/40 text-amber-600 dark:text-amber-400 flex items-center justify-center mb-5 group-hover:scale-110 transition-transform">
                <AlertCircle className="w-6 h-6" />
              </div>
              <h3 className="text-lg font-bold text-slate-900 dark:text-white">Grievance Redressal Desk</h3>
              <p className="mt-2 text-sm text-slate-600 dark:text-slate-300 leading-relaxed">
                Direct issue submission for academics, facilities, or finance with priority levels and direct response tracking
                from university leadership.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* 4. University Digital Transformation Benefits */}
      <section id="transformation" className="py-20 relative">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            <div>
              <div className="inline-flex items-center space-x-2 px-3 py-1 rounded-full bg-blue-100 dark:bg-blue-900/60 text-blue-700 dark:text-blue-300 text-xs font-semibold mb-4">
                <Zap className="w-3.5 h-3.5" />
                <span>Next-Gen Campus Transformation</span>
              </div>
              <h2 className="text-3xl sm:text-4xl font-extrabold text-slate-900 dark:text-white leading-tight">
                Designed to Modernize Higher Education Workflows
              </h2>
              <p className="mt-4 text-slate-600 dark:text-slate-300 leading-relaxed">
                Traditional universities lose thousands of administrative hours each semester to physical forms, paper
                records, manual marks calculation, and fragmented communications. Smart University replaces these friction
                points with intelligent automation.
              </p>

              <div className="mt-8 space-y-4">
                <div className="flex items-start space-x-3.5">
                  <div className="p-1 rounded-full bg-emerald-100 dark:bg-emerald-950/60 text-emerald-600 dark:text-emerald-400 mt-1">
                    <CheckCircle2 className="w-4 h-4" />
                  </div>
                  <div>
                    <h4 className="text-sm font-bold text-slate-900 dark:text-white">100% Paperless Academic Processes</h4>
                    <p className="text-xs text-slate-500 dark:text-slate-400">
                      Attendance slips, hall tickets, fee vouchers, and grievance forms are fully digitized with audit trails.
                    </p>
                  </div>
                </div>

                <div className="flex items-start space-x-3.5">
                  <div className="p-1 rounded-full bg-blue-100 dark:bg-blue-950/60 text-blue-600 dark:text-blue-400 mt-1">
                    <CheckCircle2 className="w-4 h-4" />
                  </div>
                  <div>
                    <h4 className="text-sm font-bold text-slate-900 dark:text-white">Role-Based Access Control (RBAC)</h4>
                    <p className="text-xs text-slate-500 dark:text-slate-400">
                      Isolated environments for Students, Faculty, and Administrators with strict data privacy rules.
                    </p>
                  </div>
                </div>

                <div className="flex items-start space-x-3.5">
                  <div className="p-1 rounded-full bg-indigo-100 dark:bg-indigo-950/60 text-indigo-600 dark:text-indigo-400 mt-1">
                    <CheckCircle2 className="w-4 h-4" />
                  </div>
                  <div>
                    <h4 className="text-sm font-bold text-slate-900 dark:text-white">Instant Data Visualization & Reports</h4>
                    <p className="text-xs text-slate-500 dark:text-slate-400">
                      Interactive Recharts analytics for department-wise performance, fee collection, and monthly attendance
                      patterns.
                    </p>
                  </div>
                </div>
              </div>
            </div>

            {/* Visual Transformation Matrix Card */}
            <div className="p-8 rounded-3xl glass-card border border-slate-200 dark:border-slate-800 shadow-2xl relative">
              <div className="space-y-5">
                <div className="p-4 rounded-2xl bg-slate-100 dark:bg-slate-800/80 border border-slate-200 dark:border-slate-700">
                  <div className="flex items-center justify-between text-xs font-bold text-slate-500 uppercase">
                    <span>Legacy University Portals</span>
                    <span className="text-rose-500 font-semibold">Manual & Slow</span>
                  </div>
                  <p className="text-xs text-slate-600 dark:text-slate-400 mt-2">
                    Paper attendance registers, in-person queueing for fee challans, physical complaints boxes, delayed exam
                    schedules.
                  </p>
                </div>

                <div className="text-center font-bold text-blue-600 text-sm">VS</div>

                <div className="p-4 rounded-2xl bg-gradient-to-br from-blue-600 to-cyan-600 text-white shadow-xl shadow-blue-500/20">
                  <div className="flex items-center justify-between text-xs font-bold text-blue-100 uppercase">
                    <span>Smart University Platform</span>
                    <span className="bg-white/20 px-2 py-0.5 rounded-full text-white text-[10px] font-bold">
                      Automated & Instant
                    </span>
                  </div>
                  <p className="text-xs text-blue-50 mt-2 leading-relaxed">
                    1-click attendance verification, instant simulated fee receipts, 24/7 AI tutor guidance, and live student
                    progress dashboards.
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* 5. AI-Powered Education Section */}
      <section id="ai-portal" className="py-20 bg-gradient-to-b from-blue-900/10 to-transparent border-t border-slate-200/80 dark:border-slate-800">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="max-w-4xl mx-auto text-center">
            <div className="w-14 h-14 mx-auto rounded-3xl bg-gradient-to-tr from-cyan-500 to-blue-600 text-white flex items-center justify-center shadow-lg shadow-cyan-500/30 mb-5">
              <Bot className="w-8 h-8" />
            </div>
            <h2 className="text-3xl sm:text-4xl font-extrabold text-slate-900 dark:text-white">
              Athena: Intelligent University AI Assistant
            </h2>
            <p className="mt-4 text-base sm:text-lg text-slate-600 dark:text-slate-300">
              Configurable with Google Gemini API for natural conversation, Athena instantly resolves student queries
              regarding course schedules, minimum attendance percentages, exam hall tickets, library due dates, and
              administrative policies.
            </p>

            <div className="mt-8 flex flex-wrap justify-center gap-2.5">
              <span className="px-3.5 py-1.5 rounded-xl bg-blue-100 dark:bg-blue-950/80 text-blue-700 dark:text-blue-300 text-xs font-medium border border-blue-200 dark:border-blue-800/60">
                "What is my current attendance in CS501?"
              </span>
              <span className="px-3.5 py-1.5 rounded-xl bg-cyan-100 dark:bg-cyan-950/80 text-cyan-700 dark:text-cyan-300 text-xs font-medium border border-cyan-200 dark:border-cyan-800/60">
                "When and where is my Deep Learning exam?"
              </span>
              <span className="px-3.5 py-1.5 rounded-xl bg-indigo-100 dark:bg-indigo-950/80 text-indigo-700 dark:text-indigo-300 text-xs font-medium border border-indigo-200 dark:border-indigo-800/60">
                "How do I clear my pending semester 5 fees?"
              </span>
              <span className="px-3.5 py-1.5 rounded-xl bg-purple-100 dark:bg-purple-950/80 text-purple-700 dark:text-purple-300 text-xs font-medium border border-purple-200 dark:border-purple-800/60">
                "Explain the university CGPA grading scale"
              </span>
            </div>

            <div className="mt-10">
              <button
                onClick={() => {
                  quickLogin('STUDENT');
                  onExploreDashboard();
                }}
                className="inline-flex items-center space-x-2 px-6 py-3 rounded-xl bg-gradient-to-r from-blue-600 to-cyan-500 hover:from-blue-700 hover:to-cyan-600 text-white font-semibold text-sm shadow-lg shadow-blue-500/25 transition-all"
              >
                <span>Try Athena AI Chatbot</span>
                <ChevronRight className="w-4 h-4" />
              </button>
            </div>
          </div>
        </div>
      </section>

      {/* 6. Live Statistics Section */}
      <section id="stats" className="py-16 bg-white dark:bg-navy-900 border-y border-slate-200 dark:border-slate-800">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8 text-center">
            <div>
              <p className="text-3xl sm:text-5xl font-black bg-gradient-to-r from-blue-600 to-cyan-500 bg-clip-text text-transparent">
                1,180+
              </p>
              <p className="mt-2 text-xs sm:text-sm font-semibold text-slate-500 dark:text-slate-400 uppercase tracking-wider">
                Active Enrolled Students
              </p>
            </div>

            <div>
              <p className="text-3xl sm:text-5xl font-black bg-gradient-to-r from-cyan-500 to-indigo-600 bg-clip-text text-transparent">
                94.2%
              </p>
              <p className="mt-2 text-xs sm:text-sm font-semibold text-slate-500 dark:text-slate-400 uppercase tracking-wider">
                Average Campus Attendance
              </p>
            </div>

            <div>
              <p className="text-3xl sm:text-5xl font-black bg-gradient-to-r from-indigo-600 to-purple-600 bg-clip-text text-transparent">
                82+
              </p>
              <p className="mt-2 text-xs sm:text-sm font-semibold text-slate-500 dark:text-slate-400 uppercase tracking-wider">
                Distinguished Faculty Members
              </p>
            </div>

            <div>
              <p className="text-3xl sm:text-5xl font-black bg-gradient-to-r from-purple-600 to-pink-500 bg-clip-text text-transparent">
                99.8%
              </p>
              <p className="mt-2 text-xs sm:text-sm font-semibold text-slate-500 dark:text-slate-400 uppercase tracking-wider">
                System Availability & Uptime
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* 7. Contact & Campus Information */}
      <section id="contact" className="py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-10 items-center">
            <div>
              <h2 className="text-xs font-bold uppercase tracking-wider text-blue-600 dark:text-blue-400">
                Contact & Support
              </h2>
              <p className="mt-2 text-3xl font-extrabold text-slate-900 dark:text-white">
                Smart University Administration & Campus Desk
              </p>
              <p className="mt-4 text-slate-600 dark:text-slate-300 text-sm leading-relaxed">
                Need technical assistance or wish to connect with academic advisory? Reach out through our official
                channels or visit our central campus offices.
              </p>

              <div className="mt-6 space-y-4">
                <div className="flex items-center space-x-3 text-sm text-slate-600 dark:text-slate-300">
                  <MapPin className="w-5 h-5 text-blue-500 flex-shrink-0" />
                  <span>University Administration Quad, 100 Smart Campus Boulevard, Tech City</span>
                </div>
                <div className="flex items-center space-x-3 text-sm text-slate-600 dark:text-slate-300">
                  <Mail className="w-5 h-5 text-cyan-500 flex-shrink-0" />
                  <span>support@smartuni.edu | registrar@smartuni.edu</span>
                </div>
                <div className="flex items-center space-x-3 text-sm text-slate-600 dark:text-slate-300">
                  <Phone className="w-5 h-5 text-indigo-500 flex-shrink-0" />
                  <span>+1 (555) 019-2831 / +1 (555) 019-2832</span>
                </div>
              </div>
            </div>

            {/* Quick Inquiry Form */}
            <div className="p-6 rounded-3xl glass-card border border-slate-200 dark:border-slate-800 shadow-xl">
              <h3 className="text-base font-bold text-slate-900 dark:text-white mb-4">Send a Direct Campus Inquiry</h3>
              <div className="space-y-3">
                <div>
                  <label className="text-xs font-medium text-slate-600 dark:text-slate-300">Your Full Name</label>
                  <input
                    type="text"
                    defaultValue="Prospective Student / Visitor"
                    className="mt-1 w-full px-3 py-2 rounded-xl border border-slate-200 dark:border-slate-700 bg-white/70 dark:bg-slate-900 text-xs focus:ring-2 focus:ring-blue-500 outline-none"
                  />
                </div>
                <div>
                  <label className="text-xs font-medium text-slate-600 dark:text-slate-300">Your Email Address</label>
                  <input
                    type="email"
                    defaultValue="inquiry@example.com"
                    className="mt-1 w-full px-3 py-2 rounded-xl border border-slate-200 dark:border-slate-700 bg-white/70 dark:bg-slate-900 text-xs focus:ring-2 focus:ring-blue-500 outline-none"
                  />
                </div>
                <div>
                  <label className="text-xs font-medium text-slate-600 dark:text-slate-300">Inquiry Message</label>
                  <textarea
                    rows={3}
                    defaultValue="Requesting information on 2026 undergraduate admissions and campus scholarship programs."
                    className="mt-1 w-full px-3 py-2 rounded-xl border border-slate-200 dark:border-slate-700 bg-white/70 dark:bg-slate-900 text-xs focus:ring-2 focus:ring-blue-500 outline-none"
                  />
                </div>
                <button
                  type="button"
                  onClick={() => alert('Thank you! Your campus inquiry has been received by the Admissions Cell.')}
                  className="w-full py-2.5 rounded-xl bg-blue-600 hover:bg-blue-700 text-white font-semibold text-xs shadow-md shadow-blue-500/25 transition-all"
                >
                  Submit Inquiry
                </button>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* 8. Footer */}
      <footer className="py-10 bg-slate-900 text-slate-400 text-xs border-t border-slate-800">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex flex-col md:flex-row items-center justify-between gap-4">
          <div className="flex items-center space-x-2 text-white font-bold text-sm">
            <GraduationCap className="w-5 h-5 text-blue-500" />
            <span>SMART UNIVERSITY</span>
          </div>
          <p>© 2026 Smart University Digital Transformation Platform. All rights reserved.</p>
          <div className="flex items-center space-x-6">
            <a href="#features" className="hover:text-white transition-colors">
              Academics
            </a>
            <a href="#transformation" className="hover:text-white transition-colors">
              Technology
            </a>
            <a href="#ai-portal" className="hover:text-white transition-colors">
              AI Assistant
            </a>
            <button
              onClick={() => {
                quickLogin('ADMINISTRATOR');
                onExploreDashboard();
              }}
              className="text-purple-400 hover:text-purple-300 transition-colors"
            >
              Admin Portal
            </button>
          </div>
        </div>
      </footer>
    </div>
  );
};
