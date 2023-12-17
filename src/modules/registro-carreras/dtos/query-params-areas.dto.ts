import { IsBoolean, IsOptional, IsString } from 'class-validator';

export class QueryParamsAreasDto {
  @IsOptional()
  @IsString()
  readonly nombre?: string;
}
