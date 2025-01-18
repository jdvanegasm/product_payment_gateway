import { Test, TestingModule } from '@nestjs/testing';
import { ProductController } from './product.controller';
import { ListProductsUseCase } from 'src/application/use-cases/list-products.usecase';
import { GetProductByIdUseCase } from 'src/application/use-cases/get-product-by-id.usecase';

describe('ProductController', () => {
  let controller: ProductController;
  let listProductsUseCase: jest.Mocked<ListProductsUseCase>;
  let getProductByIdUseCase: jest.Mocked<GetProductByIdUseCase>;

  beforeEach(async () => {
    listProductsUseCase = { execute: jest.fn() } as any;
    getProductByIdUseCase = { execute: jest.fn() } as any;

    const moduleRef: TestingModule = await Test.createTestingModule({
      controllers: [ProductController],
      providers: [
        { provide: ListProductsUseCase, useValue: listProductsUseCase },
        { provide: GetProductByIdUseCase, useValue: getProductByIdUseCase },
      ],
    }).compile();

    controller = moduleRef.get<ProductController>(ProductController);
  });

  it('should return a list of products', async () => {
    const mockProducts = [
      { product_id: '1', name: 'Test Product', description: 'Desc', price: 100, stock: 10, image_url: 'url' },
    ];
    listProductsUseCase.execute.mockResolvedValue(mockProducts);

    const result = await controller.listProducts();
    expect(result).toEqual(mockProducts);
    expect(listProductsUseCase.execute).toHaveBeenCalledTimes(1);
  });

  it('should return a product by ID', async () => {
    const mockProduct = { product_id: '1', name: 'Test Product', description: 'Desc', price: 100, stock: 10, image_url: 'url' };
    getProductByIdUseCase.execute.mockResolvedValue(mockProduct);

    const result = await controller.getProductById('1');
    expect(result).toEqual(mockProduct);
    expect(getProductByIdUseCase.execute).toHaveBeenCalledWith('1');
  });
});