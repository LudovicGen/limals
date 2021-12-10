import { Module } from '@nestjs/common';
import { ConfigModule } from 'config/config.module';

import { AuthModule } from './auth/auth.module';
import { PrismaService } from './prisma.service';
import { UserModule } from './user/user.module';

@Module({
  imports: [PrismaService, AuthModule, ConfigModule, UserModule],
})
export class AppModule {}
