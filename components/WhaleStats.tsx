import React from 'react';
import { formatLamportsToSOL, shortenAddress } from '@/utils/format';
import { Whale } from '@/types';
import { FiCopy } from 'react-icons/fi';

interface WhaleStatsProps {
  whale: Whale;
}

const WhaleStats: React.FC<WhaleStatsProps> = ({ whale }) => {
  const { address, label, balance } = whale;
  
  const copyToClipboard = () => {
    navigator.clipboard.writeText(address);
    // Optional: Add toast notification for copy success
  };

  return (
    <div className="bg-dark-card rounded-lg p-6 shadow-lg">
      <div className="flex flex-col md:flex-row md:items-start justify-between">
        <div className="mb-4 md:mb-0">
          <h1 className="text-2xl font-bold text-white">
            {label || 'Unknown Whale'}
          </h1>
          <div className="flex items-center mt-2">
            <p className="text-gray-300 break-all mr-2">{address}</p>
            <button 
              onClick={copyToClipboard}
              className="text-solana-teal hover:text-solana-green transition-colors"
              title="Copy address"
            >
              <FiCopy size={16} />
            </button>
          </div>
        </div>
        
        <div className="bg-dark-bg p-4 rounded-lg">
          <div className="text-sm text-gray-400">Balance</div>
          <div className="text-2xl font-bold text-solana-teal">
            {formatLamportsToSOL(balance)} SOL
          </div>
        </div>
      </div>
      
      <div className="mt-6 grid grid-cols-1 md:grid-cols-3 gap-4">
        <div className="bg-dark-bg p-4 rounded-lg">
          <div className="text-sm text-gray-400">Last 24h Transactions</div>
          <div className="text-xl font-bold">
            {whale.transactions.filter(tx => 
              tx.timestamp > Date.now() - 24 * 60 * 60 * 1000
            ).length}
          </div>
        </div>
        
        <div className="bg-dark-bg p-4 rounded-lg">
          <div className="text-sm text-gray-400">Total Sent (24h)</div>
          <div className="text-xl font-bold text-red-400">
            {formatLamportsToSOL(
              whale.transactions
                .filter(tx => 
                  tx.timestamp > Date.now() - 24 * 60 * 60 * 1000 && 
                  tx.type === 'send'
                )
                .reduce((acc, tx) => acc + tx.amount, 0)
            )} SOL
          </div>
        </div>
        
        <div className="bg-dark-bg p-4 rounded-lg">
          <div className="text-sm text-gray-400">Total Received (24h)</div>
          <div className="text-xl font-bold text-green-400">
            {formatLamportsToSOL(
              whale.transactions
                .filter(tx => 
                  tx.timestamp > Date.now() - 24 * 60 * 60 * 1000 && 
                  tx.type === 'receive'
                )
                .reduce((acc, tx) => acc + tx.amount, 0)
            )} SOL
          </div>
        </div>
      </div>
    </div>
  );
};

export default WhaleStats;
