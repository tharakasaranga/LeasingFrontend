"use client";
import React from 'react';

const steps = [
  "Contracts", "Customer and Guarantor", "Vehicle", "Participants", 
  "Product", "Other Charges", "Insurance", "Summary", "Disbursement", "Documents"
];

export default function TopNavbar({ activeStep, setActiveStep }) {
  return (
    <div className="w-full bg-[#111625] border-b border-gray-800 px-6 py-4 overflow-x-auto whitespace-nowrap">
      <div className="flex space-x-4 text-xs">
        {steps.map((step, idx) => {
          const isActive = idx === activeStep;
          return (
            <div 
              key={idx} 
              onClick={() => setActiveStep(idx)}
              className={`flex items-center space-x-2 cursor-pointer px-3 py-1.5 rounded-lg border transition-all duration-200 ${
                isActive 
                  ? 'bg-purple-700/20 text-purple-400 border-purple-500 font-semibold shadow-[0_0_15px_rgba(147,51,234,0.1)]' 
                  : 'text-gray-400 border-gray-800 hover:text-gray-200 hover:border-gray-700'
              }`}
            >
              <span className={`w-2 h-2 rounded-full transition-all ${isActive ? 'bg-purple-400 scale-110' : 'bg-gray-600'}`}></span>          
              <span>{step}</span>
            </div>
          );
        })}
      </div>
    </div>
  );
}