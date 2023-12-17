import { IsNumber, IsOptional } from "class-validator";

export class FiltroReporteHorasDocentesDto {
    @IsOptional()
    @IsNumber()
    mes?: number;
    @IsOptional()
    @IsNumber()
    anio?: number;
    @IsOptional()
    @IsNumber()
    docente?: number;
    @IsOptional()
    @IsNumber()
    asignatura?: number;
}