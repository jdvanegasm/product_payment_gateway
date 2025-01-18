import { Injectable } from '@nestjs/common';
import { PrismaService } from './prisma.service';
import { Product } from '../../domain/entities/product.entity';
import { ProductRepository } from '../../domain/repositories/product-repository.interface';

@Injectable()
export class PrismaProductRepository implements ProductRepository {
  constructor(private readonly prisma: PrismaService) {}

  async findAll(): Promise<Product[]> {
    return this.prisma.product.findMany();
  }

  async findById(id: string): Promise<Product | null> {
    return this.prisma.product.findUnique({
      where: { product_id: id },
    });
  }
}