import {
    CallHandler,
    ExecutionContext,
    Injectable,
    NestInterceptor,
  } from "@nestjs/common";
  import { map, Observable, retry } from "rxjs";
  
  @Injectable()
  export class LoggingInterceptor implements NestInterceptor {
    intercept(
      context: ExecutionContext,
      next: CallHandler<any>,
    ): Observable<any> | Promise<Observable<any>> {
      console.log(`..... BEFORE ....`);
      const now = Date.now();
  
      const result = next.handle().pipe(
        map((data) => {
          console.log(`AFTER   ${Date.now() - now}ms`);
          return data + " Shavkat";
        }),
      );
  
      return result;
    }
  }