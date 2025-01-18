import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

async function main() {
  // Insert sample products
  const products = [
    {
      name: 'Gaming Laptop',
      description: 'High-performance laptop for gaming and productivity',
      price: 1499.99,
      stock: 20,
      image_url: 'https://dlcdnwebimgs.asus.com/gain/9536D098-2F1B-4EC1-A1FF-8A09BFF272EC/w717/h525/w273',
    },
    {
      name: 'Wireless Earbuds',
      description: 'Compact earbuds with noise cancellation',
      price: 99.99,
      stock: 200,
      image_url: 'https://m.media-amazon.com/images/I/61MgPeUAfvL._AC_UY218_.jpg',
    },
    {
      name: '4K Monitor',
      description: 'Ultra HD monitor with stunning visuals',
      price: 399.99,
      stock: 50,
      image_url: 'https://images.acer.com/is/image/acer/acer-monitor-ed340cu-h-blue-wp-01-1?$Series-Component-XL$',
    },
  ];

  for (const product of products) {
    await prisma.product.create({ data: product });
  }

  console.log('Seeding completed!');
}

main()
  .catch((e) => {
    console.error(e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
