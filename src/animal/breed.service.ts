import { Injectable } from '@nestjs/common';
import { PrismaService } from '../prisma.service';
import { Breed, Prisma } from '@prisma/client';
import { BreedDto, CreateBreedDto } from '../dtos/animals/index';
@Injectable()
export class BreedService {
  constructor(private prisma: PrismaService) {}

  async get(
    breedWhereUniqueInput: Prisma.BreedWhereUniqueInput,
  ): Promise<Breed | null> {
    return this.prisma.breed.findUnique({
      where: breedWhereUniqueInput,
    });
  }

  async list(params: {
    skip?: number;
    take?: number;
    cursor?: Prisma.BreedWhereUniqueInput;
    where?: Prisma.BreedWhereInput;
    orderBy?: Prisma.BreedOrderByWithRelationInput;
  }): Promise<Breed[]> {
    const { skip, take, cursor, where, orderBy } = params;
    return this.prisma.breed.findMany({
      skip,
      take,
      cursor,
      where,
      orderBy,
    });
  }

  async create(data: Prisma.BreedCreateInput): Promise<Breed> {
    return this.prisma.breed.create({
      data,
    });
  }

  async update(params: {
    where: Prisma.BreedWhereUniqueInput;
    data: Prisma.BreedUpdateInput;
  }): Promise<Breed> {
    const { where, data } = params;
    return this.prisma.breed.update({
      data,
      where,
    });
  }

  async delete(where: Prisma.BreedWhereUniqueInput): Promise<Breed> {
    return this.prisma.breed.delete({
      where,
    });
  }
}
