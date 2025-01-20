import { Injectable, NotFoundException, BadRequestException, Inject } from '@nestjs/common';
import { TransactionRepository } from '../../domain/repositories/transaction-repository.interface';
import { ProductRepository } from '../../domain/repositories/product-repository.interface';
import { TRANSACTION_REPOSITORY } from '../../domain/repositories/transaction-repository.token';
import { PRODUCT_REPOSITORY } from '../../domain/repositories/product-repository.token';
import { CreateTransactionDTO } from '../dtos/create-transaction-dto';
import { WompiPort } from '../../application/ports/wompi.ports';

@Injectable()
export class CreateTransactionUseCase {
  constructor(
    @Inject(TRANSACTION_REPOSITORY)
    private readonly transactionRepository: TransactionRepository,
    @Inject(PRODUCT_REPOSITORY)
    private readonly productRepository: ProductRepository,
    @Inject('WOMPI_PORT')
    private readonly wompiPort: WompiPort,
  ) {}

  async execute(data: CreateTransactionDTO) {
    // Check if the product exists
    const product = await this.productRepository.findById(data.productId);
    if (!product) {
      throw new NotFoundException('Product not found.');
    }
  
    // Validate stock
    if (product.stock < data.quantity) {
      throw new BadRequestException('Insufficient stock for the requested quantity.');
    }
  
    // Create a transaction on Wompi to get the wompi_transaction_id
    let wompiTransactionId = data.wompiTransactionId; // Use existing Wompi ID if provided
    
    if (!wompiTransactionId && data.cardNumber && data.cardExpirationMonth && data.cardExpirationYear && data.cardCvc) {
      const wompiTransaction = await this.wompiPort.createTransaction({
        amount_in_cents: data.total * 100,  // Wompi expects amount in cents
        currency: 'COP',
        payment_method: 'CARD',
        card: {
          number: data.cardNumber,
          expiration_month: data.cardExpirationMonth,
          expiration_year: data.cardExpirationYear,
          cvc: data.cardCvc,
        },
        email: data.customerEmail,
        name: data.customerName,
      });
      wompiTransactionId = wompiTransaction.id; // Save the Wompi transaction ID
    }

    if (!wompiTransactionId) {
      throw new BadRequestException('Wompi transaction ID is required.');
    }

    // Save the transaction in the database
    const transaction = await this.transactionRepository.createTransaction({
      product_id: data.productId,
      customer_name: data.customerName,
      customer_email: data.customerEmail,
      delivery_address: data.deliveryAddress,
      quantity: data.quantity,
      total: data.total,
      taxes: data.taxes,
      shipping_cost: data.shippingCost,
      status: data.status,
      wompi_transaction_id: wompiTransactionId, // Save the Wompi transaction ID
      card_type: data.cardType,
      last_four_digits: data.lastFourDigits,
      payment_status: 'PENDING',  // Initially set to pending
    });
  
    // Deduct stock
    await this.productRepository.updateStock(data.productId, product.stock - data.quantity);
  
    return transaction;
  }
}