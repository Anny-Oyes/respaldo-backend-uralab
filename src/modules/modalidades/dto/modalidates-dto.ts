import { ApiProperty, PartialType } from '@nestjs/swagger';
import {
  IsBoolean,
  IsNotEmpty,
  IsNumber,
  IsNumberString,
  IsOptional,
  IsString,
  MaxLength,
} from 'class-validator';

export class ModalidadesDto {
  @IsOptional()
  @IsNumber()
  id: number;

  @IsNotEmpty()
  @IsString()
  @MaxLength(50)
  modalidad: string;

  @IsBoolean()
  @IsOptional()
  isActive: boolean;
}
