import { Body, Controller, Delete, Get, Param, Post, Put, Query } from '@nestjs/common';
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

  @Delete('/delete/:id')
  async delete(@Param("id") id: string): Promise<User> {
    return await this.userService.delete({id: Number(id)});
  }

  @Put('/update/:id')
  async update(@Param("id") id: string, @Body() city: CreateUserDto): Promise<User> {
    return await this.userService.update({where: {id: Number(id)}, data: city });
  }
}
