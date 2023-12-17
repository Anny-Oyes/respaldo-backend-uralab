import { IsBoolean, IsNumber, IsObject, IsOptional, IsString } from 'class-validator';

export class QueryParamsUsoLabsDto {
  @IsOptional()
  @IsNumber()
  readonly docente?:number;

  @IsOptional()
  @IsString()
  readonly is_active?: string;
}
