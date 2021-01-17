import { Component, OnInit, OnDestroy } from '@angular/core';
import { delay } from 'rxjs/operators';
import Swal from 'sweetalert2';

import { User } from './../../../models/user.model';

import { UserService } from './../../../services/user.service';
import { SearchesService } from './../../../services/searches.service';
import { ModalImagenService } from './../../../services/modal-imagen.service';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-users',
  templateUrl: './users.component.html',
  styleUrls: ['./users.component.css']
})
export class UsersComponent implements OnInit, OnDestroy {
  totalUsers: number = 0;
  listUsers: User[] = [];
  listUsersTemp: User[] = [];
  from: number = 0;
  loading: boolean = true;
  imgSubs: Subscription;


  constructor( private userService: UserService,
               private searchesService: SearchesService,
               private modalImagenService: ModalImagenService ) { }

  changePage( value: number ) {
    this.from += value;

    if ( this.from < 0 ) this.from = 0;

    if ( this.from >= this.totalUsers ) this.from -= value;

    this.getUsers();
  }

  getUsers() {
    this.loading = true;

    this.userService.getUsers( this.from )
      .subscribe( ({ total, users }) => {
        this.totalUsers = total;
        this.listUsersTemp = users;
        this.listUsers = users;
        //if (users.length !== 0) this.listUsers = users;
        this.loading = false;
      });
  }

  search( termSearch: string ) {
    if ( termSearch.length === 0 ) {
      this.listUsers = this.listUsersTemp;
      return;
    }

    this.searchesService.searches( 'users', termSearch )
      .subscribe( ( resp: User[] ) =>  {
        this.listUsers = resp;
      });
  }

  changeRoleUser(user) {
    this.userService.changeRole( user )
      .subscribe( resp => console.log(resp) );
  }

  deleteUser( user: User ) {
    if ( user.uid === this.userService.uid ) {
      return Swal.fire('Error', 'No es posible borrar este usuario', 'error');
    }

    Swal.fire({
      title: '¿Borrar Usuario?',
      html: `Esta seguro que desea borrar el usuario <strong>${ user.name }</strong>`,
      icon: 'question',
      showCancelButton: true,
      confirmButtonColor: '#3085d6',
      cancelButtonColor: '#d33',
      confirmButtonText: 'Si, Borrar'
    }).then((result) => {
      if (result.isConfirmed) {
        this.userService.deleteUser( user )
          .subscribe(
            () => {
              this.getUsers();

              Swal.fire('Borrado!', `El usuario ${ user.name } fue borrado correctamente.`, 'success');
            },
            err => {
              console.log('Error: ', err);
              Swal.fire('Error!', err.error.msg , 'error')
            }
          );
      }
    })
  }

  showModal(user: User) {
    this.modalImagenService.showModal('users', user.uid, user.img);
  }

  ngOnInit(): void {
    this.getUsers();

     this.imgSubs = this.modalImagenService.newImage
      .pipe( delay(100) )
      .subscribe( img => this.getUsers() );
  }

  ngOnDestroy() {
    this.imgSubs.unsubscribe();
  }

}
