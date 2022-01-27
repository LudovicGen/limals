import { Injectable } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import EmailService from '../email.service';

interface VerificationTokenPayload {
  email: string;
}

@Injectable()
export class EmailConfirmationService {
  constructor(
    private readonly jwtService: JwtService,
    private readonly emailService: EmailService,
  ) {}

  public sendVerificationLink(email: string) {
    const payload: VerificationTokenPayload = { email };
    const token = this.jwtService.sign(payload, {
      secret: process.env.JWT_VERIFICATION_TOKEN_SECRET,
      expiresIn: `${process.env.JWT_VERIFICATION_TOKEN_EXPIRATION_TIME}s`,
    });

    const url = `${process.env.EMAIL_CONFIRMATION_URL}?token=${token}`;

    const text = `Bienvenue sur Limals.Veuillez confirmer votre email ici: ${url}`;

    return this.emailService.sendMail({
      to: email,
      subject: 'Email confirmation',
      text,
    });
  }
}
