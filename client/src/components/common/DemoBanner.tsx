import React, { useState } from 'react';
import { Sparkles, X, Shield, ArrowRight } from 'lucide-react';
import { useAuth } from '../../context/AuthContext';
import { UserRole } from '../../types';

export const DemoBanner: React.FC = () => {
  const { role, quickLogin } = useAuth();
  const [dismissed, setDismissed] = useState(false);

  if (dismissed) return null;

  return (
    <div className="bg-gradient-to-r from-blue-700 via-indigo-700 to-cyan-700 text-white text-xs px-4 py-2 border-b border-white/10 shadow-sm relative z-30">
      <div className="max-w-7xl mx-auto flex flex-col sm:flex-row items-center justify-between gap-2">
        <div className="flex items-center space-x-2 text-center sm:text-left">
          <Sparkles className="w-4 h-4 text-cyan-300 flex-shrink-0 animate-pulse" />
          <span>
            <strong>SMART UNIVERSITY PLATFORM:</strong> All modules active with sample university data. Switch personas:
          </span>
        </div>

        <div className="flex items-center space-x-2">
          <button
            onClick={() => quickLogin('STUDENT')}
            className={`px-2.5 py-0.5 rounded-full font-bold transition-all ${
              role === 'STUDENT' ? 'bg-white text-blue-800 shadow-sm' : 'bg-white/20 hover:bg-white/30 text-white'
            }`}
          >
            Student
          </button>
          <button
            onClick={() => quickLogin('FACULTY')}
            className={`px-2.5 py-0.5 rounded-full font-bold transition-all ${
              role === 'FACULTY' ? 'bg-white text-amber-800 shadow-sm' : 'bg-white/20 hover:bg-white/30 text-white'
            }`}
          >
            Faculty
          </button>
          <button
            onClick={() => quickLogin('ADMINISTRATOR')}
            className={`px-2.5 py-0.5 rounded-full font-bold transition-all ${
              role === 'ADMINISTRATOR' ? 'bg-white text-purple-800 shadow-sm' : 'bg-white/20 hover:bg-white/30 text-white'
            }`}
          >
            Admin
          </button>

          <button
            onClick={() => setDismissed(true)}
            className="p-1 rounded-full text-white/70 hover:text-white hover:bg-white/10 ml-2"
            title="Dismiss notice"
          >
            <X className="w-3.5 h-3.5" />
          </button>
        </div>
      </div>
    </div>
  );
};
