import { ApiPropertyOptional } from '@nestjs/swagger';
import { Type } from 'class-transformer';
import { IsEnum, IsInt, IsOptional, Max, Min } from 'class-validator';

export enum Order {
  ASC = 'asc',
  DESC = 'desc',
}
export class FilterDto<T> {
  @ApiPropertyOptional()
  public search?: string | null;

  @ApiPropertyOptional()
  public disablePagination?: true | null;

  @ApiPropertyOptional({
    minimum: 1,
    default: 1,
  })
  @Type(() => String)
  @IsInt()
  @Min(1)
  @IsOptional()
  public page?: string;

  @ApiPropertyOptional({
    minimum: 1,
    maximum: 50,
    default: 10,
  })
  @Type(() => Number)
  @IsInt()
  @Min(1)
  @Max(50)
  @IsOptional()
  public take?: string | null;

  @ApiPropertyOptional({ enum: Order, default: Order.ASC })
  @IsEnum(Order)
  @IsOptional()
  public order?: Order;

  get skip(): string {
    return ((parseInt(this.page) - 1) * parseInt(this.take)).toString();
  }
}
