import { Module } from '@nestjs/common';
import { ModalidadesController } from './controller/modalidades.controller';
import { ModalidadesService } from './services/modalidades.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Modalidades } from './entities/modalidades-entities';
import { LaboratoryUse } from '../laboratory-use/entities';

@Module({
  imports: [TypeOrmModule.forFeature([Modalidades])],
  controllers: [ModalidadesController],
  providers: [ModalidadesService],
})
export class ModalidadesModule { }
