import { Module } from '@nestjs/common';
import { Gender } from './entities/gender.entity';
import { TypeOrmModule } from '@nestjs/typeorm';

@Module({ imports:[TypeOrmModule.forFeature([Gender]),], })
export class GenderModule {}
