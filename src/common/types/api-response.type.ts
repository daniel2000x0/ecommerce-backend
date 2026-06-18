// src/common/types/api-response.type.ts

/**
 * TYPE ALIASES vs INTERFACES:
 * - 'type' es más flexible (unions, primitives, etc.)
 * - 'interface' es mejor para objetos que se extienden
 * - Ambos son válidos; aquí mezclamos ambos según convenga
 */

/**
 * Type alias para respuestas exitosas (usando 'type' en lugar de interface).
 * Más conciso para tipos simples o unions.
 */
export type ApiResponse<T = any> = {
  success: true;
  statusCode: number;
  message: string;
  data: T;
  meta?: {
    timestamp: string;
    version: string;
    [key: string]: any;
  };
};

/**
 * Type para respuestas de error (usando 'type').
 * Permite unions si necesitas diferentes tipos de error.
 */
export type ApiErrorResponse = {
  success: false;
  statusCode: number;
  message: string;
  error?: string;
  errorCode?: string;
  meta?: {
    timestamp: string;
    path?: string;
    [key: string]: any;
  };
};

/**
 * Type para respuestas paginadas (extiende otro type).
 */
export type PaginatedResponse<T> = Omit<ApiResponse<T[]>, 'data'> & {
  data: T[];
  pagination: {
    page: number;
    limit: number;
    total: number;
    totalPages: number;
    hasNext: boolean;
    hasPrev: boolean;
  };
};

/**
 * Ejemplo de UNION TYPE: Respuesta puede ser exitosa o de error.
 * Útil para funciones que pueden devolver cualquiera de los dos.
 */
export type ApiResult<T> = ApiResponse<T> | ApiErrorResponse;

/**
 * Ejemplo de TYPE con LITERALS: Para códigos de estado específicos.
 */
export type HttpStatusCode = 200 | 201 | 400 | 401 | 404 | 500;

/**
 * Type para metadatos opcionales (usando Record para flexibilidad).
 */
export type ApiMeta = Record<string, any>;

/**
 * Ejemplo de TYPE con TEMPLATE LITERALS (avanzado).
 * Para generar tipos dinámicos basados en strings.
 */
export type ApiEndpoint = `GET /${string}` | `POST /${string}` | `PUT /${string}` | `DELETE /${string}`;

/**
 * Types específicos para tu e-commerce (usando type aliases).
 */
export type ProductResponse = ApiResponse<Product>;
export type ProductsPaginatedResponse = PaginatedResponse<Product>;
export type UserResponse = ApiResponse<User>;
export type OrderResponse = ApiResponse<Order>;
export type CustomerResponse = ApiResponse<Customer>;

// Ejemplo de TYPE con INTERSECTION (&) para combinar
export type DetailedProductResponse = ProductResponse & {
  relatedProducts: Product[];
  reviews: Review[];
};

// Ejemplo de TYPE con CONDITIONAL (avanzado)
export type ResponseData<T> = T extends Array<any>
  ? PaginatedResponse<T[0]>
  : ApiResponse<T>;

// Interfaces para objetos complejos (mejor que type para extensiones)
export interface Product {
  id: number;
  name: string;
  price: number;
  description?: string;
  categoryId: number;
  userId: number;
  status: boolean;
}

export interface User {
  id: number;
  email: string;
  firstname: string;
  lastname: string;
  status: boolean;
  roles: string[];
}

export interface Order {
  id: number;
  total: number;
  status: string;
  customerId: number;
  items: OrderItem[];
}

export interface Customer {
  id: number;
  email: string;
  firstname: string;
  lastname: string;
  birthdate: Date;
}

export interface OrderItem {
  productId: number;
  quantity: number;
  price: number;
}

export interface Review {
  id: number;
  rating: number;
  comment: string;
  userId: number;
  productId: number;
}