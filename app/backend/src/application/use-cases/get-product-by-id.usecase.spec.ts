import { Test } from '@nestjs/testing';
import { GetProductByIdUseCase } from './get-product-by-id.usecase';
import { ProductRepository } from 'src/domain/repositories/product-repository.interface';

describe('GetProductByIdUseCase', () => {
  let useCase: GetProductByIdUseCase;
  let repositoryMock: jest.Mocked<ProductRepository>;

  beforeEach(async () => {
    repositoryMock = {
      findAll: jest.fn(),
      findById: jest.fn(),
    };

    const moduleRef = await Test.createTestingModule({
      providers: [
        GetProductByIdUseCase,
        {
          provide: 'PRODUCT_REPOSITORY',
          useValue: repositoryMock,
        },
      ],
    }).compile();

    useCase = moduleRef.get<GetProductByIdUseCase>(GetProductByIdUseCase);
  });

  it('should return a product by ID', async () => {
    const mockProduct = { product_id: '1', name: 'Test Product', description: 'Desc', price: 100, stock: 10, image_url: 'url' };
    repositoryMock.findById.mockResolvedValue(mockProduct);

    const result = await useCase.execute('1');
    expect(result).toEqual(mockProduct);
    expect(repositoryMock.findById).toHaveBeenCalledWith('1');
  });

  it('should throw an error if the product is not found', async () => {
    repositoryMock.findById.mockResolvedValue(null);

    await expect(useCase.execute('1')).rejects.toThrow('Product not found');
    expect(repositoryMock.findById).toHaveBeenCalledWith('1');
  });
});
