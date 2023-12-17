import { PartialType } from '@nestjs/mapped-types';
import { CreateTurnosDto } from './create-turnos.dto';

export class UpdateTurnosDto extends PartialType(CreateTurnosDto) {}
