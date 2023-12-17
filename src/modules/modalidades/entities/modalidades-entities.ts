import { LaboratoryUse } from 'src/modules/laboratory-use/entities';
import { Column, Entity, OneToMany, PrimaryGeneratedColumn } from 'typeorm';

@Entity({ name: 'modalidades' })
export class Modalidades {
  @PrimaryGeneratedColumn({
    name: 'id',
    type: 'int4',
  })
  id?: number;

  @Column({
    name: 'modalidades',
    type: 'varchar',
    nullable: false,
    length: 50,
  })
  modalidad: string;


  @Column({
    name: 'is_active',
    type: 'boolean',
    nullable: false,
    default: true,
  })
  isActive: boolean;

  @Column({
    name: 'deleted_at',
    type: 'timestamp',
    nullable: true,
  })
  delete_at: Date;

  @OneToMany(() => LaboratoryUse, (laboratoryUse) => laboratoryUse.modality)
  laboratoryUse: LaboratoryUse[];

  modality: Modalidades[];
}
