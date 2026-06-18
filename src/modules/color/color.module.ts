import { Module } from '@nestjs/common';
import { Color } from './entities/color.entity';
import { TypeOrmModule } from '@nestjs/typeorm';

@Module({imports:[ TypeOrmModule.forFeature([ Color]),]})
export class ColorModule {}
