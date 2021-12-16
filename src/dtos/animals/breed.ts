import { IsNotEmpty, IsString, IsUUID } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';

export class CreateBreedDto {
  @ApiProperty()
  @IsNotEmpty()
  @IsString()
  public name: string;
}

export class BreedDto extends CreateBreedDto {
  @ApiProperty()
  @IsNotEmpty()
  @IsUUID(4)
  public id!: string;
}
