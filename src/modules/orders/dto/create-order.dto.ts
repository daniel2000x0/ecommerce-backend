import { ArrayMinSize, IsArray, IsInt, IsNotEmpty, IsOptional, IsString, ValidateNested } from "class-validator";
import { OrdersDetailDto } from "../../orders-details/dto/order-detail.dto";
import { Type } from "class-transformer";
import { OrderStatus } from "../enum/order.enum";

export class CreateOrderDto {
    @IsInt()
    @IsNotEmpty()
    customer_id!: number;

    @IsInt()
    @IsNotEmpty()
    country_id!: number;

    @IsString()
    @IsNotEmpty()
    city!: string;

    @IsString()
    @IsNotEmpty()
    region!: string;

    @IsString()
    @IsNotEmpty()
    address!: string;

    @IsString()
    @IsOptional()
    phone?: string;
    

    @IsString()
    @IsNotEmpty()
    status!: OrderStatus;
    @IsArray()
    @ValidateNested({ each: true })
    @ArrayMinSize(1)
    @Type(() => OrdersDetailDto)
    orderDetails!: OrdersDetailDto[];
}
