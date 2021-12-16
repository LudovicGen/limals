import { Module } from '@nestjs/common';
import { PrismaService } from 'src/prisma.service';
import { BreedController } from './breed.controller';
import { BreedService } from './breed.service';

@Module({
  controllers: [BreedController],
  providers: [PrismaService, BreedService],
})
export class BreedModule {}
