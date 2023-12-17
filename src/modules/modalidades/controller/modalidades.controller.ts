import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  ParseIntPipe,
  Post,
  Put,
  Query,
} from '@nestjs/common';
import { ModalidadesService } from '../services/modalidades.service';
import { ModalidadesDto } from '../dto/modalidates-dto';
import { Modalidades } from '../entities/modalidades-entities';
import { QueryParamsModalidadesDto } from '../dto/query-params-modalidades-dto';

@Controller('modalidades')
export class ModalidadesController {
  constructor(private readonly RepoModalidadesService: ModalidadesService) {}

  @Post('/')
  async createdModalidades(@Body() payload: ModalidadesDto) {
    const newModalidades = await this.RepoModalidadesService.created(payload);
    const data = {
      data: newModalidades,
      message: 'created',
    };
    return data;
  }

  @Get('/')
  async getModalidades(@Query() query: QueryParamsModalidadesDto) {
    const modalidades = await this.RepoModalidadesService.getModalidades(query);
    const data = {
      data: modalidades,
      message: 'ok',
    };
    return data;
  }

  @Get('/:id')
  async getModalidadesId(@Param('id', ParseIntPipe) id: number) {
    const modalidades = await this.RepoModalidadesService.getModalidadesId(id);
    const data = {
      data: modalidades,
      message: 'ok',
    };
    return data;
  }

  @Put('/:id')
  async updatedModalidades(
    @Param('id', ParseIntPipe) id: number,
    @Body() payload: ModalidadesDto,
  ) {
    const modalidades = await this.RepoModalidadesService.updated(id, payload);
    const data = {
      data: modalidades,
    };
    return data;
  }

  @Delete('/:id')
  async deletedModalidades(@Param('id', ParseIntPipe) id: number) {
    const modalidades = await this.RepoModalidadesService.delete(id);
    const data = {
      data: modalidades,
    };
    return data;
  }
}
