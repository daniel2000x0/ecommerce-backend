import { Controller, Get, Post, Body, Patch, Param, Delete } from '@nestjs/common';
import { InvoicingService } from './invoicing.service';

import { UpdateInvoicingDto } from './dto/update-invoicing.dto';
import { CreateInvoiceDto } from './dto/create-invoicing.dto';

@Controller('invoicing')
export class InvoicingController {
  constructor(private readonly invoicingService: InvoicingService) {}

  @Post()
  create(@Body() createInvoiceDto: CreateInvoiceDto) {
    return this.invoicingService.create(createInvoiceDto);
  }

  @Get()
  findAll() {
    return this.invoicingService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.invoicingService.findOne(+id);
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() updateInvoicingDto: UpdateInvoicingDto) {
    return this.invoicingService.update(+id, updateInvoicingDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.invoicingService.remove(+id);
  }
}
