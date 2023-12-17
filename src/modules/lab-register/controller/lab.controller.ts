import {
  Controller,
  Get,
  Post,
  Patch,
  Put,
  Delete,
  Param,
  Body,
  ParseIntPipe,
} from '@nestjs/common';
import { LabRegisterService } from '../services';
import { LabDto, LabPartialTypeDto } from '../dto';

@Controller('labregister')
export class LabRegisterController {
  constructor(private readonly labRepository: LabRegisterService) {}

  @Get('/')
  async findAllLab() {
    const showLabs = await this.labRepository.findAll();
    


    const data = {
      data: showLabs,
      message: 'Ok',
    };

    return data;
  }

  @Get('/:id')
  async findOneLab(@Param('id', ParseIntPipe) id: number) {
    return await this.labRepository.findOneLab(id);
  }

  @Post('/')
  createLab(@Body() payload: LabDto) {
    return this.labRepository.create(payload);
  }

  @Put('/:id')
  updateLab(
    @Param('id', ParseIntPipe) id: number,
    @Body() payload: LabDto,
  ) {
    return this.labRepository.update(id, payload);
  }

  @Delete('/:id')
  async removeLab(@Param('id', ParseIntPipe) id: number) {
    return this.labRepository.remove(id);
  }
}
