import * as Faker from 'faker';
import { City, PrismaClient, User } from "@prisma/client";
import { CityService } from '../src/user/city/city.service';
import { random } from 'faker';
import { CreateUserDto, UserDto } from 'src/dtos';

const prisma = new PrismaClient()

export const seedCities = async():Promise<void> => {
    const cities = await prisma.city.findMany()
    const promises: Promise<City>[] = []

    for(let index = 0; index < 10; index++) {
        const items = {
            name : Faker.address.city(),
            postalCode : Faker.address.zipCode(),
        }
        promises.push(prisma.city.create({data: items}))
    }
 await Promise.all(promises)
}