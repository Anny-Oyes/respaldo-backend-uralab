import { IsNotEmpty, IsNumber, IsOptional, IsString } from 'class-validator';
import { PrimaryGeneratedColumn } from 'typeorm';

export class CortePracticasDto {
  @PrimaryGeneratedColumn({
    name: 'id',
    type: 'int4',
  })
  id?: number;


  @IsString()
  @IsNotEmpty()
  fecha_corte: string;

  @IsNumber()
  @IsOptional()
  horas_actuales: number;

  @IsNumber()
  @IsNotEmpty()
  horas_anteriores: number;

  @IsNumber()
  @IsOptional()
  horas_totales: number;

  @IsNotEmpty()
  @IsNumber()
  practicanteId: number;
}
