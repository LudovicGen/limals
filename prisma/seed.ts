import { PrismaClient } from '@prisma/client';
import { seedUsers } from './users';
import { seedCities } from './cities';

const prisma = new PrismaClient();

async function main() {
  await prisma.user.deleteMany({});
  await prisma.city.deleteMany({});

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
