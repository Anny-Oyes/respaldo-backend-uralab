import { IsString } from 'class-validator';

export class CatalogosDto {
  @IsString()
  buscar: string;
}
