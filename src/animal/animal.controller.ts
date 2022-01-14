import {
  Body,
  Controller,
  Post,
  Query,
  Get,
  Param,
  Put,
  Delete,
} from '@nestjs/common';
import { Animal } from '@prisma/client';
import { CreateAnimalDto, Id, AnimalDto, FilterDto } from 'src/dtos';

import { AnimalService } from './animal.service';

@Controller('/animals')
export class AnimalController {
  constructor(private readonly animalService: AnimalService) {}

  @Get('/')
  async list(@Query() query: FilterDto<Animal> | undefined): Promise<Animal[]> {
    return await this.animalService.list({
      skip: parseInt(query.skip) || 0,
      take: parseInt(query.take) || 20,
      orderBy: { name: query.order },
      where: { name: query.search },
    });
  }

  @Get('/:id')
  async get(@Param('id') id: string): Promise<Animal> {
    return await this.animalService.get({ id: id });
  }

  @Post('/')
  async create(@Body() animal: CreateAnimalDto): Promise<Animal> {
    return await this.animalService.create({
      ...animal,
      user: {
        connect: {
          id: animal.user.connect.id,
          email: animal.user.connect.email,
        },
      },
    });
  }

  @Put('/:id')
  async update(
    @Param('id') id: string,
    @Body() animal: CreateAnimalDto,
  ): Promise<Animal> {
    return await this.animalService.update({
      where: { id: id },
      data: animal,
    });
  }

  @Delete('/:id')
  async delete(@Param('id') id: string): Promise<Animal> {
    return await this.animalService.delete({ id: id });
  }
}

// {data: {...animal, user: {connect: {id: animal.user.connect.id,email: animal.user.connect.email,},},}}
