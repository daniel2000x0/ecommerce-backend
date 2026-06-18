import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ProductColor } from './entities/product-color.entity';
import { ProductColorController } from './product-color.controller';
import { ProductColorService } from './product-color.service';

@Module({
  imports: [TypeOrmModule.forFeature([ProductColor])],
  controllers: [ProductColorController],
  providers: [ProductColorService],
  exports: [ProductColorService],
})
export class ProductColorModule {}
