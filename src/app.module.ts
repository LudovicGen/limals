import { CityModule } from './user/city/city.module';
import { Module } from '@nestjs/common';
import { ConfigModule } from 'config/config.module';

import { AuthModule } from './auth/auth.module';
import { PrismaService } from './prisma.service';
import { UserModule } from './user/user.module';
import { RolesGuard } from './guards/roles.guard';
import { CaslModule } from './casl/casl.module';

@Module({
  imports: [
    PrismaService,
    RolesGuard,
    AuthModule,
    ConfigModule,
    UserModule,
    CityModule,
    CaslModule,
  ],
})
export class AppModule {}
