import { Id } from '../utils';
import { ApiProperty } from '@nestjs/swagger';
import {
  IsBoolean,
  IsNotEmpty,
  IsNumber,
  IsOptional,
  IsString,
  IsUUID,
} from 'class-validator';
import { BreedDto } from '.';
import { Type } from 'class-transformer';
import { UserDto } from '..';

export class CreatAnimalDto {
  @ApiProperty()
  @IsNotEmpty()
  @IsString()
  public name: string;

  @ApiProperty()
  @IsNotEmpty()
  @IsString()
  public birthYear: string;

  @ApiProperty()
  @IsOptional()
  @IsNumber()
  public sex?: number;

  @ApiProperty({ description: '0: little, 1: medium, 3: big' })
  @IsNumber()
  @IsNotEmpty()
  public height: number;

  @ApiProperty()
  @IsNumber()
  @IsOptional()
  public weight?: number;

  @ApiProperty()
  @IsNotEmpty()
  @IsString()
  public description: string;

  @ApiProperty()
  @IsBoolean()
  @IsNotEmpty()
  public castrated: boolean;

  @ApiProperty({ type: () => BreedDto })
  @Type(() => Id)
  public breedsId: Id[];

  @ApiProperty({ type: () => UserDto })
  @Type(() => Id)
  public userId: Id;
}

export class AnimalDto extends CreatAnimalDto {
  @Type(() => BreedDto)
  public breedsId: BreedDto[];

  @Type(() => UserDto)
  public userId: UserDto;

  @ApiProperty()
  @IsNotEmpty()
  @IsUUID(4)
  public id!: string;
}
