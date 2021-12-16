import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty, IsString } from 'class-validator';

export class CreateAccountDto {
  @ApiProperty()
  @IsString()
  @IsNotEmpty()
  public username!: string;

  @ApiProperty()
  @IsString()
  @IsNotEmpty()
  public password!: string;
}

export class AccountDto extends CreateAccountDto {
  public id!: string;
}
