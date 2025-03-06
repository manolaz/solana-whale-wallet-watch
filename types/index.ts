export interface TransactionDetail {
  signature: string;
  timestamp: number;
  status: 'confirmed' | 'pending' | 'failed';
  fee: number;
  slot: number;
  blockTime: number;
  instructions: {
    program: string;
    data: string;
  }[];
  accounts: string[];
}

export interface Whale {
  address: string;
  label: string;
  balance: number;
  transactions: {
    signature: string;
    timestamp: number;
    type: string;
    amount: number;
    status: 'confirmed' | 'pending' | 'failed';
  }[];
}
