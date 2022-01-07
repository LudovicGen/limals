import { CityModule } from './user/city/city.module';
import { Module } from '@nestjs/common';
import { ConfigModule } from 'config/config.module';
import { AnimalModule } from './animal/animal.module';
import { BreedModule } from './animal/breed.module';
import { AuthModule } from './auth/auth.module';
import { PrismaService } from './prisma.service';
import { UserModule } from './user/user.module';

@Module({
  imports: [
    PrismaService,
    AuthModule,
    ConfigModule,
    UserModule,
    CityModule,
    AnimalModule,
    BreedModule,
  ],
})
export class AppModule {}
