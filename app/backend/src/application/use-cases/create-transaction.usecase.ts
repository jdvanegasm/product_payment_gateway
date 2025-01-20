import { Injectable, NotFoundException, BadRequestException, Inject } from '@nestjs/common';
import { TransactionRepository } from '../../domain/repositories/transaction-repository.interface';
import { ProductRepository } from '../../domain/repositories/product-repository.interface';
import { TRANSACTION_REPOSITORY } from '../../domain/repositories/transaction-repository.token';
import { PRODUCT_REPOSITORY } from '../../domain/repositories/product-repository.token';
import { CreateTransactionDTO } from '../dtos/create-transaction-dto';

@Injectable()
export class CreateTransactionUseCase {
  constructor(
    @Inject(TRANSACTION_REPOSITORY)
    private readonly transactionRepository: TransactionRepository,
    @Inject(PRODUCT_REPOSITORY)
    private readonly productRepository: ProductRepository
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
  
    // Calculate total if not provided
    const total = data.total ?? product.price * data.quantity;
  
    // Create the transaction
    const transaction = await this.transactionRepository.createTransaction({
      product_id: data.productId,
      customer_name: data.customerName,
      customer_email: data.customerEmail,
      delivery_address: data.deliveryAddress,
      quantity: data.quantity,
      total: data.total ?? product.price * data.quantity,
      taxes: data.taxes ?? (data.total ?? product.price * data.quantity) * 0.19,
      shipping_cost: data.shippingCost ?? 10.0,
      status: data.status,
      wompi_transaction_id: data.wompiTransactionId,
      card_type: data.cardType,
      last_four_digits: data.lastFourDigits,
      payment_status: data.paymentStatus,
    });
  
    // Deduct stock
    await this.productRepository.updateStock(data.productId, product.stock - data.quantity);
  
    return transaction;
  }  
}