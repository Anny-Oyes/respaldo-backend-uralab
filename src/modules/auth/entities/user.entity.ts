import {
  Column,
  Entity,
  JoinTable,
  ManyToMany,
  OneToMany,
  PrimaryGeneratedColumn,
} from 'typeorm';
import { Role } from './roles.entity';
import { Reservation } from 'src/modules/reservations/entities/reservation.entity';

@Entity({ name: 'users' })
export class User {
  @PrimaryGeneratedColumn({ name: 'id', type: 'int4' })
  id?: number;
  @Column({ name: 'name', type: 'varchar', length: 100, nullable: false })
  name: string;

  @Column({
    name: 'email',
    type: 'varchar',
    length: 100,
    nullable: false,
    unique: true,
  })
  email: string;
  @Column({
    name: 'password',
    type: 'varchar',
    length: 100,
    nullable: false,
    select: false,
  })
  password: string;
  @Column({ name: 'telefono', type: 'varchar', length: 20, nullable: true })
  telefono: string;
  @Column({ name: 'token', type: 'varchar', length: 200, nullable: true })
  token: string;
  @Column({
    name: 'is_active',
    type: 'boolean',
    nullable: false,
    default: true,
  })
  isActive: boolean;

  @OneToMany(() => Reservation, (reservation) => reservation.userId)
  reservations: Reservation[];

  @ManyToMany(() => Role, (role) => role.users)
  @JoinTable({
    name: 'user_has_roles',
    joinColumn: {
      name: 'user_id',
      referencedColumnName: 'id',
      foreignKeyConstraintName: 'fk_user_id',
    },
    inverseJoinColumn: {
      name: 'role_id',
      referencedColumnName: 'id',
      foreignKeyConstraintName: 'fk_role_id',
    },
  })
  roles: Role[];
}
