import { IsEnum } from 'class-validator';
import { OrderStatus } from '../../orders/enum/order.enum';


export class UpdateOrderStatusDto {

  @IsEnum(OrderStatus)
  status!: OrderStatus;

}