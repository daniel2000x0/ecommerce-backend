import { IsArray, IsInt, IsNotEmpty, ValidateIf, ValidateNested } from "class-validator";
import { ItemShoppingCartDto } from "./item-shopping-cart.dto";
import { Type } from "class-transformer";

export class CreateShoppingCartDto {
    @IsInt()
    @IsNotEmpty()
    customer_id!: number;
    @IsArray()
    @ValidateNested({each: true})
    @Type(() => ItemShoppingCartDto)
    product_ids!: ItemShoppingCartDto[];
}
