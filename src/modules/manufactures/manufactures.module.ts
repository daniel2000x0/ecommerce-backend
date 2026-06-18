import { Module } from '@nestjs/common';
import { Manufacture } from './entities/manufactures.entity';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ManufacturesController } from './manufactures.controller';
import { ManufacturesService } from './manufactures.service';

@Module({
  imports: [TypeOrmModule.forFeature([Manufacture])],
  controllers: [ManufacturesController],
  providers: [ManufacturesService],
  exports: [ManufacturesService],
})
export class ManufacturesModule {}
