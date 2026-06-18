import { Button, Html } from '@react-email/components';
import * as React from 'react';
interface InvoiceProps{
   customer: { name: string; email: string };
  products: { name: string; priceunit: number; quantity: number }[];
   total: number;

}
export default function Invoice({ url }) {
  return (
    <Html>
      <h1>Invoice</h1>
      <p>Gacias por  su compra</p>
    </Html>
  );
}