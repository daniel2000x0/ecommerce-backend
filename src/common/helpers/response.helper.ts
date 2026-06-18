import { ApiErrorResponse, ApiMeta, ApiResponse } from '../types/api-response.type';

export const buildSuccessResponse = <T>(
  data: T,
  message = 'Operación exitosa',
  statusCode = 200,
  meta?: ApiMeta,
): ApiResponse<T> => {
  return {
    success: true,
    statusCode,
    message,
    data,
    meta: {
      timestamp: new Date().toISOString(),
      version: '1.0',
      ...meta,
    },
  };
};

export const buildErrorResponse = (
  statusCode: number,
  message: string,
  error?: string,
  errorCode?: string,
  meta?: ApiMeta,
): ApiErrorResponse => {
  return {
    success: false,
    statusCode,
    message,
    error,
    errorCode,
    meta: {
      timestamp: new Date().toISOString(),
      ...meta,
    },
  };
};

export const validateSuccessResponse = <T>(response: ApiResponse<T>): boolean => {
  return (
    response !== null &&
    response.success === true &&
    typeof response.statusCode === 'number' &&
    typeof response.message === 'string' &&
    response.data !== undefined
  );
};

export const validateErrorResponse = (response: ApiErrorResponse): boolean => {
  return (
    response !== null &&
    response.success === false &&
    typeof response.statusCode === 'number' &&
    typeof response.message === 'string'
  );
};
