import { Query } from '@nestjs/common';
import { IsOptional, IsString } from 'class-validator';

export class QueryParamsModalidadesDto {
  @IsOptional()
  @IsString()
  readonly modalidad?: string;

  @IsOptional()
  @IsString()
  readonly isActive?: string;
}
