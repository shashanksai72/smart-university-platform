// API Service Client for Smart University Backend

const API_BASE_URL = (import.meta as any).env?.VITE_API_URL || 'http://localhost:5000/api';

export const apiClient = {
  async getHealth() {
    try {
      const res = await fetch(`${API_BASE_URL}/health`);
      if (res.ok) return await res.json();
    } catch (e) {
      // Backend not running, run in pure offline demo mode
    }
    return { status: 'DEMO_MODE', databaseConnected: false };
  },

  async askAI(message: string, role = 'STUDENT', userContext: any = {}) {
    try {
      const res = await fetch(`${API_BASE_URL}/ai/chat`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ message, role, userContext }),
      });
      if (res.ok) return await res.json();
    } catch (e) {
      console.warn('API fetch failed, falling back to client intelligence:', e);
    }

    // Client-side instant knowledge base fallback
    return {
      reply: `Athena (Campus AI): Regarding "${message}" — As of today, your attendance is 94.2% across your 4 active courses, with CS501 Mid-term exam scheduled for Nov 20. Your next fee installment has a balance of $250.00. How else may I assist you with your campus queries?`,
      source: 'client-offline-engine',
      timestamp: new Date().toISOString(),
    };
  },
};
