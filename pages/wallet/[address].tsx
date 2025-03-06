import { useRouter } from 'next/router';
import { useEffect, useState } from 'react';
import Head from 'next/head';
import Link from 'next/link';
import Header from '@/components/Header';
import TransactionList from '@/components/TransactionList';
import WalletSummary from '@/components/WalletSummary';
import { getWalletDetails, getTransactions } from '@/utils/api';
import LoadingSpinner from '@/components/LoadingSpinner';
import { WalletDetails, Transaction } from '@/types';
import { FiArrowLeft } from 'react-icons/fi';

export default function WalletDetail() {
  const router = useRouter();
  const { address } = router.query;
  const [walletDetails, setWalletDetails] = useState<WalletDetails | null>(null);
  const [transactions, setTransactions] = useState<Transaction[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  
  useEffect(() => {
    if (!address || typeof address !== 'string') return;
    
    async function loadWalletData() {
      setIsLoading(true);
      try {
        const details = await getWalletDetails(address);
        const txs = await getTransactions(address);
        setWalletDetails(details);
        setTransactions(txs);
      } catch (error) {
        console.error('Error loading wallet data:', error);
      } finally {
        setIsLoading(false);
      }
    }
    
    loadWalletData();
  }, [address]);

  const handleRefresh = async () => {
    if (!address || typeof address !== 'string') return;
    setIsLoading(true);
    try {
      const details = await getWalletDetails(address);
      const txs = await getTransactions(address);
      setWalletDetails(details);
      setTransactions(txs);
    } catch (error) {
      console.error('Error refreshing wallet data:', error);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-dark-bg text-white">
      <Head>
        <title>Wallet Details | Solana Whale Wallet Watch</title>
        <meta name="description" content={`Details for wallet ${address}`} />
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
        ) : (
          <>
            {walletDetails && (
              <WalletSummary 
                details={walletDetails} 
                onRefresh={handleRefresh}
              />
            )}
            
            <div className="mt-8">
              <h2 className="text-xl font-semibold mb-4">Recent Transactions</h2>
              <TransactionList transactions={transactions} />
            </div>
          </>
        )}
      </main>
    </div>
  );
}
