"use client";

import React, { useEffect, useMemo, useState } from 'react';
import { Search } from 'lucide-react';

import ContractCard from '@/components/ContractCard';
import SelectionSummary from '@/components/SelectionSummary';
import TopNavbar from '@/components/TopNavbar';
import { apiFetch } from '@/utils/api';

export default function DashboardPage() {
  const [activeStep, setActiveStep] = useState(0); 
  const [contracts, setContracts] = useState([]);
  const [selectedContract, setSelectedContract] = useState(null);
  const [searchQuery, setSearchQuery] = useState('');
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const loadContractsFromBackend = () => {
    setLoading(true);
    setError(null);
    apiFetch('contracts')
      .then((data) => {
        setContracts(data || []);
        setLoading(false);
      })
      .catch((err) => {
        setError('Unable to load contracts.');
        setLoading(false);
      });
  };

  useEffect(() => {
    loadContractsFromBackend();
  }, []);

  const filteredContracts = useMemo(() => {
    const query = searchQuery.trim().toLowerCase();
    if (!query) return contracts;
    return contracts.filter((contract) => {
      const customerName = contract.customer?.CustomerName?.toLowerCase() || '';
      const nic = contract.customer?.NIC?.toLowerCase() || '';
      return customerName.includes(query) || nic.includes(query);
    });
  }, [contracts, searchQuery]);

  const handleSelectContract = (contract) => {
    setSelectedContract((currentContract) =>
      currentContract?.ContractID === contract.ContractID ? null : contract
    );
  };


  const handleNextStep = () => {
    setActiveStep((prev) => (prev < 9 ? prev + 1 : prev));
  };

  return (
    <>
      <TopNavbar activeStep={activeStep} setActiveStep={setActiveStep} />

      <div className="flex-1 w-full max-w-[1600px] mx-auto p-6">
        {activeStep === 0 ? (
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 h-full">
            <div className="lg:col-span-2 space-y-4">
              <div className="flex flex-col space-y-0.5">
                <h2 className="text-sm font-semibold text-gray-200">Contracts</h2>
                <p className="text-xs text-gray-500">Select active contract to proceed refinance</p>
              </div>

              <div className="relative w-full max-w-md">
                <Search className="absolute left-3 top-2.5 w-4 h-4 text-gray-500" />
                <input
                  type="text"
                  placeholder="Search by Name or NIC..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="w-full bg-[#171e30] border border-gray-800 rounded-lg pl-10 pr-4 py-2 text-xs text-gray-200 placeholder-gray-500 focus:outline-none focus:border-gray-700"
                />
              </div>

              <div className="space-y-3 overflow-y-auto max-h-[600px] pr-2">
                {loading ? (
                  <div className="text-xs text-gray-500 py-10 text-center">Loading contracts...</div>
                ) : error ? (
                  <div className="text-xs text-red-400 py-10 text-center">{error}</div>
                ) : filteredContracts.length > 0 ? (
                  filteredContracts.map((contract) => (
                    <ContractCard
                      key={contract.ContractID}
                      contract={contract}
                      isSelected={selectedContract?.ContractID === contract.ContractID}
                      onSelect={handleSelectContract}
                    />
                  ))
                ) : (
                  <div className="text-xs text-gray-500 py-10 text-center">No contracts found.</div>
                )}
              </div>
            </div>

            <div className="lg:col-span-1">
              <SelectionSummary
                selectedContract={selectedContract}
                onCancel={() => setSelectedContract(null)}
                onSuccess={() => {
                  setSelectedContract(null);
                  loadContractsFromBackend();
                  handleNextStep(); 
                }}
              />
            </div>
          </div>
        ) : (
          <div className="flex flex-col items-center justify-center py-20 bg-[#171e30] rounded-xl border border-gray-800 border-dashed">
            <p className="text-sm text-gray-400 font-medium">Step {activeStep + 1} UI is under construction.</p>
            <button 
              onClick={() => setActiveStep(0)} 
              className="mt-4 px-4 py-2 bg-gray-800 text-xs rounded-lg hover:bg-gray-700 text-purple-400 font-medium transition-colors"
            >
              ← Back to Contracts
            </button>
          </div>
        )}
      </div>
    </>
  );
}