import { Component, OnInit, OnDestroy } from '@angular/core';
import { Subscription } from 'rxjs';
import { delay } from 'rxjs/operators';
import Swal from 'sweetalert2';

import { Doctor } from './../../../models/doctor.model';

import { DoctorService } from './../../../services/doctor.service';
import { ModalImagenService } from './../../../services/modal-imagen.service';
import { SearchesService } from './../../../services/searches.service';

@Component({
  selector: 'app-doctors',
  templateUrl: './doctors.component.html',
  styleUrls: ['./doctors.component.css']
})
export class DoctorsComponent implements OnInit, OnDestroy {
  listDoctors: Doctor[] = [];
  listDoctorsTemp: Doctor[] = [];
  loanding: boolean = true;
  imgSubs: Subscription;

  constructor( private doctorService: DoctorService,
               private modalImagenService: ModalImagenService,
               private searchesService: SearchesService ) { }


  search( termSearch: string ) {
    if ( termSearch.length === 0 ) {
      this.listDoctors = this.listDoctorsTemp;
      return;
    }

    this.searchesService.searches( 'doctors', termSearch )
      .subscribe( doctors =>  {
        this.listDoctors = doctors;
      });
  }

  showModal( doctor: Doctor ) {
    this.modalImagenService.showModal('doctors', doctor._id, doctor.img);
  }

  getListDoctors() {
    this.loanding = true;

    this.doctorService.getDoctors()
      .subscribe( doctors => {
        this.listDoctors = doctors;
        this.listDoctorsTemp = doctors;
        console.log(doctors);
        this.loanding = false;
      });
  }

  deleteDoctor( doctor: Doctor ) {
    Swal.fire({
      title: '¿Borrar Doctor?',
      html: `Esta seguro que desea borrar el doctor <strong>${ doctor.name }</strong>`,
      icon: 'question',
      showCancelButton: true,
      confirmButtonColor: '#3085d6',
      cancelButtonColor: '#d33',
      confirmButtonText: 'Si, Borrar'
    }).then( (result) => {
      if (result.isConfirmed) {
        this.doctorService.deleteDoctor( doctor._id )
          .subscribe(
            () => {
              this.getListDoctors();

              Swal.fire('Borrado!', `El doctor ${ doctor.name } fue borrado correctamente.`, 'success');
            },
            err => {
              console.log('Error: ', err);
              Swal.fire('Error!', err.error.msg , 'error')
            }
          );
      }
    })
  }

  ngOnInit(): void {
    this.getListDoctors();

    this.imgSubs = this.modalImagenService.newImage
      .pipe( delay(100) )
      .subscribe( img => this.getListDoctors() );
  }

  ngOnDestroy() {
    this.imgSubs.unsubscribe();
  }

}
