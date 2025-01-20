import { Module } from '@nestjs/common';
import { ProductController } from './presentation/controllers/product.controller';
import { TransactionController } from './presentation/controllers/transaction.controller';
import { WebhookController } from './presentation/controllers/webhook.controller';
import { CardTokenController } from './presentation/controllers/card-token.controller';
import { PrismaModule } from './infrastructure/prisma/prisma.module';
import { ListProductsUseCase } from './application/use-cases/list-products.usecase';
import { GetProductByIdUseCase } from './application/use-cases/get-product-by-id.usecase';
import { UpdateTransactionStatusUseCase } from './application/use-cases/update-transaction-status.usecase';
import { CreateTransactionUseCase } from './application/use-cases/create-transaction.usecase';
import { ProcessWompiWebhookUseCase } from './application/use-cases/process-wompi-webhook.usecase';
import { TokenizeCardUseCase } from './application/use-cases/tokenize-card.usecase';
import { WompiAdapter } from './infrastructure/adapters/wompi.adapter';

@Module({
  imports: [PrismaModule],
  controllers: [
    ProductController,
    TransactionController,
    WebhookController,
    CardTokenController,
  ],
  providers: [
    ListProductsUseCase,
    GetProductByIdUseCase,
    UpdateTransactionStatusUseCase,
    CreateTransactionUseCase,
    ProcessWompiWebhookUseCase,
    TokenizeCardUseCase,
    {
      provide: 'WOMPI_PORT',
      useClass: WompiAdapter,
    },
  ],
})
export class AppModule {}
