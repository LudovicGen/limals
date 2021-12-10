import { Injectable } from '@nestjs/common';
import { PrismaService } from '../../prisma.service';
import { City, Prisma } from '@prisma/client';

@Injectable()
export class CityService {
  constructor(private prisma: PrismaService) {}

  async get(
    cityWhereUniqueInput: Prisma.CityWhereUniqueInput,
  ): Promise<City | null> {
    return this.prisma.city.findUnique({
      where: cityWhereUniqueInput,
    });
  }

  async list(params: {
    skip?: number;
    take?: number;
    cursor?: Prisma.CityWhereUniqueInput;
    where?: Prisma.UserWhereInput;
    orderBy?: Prisma.UserOrderByWithRelationInput;
  }): Promise<City[]> {
    const { skip, take, cursor, where, orderBy } = params;
    return this.prisma.city.findMany({
      skip,
      take,
      cursor,
      where,
      orderBy,
    });
  }

  async create(data: Prisma.CityCreateInput): Promise<City> {
    return this.prisma.city.create({
      data,
    });
  }

  async update(params: {
    where: Prisma.CityWhereUniqueInput;
    data: Prisma.CityUpdateInput;
  }): Promise<City> {
    const { where, data } = params;
    return this.prisma.city.update({
      data,
      where,
    });
  }

  async delete(where: Prisma.CityWhereUniqueInput): Promise<City> {
    return this.prisma.city.delete({
      where,
    });
  }
}
