//module horas practicas
import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { CortePracticas } from './entities/corte-practicas.entity';
import { Practicante } from './entities/practicante.entity';
import { CortePracticasController } from './controllers/corte-practicas.controller';
import { CortePracticasService } from './services/corte-practicas.service';
import { PracticanteController } from './controllers/practicante.controller';
import { PracticanteService } from './services/practicante.service';
import { Carrera } from '../registro-carreras/entities';

@Module({
  imports: [TypeOrmModule.forFeature([CortePracticas, Practicante, Carrera])],
  controllers: [CortePracticasController, PracticanteController],
  providers: [CortePracticasService, PracticanteService],
})
export class HorasPracticasModule {}
