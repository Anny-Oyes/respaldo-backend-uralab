import {
  Controller,
  Post,
  Body,
  Req,
  UseGuards,
  UnauthorizedException,
  Get,
  Delete,
  Param,
  Put,
} from '@nestjs/common';
import { ReservationsService } from './reservations.service';
import { CreateReservationDto } from './dto/create-reservation.dto';
import { UpdateReservationDto } from './dto/update-reservation.dto';
import { Shift } from './dto/create-reservation.dto';
import { JwtAuthGuard } from '../auth/guards/jwt.guard';

@Controller('reservations')
export class ReservationsController {
  constructor(private readonly reservationService: ReservationsService) {}

  @UseGuards(JwtAuthGuard)
  @Post()
  async create(@Body() createReservationDto: CreateReservationDto, @Req() req) {
    try {
      const user = req.user;
      if (!user || !user.id) {
        throw new UnauthorizedException('Usuario no autenticado');
      }

      // Agrega aquí la lógica para obtener la ID de la carrera, por ejemplo, desde el DTO o cualquier otra fuente
      const carreraId = createReservationDto.careerId; // Asumiendo que está en el DTO, ajusta esto según tu DTO

      const reservation = await this.reservationService.createReservation(
        createReservationDto,
        Shift.morning,
        user.id,
        carreraId, // Pasa la ID de la carrera
      );

      return { success: true, data: reservation };
    } catch (error) {
      return {
        success: false,
        message: error instanceof Error ? error.message : 'Error desconocido',
      };
    }
  }

  @Get(':id')
  async findOne(@Param('id') id: number) {
    try {
      const reservation = await this.reservationService.getReservationById(id);
      return { success: true, data: reservation };
    } catch (error) {
      return {
        success: false,
        message: error instanceof Error ? error.message : 'Error desconocido',
      };
    }
  }

  @Put(':id')
  async update(
    @Param('id') id: number,
    @Body() updateReservationDto: UpdateReservationDto,
  ) {
    try {
      const reservation = await this.reservationService.updateReservation(
        id,
        updateReservationDto,
      );
      return { success: true, data: reservation };
    } catch (error) {
      return {
        success: false,
        message: error instanceof Error ? error.message : 'Error desconocido',
      };
    }
  }

  @Delete(':id')
  async remove(@Param('id') id: number) {
    try {
      await this.reservationService.deleteReservation(id);
      return { success: true, message: 'La reserva ha sido eliminada' };
    } catch (error) {
      return {
        success: false,
        message: error instanceof Error ? error.message : 'Error desconocido',
      };
    }
  }

  @Get()
  async getAllReservations() {
    try {
      const reservations = await this.reservationService.getAllReservations();
      return { success: true, data: reservations };
    } catch (error) {
      return {
        success: false,
        message: error instanceof Error ? error.message : 'Error desconocido',
      };
    }
  }
}
