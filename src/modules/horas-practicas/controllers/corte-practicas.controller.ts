import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  ParseIntPipe,
  Post,
  Put,
} from '@nestjs/common';
import { CortePracticasDto } from '../dtos/corte-practicas.dto';
import { CortePracticasService } from '../services/corte-practicas.service';

@Controller('corte-practicas')
export class CortePracticasController {
  constructor(private readonly cortePracticasDto: CortePracticasService) {}
  // crear corte practicas
  @Post('/')
  async createCorte(
    @Body() payload: CortePracticasDto,
    @Body('practicanteId', ParseIntPipe) practicanteId: number,
  ) {
    const corte = await this.cortePracticasDto.createCorte(
      payload,
      practicanteId,
    );
    const data = {
      data: corte,
      message: 'created',
    };
    return data;
  }

  //obtener todos los cortes con nombre del practicante
  @Get('/')
  async getCortes() {
    const cortes = await this.cortePracticasDto.getCortes();
    const data = {
      data: cortes,
      message: 'cortes',
    };
    return data;
  }
  //obtener un corte
  @Get(':id')
  async getCorte(@Param('id', ParseIntPipe) id: number) {
    const corte = await this.cortePracticasDto.getCorte(id);
    const data = {
      data: corte,
      message: 'corte',
    };
    return data;
  }
  //actualizar corte
  @Put(':id')
  async updateCorte(
    @Param('id', ParseIntPipe) id: number,
    @Body() payload: CortePracticasDto,
  ) {
    const corte = await this.cortePracticasDto.updateCorte(id, payload);
    const data = {
      data: corte,
      message: 'updated',
    };
    return data;
  }
  //eliminar corte
  @Delete(':id')
  async deleteCorte(@Param('id', ParseIntPipe) id: number) {
    const corte = await this.cortePracticasDto.deleteCorte(id);
    const data = {
      data: corte,
      message: 'deleted',
    };
    return data;
  }
}
