import { ApiProperty, PartialType } from '@nestjs/swagger';
import {
  IsBoolean,
  IsNotEmpty,
  IsNumber,
  IsOptional,
  IsString,
  MaxLength,
} from 'class-validator';

export class LabDto {
  @IsNumber()
  @IsOptional()
  @ApiProperty()
  readonly id?: number;

  @IsString()
  @IsNotEmpty()
  @MaxLength(100)
  @ApiProperty()
  readonly labName: string;

  @IsString()
  @IsNotEmpty()
  @ApiProperty()
  readonly description: string;

  @IsString()
  @IsNotEmpty()
  @MaxLength(20)
  @ApiProperty()
  readonly fundation: string;

  @IsString()
  @IsString()
  @IsNotEmpty()
  @MaxLength(100)
  @ApiProperty()
  readonly builder: string;

  @IsBoolean()
  @IsOptional()
  @ApiProperty()
  readonly isActive: boolean;
}
export class LabPartialTypeDto extends PartialType(LabDto) {}
