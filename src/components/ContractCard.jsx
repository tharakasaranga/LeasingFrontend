"use client";
import React from 'react';
import { Car, Plus, X } from 'lucide-react';

export default function ContractCard({ contract, isSelected, onSelect }) {

  const getBgColor = (status) => {
    if (status === 'Distributed') return 'bg-purple-600';
    if (status === 'Pending') return 'bg-green-600';
    return 'bg-orange-500'; 
  };

  const getBadgeStyle = (status) => {
    if (status === 'Distributed') return 'bg-purple-950/50 text-purple-400 border border-purple-800';
    if (status === 'Pending') return 'bg-orange-950/50 text-orange-400 border border-orange-800';
    return 'bg-gray-800 text-gray-400 border border-gray-700';
  };

  return (
    <div className={`p-4 rounded-xl bg-[#171e30] border transition-all ${isSelected ? 'border-blue-500 ring-1 ring-blue-500' : 'border-gray-800 hover:border-gray-700'}`}>
      <div className="flex justify-between items-start">
        <div className="flex space-x-4">
       
          <div className={`w-20 h-20 rounded-lg flex items-center justify-center ${getBgColor(contract.status)}`}>
            <Car className="w-12 h-12 text-white" />
          </div>

      
          <div className="text-xs space-y-1 text-gray-300">
            <p><span className="text-gray-500 inline-block w-24">Contract No</span> : <span className="text-blue-400 font-medium">HO/MB/{contract.ContractID}</span></p>
            <p><span className="text-gray-500 inline-block w-24">Name</span> : <span>{contract.customer?.CustomerName || 'N/A'}</span></p>
            <p><span className="text-gray-500 inline-block w-24">NIC</span> : <span>{contract.customer?.NIC || 'N/A'}</span></p>
            <div className="pt-1 mt-1 border-t border-gray-800/50 space-y-1">
              <p><span className="text-gray-500 inline-block w-24">Brand/Model</span> : <span>{contract.vehicle?.Brand} - {contract.vehicle?.Model}</span></p>
              <p><span className="text-gray-500 inline-block w-24">Loan Amount</span> : <span>Rs. {Number(contract.LoanAmount).toLocaleString('en-US', {minimumFractionDigits: 2})}</span></p>
              <p><span className="text-gray-500 inline-block w-24">Leasing Amount</span> : <span>Rs. {Number(contract.LeasingAmount).toLocaleString('en-US', {minimumFractionDigits: 2})}</span></p>
            </div>
          </div>
        </div>

       
        <div className="flex flex-col items-end justify-between h-20">
          <span className={`text-[10px] px-2 py-0.5 rounded-md font-medium ${getBadgeStyle(contract.status)}`}>
            {contract.status}
          </span>

          <button 
            onClick={() => onSelect(contract)}
            className={`p-1 rounded-full transition-colors ${isSelected ? 'bg-red-500/20 text-red-400 hover:bg-red-500/30' : 'bg-gray-800 text-gray-400 hover:bg-gray-700'}`}
          >
            {isSelected ? <X className="w-4 h-4" /> : <Plus className="w-4 h-4" />}
          </button>
        </div>
      </div>
    </div>
  );
}