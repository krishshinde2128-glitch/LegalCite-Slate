import React, { useState } from 'react';
import { History, ShieldAlert, ShieldCheck, Download, AlertCircle } from 'lucide-react';
import { cn } from '../utils/cn';

export function DocumentEditor() {
  const [text, setText] = useState(`CONFIDENTIALITY AND NON-DISCLOSURE AGREEMENT

EFFECTIVE DATE: June 11, 2026
BETWEEN: TechCorp Solutions Inc. ("Disclosing Party") AND LegalCite Slate LLC ("Receiving Party")

1. Definition of Confidential Information
For purposes of this Agreement, "Confidential Information" shall include all information or material that has or could have commercial value or other utility in the business in which Disclosing Party is engaged. If Confidential Information is in written form, the Disclosing Party shall label or stamp the materials with the word "Confidential" or some similar warning.  

2. Exclusions from Confidential Information
Receiving Party's obligations under this Agreement do not extend to information that is: (a) publicly known at the time of disclosure or subsequently becomes publicly known through no fault of the Receiving Party; (b) discovered or created by the Receiving Party before disclosure by Disclosing Party.  

3. Obligations of Receiving Party
Receiving Party shall hold and maintain the Confidential Information in strictest confidence for the sole and exclusive benefit of the Disclosing Party. Receiving Party shall carefully restrict access to Confidential Information to employees, contractors, and third parties as is reasonably required.  

[Signature Block]  

John Doe, General Counsel
TechCorp Solutions Inc.`);
  const [history, setHistory] = useState([]);
  const [errors, setErrors] = useState(null);

  const handleSaveVersion = () => {
    if (!text.trim()) return;
    setHistory(prev => [{ id: Date.now(), text, timestamp: new Date().toLocaleTimeString() }, ...prev]);
  };

  const handleRestore = (historicalText) => {
    setText(historicalText);
    setErrors(null);
  };

  const handleScan = () => {
    const lines = text.split('\n');
    let foundErrors = [];

    lines.forEach((line, index) => {
      const lineNum = index + 1;
      if (line.includes('[') || line.includes(']')) {
        foundErrors.push({ line: lineNum, message: 'Unresolved bracket [ ] found', snippet: line.trim() });
      }
      const quoteCount = (line.match(/"/g) || []).length;
      if (quoteCount % 2 !== 0) {
        foundErrors.push({ line: lineNum, message: 'Unmatched quotation mark', snippet: line.trim() });
      }
    });

    setErrors(foundErrors.length > 0 ? foundErrors : []);
  };

  const handleExport = () => {
    const blob = new Blob([text], { type: 'text/plain' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = 'document_export.txt';
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
    URL.revokeObjectURL(url);
  };

  return (
    <div className="ui-panel mb-6 flex flex-col md:flex-row overflow-hidden min-h-[500px] p-0 gap-0">
      
      {/* Editor Section */}
      <div className="flex-1 p-6 flex flex-col">
        <div className="flex items-center justify-between mb-4">
          <h3 className="text-lg font-bold text-slate-100">Document Editor</h3>
          <div className="flex items-center gap-3">
            <button onClick={handleSaveVersion} className="btn-secondary">
              Save Snapshot
            </button>
            <button onClick={handleScan} className="btn-primary">
              <ShieldAlert className="w-4 h-4" /> Run Scanner
            </button>
            <button onClick={handleExport} className="btn-success">
              <Download className="w-4 h-4" /> Export
            </button>
          </div>
        </div>
        
        <textarea 
          value={text}
          onChange={(e) => {
            setText(e.target.value);
            if (errors) setErrors(null);
          }}
          className="flex-1 resize-none font-mono text-sm text-slate-400 bg-[#0B0F19] border border-[#1e2536] rounded-xl p-4 focus:outline-none focus:border-[#4F46E5] transition-all"
          placeholder="Enter document text here..."
        />

        {/* Scanner Results */}
        {errors !== null && (
          <div className={cn("mt-4 p-4 rounded-xl border flex items-center gap-3", 
            errors.length > 0 ? "bg-[#7f1d1d]/10 border-[#7f1d1d]/30" : "bg-[#064e3b]/30 border-[#064e3b]/50"
          )}>
            {errors.length > 0 ? (
              <div className="w-full">
                <h4 className="flex items-center gap-2 text-sm font-bold text-rose-400 mb-3">
                  <AlertCircle className="w-5 h-5" /> Scanner found {errors.length} error(s)
                </h4>
                <ul className="space-y-2 max-h-32 overflow-y-auto pr-2 custom-scrollbar">
                  {errors.map((err, i) => (
                    <li key={i} className="text-xs flex flex-col gap-1 bg-[#0A0D14] p-3 rounded-lg border border-rose-500/10">
                      <span className="font-semibold text-rose-400">Line {err.line}: {err.message}</span>
                      <span className="font-mono text-slate-500 truncate">"{err.snippet}"</span>
                    </li>
                  ))}
                </ul>
              </div>
            ) : (
              <h4 className="flex items-center gap-2 text-sm font-bold text-emerald-400">
                <ShieldCheck className="w-4 h-4" /> Document is clean! No formatting issues found.
              </h4>
            )}
          </div>
        )}
      </div>

      {/* History Panel */}
      <div className="w-full md:w-64 bg-[#0B0F19]/50 border-t md:border-t-0 md:border-l border-[#1e2536] p-6 overflow-y-auto">
        <h4 className="text-[11px] font-bold text-slate-400 mb-6 flex items-center gap-2 tracking-widest uppercase">
          <History className="w-3.5 h-3.5 text-slate-500" /> Version History
        </h4>
        {history.length === 0 ? (
          <p className="text-xs text-slate-500 font-medium text-center mt-10">No snapshots saved yet.</p>
        ) : (
          <ul className="space-y-3">
            {history.map((item) => (
              <li key={item.id} className="bg-[#121622] border border-[#1e2536] p-4 rounded-xl group hover:border-[#4F46E5] transition-colors">
                <div className="text-[10px] font-bold text-slate-500 mb-3 uppercase tracking-wider">
                  {item.timestamp}
                </div>
                <button 
                  onClick={() => handleRestore(item.text)}
                  className="text-xs font-bold text-slate-300 hover:text-white transition-colors w-full text-left"
                >
                  Restore Version
                </button>
              </li>
            ))}
          </ul>
        )}
      </div>

    </div>
  );
}

