import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { LabEntity } from '../lab-register/entities';
import { LabRegisterService } from '../lab-register/services';
import { LabRegisterController } from '../lab-register/controller';

@Module({
    imports: [TypeOrmModule.forFeature([LabEntity])],
    controllers: [LabRegisterController],
    providers: [LabRegisterService],
})
export class LabRegisterModule {}
