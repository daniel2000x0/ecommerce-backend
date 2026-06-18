import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';

import { Category } from '../categories/entities/categories.entity';
import { CategoryKind } from './entities/categories-kind.entity';

@Module({
    imports:[ TypeOrmModule.forFeature([ CategoryKind]),],
})
export class CategoriesKindModule {}
