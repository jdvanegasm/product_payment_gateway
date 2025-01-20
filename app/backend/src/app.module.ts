import { Module } from '@nestjs/common';
import { ProductController } from './presentation/controllers/product.controller';
import { TransactionController } from './presentation/controllers/transaction.controller';
import { PrismaModule } from './infrastructure/prisma/prisma.module';
import { ListProductsUseCase } from './application/use-cases/list-products.usecase';
import { GetProductByIdUseCase } from './application/use-cases/get-product-by-id.usecase';
import { UpdateTransactionStatusUseCase } from './application/use-cases/update-transaction-status.usecase';
import { CreateTransactionUseCase } from './application/use-cases/create-transaction.usecase';

@Module({
  imports: [PrismaModule],
  controllers: [ProductController, TransactionController],
  providers: [
    ListProductsUseCase,
    GetProductByIdUseCase,
    UpdateTransactionStatusUseCase,
    CreateTransactionUseCase,
  ],
})
export class AppModule {}