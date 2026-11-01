import React, { useState, useEffect } from 'react';
import { Settings, Database, Sparkles, Shield, CheckCircle2, Server, Key, Copy, Check } from 'lucide-react';
import { apiClient } from '../../services/api';

export const AdminSettings: React.FC = () => {
  const [serverHealth, setServerHealth] = useState<any>(null);
  const [copiedSql, setCopiedSql] = useState(false);

  useEffect(() => {
    apiClient.getHealth().then(res => setServerHealth(res));
  }, []);

  const handleCopySchemaPath = () => {
    navigator.clipboard.writeText('supabase/schema.sql and supabase/seed.sql');
    setCopiedSql(true);
    setTimeout(() => setCopiedSql(false), 2000);
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="p-6 sm:p-8 rounded-3xl glass-card border border-slate-200 dark:border-slate-800">
        <div className="inline-flex items-center space-x-2 px-3 py-1 rounded-full bg-slate-100 dark:bg-slate-800 text-slate-700 dark:text-slate-300 text-xs font-semibold mb-2">
          <Settings className="w-3.5 h-3.5" />
          <span>System Environment & Infrastructure</span>
        </div>
        <h2 className="text-2xl font-black text-slate-900 dark:text-white">Configuration & Database Setup</h2>
        <p className="text-xs text-slate-500 dark:text-slate-400 mt-1 max-w-xl">
          Connect your live Supabase PostgreSQL database, configure Google Gemini API credentials, or manage demo mode.
        </p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Supabase Connection Guide */}
        <div className="p-6 rounded-3xl glass-card border border-slate-200 dark:border-slate-800 space-y-4">
          <div className="flex items-center space-x-3 text-emerald-600 dark:text-emerald-400">
            <Database className="w-5 h-5" />
            <h3 className="text-base font-bold text-slate-900 dark:text-white">Supabase PostgreSQL Integration</h3>
          </div>

          <p className="text-xs text-slate-600 dark:text-slate-300 leading-relaxed">
            The platform comes with a complete production SQL schema containing all <strong>21 PostgreSQL tables</strong>,
            Row Level Security (RLS) policies, foreign keys, and seed records in{' '}
            <code className="text-blue-600 font-mono text-[11px]">supabase/schema.sql</code>.
          </p>

          <div className="p-4 rounded-2xl bg-slate-100 dark:bg-slate-900/60 border border-slate-200 dark:border-slate-800 space-y-2 text-xs">
            <p className="font-bold text-slate-800 dark:text-slate-100">Quick 3-Step Supabase Activation:</p>
            <ol className="list-decimal list-inside space-y-1.5 text-slate-600 dark:text-slate-400 text-[11px]">
              <li>Create a free project at <span className="text-blue-500">supabase.com</span></li>
              <li>Go to <strong>SQL Editor</strong> & paste the contents of <span className="font-mono text-blue-600">supabase/schema.sql</span></li>
              <li>Paste your <span className="font-mono">VITE_SUPABASE_URL</span> and <span className="font-mono">VITE_SUPABASE_ANON_KEY</span> into <span className="font-mono">.env</span></li>
            </ol>
          </div>

          <button
            onClick={handleCopySchemaPath}
            className="w-full py-2.5 rounded-xl border border-slate-200 dark:border-slate-700 hover:bg-slate-100 dark:hover:bg-slate-800 text-xs font-semibold text-slate-700 dark:text-slate-200 flex items-center justify-center space-x-1.5 transition-all"
          >
            {copiedSql ? <Check className="w-4 h-4 text-emerald-500" /> : <Copy className="w-4 h-4" />}
            <span>{copiedSql ? 'SQL Script Path Copied!' : 'Copy SQL Schema Path'}</span>
          </button>
        </div>

        {/* AI Engine Configuration */}
        <div className="p-6 rounded-3xl glass-card border border-slate-200 dark:border-slate-800 space-y-4">
          <div className="flex items-center space-x-3 text-cyan-600 dark:text-cyan-400">
            <Sparkles className="w-5 h-5" />
            <h3 className="text-base font-bold text-slate-900 dark:text-white">Athena AI Assistant Integration</h3>
          </div>

          <p className="text-xs text-slate-600 dark:text-slate-300 leading-relaxed">
            The platform includes an intelligent built-in university knowledge engine that answers all questions right out of
            the box. To enable live multimodal generative intelligence with Google Gemini:
          </p>

          <div className="p-4 rounded-2xl bg-slate-100 dark:bg-slate-900/60 border border-slate-200 dark:border-slate-800 space-y-2 text-xs">
            <p className="font-bold text-slate-800 dark:text-slate-100">Adding your Gemini API Key:</p>
            <p className="text-[11px] text-slate-500">
              Open <code className="font-mono text-blue-600">.env</code> in your root folder and set:
            </p>
            <pre className="p-2.5 rounded-xl bg-slate-900 text-emerald-400 font-mono text-[10px] overflow-x-auto">
              GEMINI_API_KEY=AIzaSy...your-actual-api-key
            </pre>
          </div>

          <div className="p-3 rounded-2xl bg-cyan-50 dark:bg-cyan-950/40 border border-cyan-200 dark:border-cyan-900 text-cyan-800 dark:text-cyan-300 text-[11px]">
            <strong>No hardcoded keys:</strong> All credentials remain safely in your private environment file.
          </div>
        </div>
      </div>
    </div>
  );
};
