import React, { useState, useMemo } from 'react';
import { ArrowUpDown, ArrowUp, ArrowDown } from 'lucide-react';
import { cn } from '../utils/cn';

export function ClaritySorter({ documents }) {
  const [sortConfig, setSortConfig] = useState({ key: 'uploadedAt', direction: 'desc' });

  const sortedDocuments = useMemo(() => {
    let sortableItems = [...documents];
    if (sortConfig !== null) {
      sortableItems.sort((a, b) => {
        if (a[sortConfig.key] < b[sortConfig.key]) {
          return sortConfig.direction === 'asc' ? -1 : 1;
        }
        if (a[sortConfig.key] > b[sortConfig.key]) {
          return sortConfig.direction === 'asc' ? 1 : -1;
        }
        return 0;
      });
    }
    return sortableItems;
  }, [documents, sortConfig]);

  const requestSort = (key) => {
    let direction = 'asc';
    if (sortConfig.key === key && sortConfig.direction === 'asc') {
      direction = 'desc';
    }
    setSortConfig({ key, direction });
  };

  const getSortIcon = (columnName) => {
    if (sortConfig.key !== columnName) return <ArrowUpDown className="w-3 h-3 ml-1 opacity-40" />;
    return sortConfig.direction === 'asc' 
      ? <ArrowUp className="w-3 h-3 ml-1 text-indigo-500" /> 
      : <ArrowDown className="w-3 h-3 ml-1 text-indigo-500" />;
  };

  const getClarityBadge = (clarity) => {
    if (clarity >= 90) return "badge-success";
    if (clarity >= 70) return "badge-warning";
    return "badge-danger";
  };

  return (
    <div className="ui-panel mb-6">
      <h3 className="text-lg font-bold text-slate-100 mb-6">Clarity Sorter (OCR Health)</h3>
      
      <div className="overflow-x-auto">
        <table className="w-full text-left border-collapse">
          <thead>
            <tr className="border-b border-[#1e2536] text-[11px] uppercase tracking-widest text-slate-500 font-bold">
              <th className="py-4 font-bold cursor-pointer hover:text-slate-300 transition-colors" onClick={() => handleSort('name')}>
                Document Name {sortConfig.key === 'name' && (sortConfig.direction === 'asc' ? '↑' : '↓')}
              </th>
              <th className="py-4 font-bold cursor-pointer hover:text-slate-300 transition-colors w-24" onClick={() => handleSort('pages')}>
                Pages {sortConfig.key === 'pages' && (sortConfig.direction === 'asc' ? '↑' : '↓')}
              </th>
              <th className="py-4 font-bold cursor-pointer hover:text-slate-300 transition-colors w-32" onClick={() => handleSort('clarity')}>
                Clarity Score {sortConfig.key === 'clarity' && (sortConfig.direction === 'asc' ? '↑' : '↓')}
              </th>
            </tr>
          </thead>
          <tbody>
            {sortedDocuments.map((doc) => (
              <tr key={doc.id} className="border-b border-[#1e2536] hover:bg-[#1e2536]/20 transition-colors group">
                <td className="py-4">
                  <div className="flex items-center gap-3">
                    <span className="font-bold text-[13px] text-slate-300 group-hover:text-slate-100 transition-colors">
                      {doc.name}
                    </span>
                  </div>
                </td>
                <td className="py-4 text-[13px] text-slate-400">{doc.pages}</td>
                <td className="py-4">
                  <div className={cn("badge", getClarityBadge(doc.clarity))}>
                    {doc.clarity}%
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}
