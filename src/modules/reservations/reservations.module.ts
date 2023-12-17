import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ReservationsController } from './reservations.controller';
import { ReservationsService } from './reservations.service';
import { Reservation } from './entities/reservation.entity';
import { LabRegisterModule } from '../lab-register/lab.module';
import { LabEntity } from '../lab-register/entities';
import { LabRegisterService } from '../lab-register/services';
import { UsersService } from '../auth/services';
import { User } from '../auth/entities';
import { AuthModule } from '../auth/auth.module';
import { Carrera } from '../registro-carreras/entities';
import { RegistroCarrerasModule } from '../registro-carreras/registro-carreras.module';
import { RegistroAreaService } from '../registro-carreras/services/registro-areas.service';
import { RegistroCarrerasService } from '../registro-carreras/services/registro-carrera.service';

@Module({
  imports: [
    TypeOrmModule.forFeature([Reservation, LabEntity, User, Carrera]),
    LabRegisterModule,
    AuthModule,
    RegistroCarrerasModule,
  ],
  controllers: [ReservationsController],
  providers: [
    ReservationsService,
    LabRegisterService,
    UsersService,
    RegistroCarrerasService,
  ],
})
export class ReservationsModule {}
