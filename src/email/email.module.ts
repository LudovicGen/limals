import { Module } from '@nestjs/common';
import EmailService from './email.service';
import EmailSchedulingController from './emailSchedule.controller';
import EmailSchedulingService from './emailSchedule.service';
import { PrismaService } from '../prisma.service';

@Module({
  controllers: [EmailSchedulingController],
  providers: [EmailService, EmailSchedulingService, PrismaService],
  exports: [EmailService],
})
export class EmailModule {}
