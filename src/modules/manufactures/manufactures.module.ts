import { Module } from '@nestjs/common';
import { Manufacture } from './entities/manufactures.entity';
import { TypeOrmModule } from '@nestjs/typeorm';

@Module({imports:[ TypeOrmModule.forFeature([ Manufacture]),]})
export class ManufacturesModule {}
