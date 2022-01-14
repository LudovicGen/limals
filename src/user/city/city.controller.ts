import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Post,
  Put,
  Query,
} from '@nestjs/common';
import { City } from '@prisma/client';
import { CreateCityDto, FilterDto } from 'src/dtos';

import { CityService } from './city.service';

@Controller('/cities')
export class CityController {
  constructor(private readonly cityService: CityService) {}

  @Get('/')
  async list(@Query() query: FilterDto | undefined): Promise<City[]> {
    return await this.cityService.list({});
  }

  @Get('/:id')
  async get(@Param('id') id: string): Promise<City> {
    return await this.cityService.get({ id: id });
  }

  @Post('/')
  async create(@Body() user: CreateCityDto): Promise<City> {
    return await this.cityService.create(user);
  }

  @Delete('/:id')
  async delete(@Param('id') id: string): Promise<City> {
    return await this.cityService.delete({ id: id });
  }

  @Put('/:id')
  async update(
    @Param('id') id: string,
    @Body() city: CreateCityDto,
  ): Promise<City> {
    return await this.cityService.update({
      where: { id: id },
      data: city,
    });
  }
}
