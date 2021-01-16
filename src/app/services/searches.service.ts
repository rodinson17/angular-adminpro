import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { map } from 'rxjs/operators';

import { User } from 'src/app/models/user.model';
import { environment } from './../../environments/environment';

const base_url = environment.base_url;

@Injectable({
  providedIn: 'root'
})
export class SearchesService {

  constructor( private httpClient: HttpClient ) { }

  get token(): string {
    return localStorage.getItem('token') || '';
  }

  get headers() {
    return {
      headers: {
        'x-token': this.token
      }
    };
  }

  private transformUsers( result: any[] ): User[] {
    return result.map (
      user => new User(user.name, user.email, '', user.uid, user.img, user.role, user.google)
    );
  }

  searches( type: 'users'|'hospitals'| 'doctors', term: string) {
    const url = `${ base_url }/all/collection/${ type }/${ term }`;
    return this.httpClient.get<any[]>( url, this.headers )
      .pipe(
        map( ( resp: any ) => {
          switch ( type ) {
            case 'users':
              return this.transformUsers( resp.result );

            default:
              return [];
          }

        })
      );
  }

}
