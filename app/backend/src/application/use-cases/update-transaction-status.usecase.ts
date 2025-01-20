import { Injectable, NotFoundException, BadRequestException, Inject } from '@nestjs/common';
import { TransactionRepository } from '../../domain/repositories/transaction-repository.interface';
import { TRANSACTION_REPOSITORY } from '../../domain/repositories/transaction-repository.token';
import { TransactionStatus } from '@prisma/client';

@Injectable()
export class UpdateTransactionStatusUseCase {
  constructor(
    @Inject(TRANSACTION_REPOSITORY)
    private readonly transactionRepository: TransactionRepository
  ) {}

  async execute(transactionId: string, newStatus: TransactionStatus) {
    // Check if the transaction exists
    const transaction = await this.transactionRepository.getTransactionById(transactionId);
    if (!transaction) {
      throw new NotFoundException('Transaction not found.');
    }

    // Validate new status
    if (!['APPROVED', 'FAILED'].includes(newStatus)) {
      throw new BadRequestException('Invalid transaction status.');
    }

    // Update the transaction status
    const updatedTransaction = await this.transactionRepository.updateTransactionStatus(
      transactionId,
      newStatus
    );

    return updatedTransaction;
  }
}