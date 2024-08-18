import { HttpClient } from '@angular/common/http';
import { Injectable, Inject, PLATFORM_ID } from '@angular/core';
import { isPlatformBrowser } from '@angular/common';
import { map, Observable, of, switchMap, tap } from 'rxjs';
import { JwtHelperService } from '@auth0/angular-jwt';

export interface LoginForm {
  email: string;
  password: string;
}

export interface User {
  id?: number;
  name?: string;
  username?: string;
  email?: string;
  role?: string;
  password?: string;
  profileImage?: string;
}

export const JWT_NAME = 'blog-token';

@Injectable({
  providedIn: 'root',
})
export class AuthenticationService {
  constructor(
    private http: HttpClient,
    private jwtHelper: JwtHelperService,
    @Inject(PLATFORM_ID) private platformId: Object
  ) {}

  private isLocalStorageAvailable(): boolean {
    return isPlatformBrowser(this.platformId) && typeof localStorage !== 'undefined';
  }

  login(loginForm: LoginForm): Observable<any> {
    return this.http.post<any>('/api/users/login', { email: loginForm.email, password: loginForm.password }).pipe(
      map((token) => {
        if (this.isLocalStorageAvailable()) {
          localStorage.setItem(JWT_NAME, token.access_token);
        }
        return token;
      })
    );
  }

  register(user: User): Observable<any> {
    return this.http.post<any>('/api/users/', user).pipe(
      map((newUser) => newUser)
    );
  }

  isAuthenticated(): boolean {
    if (!this.isLocalStorageAvailable()) {
      return false;
    }
    const token = localStorage.getItem(JWT_NAME);
    return token ? !this.jwtHelper.isTokenExpired(token) : false;
  }

  getUserId(): Observable<number | null> {
    if (!this.isLocalStorageAvailable()) {
      return of(null);
    }

    return of(localStorage.getItem(JWT_NAME)).pipe(
      switchMap((jwt: string | null) =>
        of(jwt).pipe(
          map((token: string | null) => {
            if (!token) {
              return null;
            }
            const decodedToken = this.jwtHelper.decodeToken(token);
            return decodedToken.user.id;
          }),
          tap((userId) => console.log(userId))
        )
      )
    );
  }
}
