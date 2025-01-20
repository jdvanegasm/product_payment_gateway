import { Injectable } from '@nestjs/common';
import { PrismaService } from './prisma.service';
import { ProductRepository } from '../../domain/repositories/product-repository.interface';
import { Product } from '@prisma/client';

@Injectable()
export class PrismaProductRepository implements ProductRepository {
  constructor(private readonly prisma: PrismaService) {}

  async findById(productId: string): Promise<Product | null> {
    return this.prisma.product.findUnique({ where: { product_id: productId } });
  }

  async updateStock(productId: string, newStock: number): Promise<Product> {
    return this.prisma.product.update({
      where: { product_id: productId },
      data: { stock: newStock },
    });
  }

  async findAll(): Promise<Product[]> {
    return this.prisma.product.findMany();
  }
}