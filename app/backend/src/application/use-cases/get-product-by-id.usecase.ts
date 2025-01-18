import { Injectable, Inject } from '@nestjs/common';
import { ProductRepository } from 'src/domain/repositories/product-repository.interface';
import { PRODUCT_REPOSITORY } from 'src/domain/repositories/product-repository.token';
import { Product } from 'src/domain/entities/product.entity';

@Injectable()
export class GetProductByIdUseCase {
  constructor(
    @Inject(PRODUCT_REPOSITORY)
    private readonly productRepository: ProductRepository,
  ) {}

  async execute(id: string): Promise<Product> {
    const product = await this.productRepository.findById(id);
    if (!product) {
      throw new Error('Product not found');
    }
    return product;
  }
}