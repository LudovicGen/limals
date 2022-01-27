import { Module } from '@nestjs/common';
import { PrismaService } from 'src/prisma.service';
import { UserService } from 'src/user/user.service';
import EmailService from '../email.service';
import { EmailConfirmationController } from './emailConfirmation.controller';
import { EmailConfirmationService } from 'src/email/confirmation/emailConfirmation.service';
import { JwtModule, JwtService } from '@nestjs/jwt';
import { AuthService } from 'src/auth/auth.service';
import { AuthController } from 'src/auth/auth.controller';
import { AuthModule } from 'src/auth/auth.module';
import { JwtStrategy } from 'src/auth/jwt-strategy';
import { ConfigService } from 'config/config.service';

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
  controllers: [EmailConfirmationController, AuthController],
  providers: [
    AuthService,
    EmailService,
    JwtStrategy,
    EmailConfirmationService,
    PrismaService,
    UserService,
  ],
})
export class EmailConfirmationModule {}
