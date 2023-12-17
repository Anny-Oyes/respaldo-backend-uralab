import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Modalidades } from '../entities/modalidades-entities';
import { Delete } from '@nestjs/common/decorators';
import { ModalidadesDto } from '../dto/modalidates-dto';
import { query } from 'express';
import { QueryParamsModalidadesDto } from '../dto/query-params-modalidades-dto';

@Injectable()
export class ModalidadesService {
  constructor(
    @InjectRepository(Modalidades)
    private readonly modalidadesRepo: Repository<Modalidades>,
  ) {}

  async created(payload: ModalidadesDto) {
    const modalidades = await this.modalidadesRepo.create(payload);
    return await this.modalidadesRepo.save(modalidades);
  }

  async getModalidades(
    query: QueryParamsModalidadesDto,
  ): Promise<Modalidades[]> {
    const rows = this.modalidadesRepo
      .createQueryBuilder('pepito')
      .where('id <> 0');
    console.log(query);

    if (query.modalidad)
      rows.andWhere('pepito.modalidad ILIKE :modalidad', {
        modalidad: `%${query.modalidad}%`,
      });

    if (query.isActive === 'true')
      rows.andWhere('pepito.isActive = :isActive', {
        isActive: true,
      });

    if (query.isActive === 'false')
      rows.andWhere('pepito.isActive = :isActive', {
        isActive: false,
      });

    rows.orderBy('pepito.id', 'ASC');

    return await rows.getMany();
  }

  async getModalidadesId(id: number): Promise<Modalidades> {
    const modalidades = await this.modalidadesRepo.findOne({
      where: { id },
    });
    return modalidades;
  }

  async updated(id: number, payload: ModalidadesDto): Promise<Modalidades> {
    const modalidades = await this.modalidadesRepo.findOne({
      where: { id: id },
    });
    this.modalidadesRepo.merge(modalidades, payload);
    return await this.modalidadesRepo.save(modalidades);
  }

  async delete(id: number): Promise<Modalidades> {
    const modalidades = await this.modalidadesRepo.findOne({
      where: { id: id },
    });
    return await this.modalidadesRepo.remove(modalidades);
  }
}
