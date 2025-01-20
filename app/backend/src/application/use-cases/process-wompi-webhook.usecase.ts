import * as crypto from 'crypto';
import { Injectable, BadRequestException } from '@nestjs/common';
import { UpdateTransactionStatusUseCase } from './update-transaction-status.usecase';
import { TransactionStatus } from '@prisma/client';

@Injectable()
export class ProcessWompiWebhookUseCase {
  constructor(private readonly updateTransactionStatusUseCase: UpdateTransactionStatusUseCase) {}

  async execute(payload: any, wompiSignature: string) {

    if (!this.validateWompiSignature(wompiSignature, payload)) {
      throw new BadRequestException('Invalid webhook signature');
    }

    const transactionId = payload.data?.transaction?.id;
    const wompiStatus = payload.data?.transaction?.status;

    if (!transactionId || !wompiStatus) {
      throw new BadRequestException('Invalid webhook payload');
    }

    const newStatus = this.mapWompiStatusToTransactionStatus(wompiStatus);

    await this.updateTransactionStatusUseCase.execute(transactionId, newStatus);
  }

  private validateWompiSignature(signature: string, payload: any): boolean {
    const secretKey = process.env.WOMPI_SIGNATURE_KEY;

    const computedSignature = crypto
      .createHmac('sha256', secretKey)
      .update(JSON.stringify(payload))
      .digest('hex');

    return signature === computedSignature;
  }

  private mapWompiStatusToTransactionStatus(wompiStatus: string): TransactionStatus {
    const statusMapping: Record<string, TransactionStatus> = {
      APPROVED: TransactionStatus.APPROVED,
      DECLINED: TransactionStatus.FAILED,
      PENDING: TransactionStatus.PENDING,
    };

    return statusMapping[wompiStatus] || TransactionStatus.FAILED;
  }
}