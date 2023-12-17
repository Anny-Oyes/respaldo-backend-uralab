import {
    Controller,
    Post,
    Body,
    Get,
    Delete,
    Param,
    Put,
    ParseIntPipe,
  } from '@nestjs/common';
import { CreateAsignaturaDto } from '../dto/asignatura.dto';
import { RegistroAsignaturaService } from '../service/asignatura.service';
  
  @Controller('asignatura')
  export class RegistroAsignaturaController {
    constructor(private readonly registroService: RegistroAsignaturaService) {}
  
    @Post()
    async createAsignatura(@Body() createAsignaturaDto: CreateAsignaturaDto) {
      const asignatura = await this.registroService.createAsignatura(createAsignaturaDto);
  
      const data = {
        data: asignatura,
        message: 'Asignatura agregada correctamente ',
      };
  
      return data;
    }
  
    @Get('/')
    async getAsignatura() {
      const asignatura = await this.registroService.getAsignatura();
  
      const data = {
        data: asignatura,
        message: 'Ok',
      };
  
      return data;
    }
  
    @Get('/:id')
    async getAsignaturaById(@Param('id', ParseIntPipe) id: number) {
      const asignatura = await this.registroService.getAsignaturaById(id);
  
      const data = {
        data: asignatura,
        message: 'Ok',
      };
  
      return data;
    }
  
    @Delete('/:id')
    async deleteAsignatura(@Param('id') id: number) {
      const asignatura = await this.registroService.deleteAsignatura(id);
  
      const data = {
        data: asignatura,
        message: 'Ok',
      };
  
      return data;
    }
  
    @Put('/:id')
    async editarAsignatura(
      @Param('id', ParseIntPipe) id: number,
      @Body() payload: CreateAsignaturaDto,
    ) {
      const asignatura = await this.registroService.editAsignatura(id, payload);
  
      const data = {
        data: asignatura,
      };
  
      return data;
    }
  }
  