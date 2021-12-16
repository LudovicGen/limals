import { Module } from '@nestjs/common';
import { AnimalModule } from './animal/animal.module';
import { PrismaService } from './prisma.service';
import { UserModule } from './user/user.module';

@Module({
  imports: [PrismaService, UserModule, AnimalModule],
})
export class AppModule {}
