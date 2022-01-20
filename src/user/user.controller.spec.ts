import { City } from '@prisma/client';
import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

let cityCreate = {} as City;
beforeAll(async () => {
  //create city
  cityCreate = await prisma.city.create({
    data: { name: 'Bordeaux', postalCode: '33000' },
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
})
