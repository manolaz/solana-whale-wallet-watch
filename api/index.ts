import { Hono } from 'hono';
import { cors } from 'hono/cors';
import { serve } from '@hono/node-server';
import { serveStatic } from '@hono/node-server/serve-static';
import { Connection, PublicKey } from '@solana/web3.js';
import dotenv from 'dotenv';

// Load environment variables
dotenv.config();

const app = new Hono();
const port = process.env.PORT || 3000;

// Middleware
app.use('/*', cors());

// Serve static files
app.use('/*', serveStatic({ root: './public' }));

// Helius RPC configuration
const HELIUS_API_KEY = process.env.HELIUS_API_KEY;
const connection = new Connection(`https://mainnet.helius-rpc.com/?api-key=${HELIUS_API_KEY}`);

// API Routes
app.get('/api/whales', async (c) => {
  try {
    // For demo purposes, we'll use a list of known whale addresses
    // In a production app, you would determine these dynamically
    const whaleAddresses = [
      'FZp4GPEMdqS8m6WQ4pVykb1xQM39vXn9wMbw7JFXkgvL', // Solana Foundation
      'p5qXiC4XXZ1QDKYSQecPh8XYsp7QaB41K4pu9ZqKTic',  // Alameda Research
      'EPjFWdd5AufqSSqeM2qN1xzybapC8G4wEGGkZwyTDt1v', // USDC
      'So11111111111111111111111111111111111111112',  // Wrapped SOL
      '9n4nbM75f5Ui33ZbPYXn59EwSgE8CGsHtAeTH5YFeJ9E'  // Serum
    ];
    
    const whale_data = [];
    
    // Get balance for each whale address
    for (const address of whaleAddresses) {
      const publicKey = new PublicKey(address);
      const balance = await connection.getBalance(publicKey);
      const solBalance = balance / 1000000000; // Convert lamports to SOL
      
      // Get recent transactions
      const transactions = await connection.getSignaturesForAddress(publicKey, { limit: 5 });
      
      whale_data.push({
        address,
        solBalance,
        transactions: transactions.map(tx => ({
          signature: tx.signature,
          slot: tx.slot,
          blockTime: tx.blockTime,
          confirmationStatus: tx.confirmationStatus
        }))
      });
    }
    
    return c.json(whale_data);
  } catch (error) {
    console.error('Error:', error);
    return c.json({ error: 'Failed to fetch whale data' }, 500);
  }
});

// Get details for a specific transaction
app.get('/api/transaction/:signature', async (c) => {
  try {
    const signature = c.req.param('signature');
    const transaction = await connection.getParsedTransaction(signature);
    return c.json(transaction);
  } catch (error) {
    console.error('Error:', error);
    return c.json({ error: 'Failed to fetch transaction details' }, 500);
  }
});

// Get whale details by address
app.get('/api/whale/:address', async (c) => {
  try {
    const address = c.req.param('address');
    const publicKey = new PublicKey(address);
    
    // Get balance
    const balance = await connection.getBalance(publicKey);
    
    // Get recent transactions
    const transactions = await connection.getSignaturesForAddress(publicKey, { limit: 10 });
    
    // For each transaction, get more details
    const detailedTransactions = [];
    for (const tx of transactions.slice(0, 5)) { // Limit to first 5 to avoid rate limiting
      try {
        const details = await connection.getParsedTransaction(tx.signature);
        if (details) {
          // Extract key information from transaction
          const isReceive = details.transaction.message.accountKeys.some(
            (key, i) => i === 0 && key.pubkey.toString() !== address
          );
          
          let amount = 0;
          if (details.meta && details.meta.postBalances && details.meta.preBalances) {
            const accountIndex = details.transaction.message.accountKeys.findIndex(
              key => key.pubkey.toString() === address
            );
            if (accountIndex >= 0) {
              const preBalance = details.meta.preBalances[accountIndex];
              const postBalance = details.meta.postBalances[accountIndex];
              amount = Math.abs(postBalance - preBalance);
            }
          }
          
          detailedTransactions.push({
            signature: tx.signature,
            timestamp: tx.blockTime ? tx.blockTime * 1000 : Date.now(),
            type: isReceive ? 'receive' : 'send',
            amount,
            status: details.meta?.err ? 'failed' : 'confirmed'
          });
        }
      } catch (err) {
        console.error(`Error fetching details for transaction ${tx.signature}:`, err);
      }
    }
    
    return c.json({
      address,
      balance,
      transactions: detailedTransactions
    });
  } catch (error) {
    console.error('Error:', error);
    return c.json({ error: 'Failed to fetch whale details' }, 500);
  }
});

// Start the server if this file is run directly
if (require.main === module) {
  console.log(`Server starting on port ${port}...`);
  serve({
    fetch: app.fetch,
    port: port
  });
}

// Export the app for serverless environments
export default app;
