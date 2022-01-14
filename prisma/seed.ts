import { PrismaClient } from '@prisma/client';
import * as dotenv from 'dotenv';
import * as Faker from 'faker';
import { seedUsers } from './users';
import { seedCities } from './cities';
import { seedBreeds } from './breeds';
import { seedAnimals } from './animals';

const prisma = new PrismaClient();

async function main() {
  dotenv.config();
  console.log('Seeding...');
  await prisma.account.deleteMany({});
  await prisma.animal.deleteMany({});
  await prisma.user.deleteMany({});
  await prisma.city.deleteMany({});
  await prisma.breed.deleteMany({});

  console.log('seeding Cities...');
  await seedCities();

  console.log('seeding Breeds...');
  await seedBreeds();

  console.log('seeding Users...');
  await seedUsers();

  console.log('seeding Animal...');
  await seedAnimals();
}

main()
  .catch((e) => {
    console.log(e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
