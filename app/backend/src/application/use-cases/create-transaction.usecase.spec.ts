import { Test } from '@nestjs/testing';
import { CreateTransactionUseCase } from './create-transaction.usecase';
import { ProductRepository } from '../../domain/repositories/product-repository.interface';
import { TransactionRepository } from '../../domain/repositories/transaction-repository.interface';
import { CreateTransactionDTO } from '../dtos/create-transaction-dto';
import { TransactionStatus, CardType, PaymentStatus } from '@prisma/client';
import { PRODUCT_REPOSITORY } from '../../domain/repositories/product-repository.token';
import { TRANSACTION_REPOSITORY } from '../../domain/repositories/transaction-repository.token';
import { WompiPort } from '../../application/ports/wompi.ports';

describe('CreateTransactionUseCase', () => {
  let useCase: CreateTransactionUseCase;
  let productRepositoryMock: jest.Mocked<ProductRepository>;
  let transactionRepositoryMock: jest.Mocked<TransactionRepository>;
  let wompiPortMock: jest.Mocked<WompiPort>;

  beforeEach(async () => {
    productRepositoryMock = {
      findById: jest.fn(),
      updateStock: jest.fn(),
      findAll: jest.fn(),
    };

    transactionRepositoryMock = {
      createTransaction: jest.fn(),
      updateTransactionStatus: jest.fn(),
      getTransactionById: jest.fn(),
    };

    wompiPortMock = {
      createTransaction: jest.fn(),
      getTransactionStatus: jest.fn(),
    };

    const moduleRef = await Test.createTestingModule({
      providers: [
        CreateTransactionUseCase,
        { provide: PRODUCT_REPOSITORY, useValue: productRepositoryMock },
        { provide: TRANSACTION_REPOSITORY, useValue: transactionRepositoryMock },
        { provide: 'WOMPI_PORT', useValue: wompiPortMock },
      ],
    }).compile();

    useCase = moduleRef.get<CreateTransactionUseCase>(CreateTransactionUseCase);
  });

  it('should create a transaction with an existing Wompi transaction ID and update stock', async () => {
    const mockProduct = {
      product_id: '1',
      name: 'Test Product',
      description: 'Desc',
      price: 100,
      stock: 10,
      image_url: 'url',
    };

    const mockTransaction = {
      transaction_id: '1',
      product_id: '1',
      customer_name: 'John Doe',
      customer_email: 'johndoe@example.com',
      delivery_address: '123 Test St',
      quantity: 2,
      total: 200,
      taxes: 38,
      shipping_cost: 10,
      status: 'PENDING' as TransactionStatus,
      wompi_transaction_id: 'wompi-id',
      card_type: 'Visa' as CardType,
      last_four_digits: '1234',
      payment_status: 'PENDING' as PaymentStatus,
    };

    productRepositoryMock.findById.mockResolvedValue(mockProduct);
    transactionRepositoryMock.createTransaction.mockResolvedValue(mockTransaction);

    const input: CreateTransactionDTO = {
      productId: '1',
      customerName: 'John Doe',
      customerEmail: 'johndoe@example.com',
      deliveryAddress: '123 Test St',
      quantity: 2,
      total: 200,
      taxes: 38,
      shippingCost: 10,
      status: 'PENDING',
      wompiTransactionId: 'wompi-id',
      cardType: 'Visa',
      lastFourDigits: '1234',
      paymentStatus: 'PENDING',
    };

    const result = await useCase.execute(input);

    expect(result).toEqual(mockTransaction);
    expect(productRepositoryMock.findById).toHaveBeenCalledWith('1');
    expect(productRepositoryMock.updateStock).toHaveBeenCalledWith('1', 8);
    expect(transactionRepositoryMock.createTransaction).toHaveBeenCalledWith(expect.objectContaining({
      product_id: '1',
      customer_name: 'John Doe',
    }));
  });

  it('should create a transaction by generating a Wompi transaction ID and update stock', async () => {
    const mockProduct = {
      product_id: '1',
      name: 'Test Product',
      description: 'Desc',
      price: 100,
      stock: 10,
      image_url: 'url',
    };

    const mockTransaction = {
      transaction_id: '1',
      product_id: '1',
      customer_name: 'John Doe',
      customer_email: 'johndoe@example.com',
      delivery_address: '123 Test St',
      quantity: 2,
      total: 200,
      taxes: 38,
      shipping_cost: 10,
      status: 'PENDING' as TransactionStatus,
      wompi_transaction_id: 'generated-wompi-id',
      card_type: 'Visa' as CardType,
      last_four_digits: '1234',
      payment_status: 'PENDING' as PaymentStatus,
    };

    const mockWompiTransaction = { id: 'generated-wompi-id' };

    productRepositoryMock.findById.mockResolvedValue(mockProduct);
    transactionRepositoryMock.createTransaction.mockResolvedValue(mockTransaction);
    wompiPortMock.createTransaction.mockResolvedValue(mockWompiTransaction);

    const input: CreateTransactionDTO = {
      productId: '1',
      customerName: 'John Doe',
      customerEmail: 'johndoe@example.com',
      deliveryAddress: '123 Test St',
      quantity: 2,
      total: 200,
      taxes: 38,
      shippingCost: 10,
      status: 'PENDING',
      cardType: 'Visa',
      lastFourDigits: '1234',
      paymentStatus: 'PENDING',
      cardNumber: '4242424242424242',
      cardExpirationMonth: '12',
      cardExpirationYear: '24',
      cardCvc: '123',
    };

    const result = await useCase.execute(input);

    expect(result).toEqual(mockTransaction);
    expect(productRepositoryMock.findById).toHaveBeenCalledWith('1');
    expect(productRepositoryMock.updateStock).toHaveBeenCalledWith('1', 8);
    expect(wompiPortMock.createTransaction).toHaveBeenCalledWith(expect.objectContaining({
      amount_in_cents: 20000,
      currency: 'COP',
      payment_method: 'CARD',
      card: {
        number: '4242424242424242',
        expiration_month: '12',
        expiration_year: '24',
        cvc: '123',
      },
      email: 'johndoe@example.com',
      name: 'John Doe',
    }));
    expect(transactionRepositoryMock.createTransaction).toHaveBeenCalledWith(expect.objectContaining({
      wompi_transaction_id: 'generated-wompi-id',
    }));
  });

  it('should throw an error if the product does not exist', async () => {
    productRepositoryMock.findById.mockResolvedValue(null);

    const input: CreateTransactionDTO = {
      productId: '1',
      customerName: 'John Doe',
      customerEmail: 'johndoe@example.com',
      deliveryAddress: '123 Test St',
      quantity: 2,
      total: 200,
      taxes: 38,
      shippingCost: 10,
      status: 'PENDING',
      wompiTransactionId: 'wompi-id',
      cardType: 'Visa',
      lastFourDigits: '1234',
      paymentStatus: 'PENDING',
    };

    await expect(useCase.execute(input)).rejects.toThrow('Product not found');
    expect(productRepositoryMock.findById).toHaveBeenCalledWith('1');
  });

  it('should throw an error if there is insufficient stock', async () => {
    const mockProduct = {
      product_id: '1',
      name: 'Test Product',
      description: 'Desc',
      price: 100,
      stock: 1,
      image_url: 'url',
    };

    productRepositoryMock.findById.mockResolvedValue(mockProduct);

    const input: CreateTransactionDTO = {
      productId: '1',
      customerName: 'John Doe',
      customerEmail: 'johndoe@example.com',
      deliveryAddress: '123 Test St',
      quantity: 2,
      total: 200,
      taxes: 38,
      shippingCost: 10,
      status: 'PENDING',
      wompiTransactionId: 'wompi-id',
      cardType: 'Visa',
      lastFourDigits: '1234',
      paymentStatus: 'PENDING',
    };

    await expect(useCase.execute(input)).rejects.toThrow('Insufficient stock for the requested quantity');
    expect(productRepositoryMock.findById).toHaveBeenCalledWith('1');
  });
});