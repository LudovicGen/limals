import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty, IsString, IsUUID } from 'class-validator';
import { UserDto } from '.';

export class CreateCityDto {
  @ApiProperty()
  @IsString()
  @IsNotEmpty()
  public name: string;

  @ApiProperty()
  @IsString()
  @IsNotEmpty()
  public postalCode: string;
}

export class CityDto extends CreateCityDto {
  @ApiProperty({ type: () => UserDto })
  public users: UserDto[];

  @ApiProperty()
  @IsNotEmpty()
  @IsUUID(4)
  public id: string;
}
