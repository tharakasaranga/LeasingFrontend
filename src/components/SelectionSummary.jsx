"use client";
import React, { useState, useEffect } from 'react';
import { Car } from 'lucide-react';
import { apiFetch } from '@/utils/api';

export default function SelectionSummary({ selectedContract, onCancel, onSuccess }) {
  const [rebatingPercentage, setRebatingPercentage] = useState(0);
  const [submitting, setSubmitting] = useState(false);

  const loanAmount = selectedContract?.LoanAmount ? Number(selectedContract.LoanAmount) : 0;
  const leasingAmount = selectedContract?.LeasingAmount ? Number(selectedContract.LeasingAmount) : 0;

  const remainingLoanInterest = selectedContract?.rebate?.RemainingLoanInterest ? Number(selectedContract.rebate.RemainingLoanInterest) : 150000.00;
  const remainingDeductInterest = selectedContract?.rebate?.RemainingDeductInterest ? Number(selectedContract.rebate.RemainingDeductInterest) : 25000.00;
  const remainingCapitaliseInterest = selectedContract?.rebate?.RemainingCapitaliseInterest ? Number(selectedContract.rebate.RemainingCapitaliseInterest) : 10000.00;
  const totalInterest = selectedContract?.rebate?.TotalInterest ? Number(selectedContract.rebate.TotalInterest) : (remainingLoanInterest + remainingDeductInterest + remainingCapitaliseInterest);

  const rebatingAmount = (totalInterest * (rebatingPercentage / 100));

  useEffect(() => {
    if (selectedContract?.rebate?.RebatingInterestPercentage) {
      setRebatingPercentage(Number(selectedContract.rebate.RebatingInterestPercentage));
    } else {
      setRebatingPercentage(0);
    }
  }, [selectedContract]);

  const handleProceed = async () => {
    if (!selectedContract) return;
    setSubmitting(true);
    try {
      const refinanceRes = await apiFetch('refinance-applications', {
        method: 'POST',
        body: JSON.stringify({
          ContractID: selectedContract.ContractID,
          ApplicationDate: new Date().toISOString().split('T')[0], 
          status: 'Pending'
        })
      });

      const newRefinanceID = refinanceRes.data?.RefinanceID || 1;
     
      await apiFetch('rebates', {
        method: 'POST',
        body: JSON.stringify({
          RefinanceID: newRefinanceID,
          RemainingLoanInterest: remainingLoanInterest,
          RemainingDeductInterest: remainingDeductInterest,
          RemainingCapitaliseInterest: remainingCapitaliseInterest,
          TotalInterest: totalInterest,
          RebatingInterestPercentage: rebatingPercentage,
          RebatingInterestAmount: rebatingAmount
        })
      });

      onSuccess(); 
      alert("Error saving data to backend.");
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <div className="bg-[#171e30] rounded-xl border border-gray-800 p-5 flex flex-col h-full justify-between">
      <div className="space-y-6">
        <div>
          <h3 className="text-sm font-semibold text-gray-200">Selection Summary</h3>
          <p className="text-[11px] text-gray-500 mt-0.5">Review your selection before proceeding</p>
        </div>
 
        {selectedContract ? (
          <div className="bg-[#121724] p-3 rounded-lg flex space-x-3 border border-gray-800">
            <div className="w-14 h-14 bg-purple-600 rounded flex items-center justify-center flex-shrink-0">
              <Car className="w-8 h-8 text-white" />
            </div>
            <div className="text-[11px] text-gray-300 grid grid-cols-2 gap-x-2 gap-y-0.5 w-full">
              <span className="text-gray-500">Contract No:</span> <span className="text-blue-400 text-right">HO/MB/{selectedContract.ContractID}</span>
              <span className="text-gray-500">Name:</span> <span className="text-right truncate">{selectedContract.customer?.CustomerName || 'N/A'}</span>
              <span className="text-gray-500">NIC:</span> <span className="text-right">{selectedContract.customer?.NIC || 'N/A'}</span>
              <span className="text-gray-500">Brand/Model:</span> <span className="text-right truncate">{selectedContract.vehicle?.Brand} - {selectedContract.vehicle?.Model}</span>
              <span className="text-gray-500">Loan Amount:</span> <span className="text-right text-gray-200">Rs. {loanAmount.toLocaleString('en-US', {minimumFractionDigits: 2})}</span>
              <span className="text-gray-500">Leasing Amount:</span> <span className="text-right text-gray-200">Rs. {leasingAmount.toLocaleString('en-US', {minimumFractionDigits: 2})}</span>
            </div>
          </div>
        ) : (
          <div className="text-xs text-gray-500 bg-[#121724] p-4 rounded-lg text-center border border-dashed border-gray-800">
            Select a contract from the left list.
          </div>
        )}
  
        <div className="space-y-3">
          <div className="bg-[#20293a] px-3 py-1.5 rounded-md text-xs font-medium text-gray-300">Rebates</div>
          <div className="bg-[#121724] p-4 rounded-lg border border-gray-800 text-xs space-y-3">
            <h4 className="text-gray-400 font-medium pb-2 border-b border-gray-800/60">Interest Rebates</h4>
            <div className="flex justify-between text-gray-400">
              <span>Remaining Loan Interests:</span>
              <span className="text-gray-200">Rs. {remainingLoanInterest.toLocaleString('en-US', {minimumFractionDigits: 2})}</span>
            </div>
            <div className="flex justify-between text-gray-400">
              <span>Remaining Deduct From Loan Interests:</span>
              <span className="text-gray-200">Rs. {remainingDeductInterest.toLocaleString('en-US', {minimumFractionDigits: 2})}</span>
            </div>
            <div className="flex justify-between text-gray-400">
              <span>Remaining Capitalise Interests:</span>
              <span className="text-gray-200">Rs. {remainingCapitaliseInterest.toLocaleString('en-US', {minimumFractionDigits: 2})}</span>
            </div>
            <div className="flex justify-between font-semibold text-gray-300 pt-1 border-t border-gray-800/40">
              <span>Total Interests:</span>
              <span className="text-gray-100">Rs. {totalInterest.toLocaleString('en-US', {minimumFractionDigits: 2})}</span>
            </div>
            <div className="flex justify-between items-center pt-2">
              <span className="text-gray-400">Rebating Interests:</span>
              <div className="flex items-center bg-[#171e30] border border-gray-700 rounded px-2 py-1 w-24">
                <input 
                  type="number" 
                  step="0.01"
                  value={rebatingPercentage}
                  onChange={(e) => setRebatingPercentage(Number(e.target.value))}
                  className="bg-transparent w-full text-right text-gray-200 focus:outline-none"
                />
                <span className="text-gray-500 text-[10px] ml-1">%</span>
              </div>
            </div>
            <div className="flex justify-between text-gray-400">
              <span>Rebating Interests Amount:</span>
              <span className="text-red-400">- Rs. {rebatingAmount.toLocaleString('en-US', {minimumFractionDigits: 2})}</span>
            </div>
          </div>
        </div>
      </div>

      <div className="flex space-x-3 pt-6">
        <button 
          onClick={onCancel}
          type="button"
          className="w-1/2 py-2.5 rounded-lg border border-gray-700 text-xs font-medium text-gray-300 hover:bg-gray-800 transition-colors"
        >
          Cancel
        </button>
        <button 
          onClick={handleProceed}
          disabled={!selectedContract || submitting}
          type="button"
          className="w-1/2 py-2.5 rounded-lg bg-blue-600 text-xs font-medium text-white hover:bg-blue-700 transition-colors disabled:opacity-50 disabled:cursor-not-allowed shadow-lg"
        >
          {submitting ? "Processing..." : "Next"}
        </button>
      </div>
    </div>
  );
}