import { Body, Controller, HttpCode, HttpStatus, Post } from '@nestjs/common';

import { AccountDto, CreateUserDto, AuthTokenDto, UserDto } from '../dtos';

import { AuthService } from './auth.service';
import { UserService } from '../user/user.service';
import { EmailConfirmationService } from 'src/email/confirmation/emailConfirmation.service';

@Controller('/auth')
export class AuthController {
  public constructor(
    private readonly authService: AuthService,
    private readonly citizenService: UserService,
    private readonly emailConfirmationService: EmailConfirmationService,
  ) {}

  @Post('/register')
  @HttpCode(HttpStatus.CREATED)
  public async register(
    //FIXME
    @Body() body: CreateUserDto & { password: string },
    @Body('password') password: string,
  ): Promise<AccountDto> {
    delete body.password;
    const { id } = await this.citizenService.create(body);
    const account = await this.authService.register(
      body.username,
      password,
      id,
    );
    await this.emailConfirmationService.sendVerificationLink(body.email);
    return account;
  }

  @Post('/login')
  public async login(@Body() body: AccountDto): Promise<AuthTokenDto> {
    const { username, password } = body;

    return this.authService.login(username, password);
  }
}
