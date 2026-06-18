import { Module } from '@nestjs/common';
import { Category } from './entities/categories.entity';
import { TypeOrmModule } from '@nestjs/typeorm';

@Module({    imports:[ TypeOrmModule.forFeature([ Category]),],})
export class CategoriesModule {}
