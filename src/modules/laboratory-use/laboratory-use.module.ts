import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { LaboratoryUse } from './entities';
import { UseLabController } from './controller/use-lab.controller';
import { UseLabService } from './services/use-lab.service';
import { Modalidades } from '../modalidades/entities/modalidades-entities';
import { Carrera } from '../registro-carreras/entities';
import { LabEntity } from '../lab-register/entities';
import { Docentes } from '../Docentes/entities/docentes.entity';
import { Asignatura } from '../asignatura/entities/asignatura.entity';
import { ReportsUseLaboratoryService } from './services/reports-use-laboratory.service';
import { ReportsUseLaboratoryController } from './controller/reports-use-laboratory.controller';
import { Turnos } from '../turnos/entities/turnos.entity';
import { ReportsController } from './controller/reports-horas-docentes.controller';
import { ReportsLaboratoryUseService } from './services/reports-horas-docentes.service';

@Module({
    imports: [TypeOrmModule.forFeature([LaboratoryUse, Modalidades, Carrera, LabEntity, Docentes, Asignatura, Turnos])],
    controllers: [UseLabController, ReportsUseLaboratoryController, ReportsController],
    providers: [UseLabService, ReportsUseLaboratoryService, ReportsLaboratoryUseService],
})
export class UseLabModule { }