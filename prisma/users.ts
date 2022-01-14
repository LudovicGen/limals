import * as Faker from 'faker';
import { PrismaClient, User } from '@prisma/client';
import { random } from 'faker';

const prisma = new PrismaClient();

export const seedUsers = async (): Promise<void> => {
  const cities = await prisma.city.findMany();
  const promises: Promise<User>[] = [];

  for (let index = 0; index < 10; index++) {
    const items = {
      firstName: Faker.name.findName(),
      lastName: Faker.name.findName(),
      username: Faker.name.findName(),
      birthDate: Faker.date.between('1985-01-01', '2000-01-05'),
      email: Faker.internet.email(),
      city: { connect: random.arrayElement(cities.map((m) => ({ id: m.id }))) },
      sex: 1,
      latitude: 44.837789 + generateRandomFloatInRange(-0.5, 0.5),
      longitude: -0.57918 + generateRandomFloatInRange(-0.5, 0.5),
      avatar: '',
    };
    promises.push(prisma.user.create({ data: items }));
  }
  await Promise.all(promises);
};

function generateRandomFloatInRange(min, max) {
  return Math.random() * (max - min + 1) + min;
}
