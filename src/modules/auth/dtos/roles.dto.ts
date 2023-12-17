import {
  IsBoolean,
  IsNotEmpty,
  IsNumber,
  IsNumberString,
  IsOptional,
  IsString,
  MaxLength,
} from 'class-validator';

export class RoleDto {
  @IsOptional()
  @IsNumber()
  id: number;

  @IsNotEmpty()
  @IsString()
  @MaxLength(50)
  role: string;

  @IsBoolean()
  @IsOptional()
  is_active: boolean;
}
