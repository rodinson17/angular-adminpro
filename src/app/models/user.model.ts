import { environment } from './../../environments/environment';

const base_url = environment.base_url;

export class User {

  constructor(
    public name: string,
    public email: string,
    public password?: string,
    public uid?: string,
    public img?: string,
    public role?: string,
    public google?: boolean
  ) { }

  get imageUrl() {
    if (this.img) {

      if ( this.img.includes('https') ) return this.img;

      return `${ base_url }/upload/users/${ this.img }`;

    } else {
      return `${ base_url }/upload/users/no-image`;
    }
  }

}
