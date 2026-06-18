import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ProductSize } from './entities/product-size.entity';
import { ProductSizeController } from './product-size.controller';
import { ProductSizeService } from './product-size.service';

@Module({
  imports: [TypeOrmModule.forFeature([ProductSize])],
  controllers: [ProductSizeController],
  providers: [ProductSizeService],
  exports: [ProductSizeService],
})
export class ProductSizeModule {}
