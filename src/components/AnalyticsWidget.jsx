import React, { useMemo } from 'react';
import { FileText, Layers, Activity } from 'lucide-react';
import { cn } from '../utils/cn';

export function AnalyticsWidget({ documents }) {
  const stats = useMemo(() => {
    const queueCount = documents.filter(d => d.status === 'queue').length;
    const totalPages = documents.reduce((sum, d) => sum + d.pages, 0);
    const avgHealth = documents.length > 0 
      ? Math.round(documents.reduce((sum, d) => sum + d.clarity, 0) / documents.length)
      : 0;
    
    let healthColor = 'text-slate-600';
    if (avgHealth >= 80) healthColor = 'text-emerald-500';
    else if (avgHealth >= 50) healthColor = 'text-yellow-500';
    else if (avgHealth > 0) healthColor = 'text-rose-500';

    return { queueCount, totalPages, avgHealth, healthColor };
  }, [documents]);

  return (
    <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-6">
      <div className="ui-panel flex items-center gap-5">
        <div className="w-12 h-12 rounded-xl bg-[#1e2536]/50 flex items-center justify-center text-[#4F46E5]">
          <FileText className="w-6 h-6" />
        </div>
        <div>
          <p className="text-[13px] font-semibold text-slate-400 mb-1">Documents in Queue</p>
          <h3 className="text-2xl font-bold text-slate-100 tracking-tight">{stats.queueCount}</h3>
        </div>
      </div>

      <div className="ui-panel flex items-center gap-5">
        <div className="w-12 h-12 rounded-xl bg-[#1e2536]/50 flex items-center justify-center text-blue-500">
          <Layers className="w-6 h-6" />
        </div>
        <div>
          <p className="text-[13px] font-semibold text-slate-400 mb-1">Total Pages Scanned</p>
          <h3 className="text-2xl font-bold text-slate-100 tracking-tight">{stats.totalPages}</h3>
        </div>
      </div>

      <div className="ui-panel flex items-center gap-5">
        <div className="w-12 h-12 rounded-xl bg-[#059669]/10 flex items-center justify-center text-[#059669]">
          <Activity className="w-6 h-6" />
        </div>
        <div>
          <p className="text-[13px] font-semibold text-slate-400 mb-1">Average OCR Health</p>
          <h3 className="text-2xl font-bold text-yellow-500 tracking-tight">
            {stats.avgHealth > 0 ? `${stats.avgHealth}%` : '--'}
          </h3>
        </div>
      </div>
    </div>
  );
}
