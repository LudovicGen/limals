import * as Faker from 'faker';
import { PrismaClient, Animal } from '@prisma/client';
import { random } from 'faker';

const prisma = new PrismaClient();

export const seedAnimals = async (): Promise<void> => {
  const breeds = await prisma.breed.findMany();
  const users = await prisma.user.findMany();
  const promises: Promise<Animal>[] = [];

  for (let index = 0; index < 10; index++) {
    const user = random.arrayElement(users);

    const items = {
      name: Faker.name.findName(),
      height: 100,
      weight: 100,
      description: Faker.lorem.lines(2),
      castrated: false,
      birthYear: Faker.date.between('2000-01-01', new Date()).getFullYear(),
      breeds: {
        connect: random.arrayElement(breeds.map((m) => ({ id: m.id }))),
      },
      user: {
        connect: {
          id: user.id,
        },
      },
      sex: 1,
    };
    promises.push(prisma.animal.create({ data: items }));
  }
  await Promise.all(promises);
};
