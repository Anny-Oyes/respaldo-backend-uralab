import {
  Injectable,
  NotFoundException,
  BadRequestException,
} from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Reservation } from './entities/reservation.entity';
import { CreateReservationDto } from './dto/create-reservation.dto';
import { Shift } from './dto/create-reservation.dto';
import { UpdateReservationDto } from './dto/update-reservation.dto';
import { User } from '../auth/entities/user.entity';
import { JwtService } from '@nestjs/jwt';
import { LabEntity } from '../lab-register/entities';
import { Carrera } from '../registro-carreras/entities';

@Injectable()
export class ReservationsService {
  constructor(
    @InjectRepository(Reservation)
    private readonly reservationRepository: Repository<Reservation>,
    @InjectRepository(LabEntity)
    private readonly labRepository: Repository<LabEntity>,
    @InjectRepository(User)
    private readonly userRepository: Repository<User>,
    @InjectRepository(Carrera) // Repositorio de Carreras
    private readonly carreraRepository: Repository<Carrera>,
  ) {}

  async createReservation(
    createReservationDto: CreateReservationDto,
    shift: Shift,
    userId: number,
    carreraId: number,
  ): Promise<Reservation> {
    const reservationDate = new Date(createReservationDto.date);

    // Validar que la fecha sea superior a la fecha actual
    if (reservationDate <= new Date()) {
      throw new BadRequestException(
        'La fecha debe ser superior a la fecha actual',
      );
    }

    // Validar que la hora de inicio sea inferior a la hora de finalización
    if (createReservationDto.startTime >= createReservationDto.endTime) {
      throw new BadRequestException(
        'La hora de inicio debe ser inferior a la hora de finalización',
      );
    }

    // Obtener una instancia de LabEntity basada en el ID proporcionado
    const lab = await this.labRepository.findOne({
      where: { id: createReservationDto.laboratoryId },
    });

    if (!lab) {
      throw new NotFoundException('Laboratorio no encontrado');
    }

    // Obtener una instancia de User basada en el ID del usuario
    const user = await this.userRepository.findOne({ where: { id: userId } });

    if (!user) {
      throw new NotFoundException('Usuario no encontrado');
    }

    // Obtener una instancia de Carrera basada en el ID de la Carrera
    const carrera = await this.carreraRepository.findOne({
      where: { id: carreraId },
    });

    if (!carrera) {
      throw new NotFoundException('Carrera no encontrada');
    }

    // Crear una nueva reserva
    const reservation = new Reservation();
    reservation.laboratory = lab;
    reservation.date = reservationDate;
    reservation.startTime = createReservationDto.startTime;
    reservation.endTime = createReservationDto.endTime;
    reservation.userId = user;
    reservation.shift = shift;
    reservation.carrera = carrera; // Asigna la Carrera a la reserva

    // Guardar la reserva en la base de datos
    return this.reservationRepository.save(reservation);
  }

  async getReservationById(id: number): Promise<Reservation> {
    const reservation = await this.reservationRepository
      .createQueryBuilder('reservation')
      .leftJoinAndSelect('reservation.laboratory', 'laboratory')
      .leftJoinAndSelect('reservation.userId', 'userId')
      .leftJoinAndSelect('reservation.carrera', 'carrera') // Incluye la relación con Carrera
      .where('reservation.id = :id', { id })
      .getOne();

    if (!reservation) {
      throw new NotFoundException('Reserva no encontrada');
    }

    return reservation;
  }

  async updateReservation(
    id: number,
    updateReservationDto: UpdateReservationDto,
  ): Promise<Reservation> {
    const reservation = await this.reservationRepository.findOne({
      where: { id: id },
    });

    if (!reservation) {
      throw new NotFoundException('Reserva no encontrada');
    }

    if (updateReservationDto.date) {
      reservation.date = new Date(updateReservationDto.date);
    }
    if (updateReservationDto.startTime) {
      reservation.startTime = updateReservationDto.startTime;
    }
    if (updateReservationDto.endTime) {
      reservation.endTime = updateReservationDto.endTime;
    }

    return this.reservationRepository.save(reservation);
  }

  async deleteReservation(id: number): Promise<void> {
    const reservation = await this.reservationRepository.findOne({
      where: { id: id },
    });

    if (!reservation) {
      throw new NotFoundException('Reserva no encontrada');
    }

    await this.reservationRepository.remove(reservation);
  }

  async getAllReservations(): Promise<Reservation[]> {
    return this.reservationRepository.find({
      relations: ['laboratory', 'userId', 'carrera'], // Incluye la relación con Carrera
    });
  }
}
