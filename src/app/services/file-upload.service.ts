import { environment } from './../../environments/environment';
import { Injectable } from '@angular/core';

const base_url = environment.base_url;

@Injectable({
  providedIn: 'root'
})
export class FileUploadService {

  constructor() { }

  async updateFile( file: File, type: 'users'|'hospitals'|'doctors', id: string ) {
    try {
      const url = `${ base_url }/upload/${ type }/${ id }`;
      const formData = new FormData();
      formData.append('image', file);

      const resp = await fetch( url, {
        method: 'PUT',
        headers: {
          'x-token': localStorage.getItem('token') || ''
        },
        body: formData
      });

      const data = await resp.json();

      if (data.ok) {
        return data.nameFile;
      }

      console.log('Error: ', data.msg);
      return false;

    } catch (error) {
      console.log('Error: ', error);
      return false;
    }
  }

}
