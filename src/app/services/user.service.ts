
import { catchError, delay, map, tap } from 'rxjs/operators';
import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
//import { environment } from 'src/environments/environment';
import { environment } from './../../environments/environment';
import { Observable, of } from 'rxjs';

import { User } from './../models/user.model';
import { LoginForm } from './../interfaces/login-form.interface';
import { RegisterForm } from '../interfaces/register-form.interface';
import { GetUser } from '../interfaces/get-users.interface';

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

  get headers() {
    return {
      headers: {
        'x-token': this.token
      }
    };
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

  getUsers( from: number = 0 ) {
    const url = `${ base_url }/users?from=${ from }`;
    return this.httpClient.get<GetUser>( url, this.headers )
      .pipe(
        //delay(5000), retardar a 5 seg la carga
        map( resp => {
          const users = resp.users.map(
            user => new User(user.name, user.email, '', user.uid, user.img, user.role, user.google)
          )
          return {
            total: resp.total,
            users
          };
        })
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

    return this.httpClient.put( `${ base_url }/users/${ this.uid }`, data, this.headers);
  }

  changeRole( user: User ) {
    return this.httpClient.put( `${ base_url }/users/${ user.uid }`, user, this.headers);
  }

  deleteUser( user: User ) {
    return this.httpClient.delete( `${ base_url }/users/${ user.uid }`, this.headers );
  }

}
