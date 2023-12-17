import {
  IsNotEmpty,
  IsNumber,
  IsOptional,
  IsString,
  MaxLength,
} from 'class-validator';

export class CreateAreaDto {
  @IsOptional()
  @IsNumber()
  id: number;

  @IsNotEmpty()
  @IsString()
  @MaxLength(50)
  nombre: string;
}
