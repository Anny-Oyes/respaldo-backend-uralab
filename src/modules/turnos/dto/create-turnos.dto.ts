import { IsInt, IsOptional, IsString } from 'class-validator';

export class CreateTurnosDto {
  @IsString()
  readonly name: string;

  @IsOptional()
  @IsInt()
  readonly id?: number;
}
