import { CallHandler, ExecutionContext, Injectable, NestInterceptor } from "@nestjs/common";
import { Observable, tap } from "rxjs";

@Injectable()
export class LoggingInterceptor implements NestInterceptor{
    intercept(context: ExecutionContext, next: CallHandler): Observable<any> {
        const request =  context.switchToHttp().getRequest();
        const method =   request.method;
        const url =   request.url;
        console.log('Incoming Request: ', method, url);
        const now = Date.now();
        return  next.handle().pipe(
            tap(() => console.log('Request Completed: ', method, url,  Date.now() - now) )
  
        );
    }
}