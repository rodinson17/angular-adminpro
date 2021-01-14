import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import Swal from 'sweetalert2';

import { User } from './../../models/user.model';

import { UserService } from './../../services/user.service';
import { FileUploadService } from './../../services/file-upload.service';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.css']
})
export class ProfileComponent implements OnInit {

  profileForm: FormGroup;
  user: User;
  imageUpload: File;
  imgTemp: any = null;

  constructor( private formBuilder: FormBuilder,
               private userService: UserService,
               private fileUploadService: FileUploadService ) {
    this.user = userService.user;
  }

  updateProfiel() {
    console.log('form: ', this.profileForm.value);
    this.userService.updateProfile( this.profileForm.value )
      .subscribe( () => {
        const { name, email } = this.profileForm.value;
        this.user.name = name;
        this.user.email = email;

        Swal.fire('Actualización', 'Los datos se actualizaron correctamente', 'success');
      }, err => {
        Swal.fire('Error', err.error.msg, 'error');
      });
  }

  changeImage( file: File ) {
    this.imageUpload = file;

    if (!file) {
      return this.imgTemp = null;
    }

    const reader = new FileReader();
    reader.readAsDataURL( file );

    reader.onloadend = () => {
      this.imgTemp = reader.result;
    }
  }

  uploadImage() {
    console.log('user1 ', this.user)
    this.fileUploadService
      .updateFile( this.imageUpload, 'users', this.user.uid )
      .then( img => {
        console.log(img);
        this.user.img = img;
        Swal.fire('Actualización', 'La imagen se actualizo correctamente', 'success');
      }).catch( err => {
        console.log('Error: ', err)
        Swal.fire('Error', 'No se pudo subir la imagen', 'error');
      });
  }

  ngOnInit(): void {
    this.profileForm = this.formBuilder.group({
      name: [this.user.name, Validators.required],
      email: [this.user.email, Validators.required]
    });
  }
}
