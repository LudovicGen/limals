import { Body, Controller, Get, Post, UseGuards } from '@nestjs/common';
import { User } from '@prisma/client';
import { CreateUserDto } from 'src/dtos';
import { AuthGuard } from 'src/guards/auth.guard';

import { UserService } from './user.service';
@UseGuards(AuthGuard)
@Controller('/users')
export class UserController {
  constructor(private readonly userService: UserService) {}

  @Post('/')
  async create(@Body() user: CreateUserDto): Promise<User> {
    return await this.userService.create(user);
  }
}
