import { Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';

const Stripe = require('stripe');

@Injectable()
export class StripeService {
  private stripe: any;

  constructor(private configService: ConfigService) {
    this.stripe = new Stripe(
      this.configService.get<string>('STRIPE_SECRET_KEY'),
      { apiVersion: '2024-04-10' }
    );
  }

  async createPaymentIntent(amount: number, currency: string = 'usd') {
    try {
      const paymentIntent = await this.stripe.paymentIntents.create({
        amount: Math.round(amount * 100), // Stripe usa centavos
        currency,
        payment_method_types: ['card'],
      });

      return {
        clientSecret: paymentIntent.client_secret,
        paymentIntentId: paymentIntent.id,
      };
    } catch (error) {
      throw new Error(`Error creating payment intent: ${error}`);
    }
  }

  async confirmPayment(paymentIntentId: string) {
    try {
      const paymentIntent = await this.stripe.paymentIntents.retrieve(paymentIntentId);

      if (paymentIntent.status === 'succeeded') {
        return { success: true, paymentIntent };
      } else {
        return { success: false, status: paymentIntent.status };
      }
    } catch (error) {
      throw new Error(`Error confirming payment: ${error}`);
    }
  }

  async createCustomer(email: string, name: string) {
    try {
      const customer = await this.stripe.customers.create({
        email,
        name,
      });

      return customer;
    } catch (error) {
      throw new Error(`Error creating customer: ${error}`);
    }
  }
  
  async handleWebhook(event: any) {

  switch (event.type) {

    case 'payment_intent.succeeded':

      const paymentIntent = event.data.object;

      console.log('Pago exitoso');

      break;

    case 'payment_intent.payment_failed':

      console.log('Pago fallido');

      break;
  }
}
}
