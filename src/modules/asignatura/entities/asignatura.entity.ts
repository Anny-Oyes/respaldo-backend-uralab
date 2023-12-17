import { LaboratoryUse } from 'src/modules/laboratory-use/entities';
import { Entity, PrimaryGeneratedColumn, Column, OneToMany } from 'typeorm';

@Entity()
export class Asignatura {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  nombre: string;

  @OneToMany(() => LaboratoryUse, (laboratoryUse) => laboratoryUse.className)
  laboratoryUse: LaboratoryUse[];

}
