import { Controller, Get, Param } from '@nestjs/common';
import { ListProductsUseCase } from 'src/application/use-cases/list-products.usecase';
import { GetProductByIdUseCase } from 'src/application/use-cases/get-product-by-id.usecase';

@Controller('products')
export class ProductController {
  constructor(
    private readonly listProductsUseCase: ListProductsUseCase,
    private readonly getProductByIdUseCase: GetProductByIdUseCase,
  ) {}

  @Get()
  async listProducts() {
    return this.listProductsUseCase.execute();
  }

  @Get(':id')
  async getProductById(@Param('id') id: string) {
    return this.getProductByIdUseCase.execute(id);
  }
}