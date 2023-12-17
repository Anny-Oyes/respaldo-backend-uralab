import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Turnos } from './entities/turnos.entity';

@Injectable()
export class TurnosService {
  constructor(
    @InjectRepository(Turnos)
    private turnosRepository: Repository<Turnos>,
  ) {}

  async create(turnos: Turnos): Promise<Turnos> {
    return await this.turnosRepository.save(turnos);
  }

  async findOne(id: number): Promise<Turnos> {
    const turnos = await this.turnosRepository.findOne({ where: { id } });
    if (!turnos) {
      throw new NotFoundException(`Turno con ID ${id} no encontrado`);
    }
    return turnos;
  }

  async findAll(): Promise<Turnos[]> {
    return await this.turnosRepository.find();
  }

  async update(id: number, updateTurnosDto: Partial<Turnos>): Promise<Turnos> {
    const turnos = await this.turnosRepository.preload({
      id,
      ...updateTurnosDto,
    });
    if (!turnos) {
      throw new NotFoundException(`Turno con ID ${id} no encontrado`);
    }
    return await this.turnosRepository.save(turnos);
  }

  async delete(id: number): Promise<void> {
    const result = await this.turnosRepository.delete(id);
    if (result.affected === 0) {
      throw new NotFoundException(`Turno con ID ${id} no encontrado`);
    }
  }
}

