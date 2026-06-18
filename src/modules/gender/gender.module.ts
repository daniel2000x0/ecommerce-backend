import { Module } from '@nestjs/common';
import { Gender } from './entities/gender.entity';
import { TypeOrmModule } from '@nestjs/typeorm';
import { GenderController } from './gender.controller';
import { GenderService } from './gender.service';

@Module({
  imports: [TypeOrmModule.forFeature([Gender])],
  controllers: [GenderController],
  providers: [GenderService],
  exports: [GenderService],
})
export class GenderModule {}
