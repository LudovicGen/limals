import {
  Controller,
  ClassSerializerInterceptor,
  UseInterceptors,
  Post,
  Body,
} from '@nestjs/common';
import { AuthTokenDto } from 'src/dtos';
import { EmailConfirmationService } from './emailConfirmation.service';
// import JwtAuthenticationGuard from '../authentication/jwt-authentication.guard';
// import RequestWithUser from '../emailSchedule.controller';

@Controller('email-confirmation')
@UseInterceptors(ClassSerializerInterceptor)
export class EmailConfirmationController {
  constructor(
    private readonly emailConfirmationService: EmailConfirmationService,
  ) {}

  @Post('confirm')
  async confirm(@Body() confirmationData: AuthTokenDto) {
    const email = await this.emailConfirmationService.decodeConfirmationToken(
      confirmationData.token,
    );
    await this.emailConfirmationService.confirmEmail(email);
  }

  // @Post('resend-confirmation-link')
  // @UseGuards(JwtAuthenticationGuard)
  // async resendConfirmationLink(@Req() request: RequestWithUser) {
  //   await this.emailConfirmationService.resendConfirmationLink(request.user.id);
  // }
}
