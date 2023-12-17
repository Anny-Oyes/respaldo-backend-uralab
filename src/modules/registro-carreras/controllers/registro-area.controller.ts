import {
  Controller,
  Post,
  Body,
  Get,
  Delete,
  Param,
  Put,
  ParseIntPipe,
  Query,
} from '@nestjs/common';
import { RegistroAreaService } from '../services/registro-areas.service';
import { CreateAreaDto } from '../dtos/area.dto';
import { QueryParamsAreasDto } from '../dtos/query-params-areas.dto';

@Controller('registro-area')
export class RegistroAreaController {
  constructor(private readonly registroService: RegistroAreaService) {}

  @Post()
  async createArea(@Body() createAreaDto: CreateAreaDto) {
    const area = await this.registroService.createArea(createAreaDto);

    const data = {
      data: area,
      message: 'Area agregada correctamente ',
    };

    return data;
  }

  @Get('/')
  async getArea(@Query() query: QueryParamsAreasDto) {
    const area = await this.registroService.getArea(query);

    const data = {
      data: area,
      message: 'Ok',
    };

    return data;
  }

  @Get('/:id')
  async getAreaById(@Param('id', ParseIntPipe) id: number) {
    const area = await this.registroService.getAreaById(id);

    const data = {
      data: area,
      message: 'Ok',
    };

    return data;
  }

  @Delete('/:id')
  async deleteArea(@Param('id') id: number) {
    const area = await this.registroService.deleteArea(id);

    const data = {
      data: area,
      message: 'Ok',
    };

    return data;
  }

  @Put('/:id')
  async editarArea(
    @Param('id', ParseIntPipe) id: number,
    @Body() payload: CreateAreaDto,
  ) {
    const area = await this.registroService.editArea(id, payload);

    const data = {
      data: area,
    };

    return data;
  }
}
