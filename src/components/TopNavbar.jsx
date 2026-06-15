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
            className={`flex items-center space-x-2 cursor-pointer pb-1 ${idx === 0 ? 'text-white-0 border-b-2 bg-purple-700 text-gray-100 font-semibold' : 'hover:text-gray-200'} border-2 border-gray-800 p-2`}
          >
            <span className={`w-2 h-2 rounded-full border  'border-gray-500' `}></span>          
            <span>{step}</span>
          </div>
        ))}
      </div>
      <hr />

      <div className="px-6 py-4 bg-[#111625] flex items-center mt-4">
        <h1>Contract</h1>
      </div>
    

        <div>
            <h2>Select Contract</h2>
            
        </div>
      


    </div>
  );
}