import { Module } from '@nestjs/common';
import { PrismaService } from './prisma.service';
import { PrismaProductRepository } from './prisma-product.repository';
import { PrismaTransactionRepository } from './prisma-transaction.repository';
import { PRODUCT_REPOSITORY } from '../../domain/repositories/product-repository.token';
import { TRANSACTION_REPOSITORY } from '../../domain/repositories/transaction-repository.token';

@Module({
  providers: [
    PrismaService,
    {
      provide: PRODUCT_REPOSITORY,
      useClass: PrismaProductRepository,
    },
    {
      provide: TRANSACTION_REPOSITORY,
      useClass: PrismaTransactionRepository,
    },
  ],
  exports: [PrismaService, PRODUCT_REPOSITORY, TRANSACTION_REPOSITORY],
})
export class PrismaModule {}