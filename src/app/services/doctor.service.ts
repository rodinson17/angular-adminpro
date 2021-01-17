
import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { catchError, delay, map, tap } from 'rxjs/operators';

import { Doctor } from '../models/doctor.model';

import { environment } from './../../environments/environment';

const base_url = environment.base_url;

@Injectable({
  providedIn: 'root'
})
export class DoctorService {

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

  getDoctors() {
    const url = `${ base_url }/doctors`;
    return this.httpClient.get( url, this.headers )
      .pipe(
        map( (resp: { ok: boolean, doctors: Doctor[] }) => resp.doctors )
      );
  }

  getDoctorById( id: string ) {
    const url = `${ base_url }/doctors/${ id }`;
    return this.httpClient.get( url, this.headers )
      .pipe(
        map( (resp: { ok: boolean, doctor: Doctor }) => resp.doctor )
      );
  }

  createDoctor( doctor: { name: string, hospital: string } ) {
    const url = `${ base_url }/doctors`;
    return this.httpClient.post( url, doctor, this.headers );
  }

  updateDoctor( doctor: Doctor ) {
    const url = `${ base_url }/doctors/${ doctor._id }`;
    return this.httpClient.put( url, doctor, this.headers );
  }

  deleteDoctor( _id: string ) {
    const url = `${ base_url }/doctors/${ _id }`;
    return this.httpClient.delete( url, this.headers );
  }

}
