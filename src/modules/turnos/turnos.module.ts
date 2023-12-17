import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Turnos } from './entities/turnos.entity';
import { TurnosController } from './turnos.controller';
import { TurnosService } from './turnos.service';

@Module({
  imports: [TypeOrmModule.forFeature([Turnos])],
  controllers: [TurnosController],
  providers: [TurnosService],
})
export class TurnosModule {}
