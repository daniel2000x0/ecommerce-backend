import { Controller, Get, Post, Body, Patch, Param, Delete } from '@nestjs/common';
import { PaymentService } from './payment.service';
import { CreatePaymentDto } from './dto/create-payment.dto';
import { UpdatePaymentDto } from './dto/update-payment.dto';

@Controller('payment')
export class PaymentController {
  constructor(private readonly paymentService: PaymentService) {}

  @Post()
  create(@Body() createPaymentDto: CreatePaymentDto) {
    return this.paymentService.create(createPaymentDto);
  }

  @Get()
  findAll() {
    return this.paymentService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.paymentService.findOne(+id);
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() updatePaymentDto: UpdatePaymentDto) {
    return this.paymentService.update(+id, updatePaymentDto);
  }

  //@Delete(':id')
 // remove(@Param('id') id: string) {
  //  return this.paymentService.remove(+id);
 //// }

  // Endpoints específicos de Stripe
  @Post('stripe/create-intent')
  async createStripePaymentIntent(@Body() body: { amount: number; currency?: string }) {
    const { amount, currency = 'usd' } = body;
    return this.paymentService.createStripePaymentIntent(amount, currency);
  }

  @Post('stripe/confirm/:paymentIntentId')
  async confirmStripePayment(@Param('paymentIntentId') paymentIntentId: string) {
    return this.paymentService.confirmStripePayment(paymentIntentId);
  }

  @Post('stripe/customer')
  async createStripeCustomer(@Body() body: { email: string; name: string }) {
    const { email, name } = body;
    return this.paymentService.createStripeCustomer(email, name);
  }

  @Get('stripe/health')
  async stripeHealthCheck() {
    return { status: 'Stripe service is running', timestamp: new Date() };
  }


}
