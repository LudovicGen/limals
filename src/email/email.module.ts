import { Module } from '@nestjs/common';
import EmailService from './email.service';
import EmailSchedulingController from './emailSchedule.controller';
import EmailSchedulingService from './emailSchedule.service';

@Module({
  controllers: [EmailSchedulingController],
  providers: [EmailService, EmailSchedulingService],
  exports: [EmailService],
})
export class EmailModule {}
