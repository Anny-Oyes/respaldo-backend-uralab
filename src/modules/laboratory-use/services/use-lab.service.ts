import { Injectable } from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import { Repository } from "typeorm";
import { LaboratoryUse } from "../entities/";
import { Docentes } from "src/modules/Docentes/entities/docentes.entity";
import { QueryParamsUsoLabsDto } from "../dto/query-params-usoLab.dto";

@Injectable()
export class UseLabService {
  constructor(
    @InjectRepository(LaboratoryUse)
    private readonly registerRepository: Repository<LaboratoryUse>
  ) { }


  async getUselab(query: QueryParamsUsoLabsDto): Promise<LaboratoryUse[]> {
    const rows = this.registerRepository.createQueryBuilder('labUse')
      .leftJoinAndSelect('labUse.carrera', 'carrera')
      .leftJoinAndSelect('carrera.area', 'area')
      .leftJoinAndSelect('labUse.modality', 'modality')
      .leftJoinAndSelect('labUse.laboratorio', 'laboratorio')
      .leftJoinAndSelect('labUse.docente', 'docente')
      .leftJoinAndSelect('labUse.className', 'className')
      .leftJoinAndSelect('labUse.shift', 'shift')
      .addSelect(`docente.nombre||' '||docente.apellido`, 'docente')
      .where('labUse.id <> 0');

    console.log(query);

    if (query.docente)
      rows.andWhere('labUse.docente = :docente', { docente: query.docente });

    if (query.is_active === 'true')
      rows.andWhere('labUse.is_active = :is_active', {
        is_active: true,
      });

    if (query.is_active === 'false')
      rows.andWhere('labUse.is_active = :is_active', {
        is_active: false,
      });

    rows.orderBy('labUse.id', 'ASC');

    const result = await rows.getMany();
    return result;

  }

  async findOne(id: any): Promise<LaboratoryUse> {
    {
      return await this.registerRepository

        .createQueryBuilder('labUse')
        .where('labUse.id = :id', { id })
        .leftJoinAndSelect('labUse.carrera', 'carrera')
        .leftJoinAndSelect('carrera.area', 'area')
        .leftJoinAndSelect('labUse.modality', 'modality')
        .leftJoinAndSelect('labUse.laboratorio', 'laboratorio')
        .leftJoinAndSelect('labUse.docente', 'docente')
        .leftJoinAndSelect('labUse.className', 'className')
        .leftJoinAndSelect('labUse.shift', 'shift')
        .getOne();
    }
  }

  async createUselab(LaboratoryUseDto) {
    const registerDetail = this.registerRepository.create(LaboratoryUseDto);
    await this.registerRepository.save(registerDetail);

    return registerDetail;
  }

  async deleteUselab(id: number): Promise<void> {
    await this.registerRepository.delete(id);
  }

  async update(id: number, LaboratoryUseDto) {
    const findRegister = await this.findOne(id);
    const updatedRegister = await this.registerRepository.merge(
      findRegister,
      LaboratoryUseDto,
    );

    return this.registerRepository.save(updatedRegister);
  }

}