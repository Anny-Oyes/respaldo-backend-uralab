import {
  IsDateString,
  IsEnum,
  IsNotEmpty,
  IsNumber,
  IsString,
  Validate,
} from 'class-validator';
import { FutureDateValidator } from '../validators/future-date.validator';

// Enum para el turno
export enum Shift {
  morning = 'morning',
  afternoon = 'afternoon',
  night = 'night',
}

export class CreateReservationDto {
  // Puedes omitir temporalmente los campos userId, courseId y groupId

  @IsDateString()
  @IsNotEmpty()
  @Validate(FutureDateValidator, {
    message: 'La fecha debe ser futura.',
  })
  date: string;

  @IsEnum(Shift, { message: 'El turno debe ser morning, afternoon o night.' })
  @IsNotEmpty()
  shift: Shift;

  @IsNotEmpty({ message: 'La hora de inicio es obligatoria' })
  @IsString({ message: 'La hora de inicio debe ser una cadena' })
  startTime: string;

  @IsNotEmpty({ message: 'La hora de finalización es obligatoria' })
  @IsString({ message: 'La hora de finalización debe ser una cadena' })
  endTime: string;

  @IsNotEmpty()
  @IsNumber()
  laboratoryId: number;

  @IsNotEmpty()
  @IsNumber()
  userId: number;

  @IsNotEmpty()
  @IsNumber()
  careerId: number;
}
