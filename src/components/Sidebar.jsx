import React from 'react';
import { BookOpen, Folder, Scale, Settings, Users, Tags } from 'lucide-react';
import { cn } from '../utils/cn';

export function Sidebar() {
  const categories = [
    { name: 'Contracts', icon: BookOpen, count: 12 },
    { name: 'NDAs', icon: Folder, count: 5 },
    { name: 'Litigation', icon: Scale, count: 8 },
    { name: 'Internal', icon: Users, count: 3 },
  ];

  return (
    <aside className="w-[280px] bg-[#0A0D14] border-r border-[#1e2536] flex flex-col h-screen fixed top-0 left-0 z-20">
      <div className="p-6 border-b border-[#1e2536]">
        <div className="flex items-center gap-3">
          <div className="p-2 bg-[#121622] rounded-lg border border-[#1e2536]">
            <Scale className="text-[#4F46E5] w-5 h-5" />
          </div>
          <div>
            <h1 className="font-bold text-lg tracking-tight text-slate-100">LegalCite Slate</h1>
            <p className="text-[10px] text-slate-500 font-semibold tracking-widest uppercase mt-0.5">v2.4.0-beta</p>
          </div>
        </div>
      </div>

      <div className="p-6 flex-1 overflow-y-auto">
        <h2 className="text-[11px] font-bold text-slate-500 uppercase tracking-widest mb-4 flex items-center gap-2">
          <Tags className="w-3.5 h-3.5" /> Legal Word Organizer
        </h2>
        <ul className="space-y-1">
          {categories.map((category) => (
            <li key={category.name}>
              <button className="w-full flex items-center justify-between px-3 py-2.5 rounded-lg text-slate-400 hover:text-slate-200 hover:bg-[#121622] transition-colors group">
                <div className="flex items-center gap-3 text-sm font-semibold">
                  <category.icon className="w-4 h-4 text-slate-500 group-hover:text-slate-300 transition-colors" />
                  {category.name}
                </div>
                <span className="text-xs text-slate-300 font-bold group-hover:text-white transition-colors">
                  {category.count}
                </span>
              </button>
            </li>
          ))}
        </ul>
      </div>

      <div className="p-4 border-t border-[#1e2536]">
        <button className="flex items-center gap-3 text-slate-400 hover:text-slate-200 transition-colors text-sm px-3 py-2 w-full rounded-lg hover:bg-[#121622] font-semibold">
          <Settings className="w-4 h-4" />
          Settings
        </button>
      </div>
    </aside>
  );
}
