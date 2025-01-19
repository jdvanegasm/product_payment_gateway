import { Injectable } from '@nestjs/common';
import { TransactionRepository } from '../../domain/repositories/transaction.repository';
import { WompiAdapter } from '../../infrastructure/adapters/wompi.adapter';
import { CreateCheckoutDTO } from '../dtos/create-checkout.dto';

@Injectable()
export class CheckoutUseCase {
  constructor(
    private readonly transactionRepository: TransactionRepository,
    private readonly wompiAdapter: WompiAdapter,
  ) {}

  /**
   * Executes the checkout process by creating a transaction and integrating with Wompi.
   * @param data - Data received from the frontend via DTO.
   * @returns Transaction details and Wompi response.
   */
  async execute(data: CreateCheckoutDTO) {
    // Step 1: Create a pending transaction in the database
    const transaction = await this.transactionRepository.create({
      order_id: data.orderId, // This assumes the order is pre-created
      total: data.totalAmount,
      taxes: data.taxes,
      shipping_cost: data.shippingCost,
      status: 'PENDING',
    });

    // Step 2: Prepare the payload for Wompi
    const wompiPayload = {
      amount_in_cents: Math.round(data.totalAmount * 100), // Convert total to cents
      currency: 'COP',
      payment_method: {
        type: 'CARD',
        token: data.paymentToken, // The card token provided by the frontend
      },
      reference: transaction.transaction_id,
    };

    // Step 3: Send the request to Wompi and handle the response
    const wompiResponse = await this.wompiAdapter.createTransaction(wompiPayload);

    // Step 4: Update the transaction status based on Wompi response
    const updatedTransaction = await this.transactionRepository.updateStatus(
      transaction.transaction_id,
      wompiResponse.status.toUpperCase(), // Assuming Wompi response includes a status field
    );

    // Step 5: Return the transaction and the Wompi response
    return {
      transaction: updatedTransaction,
      wompi: wompiResponse,
    };
  }
}