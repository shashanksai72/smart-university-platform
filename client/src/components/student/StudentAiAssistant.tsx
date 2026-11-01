import React, { useState, useRef, useEffect } from 'react';
import { Bot, Send, Sparkles, User, RefreshCw, Copy, Check, Info } from 'lucide-react';
import { useAuth } from '../../context/AuthContext';
import { apiClient } from '../../services/api';

interface ChatMessage {
  id: string;
  sender: 'user' | 'assistant';
  text: string;
  timestamp: string;
  source?: string;
}

export const StudentAiAssistant: React.FC = () => {
  const { user } = useAuth();
  const [messages, setMessages] = useState<ChatMessage[]>([
    {
      id: 'init-1',
      sender: 'assistant',
      text: `Hello ${user?.fullName || 'Marcus'}! I am **Athena**, your Smart University AI Assistant.

I can provide instant real-time answers regarding:
- **Attendance standing** and the mandatory 75% examination threshold
- **Class schedules & venue locations** for today or the week
- **Upcoming mid-semester & practical examination dates**
- **Pending fee invoices** and simulated clearance
- **Library catalogue searches** and book due dates

What can I assist you with today?`,
      timestamp: 'Just now',
      source: 'Campus Knowledge Engine',
    },
  ]);
  const [input, setInput] = useState('');
  const [loading, setLoading] = useState(false);
  const [copiedId, setCopiedId] = useState<string | null>(null);

  const messagesEndRef = useRef<HTMLDivElement>(null);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages, loading]);

  const handleSend = async (queryText?: string) => {
    const textToSend = queryText || input;
    if (!textToSend.trim() || loading) return;

    const userMsg: ChatMessage = {
      id: `msg-${Date.now()}`,
      sender: 'user',
      text: textToSend.trim(),
      timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
    };

    setMessages(prev => [...prev, userMsg]);
    setInput('');
    setLoading(true);

    try {
      const response = await apiClient.askAI(textToSend, user?.role || 'STUDENT', {
        fullName: user?.fullName,
        studentId: user?.studentId,
        department: user?.department,
        cgpa: user?.cgpa,
        attendanceRate: user?.attendanceRate,
      });

      const aiMsg: ChatMessage = {
        id: `ai-${Date.now()}`,
        sender: 'assistant',
        text: response.reply,
        timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
        source: response.source === 'gemini-1.5-flash' ? 'Google Gemini 1.5 Flash' : 'Smart Campus Knowledge Engine',
      };

      setMessages(prev => [...prev, aiMsg]);
    } catch (err) {
      setMessages(prev => [
        ...prev,
        {
          id: `ai-err-${Date.now()}`,
          sender: 'assistant',
          text: 'Athena could not reach the server right now. Please check that the server is running on port 5000.',
          timestamp: 'Just now',
          source: 'Error Handler',
        },
      ]);
    } finally {
      setLoading(false);
    }
  };

  const handleCopy = (id: string, text: string) => {
    navigator.clipboard.writeText(text);
    setCopiedId(id);
    setTimeout(() => setCopiedId(null), 2000);
  };

  const suggestedQuestions = [
    'What is my current attendance percentage?',
    'When is my next examination scheduled?',
    'What classes do I have today?',
    'How do I clear my pending semester fees?',
    'Explain the university CGPA grading scale',
  ];

  return (
    <div className="space-y-4 max-w-4xl mx-auto flex flex-col h-[calc(100vh-8rem)]">
      {/* AI Header Card */}
      <div className="p-4 sm:p-5 rounded-3xl glass-card border border-slate-200 dark:border-slate-800 flex items-center justify-between">
        <div className="flex items-center space-x-3">
          <div className="w-10 h-10 rounded-2xl bg-gradient-to-tr from-cyan-500 to-blue-600 text-white flex items-center justify-center shadow-md shadow-cyan-500/20">
            <Bot className="w-6 h-6" />
          </div>
          <div>
            <div className="flex items-center space-x-2">
              <h2 className="text-base font-bold text-slate-900 dark:text-white">Athena University Assistant</h2>
              <span className="text-[10px] font-bold px-2 py-0.5 rounded-full bg-emerald-100 dark:bg-emerald-950/60 text-emerald-700 dark:text-emerald-300">
                Online
              </span>
            </div>
            <p className="text-[11px] text-slate-500 dark:text-slate-400">
              Institutional AI Engine • Configurable with Google Gemini API
            </p>
          </div>
        </div>

        <button
          onClick={() =>
            setMessages([
              {
                id: 'init-fresh',
                sender: 'assistant',
                text: `Conversation restarted. How can I assist you today, ${user?.fullName}?`,
                timestamp: 'Just now',
                source: 'Campus Knowledge Engine',
              },
            ])
          }
          className="p-2 rounded-xl text-slate-400 hover:text-slate-600 dark:hover:text-slate-200 hover:bg-slate-100 dark:hover:bg-slate-800 transition-colors"
          title="Restart Conversation"
        >
          <RefreshCw className="w-4 h-4" />
        </button>
      </div>

      {/* Messages Scroll Area */}
      <div className="flex-1 overflow-y-auto p-4 rounded-3xl glass-card border border-slate-200 dark:border-slate-800 space-y-4">
        {messages.map(m => (
          <div
            key={m.id}
            className={`flex items-start gap-3 ${m.sender === 'user' ? 'flex-row-reverse' : 'flex-row'}`}
          >
            <div
              className={`w-8 h-8 rounded-full flex items-center justify-center flex-shrink-0 text-white text-xs ${
                m.sender === 'user' ? 'bg-blue-600' : 'bg-gradient-to-tr from-cyan-500 to-blue-600'
              }`}
            >
              {m.sender === 'user' ? <User className="w-4 h-4" /> : <Bot className="w-4 h-4" />}
            </div>

            <div
              className={`max-w-[85%] sm:max-w-[75%] rounded-2xl p-4 text-xs leading-relaxed ${
                m.sender === 'user'
                  ? 'bg-blue-600 text-white shadow-md shadow-blue-500/20'
                  : 'bg-slate-100/90 dark:bg-slate-900/80 text-slate-800 dark:text-slate-100 border border-slate-200/80 dark:border-slate-800'
              }`}
            >
              <div className="whitespace-pre-wrap font-sans">{m.text}</div>

              <div
                className={`mt-2 pt-1.5 flex items-center justify-between text-[10px] ${
                  m.sender === 'user' ? 'text-blue-100' : 'text-slate-400'
                }`}
              >
                <span>{m.timestamp}</span>
                {m.source && <span className="font-mono text-[9px] ml-2">via {m.source}</span>}

                {m.sender === 'assistant' && (
                  <button
                    onClick={() => handleCopy(m.id, m.text)}
                    className="ml-2 hover:text-blue-500 transition-colors"
                    title="Copy message"
                  >
                    {copiedId === m.id ? <Check className="w-3 h-3 text-emerald-500" /> : <Copy className="w-3 h-3" />}
                  </button>
                )}
              </div>
            </div>
          </div>
        ))}

        {loading && (
          <div className="flex items-center space-x-3 text-xs text-slate-500 dark:text-slate-400 pl-2 animate-pulse">
            <div className="w-8 h-8 rounded-full bg-cyan-500/20 text-cyan-600 flex items-center justify-center">
              <Sparkles className="w-4 h-4 animate-spin" />
            </div>
            <span>Athena is checking institutional records...</span>
          </div>
        )}

        <div ref={messagesEndRef} />
      </div>

      {/* Suggested Questions Chips */}
      <div className="flex items-center space-x-2 overflow-x-auto pb-1 text-xs">
        <span className="text-[10px] uppercase font-bold text-slate-400 whitespace-nowrap">Suggested:</span>
        {suggestedQuestions.map((q, i) => (
          <button
            key={i}
            onClick={() => handleSend(q)}
            className="px-3 py-1 rounded-full bg-slate-100 dark:bg-slate-800/80 hover:bg-blue-50 dark:hover:bg-blue-900/40 hover:text-blue-600 dark:hover:text-blue-400 border border-slate-200 dark:border-slate-700 text-slate-600 dark:text-slate-300 text-[11px] font-medium whitespace-nowrap transition-all"
          >
            {q}
          </button>
        ))}
      </div>

      {/* Chat Input Bar */}
      <form
        onSubmit={e => {
          e.preventDefault();
          handleSend();
        }}
        className="flex items-center space-x-2"
      >
        <input
          type="text"
          value={input}
          onChange={e => setInput(e.target.value)}
          placeholder="Ask Athena about timetable, exams, fees, library, attendance..."
          disabled={loading}
          className="flex-1 px-4 py-3 rounded-2xl border border-slate-200 dark:border-slate-700 bg-white/80 dark:bg-slate-900 text-xs focus:ring-2 focus:ring-blue-500 outline-none shadow-sm"
        />
        <button
          type="submit"
          disabled={loading || !input.trim()}
          className="p-3 rounded-2xl bg-gradient-to-r from-blue-600 to-cyan-500 hover:from-blue-700 hover:to-cyan-600 disabled:opacity-50 text-white shadow-md shadow-blue-500/25 transition-all"
        >
          <Send className="w-4 h-4" />
        </button>
      </form>
    </div>
  );
};
