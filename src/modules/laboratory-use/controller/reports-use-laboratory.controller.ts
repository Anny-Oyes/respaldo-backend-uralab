import { Controller, Get, Query } from '@nestjs/common';
import { ReportsUseLaboratoryService } from '../services/reports-use-laboratory.service';
import { FiltroReporteDocentesDto } from '../dto';

@Controller('reports-use-laboratory')
export class ReportsUseLaboratoryController {
  constructor(private readonly reporteDocentes: ReportsUseLaboratoryService) { }

  @Get('horas-docente')
  async getReporteHorasDocente(@Query() params: FiltroReporteDocentesDto) {
    const rows = await this.reporteDocentes.reporteHorasPorDocente(params);
    const data = {
      data: rows,
    };
    return data;
  }
}