import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import Swal from 'sweetalert2'

import { UserService } from './../../services/user.service';
import { passwordValidator } from './identity-revealed.directive';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent implements OnInit {

  registerForm = this.formBuilder.group({
    name: ['Test20', Validators.required],
    email: ['test20@gmail.com', [Validators.required, Validators.email]],
    password: ['123456', [Validators.required, Validators.minLength(6)]],
    passwordConfirm: ['123456', [Validators.required, Validators.minLength(6)]],
    terms: [false, Validators.required]
  },
  {
    validators: this.passwordValid('password', 'passwordConfirm')
  });
  /* registerForm = new FormGroup({  de cualquier forma funciona
    'name': new FormControl('', Validators.required),
    'email': new FormControl('', Validators.required),
    'password': new FormControl('', Validators.required),
    'passwordConfirm': new FormControl('', Validators.required),
    'terms': new FormControl(false, Validators.required),
  }, { validators: passwordValidator }); */
  formSubmitted = false;

  constructor( private formBuilder: FormBuilder,
               private userService: UserService,
               private router: Router ) { }

  createUser() {
    this.formSubmitted = true;
    //console.log( this.registerForm.value );
    //console.log( this.registerForm );

    if (this.registerForm.invalid) return;

    this.userService.createUser( this.registerForm.value )
      .subscribe( resp => {
        this.router.navigateByUrl('/');
      }, err => {
        Swal.fire('Error', err.error.msg, 'error');
      });
  }

  fieldNotValid( field: string ): boolean {
    if (this.registerForm.get(field).invalid && this.formSubmitted) return true;

    return false;
  }

  acceptTerms() {
    return !this.registerForm.get('terms').value && this.formSubmitted;
  }

  passwordInvalid() {
    const pass1 = this.registerForm.get('password').value;
    const pass2 = this.registerForm.get('passwordConfirm').value;

    if ( (pass1 === '' || pass2 === '') && this.formSubmitted) return true;

    return false;
  }

  passwordValid(password, passwordConfirm) {
    return (formGroup: FormGroup) => {
      const pass1Control = formGroup.get(password);
      const pass2Control = formGroup.get(passwordConfirm);

      // se pone el error directamente al campo
      if (pass1Control.value === pass2Control.value) {
        pass2Control.setErrors(null);
      } else {
        pass2Control.setErrors({ noEsIgual: true })
      }
    }
  }

  ngOnInit(): void { }

}
