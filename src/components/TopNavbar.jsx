"use client";
import React from 'react';

const steps = [
  "Contracts", "Customer and Guarantor", "Vehicle", "Participants", 
  "Product", "Other Charges", "Insurance", "Summary", "Disbursement", "Documents"
];

export default function TopNavbar() {
  return (
    <div className="w-full bg-[#111625] border-b border-gray-800 px-6 py-3 overflow-x-auto whitespace-nowrap">
      <div className="flex space-x-6 text-xs text-gray-400">
        {steps.map((step, idx) => (
          <div 
            key={idx} 
            className={`flex items-center space-x-2 cursor-pointer pb-1 ${idx === 0 ? 'text-blue-500 border-b-2 border-blue-500 font-semibold' : 'hover:text-gray-200'}`}
          >
            <span className={`w-2 h-2 rounded-full border ${idx === 0 ? 'bg-blue-500 border-blue-500' : 'border-gray-500'}`}></span>
            <span>{step}</span>
          </div>
        ))}
      </div>
    </div>
  );
}