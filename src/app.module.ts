import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { RegistroDocentesModule } from './modules/Docentes/docentes.module';
import { RegistroAsignatureModule } from './modules/asignatura/asignatura.module';
import { AuthModule } from './modules/auth/auth.module';
import { CatalogosModule } from './modules/catalogos/catalogos.module';
import { DatabaseModule } from './modules/database/database.module';
import { HorasPracticasModule } from './modules/horas-practicas/horas-practicas.module';
import { LabRegisterModule } from './modules/lab-register/lab.module';
import { UseLabModule } from './modules/laboratory-use/laboratory-use.module';
import { ModalidadesModule } from './modules/modalidades/modalidades.module';
import { RegistroCarrerasModule } from './modules/registro-carreras/registro-carreras.module';
import { ReservationsModule } from './modules/reservations/reservations.module';
import { TurnosModule } from './modules/turnos/turnos.module';

@Module({
  imports: [
    ConfigModule.forRoot({
      envFilePath: '.env',
      isGlobal: true,
    }),
    DatabaseModule,
    HorasPracticasModule,
    ModalidadesModule,
    AuthModule,
    RegistroCarrerasModule,
    LabRegisterModule,
    ReservationsModule,
    UseLabModule,
    ModalidadesModule,
    CatalogosModule,
    TurnosModule,
    RegistroDocentesModule,
    RegistroAsignatureModule,
  ],
  controllers: [AppController],
  providers: [
    // {
    //   provide: APP_GUARD,
    //   useClass: ValidarApiKeyGuard,
    // },
    AppService,
  ],
})
export class AppModule {}
