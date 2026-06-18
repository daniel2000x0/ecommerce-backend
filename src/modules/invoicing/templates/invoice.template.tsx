import * as React from 'react';

import {
  Html,
  Head,
  Body,
  Container,
  Section,
  Heading,
  Text,
  Hr,
} from '@react-email/components';
import { InvoiceData } from '../interfaces/invoice.interface';


export default function Invoice({
    
customer,
products,
total,
}:  InvoiceData ) {
  return (
    <Html>

      <Head />

      <Body
        style={{
          backgroundColor: '#f4f4f4',
          fontFamily: 'Arial',
          padding: '20px',
        }}
      >

        <Container
          style={{
            backgroundColor: '#ffffff',
            padding: '30px',
            borderRadius: '10px',
          }}
        >

          <Heading>
            Factura Electrónica
          </Heading>

          <Text>
            Gracias por su compra
          </Text>

          <Hr />

          <Section>

            <Text>
              <strong>Cliente:</strong> {customer.name}
            </Text>

            <Text>
              <strong>Email:</strong> {customer.email}
            </Text>

          </Section>

          <Hr />

          <Heading
            as="h3"
            style={{
              fontSize: '18px',
            }}
          >
            Productos
          </Heading>

          {products.map((product, index) => (

            <Section
              key={index}
              style={{
                marginBottom: '15px',
                padding: '10px',
                border: '1px solid #ddd',
                borderRadius: '5px',
              }}
            >

              <Text>
                <strong>Producto:</strong> {product.name}
              </Text>

              <Text>
                <strong>Cantidad:</strong> {product.quantity}
              </Text>

              <Text>
                <strong>Precio Unitario:</strong>
                {' '}
                ${product.priceUnit}
              </Text>

              <Text>
                <strong>Subtotal:</strong>
                {' '}
                ${product.priceUnit * product.quantity}
              </Text>

            </Section>

          ))}

          <Hr />

          <Heading
            as="h2"
            style={{
              textAlign: 'right',
            }}
          >
            Total: ${total}
          </Heading>

          <Text
            style={{
              marginTop: '30px',
              fontSize: '12px',
              color: '#666',
            }}
          >
            Este correo contiene su factura electrónica.
          </Text>

        </Container>

      </Body>

    </Html>
  );
}