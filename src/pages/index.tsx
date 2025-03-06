import { useState, useEffect } from 'react';
import Head from 'next/head';
import WalletList from '@/components/WalletList';
import Header from '@/components/Header';
import { WhaleWallet } from '@/types/wallet';
import { fetchWhaleWallets } from '@/utils/api';

export default function Home() {
  const [wallets, setWallets] = useState<WhaleWallet[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);

  const loadWallets = async () => {
    try {
      setLoading(true);
      setError(null);
      const data = await fetchWhaleWallets();
      setWallets(data);
    } catch (err) {
      console.error('Error loading wallets:', err);
      setError('Failed to load wallet data. Please try again later.');
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    loadWallets();
  }, []);

  return (
    <>
      <Head>
        <title>Solana Whale Wallet Watch</title>
        <meta name="description" content="Monitor high-value Solana wallets" />
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <div className="min-h-screen">
        <Header onRefresh={loadWallets} />
        
        <main className="container mx-auto px-4 py-8">
          <h1 className="text-3xl font-bold mb-8 text-center">
            Solana Whale Wallet Monitor
          </h1>
          
          {error && (
            <div className="bg-red-500 text-white p-4 rounded-md mb-6">
              {error}
            </div>
          )}
          
          {loading ? (
            <div className="flex justify-center items-center h-64">
              <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-solana-purple"></div>
            </div>
          ) : (
            <WalletList wallets={wallets} />
          )}
        </main>
        
        <footer className="py-6 text-center text-gray-500">
          <p>Powered by Helius RPC • Solana Blockchain</p>
        </footer>
      </div>
    </>
  );
}
