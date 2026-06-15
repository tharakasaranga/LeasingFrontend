"use client";
import React, { useState, useEffect } from 'react';
import TopNavbar from '@/components/TopNavbar';
import ContractCard from '@/components/ContractCard';
import SelectionSummary from '@/components/SelectionSummary';
import { Search } from 'lucide-react';
import { apiFetch } from '@/utils/api';

export default function ContractRefinancePage() {
  const [contracts, setContracts] = useState([]);
  const [selectedContract, setSelectedContract] = useState(null);
  const [searchQuery, setSearchQuery] = useState('');
  const [loading, setLoading] = useState(true);


  const loadContractsFromBackend = () => {
    setLoading(true);
    apiFetch('contracts')
      .then(data => {
        setContracts(data);
        setLoading(false);
      })
      .catch(err => {
        setLoading(false);
      });
  };

  useEffect(() => {
    loadContractsFromBackend();
  }, []);

  const handleSelectContract = (contract) => {
    if (selectedContract?.ContractID === contract.ContractID) {
      setSelectedContract(null);
    } else {
      setSelectedContract(contract);
    }
  };

 
  const filteredContracts = contracts.filter(c => 
    c.customer?.CustomerName?.toLowerCase().includes(searchQuery.toLowerCase()) ||
    c.customer?.NIC?.includes(searchQuery)
  );

  return (
    <div className="min-h-screen bg-[#0d111a] text-gray-100 flex flex-col font-sans">
      <div className="px-6 py-4 bg-[#111625] flex items-center">
        <h1 className="text-sm font-bold tracking-wide text-gray-200">📄 Contract Refinance</h1>
      </div>

      <TopNavbar />

      <div className="flex-1 grid grid-cols-1 lg:grid-cols-3 gap-6 p-6 max-w-[1600px] w-full mx-auto">
        
      
        <div className="lg:col-span-2 space-y-4">
          <div className="flex flex-col space-y-1">
            <h2 className="text-sm font-semibold text-gray-200">Contracts</h2>
            <p className="text-xs text-gray-500">Select Contract</p>
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

   
          <div className="space-y-3 overflow-y-auto max-h-[650px] pr-2">
            {loading ? (
              <div className="text-xs text-gray-500 py-10 text-center">Loading .</div>
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
            }}
          />


          
        </div>

      </div>
    </div>
  );
}