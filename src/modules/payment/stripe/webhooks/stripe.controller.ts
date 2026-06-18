import { Controller, Post, Req } from "@nestjs/common";
import { StripeService } from "../stripe.service";
@Controller()
export class StripeController {
    constructor(private readonly stripeService:StripeService){}
        @Post('stripe/webhook')
  async stripeWebhook(@Req() req: Request) {

    return this.stripeService.handleWebhook(req);
  }
}