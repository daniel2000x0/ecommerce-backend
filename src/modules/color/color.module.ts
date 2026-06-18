import { Module } from '@nestjs/common';
import { Color } from './entities/color.entity';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ColorController } from './color.controller';
import { ColorService } from './color.service';

@Module({
  imports: [TypeOrmModule.forFeature([Color])],
  controllers: [ColorController],
  providers: [ColorService],
  exports: [ColorService],
})
export class ColorModule {}
