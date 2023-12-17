import { IsNumber, IsOptional, IsString } from 'class-validator';

export class FiltroBuscarDocenteDto {
  @IsOptional()
  @IsNumber()
  docente?: number;
  
  @IsString()
  buscar: string;
}
