
export interface PinState {
  code: string;
  isError: boolean;
  isSuccess: boolean;
}

export type KeyValue = '1' | '2' | '3' | '4' | '5' | '6' | '7' | '8' | '9' | '0' | 'delete';

export interface Transaction {
  id: string;
  type: 'qr' | 'piggybank' | 'other';
  title: string;
  amount: number;
  date: Date;
  requisite?: string;
  category: string;
  status: 'success' | 'pending' | 'failed';
}
