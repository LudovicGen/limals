import { IsNotEmpty, IsString, IsUUID } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';

export class CreatBreedDto {
  @ApiProperty()
  @IsNotEmpty()
  @IsString()
  public name: string;
}

export class BreedDto extends CreatBreedDto {
  @ApiProperty()
  @IsNotEmpty()
  @IsUUID(4)
  public id!: string;
}
