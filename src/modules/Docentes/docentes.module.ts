import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Docentes } from './entities/docentes.entity';
import { RegistroDocenteController } from './controller/docentes.controller';
import { RegistroDocentesService } from './services/docentes.service';

@Module({
  imports: [TypeOrmModule.forFeature([Docentes])],
  controllers: [RegistroDocenteController],
  providers: [RegistroDocentesService],
})
export class RegistroDocentesModule {}
