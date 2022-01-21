import { Module } from '@nestjs/common';
import { JwtModule } from '@nestjs/jwt';

import { ConfigService } from 'config/config.service';
import { AuthController } from './auth.controller';
import { JwtStrategy } from './jwt-strategy';
import { AuthService } from './auth.service';
import { PrismaService } from 'src/prisma.service';
import { UserService } from 'src/user/user.service';
import { EmailConfirmationService } from 'src/email/confirmation/emailConfirmation.service';
import EmailService from 'src/email/email.service';

@Module({
  imports: [
    JwtModule.registerAsync({
      inject: [ConfigService],
      useFactory: (configService: ConfigService) => ({
        secret: configService.jwtSecret,
        signOptions: { expiresIn: '8h' },
      }),
    }),
  ],
  providers: [
    AuthService,
    JwtStrategy,
    PrismaService,
    UserService,
    EmailConfirmationService,
    EmailService,
  ],
  controllers: [AuthController],
})
export class AuthModule {}
