import { Hospital } from './../models/hospital.model';
import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { catchError, delay, map, tap } from 'rxjs/operators';

import { environment } from './../../environments/environment';

const base_url = environment.base_url;

@Injectable({
  providedIn: 'root'
})
export class HospitalService {

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

  getHospitals() {
    const url = `${ base_url }/hospitals`;
    return this.httpClient.get( url, this.headers )
      .pipe(
        map( (resp: { ok: boolean, hospitals: Hospital[] }) => resp.hospitals )
      );
  }

  createHospital( name: string ) {
    const url = `${ base_url }/hospitals`;
    return this.httpClient.post( url, { name }, this.headers );
  }

  updateHospital( _id: string, name: string ) {
    const url = `${ base_url }/hospitals/${ _id }`;
    return this.httpClient.put( url, { name }, this.headers );
  }

  deleteHospital( _id: string ) {
    const url = `${ base_url }/hospitals/${ _id }`;
    return this.httpClient.delete( url, this.headers );
  }

}
