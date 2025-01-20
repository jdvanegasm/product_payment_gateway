import { Test } from '@nestjs/testing';
import { UpdateTransactionStatusUseCase } from './update-transaction-status.usecase';
import { TransactionRepository } from '../../domain/repositories/transaction-repository.interface';
import { TransactionStatus, CardType, PaymentStatus } from '@prisma/client';
import { NotFoundException, BadRequestException } from '@nestjs/common';
import { TRANSACTION_REPOSITORY } from '../../domain/repositories/transaction-repository.token'

describe('UpdateTransactionStatusUseCase', () => {
  let useCase: UpdateTransactionStatusUseCase;
  let transactionRepositoryMock: jest.Mocked<TransactionRepository>;

  beforeEach(async () => {
    transactionRepositoryMock = {
      createTransaction: jest.fn(),
      updateTransactionStatus: jest.fn(),
      getTransactionById: jest.fn(),
    };

    const moduleRef = await Test.createTestingModule({
      providers: [
        UpdateTransactionStatusUseCase,
        { provide: TRANSACTION_REPOSITORY, useValue: transactionRepositoryMock },
      ],
    }).compile();

    useCase = moduleRef.get<UpdateTransactionStatusUseCase>(UpdateTransactionStatusUseCase);
  });

  it('should update the transaction status successfully', async () => {
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
      status: TransactionStatus.PENDING,
      wompi_transaction_id: 'wompi-id',
      card_type: CardType.Visa,
      last_four_digits: '1234',
      payment_status: PaymentStatus.PENDING,
    };

    transactionRepositoryMock.getTransactionById.mockResolvedValue(mockTransaction);
    transactionRepositoryMock.updateTransactionStatus.mockResolvedValue({
      ...mockTransaction,
      status: TransactionStatus.APPROVED,
    });

    const result = await useCase.execute('1', TransactionStatus.APPROVED);

    expect(result.status).toBe(TransactionStatus.APPROVED);
    expect(transactionRepositoryMock.getTransactionById).toHaveBeenCalledWith('1');
    expect(transactionRepositoryMock.updateTransactionStatus).toHaveBeenCalledWith('1', TransactionStatus.APPROVED);
  });

  it('should throw a NotFoundException if the transaction does not exist', async () => {
    transactionRepositoryMock.getTransactionById.mockResolvedValue(null);

    await expect(useCase.execute('1', TransactionStatus.APPROVED)).rejects.toThrow(NotFoundException);
    expect(transactionRepositoryMock.getTransactionById).toHaveBeenCalledWith('1');
  });

  it('should throw a BadRequestException if the status is invalid', async () => {
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
      status: TransactionStatus.PENDING,
      wompi_transaction_id: 'wompi-id',
      card_type: CardType.Visa,
      last_four_digits: '1234',
      payment_status: PaymentStatus.PENDING,
    };

    transactionRepositoryMock.getTransactionById.mockResolvedValue(mockTransaction);

    await expect(useCase.execute('1', 'INVALID_STATUS' as TransactionStatus)).rejects.toThrow(BadRequestException);
    expect(transactionRepositoryMock.getTransactionById).toHaveBeenCalledWith('1');
    expect(transactionRepositoryMock.updateTransactionStatus).not.toHaveBeenCalled();
  });
});