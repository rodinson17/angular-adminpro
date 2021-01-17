import { Hospital } from './hospital.model';

interface _userData {
  _id: string;
  name: string;
  img: string;
}


export class Doctor {

  constructor(
    public name: string,
    public _id?: string,
    public img?: string,
    public user?: _userData,
    public hospital?: Hospital ) { }

}
