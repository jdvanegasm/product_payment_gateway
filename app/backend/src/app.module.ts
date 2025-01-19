import { Module } from '@nestjs/common';
import { ProductController } from './presentation/controllers/product.controller';
import { PrismaModule } from './infrastructure/prisma/prisma.module';
import { PrismaProductRepository } from './infrastructure/prisma/prisma-product.repository';
import { PRODUCT_REPOSITORY } from './domain/repositories/product-repository.token';
import { ListProductsUseCase } from './application/use-cases/list-products.usecase';
import { GetProductByIdUseCase } from './application/use-cases/get-product-by-id.usecase';

import { CheckoutController } from './presentation/controllers/checkout.controller';
import { CheckoutUseCase } from './application/use-cases/checkout.usecase';
import { PrismaTransactionRepository } from './infrastructure/prisma/prisma-transaction.repository'; // Repositorio de transacciones
import { TRANSACTION_REPOSITORY } from './domain/repositories/transaction-repository.token';
import { WompiAdapter } from './infrastructure/adapters/wompi.adapter';

@Module({
  imports: [PrismaModule],
  controllers: [ProductController, CheckoutController],
  providers: [
    ListProductsUseCase,
    GetProductByIdUseCase,

    CheckoutUseCase,

    {
      provide: PRODUCT_REPOSITORY,
      useClass: PrismaProductRepository,
    },
    {
      provide: TRANSACTION_REPOSITORY,
      useClass: PrismaTransactionRepository,
    },

    WompiAdapter, 
  ],
})
export class AppModule {}