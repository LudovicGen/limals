import { ApiProperty } from '@nestjs/swagger';

export class AuthTokenDto {
  @ApiProperty()
  public value!: string;
}
