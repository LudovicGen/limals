import { Body, Controller, Delete, Get, Param, Post, Put } from '@nestjs/common';
import { City } from '@prisma/client';
import { CityDto, CreateCityDto, Id, UserDto } from 'src/dtos';

import { CityService } from './city.service';

@Controller('/cities')
export class CityController {
  constructor(private readonly cityService: CityService) {}

  @Get('/:id')
  async get(@Param("id") id: string): Promise<City> {
    return await this.cityService.get({id: Number(id)});
  }

  @Post('/create')
  async create(@Body() user: CreateCityDto): Promise<City> {
    return await this.cityService.create(user);
  }

  @Delete('/delete/:id')
  async delete(@Param("id") id: string): Promise<City> {
    return await this.cityService.delete({id: Number(id)});
  }

  @Put('/update/:id')
  async update(@Param("id") id: string, @Body() city: CreateCityDto): Promise<City> {
    return await this.cityService.update({where: {id: Number(id)}, data: city });
  }


}
