import { Module } from '@nestjs/common';

import { ProductsController } from './products.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Manufacture } from '../manufactures/entities/manufactures.entity';

import { User } from '../users/entities/user.entity';

import { Product } from './entities/product.entity';
import { Category } from '../categories/entities/categories.entity';
import { ProductsService } from './service/products.service';
import { Size } from '../size/entities/size.entity';
import { OrderDetail } from '../orders-details/entities/orders-detail.entity';
import { ProductSize } from '../product-size/entities/product-size.entity';
import { ProductColor } from '../product-color/entities/product-color.entity';
import { ProductImage } from '../product-image/entities/product-image.entity';

@Module({
  imports:[TypeOrmModule.forFeature([ Manufacture,
      ProductImage,
      ProductColor,
      ProductSize,
      User,
      OrderDetail,
      Product,
      Category,
    Size])],
  controllers: [ProductsController],
  providers: [ProductsService],
  exports: [ProductsService]
})
export class ProductsModule {}
