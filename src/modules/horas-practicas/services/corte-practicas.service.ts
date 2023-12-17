import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { CortePracticas } from '../entities/corte-practicas.entity';
import { Repository } from 'typeorm';
import { CortePracticasDto } from '../dtos/corte-practicas.dto';
import { Practicante } from '../entities/practicante.entity';

@Injectable()
export class CortePracticasService {
  constructor(
    @InjectRepository(CortePracticas)
    private readonly cortePracticasRepo: Repository<CortePracticas>,

    @InjectRepository(Practicante)
    private readonly practicanteRepo: Repository<Practicante>,
  ) {}

  async createCorte(
    payload: CortePracticasDto,
    practicanteId: number,
  ): Promise<CortePracticas> {
    try {
      const practicante = await this.practicanteRepo.findOne({
        where: { id: practicanteId },
      });
      const newCorte = this.cortePracticasRepo.create({
        ...payload,
        practicante,
      });
      return await this.cortePracticasRepo.save(newCorte);
    } catch (error) {
      throw new Error('Error al crear el corte');
    }
  }
  //obtener todos los cortes
  async getCortes(): Promise<CortePracticas[]> {
    try {
      return this.cortePracticasRepo.find({relations: ['practicante']});
    } catch (error) {
      throw new Error('Error al obtener los cortes');
    }
  }
  //obtener un corte
  async getCorte(id: number): Promise<CortePracticas> {
    try {
      return this.cortePracticasRepo.findOne({ where: { id } });
    } catch (error) {
      throw new NotFoundException('No se encontro el corte');
    }
  }
  //actualizar corte
  async updateCorte(
    id: number,
    payload: CortePracticasDto,
  ): Promise<CortePracticas> {
    try {
      await this.cortePracticasRepo.update({ id }, { ...payload });
      return this.getCorte(id);
    } catch (error) {
      throw new Error('Error al actualizar el corte');
    }
  }
  //eliminar corte
  async deleteCorte(id: number): Promise<any> {
    //validar que si hay una relacion con practicante no se pueda eliminar
    try {
      const corte = await this.getCorte(id);
      if (corte.practicante) {
        throw new Error(
          'No se puede eliminar el corte porque tiene una relacion con practicante',
        );
      }
      await this.cortePracticasRepo.delete({ id });
      return { message: 'Corte eliminado' };
    } catch (error) {
      throw new Error('Error al eliminar el corte');
    }
  }
}
