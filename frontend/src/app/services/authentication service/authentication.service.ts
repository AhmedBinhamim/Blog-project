import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { map, Observable, of, switchMap, tap } from 'rxjs';
import {JwtHelperService} from '@auth0/angular-jwt'

export interface LoginForm{
  email: string;
  password: string;
};

export interface User{
  name?: string;
  username?: string;
  email?: string;
  role?: string;
  password?: string;
  //passwordConfirm: string;
  profileImage?:string;
}

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

  register(user: User){
    return this.http.post<any>('/api/users/', user).pipe(
      map(user => user)
    )
  }

  isAuthenticated():boolean{
    const token = localStorage.getItem(JWT_NAME)
    return this.jwtHelper.isTokenExpired(token);
  }

  getUserId(): Observable<number | null> {
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
          tap((jwt) => console.log(jwt))
        )
      )
    );
  }
  
}
