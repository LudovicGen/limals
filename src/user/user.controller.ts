import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Post,
  Put,
  Query,
  UseGuards,
} from '@nestjs/common';
import { User } from '@prisma/client';
import { CreateUserDto, FilterDto } from 'src/dtos';
import { AuthGuard } from 'src/guards/auth.guard';

import { UserService } from './user.service';

@Controller('/users')
export class UserController {
  constructor(private readonly userService: UserService) {}

  @Get('/')
  async list(@Query() query: FilterDto | undefined): Promise<User[]> {
    return await this.userService.list({ where: { username: query.search } });
  }

  @Get('/city/:id')
  async listCity(@Param('id') id: string): Promise<User[]> {
    return await this.userService.getCity({
      cityWhereUniqueInput: {
        id,
      },
    });
  }

  @UseGuards(AuthGuard)
  @Get('/:id')
  async get(@Param('id') id: string): Promise<User> {
    return await this.userService.get({ id: id });
  }

  @Post('/')
  async create(@Body() user: CreateUserDto): Promise<User> {
    return await this.userService.create(user);
  }

  @Delete('/:id')
  async delete(@Param('id') id: string): Promise<User> {
    return await this.userService.delete({ id: id });
  }

  @Put('/:id')
  async update(
    @Param('id') id: string,
    @Body() city: CreateUserDto,
  ): Promise<User> {
    return await this.userService.update({
      where: { id: id },
      data: city,
    });
  }
}
