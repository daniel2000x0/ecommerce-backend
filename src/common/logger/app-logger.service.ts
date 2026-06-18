import { Injectable, LoggerService } from '@nestjs/common';

@Injectable()
export class AppLogger implements LoggerService {
  log(message: string, context?: string) {
    console.log(`[${context || 'APP'}] ${message}`);
  }

  error(message: string, trace?: string, context?: string) {
    console.error(`[ERROR] [${context || 'APP'}] ${message}`, trace || '');
  }

  warn(message: string, context?: string) {
    console.warn(`[WARN] [${context || 'APP'}] ${message}`);
  }

  debug(message: string, context?: string) {
    console.debug(`[DEBUG] [${context || 'APP'}] ${message}`);
  }

  verbose(message: string, context?: string) {
    console.log(`[VERBOSE] [${context || 'APP'}] ${message}`);
  }
}
