import { ApiProperty } from '@nestjs/swagger';
import { Type } from 'class-transformer';

import { IsNotEmpty, IsString, IsUUID } from 'class-validator';
import { UserDto } from '..';
import { RelationInput } from '../utils';

export class CreateFileDto {
  @ApiProperty()
  @IsString()
  @IsNotEmpty()
  public fileName!: string;

  @ApiProperty()
  @IsNotEmpty()
  public data!: any;

  @ApiProperty({ type: () => UserDto })
  @IsNotEmpty()
  @Type(() => UserDto)
  public user!: RelationInput<UserDto>;
}

export class FileDto extends CreateFileDto {
  @ApiProperty({ type: () => UserDto })
  public user!: RelationInput<UserDto>;

  @ApiProperty()
  @IsNotEmpty()
  @IsUUID(4)
  public id!: string;
}
