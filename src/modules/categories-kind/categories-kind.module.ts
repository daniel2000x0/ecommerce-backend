import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { CategoriesKindController } from './categories-kind.controller';
import { CategoriesKindService } from './categories-kind.service';
import { CategoryKind } from './entities/categories-kind.entity';

@Module({
  imports: [TypeOrmModule.forFeature([CategoryKind])],
  controllers: [CategoriesKindController],
  providers: [CategoriesKindService],
  exports: [CategoriesKindService],
})
export class CategoriesKindModule {}
