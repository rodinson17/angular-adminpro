import { FileUploadService } from './../../services/file-upload.service';
import { Component, OnInit } from '@angular/core';
import Swal from 'sweetalert2';

import { ModalImagenService } from './../../services/modal-imagen.service';

@Component({
  selector: 'app-modal-image',
  templateUrl: './modal-image.component.html',
  styleUrls: ['./modal-image.component.css']
})
export class ModalImageComponent implements OnInit {
  imageUpload: File;
  imgTemp: any = null;


  constructor( public modalImagenService: ModalImagenService,
               private fileUploadService: FileUploadService ) { }

  closeModal() {
    this.imgTemp = null;
    this.modalImagenService.closeModal();
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
    const id = this.modalImagenService.id;
    const type = this.modalImagenService.type;

    this.fileUploadService
      .updateFile( this.imageUpload, type, id )
      .then( img => {
        Swal.fire('Actualización', 'La imagen se actualizo correctamente', 'success');

        this.modalImagenService.newImage.emit(img);

        this.closeModal();
      }).catch( err => {
        console.log('Error: ', err)
        Swal.fire('Error', 'No se pudo subir la imagen', 'error');
      });
  }

  ngOnInit(): void { }

}
