import { Injectable } from '@nestjs/common';
;
import { UpdateInvoicingDto } from './dto/update-invoicing.dto';
import * as puppeteer from 'puppeteer';
import * as fs from 'fs';
import Invoice from './templates/invoice.template';
import { CreateInvoiceDto } from './dto/create-invoicing.dto';
import { InvoiceData } from './interfaces/invoice.interface';
import { PDF_OUTPUT_PATH } from '../../constants/constants.global';
@Injectable()
export class InvoicingService {
  create(createInvoicingDto: CreateInvoiceDto) {
    return 'This action adds a new invoicing';
  }
 async  generateInvoicePdf(invoiceData: InvoiceData): Promise<void> {

  const browser = await puppeteer.launch();

   const page = await browser.newPage();
    await page.setContent(Invoice(invoiceData), {
      waitUntil: 'networkidle0',
   });

   const pdf = await page.pdf({
      format: 'A4',
      printBackground: true,
   });

   fs.writeFileSync(PDF_OUTPUT_PATH, pdf);

   await browser.close();

 }
  findAll() {
    return `This action returns all invoicing`;
  }

  findOne(id: number) {
    return `This action returns a #${id} invoicing`;
  }

  update(id: number, updateInvoicingDto: UpdateInvoicingDto) {
    return `This action updates a #${id} invoicing`;
  }

  remove(id: number) {
    return `This action removes a #${id} invoicing`;
  }
}
