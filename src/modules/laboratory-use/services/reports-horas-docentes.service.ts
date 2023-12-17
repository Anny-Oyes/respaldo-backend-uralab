import { Injectable } from '@nestjs/common';
import { DataSource } from 'typeorm';
import { FiltroReporteDocentesDto } from '../dto';
import { LaboratoryUse } from '../entities';
import { Asignatura } from '../../asignatura/entities/asignatura.entity';
import { Docentes } from '../../Docentes/entities/docentes.entity';

@Injectable()
export class ReportsLaboratoryUseService {
    constructor(private readonly dataSource: DataSource) { }

    async reporteHorasPorDocente(params: FiltroReporteDocentesDto) {
        const rows = this.dataSource
            .getRepository(LaboratoryUse)
            .createQueryBuilder('uso')
            .leftJoin(Asignatura, 'asignatura', 'asignatura.id = uso.classNameId')
            .leftJoin(Docentes, 'docente', 'docente.id = uso.docenteId')
            .select('sum(uso.hours)', 'horas')
            .addSelect('asignatura.nombre', 'asignatura')
            .addSelect(`docente.nombre||' '||docente.apellido`, 'docente')
            .addSelect('extract (month from uso.date)', 'mes')
            .addSelect('extract (year from uso.date)', 'anio');

        rows
            .groupBy('uso')
            .addGroupBy('asignatura.nombre')
            .addGroupBy('docente.nombre')
            .addGroupBy('docente.apellido')
            .addGroupBy('extract (month from uso.date)')
            .addGroupBy('extract (year from uso.date)');

        rows.where('uso.id <> 0');

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
        // return await rows.getRawMany();

        //Esto es lo que hace que sume
        const result = await rows.getRawMany();

        const totalHoras = result.reduce((acc, item) => acc + parseInt(item.horas, 10), 0);
        result.push({ totalHoras: totalHoras.toString() });

        return result;
    }
}
