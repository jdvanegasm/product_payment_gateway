import { Controller, Patch, Param, Body, Inject, NotFoundException, BadRequestException } from '@nestjs/common';
import { UpdateTransactionStatusUseCase } from '../../application/use-cases/update-transaction-status.usecase';
import { TransactionStatus } from '@prisma/client';

@Controller('transactions')
export class TransactionController {
  constructor(
    private readonly updateTransactionStatusUseCase: UpdateTransactionStatusUseCase
  ) {}

  /**
   * Updates the status of a transaction.
   * @param id - The ID of the transaction to update.
   * @param status - The new status of the transaction (APPROVED or FAILED).
   * @returns The updated transaction.
   * @throws NotFoundException if the transaction does not exist.
   * @throws BadRequestException if the status is invalid.
   */
  @Patch(':id/status')
  async updateStatus(
    @Param('id') id: string,
    @Body('status') status: TransactionStatus
  ) {
    if (!['APPROVED', 'FAILED'].includes(status)) {
      throw new BadRequestException('Invalid transaction status.');
    }

    const transaction = await this.updateTransactionStatusUseCase.execute(id, status);
    if (!transaction) {
      throw new NotFoundException('Transaction not found.');
    }

    return transaction;
  }
}