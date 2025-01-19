import { Injectable } from '@nestjs/common';
import { PrismaService } from '../../infrastructure/prisma/prisma.service';
import { Prisma, TransactionStatus } from '@prisma/client';

@Injectable()
export class TransactionRepository {
  constructor(private readonly prisma: PrismaService) {}

  /**
   * Creates a transaction in the database.
   * @param data - Transaction data to create.
   * @returns The created transaction.
   */
  async create(data: Prisma.TransactionCreateInput) {
    return this.prisma.transaction.create({
      data: {
        order: {
          connect: {
            order_id: data.order.connect.order_id, // Connect to the existing order
          },
        },
        total: data.total,
        taxes: data.taxes,
        shipping_cost: data.shipping_cost,
        status: data.status,
      },
    });
  }

  /**
   * Updates the status of a transaction in the database.
   * @param transactionId - The transaction ID to update.
   * @param status - The new status of the transaction.
   * @returns The updated transaction.
   */
  async updateStatus(transactionId: string, status: TransactionStatus) {
    return this.prisma.transaction.update({
      where: { transaction_id: transactionId },
      data: { status },
    });
  }
}