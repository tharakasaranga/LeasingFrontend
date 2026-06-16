"use client";
import React from 'react';

export default function DashboardLayout({ children }) {
  return (
    <div className="min-h-screen bg-[#0d111a] text-gray-100 flex flex-col font-sans">
      
      <div className="px-6 py-4 bg-[#111625] border-b border-gray-900/50 flex items-center">
        <h1 className="text-sm font-bold tracking-wide text-gray-200 uppercase">Leasing Dashboard</h1>
      </div>
      
      
      <div className="flex-1 flex flex-col">
        {children}
      </div>
    </div>
  );
}