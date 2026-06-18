import {
  IsInt,
  IsNotEmpty,
  IsNumber,
  IsOptional,
  Min,
  Max,
} from 'class-validator';

export class OrdersDetailDto {
  @IsInt()
  @IsNotEmpty()
  productid!: number;
  //@IsInt()
  //@IsNotEmpty()
  //orderid?: number;
  @IsInt()
  @Min(1)
  @IsNotEmpty()
  quantity!: number;

  @IsNumber({ maxDecimalPlaces: 2 })
  @IsNotEmpty()
  unitprice!: number;

  @IsOptional()
  @IsInt()
  @Min(0)
  @Max(100)
  discount?: number;
}