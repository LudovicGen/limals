import { Ability, ForcedSubject } from '@casl/ability';
import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { Action, Prisma } from '@prisma/client';
import { PermissionsService } from 'src/permissions/permission.module';
import { PrismaAbility } from '@casl/prisma';

@Injectable()
@Injectable()
export class AbilityFactory {
  constructor(private permissionsService: PermissionsService) {}
  async createAbility(modelName: Prisma.ModelName) {
    if (modelName === 'Permission')
      throw new HttpException('Error', HttpStatus.CONFLICT);

    const subjects = [modelName, 'all'];
    const actions = Object.keys(Action);
    type Abilities = [
      typeof actions[number],
      (
        | typeof subjects[number]
        | ForcedSubject<Exclude<typeof subjects[number], 'all'>>
      ),
    ];
    // type AppAbility = Ability<Abilities>;

    const permissions = await this.permissionsService.readPermissions({
      where: {
        subject: modelName,
      },
      select: {
        action: true,
        subject: true,
        fields: true,
        conditions: true,
        inverted: true,
        reason: true,
        role: true,
        roleId: true,
      },
    });

    // return new PrismaAbility<Abilities>(permissions);
  }
}
