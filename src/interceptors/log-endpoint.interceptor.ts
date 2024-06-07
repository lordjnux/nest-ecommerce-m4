import { CallHandler, ExecutionContext, Injectable, NestInterceptor } from '@nestjs/common';
import { Observable } from 'rxjs';
import { tap } from 'rxjs/operators';

@Injectable()
export class LogEndpointInterceptor implements NestInterceptor {
    intercept(context: ExecutionContext, next: CallHandler): Observable<any> {
    const request = context.switchToHttp().getRequest();
    const method = request.method;
    const url = request.url;

    const now = Date.now();

    return next
      .handle()
      .pipe(
        tap((data) => {
          const response = context.switchToHttp().getResponse();
          console.log(`Request Method: ${method}`);
          console.log(`Request URL: ${url}`);
          console.log(`Response: ${JSON.stringify(data)}`);
          console.log(`Response Status: ${response.statusCode}`);
          console.log(`Time: ${Date.now() - now}ms`);
        }),
      );
  }

}