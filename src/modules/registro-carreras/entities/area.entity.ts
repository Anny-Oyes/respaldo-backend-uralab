import { Entity, PrimaryGeneratedColumn, Column, OneToMany, ManyToOne, JoinColumn } from 'typeorm';
import { Carrera } from './carrera.entity';
import { LaboratoryUse } from 'src/modules/laboratory-use/entities';

@Entity()
export class Area {
  @PrimaryGeneratedColumn({ name: 'id', type: 'int4' })
  id?: number;

  @Column({ name: 'name', type: 'varchar', length: 50, nullable: false })
  nombre: string;

  @OneToMany(() => Carrera, (carrera) => carrera.area)
  carreras: Carrera[];

  area: Area[];

}
