import { LAMPORTS_PER_SOL } from '@solana/web3.js';

export function formatLamportsToSOL(lamports: number): string {
  return (lamports / LAMPORTS_PER_SOL).toLocaleString(undefined, {
    minimumFractionDigits: 2,
    maximumFractionDigits: 9,
  });
}

export function formatDate(timestamp: number): string {
  return new Date(timestamp).toLocaleString();
}

export function shortenAddress(address: string, chars = 4): string {
  return `${address.slice(0, chars)}...${address.slice(-chars)}`;
}
