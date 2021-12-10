import { Body, Controller, HttpCode, HttpStatus, Post } from '@nestjs/common';

import { AccountDto, CreateUserDto, AuthTokenDto } from '../dtos';

import { AuthService } from './auth.service';
import { UserService } from '../user/user.service';

@Controller('/auth')
export class AuthController {
  public constructor(
    private readonly authService: AuthService,
    private readonly citizenService: UserService,
  ) {}

  @Post('/register')
  @HttpCode(HttpStatus.CREATED)
  public async register(
    @Body() body: CreateUserDto,
    @Body('password') password: string,
  ): Promise<void> {
    const { id } = await this.citizenService.create(body);
    await this.authService.register(body.username, password, id);
  }

  @Post('/login')
  public async login(@Body() body: AccountDto): Promise<AuthTokenDto> {
    const { username, password } = body;

    return this.authService.login(username, password);
  }
}
