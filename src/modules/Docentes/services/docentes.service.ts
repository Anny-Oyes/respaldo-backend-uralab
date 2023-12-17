import { Body, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Docentes } from '../entities/docentes.entity';
import { CreateDocenteDto } from '../dto/docentes.dto';

@Injectable()
export class RegistroDocentesService {
  constructor(
    @InjectRepository(Docentes)
    private docenteRepository: Repository<Docentes>,
  ) {}

  async createDocente(createDocenteDto: CreateDocenteDto): Promise<Docentes> {
    const nuevoDocente = this.docenteRepository.create(createDocenteDto);
    return this.docenteRepository.save(nuevoDocente);
  }

  async getDocente(): Promise<Docentes[]> {
    return await this.docenteRepository.find();
  }

  async getDocenteById(id: number): Promise<Docentes> {
    const docente = await this.docenteRepository.findOne({
      where: { id },
    });

    return docente;
  }

  async deleteDocente(id: number): Promise<void> {
    await this.docenteRepository.delete(id);
  }

  async editDocente(id: number, payload: CreateDocenteDto): Promise<Docentes> {
    const docente = await this.docenteRepository.preload({ id, ...payload });
    return await this.docenteRepository.save(docente);
  }
}
