import { IsNumber, IsOptional } from 'class-validator';

export class FiltroReporteDocentesDto {
  @IsOptional()
  @IsNumber()
  docente?: number;
  @IsOptional()
  @IsNumber()
  asignatura?: number;
  @IsOptional()
  @IsNumber()
  carrera?: number;
  @IsOptional()
  @IsNumber()
  mes?: number;
  @IsOptional()
  @IsNumber()
  anio?: number;
}
