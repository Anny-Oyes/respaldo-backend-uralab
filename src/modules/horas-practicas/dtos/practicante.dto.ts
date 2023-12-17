import {
  IsNotEmpty,
  IsNumber,
  IsNumberString,
  IsOptional,
  IsString,
} from 'class-validator';

export class PracticanteDto {
  @IsNumberString()
  @IsOptional()
  id: number;

  @IsString()
  @IsNotEmpty()
  nombres: string;

  @IsString()
  @IsNotEmpty()
  apellidos: string;

  @IsNotEmpty()
  @IsString()
  fecha_inicio: string;

  @IsNotEmpty()
  @IsString()
  fecha_fin: string;

  @IsNotEmpty()
  @IsNumber()
  cantidad_horas: number;

  @IsNotEmpty()
  @IsNumber()
  carreraId: number;
}
