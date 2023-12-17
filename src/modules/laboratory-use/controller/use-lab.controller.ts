import { Body, Controller, Get, Post, Put, ParseUUIDPipe, ParseIntPipe } from "@nestjs/common";
import { Delete, Param, Query } from "@nestjs/common/decorators";
import { LaboratoryUseDto } from "../dto";
import { UseLabService } from "../services/use-lab.service";
import { QueryParamsUsoLabsDto } from "../dto/query-params-usoLab.dto";

@Controller('uselab')
export class UseLabController {
  constructor(
    private readonly registerDetailServiceRepo: UseLabService
  ) { }

  @Post('/')
  async createUselab(@Body() createUselabDto: LaboratoryUseDto) {
    const uselabs = await this.registerDetailServiceRepo.createUselab(createUselabDto);

    const data = {
      data: uselabs,
    };

    return data;
  }

  @Get('/')
  async getUselab(@Query() query: QueryParamsUsoLabsDto) {
    const uselab = await this.registerDetailServiceRepo.getUselab(query);

    const data = {
      data: uselab,
      message: 'Ok',
    };

    return data;
  }

  @Get('/:id')
  async getUselabById(@Param('id',ParseIntPipe) id: number) {
    const uselabs = await this.registerDetailServiceRepo.findOne(id);

    const data = {
      data: uselabs,
      message: 'Ok',
    };

    return data;
  }

  @Delete('/:id')
  async deleteUselab(@Param('id') id: number) {
    const uselabs = await this.registerDetailServiceRepo.deleteUselab(id);

    const data = {
      data: uselabs,
      message: 'Ok',
    };

    return data;
  }

  @Put(':id')
  async update(
    @Param('id', ParseIntPipe) id: number,
    @Body() updateRegisterDetailDto: LaboratoryUseDto
  ) {
    const uselabs = await this.registerDetailServiceRepo.update(id, updateRegisterDetailDto);

    const data = {
      data: uselabs,
    };

    return data;
  }
}