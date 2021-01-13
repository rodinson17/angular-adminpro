import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { FormBuilder, Validators } from '@angular/forms';
import Swal from 'sweetalert2'

import { UserService } from './../../services/user.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  formSubmitted = false;
  loginForm = this.formBuilder.group({
    email: ['test20@gmail.com', [Validators.required, Validators.email]],
    password: ['123456', [Validators.required, Validators.minLength(6)]],
    remember: [false]
  });

  constructor(private formBuilder: FormBuilder,
              private userService: UserService,
              private router: Router) { }

  onSubmit() {
    this.userService.login( this.loginForm.value )
    .subscribe( (resp: any) => {
      
      if ( this.loginForm.get('remember').value ) {
        localStorage.setItem('email', this.loginForm.get('email').value );
      } else {
        localStorage.removeItem('email');
      }

      this.router.navigateByUrl('/');
    }, err => {
      Swal.fire('Error', err.error.msg, 'error');
    });
  }

  onSignIn(googleUser) {
    var profile = googleUser.getBasicProfile();
    console.log('ID: ' + profile.getId()); // Do not send to your backend! Use an ID token instead.
    console.log('Name: ' + profile.getName());
    console.log('Image URL: ' + profile.getImageUrl());
    console.log('Email: ' + profile.getEmail()); // This is null if the 'email' scope is not present.

    var id_token = googleUser.getAuthResponse().id_token;
    console.log('Token: ', id_token);

    this.userService.loginGoogle( id_token )
      .subscribe( resp => this.router.navigateByUrl('/') );
  }

  ngOnInit(): void {
    let emailR = localStorage.getItem('email') || '';
    console.log('Email: ', emailR);
  }

}
