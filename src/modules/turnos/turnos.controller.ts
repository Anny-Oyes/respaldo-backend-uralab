import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  ParseIntPipe,
  Patch,
  Post,
} from '@nestjs/common';
import { CreateTurnosDto } from './dto/create-turnos.dto';
import { Turnos } from './entities/turnos.entity';
import { TurnosService } from './turnos.service';

@Controller('turnos')
export class TurnosController {
  constructor(private readonly turnosService: TurnosService) {}

  @Post()
  create(@Body() createTurnosDto: CreateTurnosDto) {
    const turnos: Turnos = {
      name: createTurnosDto.name,
      id: createTurnosDto.id,
      laboratoryUse: [],
      shift: [], 
    };
    return this.turnosService.create(turnos);
  }

  @Get(':id')
  findOne(@Param('id', ParseIntPipe) id: number) {
    return this.turnosService.findOne(id);
  }

  @Get()
  findAll() {
    return this.turnosService.findAll();
  }

  @Patch(':id')
  update(
    @Param('id', ParseIntPipe) id: number,
    @Body() updateTurnosDto: Partial<Turnos>,
  ) {
    return this.turnosService.update(id, updateTurnosDto);
  }

  @Delete(':id')
  delete(@Param('id', ParseIntPipe) id: number) {
    return this.turnosService.delete(id);
  }
}
