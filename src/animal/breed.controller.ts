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
import { Breed } from '@prisma/client';
import { CreateBreedDto, Id, BreedDto, FilterDto } from 'src/dtos';

import { BreedService } from './breed.service';

@Controller('/breeds')
export class BreedController {
  constructor(private readonly breedService: BreedService) {}

  @Get('/')
  async list(@Query() query: FilterDto<Breed> | undefined): Promise<Breed[]> {
    return await this.breedService.list({
      skip: parseInt(query.skip) || 0,
      take: parseInt(query.take) || 20,
      orderBy: { name: query.order },
      where: { name: query.search },
    });
  }

  @Get('/:id')
  async get(@Param('id') id: string): Promise<Breed> {
    return await this.breedService.get({ id: id });
  }

  @Post('/')
  async create(@Body() breed: CreateBreedDto): Promise<Breed> {
    return await this.breedService.create({
      ...breed,
    });
  }

  @Put('/:id')
  async update(
    @Param('id') id: string,
    @Body() breed: CreateBreedDto,
  ): Promise<Breed> {
    return await this.breedService.update({
      where: { id: id },
      data: breed,
    });
  }

  @Delete('/:id')
  async delete(@Param('id') id: string): Promise<Breed> {
    return await this.breedService.delete({ id: id });
  }
}
