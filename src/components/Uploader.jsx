import React, { useState, useRef } from 'react';
import { UploadCloud, CheckCircle2 } from 'lucide-react';

export function Uploader({ onUpload }) {
  const [isDragging, setIsDragging] = useState(false);
  const [progress, setProgress] = useState(0);
  const [isUploading, setIsUploading] = useState(false);
  const [showSuccess, setShowSuccess] = useState(false);
  const fileInputRef = useRef(null);

  const handleDragOver = (e) => {
    e.preventDefault();
    setIsDragging(true);
  };

  const handleDragLeave = (e) => {
    e.preventDefault();
    setIsDragging(false);
  };

  const processFile = (file) => {
    if (!file) return;
    setIsUploading(true);
    setProgress(0);
    setShowSuccess(false);

    let currentProgress = 0;
    const interval = setInterval(() => {
      currentProgress += Math.random() * 15 + 5;
      if (currentProgress >= 100) {
        currentProgress = 100;
        clearInterval(interval);
        
        setTimeout(() => {
          setIsUploading(false);
          setShowSuccess(true);
          
          const clarity = Math.floor(Math.random() * 60) + 40; // 40-99
          const pages = Math.floor(Math.random() * 50) + 1;
          
          onUpload({
            id: Math.random().toString(36).substr(2, 9),
            name: file.name,
            pages,
            clarity,
            status: 'queue',
            uploadedAt: new Date().toISOString()
          });

          setTimeout(() => {
            setShowSuccess(false);
            setProgress(0);
          }, 3000);
        }, 500);
      }
      setProgress(currentProgress);
    }, 200);
  };

  const handleDrop = (e) => {
    e.preventDefault();
    setIsDragging(false);
    const file = e.dataTransfer.files[0];
    processFile(file);
  };

  const handleChange = (e) => {
    const file = e.target.files[0];
    processFile(file);
  };

  return (
    <div className="ui-panel mb-6">
      <h3 className="text-lg font-bold text-slate-100 mb-6 flex items-center gap-3">
        <div className="p-2 bg-[#1e2536]/50 rounded-lg border border-[#1e2536]">
          <UploadCloud className="w-5 h-5 text-[#4F46E5]" />
        </div>
        Upload Document
      </h3>
      
      <div 
        className={`border border-dashed rounded-2xl p-12 text-center transition-all duration-300 cursor-pointer relative overflow-hidden group
          ${isDragging ? 'border-[#4F46E5] bg-[#4F46E5]/10 scale-[1.02]' : 'border-[#1e2536] hover:border-[#4F46E5]/50 hover:bg-[#1e2536]/30'}
        `}
        onDragOver={handleDragOver}
        onDragLeave={handleDragLeave}
        onDrop={handleDrop}
        onClick={() => fileInputRef.current?.click()}
      >
        <input 
          type="file" 
          ref={fileInputRef} 
          onChange={handleChange} 
          className="hidden" 
          accept=".pdf,.doc,.docx,.txt"
        />
        
        {isUploading ? (
          <div className="flex flex-col items-center">
            <p className="text-sm font-bold text-indigo-400 mb-4 animate-pulse tracking-wide">Scanning document with OCR...</p>
            <div className="w-full max-w-xs h-2 bg-[#0B0F19] rounded-full overflow-hidden border border-[#1e2536]">
              <div 
                className="h-full bg-[#4F46E5] transition-all duration-200 ease-out"
                style={{ width: `${progress}%` }}
              ></div>
            </div>
          </div>
        ) : showSuccess ? (
          <div className="flex flex-col items-center text-emerald-400 animate-in fade-in zoom-in duration-500">
            <CheckCircle2 className="w-12 h-12 mb-4" />
            <p className="font-bold text-lg tracking-tight">Document Scanned Successfully</p>
            <p className="text-xs text-slate-400 mt-2 font-medium">Added to the master queue</p>
          </div>
        ) : (
          <div className="flex flex-col items-center text-slate-400">
            <div className="w-16 h-16 mb-4 rounded-full bg-[#0B0F19] flex items-center justify-center border border-[#1e2536] group-hover:border-[#4F46E5]/30 group-hover:bg-[#121622] transition-all">
              <UploadCloud className="w-8 h-8 text-[#4F46E5]" />
            </div>
            <p className="font-bold text-base text-slate-200">Click or drag file to this area</p>
            <p className="text-[11px] text-slate-500 mt-2 font-semibold">Supports PDF, DOCX, TXT</p>
          </div>
        )}
      </div>
    </div>
  );
}
