import { LaboratoryUse } from 'src/modules/laboratory-use/entities';
import { Entity, PrimaryGeneratedColumn, Column, OneToMany } from 'typeorm';

@Entity()
export class Docentes {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  nombre: string;

  @Column()
  apellido: string;

  @Column()
  fechaNacimiento: string;

  @OneToMany(() => LaboratoryUse, (laboratoryUse) => laboratoryUse.docente)
  laboratoryUse: LaboratoryUse[];

  docente: Docentes[];
}
