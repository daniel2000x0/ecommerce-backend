import {
  IsArray,
  IsEmail,
  IsNumber,
  IsString,
  ValidateNested,
} from 'class-validator';

import { Type } from 'class-transformer';

class InvoiceItemDto {

   @IsString()
   name!: string;

   @IsNumber()
   quantity!: number;

   @IsNumber()
   priceUnit!: number;
}

export class CreateInvoiceDto {

   @IsString()
   customerName!: string;

   @IsEmail()
   customerEmail!: string;

   @IsArray()
   @ValidateNested({ each: true })
   @Type(() => InvoiceItemDto)
   products!: InvoiceItemDto[];

   @IsNumber()
   subtotal!: number;

   @IsNumber()
   iva!: number;

   @IsNumber()
   total!: number;
}