import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Area, Carrera } from './entities';
import { RegistroCarrerasController } from './controllers/registro-carrera.controller';
import { RegistroAreaController } from './controllers/registro-area.controller';
import { RegistroCarrerasService } from './services/registro-carrera.service';
import { RegistroAreaService } from './services/registro-areas.service';


@Module({
  imports: [TypeOrmModule.forFeature([Area, Carrera])],
  controllers: [RegistroCarrerasController, RegistroAreaController],
  providers: [RegistroCarrerasService, RegistroAreaService],
})
export class RegistroCarrerasModule { }
