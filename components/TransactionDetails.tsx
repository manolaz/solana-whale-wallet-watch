import React from 'react';
import { TransactionDetail } from '@/types';
import { formatLamportsToSOL, formatDate } from '@/utils/format';
import { FiCheckCircle, FiXCircle, FiClock } from 'react-icons/fi';

interface TransactionDetailsProps {
  transaction: TransactionDetail;
}

const TransactionDetails: React.FC<TransactionDetailsProps> = ({ transaction }) => {
  const {
    signature,
    timestamp,
    status,
    fee,
    slot,
    blockTime,
    instructions,
    accounts
  } = transaction;

  return (
    <div className="bg-dark-card rounded-lg p-6 shadow-lg">
      <h1 className="text-2xl font-bold mb-4 break-all">Transaction</h1>
      
      <div className="mb-6">
        <div className="flex items-center mb-2">
          <span className="font-semibold text-gray-300 mr-2">Status:</span>
          {status === 'confirmed' ? (
            <span className="flex items-center text-green-400">
              <FiCheckCircle className="mr-1" /> Confirmed
            </span>
          ) : status === 'pending' ? (
            <span className="flex items-center text-yellow-400">
              <FiClock className="mr-1" /> Pending
            </span>
          ) : (
            <span className="flex items-center text-red-400">
              <FiXCircle className="mr-1" /> Failed
            </span>
          )}
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div>
            <h2 className="text-lg font-semibold mb-2 text-solana-teal">Transaction Details</h2>
            <div className="space-y-2">
              <p className="break-all">
                <span className="font-semibold text-gray-300">Signature:</span> {signature}
              </p>
              <p>
                <span className="font-semibold text-gray-300">Timestamp:</span> {formatDate(timestamp)}
              </p>
              <p>
                <span className="font-semibold text-gray-300">Fee:</span> {formatLamportsToSOL(fee)} SOL
              </p>
              <p>
                <span className="font-semibold text-gray-300">Slot:</span> {slot}
              </p>
              <p>
                <span className="font-semibold text-gray-300">Block Time:</span> {blockTime}
              </p>
            </div>
          </div>
        </div>
      </div>

      <div className="mb-6">
        <h2 className="text-lg font-semibold mb-4 text-solana-teal">Instructions ({instructions.length})</h2>
        <div className="space-y-4">
          {instructions.map((instruction, index) => (
            <div key={index} className="bg-dark-bg p-4 rounded-md border border-gray-700">
              <div className="mb-2">
                <span className="font-semibold text-gray-300">Program:</span> {instruction.program}
              </div>
              <div>
                <span className="font-semibold text-gray-300">Data:</span>
                <div className="mt-1 overflow-x-auto">
                  <pre className="text-sm text-gray-400">{instruction.data}</pre>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>

      <div>
        <h2 className="text-lg font-semibold mb-4 text-solana-teal">Accounts ({accounts.length})</h2>
        <div className="grid gap-4">
          {accounts.map((account, index) => (
            <div key={index} className="bg-dark-bg p-4 rounded-md border border-gray-700 break-all">
              {account}
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default TransactionDetails;
