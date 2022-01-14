import { Injectable } from '@nestjs/common';
import { PrismaService } from '../prisma.service';
import { Animal, Prisma } from '@prisma/client';
import { AnimalDto, CreateAnimalDto } from '../dtos/animals/animal';
@Injectable()
export class AnimalService {
  constructor(private prisma: PrismaService) {}

  async get(
    animalWhereUniqueInput: Prisma.AnimalWhereUniqueInput,
  ): Promise<Animal | null> {
    return this.prisma.animal.findUnique({
      where: animalWhereUniqueInput,
    });
  }

  async list(params: {
    skip?: number;
    take?: number;
    cursor?: Prisma.AnimalWhereUniqueInput;
    where?: Prisma.AnimalWhereInput;
    orderBy?: Prisma.AnimalOrderByWithRelationInput;
  }): Promise<Animal[]> {
    const { skip, take, cursor, where, orderBy } = params;
    return this.prisma.animal.findMany({
      skip,
      take,
      cursor,
      where,
      orderBy,
    });
  }

  async create(data: Prisma.AnimalCreateInput): Promise<Animal> {
    return this.prisma.animal.create({
      data,
    });
  }

  async update(params: {
    where: Prisma.AnimalWhereUniqueInput;
    data: Prisma.AnimalUpdateInput;
  }): Promise<Animal> {
    const { where, data } = params;
    return this.prisma.animal.update({
      data,
      where,
    });
  }

  async delete(where: Prisma.AnimalWhereUniqueInput): Promise<Animal> {
    return this.prisma.animal.delete({
      where,
    });
  }
}
