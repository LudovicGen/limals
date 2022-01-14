import * as Faker from 'faker';
import { PrismaClient, Breed } from '@prisma/client';

const prisma = new PrismaClient();

export const seedBreeds = async (): Promise<void> => {
  const promises: Promise<Breed>[] = [];

  for (let index = 0; index < 10; index++) {
    const items = {
      name: Faker.animal.dog(),
    };
    promises.push(prisma.breed.create({ data: items }));
  }
  await Promise.all(promises);
};
