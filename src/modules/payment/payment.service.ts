import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Payment } from './entities/payment.entity';
import { StripeService } from './stripe.service';
import { CreatePaymentDto } from './dto/create-payment.dto';
import { UpdatePaymentDto } from './dto/update-payment.dto';
import { OrdersService } from '../orders/service/orders.service';

import { OrderStatus } from '../orders/enum/order.enum';
import { UpdateOrderDto } from '../orders/dto/update-order.dto';
import { UpdateOrderStatusDto } from './dto/dto-update.dto';

@Injectable()
export class PaymentService {
  constructor(
    @InjectRepository(Payment)
    private readonly paymentRepository: Repository<Payment>,
    private readonly stripeService: StripeService,
    private readonly orderService: OrdersService,
  ) {}

  async create(createPaymentDto: CreatePaymentDto) {
    // Crear el registro de pago en la base de datos
    const payment = this.paymentRepository.create({
      order: { id: createPaymentDto.orderId },
      amount: createPaymentDto.amount,
      currency: createPaymentDto.currency || 'USD',
      provider: createPaymentDto.provider || 'stripe',
      status: 'pending',
    });
    const order = await this.orderService.findOne(createPaymentDto.orderId);

    if (!order) {
      throw new Error('Order not found');
    }
    const savedPayment = await this.paymentRepository.save(payment);

    // Crear payment intent en Stripe
    const paymentIntent = await this.stripeService.createPaymentIntent(
      createPaymentDto.amount,
      createPaymentDto.currency
    );
    const updateOrderDto: UpdateOrderStatusDto = { status: OrderStatus.PAID };
    const valorupdate = await this.orderService.update(createPaymentDto.orderId, updateOrderDto);

    return {
      payment: savedPayment,
      paymentIntent,
      message: 'Payment created successfully and order status updated to PAID',
      orderUpdate: valorupdate,
    };
  }

  async findAll() {
    return this.paymentRepository.find({
      relations: ['order'],
    });
  }

  async findOne(id: number) {
    return this.paymentRepository.findOne({
      where: { id },
      relations: ['order'],
    });
  }

  async update(id: number, updatePaymentDto: UpdatePaymentDto) {
    await this.paymentRepository.update(id, updatePaymentDto);
    return this.findOne(id);
  }

  //async remove(id: number) {
   // const payment = await this.findOne(id);
    //await this.paymentRepository.remove(payment);
  ////  return payment;
 // }

  // Métodos específicos de Stripe
  async createStripePaymentIntent(amount: number, currency: string = 'usd') {
    return this.stripeService.createPaymentIntent(amount, currency);
  }

  async confirmStripePayment(paymentIntentId: string) {
    const result = await this.stripeService.confirmPayment(paymentIntentId);

    // Actualizar el estado del pago en la base de datos si fue exitoso
    if (result.success) {
      // Aquí podrías buscar el pago por paymentIntentId y actualizar su status
      // Por ahora solo devolvemos el resultado
    }

    return result;
  }

  async createStripeCustomer(email: string, name: string) {
    return this.stripeService.createCustomer(email, name);
  }
  
}
