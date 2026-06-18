import { Module } from '@nestjs/common';

import { TypeOrmModule } from '@nestjs/typeorm';
import { ProductSize } from './entities/product-size.entity';

@Module({imports:[ TypeOrmModule.forFeature([ ProductSize]),]})
export class ProductSizeModule {}
