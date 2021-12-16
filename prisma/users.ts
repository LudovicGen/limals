import * as Faker from 'faker';
import { City, PrismaClient, User } from "@prisma/client";
import { CityService } from '../src/user/city/city.service';
import { random } from 'faker';
import { CreateUserDto, UserDto } from 'src/dtos';

const prisma = new PrismaClient()

export const seedUsers = async():Promise<void> => {
    const cities = await prisma.city.findMany()
    const promises: Promise<User>[] = []

    for(let index = 0; index < 10; index++) {
        const items = {
            firstName : Faker.name.findName(),
            lastName : Faker.name.findName(),
            username : Faker.name.findName(),
            birthDate : Faker.date.between('1985-01-01', '2000-01-05'),
            email : Faker.internet.email(),
            city: { connect: random.arrayElement(cities.map((m) => ({id: m.id}))) },
            sex: 1
        }
        promises.push(prisma.user.create({data: items}))
    }
 await Promise.all(promises)
}