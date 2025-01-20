import { Transaction, TransactionStatus, CardType, PaymentStatus } from '@prisma/client';

export interface TransactionRepository {
  createTransaction(data: Partial<Transaction>): Promise<Transaction>;
  updateTransactionStatus(transactionId: string, status: TransactionStatus): Promise<Transaction>;
  getTransactionById(transactionId: string): Promise<Transaction | null>;
}