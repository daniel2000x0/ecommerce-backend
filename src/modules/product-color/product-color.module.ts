import { Module } from '@nestjs/common';

import { TypeOrmModule } from '@nestjs/typeorm';
import { ProductColor } from './entities/product-color.entity';

@Module({imports:[ TypeOrmModule.forFeature([ ProductColor]),]})
export class ProductColorModule {}
