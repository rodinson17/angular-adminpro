import { Router } from '@angular/router';
import { Component, OnInit } from '@angular/core';
import { UserService } from './../../services/user.service';
import { User } from 'src/app/models/user.model';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent implements OnInit {

  user: User;

  constructor( private userService: UserService,
               private router: Router ) {
    this.user = this.userService.user;
  }

  logout() {
    this.userService.logout();
    this.router.navigateByUrl('/login');
  }

  generalSearch( term: string ) {
    if ( term.trim().length === 0 ) return; //this.router.navigateByUrl('/dashboard');

    this.router.navigateByUrl( `/dashboard/search/${ term }` );
  }

  ngOnInit(): void { }

}
