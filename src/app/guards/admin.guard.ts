import { UserService } from './../services/user.service';
import { Injectable } from '@angular/core';
import { CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot, UrlTree, Router } from '@angular/router';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class AdminGuard implements CanActivate {

  constructor( private userService: UserService,
               private router: Router ) { }

  canActivate(
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot): boolean {

    if ( this.userService.role === 'ADMIN_ROLE' ) return true;

    this.router.navigateByUrl('/dashboard');
    return false;

    //return ( this.userService.role === 'ADMIN_ROLE' ) ? true : false;
  }

}
