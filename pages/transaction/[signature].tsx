import { useRouter } from 'next/router';
import { useEffect, useState } from 'react';
import Head from 'next/head';
import Link from 'next/link';
import Header from '@/components/Header';
import TransactionDetails from '@/components/TransactionDetails';
import { getTransactionDetails } from '@/utils/api';
import LoadingSpinner from '@/components/LoadingSpinner';
import { TransactionDetail } from '@/types';
import { FiArrowLeft } from 'react-icons/fi';

export default function TransactionDetailPage() {
  const router = useRouter();
  const { signature } = router.query;
  const [transaction, setTransaction] = useState<TransactionDetail | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  
  useEffect(() => {
    if (!signature || typeof signature !== 'string') return;
    
    async function loadTransactionData() {
      setIsLoading(true);
      try {
        const txDetails = await getTransactionDetails(signature);
        setTransaction(txDetails);
      } catch (error) {
        console.error('Error loading transaction data:', error);
      } finally {
        setIsLoading(false);
      }
    }
    
    loadTransactionData();
  }, [signature]);

  return (
    <div className="min-h-screen bg-dark-bg text-white">
      <Head>
        <title>Transaction Details | Solana Whale Wallet Watch</title>
        <meta name="description" content={`Details for transaction ${signature}`} />
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <Header />
      
      <main className="container mx-auto px-4 py-8">
        <div className="mb-6">
          <Link 
            href="javascript:history.back()" 
            className="flex items-center text-solana-teal hover:text-solana-green"
          >
            <FiArrowLeft className="mr-2" /> Back
          </Link>
        </div>
        
        {isLoading ? (
          <div className="flex justify-center items-center h-64">
            <LoadingSpinner />
          </div>
        ) : transaction ? (
          <TransactionDetails transaction={transaction} />
        ) : (
          <div className="text-center py-12">
            <p className="text-xl text-red-400">Transaction not found or error occurred</p>
          </div>
        )}
      </main>
    </div>
  );
}
