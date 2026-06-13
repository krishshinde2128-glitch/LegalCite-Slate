import React, { useState, useRef, useEffect } from 'react';
import { Search, Loader2, CheckCircle, XCircle, X } from 'lucide-react';
import { cn } from '../utils/cn';

const SUGGESTIONS = [
  { code: 'FRCP-1', description: 'Scope and Purpose: Just, speedy, and inexpensive determination of every action.' },
  { code: 'FRCP-3', description: 'Commencing an Action' },
  { code: 'FRCP-4', description: 'Summons: Service of Process' },
  { code: 'SEC-90', description: 'Regulation S: Rules governing offers and sales made outside the United States' },
];

export function SmartSearch() {
  const [selectedCodes, setSelectedCodes] = useState([]);
  const [query, setQuery] = useState('');
  const [status, setStatus] = useState('idle');
  const [showSuggestions, setShowSuggestions] = useState(false);
  const wrapperRef = useRef(null);

  const filteredSuggestions = SUGGESTIONS.filter(item => 
    !selectedCodes.includes(item.code) &&
    (item.code.toLowerCase().includes(query.toLowerCase()) || 
    item.description.toLowerCase().includes(query.toLowerCase()))
  );

  useEffect(() => {
    function handleClickOutside(event) {
      if (wrapperRef.current && !wrapperRef.current.contains(event.target)) {
        setShowSuggestions(false);
      }
    }
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  const handleVerify = () => {
    if (selectedCodes.length === 0 && !query.trim()) return;
    setStatus('loading');
    setShowSuggestions(false);
    
    setTimeout(() => {
      // For mock purposes: valid if any of the selected codes match our predefined ones,
      // or if they manually typed SEC/FRC
      const codesToCheck = [...selectedCodes];
      if (query.trim()) codesToCheck.push(query.trim());

      const isValid = codesToCheck.every(code => 
        SUGGESTIONS.some(item => item.code.toLowerCase() === code.toLowerCase()) || 
        code.toUpperCase().includes('SEC') || 
        code.toUpperCase().includes('FRC')
      );

      if (isValid && codesToCheck.length > 0) {
        setStatus('valid');
      } else {
        setStatus('invalid');
      }
    }, 1500);
  };

  const selectSuggestion = (code) => {
    if (!selectedCodes.includes(code)) {
      setSelectedCodes([...selectedCodes, code]);
    }
    setQuery('');
    setShowSuggestions(false);
    if (status !== 'idle') setStatus('idle');
  };

  const removeCode = (codeToRemove) => {
    setSelectedCodes(selectedCodes.filter(code => code !== codeToRemove));
    if (status !== 'idle') setStatus('idle');
  };

  const handleKeyDown = (e) => {
    if (e.key === 'Backspace' && query === '' && selectedCodes.length > 0) {
      removeCode(selectedCodes[selectedCodes.length - 1]);
    }
  };

  const handleSearch = (e) => {
    e.preventDefault();
    handleVerify();
  };

  return (
    <div className="ui-panel mb-6 relative z-10">
      <h3 className="text-lg font-bold text-slate-100 mb-6 flex items-center gap-3">
        <div className="p-2 bg-[#1e2536]/50 rounded-lg border border-[#1e2536]">
          <Search className="w-4 h-4 text-[#4F46E5]" />
        </div>
        Code Validator
      </h3>
      
      <form onSubmit={handleSearch} className="flex items-center gap-3 relative">
        <div className="relative flex-1 group">
          <input 
            type="text" 
            className="input-field w-full pl-4" 
            placeholder="e.g. FRC-2024, SEC-90"
            value={query}
            onChange={(e) => {
              setQuery(e.target.value);
              setShowSuggestions(true);
            }}
            onFocus={() => setShowSuggestions(true)}
            onKeyDown={handleKeyDown}
          />

          {showSuggestions && filteredSuggestions.length > 0 && (
            <div className="absolute top-full left-0 w-full mt-2 bg-[#121622] border border-[#1e2536] rounded-xl shadow-2xl overflow-hidden z-20">
              <div className="px-3 py-2 border-b border-[#1e2536] bg-[#0A0D14]">
                <span className="text-[10px] font-bold text-slate-500 uppercase tracking-widest">Suggestions</span>
              </div>
              <ul className="py-2 max-h-48 overflow-y-auto">
                {filteredSuggestions.map((item) => (
                  <li 
                    key={item.code}
                    onClick={() => selectSuggestion(item.code)}
                    className="px-4 py-3 cursor-pointer transition-all hover:bg-[#1e2536] text-left"
                  >
                    <div className="font-bold text-slate-200 text-sm">{item.code}</div>
                    <div className="text-xs text-slate-400 mt-1 truncate">{item.description}</div>
                  </li>
                ))}
              </ul>
            </div>
          )}
        </div>
        <button 
          type="submit" 
          disabled={status === 'loading'}
          className="btn-primary py-3 px-6 disabled:opacity-50"
        >
          {status === 'loading' ? <Loader2 className="w-5 h-5 animate-spin" /> : 'Verify'}
        </button>
      </form>

      {/* Selected Codes Display */}
      {selectedCodes.length > 0 && (
        <div className="flex flex-wrap gap-2 mt-4">
          {selectedCodes.map(code => (
            <span key={code} className="flex items-center gap-1 bg-[#4F46E5]/20 border border-[#4F46E5]/30 text-[#4F46E5] px-2.5 py-1 rounded-md text-xs font-bold">
              {code}
              <button 
                onClick={() => removeCode(code)}
                className="hover:bg-[#4F46E5]/30 rounded-full p-0.5 transition-colors ml-1"
                type="button"
              >
                <X className="w-3 h-3" />
              </button>
            </span>
          ))}
        </div>
      )}

      {status !== 'idle' && status !== 'loading' && (
        <div className={cn(
          "mt-6 p-4 rounded-xl flex items-center gap-3 text-sm font-bold shadow-sm",
          status === 'valid' ? 'bg-[#059669]/10 text-emerald-400 border border-[#059669]/20' : 'bg-[#e11d48]/10 text-rose-400 border border-[#e11d48]/20'
        )}>
          {status === 'valid' ? <CheckCircle className="w-5 h-5" /> : <XCircle className="w-5 h-5" />}
          {status === 'valid' ? 'Codes Validated Successfully' : 'Invalid Legal Code(s) Detected'}
        </div>
      )}
    </div>
  );
}
