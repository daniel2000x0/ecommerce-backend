import { IsInt, IsNotEmpty } from "class-validator";
import { CreateShoppingCartDto } from "./create-shopping-cart.dto";

export class ItemShoppingCartDto {
   
    @IsInt()
    @IsNotEmpty()
    product!: number;
    @IsInt()
    @IsNotEmpty()
     quantity!: number;
}