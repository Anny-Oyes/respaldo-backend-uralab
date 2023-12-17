import { ApiProperty, PartialType } from '@nestjs/swagger';
import {
  IsBoolean,
  IsNotEmpty,
  IsNumber,
  IsObject,
  IsOptional,
  IsString,
  MaxLength,
} from 'class-validator';
import { Asignatura } from 'src/modules/asignatura/entities/asignatura.entity';
import { LabEntity } from 'src/modules/lab-register/entities';
import { Modalidades } from 'src/modules/modalidades/entities/modalidades-entities';
import { Carrera } from 'src/modules/registro-carreras/entities';
import { Docentes } from 'src/modules/Docentes/entities/docentes.entity';
import { Turnos } from 'src/modules/turnos/entities/turnos.entity';


export class LaboratoryUseDto {
  @IsNumber()
  @IsOptional()
  @ApiProperty()
  readonly id?: number;

  @IsNotEmpty()
  @IsObject()
  className: Asignatura;

  @IsNotEmpty()
  @IsObject()
  carrera: Carrera;

  @IsNotEmpty()
  @IsObject()
  docente: Docentes;

  @IsString()
  @IsNotEmpty()
  @ApiProperty()
  readonly date: string;

  @IsNotEmpty()
  @IsObject()
  modality: Modalidades;

  @IsNotEmpty()
  @IsObject()
  shift: Turnos;

  @IsNumber()
  @IsNotEmpty()
  @ApiProperty()
  readonly year?: number;

  @IsString()
  @IsNotEmpty()
  @MaxLength(50)
  @ApiProperty()
  readonly semester: string;

  @IsNumber()
  @IsNotEmpty()
  @ApiProperty()
  readonly female: number;

  @IsNumber()
  @IsNotEmpty()
  @ApiProperty()
  readonly male: number;

  @IsNumber()
  @IsNotEmpty()
  @ApiProperty()
  readonly total: number;

  @IsString()
  @IsNotEmpty()
  @ApiProperty()
  readonly hours: string;

  @IsNotEmpty()
  @IsObject()
  laboratorio: LabEntity;

  @IsBoolean()
  @IsOptional()
  is_active: boolean;
}

export class UseLabTypeDto extends PartialType(LaboratoryUseDto) { }
