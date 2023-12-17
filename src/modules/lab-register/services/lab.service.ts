import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { LabDto } from '../dto';
import { LabEntity } from '../entities';

@Injectable()
export class LabRegisterService {
  constructor(
    @InjectRepository(LabEntity)
    private readonly labRepoService: Repository<LabEntity>,
  ) {}

  async findAll() {
    return await this.labRepoService.find();
  }

  async findOneLab(id: number) {
    return await this.labRepoService.findOneBy({ id });
  }

  async create(payload: LabDto) {
    const createLab = this.labRepoService.create(payload);
    return await this.labRepoService.save(createLab);
  }

  async update(id: number, payload: LabDto) {
    const findLab = await this.findOneLab(id);
    const updateLab = await this.labRepoService.merge(
      findLab,
      payload,
    );

    return this.labRepoService.save(updateLab);
  }
  async remove(id: number) {
    const deleLab = await this.findOneLab(id);
    await this.labRepoService.remove(deleLab);
    return 'El registro se ha eliminado';
  }
}
