import { ApiProperty } from '@nestjs/swagger';
import { IsDateString, IsEmail, IsNotEmpty, IsString } from 'class-validator';

export class EmailScheduleDto {
  @ApiProperty()
  @IsEmail()
  public recipient!: string;

  @IsString()
  @IsNotEmpty()
  public subject!: string;

  @IsString()
  @IsNotEmpty()
  public content!: string;

  @IsDateString()
  public date!: string;
}
