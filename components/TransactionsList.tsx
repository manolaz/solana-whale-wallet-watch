import React from 'react';
import Link from 'next/link';
import { formatLamportsToSOL, formatDate } from '@/utils/format';
import { FiCheckCircle, FiXCircle, FiArrowUpRight, FiArrowDownLeft } from 'react-icons/fi';

interface Transaction {
  signature: string;
  timestamp: number;
  type: string;
  amount: number;
  status: 'confirmed' | 'pending' | 'failed';
}

interface TransactionsListProps {
  transactions: Transaction[];
}

const TransactionsList: React.FC<TransactionsListProps> = ({ transactions }) => {
  if (transactions.length === 0) {
    return <p className="text-gray-400 text-center py-4">No transactions found</p>;
  }

  return (
    <div className="overflow-x-auto">
      <table className="min-w-full divide-y divide-gray-700">
        <thead>
          <tr>
            <th className="px-6 py-3 text-left text-xs font-medium text-gray-300 uppercase tracking-wider">Type</th>
            <th className="px-6 py-3 text-left text-xs font-medium text-gray-300 uppercase tracking-wider">Amount</th>
            <th className="px-6 py-3 text-left text-xs font-medium text-gray-300 uppercase tracking-wider">Time</th>
            <th className="px-6 py-3 text-left text-xs font-medium text-gray-300 uppercase tracking-wider">Status</th>
            <th className="px-6 py-3 text-left text-xs font-medium text-gray-300 uppercase tracking-wider">Signature</th>
          </tr>
        </thead>
        <tbody className="divide-y divide-gray-700">
          {transactions.map((tx) => (
            <tr key={tx.signature} className="hover:bg-dark-bg/50">
              <td className="px-6 py-4 whitespace-nowrap">
                <div className="flex items-center">
                  {tx.type === 'send' ? (
                    <FiArrowUpRight className="text-red-400 mr-2" />
                  ) : (
                    <FiArrowDownLeft className="text-green-400 mr-2" />
                  )}
                  <span className="capitalize">{tx.type}</span>
                </div>
              </td>
              <td className="px-6 py-4 whitespace-nowrap">
                <span className={tx.type === 'send' ? 'text-red-400' : 'text-green-400'}>
                  {tx.type === 'send' ? '-' : '+'}{formatLamportsToSOL(tx.amount)} SOL
                </span>
              </td>
              <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-300">
                {formatDate(tx.timestamp)}
              </td>
              <td className="px-6 py-4 whitespace-nowrap">
                {tx.status === 'confirmed' ? (
                  <span className="flex items-center text-green-400">
                    <FiCheckCircle className="mr-1" /> Confirmed
                  </span>
                ) : tx.status === 'failed' ? (
                  <span className="flex items-center text-red-400">
                    <FiXCircle className="mr-1" /> Failed
                  </span>
                ) : (
                  <span className="flex items-center text-yellow-400">
                    <svg className="animate-spin h-4 w-4 mr-1" viewBox="0 0 24 24">
                      <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" fill="none"></circle>
                      <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                    </svg>
                    Pending
                  </span>
                )}
              </td>
              <td className="px-6 py-4 text-sm text-gray-300">
                <Link 
                  href={`/transaction/${tx.signature}`}
                  className="text-solana-teal hover:text-solana-green"
                >
                  {`${tx.signature.substring(0, 8)}...${tx.signature.substring(tx.signature.length - 8)}`}
                </Link>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default TransactionsList;
