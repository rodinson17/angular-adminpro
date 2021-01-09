import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-promise',
  templateUrl: './promise.component.html',
  styleUrls: ['./promise.component.css']
})
export class PromiseComponent implements OnInit {

  constructor() { }

  ngOnInit(): void {
    /* const promise = new Promise( (resolve, reject) => {
      if ( false ) {
        resolve( console.log('Hola mundo') );
      } else {
        reject('Algo salio mal');
      }
    });

    promise.then( () => {
      console.log('termine');
    }).catch( error => console.log('error: ', error) );

    console.log('fin...'); */

    //this.getUsers();
    this.getUsers().then( users => {
      console.log(users);
    });

  }

  getUsers() {
    /* fetch('https://reqres.in/api/users')
      .then( resp => {
        resp.json().then( body => console.log(body) );
      }); */
    /* fetch('https://reqres.in/api/users')
      .then( resp => resp.json() )
      .then( body => console.log(body.data) ); */

    /* const promise = new Promise( resolve => {
      fetch('https://reqres.in/api/users')
      .then( resp => resp.json() )
      .then( body => console.log(body.data) );
    });

    return promise; */

    return new Promise( resolve => {
      fetch('https://reqres.in/api/users')
      .then( resp => resp.json() )
      .then( body => console.log(body.data) );
    });
  }

}
