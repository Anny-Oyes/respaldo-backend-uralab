import { Injectable } from '@nestjs/common';
import { DataSource, ILike } from 'typeorm';
import { Role } from '../../auth/entities/roles.entity';
import { Area } from 'src/modules/registro-carreras/entities';
import { Modalidades } from '../../modalidades/entities/modalidades-entities';
import { Practicante } from 'src/modules/horas-practicas/entities/practicante.entity';
import { CortePracticas } from 'src/modules/horas-practicas/entities/corte-practicas.entity';

import { LaboratoryUse } from 'src/modules/laboratory-use/entities';
import { User } from 'src/modules/auth/entities';
import { Carrera } from 'src/modules/registro-carreras/entities';
import { Asignatura } from 'src/modules/asignatura/entities/asignatura.entity';
import { LabEntity } from '../../lab-register/entities';
import { CatalogosDto } from '../dtos/catalogos-dtos';
import { Docentes } from 'src/modules/Docentes/entities/docentes.entity';
import { FiltroReporteDocentesDto } from 'src/modules/laboratory-use/dto';
import { FiltroBuscarDocenteDto } from 'src/modules/laboratory-use/dto/filtro-buscar.dto';
import { Turnos } from 'src/modules/turnos/entities/turnos.entity';


@Injectable()
export class CatalogosService {
  constructor(private readonly dataSource: DataSource) { }

  async getRoles(query: CatalogosDto) {
    const rows = await this.dataSource
      .getRepository(Role)
      .createQueryBuilder('roles')
      .where(
        "translate(roles.role,'áéíóúÁÉÍÓÚäëïöüÄËÏÖÜ','aeiouAEIOUaeiouAEIOU') ILIKE '%' || translate(:buscar,'áéíóúÁÉÍÓÚäëïöüÄËÏÖÜ','aeiouAEIOUaeiouAEIOU') || '%'",
        {
          buscar: query.buscar || '',
        },
      )
      .getMany();
    return rows;
  }

  async getAreas(query: CatalogosDto) {
    const rows = await this.dataSource
      .getRepository(Area)
      .createQueryBuilder('area')
      .where(
        "translate(area.nombre,'áéíóúÁÉÍÓÚäëïöüÄËÏÖÜ','aeiouAEIOUaeiouAEIOU') ILIKE '%' || translate(:buscar,'áéíóúÁÉÍÓÚäëïöüÄËÏÖÜ','aeiouAEIOUaeiouAEIOU') || '%'",
        {
          buscar: query.buscar || '',
        },
      )
      .getMany();
    return rows;
  }

  async getModalidades(query: CatalogosDto) {
    const rows = await this.dataSource
      .getRepository(Modalidades)
      .createQueryBuilder('modalidades')
      .where(
        "translate(modalidades.modalidades,'áéíóúÁÉÍÓÚäëïöüÄËÏÖÜ','aeiouAEIOUaeiouAEIOU') ILIKE '%' || translate(:buscar,'áéíóúÁÉÍÓÚäëïöüÄËÏÖÜ','aeiouAEIOUaeiouAEIOU') || '%'",
        {
          buscar: query.buscar || '',
        },
      )
      .getMany();
    return rows;
  }

  async getPracticante(query: CatalogosDto) {
    const row = await this.dataSource
      .getRepository(Practicante)
      .createQueryBuilder('practicantes')
      .where(
        "translate(practicantes.nombres,'áéíóúÁÉÍÓÚäëïöüÄËÏÖÜ','aeiouAEIOUaeiouAEIOU') ILIKE '%' || translate(:buscar,'áéíóúÁÉÍÓÚäëïöüÄËÏÖÜ','aeiouAEIOUaeiouAEIOU') || '%'",
        {
          buscar: query.buscar || '',
        },
      )
      .getMany();
    return row;
  }

  async getCortePractica(query: CatalogosDto) {
    const rows = await this.dataSource
      .getRepository(CortePracticas)
      .createQueryBuilder('CortePracticas')
      .getMany();
    return rows;
  }
  async getUselab(query: FiltroBuscarDocenteDto) {
    const rows = this.dataSource
      .getRepository(LaboratoryUse)
      .createQueryBuilder('uselab')
      .leftJoin(Docentes, 'docente', 'docente.id = uselab.docenteId')
      .select(`docente.nombre || ' ' || docente.apellido`, 'docente')
      .where(
        "translate(docente.nombre || ' ' || docente.apellido,'áéíóúÁÉÍÓÚäëïöüÄËÏÖÜ','aeiouAEIOUaeiouAEIOU') ILIKE '%' || translate(:buscar,'áéíóúÁÉÍÓÚäëïöüÄËÏÖÜ','aeiouAEIOUaeiouAEIOU') || '%'",
        {
          buscar: query.buscar || '',
        },
      )
      .groupBy('docente.nombre')
      .addGroupBy('docente.apellido');

    if (query.docente) {
      rows.andWhere('uselab.docenteId = :docente', {
        docente: query.docente,
      });
    }
    return await rows.getRawMany();
  }

  // async getUselab(query: FiltroBuscarDocenteDto) {
  //   const rows = this.dataSource
  //   .getRepository(LaboratoryUse)
  //   .createQueryBuilder('uselab')
  //   .leftJoin(Docentes, 'docente', 'docente.id = uselab.docenteId')
  //   .select(`docente.nombre||' '||docente.apellido`, 'docente')
  //   .where(
  //     "translate(docente.nombre || ' ' || docente.apellido,'áéíóúÁÉÍÓÚäëïöüÄËÏÖÜ','aeiouAEIOUaeiouAEIOU') ILIKE '%' || translate(:buscar,'áéíóúÁÉÍÓÚäëïöüÄËÏÖÜ','aeiouAEIOUaeiouAEIOU') || '%'",
  //     {
  //       buscar: query.buscar || '',
  //     },
  //     )
  //   //   rows
  //     .groupBy('docente.nombre')
  //     .addGroupBy('docente.apellido')

  //     rows.where('uselab.id <> 0');
  //     if (query.docente)
  //     rows.andWhere('uselab.docenteId = :docente', {
  //       docente: query.docente,
  //     });

  //     return await rows.getRawMany();
  // }


  async getAsignatura(query: CatalogosDto) {
    const rows = await this.dataSource
      .getRepository(Asignatura)
      .createQueryBuilder('asignatura')
      .where(
        "translate(asignatura.nombre,'áéíóúÁÉÍÓÚäëïöüÄËÏÖÜ','aeiouAEIOUaeiouAEIOU') ILIKE '%' || translate(:buscar,'áéíóúÁÉÍÓÚäëïöüÄËÏÖÜ','aeiouAEIOUaeiouAEIOU') || '%'",
        {
          buscar: query.buscar || '',
        },
      )
      .getMany();
    return rows;
  }
  async getUsers() {
    const rows = await this.dataSource.getRepository(User).createQueryBuilder('users').getMany();
    return rows;
  }

  async getCarrera() {
    const row = await this.dataSource.getRepository(Carrera).createQueryBuilder('carrera').getMany();
    return row;
  }
  async getLaboratory() {
    const row = await this.dataSource.getRepository(LabEntity).find();
    console.log(row);
    return row;
  }

  async getDocente(query: CatalogosDto) {
    const rows = await this.dataSource
      .getRepository(Docentes)
      .createQueryBuilder('docentes')
      .where(
        "translate(docentes.nombre,'áéíóúÁÉÍÓÚäëïöüÄËÏÖÜ','aeiouAEIOUaeiouAEIOU') ILIKE '%' || translate(:buscar,'áéíóúÁÉÍÓÚäëïöüÄËÏÖÜ','aeiouAEIOUaeiouAEIOU') || '%'",
        {
          buscar: query.buscar || '',
        },
      )
      .getMany();
    return rows;
  }

  async getTurnos(query: CatalogosDto) {
    const rows = await this.dataSource
      .getRepository(Turnos)
      .createQueryBuilder('turnos')
      .where(
        "translate(turnos.name,'áéíóúÁÉÍÓÚäëïöüÄËÏÖÜ','aeiouAEIOUaeiouAEIOU') ILIKE '%' || translate(:buscar,'áéíóúÁÉÍÓÚäëïöüÄËÏÖÜ','aeiouAEIOUaeiouAEIOU') || '%'",
        {
          buscar: query.buscar || '',
        },
      )
      .getMany();
    return rows;
  }


}
