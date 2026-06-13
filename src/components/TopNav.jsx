import React from 'react';
import { useSync } from '../contexts/SyncContext';
import { Activity, Bell } from 'lucide-react';
import { cn } from '../utils/cn';

export function TopNav() {
  const { activeRules } = useSync();

  return (
    <header className="h-20 bg-[#0A0D14] border-b border-[#1e2536] sticky top-0 z-10 flex items-center justify-between px-8">
      <div className="flex items-center gap-6">
        <h2 className="text-xl font-bold text-slate-100">Dashboard</h2>
        
        <div className="flex items-center gap-3 border-l border-[#1e2536] pl-6">
          <Activity className="w-4 h-4 text-[#4F46E5]" />
          <span className="text-sm text-slate-400 font-semibold tracking-wide">Active Sync Rules:</span>
          <div className="flex items-center gap-2">
            {activeRules.map(rule => (
              <span key={rule.id} className="badge badge-success">
                {rule.label}
              </span>
            ))}
          </div>
        </div>
      </div>

      <div className="flex items-center gap-4">
        <button className="btn-icon relative">
          <Bell className="w-5 h-5 text-slate-400 hover:text-slate-200" />
          <span className="absolute top-1.5 right-1.5 w-2 h-2 bg-rose-500 rounded-full border-2 border-[#0A0D14]"></span>
        </button>
        <div className="w-10 h-10 bg-[#4F46E5] rounded-xl flex items-center justify-center text-white text-sm font-bold cursor-pointer hover:bg-indigo-500 transition-colors">
          JD
        </div>
      </div>
    </header>
  );
}
