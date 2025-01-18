import { PrismaService } from './prisma.service';

describe('PrismaService', () => {
  let service: PrismaService;

  beforeEach(() => {
    service = new PrismaService();
  });

  it('should connect to the database', async () => {
    jest.spyOn(service, '$connect').mockResolvedValue(undefined);
    await expect(service.$connect()).resolves.toBeUndefined();
  });

  it('should disconnect from the database', async () => {
    jest.spyOn(service, '$disconnect').mockResolvedValue(undefined);
    await expect(service.$disconnect()).resolves.toBeUndefined();
  });
});