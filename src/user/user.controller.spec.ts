import { City, User } from '@prisma/client';
import { PrismaClient } from '@prisma/client';
import * as Faker from 'faker';
import { random } from 'faker';

const prisma = new PrismaClient();

let cityCreate = {} as City;
let usersList = {} as Promise<User[]>;
let newUser = {} as User;

beforeAll(async () => {
  //create city
  cityCreate = await prisma.city.create({
    data: { name: 'Bordeaux', postalCode: '33000' },
  });

  // usersList = prisma.user.findMany();
  const cities = await prisma.city.findMany();

  newUser = await prisma.user.create({
    data: {
      firstName: Faker.name.findName(),
      lastName: Faker.name.findName(),
      username: Faker.name.findName(),
      birthDate: Faker.date.between('1985-01-01', '2000-01-05'),
      email: Faker.internet.email(),
      city: { connect: random.arrayElement(cities.map((m) => ({ id: m.id }))) },
      sex: 1,
      latitude: 44.837789 + generateRandomFloatInRange(-0.5, 0.5),
      longitude: -0.57918 + generateRandomFloatInRange(-0.5, 0.5),
    },
  });
});

it('sould return Bordeaux', async () => {
  const newCity = await prisma.city.findUnique({
    where: { id: cityCreate.id },
  });
  await expect(newCity).toStrictEqual(cityCreate);
});

it('Not return object Bordeaux', async () => {
  const newCity = await prisma.city.findFirst();

  await expect(newCity).not.toStrictEqual(cityCreate);
});

it('should return object User', async () => {
  const data = await prisma.user.findUnique({
    where: { id: newUser.id },
  });

  await expect(data).toStrictEqual(newUser);
});

function generateRandomFloatInRange(min, max) {
  return Math.random() * (max - min + 1) + min;
}
