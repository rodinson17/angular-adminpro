import { Router } from '@angular/router';
import { Component, OnInit } from '@angular/core';
import { UserService } from './../../services/user.service';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent implements OnInit {

  constructor( private userService: UserService,
               private router: Router ) { }

  logout() {
    this.userService.logout();
    this.router.navigateByUrl('/login');
  }

  ngOnInit(): void { }

}
