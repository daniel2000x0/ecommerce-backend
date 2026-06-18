import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import * as dotenv from 'dotenv';
import { ValidationPipe, Logger } from '@nestjs/common';
import { HttpExceptionFilter, AllExceptionsFilter } from './common/filters/http-exception.filter';
import { AppLogger } from './common/logger/app-logger.service';
import { SwaggerModule, DocumentBuilder } from '@nestjs/swagger';
async function bootstrap() {
  // Configurar NODE_ENV por defecto
  process.env.NODE_ENV = process.env.NODE_ENV || 'development';
  
  dotenv.config();

  const app = await NestFactory.create(AppModule);
  const logger = new AppLogger();

  // Configurar logger global
  app.useLogger(logger);

  // Configurar ValidationPipe global
  app.useGlobalPipes(
    new ValidationPipe({
      whitelist: true, // elimina propiedades que no estén en el DTO
      forbidNonWhitelisted: true, // error si envían campos extra
      transform: true,
      transformOptions: {
        enableImplicitConversion: true,
      },
    }),
  );

  // Configurar filtros de excepciones global
  app.useGlobalFilters(
    new HttpExceptionFilter(),
    new AllExceptionsFilter(),
  );

  const port = Number(process.env.PORT) || 3000;
  const env = process.env.NODE_ENV;
const  config = new DocumentBuilder().setTitle('Invoicing API')
  .setDescription('API para la gestión de facturas')
  .setVersion('1.0')
  .addTag('invoicing')
  .build();

  const  document = SwaggerModule.createDocument(app,config);
  SwaggerModule.setup("api",app,document);
 //app.enableCors();
  try {
    await app.listen(port);
    logger.log(`🚀 Application running on port ${port} in ${env} mode`, 'Bootstrap');
  } catch (error) {
    logger.error(`Failed to start application on port ${port}: ${error.message}`, 'Bootstrap');
    if ((error as any)?.code === 'EADDRINUSE') {
      logger.error(`Port ${port} is already in use. Stop the running process or set PORT to a free port.`, 'Bootstrap');
    }
    process.exit(1);
  }
}

bootstrap();
