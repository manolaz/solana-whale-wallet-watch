# Solana Whale Wallet Watch

A Next.js application for tracking Solana whale wallet activities.

## Features

- Track top Solana whale wallets
- View detailed transaction information
- Monitor wallet balances and activities
- Search for specific wallets or transactions

## Prerequisites

- Node.js 14.x or higher
- npm or yarn
- Helius API key (for enhanced Solana RPC functionality)

## Setup

1. Clone the repository
   ```bash
   git clone https://github.com/yourusername/solana-whale-wallet-watch.git
   cd solana-whale-wallet-watch
   ```

2. Install dependencies
   ```bash
   npm install
   # or 
   yarn install
   ```

3. Create an `.env` file in the root directory with the following content:
   ```
   PORT=3001
   NEXT_PUBLIC_API_BASE_URL=http://localhost:3001
   NEXT_PUBLIC_SOLANA_RPC_URL=https://api.mainnet-beta.solana.com
   HELIUS_API_KEY=your_helius_api_key_here
   NODE_ENV=development
   ```
   
   Replace `your_helius_api_key_here` with your actual Helius API key.

## Running the Application

To run both the Next.js frontend and the API server:

```bash
npm run dev:all
# or
yarn dev:all
```

To run just the frontend:

```bash
npm run dev
# or
yarn dev
```

To run just the API server:

```bash
npm run api
# or
yarn api
```

## Building for Production

```bash
npm run build
# or
yarn build
```

## API Endpoints

- `GET /api/whales`: Get a list of whale wallets
- `GET /api/whale/:address`: Get details for a specific whale wallet
- `GET /api/transaction/:signature`: Get details for a specific transaction

## Technologies Used

- Next.js
- React
- Solana Web3.js
- Hono (API server)
- Tailwind CSS
- TypeScript

## Screenshots

![Dashboard View](./screenshots/dashboard.png)
*Main dashboard showing monitored whale wallets*

![Transaction List](./screenshots/transactions.png)
*Transaction history for a selected wallet*

![Transaction Details](./screenshots/transaction-details.png)
*Expanded view of transaction instructions*

## Contributing

Contributions are welcome! Please feel free to submit a Pull Request.

## License

This project is licensed under the MIT License - see the LICENSE file for details.

## Acknowledgements

- [Helius](https://helius.xyz) - For their powerful Solana RPC services
- [Solana Foundation](https://solana.com) - For blockchain infrastructure
- [Solana Web3.js](https://github.com/solana-labs/solana-web3.js) - For blockchain interaction libraries
