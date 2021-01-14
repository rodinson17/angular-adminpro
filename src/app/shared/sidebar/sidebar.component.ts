import { User } from './../../models/user.model';
import { UserService } from './../../services/user.service';
import { SidebarService } from './../../services/sidebar.service';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-sidebar',
  templateUrl: './sidebar.component.html',
  styleUrls: ['./sidebar.component.css']
})
export class SidebarComponent implements OnInit {
  menuItems: any[];
  user: User;

  constructor( private sidebarService: SidebarService,
               private userService: UserService ) {
    this.menuItems = sidebarService.menu;
    this.user = userService.user;
  }

  ngOnInit(): void { }

}
