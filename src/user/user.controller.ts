import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Post,
  Put,
  Query,
  UploadedFile,
  Request,
  UseInterceptors,
  Req,
  Res,
  StreamableFile,
} from '@nestjs/common';
import { FileInterceptor } from '@nestjs/platform-express';
import { User } from '@prisma/client';
import { Response } from 'express';
import { CreateUserDto, FilterDto } from 'src/dtos';

import { UserService } from './user.service';

import { createParamDecorator } from '@nestjs/common';
import { Readable } from 'stream';

export const AuthUser = createParamDecorator((data, req) => {
  return req.user;
});
@Controller('/users')
export class UserController {
  constructor(private readonly userService: UserService) {}

  @Get('/')
  async list(@Query() query: FilterDto<User> | undefined): Promise<User[]> {
    return await this.userService.list({
      skip: parseInt(query.skip) || 0,
      take: parseInt(query.take) || 20,
      orderBy: { username: query.order },
      where: { username: query.search },
    });
  }

  // @UseGuards(AuthGuard)
  @Get('/proximity')
  async getUsersInRadius(
    @Query('radius') radius: string,
    @Request() req: any,
  ): Promise<User[]> {
    console.log(req);
    const currentUser = await this.userService.get({
      username: req.user.username,
    });
    return await this.userService.getUsersInRadius(radius, currentUser);
  }

  @Get('/:id')
  async get(@Param('id') id: string): Promise<User> {
    return await this.userService.get({ id: id });
  }

  @Post('/avatar')
  @UseInterceptors(FileInterceptor('file'))
  async addAvatar(
    @Req() request: any,
    @UploadedFile() file: Express.Multer.File,
  ) {
    return this.userService.addAvatar(
      '34d2d1f0-3028-4b89-98ff-6f8df08e9f9d',
      file.buffer,
      file.originalname,
    );
  }

  @Get('/avatar/:id')
  async getDatabaseFileById(
    @Res({ passthrough: true }) response: Response,
    @Param('id') id: string,
  ) {
    const file = await this.userService.getFileById(id);

    const stream = Readable.from(file.data);

    response.set({
      'Content-Disposition': `inline; filename="${file.fileName}"`,
      'Content-Type': 'image',
    });

    return new StreamableFile(stream);
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
    @Body() body: CreateUserDto,
  ): Promise<User> {
    return await this.userService.update({
      where: { id: id },
      data: body,
    });
  }
}
