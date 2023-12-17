import { Controller, Get, Query } from '@nestjs/common';
import { CatalogosService } from '../services/catalogos.service';
import { CatalogosDto } from '../dtos/catalogos-dtos';
import { query } from 'express';
import { FiltroReporteDocentesDto } from 'src/modules/laboratory-use/dto';
import { FiltroBuscarDocenteDto } from 'src/modules/laboratory-use/dto/filtro-buscar.dto';

@Controller('catalogos')
export class CatalogosController {
  constructor(private readonly catalogosService: CatalogosService) { }

  @Get('/roles')
  async getRoles(@Query() query: CatalogosDto) {
    return await this.catalogosService.getRoles(query);
  }

  @Get('/areas')
  async getAreas(@Query() query: CatalogosDto) {
    return await this.catalogosService.getAreas(query);
  }

  @Get('/modalidades')
  async getModalidades(@Query() query: CatalogosDto) {
    return await this.catalogosService.getModalidades(query);
  }

  @Get('/practicante')
  async getPracticante(@Query() query: CatalogosDto) {
    return await this.catalogosService.getPracticante(query);
  }

  @Get('/corte-practicas')
  async getCortePractica(@Query() query: CatalogosDto) {
    return await this.catalogosService.getCortePractica(query);
  }

  @Get('/uselab')
  async getUselab(@Query() query: FiltroBuscarDocenteDto) {
    const rows = await this.catalogosService.getUselab(query);
    const data = {
      data: rows,
    };
    return data;
  }

  @Get('/users')
  async getUsers() {
    return await this.catalogosService.getUsers();
  }
  @Get('/labregister')
  async getLaboratory() {
    return await this.catalogosService.getLaboratory();
  }
  @Get('/registro-carreras')
  async getCarreras() {
    return await this.catalogosService.getCarrera();
  }

  @Get('/asignatura')
  async getAsignatura(@Query() query: CatalogosDto) {
    return await this.catalogosService.getAsignatura(query);
 
}
  @Get('/docentes')
  async getDocente(@Query() query: CatalogosDto) {
    return await this.catalogosService.getDocente(query);
  }

  
  @Get('/turnos')
  async getTurnos(@Query() query: CatalogosDto) {
    return await this.catalogosService.getTurnos(query);
  }


}
