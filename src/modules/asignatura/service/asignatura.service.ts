import { Body, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Asignatura } from '../entities/asignatura.entity';
import { CreateAsignaturaDto } from '../dto/asignatura.dto';

@Injectable()
export class RegistroAsignaturaService {
  constructor(
    @InjectRepository(Asignatura)
    private asignaturaRepository: Repository<Asignatura>,
  ) {}

  async createAsignatura(createAsignaturaDto: CreateAsignaturaDto): Promise<Asignatura> {
    const nuevoAsignatura = this.asignaturaRepository.create(createAsignaturaDto);
    return this.asignaturaRepository.save(nuevoAsignatura);
  }

  async getAsignatura(): Promise<Asignatura[]> {
    return await this.asignaturaRepository.find();
  }

  async getAsignaturaById(id: number): Promise<Asignatura> {
    const asignatura = await this.asignaturaRepository.findOne({
      where: { id },
    });

    return asignatura;
  }

  async deleteAsignatura(id: number): Promise<void> {
    await this.asignaturaRepository.delete(id);
  }

  async editAsignatura(id: number, payload: CreateAsignaturaDto): Promise<Asignatura> {
    const asignatura = await this.asignaturaRepository.preload({ id, ...payload });
    return await this.asignaturaRepository.save(asignatura);
  }
}
