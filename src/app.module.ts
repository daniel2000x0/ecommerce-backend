import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';


import { ShoppingCartModule } from './modules/shopping-cart/shopping-cart.module';
import { UsersModule } from './modules/users/users.module';
import { UsersRolesModule } from './modules/users-roles/users-roles.module';
import { RolesModule } from './modules/roles/roles.module';
import { PaymentModule } from './modules/payment/payment.module';
import { OrdersModule } from './modules/orders/orders.module';
import { OrdersDetailsModule } from './modules/orders-details/orders-details.module';
import { ProductsModule } from './modules/products/products.module';

import { AuthModule } from './modules/auth/auth.module';
import { InvoicingModule } from './modules/invoicing/invoicing.module';

import { DatabaseModule } from './database/database.module';
import { CustomerModule } from './modules/customer/customer.module';

import { ConfigModule } from '@nestjs/config';
import { CategoriesModule } from './modules/categories/categories.module';
import { CategoriesKindModule } from './modules/categories-kind/categories-kind.module';
import { ColorModule } from './modules/color/color.module';
import { CountryModule } from './modules/country/country.module';
import { GenderModule } from './modules/gender/gender.module';
import { ManufacturesModule } from './modules/manufactures/manufactures.module';
import { ProductColorModule } from './modules/product-color/product-color.module';
import { ProductImageModule } from './modules/product-image/product-image.module';
import { ProductSizeModule } from './modules/product-size/product-size.module';
import { SizeModule } from './modules/size/size.module';
import { MailModule } from './modules/mail/mail.module';
import config  from './config/index'
@Module({
  imports: [
        ConfigModule.forRoot({
      isGlobal: true,
      load: config,
       envFilePath: '.env', 
    }),
     DatabaseModule, CustomerModule, ShoppingCartModule, UsersModule, UsersRolesModule, RolesModule, PaymentModule, OrdersModule, OrdersDetailsModule, ProductsModule, AuthModule, InvoicingModule, CategoriesModule, CategoriesKindModule, ColorModule, CountryModule, GenderModule, ManufacturesModule, ProductColorModule, ProductImageModule, ProductSizeModule, SizeModule, MailModule],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
