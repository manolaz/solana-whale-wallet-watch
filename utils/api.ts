import { Connection, PublicKey } from '@solana/web3.js';
import { TransactionDetail, Whale } from '@/types';

const SOLANA_RPC_URL = process.env.NEXT_PUBLIC_SOLANA_RPC_URL || 'https://api.mainnet-beta.solana.com';
const connection = new Connection(SOLANA_RPC_URL);
const API_BASE_URL = process.env.NEXT_PUBLIC_API_BASE_URL || 'http://localhost:3000';

export async function getTransactionDetails(signature: string): Promise<TransactionDetail> {
  try {
    // First try to get from our API
    const apiResponse = await fetch(`${API_BASE_URL}/api/transaction/${signature}`);
    
    if (apiResponse.ok) {
      const tx = await apiResponse.json();
      
      if (!tx) {
        throw new Error('Transaction not found');
      }

      // Extract relevant transaction data
      const instructions = tx.transaction.message.instructions.map((ix: any) => ({
        program: ix.programId.toString(),
        data: ix.data || 'No data',
      }));

      const accounts = tx.transaction.message.accountKeys.map((acc: any) => acc.pubkey.toString());

      return {
        signature,
        timestamp: tx.blockTime ? tx.blockTime * 1000 : Date.now(),
        status: tx.meta?.err ? 'failed' : 'confirmed',
        fee: tx.meta?.fee || 0,
        slot: tx.slot,
        blockTime: tx.blockTime || 0,
        instructions,
        accounts,
      };
    }
    
    // Fallback to direct RPC if API fails
    const tx = await connection.getParsedTransaction(signature, {
      maxSupportedTransactionVersion: 0,
    });
    
    if (!tx) {
      throw new Error('Transaction not found');
    }

    // Extract relevant transaction data
    const instructions = tx.transaction.message.instructions.map((ix: any) => ({
      program: ix.programId.toString(),
      data: ix.data || 'No data',
    }));

    const accounts = tx.transaction.message.accountKeys.map((acc: any) => acc.pubkey.toString());

    return {
      signature,
      timestamp: tx.blockTime ? tx.blockTime * 1000 : Date.now(),
      status: tx.meta?.err ? 'failed' : 'confirmed',
      fee: tx.meta?.fee || 0,
      slot: tx.slot,
      blockTime: tx.blockTime || 0,
      instructions,
      accounts,
    };
  } catch (error) {
    console.error('Error fetching transaction details:', error);
    throw error;
  }
}

export async function getWhaleWallets(): Promise<Whale[]> {
  try {
    // Try to get from our API
    const response = await fetch(`${API_BASE_URL}/api/whales`);
    
    if (response.ok) {
      const whales = await response.json();
      return whales.map((whale: any) => ({
        address: whale.address,
        label: getWhaleLabel(whale.address), // Use a function to get predefined labels
        balance: whale.solBalance * 1000000000, // Convert SOL to lamports
        transactions: whale.transactions.map((tx: any) => ({
          signature: tx.signature,
          timestamp: tx.blockTime ? tx.blockTime * 1000 : Date.now(),
          type: Math.random() > 0.5 ? 'send' : 'receive', // Simplified for this example
          amount: Math.floor(Math.random() * 100000000000), // Random amount for this example
          status: 'confirmed',
        })),
      }));
    }
    
    // Fallback to mock data if API request fails
    return getMockWhaleWallets();
  } catch (error) {
    console.error('Error fetching whale wallets:', error);
    // Return mock data as fallback
    return getMockWhaleWallets();
  }
}

export async function getWhaleDetails(address: string): Promise<Whale> {
  try {
    // Try to get from our API
    const response = await fetch(`${API_BASE_URL}/api/whale/${address}`);
    
    if (response.ok) {
      const whale = await response.json();
      return {
        address: whale.address,
        label: getWhaleLabel(whale.address),
        balance: whale.balance,
        transactions: whale.transactions || [],
      };
    }
    
    // If not found in API, try direct RPC
    const balance = await connection.getBalance(new PublicKey(address));
    return {
      address,
      label: getWhaleLabel(address),
      balance,
      transactions: getSampleTransactions(),
    };
  } catch (error) {
    console.error('Error fetching whale details:', error);
    throw error;
  }
}

// Helper function to get a label for known whales
function getWhaleLabel(address: string): string {
  const knownWhales: Record<string, string> = {
    'FZp4GPEMdqS8m6WQ4pVykb1xQM39vXn9wMbw7JFXkgvL': 'Solana Foundation',
    'p5qXiC4XXZ1QDKYSQecPh8XYsp7QaB41K4pu9ZqKTic': 'Alameda Research',
    'EPjFWdd5AufqSSqeM2qN1xzybapC8G4wEGGkZwyTDt1v': 'USDC',
    'So11111111111111111111111111111111111111112': 'Wrapped SOL',
    '9n4nbM75f5Ui33ZbPYXn59EwSgE8CGsHtAeTH5YFeJ9E': 'Serum',
  };
  
  return knownWhales[address] || '';
}

// Helpers for mock data
function getMockWhaleWallets(): Whale[] {
  return [
    {
      address: "FZp4GPEMdqS8m6WQ4pVykb1xQM39vXn9wMbw7JFXkgvL",
      label: "Solana Foundation",
      balance: 1000000000000000, // 1,000,000 SOL
      transactions: getSampleTransactions(),
    },
    {
      address: "p5qXiC4XXZ1QDKYSQecPh8XYsp7QaB41K4pu9ZqKTic",
      label: "Alameda Research",
      balance: 500000000000000, // 500,000 SOL
      transactions: getSampleTransactions(),
    },
    {
      address: "EPjFWdd5AufqSSqeM2qN1xzybapC8G4wEGGkZwyTDt1v",
      label: "USDC",
      balance: 250000000000000, // 250,000 SOL
      transactions: getSampleTransactions(),
    }
  ];
}

// Helper function to generate sample transactions
function getSampleTransactions() {
  const now = Date.now();
  const day = 24 * 60 * 60 * 1000;
  
  return [
    {
      signature: "5KqhGDPTgdphQTvgqdVQyF41GFPc4mnE4LB2iJmNKjPYrHwHLJG1P8LUeZxGo9iy4GP6qfxyjEJpe3DcXYUTHER9",
      timestamp: now - 2 * 60 * 60 * 1000, // 2 hours ago
      type: "send",
      amount: 25000000000, // 25 SOL
      status: "confirmed",
    },
    {
      signature: "3WB8AaKTsoBJJgvKW1gVgzs4nQMwXiXdGoYCc8DUiMyBrFMx2eFPDYCyASTX7urwxjrtRbgGLUpSECV9MYyHBCKj",
      timestamp: now - 5 * 60 * 60 * 1000, // 5 hours ago
      type: "receive",
      amount: 100000000000, // 100 SOL
      status: "confirmed",
    },
    {
      signature: "3RkZQRgzqs4mHudJgFbTZZ6qdQsbwFkxQ9rVD6aBr9pHMVfELMQJmJBPWYBpUdHNQKMsBfBQCqpvoFXZsEPdPWvA",
      timestamp: now - 1 * day, // 1 day ago
      type: "send",
      amount: 50000000000, // 50 SOL
      status: "confirmed",
    },
    {
      signature: "4xJZNHTskfZDvUZSJDGobkKmcDZSQHFcYEqcQpKGozXTgWKDRvrfNyAHuohBuC5c4AWZGiPUJJrp5QoBoJbcGazE",
      timestamp: now - 2 * day, // 2 days ago
      type: "receive",
      amount: 75000000000, // 75 SOL
      status: "confirmed",
    },
    {
      signature: "2SkzsaFZMaLi9VfNqBmhYFL6dKWNEjRHAHrwgKRdi4NwdUKptX8krtCJGhkVtTZQpT5VwxT6hPDkJMzWKhb8RdxK",
      timestamp: now - 3 * day, // 3 days ago
      type: "send",
      amount: 10000000000, // 10 SOL
      status: "failed",
    }
  ];
}
