import { Injectable, EventEmitter } from '@angular/core';

import { environment } from './../../environments/environment.prod';

const base_url = environment.base_url;

@Injectable({
  providedIn: 'root'
})
export class ModalImagenService {

  private _hiddenModal: boolean = true;
  type: 'users'|'hospitals'|'doctors';
  id: string;
  img: string;

  newImage: EventEmitter<string> = new EventEmitter<string>();

  constructor() { }

  get hiddenModal() {
    return this._hiddenModal;
  }

  showModal( type: 'users'|'hospitals'|'doctors', id: string, img: string = 'no-img' ) {
    this._hiddenModal = false;
    this.type = type;
    this.id = id;

    if ( img.includes('https') ) {
      this.img = img;
    } else {
      this.img = `${ base_url }/upload/${ type }/${ img }`;
    }
  }

  closeModal() {
    this._hiddenModal = true;
  }
}
