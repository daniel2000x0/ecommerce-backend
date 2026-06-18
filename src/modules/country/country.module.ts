import { Module } from '@nestjs/common';
import { Country } from './entities/country.entity';
import { TypeOrmModule } from '@nestjs/typeorm';

@Module({imports:[ TypeOrmModule.forFeature([ Country]),]})
export class CountryModule {}
