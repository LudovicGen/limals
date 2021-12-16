import { Module } from '@nestjs/common';
import { PrismaService } from 'src/prisma.service';
import { CityController } from './city.controller';
import { CityService } from './city.service';

@Module({
  controllers: [CityController],
  providers: [CityService, PrismaService],
})
export class CityModule {}
