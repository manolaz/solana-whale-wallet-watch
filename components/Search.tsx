import React, { useState } from 'react';
import { useRouter } from 'next/router';
import { FiSearch } from 'react-icons/fi';

const Search: React.FC = () => {
  const [query, setQuery] = useState('');
  const router = useRouter();

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    
    const trimmedQuery = query.trim();
    if (!trimmedQuery) return;
    
    // Check if the query looks like a Solana address or transaction signature
    if (trimmedQuery.length >= 32) {
      // If it's likely a transaction signature
      if (trimmedQuery.length >= 86) {
        router.push(`/transaction/${trimmedQuery}`);
      } 
      // If it's likely a wallet address
      else if (trimmedQuery.length >= 32) {
        router.push(`/whale/${trimmedQuery}`);
      }
    } else {
      // Implement search by label or other criteria
      // This would typically call an API endpoint that searches for whales by label
      console.log('Searching for:', trimmedQuery);
    }
  };

  return (
    <form onSubmit={handleSearch} className="w-full max-w-md">
      <div className="relative">
        <input
          type="text"
          className="w-full px-4 py-3 pl-10 rounded-lg bg-dark-bg border border-gray-700 text-white focus:outline-none focus:border-solana-teal"
          placeholder="Search by address, signature, or label..."
          value={query}
          onChange={(e) => setQuery(e.target.value)}
        />
        <div className="absolute inset-y-0 left-0 flex items-center pl-3">
          <FiSearch className="text-gray-400" />
        </div>
        <button
          type="submit"
          className="absolute right-2 top-1/2 transform -translate-y-1/2 bg-solana-teal hover:bg-solana-green text-black font-medium rounded-md px-3 py-1"
        >
          Search
        </button>
      </div>
    </form>
  );
};

export default Search;
