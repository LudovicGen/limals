import * as Faker from 'faker';
import { City, PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

export const seedCities = async (): Promise<void> => {
  const promises: Promise<City>[] = [];

  for (let index = 0; index < 10; index++) {
    const items = {
      name: Faker.address.city(),
      postalCode: Faker.address.zipCode(),
    };
    promises.push(prisma.city.create({ data: items }));
  }
  await Promise.all(promises);
};
