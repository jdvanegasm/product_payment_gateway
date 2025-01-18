import { Injectable, Inject } from '@nestjs/common';
import { ProductRepository } from 'src/domain/repositories/product-repository.interface';
import { Product } from 'src/domain/entities/product.entity';
import { PRODUCT_REPOSITORY } from 'src/domain/repositories/product-repository.token';

@Injectable()
export class ListProductsUseCase {
  constructor(
    @Inject(PRODUCT_REPOSITORY)
    private readonly productRepository: ProductRepository,
  ) {}

  async execute(): Promise<Product[]> {
    return this.productRepository.findAll();
  }
}