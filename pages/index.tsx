import Head from 'next/head';
import { useEffect, useState } from 'react';
import Dashboard from '@/components/Dashboard';
import Header from '@/components/Header';
import { useWalletContext } from '@/context/WalletContext';
import LoadingSpinner from '@/components/LoadingSpinner';

export default function Home() {
  const { isLoading } = useWalletContext();
  
  return (
    <div className="min-h-screen bg-dark-bg text-white">
      <Head>
        <title>Solana Whale Wallet Watch</title>
        <meta name="description" content="Monitor high-value Solana wallets" />
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <Header />
      
      <main className="container mx-auto px-4 py-8">
        {isLoading ? (
          <div className="flex justify-center items-center h-64">
            <LoadingSpinner />
          </div>
        ) : (
          <Dashboard />
        )}
      </main>
      
      <footer className="container mx-auto px-4 py-6 text-center text-gray-400 text-sm">
        <p>Powered by Helius RPC and Solana Web3.js</p>
      </footer>
    </div>
  );
}
