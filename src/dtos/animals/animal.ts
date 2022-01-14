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
import { Id, RelationInput, RelationsInput } from '../utils';

export class CreateAnimalDto {
  @ApiProperty()
  @IsNotEmpty()
  @IsString()
  public name: string;

  @ApiProperty()
  @IsNotEmpty()
  @IsString()
  public birthYear: number;

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
  public breeds?: RelationsInput<BreedDto>;

  @ApiProperty({ type: () => UserDto })
  @Type(() => Id)
  public user: RelationInput<UserDto>;
}

export class AnimalDto extends CreateAnimalDto {
  @ApiProperty()
  public breeds?: RelationsInput<BreedDto>;

  @ApiProperty()
  public user: RelationInput<UserDto>;

  @ApiProperty()
  @IsNotEmpty()
  @IsUUID(4)
  public id!: string;
}
