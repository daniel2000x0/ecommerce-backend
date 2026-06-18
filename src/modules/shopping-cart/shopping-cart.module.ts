import { Module } from '@nestjs/common';
import { ShoppingCartService } from './shopping-cart.service';
import { ShoppingCartController } from './shopping-cart.controller';
import { ShoppingCart } from './entities/shopping-cart.entity';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ShoppingCartItem } from './entities/shopping-cart-item.entity';

@Module({
  imports: [TypeOrmModule.forFeature([ShoppingCart,ShoppingCartItem ])], 
  controllers: [ShoppingCartController],
  providers: [ShoppingCartService],
  exports: [TypeOrmModule], 
})
export class ShoppingCartModule {}
