import React, { useState } from 'react';
import { Check, X, FileText } from 'lucide-react';
import { cn } from '../utils/cn';

export function ReviewQueue({ documents, onReview }) {
  const queueDocs = documents.filter(d => d.status === 'queue');
  const [animatingId, setAnimatingId] = useState(null);

  const handleReview = (id, action) => {
    setAnimatingId(id);
    setTimeout(() => {
      onReview(id, action);
      setAnimatingId(null);
    }, 400); // Wait for animation
  };

  return (
    <div className="ui-panel mb-6">
      <h3 className="text-lg font-bold text-slate-100 mb-6">Review Pipeline</h3>
      
      <div className="space-y-3">
        {queueDocs.length === 0 ? (
          <p className="text-xs text-slate-500 font-semibold text-center py-6 bg-[#0B0F19] border border-[#1e2536] rounded-xl">No documents pending review.</p>
        ) : (
          queueDocs.map(doc => (
            <div 
              key={doc.id} 
              className={cn(
                "p-4 bg-[#0B0F19] border border-[#1e2536] rounded-xl flex items-center justify-between transition-all duration-400 ease-in-out group hover:border-[#4F46E5]/50",
                animatingId === doc.id ? "opacity-0 translate-x-8 scale-95" : "opacity-100 translate-x-0 scale-100"
              )}
            >
              <div className="flex items-center gap-4 min-w-0">
                <div className="p-2.5 bg-[#1e2536]/50 rounded-lg text-[#4F46E5] border border-[#1e2536] shrink-0">
                  <FileText className="w-4 h-4" />
                </div>
                <div className="min-w-0">
                  <h4 className="text-[13px] font-bold text-slate-200 group-hover:text-slate-100 transition-colors truncate">{doc.name}</h4>
                  <p className="text-[11px] text-slate-500 mt-1">{doc.pages} pages • OCR: <span className="font-bold text-slate-400">{doc.clarity}%</span></p>
                </div>
              </div>
              
              <div className="flex items-center gap-3 shrink-0 ml-4">
                <button 
                  onClick={() => handleReview(doc.id, 'reject')}
                  className="text-rose-500 hover:text-rose-400 transition-colors hover:scale-110"
                >
                  <X className="w-4 h-4" />
                </button>
                <button 
                  onClick={() => handleReview(doc.id, 'approve')}
                  className="text-emerald-500 hover:text-emerald-400 transition-colors hover:scale-110"
                >
                  <Check className="w-4 h-4" />
                </button>
              </div>
            </div>
          ))
        )}
      </div>
    </div>
  );
}
