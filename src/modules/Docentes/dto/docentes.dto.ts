import {
  IsNotEmpty,
  IsNumberString,
  IsOptional,
  IsString,
  MaxLength,
} from 'class-validator';

export class CreateDocenteDto {
  @IsOptional()
  @IsNumberString()
  id: number;

  @IsNotEmpty()
  @IsString()
  @MaxLength(100)
  nombre: string;

  @IsNotEmpty()
  @IsString()
  @MaxLength(100)
  apellido: string;

  @IsNotEmpty()
  @IsString()
  @MaxLength(100)
  fechaNacimiento: string;
}
