import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Asignatura } from './entities/asignatura.entity';
import { RegistroAsignaturaController } from './controller/asignatura.controller';
import { RegistroAsignaturaService } from './service/asignatura.service';

@Module({
  imports: [TypeOrmModule.forFeature([Asignatura])],
  controllers: [RegistroAsignaturaController],
  providers: [RegistroAsignaturaService],
})
export class RegistroAsignatureModule {}
