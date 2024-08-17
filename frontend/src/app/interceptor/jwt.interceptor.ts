import { Injectable } from '@angular/core';
import { HttpEvent, HttpHandler, HttpInterceptor, HttpRequest } from '@angular/common/http';
import { Observable } from 'rxjs';
import { JWT_NAME } from '../services/authentication service/authentication.service';

@Injectable()
export class JwtInterceptor implements HttpInterceptor {
  intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
    const token = localStorage.getItem(JWT_NAME);
    
    if (token) {
      const clonedReq = req.clone({
        headers: req.headers.set('Authorization',
          'Bearer' + token
        )
      });
     
      return next.handle(clonedReq);
    } else {
      return next.handle(req);
    }
  }
}
