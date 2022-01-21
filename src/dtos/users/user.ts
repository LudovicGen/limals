import { ApiProperty } from '@nestjs/swagger';
import { Type } from 'class-transformer';
import {
  IsBoolean,
  IsEmail,
  IsISO8601,
  IsNotEmpty,
  IsNumber,
  IsOptional,
  IsString,
  IsUUID,
} from 'class-validator';
import { CityDto } from '.';
import { AnimalDto } from '..';
import { FileDto } from '../image/file';
import { Id, RelationInput, RelationsInput } from '../utils';

export class CreateUserDto {
  @ApiProperty()
  @IsString()
  @IsNotEmpty()
  public firstName: string;

  @ApiProperty()
  @IsString()
  @IsNotEmpty()
  public lastName: string;

  @ApiProperty()
  @IsString()
  @IsNotEmpty()
  public username: string;

  @ApiProperty()
  @IsISO8601()
  @IsOptional()
  public birthDate?: string | null;

  @ApiProperty()
  @IsNotEmpty()
  @IsEmail()
  public email: string;

  @ApiProperty({ type: () => CityDto })
  @Type(() => Id)
  public city: RelationInput<CityDto>;

  @ApiProperty({
    description: '0: unknown, 1: man, 2: woman',
    minimum: 0,
  })
  @IsNumber()
  @IsOptional()
  public sex?: number | null;

  @IsNumber()
  @IsOptional()
  public latitude?: number | null;

  @IsNumber()
  @IsOptional()
  public longitude?: number | null;
}

export class UserDto extends CreateUserDto {
  @ApiProperty({ type: () => CityDto })
  public city: RelationInput<CityDto>;

  @ApiProperty({ type: () => AnimalDto })
  public animals: RelationsInput<UserDto>;

  @ApiProperty({ type: () => FileDto })
  public avatar?: RelationInput<FileDto>;

  @ApiProperty()
  @IsBoolean()
  public isEmailConfirmed!: boolean;

  @ApiProperty()
  @IsNotEmpty()
  @IsUUID(4)
  public id!: string;
}
