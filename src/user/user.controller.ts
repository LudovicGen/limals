import { Body, Controller, Get, Param, Post, Query } from '@nestjs/common';
import { User } from '@prisma/client';
import { CreateUserDto, FilterDto, Id, UserDto } from 'src/dtos';

import { UserService } from './user.service';

@Controller('/users')
export class UserController {
  constructor(private readonly userService: UserService) {}

  // @Get('/')
  // async list(@Query() query: FilterDto | undefined): Promise<User[]> {
  //   return await this.userService.list(query);
  // }

  @Get('/:id')
  async get(@Param("id") id: string): Promise<User> {
    return await this.userService.get({id: Number(id)});
  }

  @Post('/')
  async create(@Body() user: CreateUserDto): Promise<User> {
    return await this.userService.create(user);
  }
}
