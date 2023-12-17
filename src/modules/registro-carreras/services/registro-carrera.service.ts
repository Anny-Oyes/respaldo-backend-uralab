import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Area, Carrera } from '../entities';
import { CreateCarreraDto } from '../dtos/carrera.dto';

@Injectable()
export class RegistroCarrerasService {
  constructor(
    @InjectRepository(Carrera)
    private carreraRepository: Repository<Carrera>,
  ) {}

  async createCarrera(createCarreraDto: CreateCarreraDto): Promise<Carrera> {
    const { area, ...carreraData } = createCarreraDto;
    const nuevaCarrera = this.carreraRepository.create({
      ...carreraData,
      area, // Asignando el área a la carrera
    });
    return this.carreraRepository.save(nuevaCarrera);
  }

  async getCarreras(): Promise<Carrera[]> {
    return this.carreraRepository.find({ relations: ['area'] });
  }

  async getCarreraById(id: number): Promise<Carrera> {
    const carrera = await this.carreraRepository.findOne({
      where: { id },
    });

    return carrera;
  }

  async deleteCarrera(id: number): Promise<Carrera> {
    const carrera = await await this.getCarreraById(id);

    if (!carrera) {
      throw new NotFoundException("Carrera No Existe");
    }
    await this.carreraRepository.delete(carrera);
    return carrera;
  }
  async editCarrera(id: number, payload: CreateCarreraDto): Promise<Carrera> {
    const carrera = await this.carreraRepository.preload({ id, ...payload });
    return await this.carreraRepository.save(carrera);
  }
}
