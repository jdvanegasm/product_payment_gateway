import { Module } from '@nestjs/common';
import { ProductController } from './presentation/controllers/product.controller';
import { PrismaModule } from './infrastructure/prisma/prisma.module';
import { PrismaProductRepository } from './infrastructure/prisma/prisma-product.repository';
import { PRODUCT_REPOSITORY } from './domain/repositories/product-repository.token';
import { ListProductsUseCase } from './application/use-cases/list-products.usecase';
import { GetProductByIdUseCase } from './application/use-cases/get-product-by-id.usecase';

@Module({
  imports: [PrismaModule],
  controllers: [ProductController],
  providers: [
    ListProductsUseCase,
    GetProductByIdUseCase,
    {
      provide: PRODUCT_REPOSITORY,
      useClass: PrismaProductRepository,
    },
  ],
})
export class AppModule {}