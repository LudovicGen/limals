import { Body, Controller, Get, Param, Post } from '@nestjs/common';
import { City } from '@prisma/client';
import { CreateCityDto, Id, UserDto } from 'src/dtos';

import { CityService } from './city.service';

@Controller('/cities')
export class CityController {
  constructor(private readonly cityService: CityService) {}

  @Get('/:id')
  async get(@Param("id") id: string): Promise<City> {
    return await this.cityService.get({id: Number(id)});
  }

  @Post('/')
  async create(@Body() user: CreateCityDto): Promise<City> {
    return await this.cityService.create(user);
  }
}
