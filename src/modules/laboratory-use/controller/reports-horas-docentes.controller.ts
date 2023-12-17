import { Controller, Get, Query } from '@nestjs/common';
import { FiltroReporteHorasDocentesDto } from '../dto/filtro-reporte-horas-docente.dto';
import { ReportsLaboratoryUseService } from '../services/reports-horas-docentes.service';

@Controller('reportes')
export class ReportsController {
    constructor(private readonly reporte: ReportsLaboratoryUseService) { }

    @Get('horas-docente')
    async getReporteHorasDocente(@Query() params: FiltroReporteHorasDocentesDto) {
        const rows = await this.reporte.reporteHorasPorDocente(params);
        const data = {
            data: rows,
        };
        return data;
    }
}