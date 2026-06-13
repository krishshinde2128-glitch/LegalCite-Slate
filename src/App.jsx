import React, { useState } from 'react';
import { SyncProvider } from './contexts/SyncContext';
import { Sidebar } from './components/Sidebar';
import { TopNav } from './components/TopNav';
import { AnalyticsWidget } from './components/AnalyticsWidget';
import { Uploader } from './components/Uploader';
import { ClaritySorter } from './components/ClaritySorter';
import { SmartSearch } from './components/SmartSearch';
import { ReviewQueue } from './components/ReviewQueue';
import { DocumentEditor } from './components/DocumentEditor';
import { Login } from './components/Login';

function Dashboard() {
  const [documents, setDocuments] = useState([
    { id: '1', name: 'NDA_Acme_Corp.pdf', pages: 12, clarity: 94, status: 'queue', uploadedAt: new Date(Date.now() - 100000).toISOString() },
    { id: '2', name: 'Employment_Contract_JD.docx', pages: 5, clarity: 72, status: 'queue', uploadedAt: new Date(Date.now() - 50000).toISOString() },
    { id: '3', name: 'Scanned_Receipts_Q3.pdf', pages: 34, clarity: 45, status: 'queue', uploadedAt: new Date().toISOString() },
  ]);

  const handleUpload = (newDoc) => {
    setDocuments(prev => [newDoc, ...prev]);
  };

  const handleReview = (id, action) => {
    // action is 'approve' or 'reject', for now we just remove from queue
    setDocuments(prev => prev.filter(doc => doc.id !== id));
  };

  return (
    <div className="min-h-screen flex bg-[#0A0D14]">
      <Sidebar />
      <div className="flex-1 ml-[280px] flex flex-col min-h-screen">
        <TopNav />
        <main className="flex-1 p-8 max-w-[1600px] mx-auto w-full animate-in fade-in duration-700">
          <AnalyticsWidget documents={documents} />
          
          <div className="grid grid-cols-1 xl:grid-cols-3 gap-8">
            {/* Left Column (Wider) */}
            <div className="xl:col-span-2 space-y-8">
              <DocumentEditor />
              <ClaritySorter documents={documents} />
            </div>

            {/* Right Column */}
            <div className="space-y-8">
              <Uploader onUpload={handleUpload} />
              <SmartSearch />
              <ReviewQueue documents={documents} onReview={handleReview} />
            </div>
          </div>
        </main>
      </div>
    </div>
  );
}

function App() {
  const [isAuthenticated, setIsAuthenticated] = useState(false);

  return (
    <SyncProvider>
      {isAuthenticated ? (
        <Dashboard />
      ) : (
        <Login onLogin={() => setIsAuthenticated(true)} />
      )}
    </SyncProvider>
  );
}

export default App;
