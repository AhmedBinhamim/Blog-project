import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { map, Observable, of, switchMap, tap } from 'rxjs';
import {JwtHelperService} from '@auth0/angular-jwt'
import { User } from '../../model/user.interface';

export interface LoginForm{
  email: string;
  password: string;
};



export const JWT_NAME = 'blog-token';

@Injectable({
  providedIn: 'root'
})
export class AuthenticationService {

  constructor(private http: HttpClient, private jwtHelper: JwtHelperService) {}

  login(loginForm: LoginForm){
    return this.http.post<any>('/api/users/login', {email: loginForm.email, password: loginForm.password}).pipe(
      map((token) => {
        localStorage.setItem(JWT_NAME, token.access_token)
        return token;
      })
    )
  }

  logOut(){
    localStorage.removeItem(JWT_NAME);
  }

  register(user: User){
    return this.http.post<any>('/api/users/', user).pipe(
      map(user => user)
    )
  }

  isAuthenticated(): boolean {
    if (typeof window !== 'undefined') {
      const token = localStorage.getItem(JWT_NAME);
      return !this.jwtHelper.isTokenExpired(token);
    }
    return false; 
  }
  

  getUserId(): Observable<number | null> {
    if (typeof window !== 'undefined') {
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
          )
        )
      );
    }
    return of(null);
  }
  
  
}
