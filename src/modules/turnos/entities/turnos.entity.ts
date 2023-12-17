import { LaboratoryUse } from 'src/modules/laboratory-use/entities';
import { Column, Entity, OneToMany, PrimaryGeneratedColumn } from 'typeorm';

@Entity('turnos')
export class Turnos {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ unique: true })
  name: string;

  @OneToMany(() => LaboratoryUse, (laboratoryUse) => laboratoryUse.shift)
  laboratoryUse: LaboratoryUse[];
  
  shift: Turnos[];

}
