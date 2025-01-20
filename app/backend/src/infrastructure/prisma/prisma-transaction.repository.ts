import { Injectable } from '@nestjs/common';
import { PrismaService } from './prisma.service';
import { Transaction, TransactionStatus } from '@prisma/client';
import { TransactionRepository } from '../../domain/repositories/transaction-repository.interface';

@Injectable()
export class PrismaTransactionRepository implements TransactionRepository {
  constructor(private readonly prisma: PrismaService) {}

  /**
   * Creates a new transaction in the database.
   * @param data - Partial transaction data.
   * @returns The created transaction.
   */
  async createTransaction(data: Partial<Transaction>): Promise<Transaction> {
    return this.prisma.transaction.create({
      data: {
        product_id: data.product_id,
        customer_name: data.customer_name,
        customer_email: data.customer_email,
        delivery_address: data.delivery_address,
        quantity: data.quantity,
        total: data.total,
        taxes: data.taxes,
        shipping_cost: data.shipping_cost,
        status: data.status || 'PENDING',
        wompi_transaction_id: data.wompi_transaction_id,
        card_type: data.card_type,
        last_four_digits: data.last_four_digits,
        payment_status: data.payment_status || 'APPROVED',
      },
    });
  }

  /**
   * Updates the status of a transaction.
   * @param transactionId - Transaction ID.
   * @param status - New transaction status.
   * @returns The updated transaction.
   */
  async updateTransactionStatus(transactionId: string, status: TransactionStatus): Promise<Transaction> {
    return this.prisma.transaction.update({
      where: { transaction_id: transactionId },
      data: { status },
    });
  }

  /**
   * Retrieves a transaction by its ID.
   * @param transactionId - Transaction ID.
   * @returns The transaction or null if not found.
   */
  async getTransactionById(transactionId: string): Promise<Transaction | null> {
    return this.prisma.transaction.findUnique({
      where: { transaction_id: transactionId },
    });
  }
}