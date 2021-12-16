import { Module } from '@nestjs/common';
import { AnimalModule } from './animal/animal.module';
import { BreedModule } from './animal/breed.module';
import { PrismaService } from './prisma.service';
import { UserModule } from './user/user.module';

@Module({
  imports: [PrismaService, UserModule, AnimalModule, BreedModule],
})
export class AppModule {}
