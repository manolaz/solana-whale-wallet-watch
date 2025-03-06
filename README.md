# Solana Whale Wallet Watch

A specialized monitoring tool that tracks high-value "whale" wallets on the Solana blockchain using Helius RPC services, providing real-time balance data and transaction history with a clean, dark-themed interface.

## Features

- **Whale Wallet Tracking**: Monitor specified high-value Solana accounts
- **Balance Monitoring**: Track SOL and token holdings for each wallet
- **Transaction History**: View recent transactions for monitored accounts
- **Detailed Analysis**: Examine transaction details with expandable instruction views
- **On-Demand Updates**: Refresh data instantly with a single click
- **Explorer Integration**: Direct links to Solana Explorer for further investigation

## Installation

```bash
# Clone the repository
git clone https://github.com/yourusername/solana-whale-wallet-watch.git

# Navigate to project directory
cd solana-whale-wallet-watch

# Install dependencies
npm install

# Create a configuration file (see Configuration section)
cp .env.example .env
```

## Configuration

Create a `.env` file in the project root with the following variables:

```
HELIUS_API_KEY=your_helius_api_key_here
SOLANA_NETWORK=mainnet  # or devnet for testing
```

You can obtain a Helius API key by signing up at [https://helius.xyz](https://helius.xyz).

## Usage

```bash
# Start the development server
npm start

# Build for production
npm run build
```

After starting the application:

1. The main dashboard will display all configured whale wallets with their current balances
2. Click on any wallet to view its recent transactions
3. Select a specific transaction to see detailed information about its instructions
4. Use the refresh button to update data on demand

## Technical Implementation

- **Blockchain Integration**: Built with `@solana/web3.js` library
- **Data Provider**: Leverages Helius RPC for reliable blockchain access
- **User Interface**: Clean, dark-themed UI optimized for blockchain data visualization
- **Transaction Parsing**: Custom parsers to interpret complex transaction instructions
- **Real-time Updates**: Efficient data fetching with optimized refresh mechanisms

## Transaction Details

When viewing transaction details, you'll see:

- Transaction signature
- Timestamp
- Block information
- Fee details
- Instruction breakdown with:
  - Program invocation hierarchy
  - Account interactions
  - Instruction data (decoded where possible)

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
