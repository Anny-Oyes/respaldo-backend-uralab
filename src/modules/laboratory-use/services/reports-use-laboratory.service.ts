import { Injectable } from '@nestjs/common';
import { DataSource } from 'typeorm';
import { FiltroReporteDocentesDto } from '../dto';
import { LaboratoryUse } from '../entities';
import { Carrera } from '../../registro-carreras/entities/carrera.entity';
import { Asignatura } from '../../asignatura/entities/asignatura.entity';
import { Docentes } from '../../Docentes/entities/docentes.entity';

@Injectable()
export class ReportsUseLaboratoryService {
  constructor(private readonly dataSource: DataSource) {}

  async reporteHorasPorDocente(params: FiltroReporteDocentesDto) {
    const rows = this.dataSource
      .getRepository(LaboratoryUse)
      .createQueryBuilder('uso')
      .leftJoin(Carrera, 'carrera', 'carrera.id = uso.carreraId')
      .leftJoin(Asignatura, 'asignatura', 'asignatura.id = uso.classNameId')
      .leftJoin(Docentes, 'docente', 'docente.id = uso.docenteId')
      .select('sum(uso.hours)', 'horas')
      .addSelect('uso.female', 'mujeres')
      .addSelect('uso.male', 'hombres')
      .addSelect('carrera.nombre', 'carrera')
      .addSelect('asignatura.nombre', 'asignatura')
      .addSelect(`docente.nombre||' '||docente.apellido`, 'docente')
      .addSelect('extract (month from uso.date)', 'mes');

    rows
      .groupBy('uso.female')
      .addGroupBy('uso.male')
      .addGroupBy('carrera.nombre')
      .addGroupBy('asignatura.nombre')
      .addGroupBy('docente.nombre')
      .addGroupBy('docente.apellido')
      .addGroupBy('extract (month from uso.date)');

    // Primer where
    rows.where('uso.id <> 0');

    // Agregando los filtro del reporte
    if (params.mes)
      rows.andWhere('extract (month from uso.date) = :mes', {
        mes: params.mes,
      });
    if (params.docente)
      rows.andWhere('uso.docenteId = :docente', {
        docente: params.docente,
      });

    if (params.anio)
      rows.andWhere('extract (year from uso.date) = :anio', {
        anio: params.anio,
      });

    if (params.carrera)
      rows.andWhere('uso.carreraId = :carrera', {
        carrera: params.carrera,
      });

    if (params.asignatura)
      rows.andWhere('uso.classNameId = :asignatura', {
        asignatura: params.asignatura,
      });
    return await rows.getRawMany();
  }
}
