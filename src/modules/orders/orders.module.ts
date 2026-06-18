import { Module } from '@nestjs/common';
import { OrdersService } from './service/orders.service';
import { OrdersController } from './orders.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Order } from './entities/order.entity';

import { Customer } from '../customer/entities/customer.entity';
import { Country } from '../country/entities/country.entity';
import { OrderDetail } from '../orders-details/entities/orders-detail.entity';

@Module({
  imports:[TypeOrmModule.forFeature([Order,OrderDetail,Customer, Country ])],

  controllers: [OrdersController],
  providers: [OrdersService],
  exports: [OrdersService],
})
export class OrdersModule {}
