import { IsNotEmpty, IsObject, IsString } from 'class-validator';
import { Area } from '../entities';

export class CreateCarreraDto {
  @IsNotEmpty()
  @IsString()
  nombre: string;

  @IsNotEmpty()
  @IsObject()
  area: Area; // ID del área a la que pertenece la carrera
}
