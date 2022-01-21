import { CityModule } from './user/city/city.module';
import { Module } from '@nestjs/common';
import { ScheduleModule } from '@nestjs/schedule';
import { ConfigModule } from 'config/config.module';
import { AnimalModule } from './animal/animal.module';
import { BreedModule } from './animal/breed.module';
import { AuthModule } from './auth/auth.module';
import { PrismaService } from './prisma.service';
import { UserModule } from './user/user.module';
import { EmailModule } from './email/email.module';

@Module({
  imports: [
    PrismaService,
    AuthModule,
    ConfigModule,
    ScheduleModule.forRoot(),
    EmailModule,
    CityModule,
    UserModule,
    AnimalModule,
    BreedModule,
  ],
})
export class AppModule {}
