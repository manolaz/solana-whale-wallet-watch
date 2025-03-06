import { useRouter } from 'next/router';
import { useEffect, useState } from 'react';
import Head from 'next/head';
import Link from 'next/link';
import Header from '@/components/Header';
import TransactionsList from '@/components/TransactionsList';
import WhaleStats from '@/components/WhaleStats';
import LoadingSpinner from '@/components/LoadingSpinner';
import { getWhaleDetails } from '@/utils/api';
import { Whale } from '@/types';
import { FiArrowLeft } from 'react-icons/fi';

export default function WhaleDetailPage() {
  const router = useRouter();
  const { address } = router.query;
  const [whale, setWhale] = useState<Whale | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  
  useEffect(() => {
    if (!address || typeof address !== 'string') return;
    
    async function loadWhaleData() {
      setIsLoading(true);
      try {
        const whaleData = await getWhaleDetails(address);
        setWhale(whaleData);
      } catch (error) {
        console.error('Error loading whale data:', error);
      } finally {
        setIsLoading(false);
      }
    }
    
    loadWhaleData();
  }, [address]);

  return (
    <div className="min-h-screen bg-dark-bg text-white">
      <Head>
        <title>{whale?.label || address} | Solana Whale Wallet Watch</title>
        <meta name="description" content={`Whale wallet details for ${whale?.label || address}`} />
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <Header />
      
      <main className="container mx-auto px-4 py-8">
        <div className="mb-6">
          <Link 
            href="/"
            className="flex items-center text-solana-teal hover:text-solana-green"
          >
            <FiArrowLeft className="mr-2" /> Back to Dashboard
          </Link>
        </div>
        
        {isLoading ? (
          <div className="flex justify-center items-center h-64">
            <LoadingSpinner />
          </div>
        ) : whale ? (
          <div className="space-y-8">
            <WhaleStats whale={whale} />
            
            <div className="bg-dark-card rounded-lg p-6 shadow-lg">
              <h2 className="text-xl font-bold mb-4">Latest Transactions</h2>
              <TransactionsList transactions={whale.transactions} />
            </div>
          </div>
        ) : (
          <div className="text-center py-12">
            <p className="text-xl text-red-400">Whale wallet not found or error occurred</p>
          </div>
        )}
      </main>
    </div>
  );
}
