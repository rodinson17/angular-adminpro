import { Component, OnInit, OnDestroy } from '@angular/core';
import { Subscription } from 'rxjs';
import { delay } from 'rxjs/operators';
import Swal from 'sweetalert2';

import { Hospital } from './../../../models/hospital.model';

import { HospitalService } from './../../../services/hospital.service';
import { SearchesService } from './../../../services/searches.service';
import { ModalImagenService } from './../../../services/modal-imagen.service';

@Component({
  selector: 'app-hospitals',
  templateUrl: './hospitals.component.html',
  styleUrls: ['./hospitals.component.css']
})
export class HospitalsComponent implements OnInit, OnDestroy {

  listHospitals: Hospital[] = [];
  listHospitalsTemp: Hospital[] = [];
  loanding: boolean = true;
  imgSubs: Subscription;

  constructor( private hospitalService: HospitalService,
               private modalImagenService: ModalImagenService,
               private searchesService: SearchesService ) { }

  showModal(hospital: Hospital) {
    this.modalImagenService.showModal('hospitals', hospital._id, hospital.img);
  }

  search( termSearch: string ) {
    if ( termSearch.length === 0 ) {
      this.listHospitals = this.listHospitalsTemp;
      return;
    }

    this.searchesService.searches( 'hospitals', termSearch )
      .subscribe( hospitals =>  {
        this.listHospitals = hospitals;
      });
  }

  getListHospitals() {
    this.loanding = true;

    this.hospitalService.getHospitals()
      .subscribe( hospitals => {
        console.log(hospitals);
        this.listHospitals = hospitals;
        this.listHospitalsTemp = hospitals;
        this.loanding = false;
      });
  }

  async createHospital() {
    const { value = '' } = await Swal.fire<string>({
      title: 'Crear hospital',
      text: 'Ingrese el nombre del hospital',
      input: 'text',
      inputPlaceholder: 'Nombre hospital',
      showCancelButton: true,
    });

    if ( value.trim().length > 0 ) {
      this.hospitalService.createHospital( value )
        .subscribe( ( resp: any ) => {
          this.listHospitals.push( resp.hospital );
        })
    }
  }

  updateChanges( hospital: Hospital ) {
    this.hospitalService.updateHospital( hospital._id, hospital.name )
      .subscribe( resp => {
        this.getListHospitals();
        Swal.fire('Actualizar', 'Hospital actualizado correctamente', 'success');
      });
  }

  deleteChanges( hospital: Hospital ) {
    this.hospitalService.deleteHospital( hospital._id )
      .subscribe( resp => {
        this.getListHospitals();
        Swal.fire('Borrar', 'Hospital borrado correctamente', 'success');
      });
  }

  ngOnInit(): void {
    this.getListHospitals();

    this.imgSubs = this.modalImagenService.newImage
      .pipe( delay(100) )
      .subscribe( img => this.getListHospitals() );
  }

  ngOnDestroy() {
    this.imgSubs.unsubscribe();
  }

}
