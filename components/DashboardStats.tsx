import React from 'react';
import { formatLamportsToSOL } from '@/utils/format';
import { Whale } from '@/types';
import { FiTrendingUp, FiTrendingDown, FiActivity } from 'react-icons/fi';

interface DashboardStatsProps {
  whales: Whale[];
}

const DashboardStats: React.FC<DashboardStatsProps> = ({ whales }) => {
  // Calculate total balance across all whale wallets
  const totalBalance = whales.reduce((acc, whale) => acc + whale.balance, 0);
  
  // Calculate total transactions in last 24 hours
  const last24hTimestamp = Date.now() - 24 * 60 * 60 * 1000;
  const txLast24h = whales.flatMap(whale => 
    whale.transactions.filter(tx => tx.timestamp > last24hTimestamp)
  ).length;

  // Calculate most active whale (by transaction count)
  const mostActiveWhale = whales.length > 0 
    ? whales.reduce((a, b) => a.transactions.length > b.transactions.length ? a : b)
    : null;

  return (
    <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
      <div className="bg-dark-card p-6 rounded-lg shadow-lg">
        <div className="flex items-center justify-between">
          <div>
            <p className="text-gray-400 text-sm">Total Whale Balance</p>
            <h2 className="text-2xl font-bold text-white mt-1">{formatLamportsToSOL(totalBalance)} SOL</h2>
          </div>
          <div className="rounded-full bg-solana-teal/20 p-3">
            <FiTrendingUp size={24} className="text-solana-teal" />
          </div>
        </div>
      </div>

      <div className="bg-dark-card p-6 rounded-lg shadow-lg">
        <div className="flex items-center justify-between">
          <div>
            <p className="text-gray-400 text-sm">24h Transactions</p>
            <h2 className="text-2xl font-bold text-white mt-1">{txLast24h}</h2>
          </div>
          <div className="rounded-full bg-purple-500/20 p-3">
            <FiActivity size={24} className="text-purple-500" />
          </div>
        </div>
      </div>

      <div className="bg-dark-card p-6 rounded-lg shadow-lg">
        <div className="flex items-center justify-between">
          <div>
            <p className="text-gray-400 text-sm">Most Active Whale</p>
            <h2 className="text-xl font-bold text-white mt-1 truncate">
              {mostActiveWhale ? (mostActiveWhale.label || shortenAddress(mostActiveWhale.address)) : 'N/A'}
            </h2>
          </div>
          <div className="rounded-full bg-amber-500/20 p-3">
            <FiTrendingDown size={24} className="text-amber-500" />
          </div>
        </div>
      </div>
    </div>
  );
};

export default DashboardStats;
