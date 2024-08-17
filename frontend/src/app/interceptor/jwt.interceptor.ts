import { Injectable, Inject, PLATFORM_ID } from '@angular/core';
import { HttpEvent, HttpHandler, HttpInterceptor, HttpRequest } from '@angular/common/http';
import { Observable } from 'rxjs';
import { isPlatformBrowser } from '@angular/common';
import { JWT_NAME } from '../services/authentication service/authentication.service';

@Injectable()
export class JwtInterceptor implements HttpInterceptor {
  constructor(@Inject(PLATFORM_ID) private platformId: any) {}

  intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
    let clonedReq = req;

    if (isPlatformBrowser(this.platformId)) {
      const token = localStorage.getItem(JWT_NAME);
      if (token) {
        clonedReq = req.clone({
          headers: req.headers.set('Authorization', `Bearer ${token}`)
        });
      }
    }

    return next.handle(clonedReq);
  }
}
