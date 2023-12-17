import { Entity, PrimaryGeneratedColumn, Column, ManyToOne, JoinColumn, OneToMany } from 'typeorm';
import { Area } from './area.entity';
import { LaboratoryUse } from 'src/modules/laboratory-use/entities';
import { Reservation } from 'src/modules/reservations/entities/reservation.entity';
import { Practicante } from 'src/modules/horas-practicas/entities/practicante.entity';


@Entity({name: 'carrera'})
export class Carrera {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  nombre: string;

  @ManyToOne(() => Area, (area) => area.carreras)
  area: Area;


  carerra: Carrera[];

  @OneToMany(() => Reservation, (reservation) => reservation.carrera)
  reservaciones: Reservation[]

  @OneToMany(() => LaboratoryUse, (laboratoryUse) => laboratoryUse.carrera)
  laboratoryUse: LaboratoryUse[];
  carrera: Carrera[];

  @OneToMany(() => Practicante, (practicante) => practicante.carrera)
  practicantes: Practicante[];
}
