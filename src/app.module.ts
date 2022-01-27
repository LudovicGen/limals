import { CityModule } from './user/city/city.module';
import { Module } from '@nestjs/common';
import { ConfigModule } from 'config/config.module';
import { AnimalModule } from './animal/animal.module';
import { BreedModule } from './animal/breed.module';
import { AuthModule } from './auth/auth.module';
import { PrismaService } from './prisma.service';
import { UserModule } from './user/user.module';
import { RolesGuard } from './guards/roles.guard';
import { CaslModule } from './casl/casl.module';

@Module({
  imports: [
    PrismaService,
    RolesGuard,
    CaslModule,
    AuthModule,
    ConfigModule,
    UserModule,
    CityModule,
    AnimalModule,
    BreedModule,
  ],
})
export class AppModule {}
