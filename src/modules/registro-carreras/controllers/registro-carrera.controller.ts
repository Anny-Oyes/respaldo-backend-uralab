import {
  Controller,
  Post,
  Body,
  Get,
  Delete,
  Put,
  Param,
  ParseIntPipe,
} from '@nestjs/common';
import { RegistroCarrerasService } from '../services/registro-carrera.service';
import { CreateCarreraDto } from '../dtos/carrera.dto';
import { Carrera } from '../entities';

@Controller('registro-carreras')
export class RegistroCarrerasController {
  constructor(private readonly registroService: RegistroCarrerasService) {}

  @Post('/')
  async createCarrera(@Body() createCarreraDto: CreateCarreraDto) {
    const carrera = await this.registroService.createCarrera(createCarreraDto);

    const data = {
      data: carrera,
      message: 'Carrera agregada exitosamente',
    };

    return data;
  }

  @Get('/')
  async getArea() {
    const carrera = await this.registroService.getCarreras();

    const data = {
      data: carrera,
      message: 'Ok',
    };

    return data;
  }

  @Get('/:id')
  async getAreaById(@Param('id', ParseIntPipe) id: number) {
    const carrera = await this.registroService.getCarreraById(id);

    const data = {
      data: carrera,
      message: 'Ok',
    };

    return data;
  }

  @Delete('/:id')
  async deleteCarrera(@Param('id') id: number) {
    const carrera = await this.registroService.deleteCarrera(id);

    const data = {
      data: carrera,
      message: 'Se ha eliminado correctamente la carrera',
    };

    return data;
  }

  @Put('/:id')
  async editarArea(
    @Param('id', ParseIntPipe) id: number,
    @Body() payload: CreateCarreraDto,
  ) {
    const carrera = await this.registroService.editCarrera(id, payload);

    const data = {
      data: carrera,
      message: 'Se ha editado correctamente la carrera',
    };

    return data;
  }
}
