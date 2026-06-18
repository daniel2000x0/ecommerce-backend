import { CallHandler, ExecutionContext, Injectable } from "@nestjs/common";
import { catchError, Observable, throwError, timeout } from "rxjs";

@Injectable()
export class TimeoutInterceptor {
    intercept(context: ExecutionContext, next: CallHandler): Observable<any> {
        return next.handle().pipe(
            timeout(5000),
            catchError(err => throwError(() => new Error('Request timed out')))
        );
    }
}