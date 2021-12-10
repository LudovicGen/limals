import { CityModule } from './user/city/city.module';
import { Module } from '@nestjs/common';
import { PrismaService } from './prisma.service';
import { UserModule } from './user/user.module';

@Module({
  imports: [PrismaService, UserModule, CityModule],
})
export class AppModule {}
