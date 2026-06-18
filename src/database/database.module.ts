import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ConfigService } from '@nestjs/config';


@Module({
  imports: [
    TypeOrmModule.forRootAsync({
      inject: [ConfigService],
      useFactory: (configService: ConfigService) => ({
        type: 'postgres',
        host: configService.get('database.host'),
        port: configService.get<number>('database.port'),
        username: configService.get('database.username'),
        password: configService.get('database.password'),
        database: configService.get('database.name'),
        // Pool configuration para evitar el warning de pg sobre queries simultáneas
        extra: {
          max: 20,
          min: 2,
          idleTimeoutMillis: 30000,
          connectionTimeoutMillis: 2000,
        },
        // autoLoadEntities sincroniza las entidades en paralelo, causando el warning
        // Deshabilitamos synchronize en desarrollo y usamos migrations en su lugar
        autoLoadEntities: true,
        synchronize: false, // Usar migrations en lugar de synchronize para evitar queries paralelas
        migrationsRun: false, // Solo ejecutar si se configuran explícitamente
      }),
    }),
  ],


})
export class DatabaseModule {}
