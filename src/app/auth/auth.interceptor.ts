// auth.interceptor.ts

import { Injectable } from '@angular/core';
import {
  HttpInterceptor,
  HttpEvent,
  HttpHandler,
  HttpRequest,
} from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable()
export class AuthInterceptor implements HttpInterceptor {
  constructor() {}

  intercept(
    req: HttpRequest<any>,
    next: HttpHandler
  ): Observable<HttpEvent<any>> {
    // Modify the request to add headers or perform other actions
    // For example, you can add an Authorization header with a JWT token
    const modifiedReq = req.clone({
      setHeaders: {
        // Authorization: `JWT ${your_jwt_token_here}`,
      },
    });
    // Pass the modified request to the next handler
    return next.handle(modifiedReq);
  }
}
