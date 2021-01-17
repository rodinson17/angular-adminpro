import { delay } from 'rxjs/operators';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import Swal from 'sweetalert2';

import { Doctor } from './../../../../models/doctor.model';
import { Hospital } from './../../../../models/hospital.model';

import { DoctorService } from './../../../../services/doctor.service';
import { HospitalService } from './../../../../services/hospital.service';

@Component({
  selector: 'app-doctor',
  templateUrl: './doctor.component.html',
  styleUrls: ['./doctor.component.css']
})
export class DoctorComponent implements OnInit {
  doctorForm: FormGroup;
  listHopitals: Hospital[] = [];
  doctorSelect: Doctor;
  hospitalSelect: Hospital;

  constructor( private formBuilder: FormBuilder,
               private hospitalService: HospitalService,
               private doctorService: DoctorService,
               private router: Router,
               private activatedRoute: ActivatedRoute ) { }

  onSubmit() {
    const { name } = this.doctorForm.value;

    if (this.doctorSelect) { // actualizar
      const data = {
        ...this.doctorForm.value,
        _id: this.doctorSelect._id
      }

      this.doctorService.updateDoctor( data )
        .subscribe( ( resp: any ) => {
          Swal.fire('Creado', `Doctor ${ name } creado correctamente`, 'success');
          this.router.navigateByUrl(`/dashboard/doctor/${ resp.doctor._id }`);
        });

    } else { // crear nuevo

      this.doctorService.createDoctor( this.doctorForm.value )
        .subscribe( ( resp: any ) => {
          Swal.fire('Creado', `Doctor ${ name } creado correctamente`, 'success');
          this.router.navigateByUrl(`/dashboard/doctor/${ resp.doctor._id }`);
        });
    }
  }

  getListHospitals() {
    this.hospitalService.getHospitals()
      .subscribe( ( hospitals: Hospital[]) => {
        this.listHopitals = hospitals;
      });
  }

  getDoctorById( id: string ) {
    if ( id === 'new' ) return;

    this.doctorService.getDoctorById( id )
      .pipe(
        delay(100)
      )
      .subscribe( doctor => {
        if ( !doctor ) {
          return this.router.navigateByUrl(`/dashboard/doctors`);
        }

        const { name, hospital: { _id } } = doctor;
        this.doctorForm.setValue({ name, hospital: _id });
        this.doctorSelect = doctor;
      });
  }

  ngOnInit(): void {
    this.getListHospitals();

    this.activatedRoute.params.subscribe( ({ id }) => this.getDoctorById( id ) );

    this.doctorForm = this.formBuilder.group({
      name: [ '', Validators.required ],
      hospital: [ '', Validators.required ]
    });

    this.doctorForm.get( 'hospital' ).valueChanges
      .subscribe( hospitalID => {
        this.hospitalSelect = this.listHopitals.find( hosp => hosp._id === hospitalID );
      });
  }

}
