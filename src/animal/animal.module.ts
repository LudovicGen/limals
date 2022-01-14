import { Module } from '@nestjs/common';
import { PrismaService } from 'src/prisma.service';
import { AnimalController } from './animal.controller';
import { AnimalService } from './animal.service';

@Module({
  controllers: [AnimalController],
  providers: [PrismaService, AnimalService],
})
export class AnimalModule {}
