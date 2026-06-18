export interface InvoiceData {

   customer: {
      name: string;
      email: string;
      identification: string;
   };

   products: {
      name: string;
      quantity: number;
      priceUnit: number;
      subtotal: number;
   }[];

   subtotal: number;

   iva: number;

   total: number;

   accessKey: string;

   authorizationNumber: string;
}