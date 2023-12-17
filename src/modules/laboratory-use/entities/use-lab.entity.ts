import { Asignatura } from 'src/modules/asignatura/entities/asignatura.entity';
import { Docentes } from 'src/modules/Docentes/entities/docentes.entity';
import { LabEntity } from 'src/modules/lab-register/entities';
import { Modalidades } from 'src/modules/modalidades/entities/modalidades-entities';
import { Carrera } from 'src/modules/registro-carreras/entities';
import { Turnos } from 'src/modules/turnos/entities/turnos.entity';
import { Entity, PrimaryGeneratedColumn, Column, OneToMany, JoinColumn, ManyToOne, DeleteDateColumn } from 'typeorm';
@Entity({ name: 'use_labs' })
export class LaboratoryUse {
    @PrimaryGeneratedColumn({ name: 'id', type: 'int4' })
    id?: number;

    @ManyToOne(() => Asignatura, (className) => className.nombre)
    className: Asignatura;

    @ManyToOne(() => Carrera, (carrera) => carrera.area)
    carrera: Carrera;

    @ManyToOne(() => Docentes, (docente) => docente.nombre && docente.apellido)
    docente: Docentes;

    @Column({ name: 'date', type: 'date', nullable: false })
    date: string;

    @ManyToOne(() => Modalidades, (modalidad) => modalidad.modalidad)
    modality: Modalidades;

    @ManyToOne(() => Turnos, (shift) => shift.name)
    shift: Turnos;

    @Column({ name: 'year', type: 'varchar', nullable: false })
    year: number;

    @Column({ name: 'semester', type: 'varchar', length: 50, nullable: false })
    semester: string;

    @Column({ name: 'female', type: 'numeric', nullable: false })
    female: number;

    @Column({ name: 'male', type: 'numeric', nullable: false })
    male: number;

    @Column({ name: 'total', type: 'numeric', nullable: false })
    total: number;

    @Column({ name: 'hours', type: 'int8', nullable: false })
    hours: number;

    @Column({
        name: 'is_active',
        type: 'boolean',
        nullable: false,
        default: true,
    })
    is_active: boolean;

    @DeleteDateColumn({ name: 'deleted_at', type: 'timestamp', nullable: true })
    delete_at: Date;

    @ManyToOne(() => LabEntity, (laboratorio) => laboratorio.laboratorio)
    laboratorio: LabEntity;
}