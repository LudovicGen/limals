import * as Faker from 'faker';
import { PrismaClient, Account, User } from '@prisma/client';
import { random } from 'faker';

const prisma = new PrismaClient();

export const seedAccounts = async (): Promise<void> => {
  const cities = await prisma.city.findMany();

  const UserItem = {
    firstName: 'Test',
    lastName: 'Test',
    username: 'Test',
    birthDate: Faker.date.between('1985-01-01', '2000-01-05'),
    email: 'test@test.com',
    city: { connect: random.arrayElement(cities.map((m) => ({ id: m.id }))) },
    sex: 1,
    latitude: 44.837789 + generateRandomFloatInRange(-0.5, 0.5),
    longitude: -0.57918 + generateRandomFloatInRange(-0.5, 0.5),
  };

  const AccountItem = {
    username: 'Test',
    password: 'test',
  };

  await prisma.account.create({ data: AccountItem });
  await prisma.user.create({ data: UserItem });
};

function generateRandomFloatInRange(min, max) {
  return Math.random() * (max - min + 1) + min;
}
