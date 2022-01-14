import { Injectable } from '@nestjs/common';
import { Permission, Prisma } from '@prisma/client';
import { PrismaService } from 'src/prisma.service';

@Injectable()
export class PermissionsService {
  constructor(private prisma: PrismaService) {}

  async readPermissions(
    query: Prisma.PermissionFindManyArgs,
  ): Promise<Permission[]> {
    return await this.prisma.permission.findMany(query);
  }

  async createPermission(
    data: Prisma.PermissionCreateInput,
  ): Promise<Permission> {
    return await this.prisma.permission.create({
      data,
    });
  }
}
