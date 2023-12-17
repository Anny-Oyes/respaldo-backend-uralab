import {
    IsNotEmpty,
    IsNumberString,
    IsOptional,
    IsString,
    MaxLength,
  } from 'class-validator';
  
  export class CreateAsignaturaDto {
    @IsOptional()
    @IsNumberString()
    id: number;
  
    @IsNotEmpty()
    @IsString()
    @MaxLength(100)
    nombre: string;

  }
  