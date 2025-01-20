import { Product } from '@prisma/client';

export interface ProductRepository {
  findById(productId: string): Promise<Product | null>;
  updateStock(productId: string, newStock: number): Promise<Product>;
  findAll(): Promise<Product[]>;
}