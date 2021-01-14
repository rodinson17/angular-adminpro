
import { catchError, map, tap } from 'rxjs/operators';
import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
//import { environment } from 'src/environments/environment';
import { environment } from './../../environments/environment';
import { Observable, of } from 'rxjs';

import { User } from './../models/user.model';
import { LoginForm } from './../interfaces/login-form.interface';
import { RegisterForm } from '../interfaces/register-form.interface';

const base_url = environment.base_url;

@Injectable({
  providedIn: 'root'
})
export class UserService {

  user: User;

  constructor( private httpClient: HttpClient ) { }

  get token(): string {
    return localStorage.getItem('token') || '';
  }

  get uid(): string {
    return this.user.uid || '';
  }

  validateToken(): Observable<boolean> {

    return this.httpClient.get(`${ base_url }/login/refresh`, {
      headers: {
        'x-token': this.token
      }
    }).pipe(
      //tap( (resp: any) => {
      map( (resp: any) => {
        const { email, google, name, role, img = '', uid } = resp.user;
        this.user =  new User( name, email, '', uid, img, role, google );
        console.log('user: ', this.user);
        localStorage.setItem('token', resp.token);
        return true;
      }),
      //map( resp => true),
      catchError( err => of(false)) // retorna false
    );
  }

  createUser( formData: RegisterForm ) {
    return this.httpClient.post( `${ base_url }/users`, formData )
      .pipe(
        tap( (resp: any) => {
          localStorage.setItem('token', resp.token);
        })
      );
  }

  updateProfile( data: {email: string, name: string, role: string} ) {
    data = {
      ...data,
      role: this.user.role
    }

    return this.httpClient.put( `${ base_url }/users/${ this.uid }`, data, {
      headers: {
        'x-token': this.token
      }
    });
  }

  login( formData: LoginForm ) {
    return this.httpClient.post( `${ base_url }/login`, formData )
      .pipe(
        tap( (resp: any) => {
          localStorage.setItem('token', resp.token);
        })
      );
  }

  loginGoogle( token ) {
    return this.httpClient.post( `${ base_url }/login/google`, { token } )
      .pipe(
        tap( (resp: any) => {
          localStorage.setItem('token', resp.token);
        })
      );
  }

  logout() {
    localStorage.removeItem('token');
  }
}
