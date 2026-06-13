import React, { createContext, useContext, useState } from 'react';

const SyncContext = createContext(null);

export const SyncProvider = ({ children }) => {
  const [activeRules, setActiveRules] = useState([
    { id: 'US-FED-01', label: 'US-FED-01', color: 'bg-indigo-100 text-indigo-700 border-indigo-200' },
    { id: 'SCOTUS-2026', label: 'SCOTUS-2026', color: 'bg-emerald-100 text-emerald-700 border-emerald-200' },
  ]);

  return (
    <SyncContext.Provider value={{ activeRules, setActiveRules }}>
      {children}
    </SyncContext.Provider>
  );
};

export const useSync = () => useContext(SyncContext);
