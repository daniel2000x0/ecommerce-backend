import { PartialType } from '@nestjs/mapped-types';
import { CreateInvoiceDto } from './create-invoicing.dto';


export class UpdateInvoicingDto extends PartialType(CreateInvoiceDto) {}
