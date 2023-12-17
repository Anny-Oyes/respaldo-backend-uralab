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
import { CreateDocenteDto } from '../dto/docentes.dto';
import { RegistroDocentesService } from '../services/docentes.service';

@Controller('docentes')
export class RegistroDocenteController {
  constructor(private readonly registroService: RegistroDocentesService) {}

  @Post()
  async createDocente(@Body() createDocenteDto: CreateDocenteDto) {
    const docente = await this.registroService.createDocente(createDocenteDto);

    const data = {
      data: docente,
      message: 'Docente agregado correctamente ',
    };

    return data;
  }

  @Get('/')
  async getDocente() {
    const docente = await this.registroService.getDocente();

    const data = {
      data: docente,
      message: 'Ok',
    };

    return data;
  }

  @Get('/:id')
  async getDocenteById(@Param('id', ParseIntPipe) id: number) {
    const docente = await this.registroService.getDocenteById(id);

    const data = {
      data: docente,
      message: 'Ok',
    };

    return data;
  }

  @Delete('/:id')
  async deleteDocente(@Param('id') id: number) {
    const docente = await this.registroService.deleteDocente(id);

    const data = {
      data: docente,
      message: 'Ok',
    };

    return data;
  }

  @Put('/:id')
  async editarDocente(
    @Param('id', ParseIntPipe) id: number,
    @Body() payload: CreateDocenteDto,
  ) {
    const docente = await this.registroService.editDocente(id, payload);

    const data = {
      data: docente,
    };

    return data;
  }
}
