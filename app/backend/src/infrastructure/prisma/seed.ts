import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

async function main() {
  // Insert sample laptops
  const laptops = [
    {
      name: 'Gaming Laptop - Model A',
      description: 'High-performance laptop designed for gaming and multitasking.',
      price: 1499.99,
      stock: 20,
      image_url: 'https://www.alkosto.com/medias/198153728671-001-750Wx750H?context=bWFzdGVyfGltYWdlc3wyMjk4NHxpbWFnZS93ZWJwfGFEWTBMMmc1Tmk4eE5EVXpNVGszTWpNd01EZ3pNQzh4T1RneE5UTTNNamcyTnpGZk1EQXhYemMxTUZkNE56VXdTQXxjMDlkODY2ZDYwMzRiYzBkMzJjZDRkMmRkNWE1OWE0NmMzZjYyYjA5ODRhYjhhN2Y1MmM3MDgxOGExZTc2ZmQ1',
    },
    {
      name: 'Ultrabook - Model B',
      description: 'Lightweight and powerful laptop for productivity on the go.',
      price: 1299.99,
      stock: 15,
      image_url: 'https://www.alkosto.com/medias/198122718313-001-750Wx750H?context=bWFzdGVyfGltYWdlc3wzMzY4NHxpbWFnZS93ZWJwfGFEWmtMMmhsWWk4eE5EWXpORFExTlRjNU16WTVOQzh4T1RneE1qSTNNVGd6TVROZk1EQXhYemMxTUZkNE56VXdTQXwzZDE3YmM0NTdlODgwYzIxMDc3MzdhNjdiNjg4Y2FjNGMyZmM2OGY2ZDRkNzExYTEzZDBlOTIxZjdiMDJjNGE5',
    },
    {
      name: 'Workstation Laptop - Model C',
      description: 'Powerful workstation laptop for professionals and creators.',
      price: 1999.99,
      stock: 10,
      image_url: 'https://www.alkosto.com/medias/4711387567067-001-750Wx750H?context=bWFzdGVyfGltYWdlc3wzMDQyOHxpbWFnZS93ZWJwfGFEZzFMMmd6Wmk4eE5EYzJNRGt4TWpNNE9ERXlOaTgwTnpFeE16ZzNOVFkzTURZM1h6QXdNVjgzTlRCWGVEYzFNRWd8MWQxY2MzZjYxZjUxZjAzZjZiMjhkMDZmMDRmYTUyODYzOTU2YzgzMzRkODQ1YjdjZWVkZjRjN2QxOTRkNGNkMg',
    },
    {
      name: 'Professional Laptop - Model D',
      description: 'Reliable laptop designed for professionals with demanding workloads.',
      price: 1799.99,
      stock: 12,
      image_url: 'https://www.alkosto.com/medias/4711121760778-001-750Wx750H?context=bWFzdGVyfGltYWdlc3wzOTc2MHxpbWFnZS93ZWJwfGFESTVMMmcyT0M4eE5ETTJNREU1TURNNE5qSXdOaTgwTnpFeE1USXhOell3TnpjNFh6QXdNVjgzTlRCWGVEYzFNRWd8ZjVkOGE2OTYwZmQxMGMyMWYzOWRkZTBlZWJkYzFjNmE0MjU4OTZkMDk5OGJjYjNjYjkxNGU1YWY2MzYyZDk5NA',
    },
    {
      name: 'Gaming Beast Laptop - Model E',
      description: 'The ultimate gaming laptop for unmatched performance.',
      price: 2499.99,
      stock: 8,
      image_url: 'https://www.alkosto.com/medias/4711474162519-001-750Wx750H?context=bWFzdGVyfGltYWdlc3wzMzIxMHxpbWFnZS93ZWJwfGFHTmtMMmcyTlM4eE5EZ3lNek13TWpJd01UTTNOQzgwTnpFeE5EYzBNVFl5TlRFNVh6QXdNVjgzTlRCWGVEYzFNRWd8ZTU5NzJhNjQ0ZWE0ZjdiNGEwNjRiOWJkN2QwZjk3MWRmMjhlYzZjODkyY2IzOTJjNjI4MmEzZjNmZGE2MjA4OA',
    },
    {
      name: 'Budget Laptop - Model F',
      description: 'Affordable laptop for everyday tasks and basic usage.',
      price: 699.99,
      stock: 25,
      image_url: 'https://www.alkosto.com/medias/198122718252-001-750Wx750H?context=bWFzdGVyfGltYWdlc3wzODcyNnxpbWFnZS93ZWJwfGFEY3dMMmd6WlM4eE5EVXdPREEyTmpjNU9UWTBOaTh4T1RneE1qSTNNVGd5TlRKZk1EQXhYemMxTUZkNE56VXdTQXwyZjZkNGMzMmZjNDk4NzQwYTUxZGVmYmExNTM0YjBhOTVmYWQ2NDg2OWU2ZjcwM2NhOTZiYjk4ZmMxZDA2NmI2',
    },
  ];

  for (const laptop of laptops) {
    await prisma.product.create({ data: laptop });
  }

  console.log('Seeding completed with laptops!');
}

main()
  .catch((e) => {
    console.error(e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });