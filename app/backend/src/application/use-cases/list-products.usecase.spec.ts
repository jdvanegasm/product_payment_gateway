import { Test } from '@nestjs/testing';
import { ListProductsUseCase } from './list-products.usecase';
import { ProductRepository } from 'src/domain/repositories/product-repository.interface';
import { PRODUCT_REPOSITORY } from '../../domain/repositories/product-repository.token';

describe('ListProductsUseCase', () => {
  let useCase: ListProductsUseCase;
  let repositoryMock: jest.Mocked<ProductRepository>;

  beforeEach(async () => {
    repositoryMock = {
      findAll: jest.fn(),
      findById: jest.fn(),
      updateStock: jest.fn(),
    };

    const moduleRef = await Test.createTestingModule({
      providers: [
        ListProductsUseCase,
        {
          provide: PRODUCT_REPOSITORY,
          useValue: repositoryMock,
        },
      ],
    }).compile();

    useCase = moduleRef.get<ListProductsUseCase>(ListProductsUseCase);
  });

  it('should return a list of products', async () => {
    const mockProducts = [
      { product_id: '1', name: 'Test Product', description: 'Desc', price: 100, stock: 10, image_url: 'url' },
    ];
    repositoryMock.findAll.mockResolvedValue(mockProducts);

    const result = await useCase.execute();
    expect(result).toEqual(mockProducts);
    expect(repositoryMock.findAll).toHaveBeenCalledTimes(1);
  });
});