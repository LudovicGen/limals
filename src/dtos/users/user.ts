import { ApiProperty } from '@nestjs/swagger';
import { Type } from 'class-transformer';
import {
  IsEmail,
  IsISO8601,
  IsNotEmpty,
  IsNumber,
  IsOptional,
  IsString,
  IsUUID,
} from 'class-validator';
import { CityDto } from '.';
import { Id } from '../utils';

export class CreateUserDto {
  @ApiProperty()
  @IsString()
  @IsNotEmpty()
  public fistName: string;

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

  @ApiProperty()
  @IsNotEmpty()
  @IsString()
  public password!: string;

  @ApiProperty({ type: () => CityDto })
  @Type(() => Id)
  public cityId: Id;

  @ApiProperty({
    description: '0: unknown, 1: male, 2: weak',
    minimum: 0,
  })
  @IsNumber()
  @IsOptional()
  public sex?: number | null;
}

export class UserDto extends CreateUserDto {
  @ApiProperty()
  public cityId: CityDto;

  @ApiProperty()
  @IsNotEmpty()
  @IsUUID(4)
  public id!: string;
}
