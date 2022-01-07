import { PrismaClient } from '@prisma/client';
import * as dotenv from 'dotenv';
import * as Faker from 'faker';
import { seedUsers } from './users';
import { seedCities } from './cities';

const prisma = new PrismaClient();

async function main() {
  dotenv.config();
  console.log('Seeding...');
  await prisma.user.deleteMany({});
  await prisma.city.deleteMany({});

  console.log('seeding Cities...');
  await seedCities();

  console.log('seeding Users...');
  await seedUsers();
}

main()
  .catch((e) => {
    console.log(e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
